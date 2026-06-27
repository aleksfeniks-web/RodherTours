const fs = require('fs');
const path = require('path');

const srcDir = 'C:\\Users\\nh250032\\.gemini\\antigravity\\brain\\3f0dd94c-2a47-4f6e-b26a-edf8bd728b97';
const destDir = path.join(__dirname, 'public', 'images');

const files = [
  { src: 'tokyo_japan_1782436449342.png', dest: 'tokyo.png' },
  { src: 'china_scenery_1782436460666.png', dest: 'china.png' },
  { src: 'bali_temple_1782436471864.png', dest: 'bali.png' },
  { src: 'dubai_city_1782436483301.png', dest: 'dubai.png' }
];

if (!fs.existsSync(destDir)){
  fs.mkdirSync(destDir, { recursive: true });
}

files.forEach(file => {
  const srcPath = path.join(srcDir, file.src);
  const destPath = path.join(destDir, file.dest);
  
  if (fs.existsSync(srcPath)) {
    fs.copyFileSync(srcPath, destPath);
    console.log(`Copied ${file.src} to ${file.dest}`);
  } else {
    console.warn(`Source file not found: ${srcPath}`);
  }
});
