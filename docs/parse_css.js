
var postcss = require('postcss'),
    path = require('path'),
    fs = require('fs'),
    args = process.argv.slice(2),
    src;


function isRule(node) { return node.type === 'rule'; }
function isDecl(node) { return node.type === 'decl'; }
function isComment(node) { return node.type === 'comment'; }

function ruleToJson(node) {
  return {
    type: node.type,
    selector: node.selector,
    nodes: (node.nodes && node.nodes.length) ? node.nodes.map(toJson) : []
  };
}
function declToJson(node) {
  return {
    type: node.type,
    prop: node.prop,
    value: node.value
  };
}
function commentToJson(node) {
  return {
    type: node.type,
    text: node.text
  };
}
function toJson(node) {
  if (isRule(node)) {
    return ruleToJson(node);
  } else if (isDecl(node)) {
    return declToJson(node);
  } else if (isComment(node)) {
    return commentToJson(node);
  } else {
    return {};
  }
}


function parse(src) {

  var data = fs.readFileSync(src),
      css = postcss.parse(data),
      json = (css.nodes && css.nodes.length) ? css.nodes.map(toJson) : [];

  // console.log(css);
  process.stdout.write(JSON.stringify(json));

}


function help() {
  console.warn('please provide path to css file as only argument to script');
}


if (args.length) {
  src = path.resolve(args[0]);
  parse(src);
} else {
  help();
}
