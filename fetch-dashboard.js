const puppeteer = require('puppeteer-core');
const fs = require('fs');

(async () => {
  const chromePaths = [
    'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe'
  ];
  
  let executablePath = null;
  for (const p of chromePaths) {
    if (fs.existsSync(p)) {
      executablePath = p;
      break;
    }
  }
  
  if (!executablePath) {
    console.error('Could not find Chrome installation');
    process.exit(1);
  }

  console.log('Launching browser at', executablePath);
  const browser = await puppeteer.launch({ 
    executablePath,
    headless: "new" 
  });
  const page = await browser.newPage();
  
  console.log('Navigating to login page...');
  await page.goto('https://eonassetsmining.com/ktdevpro/login', { waitUntil: 'networkidle2' });
  
  console.log('Typing credentials...');
  await page.type('input[name="email"]', 'eonassetsmining@gmail.com');
  await page.type('input[name="password"]', '1234567890');
  
  console.log('Clicking login...');
  await Promise.all([
    page.waitForNavigation({ waitUntil: 'networkidle2' }),
    page.click('input[type="submit"]')
  ]);
  
  console.log('Navigating to dashboard...');
  await page.goto('https://eonassetsmining.com/ktdevpro/dashboard', { waitUntil: 'networkidle2' });
  
  console.log('Extracting HTML...');
  const html = await page.evaluate(() => document.documentElement.outerHTML);
  fs.writeFileSync('dashboard.html', html);
  
  console.log('Fetching CSS...');
  // Extract external CSS files
  const cssUrls = await page.evaluate(() => {
    return Array.from(document.querySelectorAll('link[rel="stylesheet"]')).map(l => l.href);
  });
  
  for (let i = 0; i < cssUrls.length; i++) {
    const url = cssUrls[i];
    if (url.includes('eonassetsmining.com')) {
      try {
        const response = await page.goto(url);
        const css = await response.text();
        fs.writeFileSync(`dashboard-${i}.css`, css);
        console.log(`Saved CSS: dashboard-${i}.css`);
      } catch (e) {
        console.error(`Failed to fetch CSS: ${url}`);
      }
    }
  }

  await browser.close();
  console.log('Done! Saved to dashboard.html');
})();
