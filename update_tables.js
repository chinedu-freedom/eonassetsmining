const fs = require('fs');
const path = require('path');

function processDir(dir) {
    const files = fs.readdirSync(dir);
    for (const file of files) {
        const fullPath = path.join(dir, file);
        if (fs.statSync(fullPath).isDirectory()) {
            processDir(fullPath);
        } else if (fullPath.endsWith('.jsx')) {
            let content = fs.readFileSync(fullPath, 'utf8');
            let updated = content;
            
            // Regex to find <Table> or <Table className="...">
            updated = updated.replace(/<Table([^>]*)>/g, (match, p1) => {
                let attrs = p1;
                // If it already has min-w-*, do not add it again
                if (attrs.includes('min-w-')) {
                    if (!attrs.includes('whitespace-nowrap')) {
                         attrs = attrs.replace(/className="([^"]*)"/, 'className="$1 whitespace-nowrap"');
                    }
                    return `<Table${attrs}>`;
                }

                if (attrs.includes('className="')) {
                    attrs = attrs.replace(/className="([^"]*)"/, 'className="$1 min-w-[1000px] whitespace-nowrap"');
                } else {
                    attrs = attrs + ' className="min-w-[1000px] whitespace-nowrap"';
                }
                return `<Table${attrs}>`;
            });
            
            if (updated !== content) {
                fs.writeFileSync(fullPath, updated, 'utf8');
                console.log(`Updated Table in ${fullPath}`);
            }
        }
    }
}

processDir(path.join(__dirname, 'src/app/(dashboard)'));
