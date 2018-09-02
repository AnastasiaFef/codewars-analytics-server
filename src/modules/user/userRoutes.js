import { Router } from 'express';
import userCheckAuth from './controllers/userCheckAuth';
import userRegister from './controllers/userControllerRegister';
import userLogin from './controllers/userControllerLogin';
// import userUpdateCw from './controllers/userControllerUpdateCw';
import userGetAll from './controllers/userControllerGetAll';
import userGetById from './controllers/userControllerGetById';
import userDeleteById from './controllers/userControllerDeleteById';
import codewarsReadUser from './controllers/userControllerReadCwUser';
import userUpdateCwAll from './controllers/userControllerUpdateCwAll';

const router = Router();

// USER
router.get('/', userCheckAuth, userGetAll);
router.post('/', userRegister);
router.post('/login', userLogin);
router.get('/:userId', userCheckAuth, userGetById);
router.delete('/:userId', userCheckAuth, userDeleteById);

router.get('/read/cw/:codewarsId', codewarsReadUser);
router.get('/update/cw/all', userUpdateCwAll);
// router.get('/update/cw/:userId', userUpdateCw);
// Not active
// router.patch('/:userId', userUpdateById);

export default router;
