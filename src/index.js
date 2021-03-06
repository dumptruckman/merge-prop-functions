/*
 * Copyright 2018 Jeremy Wood
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy of this software and
 * associated documentation files (the "Software"), to deal in the Software without restriction,
 * including without limitation the rights to use, copy, modify, merge, publish, distribute,
 * sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all copies or substantial
 * portions of the Software.
 */

/**
 * Merges two functions whose purposes are to create props objects. Any props of a function type
 * will be merged into a new function that calls both original functions. Any non-function props
 * in getAdditionalProps will take precedence over those in getBaseProps.
 *
 * @param getBaseProps the base props function to merge onto.
 * @param getAdditionalProps the props function to merge from.
 * @returns {function(...[*])} a new function that create a merged set of props.
 */
export default function(getBaseProps, getAdditionalProps) {
  if (getBaseProps && !getAdditionalProps) {
    return getBaseProps;
  } else if (!getBaseProps && getAdditionalProps) {
    return getAdditionalProps;
  }
  return (...args) => mergeObjects(getBaseProps(...args), getAdditionalProps(...args));
};

function mergeObjects(obj1, obj2) {
  const obj3 = {...obj1, ...obj2};
  // Merge functions that are present in both objects
  Object.keys(obj3).forEach((key) => {
    if (isFunction(obj3[key]) && obj1[key] && obj2[key]) {
      obj3[key] = mergeFunctions(obj1[key], obj2[key]);
    }
  });
  return obj3;
}

function isFunction(functionToCheck) {
  const getType = {};
  return functionToCheck && getType.toString.call(functionToCheck) === '[object Function]';
}

export function mergeFunctions(func1, func2) {
  return (...args) => {
    func1(...args);
    func2(...args);
  };
}
