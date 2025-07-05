//const express = require('express')
import express from 'express';
const app = express()
const port = 8080

// Lists files and folders in the specified directory
// const fs = require('fs');
// const path = require('path');
import path from 'path';
import { fileURLToPath } from 'url';

//const directoryPath = path.join(__dirname, 'public'); // Change 'public' to your directory
//const directoryPath = path.join(__dirname, 'public'); // Change 'public' to your directory
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

//const filePathData = path.join(__dirname, 'data.json');

const directoryPathDownload = __dirname + '/data/' // 'C:/Users/dfbro/Downloads/'
import { listFilesAndFolders } from './utils/opFiles.js';
import { fileAddRcd, fileReadRcd } from './utils/opFileReadWrite.js';
let rcd = { "name": "test", "action": "idk"  };

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  const files = listFilesAndFolders(directoryPathDownload);
    //fileAddRcd, fileReadRcd
  //fileAddRcd(rcd);
  //res.send(`Files and Folders in <PRE>{${JSON.stringify(files, null, 2) }} </PRE>`);
  let filesSorted = files.sort((a, b) => a.name.localeCompare(b.name));
  // filesSorted = filesSorted.sort((a, b) => a.type.localeCompare(b.type));
  res.send(`<h1>Files and Folders in ${directoryPathDownload}</h1><ul>${filesSorted.map(file => `<li>${file.type} ${file.name} </li>`).join('')}</ul>`);
  console.log(`Request received for ${req.url}`);
})
 
// http://localhost:3000/books/1
app.get('/files/:fileName', (req, res) => {
   console.log(`Request received for ${req.url} with fileName: ${req.params?.fileName}`);
     const files = listFilesAndFolders(directoryPathDownload);
  //res.send(`Files and Folders in <PRE>{${JSON.stringify(files, null, 2) }} </PRE>`);

  let fn = req.params.fileName;
  if (!fn) {
    return res.status(400).send('File name is required');
  }
  fn = fn.toUpperCase();

  let filesSorted = files.filter(file => file.name.toUpperCase().includes( fn ));
  filesSorted = filesSorted.sort((a, b) => a.type.localeCompare(b.type));
  if(filesSorted.length === 0) {
    return res.status(404).send(`No files found matching "${req.params.fileName}" in ${directoryPathDownload}`);
  }
  return res.send(`<h1>Files and Folders in ${directoryPathDownload}</h1><ul>${filesSorted.map(file => `<li>${file.type} ${file.name} </li>`).join('')}</ul>`);

//res.json(` found ${req.params.fileName} `);
})

// http://localhost:3000/books/1
app.get('/rcd/:fileName', (req, res) => {
   console.log(`Request received for ${req.url} with : ${req.params}`);
  res.json(` found ${req.params.fileName} `);
})


// http://localhost:3000/rcd
// https://8080-cs-19c0e239-0598-41ad-9958-776d502c7ba3.cs-us-east1-vpcf.cloudshell.dev/rcd?authuser=0
app.get('/rcd', (req, res) => {
   console.log(` get /rcd Request received for ${req.url} `);
  const rcds = fileReadRcd();
  //return res.json(rcds);
  return res.send(`<div>rcds  in ${ JSON.stringify(rcds, null, 2) }</div>`);
})

// https://8080-cs-19c0e239-0598-41ad-9958-776d502c7ba3.cs-us-east1-vpcf.cloudshell.dev/rcd?authuser=0
// curl -X POST http://localhost:3000/rcd -H "Content-Type: application/json" -d "{\"name\":\"from curl\",\"action\":\"idk\"}"
app.post('/rcd', (req, res) => {
  console.log(`POST Request received for ${req.url} with body: ${JSON.stringify(req.body)}`);
  fileAddRcd(req.body);
  // For example, you could save it to a database or perform some action
  res.json({ message: 'Record added successfully', data: req.body });
})

// app.listen(port, () => {
//   //console.log(`C:\Users\dfbro\Desktop\code\nodejs\basic\basic.js app listening on port http://localhost:${port}/`)
//   console.log(` app listening on port ${port}`)
// })

const server = app.listen(port, () => {
  console.log(`App listening on port ${port}`);
  console.log(`Access it at http://localhost:${port}/`);
});

server.on('error', (err) => {
  if (err.code === 'EADDRINUSE') {
    console.error(`Error: Port ${port} is already in use. Please close the other process or choose a different port.`);
    //  sudo netstat -tulnp | grep :8080
    // sudo kill 4629
  } else {
    console.error(`Server startup error: ${err}`);
  }
});