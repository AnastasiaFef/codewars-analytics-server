import { Router } from 'express';
import userCheckAuth from './controllers/userCheckAuth';
import userCheckPerm from '../permission/userCheckPerm';
import userRegister from './controllers/userControllerRegister';
import userLogin from './controllers/userControllerLogin';
import userGetAll from './controllers/userControllerGetAll';
import userGetAllLightweight from './controllers/userControllerGetAllList';
import userGetById from './controllers/userControllerGetById';
import userDeleteById from './controllers/userControllerDeleteById';
import codewarsReadUser from './controllers/userControllerReadCwUser';
import userUpdateCwAll from './controllers/userControllerUpdateCwAll';

const router = Router();

// USER
router.get('/', userCheckAuth, userCheckPerm('user.get.all'), userGetAll);

router.get(
  '/lightweight',
  userCheckAuth,
  userCheckPerm('user.get.all'),
  userGetAllLightweight,
);

router.post('/', userRegister);

router.post('/login', userLogin);

router.get('/:userId', userCheckAuth, userCheckPerm('user.get.all'), userGetById);

router.delete(
  '/:userId',
  userCheckAuth,
  userCheckPerm('user.delete.any'),
  userDeleteById,
);

router.get(
  '/read/cw/:codewarsId',
  userCheckAuth,
  userCheckPerm('user.get.all'),
  codewarsReadUser,
);

router.get(
  '/update/cw/all',
  userCheckAuth,
  userCheckPerm('user.update.all'),
  userUpdateCwAll,
);

export default router;
