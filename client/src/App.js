import React from "react";

import dataRaw from "./data";

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
const transport = urlsConfigs[baseUrl].transport;
const url = site => `${transport}://${sites}.${baseUrl}`;

const bitly = {};
sites.map(s => (bitly[url(s)] = s));

const data = dataRaw.map(s => {
  return {
    name: bitly[s.url]
  };
});

function App() {
  console.log(dataRaw, data);
  return <div>hi</div>;
}

export default App;
