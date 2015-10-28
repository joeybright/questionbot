
// Gets the question channel if it exists
let checkForQuestionMark = (string) => {
      // Define regex pattern
  let regEx = /\?/igm;
  // Returns the results of the test
  return regEx.test(string);
};

// Registers the module(s)
Modules.server.checkForQuestionMark = checkForQuestionMark;
