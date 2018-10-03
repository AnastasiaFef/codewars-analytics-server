import Group from '../groupModel';
import message from '../../messages/messages';

export default async function groupAddUsers(req, res) {
  const id = req.params.groupId;

  Group.update({ _id: id }, { $set: req.body })
    .exec()
    .then(doc => {
      if (doc.n) {
        res.status(200).json(message.success('Group updated'));
      } else {
        res.status(400).json(message.error('Group not found'));
      }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(message.error(err));
    });
}
