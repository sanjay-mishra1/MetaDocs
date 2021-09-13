const { fileTypes } = require("./Lists");
import { randomBytes } from "crypto";

export const getFileType = (fileName) => {
  var path;
  fileTypes.forEach((item) => {
    if (item.dbPath === fileName) path = item.path;
  });
  return path ? "/" + path : "";
};

export const prepareSheetData = (oldState, newState) => {
  console.log("util old state", oldState, newState);
  var arr = [];

  if (oldState.length === 1 && oldState[0].name !== newState.name) {
    arr.push(oldState[0]);
    arr.push(newState);
  } else
    oldState.forEach((item) => {
      if (newState.name !== item.name) arr.push(newState);
      else arr.push(item);
    });
  console.log("prepared sheet data", arr);
  return arr;
};

export const generateUniqueId = () => {
  const chars =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let autoId = "";
  while (autoId.length < 20) {
    const bytes = randomBytes(40);
    bytes.forEach((b) => {
      // Length of `chars` is 62. We only take bytes between 0 and 62*4-1
      // (both inclusive). The value is then evenly mapped to indices of `char`
      // via a modulo operation.
      const maxValue = 62 * 4 - 1;
      if (autoId.length < 20 && b <= maxValue) {
        autoId += chars.charAt(b % 62);
      }
    });
  }
  return autoId;
};

export const isNumber = (text) => {
  text += "";
  return /^\d+$/.test(text);
};
