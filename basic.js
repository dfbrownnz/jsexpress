//const express = require('express')
import express from 'express';
const app = express()
const port = 3000

// Lists files and folders in the specified directory
// const fs = require('fs');
// const path = require('path');
import fs from 'fs'
import path from 'path';
//const directoryPath = path.join(__dirname, 'public'); // Change 'public' to your directory
//const directoryPath = path.join(__dirname, 'public'); // Change 'public' to your directory
const directoryPathDownload ='C:/Users/dfbro/Downloads/'
import { listFilesAndFolders } from './utils/opFiles.js';
import { fileAddRcd, fileReadRcd } from './utils/opFileReadWrite.js';
let rcd = { "name": "test", "action": "idk"  };

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  const files = listFilesAndFolders(directoryPathDownload);
    //fileAddRcd, fileReadRcd
  fileAddRcd(rcd);
  //res.send(`Files and Folders in <PRE>{${JSON.stringify(files, null, 2) }} </PRE>`);
  let filesSorted = files.sort((a, b) => a.name.localeCompare(b.name));
  filesSorted = filesSorted.sort((a, b) => a.type.localeCompare(b.type));
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
app.get('/rcd', (req, res) => {
   // console.log(`Request received for ${req.url} with : ${req.params}`);
  const rcds = fileReadRcd();
  //return res.json(rcds);
  return res.send(`<div>rcds  in ${ JSON.stringify(rcds, null, 2) }</div>`);
})

// curl -X POST http://localhost:3000/rcd -H "Content-Type: application/json" -d "{\"name\":\"from curl\",\"action\":\"idk\"}"
app.post('/rcd', (req, res) => {
  console.log(`Request received for ${req.url} with body: ${JSON.stringify(req.body)}`);
  fileAddRcd(req.body);
  // Here you would typically handle the request body
  // For example, you could save it to a database or perform some action
  res.json({ message: 'Record added successfully', data: req.body });
})

app.listen(port, () => {
  console.log(`C:\Users\dfbro\Desktop\code\nodejs\basic\basic.js app listening on port http://localhost:${port}/`)
})

