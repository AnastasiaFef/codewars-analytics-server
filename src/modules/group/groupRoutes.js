import { Router } from 'express';

import userCheckAuth from '../user/controllers/userCheckAuth';
import userCheckPerm from '../permission/userCheckPerm';

import groupLoadAll from './controllers/groupLoadAll';
import groupGetById from './controllers/groupGetById';
import groupUpdateById from './controllers/groupUpdateById';
import groupCreate from './controllers/groupCreate';
import groupDeleteById from './controllers/groupDeleteById';
// import groupAddUsers from './controllers/groupAddUsers';

const router = Router();

router.get('/', groupLoadAll);

router.post('/', userCheckAuth, userCheckPerm('group.create'), groupCreate);

router.get('/:groupId', userCheckAuth, groupGetById);

router.patch(
  '/:groupId',
  userCheckAuth,
  userCheckPerm('group.update.any'),
  groupUpdateById,
);

router.delete(
  '/:groupId',
  userCheckAuth,
  userCheckPerm('group.delete.any'),
  groupDeleteById,
);

// router.patch('/:groupId/addUsers', userCheckAuth, groupAddUsers);

export default router;
