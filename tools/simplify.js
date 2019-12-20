const fromFile = require("../pooky/ast.js").fromFile;
const traverse = require("@babel/traverse").default;
const generate = require("@babel/generator").default;

const { StateManager, utils } = require("../pooky/flow");

CONTROL_FLOW_VISITOR = {
  ForStatement(path) {
    if (utils.isForAControlFlow(path)) {
      const manager = StateManager.fromPath(path);
      manager.simplify(path);
    }
  },
};

CONTROL_FLOW_VISITOR_WHILE = {
  WhileStatement(path) {
    if (utils.isWhileAControlFlow(path)) {
      const manager = StateManager.fromPath(path);
      manager.simplify(path);
    }
  },
};

let currentPooky = process.argv.slice(-1)[0];

let currentTree = fromFile(`${currentPooky}`);
traverse(currentTree, CONTROL_FLOW_VISITOR);
traverse(currentTree, CONTROL_FLOW_VISITOR_WHILE);
const { code } = generate(currentTree, { compact: true, retainLines: true });
console.log(code);
