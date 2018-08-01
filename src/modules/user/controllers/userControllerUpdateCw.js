import User from '../userModel';
import message from '../../messages/messages';
import getCodewarsUser from '../../codewars/getCodewarsUser';

const userUpdateCw = (req, res, next) => {
  getCodewarsUser(req.userData.codewarsId)
    .then(codewarsUser => {
      if (codewarsUser.success === false) {
        throw new Error('codewars_user_not_found'); // Express will catch this on its own.
      } else if (codewarsUser.name) {
        userUpdate(req, res, next, codewarsUser);
      }
    })
    .catch(err => {
      if (err.message === 'codewars_user_not_found') {
        res.status(409).json(message.error('Wrong codewars URL or user not exist'));
      } else {
        res.status(409).json(message.error(''));
      }
    });
};

const userUpdate = (req, res, next, codewarsUser) => {
  const id = req.params.userId;
  User.update({ _id: id }, { $push: { codewarsAnalytics: codewarsUser } })
    .exec()
    .then(doc => {
      if (doc.n) {
        res.status(200).json(message.error('Ok'));
      } else {
        res.status(400).json(message.error('User not found'));
      }
    })
    .catch(err => {
      res.status(500).json(message.error(err));
    });
};

export default userUpdateCw;
