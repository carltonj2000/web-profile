import React from "react";

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

const data = oldDoNginx.data.results.map(s => {
  return {
    name: bitly[s.url]
  };
});

function App() {
  console.log(data);
  return <div>hi</div>;
}

export default App;
