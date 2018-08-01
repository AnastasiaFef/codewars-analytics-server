import User from '../userModel';
import message from '../../messages/messages';

const userUpdateCw = (req, res, next) => {
  const id = req.params.userId;
  res.status(200).json(message.success('User updated'));

  // User.update({ _id: id }, { $set: req.body })
  //   .exec()
  //   .then(doc => {
  //     if (doc.n) {
  //     } else {
  //       res.status(400).json(message.error('User not found'));
  //     }
  //   })
  //   .catch(err => {
  //     res.status(500).json(message.error(err));
  //   });
};

export default userUpdateCw;
