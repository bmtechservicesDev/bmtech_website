#!/usr/bin/env python3
"""Generate the six-page public company profile from the website catalogue.

Usage:
    python scripts/generate-company-profile.py
    python scripts/generate-company-profile.py --output /tmp/company-profile.pdf

Requires Python 3, reportlab, Pillow and Node.js. Node imports src/content.js;
no application build or network access is needed. The supplied logo is embedded
at its original aspect ratio without alteration. All layout measurements are
checked before the PDF replaces the existing asset.

CODEX_PRIMARY_RUNTIME_NODE and CODEX_PRIMARY_RUNTIME_ROOT are supported when
running in the bundled runtime. Otherwise Node and an installed sans-serif font
are used. --font-dir can select a directory containing NotoSans-Regular.ttf and
NotoSans-Bold.ttf for a reproducible local rendering.
"""

from __future__ import annotations

import argparse
import io
import json
import os
import re
import shutil
import subprocess
from html import escape
from pathlib import Path

from PIL import Image
from reportlab.lib import colors
from reportlab.lib.pagesizes import letter
from reportlab.lib.styles import ParagraphStyle
from reportlab.lib.utils import ImageReader
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.pdfgen import canvas
from reportlab.platypus import Paragraph


ROOT = Path(__file__).resolve().parents[1]
OUTPUT = ROOT / "public/documents/bm-tech-services-company-profile.pdf"
PAGE_WIDTH, PAGE_HEIGHT = letter
MARGIN = 44
CONTENT_WIDTH = PAGE_WIDTH - 2 * MARGIN
CONTENT_BOTTOM = PAGE_HEIGHT - 58
PAGE_COUNT = 6

NAVY = colors.HexColor("#071B2C")
DEEP_BLUE = colors.HexColor("#14364C")
CYAN = colors.HexColor("#00A9DB")
INK = colors.HexColor("#203746")
MUTED = colors.HexColor("#536B7A")
PALE = colors.HexColor("#F0F6FA")
LINE = colors.HexColor("#D5E3EC")
WHITE = colors.white

EXPECTED_PRODUCT_IDS = {
    "restaurant-solution", "guest-house", "hotel", "lodge",
    "hospital", "clinic-automation", "pharmacy", "emr", "ehr", "pms",
    "lis", "ris", "sis", "school-management-app", "parent-app",
    "home-automation", "queue-management", "smart-led", "iot-gateway",
    "hr-solution",
}


class LayoutError(RuntimeError):
    """A content change needs a layout review instead of silent clipping."""


def clean(text: str) -> str:
    """Keep punctuation portable without changing names or meaning."""
    return str(text).translate(str.maketrans({
        "\u2010": "-", "\u2011": "-", "\u2012": "-", "\u2013": "-",
        "\u2014": "-", "\u2212": "-", "\u2018": "'", "\u2019": "'",
        "\u201c": '"', "\u201d": '"', "\u00a0": " ",
    }))


def load_catalogue() -> dict:
    node = os.environ.get("CODEX_PRIMARY_RUNTIME_NODE") or shutil.which("node")
    if not node:
        raise RuntimeError("Node.js is required to read src/content.js")
    module_uri = (ROOT / "src/content.js").as_uri()
    source = (
        "import { productFamilies, solutions, industries, serviceCatalogue } from "
        + json.dumps(module_uri)
        + "; console.log(JSON.stringify({productFamilies, solutions, industries, serviceCatalogue}));"
    )
    result = subprocess.run(
        [node, "--input-type=module", "-e", source],
        cwd=ROOT, check=True, capture_output=True, text=True,
    )
    data = json.loads(result.stdout)
    products = [product for family in data["productFamilies"] for product in family["products"]]
    if len(products) != 20 or {product["id"] for product in products} != EXPECTED_PRODUCT_IDS:
        raise ValueError("Review the profile layout: the expected 20-entry portfolio has changed")
    for key, count in [("productFamilies", 5), ("solutions", 7), ("industries", 8), ("serviceCatalogue", 10)]:
        if len(data[key]) != count:
            raise ValueError(f"Review the profile layout: expected {count} entries in {key}")
    return data


def register_fonts(font_dir: Path | None) -> str:
    runtime = os.environ.get("CODEX_PRIMARY_RUNTIME_ROOT")
    choices = []
    if font_dir:
        choices.append((font_dir / "NotoSans-Regular.ttf", font_dir / "NotoSans-Bold.ttf"))
    if runtime:
        base = Path(runtime) / "dependencies/native/libreoffice-headless/libreoffice/share/fonts/truetype"
        choices.append((base / "NotoSans-Regular.ttf", base / "NotoSans-Bold.ttf"))
    choices.extend([
        (Path("/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf"),
         Path("/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf")),
        (Path("/Library/Fonts/Arial.ttf"), Path("/Library/Fonts/Arial Bold.ttf")),
        (Path("C:/Windows/Fonts/arial.ttf"), Path("C:/Windows/Fonts/arialbd.ttf")),
    ])
    for regular, bold in choices:
        if regular.is_file() and bold.is_file():
            pdfmetrics.registerFont(TTFont("BMTech", str(regular)))
            pdfmetrics.registerFont(TTFont("BMTech-Bold", str(bold)))
            return str(regular.parent)
    if font_dir:
        raise RuntimeError("The supplied font directory does not contain the required NotoSans fonts")
    pdfmetrics.registerFont(pdfmetrics.Font("BMTech", "Helvetica", "WinAnsiEncoding"))
    pdfmetrics.registerFont(pdfmetrics.Font("BMTech-Bold", "Helvetica-Bold", "WinAnsiEncoding"))
    return "PDF standard Helvetica fonts"


def first_sentence(text: str) -> str:
    return re.split(r"(?<=[.!?])\s+", text.strip(), maxsplit=1)[0]


class Profile:
    def __init__(self, data: dict):
        self.data = data
        self.buffer = io.BytesIO()
        self.pdf = canvas.Canvas(
            self.buffer, pagesize=letter, pageCompression=1, invariant=1,
        )
        self.pdf.setTitle("BM Tech Services Company Profile")
        self.pdf.setAuthor("BM Tech Services")
        self.pdf.setSubject("Industry software, connected systems and end-to-end digital services")
        self.pdf.setCreator("BM Tech Services company profile generator")
        self.page_number = 0
        self.page_bottoms: dict[int, float] = {}

    def paragraph(self, text, width, size=10.5, leading=None, bold=False, color=INK):
        style = ParagraphStyle(
            "profile", fontName="BMTech-Bold" if bold else "BMTech",
            fontSize=size, leading=leading or size * 1.38,
            textColor=color, spaceBefore=0, spaceAfter=0,
            splitLongWords=False, allowWidows=0, allowOrphans=0,
        )
        # Keep the final two words together so a sentence does not end in a
        # one-word line. Explicit newlines allow intentional cover line breaks.
        lines = escape(clean(text)).split("\n")
        markup = "<br/>".join(re.sub(r" (?=\S+$)", "&nbsp;", line) for line in lines)
        para = Paragraph(markup, style)
        _, height = para.wrap(width, PAGE_HEIGHT)
        return para, height

    def measure(self, text, width, **style):
        return self.paragraph(text, width, **style)[1]

    def text(self, text, x, top, width, **style):
        para, height = self.paragraph(text, width, **style)
        bottom = top + height
        if bottom > CONTENT_BOTTOM + 0.1:
            raise LayoutError(
                f"Page {self.page_number} text exceeds its content area "
                f"({bottom:.1f} > {CONTENT_BOTTOM:.1f}): {str(text)[:80]}"
            )
        para.drawOn(self.pdf, x, PAGE_HEIGHT - bottom)
        self.page_bottoms[self.page_number] = max(self.page_bottoms.get(self.page_number, 0), bottom)
        return bottom

    def box(self, x, top, width, height, fill=PALE, radius=7):
        if top + height > CONTENT_BOTTOM + 0.1:
            raise LayoutError(f"Page {self.page_number} card exceeds its content area")
        self.pdf.setFillColor(fill)
        self.pdf.roundRect(x, PAGE_HEIGHT - top - height, width, height, radius, fill=1, stroke=0)

    def footer(self):
        self.pdf.setStrokeColor(LINE)
        self.pdf.setLineWidth(0.6)
        self.pdf.line(MARGIN, 43, PAGE_WIDTH - MARGIN, 43)
        self.pdf.setFillColor(MUTED)
        self.pdf.setFont("BMTech", 7.8)
        self.pdf.drawString(MARGIN, 27, "BM TECH SERVICES")
        self.pdf.drawRightString(
            PAGE_WIDTH - MARGIN, 27,
            f"COMPANY PROFILE  |  {self.page_number:02d} / {PAGE_COUNT:02d}",
        )

    def page(self, title=None, subtitle=None):
        if self.page_number:
            self.pdf.showPage()
        self.page_number += 1
        self.footer()
        if title is None:
            return MARGIN
        self.pdf.setFillColor(DEEP_BLUE)
        self.pdf.setFont("BMTech-Bold", 8.6)
        self.pdf.drawString(MARGIN, PAGE_HEIGHT - 36, "BM TECH SERVICES")
        self.pdf.setFillColor(MUTED)
        self.pdf.setFont("BMTech", 8.0)
        self.pdf.drawRightString(PAGE_WIDTH - MARGIN, PAGE_HEIGHT - 36, "COMPANY PROFILE")
        self.pdf.setFillColor(CYAN)
        self.pdf.rect(MARGIN, PAGE_HEIGHT - 49, 34, 2, fill=1, stroke=0)
        top = self.text(title, MARGIN, 67, CONTENT_WIDTH, size=24, leading=29.5, bold=True, color=NAVY)
        if subtitle:
            top = self.text(subtitle, MARGIN, top + 12, CONTENT_WIDTH, size=10.7, leading=15.0, color=MUTED)
        return top + 20

    def cover(self):
        self.page()
        logo_path = ROOT / "public/brand/bmtech-logo.webp"
        with Image.open(logo_path) as logo:
            logo_height = CONTENT_WIDTH * logo.height / logo.width
            self.pdf.drawImage(
                ImageReader(logo), MARGIN, PAGE_HEIGHT - MARGIN - logo_height,
                width=CONTENT_WIDTH, height=logo_height, mask="auto",
            )
        top = MARGIN + logo_height + 24
        top = self.text("COMPANY PROFILE", MARGIN, top, CONTENT_WIDTH,
                        size=9.4, leading=13, bold=True, color=CYAN)
        top = self.text("End-to-end digital\nsolutions for business", MARGIN, top + 10,
                        CONTENT_WIDTH, size=30, leading=36.5, bold=True, color=NAVY)
        top = self.text(
            "BM Tech Services combines industry software, custom development and connected engineering "
            "to help businesses digitalize their operations. We plan, build, integrate and support "
            "software, devices and cloud systems around your users and business requirements.",
            MARGIN, top + 16, CONTENT_WIDTH, size=11.0, leading=16.0,
        )
        top += 24
        cards = [
            ("Industry products", "Hospitality, healthcare, education, smart systems and HR offerings for your operating context."),
            ("Engineering services", "Custom applications, AI, cloud, embedded systems, integration and digital presence services."),
            ("Implementation", "Discovery, design, development, testing, deployment, training and ongoing support."),
        ]
        gap = 14
        width = (CONTENT_WIDTH - gap * 2) / 3
        inner = width - 24
        heights = [
            24 + self.measure(title, inner, size=11.4, leading=15, bold=True)
            + 9 + self.measure(body, inner, size=9.5, leading=13.1)
            for title, body in cards
        ]
        height = max(heights)
        for index, (title, body) in enumerate(cards):
            x = MARGIN + index * (width + gap)
            self.box(x, top, width, height)
            y = self.text(title, x + 12, top + 12, inner, size=11.4, leading=15, bold=True, color=NAVY)
            self.text(body, x + 12, y + 9, inner, size=9.5, leading=13.1)
        top += height + 24
        self.box(MARGIN, top, CONTENT_WIDTH, 69, fill=NAVY)
        self.text("Engineering Intelligence | Transforming Business", MARGIN + 18, top + 15,
                  CONTENT_WIDTH - 36, size=12.0, leading=16, bold=True, color=WHITE)
        self.text("AI • Cloud • IoT • Automation • Digital Transformation", MARGIN + 18, top + 39,
                  CONTENT_WIDTH - 36, size=10.2, leading=14.0, color=colors.HexColor("#7BDBF5"))

    def portfolio(self):
        top = self.page(
            "Products for your operations",
            "Explore five product families, with development and implementation services to support your requirements.",
        )
        inner = CONTENT_WIDTH - 30
        for family in self.data["productFamilies"]:
            names = " • ".join(product["name"] for product in family["products"])
            title_height = self.measure(family["title"], inner, size=12.2, leading=16.5, bold=True)
            desc_height = self.measure(family["description"], inner, size=9.8, leading=13.5)
            names_height = self.measure(names, inner, size=10.0, leading=14.0, bold=True)
            note = family.get("brandNote")
            note_height = self.measure(note, inner, size=8.9, leading=12.3) + 6 if note else 0
            height = 24 + title_height + 6 + desc_height + 8 + names_height + note_height
            self.box(MARGIN, top, CONTENT_WIDTH, height)
            self.pdf.setFillColor(CYAN)
            self.pdf.rect(MARGIN, PAGE_HEIGHT - top - height + 10, 2.5, height - 20, fill=1, stroke=0)
            y = self.text(family["title"], MARGIN + 15, top + 12, inner,
                          size=12.2, leading=16.5, bold=True, color=NAVY)
            y = self.text(family["description"], MARGIN + 15, y + 6, inner, size=9.8, leading=13.5)
            y = self.text(names, MARGIN + 15, y + 8, inner, size=10.0, leading=14.0, bold=True, color=DEEP_BLUE)
            if note:
                self.text(note, MARGIN + 15, y + 6, inner, size=8.9, leading=12.3, color=MUTED)
            top += height + 9

    def business_solutions(self):
        top = self.page(
            "Solutions for business needs",
            "Start with the operating need, then bring the relevant products, development and integration services into the plan.",
        )
        text_x = MARGIN + 34
        width = CONTENT_WIDTH - 34
        for index, item in enumerate(self.data["solutions"], 1):
            self.text(f"{index:02d}", MARGIN, top + 1, 25, size=10.4, leading=15,
                      bold=True, color=CYAN)
            y = self.text(item["title"], text_x, top, width, size=12.1, leading=16.5,
                          bold=True, color=NAVY)
            y = self.text(item["description"], text_x, y + 5, width, size=10.0, leading=13.8)
            top = y + 17
            if index < len(self.data["solutions"]):
                self.pdf.setStrokeColor(LINE)
                self.pdf.setLineWidth(0.5)
                self.pdf.line(text_x, PAGE_HEIGHT - top + 6, PAGE_WIDTH - MARGIN, PAGE_HEIGHT - top + 6)

    def services(self):
        top = self.page(
            "Engineering and digital services",
            "Build, connect and support your digital systems with capabilities spanning software, devices, cloud and customer experience.",
        )
        gap = 12
        width = (CONTENT_WIDTH - gap) / 2
        inner = width - 24
        entries = self.data["serviceCatalogue"]
        for start in range(0, len(entries), 2):
            pair = entries[start:start + 2]
            heights = [
                24 + self.measure(item["title"], inner, size=11.0, leading=14.4, bold=True)
                + 7 + self.measure(first_sentence(item["description"]), inner, size=9.6, leading=13.0)
                for item in pair
            ]
            height = max(90, *heights)
            for offset, item in enumerate(pair):
                x = MARGIN + offset * (width + gap)
                self.box(x, top, width, height)
                y = self.text(item["title"], x + 12, top + 12, inner,
                              size=11.0, leading=14.4, bold=True, color=NAVY)
                self.text(first_sentence(item["description"]), x + 12, y + 7, inner,
                          size=9.6, leading=13.0)
            top += height + 10
        self.text(
            "Services can support a new product, a defined development brief, existing-system modernization "
            "or an ongoing implementation and support requirement.",
            MARGIN, top + 6, CONTENT_WIDTH, size=10.0, leading=14.0, color=MUTED,
        )

    def industry_alignment(self):
        top = self.page(
            "Industry and business alignment",
            "Shape the technology around the people, activities and operating conditions in your organization.",
        )
        left_width = 148
        right_width = CONTENT_WIDTH - left_width
        header_height = 29
        self.pdf.setFillColor(DEEP_BLUE)
        self.pdf.rect(MARGIN, PAGE_HEIGHT - top - header_height, CONTENT_WIDTH, header_height, fill=1, stroke=0)
        self.text("INDUSTRY CONTEXT", MARGIN + 11, top + 8, left_width - 22,
                  size=8.7, leading=12, bold=True, color=WHITE)
        self.text("RELEVANT DIGITAL NEEDS", MARGIN + left_width + 11, top + 8, right_width - 22,
                  size=8.7, leading=12, bold=True, color=WHITE)
        top += header_height
        sectors = [item for item in self.data["industries"] if not item.get("isAudience")]
        for index, item in enumerate(sectors):
            left_height = self.measure(item["title"], left_width - 22, size=10.0, leading=13.5, bold=True)
            right_height = self.measure(item["description"], right_width - 22, size=9.5, leading=13.0)
            height = max(left_height, right_height) + 20
            if top + height > CONTENT_BOTTOM:
                raise LayoutError("The industry table needs a layout review")
            self.pdf.setFillColor(PALE if index % 2 == 0 else WHITE)
            self.pdf.rect(MARGIN, PAGE_HEIGHT - top - height, CONTENT_WIDTH, height, fill=1, stroke=0)
            self.text(item["title"], MARGIN + 11, top + 10, left_width - 22,
                      size=10.0, leading=13.5, bold=True, color=NAVY)
            self.text(item["description"], MARGIN + left_width + 11, top + 10, right_width - 22,
                      size=9.5, leading=13.0)
            self.pdf.setStrokeColor(LINE)
            self.pdf.setLineWidth(0.4)
            self.pdf.line(MARGIN, PAGE_HEIGHT - top - height, PAGE_WIDTH - MARGIN, PAGE_HEIGHT - top - height)
            top += height
        audience = next(item for item in self.data["industries"] if item.get("isAudience"))
        top += 18
        inner = CONTENT_WIDTH - 28
        height = 28 + self.measure(audience["title"], inner, size=11.4, leading=15.5, bold=True)
        height += 7 + self.measure(audience["description"], inner, size=10.0, leading=13.8)
        self.box(MARGIN, top, CONTENT_WIDTH, height, fill=NAVY)
        y = self.text(audience["title"], MARGIN + 14, top + 14, inner,
                      size=11.4, leading=15.5, bold=True, color=WHITE)
        self.text(audience["description"], MARGIN + 14, y + 7, inner,
                  size=10.0, leading=13.8, color=colors.HexColor("#D5EAF3"))

    def delivery(self):
        top = self.page(
            "From discovery to ongoing support",
            "A delivery plan connects the business requirement with design, implementation, rollout and the support needed as your organization evolves.",
        )
        stages = [
            ("Understand the requirement", "Clarify the business challenge, users, essential workflows, existing systems and intended outcome."),
            ("Design the solution", "Define architecture, user experience, delivery scope and acceptance criteria around the agreed priorities."),
            ("Build and integrate", "Develop the application or connected system and implement the required information flows and integrations."),
            ("Test and deploy", "Validate the agreed workflows, prepare deployment, document the solution and support handover to users."),
            ("Support and improve", "Define maintenance, troubleshooting, training and future improvement needs around the way the solution operates."),
        ]
        for index, (title, body) in enumerate(stages, 1):
            self.text(f"{index:02d}", MARGIN, top + 1, 24, size=10.0, leading=14.2,
                      bold=True, color=CYAN)
            y = self.text(title, MARGIN + 34, top, CONTENT_WIDTH - 34,
                          size=11.5, leading=15.5, bold=True, color=NAVY)
            y = self.text(body, MARGIN + 34, y + 4, CONTENT_WIDTH - 34,
                          size=10.0, leading=13.8)
            top = y + 13
        top = self.text("Prepare a focused project discussion", MARGIN, top + 10,
                        CONTENT_WIDTH, size=14.0, leading=18.5, bold=True, color=NAVY)
        top = self.text(
            "Share the details that will help us understand your requirement and identify a useful starting scope.",
            MARGIN, top + 8, CONTENT_WIDTH, size=10.2, leading=14.0,
        ) + 15
        inputs = [
            ("Business challenge", "What needs to change, and what would a useful outcome look like?"),
            ("People and workflows", "Who will use the solution, and which activities matter most?"),
            ("Existing systems", "Which applications, data and interfaces need to be considered?"),
            ("Devices and environment", "For connected systems, describe the equipment and operating conditions."),
            ("Delivery priorities", "Share your essential scope, constraints and preferred timeline."),
            ("Adoption and support", "Describe training, handover and ongoing support requirements."),
        ]
        gap = 18
        width = (CONTENT_WIDTH - gap) / 2
        for start in range(0, len(inputs), 2):
            row_bottom = top
            for offset, (title, body) in enumerate(inputs[start:start + 2]):
                x = MARGIN + offset * (width + gap)
                y = self.text(title, x, top, width, size=10.4, leading=14.0, bold=True, color=DEEP_BLUE)
                y = self.text(body, x, y + 4, width, size=9.6, leading=13.0)
                row_bottom = max(row_bottom, y)
            top = row_bottom + 13

    def build(self) -> bytes:
        self.cover()
        self.portfolio()
        self.business_solutions()
        self.services()
        self.industry_alignment()
        self.delivery()
        if self.page_number != PAGE_COUNT:
            raise ValueError(f"Expected {PAGE_COUNT} pages; generated {self.page_number}")
        self.pdf.save()
        return self.buffer.getvalue()


def main():
    parser = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    parser.add_argument("--output", type=Path, default=OUTPUT)
    parser.add_argument("--font-dir", type=Path)
    args = parser.parse_args()
    font_source = register_fonts(args.font_dir)
    data = load_catalogue()
    profile = Profile(data)
    pdf = profile.build()
    args.output.parent.mkdir(parents=True, exist_ok=True)
    args.output.write_bytes(pdf)
    print(json.dumps({
        "output": str(args.output.resolve()),
        "pages": profile.page_number,
        "portfolio_entries": sum(len(family["products"]) for family in data["productFamilies"]),
        "solutions": len(data["solutions"]),
        "services": len(data["serviceCatalogue"]),
        "font_source": font_source,
        "bytes": len(pdf),
        "lowest_text_position_by_page": {str(page): round(bottom, 1) for page, bottom in profile.page_bottoms.items()},
    }, indent=2))


if __name__ == "__main__":
    main()
