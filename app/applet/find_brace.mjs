import fs from 'fs';
const code = fs.readFileSync('src/App.tsx', 'utf8');
let depth = 0;
let line = 1;
let inString = false;
let stringChar = '';
for (let i = 0; i < code.length; i++) {
  if (code[i] === '\n') line++;
  if (!inString && (code[i] === '"' || code[i] === "'" || code[i] === '`')) {
    inString = true;
    stringChar = code[i];
  } else if (inString && code[i] === stringChar && code[i-1] !== '\\') {
    inString = false;
  }
  if (!inString) {
    if (code[i] === '{') depth++;
    if (code[i] === '}') depth--;
  }
}
console.log('Final depth:', depth);
