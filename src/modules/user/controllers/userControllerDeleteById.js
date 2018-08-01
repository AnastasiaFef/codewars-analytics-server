import User from '../userModel';
import message from '../../messages/messages';

const userDeleteById = (req, res, next) => {
  const id = req.params.userId;
  User.remove({ _id: id })
    .exec()
    .then(doc => {
      if (doc.result.n) {
        res.status(200).json(message.success('User deleted'));
      } else {
        res.status(400).json(message.error('User not found'));
      }
    })
    .catch(err => {
      res.status(500).json(message.error(err));
    });
};

export default userDeleteById;
