import express from 'express';
import mongoConnection from './db';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import routes from './routes';
import errorHandling from './errorHandling';

const PORT = +process.env.PORT || 5000;
const app = express();

// ===== DISABLE EXPRESS SIGNATURE ======
app.disable('x-powered-by');

// ===== DATABASE ======
mongoConnection();

// ===== LOGGER =====
app.use(morgan('dev'));

// ===== PARSE RESPONSE =====
app.use(bodyParser.urlencoded({ extended: false })); // support encoded bodies
app.use(bodyParser.json()); // support json encoded bodies

// ===== CORS =====
app.use((req, res, next) => {
  // eslint-disable-line consistent-return
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization',
  );
  if (req.method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
    return res.status(200).json({});
  }
  next();
});

// ===== IGNORE FAVICON =====
app.get('/favicon.ico', (req, res) => res.status(204));

// ===== ROUTING =====
routes(app);

// ===== ERROR HANDLING =====
errorHandling(app);

// ===== PORT =====
app.listen(PORT, () => {
  console.log(`Node cluster worker ${process.pid}: listening on port ${PORT}`);
});
