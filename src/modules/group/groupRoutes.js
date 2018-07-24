import { Router } from 'express';

import {
  groupCreate,
  groupLoadAll,
  groupDeleteById,
  groupGetById,
  groupUpdateById,
} from './groupControllers';

const router = Router();

router.get('/', groupLoadAll);
router.post('/', groupCreate);
router.get('/:groupId', groupGetById);
router.patch('/:groupId', groupUpdateById);
router.delete('/:groupId', groupDeleteById);

export default router;
