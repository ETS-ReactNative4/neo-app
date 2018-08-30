/**
 * TODO: revert to actual index once the issue is fixed
 * Workaround for https://github.com/facebook/react-native/issues/20150#issue-340235017
 */
import applyDecoratedDescriptor from "@babel/runtime/helpers/es6/applyDecoratedDescriptor";
import initializerDefineProperty from "@babel/runtime/helpers/es6/initializerDefineProperty";
Object.assign(babelHelpers, {
  applyDecoratedDescriptor,
  initializerDefineProperty
});

require("./app-index");
