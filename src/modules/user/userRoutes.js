import { Router } from 'express';
import userCheckAuth from './controllers/userCheckAuth';
import userRegister from './controllers/userControllerRegister';
import userLogin from './controllers/userControllerLogin';
import userUpdateCw from './controllers/userControllerUpdateCw';
import userGetAll from './controllers/userControllerGetAll';
import userGetById from './controllers/userControllerGetById';
import userDeleteById from './controllers/userControllerDeleteById';
import readCwUser from './controllers/userControllerReadCwUser';

const router = Router();

// USER
router.get('/', userCheckAuth, userGetAll);
router.post('/', userRegister);
router.post('/login', userLogin);
router.get('/:userId', userCheckAuth, userGetById);
router.delete('/:userId', userCheckAuth, userDeleteById);

router.get('/read/cw/:codewarsId', readCwUser);
router.get('/update/cw/:userId', userCheckAuth, userUpdateCw);
// Not active
// router.patch('/:userId', userUpdateById);

export default router;
