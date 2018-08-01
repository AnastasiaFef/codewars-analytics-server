import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import User from '../userModel';
import message from '../../messages/messages';
import getCodewarsUser from '../../codewars/getCodewarsUser';

// 1. Check if mail exist
// 2. Check codewars user if exist
// 3. Create user with codewars data
const userRegister = async (req, res, next) => {
  if (await isUserExist(req, res, next)) {
    res.status(409).json(message.error('Mail exist.'));
  } else {
    getCodewarsUser(req.body.codewarsId)
      .then(codewarsUser => {
        if (codewarsUser.success === false) {
          throw new Error('codewars_user_not_found'); // Express will catch this on its own.
        } else if (codewarsUser.name) {
          createUser(req, res, next, codewarsUser);
        }
      })
      .catch(err => {
        if (err.message === 'codewars_user_not_found') {
          res.status(409).json(message.error('Wrong codewars URL or user not exist'));
        } else {
          res.status(409).json(message.error(''));
        }
      });
  }
};

export default userRegister;

async function isUserExist(req, res, next, email) {
  const users = await User.find({ email })
    .exec()
    .catch(err => res.status(500).json(message.error(err)));
  return users.length > 0;
}

function createUser(req, res, next, codewarsUser) {
  bcrypt.hash(req.body.password, 10, (bcryptError, hash) => {
    if (bcryptError) {
      return res.status(500).json(message.error(bcryptError));
    }

    const user = new User({
      _id: new mongoose.Types.ObjectId(),
      email: req.body.email,
      codewarsId: req.body.codewarsId,
      password: hash,
      codewarsAnalytics: [
        {
          timestamp: Date.now(),
          data: codewarsUser,
        },
      ],
    });

    user
      .save()
      .then(() => {
        res.status(201).json(message.success('User created'));
      })
      .catch(userError => {
        res.status(500).json(message.error(userError));
      });
  });
}
