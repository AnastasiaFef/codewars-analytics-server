import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../userModel';
import message from '../../messages/messages';

export const userGetAll = (req, res, next) => {
  User.find()
    .select('-__v -password')
    .exec()
    .then(docs => {
      res.status(200).json(docs);
    })
    .catch(err => {
      res.status(500).json(message.error(err));
    });
};

export const userLogin = (req, res, next) => {
  User.find({ email: req.body.email })
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
            },
            process.env.JWT_KEY,
            {
              expiresIn: process.env.JWT_EXPIRES_IN,
            },
          );
          return res.status(200).json({
            message: {
              text: 'Auth success',
              type: 'success',
            },
            token,
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

export const userGetById = (req, res, next) => {
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

export const userUpdateById = (req, res, next) => {
  const id = req.params.userId;
  User.update({ _id: id }, { $set: req.body })
    .exec()
    .then(doc => {
      if (doc.n) {
        res.status(200).json(message.success('User updated'));
      } else {
        res.status(400).json(message.error('User not found'));
      }
    })
    .catch(err => {
      res.status(500).json(message.error(err));
    });
};

export const userDeleteById = (req, res, next) => {
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
