"use strict";

const TypeGenerator = require("./generator");

function render(json, options) {
  return new TypeGenerator(json, options).render();
}

module.exports.render = render;
