# Profile Website

Profile some of the characteristics of my websites using automation so that
the performance can be compared over time as upgrades are done.

## Profile Notes

- d20200313170545.js - add nginx redirect and auth and update performance
  testing script so old data might not be comparable any more since different
  testing methodologies are used. The digital ocean and nginx set corresponds
  to the following
  [github commitn](https://github.com/carltonj2000/docker/commit/a78e5ac2d24c9a4c2ccf7f7394ab95945e32548a).
- d20200303231036.js - new docker with single nginx and node server only for api
  and client served via nginx for appsfortracking
- d20200303173822.js - old docker with nested nginx and node server for api and
  client serving for appsfortracking
