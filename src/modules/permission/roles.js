const roles = {
  admin: [
    // USER
    'user.get.all',
    'user.delete.any',
    'user.update.all',

    // GROUP
    'group.get.all',
    'group.create',
    'group.update.any',
    'group.delete.any',

    // QUIZ
    'quiz.get.all',
    'quiz.create',
    'quiz.update.any',
    'quiz.delete.any',

    // QUESTION
    'question.create',
    'question.delete.any',

    // QUIZ ANSWER
    'quiz.answer',
  ],
  student: [
    // USER
    'user.get.all',

    // GROUP
    'group.get.all',

    // QUIZ
    'quiz.get.all',

    // QUIZ ANSWER
    'quiz.answer',
  ],
};

export default roles;
