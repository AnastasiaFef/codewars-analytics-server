import mongoose from 'mongoose';
import Group from './groupModel';
import message from '../messages/messages';

export const groupLoadAll = (req, res) => {
  Group.find()
    .select('-__v')
    .exec()
    .then((docs) => {
      res.status(200)
        .json(docs);
    })
    .catch((err) => {
      console.log(err);
      res.status(500)
        .json(message.error(err));
    });
};

export async function groupCreate(req, res) {
  const _id = new mongoose.Types.ObjectId();

  const group = new Group({
    _id,
    name: req.body.name,
  });

  // Send back group id for redirect to new group after creating
  const payload = {
    groupId: _id,
  };

  group
    .save()
    .then((result) => {
      console.log(result);
      res.status(201)
        .json(message.success('Group created', payload));
    })
    .catch((err) => {
      console.log(err);
      res.status(500)
        .json(message.error(err));
    });
}

export const groupGetById = (req, res) => {
  const id = req.params.groupId;
  Group.findById(id)
    .select('-__v')
    .exec()
    .then((doc) => {
      if (doc) {
        res.status(200)
          .json(doc);
      } else {
        res.status(404)
          .json(message.error('No group for provided id'));
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500)
        .json({ error: err });
    });
};

export async function groupUpdateById(req, res) {
  const id = req.params.groupId;

  Group.update({ _id: id }, { $set: req.body })
    .exec()
    .then((doc) => {
      if (doc.n) {
        res.status(200)
          .json(message.success('Group updated'));
      } else {
        res.status(400)
          .json(message.error('Group not found'));
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500)
        .json(message.error(err));
    });
}

export const groupDeleteById = (req, res) => {
  const id = req.params.groupId;
  Group.remove({ _id: id })
    .exec()
    .then((doc) => {
      if (doc.n) {
        res.status(200)
          .json(message.success('Group deleted'));
      } else {
        res.status(400)
          .json(message.error('Group not found'));
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500)
        .json(message.error(err));
    });
};
