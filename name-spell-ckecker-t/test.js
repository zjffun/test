const NameSpellChecker = require("name-spell-checker");

const spell = new NameSpellChecker();

// spell.remove("Vue.js");
console.log(
  spell.correct("Vue.js") // => true
);
