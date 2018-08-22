import userRouter from '../user/userRoutes';
import groupRouter from '../group/groupRoutes';
import backupRouter from '../backup/backupRoutes';
import infoRouter from '../info/infoRoutes';

export default function routes(app) {
  app.use('/user', userRouter);
  app.use('/group', groupRouter);
  app.use('/backup', backupRouter);
  app.use('/info', infoRouter);
}
