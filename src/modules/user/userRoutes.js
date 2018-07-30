import { Router } from 'express';
import userCheckAuth from './controllers/userCheckAuth';
import { userGetAll, userLogin, userGetById, userDeleteById } from './controllers/userControllers';
import userRegister from './controllers/userControllerRegister.js';

const router = Router();

// USER
router.get('/', userCheckAuth, userGetAll);
router.post('/', userRegister);
router.post('/login', userLogin);
router.get('/:userId', userCheckAuth, userGetById);
router.delete('/:userId', userCheckAuth, userDeleteById);

// Not active
// router.patch('/:userId', userUpdateById);

export default router;
