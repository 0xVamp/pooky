
const fromFile = require("../pooky/ast.js").fromFile;
const recast = require("recast");
const traverse = require("@babel/traverse").default;
const t = require("@babel/types");

const { structs } = require("../pooky/switch/evaluator.js");

const {
  StateManager, 
  State, 
  Transition,
	Graph,
  Evaluator,
  utils
} = require("../pooky/switch");


const tree = {
  'if_then' : fromFile("flowcharts/if_then.js"),
  'if_then_else' : fromFile("flowcharts/if_then_else.js"),
  'if_then_in_a_loop' : fromFile("flowcharts/if_then_in_a_loop.js"),
  'do_while_loop' : fromFile("flowcharts/do_while_loop.js"),
  'do_and_while_loop' : fromFile("flowcharts/do_and_while_loop.js"),
  'do_and_while_loop_inside_loop' : fromFile("flowcharts/do_and_while_loop_inside_loop.js"),
  'do_and_while_loop_inside_loop_B' : fromFile("flowcharts/do_and_while_loop_inside_loop_B.js"),
  'while_loop' : fromFile("flowcharts/while_loop.js"),
  'while_loop_no_ancestors' : fromFile("flowcharts/while_loop_no_ancestors.js"),
  'while_loop_inside_loop' : fromFile("flowcharts/while_loop_inside_loop.js"),
  'infinite_loop' : fromFile("flowcharts/infinite_loop.js"),
};

SWITCH_TRANSITION_VISITOR = {
  "ForStatement|WhileStatement"(path) {
    if (utils.isForAGoToSwitch(path) || utils.isWhileAGoToSwitch(path)) {
      const stateHolderName = utils.getStateHolderName(path);
      console.log(stateHolderName);

      const initialState = utils.getInitialState(path);
      const manager = StateManager.fromPath(path);

      //console.log(manager.traverser.evaluator.interpret(19)); //End of DoWhile
      //console.log(manager.traverser.evaluator.interpret(3));
      //console.log(manager.traverser.evaluator.interpret(6));
      //console.log(manager.traverser.evaluator.interpret(5));// WhileLoop inside WhileLoop
      console.log(manager.traverser.evaluator.interpret(61));// if then in a loop

    }
  }
}


let currentTree;
//currentTree = tree['do_while_loop'];
//currentTree = tree['if_then'];
//currentTree = tree['if_then_else'];
currentTree = tree['if_then_in_a_loop'];
currentTree = tree['do_and_while_loop_inside_loop'];
//currentTree = tree['do_and_while_loop_inside_loop_B'];
currentTree = tree['while_loop'];
//currentTree = tree['while_loop_no_ancestors'];
//currentTree = tree['while_loop_break_if_then'];
//currentTree = tree['while_loop_inside_loop'];
//currentTree = tree['infinite_loop'];
traverse(currentTree, SWITCH_TRANSITION_VISITOR);
//console.log(recast.print(currentTree).code);

