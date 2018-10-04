import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import _ from 'lodash';
import User from '../userModel';
import message from '../../messages/messages';
import roles from '../../permission/roles';

const acl = userRoles => _.uniq(_.flattenDeep(userRoles.map(el => roles[el])));

const userLogin = (req, res, next) => {
  User.find({ email: req.body.email })
    .select('-__v')
    .exec()
    .then(user => {
      if (!user.length) {
        throw 'User not found';
      }

      bcrypt.compare(req.body.password, user[0].password, (err, result) => {
        if (err) {
          res.status(401).json(message.error('Auth failed. Email'));
        }

        if (result) {
          const token = jwt.sign(
            {
              email: user[0].email,
              userId: user[0]._id,
              codewarsId: user[0].codewarsId,
            },
            process.env.JWT_KEY,
            {
              expiresIn: process.env.JWT_EXPIRES_IN,
            },
          );

          user[0].password = null;

          return res.status(200).json({
            message: {
              text: 'Auth success',
              type: 'success',
            },
            token,
            user: user[0],
            acl: acl(user[0].roles),
            userId: user[0]._id,
          });
        }

        res.status(401).json(message.error('Auth failed'));
      });
    })
    .catch(error => {
      if (error === 'User not found') {
        res.status(401).json(message.error('Auth failed. User not found'));
      } else {
        res.status(500).json(message.error(error));
      }
    });
};

export default userLogin;
