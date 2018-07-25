import userRouter from './modules/user/userRoutes';
import groupRouter from './modules/group/groupRoutes';

export default function routes(app) {
  app.use('/user', userRouter);
  app.use('/group', groupRouter);
}
