const clearAndUpper = (str) => str.replace(/-/, "").toUpperCase();
module.exports.kebabToCamel = (str) => str.replace(/-\w/g, clearAndUpper);
module.exports.kebabToPascal = (str) => str.replace(/(^\w|-\w)/g, clearAndUpper);
module.exports.capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1);;