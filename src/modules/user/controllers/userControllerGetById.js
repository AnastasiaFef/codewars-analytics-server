import User from '../userModel';
import message from '../../messages/messages';

const userGetById = (req, res, next) => {
  const id = req.params.userId;
  User.findById(id)
    .select('-__v -password')
    .exec()
    .then(doc => {
      if (doc) {
        res.status(200).json(doc);
      } else {
        res.status(404).json(message.error('No user for provided id'));
      }
    })
    .catch(err => {
      res.status(500).json(message.error(err));
    });
};

export default userGetById;
