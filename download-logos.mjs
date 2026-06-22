import fs from 'fs';
import path from 'path';

const logosDir = path.join(process.cwd(), 'partner-logos');
if (!fs.existsSync(logosDir)) {
  fs.mkdirSync(logosDir);
}

const partners = [
  { name: 'bybit.png', url: 'https://raw.githubusercontent.com/spothq/cryptocurrency-icons/master/128/color/btc.png' },
  { name: 'coinbase.png', url: 'https://raw.githubusercontent.com/spothq/cryptocurrency-icons/master/128/color/eth.png' },
  { name: 'gateio.png', url: 'https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0xE66747a101bFF2dBA3697199DCcE5b743b454759/logo.png' }
];

async function download() {
  for (const partner of partners) {
    try {
      const res = await fetch(partner.url, {
        headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36' }
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const buffer = await res.arrayBuffer();
      fs.writeFileSync(path.join(logosDir, partner.name), Buffer.from(buffer));
      console.log(`Downloaded ${partner.name}`);
    } catch (e) {
      console.error(`Failed to download ${partner.name}: ${e.message}`);
    }
  }
}

download();
