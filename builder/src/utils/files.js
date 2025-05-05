const fs = require('fs');
const path = require('path');

function clearAndCreateDir(dirPath) {
  if (fs.existsSync(dirPath)) {
    fs.rmSync(dirPath, { recursive: true, force: true });
  }
  fs.mkdirSync(dirPath, { recursive: true });
}

function copyFiles(sourceDir, targetDir) {
  fs.readdirSync(sourceDir).forEach(file => {
    fs.copyFileSync(path.join(sourceDir, file), path.join(targetDir, file));
  });
}

function clearDirContent(dirPath) {
  const files = fs.readdirSync(dirPath);
  files.forEach(file => {
    const filePath = path.join(dirPath, file);
    const stats = fs.statSync(filePath);
    if (stats.isDirectory()) {
      clearDirContent(filePath);
      fs.rmdirSync(filePath);
    } else {
      fs.unlinkSync(filePath);
    }
  });
}

function advancedCopyFiles(sourceDir, targetDir) {
  if (!fs.existsSync(sourceDir)) {
    console.error(`Kaynak dizin mevcut değil: ${sourceDir}`);
    return;
  }

  if (!fs.existsSync(targetDir)) {
    fs.mkdirSync(targetDir, { recursive: true });
  }

  // Clean inside src folder
  if (targetDir.includes('src')) {
    clearDirContent(targetDir); 
  }

  const files = fs.readdirSync(sourceDir);
  files.forEach(file => {
    const sourceFilePath = path.join(sourceDir, file);
    const targetFilePath = path.join(targetDir, file);

    const stats = fs.statSync(sourceFilePath);
    if (stats.isDirectory()) {
      advancedCopyFiles(sourceFilePath, targetFilePath);
    } else {
      try {
        fs.copyFileSync(sourceFilePath, targetFilePath);
      } catch (err) {
        console.error(`Dosya kopyalanamadı: ${sourceFilePath} -> ${targetFilePath}`, err);
      }
    }
  });
}

module.exports = {
  clearAndCreateDir,
  copyFiles,
  clearDirContent,
  advancedCopyFiles
};