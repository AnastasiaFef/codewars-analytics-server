import Group from './../groupModel';
import message from '../../messages/messages';

const groupLoadAll = (req, res) => {
  Group.find()
    .select('-__v')
    .exec()
    .then(docs => {
      res.status(200).json(docs);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(message.error(err));
    });
};

export default groupLoadAll;
