"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const deepSearch = (keyword, array, excluded) => {
  const isPrimitiveItem = (item) => typeof item === "number" || typeof item === "string" || typeof item === "boolean";
  const toLowerRegistry = (primitive) => primitive.toString().toLowerCase();
  const argumentErrors = [];
  if (!isPrimitiveItem(keyword)) {
    argumentErrors.push("First argument has to be a primitive value.");
  }
  if (!Array.isArray(array)) {
    argumentErrors.push("Second argument has to be an array.");
  }
  if (excluded && !excluded.props && (excluded.isInAllNesting || typeof excluded.isInAllNesting === "boolean")) {
    argumentErrors.push('Pass "props" array of strings into "excluded" object to use "isInAllNesting" property.');
  }
  if (
    (excluded && excluded.props && !Array.isArray(excluded.props)) ||
    (excluded?.props && excluded.props.some((prop) => typeof prop !== "string"))
  ) {
    argumentErrors.push('"props" of "excluded" object has to be an array of strings.');
  }
  if (excluded && excluded.isInAllNesting && typeof excluded.isInAllNesting !== "boolean") {
    argumentErrors.push('"isInAllNesting" of "excluded" object has to be a boolean.');
  }
  if (argumentErrors.length) {
    throw new Error(argumentErrors.join(" "));
  }
  if (Array.isArray(array) && isPrimitiveItem(keyword)) {
    let memoizedRecursionValue = [];
    const recursion = (item, excludedProps) => {
      if (isPrimitiveItem(item)) {
        memoizedRecursionValue.push(toLowerRegistry(item));
      } else if (typeof item === "object") {
        Object.keys(item).forEach((key) => {
          if (!excludedProps.includes(key)) {
            recursion(item[key], excludedProps);
          }
        });
      }
      return memoizedRecursionValue;
    };
    return array.filter((item) => {
      if (isPrimitiveItem(item)) {
        return toLowerRegistry(item).includes(toLowerRegistry(keyword));
      } else {
        return Object.keys(item).some((k) => {
          if (excluded?.props && excluded.props.includes(k)) {
            return false;
          }
          if (toLowerRegistry(item[k]).includes(toLowerRegistry(keyword))) {
            return true;
          } else {
            return recursion(item[k], excluded?.isInAllNesting ? excluded.props : []).some((s) => {
              return toLowerRegistry(s).includes(toLowerRegistry(keyword));
            });
          }
        });
      }
    });
  } else {
    return [];
  }
};
exports.default = deepSearch;
