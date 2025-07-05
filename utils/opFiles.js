import fs from 'fs'
import path from 'path';

function listFilesAndFolders(dirPath) {
  let fileslist = [];

  try {
    const items = fs.readdirSync(dirPath);
    items.forEach(item => {
      const fullPath = path.join(dirPath, item);
      const stats = fs.statSync(fullPath);
      if (stats.isDirectory()) {
        // console.log(`[DIR]  ${item}`);
        fileslist.push({ "type" : "directory", "name": item });
      } else {
        // console.log(`[FILE] ${item}`);
        fileslist.push({ "type" : "file", "name": item });
      }
    });
    
  } catch (err) {
    console.error('Error reading directory:', err.message);
  }
  return fileslist;
}

export { listFilesAndFolders };