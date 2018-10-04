import _ from 'lodash';
import User from '../userModel';
import message from '../../messages/messages';
import roles from '../../permission/roles';

const acl = userRoles => _.uniq(_.flattenDeep(userRoles.map(el => roles[el])));

const userGetById = (req, res, next) => {
  const id = req.params.userId;
  User.findById(id)
    .select('-__v -password -email -phone')
    .exec()
    .then(doc => {
      if (doc) {
        res.status(200).json({
          ...doc._doc,
          acl: acl(doc.roles),
        });
      } else {
        res.status(404).json(message.error('No user for provided id'));
      }
    })
    .catch(err => {
      res.status(500).json(message.error(err));
    });
};

export default userGetById;
