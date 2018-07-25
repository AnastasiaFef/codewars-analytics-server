import userRouter from '../user/userRoutes';
import groupRouter from '../group/groupRoutes';

export default function routes(app) {
  app.use('/user', userRouter);
  app.use('/group', groupRouter);
}
