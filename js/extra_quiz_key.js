// Run from the repo root:  node export_quiz_keys.js > quiz_keys.sql   (then paste quiz_keys.sql into Neon)
const fs = require("fs"), vm = require("vm");
const ctx = vm.createContext({});
["js/quizzes.js", "js/quiz-why.js", "js/quizzes-2.js"].forEach((f) => { if (fs.existsSync(f)) vm.runInContext(fs.readFileSync(f, "utf8"), ctx, { filename: f }); });
const data = JSON.parse(vm.runInContext("JSON.stringify(Object.fromEntries(Object.entries(QUIZ_DATA).map(([k, v]) => [k, v.map((q) => q.correct)])))", ctx));
const rows = [];
for (const [slug, keys] of Object.entries(data)) keys.forEach((c, i) => rows.push(`('${slug.replace(/'/g, "''")}', ${i}, ${Number(c)})`));
console.log("INSERT INTO quiz_keys (lesson_slug, q_index, correct) VALUES\n" + rows.join(",\n") +
  "\nON CONFLICT (lesson_slug, q_index) DO UPDATE SET correct = EXCLUDED.correct;");