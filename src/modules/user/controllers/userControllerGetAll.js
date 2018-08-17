import User from '../userModel';
import message from '../../messages/messages';

const userGetAll = (req, res, next) => {
  User.find()
    .select('-__v -password -email')
    .exec()
    .then(docs => {
      res.status(200).json(docs);
    })
    .catch(err => {
      res.status(500).json(message.error(err));
    });
};

export default userGetAll;
