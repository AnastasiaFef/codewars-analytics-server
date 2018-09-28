import { Router } from 'express';

import userCheckAuth from '../user/controllers/userCheckAuth';

import groupLoadAll from './controllers/groupLoadAll';
import groupGetById from './controllers/groupGetById';
import groupUpdateById from './controllers/groupUpdateById';
import groupCreate from './controllers/groupCreate';
import groupDeleteById from './controllers/groupDeleteById';

const router = Router();

router.get('/', groupLoadAll);
router.post('/', userCheckAuth, groupCreate);
router.get('/:groupId', groupGetById);
router.patch('/:groupId', userCheckAuth, groupUpdateById);
router.delete('/:groupId', userCheckAuth, groupDeleteById);

export default router;
