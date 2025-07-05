import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// ES module __dirname workaround
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const filePathData = path.join(__dirname, '../data/data.json');
// export interface Rcd {
//   name: string;
//   action: string;
//   type?: string; // Optional, add more fields as needed
// }



function fileAddRcd(rcd) {

  let jsonData = [];
  if (fileExists()) {
    const data = fs.readFileSync(filePathData, 'utf8');
    jsonData = JSON.parse(data);
    jsonData.push(rcd);
  }
  else {
    jsonData.push(rcd);
  }
  fs.writeFileSync(filePathData, JSON.stringify(jsonData, null, 2));

}
function fileExists() {
  if (fs.existsSync(filePathData))
    return true;
  else
    console.log(`File ${filePathData} does not exist`);
  return false;
}

function fileReadRcd()    {

  if (!fileExists()) { return [{ message : "file doesnt exist" }]; }

 return JSON.parse(fs.readFileSync(filePathData, 'utf8'));
 
}

export { fileAddRcd, fileReadRcd };
// export function fileAddRcd(rcd: Rcd): void;
// export function fileReadRcd(): Rcd[];