import mongoose from 'mongoose';
import Question from '../questionModel';
import message from '../../../messages/messages';

async function questionCreate(req, res) {
  const _id = new mongoose.Types.ObjectId();
  const { userId } = req.userData;

  const question = new Question({
    _id,
    name: req.body.name,
    description: req.body.description,
    owner: userId,
    answerType: req.body.answerType,
    variants: req.body.variants,
  });

  // Send back question id for redirect to new question after creating
  const payload = {
    questionId: _id,
  };

  question
    .save()
    .then(() => {
      res.status(201).json(message.success('Question created', payload));
    })
    .catch(err => {
      res.status(500).json(message.error(err));
    });
}

export default questionCreate;
