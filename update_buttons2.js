const fs = require('fs');
const path = require('path');

function processDir(dir) {
    const files = fs.readdirSync(dir);
    for (const file of files) {
        const fullPath = path.join(dir, file);
        if (fs.statSync(fullPath).isDirectory()) {
            processDir(fullPath);
        } else if (fullPath.endsWith('.jsx') || fullPath.endsWith('.js')) {
            let content = fs.readFileSync(fullPath, 'utf8');
            let updated = content;
            
            updated = updated.replace(/<(Button|button)([^>]*?)>/g, (match, p1, p2) => {
                // Replacing 'rounded' or 'rounded-md', etc. except full/none
                let newAttrs = p2.replace(/\brounded(?:-(?:md|lg|xl|2xl|3xl|\[.*?\]))?\b/g, 'rounded-sm');
                // Avoid double rounded-sm
                newAttrs = newAttrs.replace(/\brounded-sm\s+rounded-sm\b/g, 'rounded-sm');
                return `<${p1}${newAttrs}>`;
            });
            
            if (updated !== content) {
                fs.writeFileSync(fullPath, updated, 'utf8');
                console.log(`Updated ${fullPath}`);
            }
        }
    }
}

processDir(path.join(__dirname, 'src'));
