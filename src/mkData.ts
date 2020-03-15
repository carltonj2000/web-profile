import path from "path";
import fs from "fs";
import moment from "moment";

const dataDirIn = "./data";
const dataDirOut = "./client/src/";
const dataFileOut = path.join(dataDirOut, "data.js");
const dataOut = path.join(dataDirOut, "data");

const files = fs.readdirSync(dataDirIn);
const dataFiles = files.filter(file => /^d[0-9]+.js$/.test(file));

const imports = [];
const consts = [];
const exports = ["export default ["];

const fileIdx = 1;

dataFiles.map(f => {
  const df = `d${fileIdx}`;
  const dfName = `${df}_name`;

  imports.push(`import { data as ${df} } from "./data/${f}";`);
  consts.push(`const ${dfName} = "./data/${f}";`);
  exports.push(`  { name: ${dfName}, data: ${df} },`);

  fs.copyFileSync(path.join(dataDirIn, f), path.join(dataOut, f));
  fileIdx++;
});

exports.push("];");

const out =
  `/*\n` +
  ` * This file is generated and can be overwritten.\n` +
  ` * Generated ${moment().format("YYYY-MM-DD hh:mm:ss")}\n` +
  ` */\n\n` +
  `${imports.join("\n")}\n\n` +
  `${consts.join("\n")}\n\n` +
  `${exports.join("\n")}\n\n`;

console.log(out);

fs.writeFileSync(dataFileOut, out);
