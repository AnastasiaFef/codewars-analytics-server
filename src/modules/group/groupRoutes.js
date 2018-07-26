import { Router } from 'express';

import {
  groupCreate,
  groupLoadAll,
  groupDeleteById,
  groupGetById,
  groupUpdateById,
} from './groupControllers';
import userCheckAuth from '../user/userCheckAuth';

const router = Router();

router.get('/', groupLoadAll);
router.post('/', userCheckAuth, groupCreate);
router.get('/:groupId', groupGetById);
router.patch('/:groupId', userCheckAuth, groupUpdateById);
router.delete('/:groupId', userCheckAuth, groupDeleteById);

export default router;
