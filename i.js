import fs from 'fs';
import path from 'path';
import axolotl from './work/axolotl.js';

const sourceDir = './work/';
const targetDir = 'C:/axolotl/pbars/';

async function install() {
  console.log('Axolotl Progress Bars - Reloading files...');

  try {
    if (!fs.existsSync(targetDir)) {
      fs.mkdirSync(targetDir, { recursive: true });
    }

    const files = fs.readdirSync(sourceDir);
    let filesProcessed = 0;

    await axolotl.asyncbar('basic', () => {
      if (filesProcessed >= files.length) return 100;

      const file = files[filesProcessed];
      const srcPath = path.join(sourceDir, file);
      const destPath = path.join(targetDir, file);

      if (fs.statSync(srcPath).isFile()) {
        fs.copyFileSync(srcPath, destPath);
      }

      filesProcessed++;
      return (filesProcessed / files.length) * 100;
    }, 1, 35);

    console.log(`\nUpdate completed! Files in "${targetDir}" was replaced.`);
  } catch (err) {
    if (err.code === 'EPERM' || err.code === 'EACCES') {
      console.error('\nPermission error: Try install with admin permission.');
    } else {
      console.error(`\nFatal error: ${err.message}`);
    }
  }
}

install();