import Group from '../groupModel';
import message from '../../messages/messages';

const groupDeleteById = (req, res) => {
  const id = req.params.groupId;
  Group.remove({ _id: id })
    .exec()
    .then(doc => {
      if (doc.n) {
        res.status(200).json(message.success('Group deleted'));
      } else {
        res.status(400).json(message.error('Group not found'));
      }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(message.error(err));
    });
};

export default groupDeleteById;
