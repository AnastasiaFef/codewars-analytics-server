import mongoose from 'mongoose';
import Group from '../groupModel';
import User from '../../user/userModel';
import message from '../../messages/messages';

export default async function groupCreate(req, res) {
  const _id = new mongoose.Types.ObjectId();
  const userId = req.userData.userId;

  const group = new Group({
    _id,
    name: req.body.name,
    description: req.body.description,
    owner: userId,
    members: [userId],
  });

  // Send back group id for redirect to new group after creating
  const payload = {
    groupId: _id,
  };

  group
    .save()
    .then(() => {
      //  Add group id to User
      User.update({ _id: userId }, { $push: { groups: _id } })
        .exec()
        .then(doc => {
          if (doc.n) {
            payload.userMessage = 'Add Group id to User. Success';
          } else {
            payload.userMessage = 'Add Group id to User. User not found';
          }
        })
        .catch(error => {
          payload.userMessage = 'Add Group id to User. Error';
          payload.userError = error;
        });

      res.status(201).json(message.success('Group created', payload));
    })
    .catch(err => {
      res.status(500).json(message.error(err));
    });
}
