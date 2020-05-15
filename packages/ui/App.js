"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var react_1 = __importDefault(require("react"));
var react_native_safe_area_context_1 = require("react-native-safe-area-context");
var react_native_1 = require("@storybook/react-native");
require("./.storybook/rn-addons");
react_native_1.configure(function () {
    require("./src/components/index.stories");
}, module);
var StorybookUIRoot = react_native_1.getStorybookUI({
    asyncStorage: null
});
exports["default"] = (function () { return (<react_native_safe_area_context_1.SafeAreaProvider>
    <StorybookUIRoot />
  </react_native_safe_area_context_1.SafeAreaProvider>); });
