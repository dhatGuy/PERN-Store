const basicInfo = require("./basicInfo");
const servers = require("./servers");
const components = require("./components");
const tags = require("./tags");
const paths = require("./paths");

module.exports = {
  ...basicInfo,
  ...servers,
  ...components,
  ...tags,
  ...paths,
};
