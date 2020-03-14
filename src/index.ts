import puppeteer from "puppeteer";
import moment from "moment";
import util from "util";
import cp from "child_process";
import path from "path";
import fs from "fs";

const exec = util.promisify(cp.exec);

const sites = [
  "carltonathome",
  "carltonwin8",
  "tinaandcarlton",
  "appsfortracking",
  "apps4tracking",
  "carltonjoseph",
  "sophieandchampagne"
];

const urlsConfigs = {
  local: {
    transport: "http"
  },
  com: {
    transport: "https"
  }
};

const useLocal = false;
const baseUrl = useLocal ? "local" : "com";

const memCmd = "ssh carltonj2000@167.99.101.204 free";

const timeFmt = "YYYY-MM-DD HH:mm:ss";

(async () => {
  const multipleResults = { results: [] };
  const { stdout: result } = await exec(memCmd);
  const time = moment();
  multipleResults["server"] = {
    time: time.local().format(timeFmt),
    memCmd,
    result
  };

  const results = multipleResults.results;
  const browser = await puppeteer.launch();
  for (let j = 0; j < sites.length; j++) {
    const page = await browser.newPage();
    await page.setCacheEnabled(false);
    const transport = urlsConfigs[baseUrl].transport;
    const url = `${transport}://${sites[j]}.${baseUrl}`;
    console.log(url);
    const result = { url, time: [] };
    for (let i = 0; i < 10; i++) {
      try {
        const start = moment();
        await Promise.all([
          page.waitForNavigation({ timeout: 30000, waitUntil: "networkidle0" }),
          page.goto(url)
        ]);
        const end = moment().subtract(500);
        const delta = end.diff(start);
        const content = await page.content();
        result.time.push({
          status: "ok",
          start: start.local().format(timeFmt),
          delta,
          contentSize: content.length
        });
        console.log(delta);
      } catch (e) {
        console.log(e.message);
        result.time.push({ status: "error", msg: e.message });
      }
    }
    results.push(result);
    page.close();
  }
  await browser.close();

  const json = JSON.stringify(multipleResults, null, 2);
  const out = "const data = " + json + ";\n\nmodule.exports = { data };";
  const fileName = "d" + time.local().format("YYYYMMDDHHmmss") + ".js";
  fs.writeFileSync(path.join(__dirname, "../data/notkept/", fileName), out);
  console.log(out);
})().catch(e => console.log(e));
