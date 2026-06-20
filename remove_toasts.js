const fs = require('fs');
const path = require('path');

const walkSync = (dir, filelist = []) => {
  fs.readdirSync(dir).forEach(file => {
    const filePath = path.join(dir, file);
    if (fs.statSync(filePath).isDirectory()) {
      if (!filePath.includes('node_modules') && !filePath.includes('.git') && !filePath.includes('.next')) {
        filelist = walkSync(filePath, filelist);
      }
    } else if (filePath.endsWith('.jsx') || filePath.endsWith('.js')) {
      filelist.push(filePath);
    }
  });
  return filelist;
};

const files = walkSync('./src');
let modifiedFiles = 0;

files.forEach(file => {
  // skip useApi itself and about page
  if (file.includes('useApi.js') || file.includes('about')) return;

  let content = fs.readFileSync(file, 'utf8');
  let originalContent = content;

  // We look for toast.success(...) containing common words, and comment them out
  content = content.replace(/toast\.success\([^)]+\)/gi, match => {
    if (/success|update|delet|add|creat/i.test(match)) {
      return `/* ${match} (removed per user) */`;
    }
    return match;
  });
  
  content = content.replace(/toast\.error\([^)]+\)/gi, match => {
    if (/fail|error/i.test(match)) {
      return `/* ${match} (removed per user) */`;
    }
    return match;
  });

  if (content !== originalContent) {
    fs.writeFileSync(file, content, 'utf8');
    modifiedFiles++;
    console.log('Modified: ' + file);
  }
});
console.log('Total files modified: ' + modifiedFiles);
