// the next line gets a express from node_modules/express:
// const express = require('express');// commonjs js.
// now wen can use the import using Esmodule , this charateristic was enable in the file packege.json




import express from 'express';
import router from './router.js';

const app = express();


// read data sent since from or postman:
app.use(express.json());


app.use('/', router);


export default app;