// The production predeploy hook must receive these values too: it builds fresh output.
const expectedOrigin = 'https://ampigen.web.app';
if (process.env.SITE_URL !== expectedOrigin || process.env.SITE_INDEXABLE !== 'true') {
  console.error(`AMPIGEN deployment requires SITE_URL=${expectedOrigin} and SITE_INDEXABLE=true.`);
  process.exit(1);
}
console.log(`AMPIGEN production origin verified: ${expectedOrigin}`);
