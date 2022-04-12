const express = require('express');
const bodyparser = require('body-parser');
const yargs = require('yargs');
const cors = require('cors');

const DEVELOPMET ="development";
const PRODUCTION = "production";
// CHANGE THE ENV VALUE TO EITHER DEVELOPMENT OR PRODUCTION.
const ENV = process.env.NODE_ENV;  
console.log(`ENV: ${process.env.NODE_ENV}`);

const PUBLIC_DIR = 'public';
const STATUS_OK = 200;
const STATUS_NOT_FOUND = 404;
const STATUS_CONFLICT = 409;

function initializeDummyData() {
  return {
    FEP1: {
      name: 'Front End Programming 1',
      ECTS: 5,
      description: 'Vak omtrent de basis van het programmeren van een Front End in HTML, CSS en JS',
    },
    BEP1: {
      name: 'Back End Programming 1',
      ECTS: 5,
      description: 'Vak omtrent de basis van het programmeren van een Back End met REST Interface in Java',
    },
    IPASS: {
      name: 'Individueel Project Assessment',
      ECTS: 5,
      description: 'Vak waarin je op basis van een individueel project de opgedaande kennis van de propedeuse moet aantonen',
    },
  };
}

let subjects = initializeDummyData();

const options = yargs
  .usage('Usage: npm start -- --port <port>')
  .options({
    p: {
      alias: 'port',
      describe: 'port nummer',
      type: 'number',
      default: 4000,
      demandOption: false,
    },
    h: {
      alias: 'host',
      describe: 'host',
      type: 'string',
      default: 'localhost',
      demandOption: true,
    },
  })
  .argv;

  let jsonParser = bodyparser.json();
  const app = express();
  if (ENV === DEVELOPMET) {
    app.use(cors());
  }
  if (ENV === PRODUCTION) {
    app.use(express.static(PUBLIC_DIR));
  }
  app.use(express.json());

  app.get('/v1/reset', (req, res) => {
    subjects = initializeDummyData();
    console.log('RESET');
    console.log('---------------------------------------------------------------------------');
    res.json(STATUS_OK);
  });
  
  app.get('/v1/subject', (req, res) => {
    console.log('GET /v1/subject');
    console.log(subjects);
    console.log(`SEND: ${STATUS_OK}\n`);
    res.json(subjects);
  });
  
  app.get('/v1/subject/:key', (req, res) => {
    const SUBJECT_CODE = req.params.key;
    console.log(`GET /v1/subject/${SUBJECT_CODE}`);
    console.log(subjects[SUBJECT_CODE]);
  
    if (subjects[SUBJECT_CODE]) {
      res.json(subjects[SUBJECT_CODE]);
      console.log(`SEND: ${STATUS_OK}\n`);
    } else {
      res.sendStatus(STATUS_NOT_FOUND);
      console.log(`SEND: ${STATUS_NOT_FOUND}\n`);
    }
  });
  
  app.post('/v1/subject/:key', jsonParser, (req, res) => {
    const SUBJECT_CODE = req.params.key;
    const SUBJECT_DATA = req.body;
    console.log(`POST /v1/subject/${SUBJECT_CODE}`);
    console.log(`BODY: `);
    console.dir(SUBJECT_DATA);
  
    if (subjects[SUBJECT_CODE]) {
      res.sendStatus(STATUS_CONFLICT);
      console.log(`SEND: ${STATUS_CONFLICT}`);
    } else {
      subjects[SUBJECT_CODE] = SUBJECT_DATA;
      res.sendStatus(STATUS_OK);
      console.log(`SEND: ${STATUS_OK}`);
    }
  });
  
  app.listen(options.port, () => { 
    const baseURL = `http://${options.host}:${options.port}`;
    console.log(`server running at ${baseURL}`);
    console.log('API:');
    console.log('====');
    console.log(`GET:  ${baseURL}/v1/reset`);
    console.log(`GET:  ${baseURL}/v1/subject`);
    console.log(`GET:  ${baseURL}/v1/subject/:key`);
    console.log(`POST: ${baseURL}/v1/subject/:key`);
  })