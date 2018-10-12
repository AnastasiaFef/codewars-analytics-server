import Question from '../questionModel';
import message from '../../../messages/messages';

const questionDeleteAll = (req, res) => {
  Question.remove()
    .exec()
    .then(doc => {
      if (doc.n) {
        res.status(200).json(message.success('All questions deleted'));
      } else {
        res.status(400).json(message.error('Questions not found'));
      }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(message.error(err));
    });
};

export default questionDeleteAll;
