import mongoose from 'mongoose';
import Answer from '../answer/answerModel';
import message from '../../messages/messages';
import Question from '../question/questionModel';
import _ from 'lodash';

async function answerCreate(req, res) {
  const _id = new mongoose.Types.ObjectId();
  const { userId } = req.userData;
  const { questionId } = req.body;
  const { variants } = req.body;

  const answer = new Answer({
    _id,
    questionId,
    answerType: req.body.answerType,
    variants,
    note: req.body.note,
    owner: userId,
  });

  // Send back answer id for redirect to new answer after creating
  const payload = {
    answerId: _id,
  };

  let question;

  try {
    question = await Question.findById(questionId).exec();
  } catch (err) {
    res.status(500).json(message.error(err));
  }

  const trueQuestionId = question.variants
    .filter(el => el.correct)
    .map(el => el._id)
    .sort();

  const userAnswerId = variants;

  const reward = _.isEqual(trueQuestionId, answer) ? question.reward : 0;

  console.log(trueQuestionId, answer);
  // console.log(question);

  res.status(201).json(reward);
  //   answer
  // //     .save()
  //     .then(() => {
  //       res.status(201).json(message.success('Answer created', payload));
  //     })
  //     .catch(err => {
  //       res.status(500).json(message.error(err));
  //     });
}

export default answerCreate;
