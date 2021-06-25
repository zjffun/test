import NameSpellChecker from "name-spell-checker";

const nameSpellChecker = new NameSpellChecker();

console.log(nameSpellChecker.correct("vue")); // => false
console.log(nameSpellChecker.suggest("vue")); // => [ 'Vuex', 'Vue.js', 'vue-cli', 'Vue.js devtools' ]
console.log(nameSpellChecker.correct("React")); // => true
console.log(nameSpellChecker.correct("angular")); // => false

nameSpellChecker.add("name-spell-checker");

console.log(nameSpellChecker.suggest("NameSpellChecker")); // => [ 'name-spell-checker' ]
console.log(nameSpellChecker.correct("name-spell-checker")); // => true
