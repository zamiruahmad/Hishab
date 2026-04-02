const fs = require('fs');
const code = fs.readFileSync('src/App.tsx', 'utf8');
let depth = 0;
let line = 1;
for (let i = 0; i < code.length; i++) {
  if (code[i] === '\n') line++;
  if (code[i] === '{') depth++;
  if (code[i] === '}') depth--;
}
console.log('Final depth:', depth);
