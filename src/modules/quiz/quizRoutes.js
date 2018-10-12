import { Router } from 'express';

import userCheckAuth from '../user/controllers/userCheckAuth';
import userCheckPerm from '../permission/userCheckPerm';

import questionGetAll from './question/controllers/questionGetAll';
import questionCreate from './question/controllers/questionCreate';
import questionDeleteAll from './question/controllers/questionDeleteAll';

import answerCreate from './answer/answerCreate';
import answerGetAll from './answer/answerGetAll';
// import quizGetById from './controllers/quizGetById';
// import quizUpdateById from './controllers/quizUpdateById';
// import quizDeleteById from './controllers/quizDeleteById';

const router = Router();

// QUESTION
router.get('/question', userCheckAuth, userCheckPerm('quiz.get.all'), questionGetAll);
router.post('/question', userCheckAuth, userCheckPerm('question.create'), questionCreate);

router.delete(
  '/question/all',
  userCheckAuth,
  userCheckPerm('question.delete.any'),
  questionDeleteAll,
);

// ANSWER
router.get('/answer', userCheckAuth, userCheckPerm('quiz.get.all'), answerGetAll);
router.post('/answer', userCheckAuth, userCheckPerm('quiz.answer'), answerCreate);

// router.get('/:quizId', quizGetById);
//
// router.patch('/:quizId', userCheckAuth, userCheckPerm('quiz.update.any'), quizUpdateById);
//
// router.delete(
//   '/:quizId',
//   userCheckAuth,
//   userCheckPerm('quiz.delete.any'),
//   quizDeleteById,
// );

export default router;
