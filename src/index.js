import express from 'express';
import mongoConnection from './modules/core/db';
import logger from './modules/core/logger';
import parseResponse from './modules/core/parseResponse';
import ignoreFavicon from './modules/core/ignoreFavicon';
import routes from './modules/core/routes';
import cors from './modules/core/cors';
import errorHandling from './modules/core/errorHandling';
// const cron = require('node-cron');

const PORT = +process.env.PORT || 5000;
const app = express();

app.disable('x-powered-by'); // DISABLE EXPRESS SIGNATURE
mongoConnection();
logger(app);
parseResponse(app);
cors(app);
ignoreFavicon(app);
routes(app);
errorHandling(app);

// const task = cron.schedule('10 * * * * *', function() {
//   console.log('running a task every 2 minute ' + new Date().toLocaleString('en-US'))
// });
//
// task.start();

// ===== PORT =====
app.listen(PORT, () => {
  console.log(`Node cluster worker ${process.pid}: listening on port ${PORT}`);
});
