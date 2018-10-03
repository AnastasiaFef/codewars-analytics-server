import message from '../messages/messages';
import User from '../user/userModel';
import roles from './roles';

const userCan = (userRoles, checkedPermission) => {
  for (let i = 0; i < userRoles.length; i += 1) {
    if (roles[userRoles[i]].includes(checkedPermission)) return true;
  }
  return false;
};

const userCheckPerm = checkedPermission => (req, res, next) => {
  const userId = req.userData.userId;

  User.findById(userId)
    .select('-__v -password -codewarsAnalytics')
    .exec()
    .then(doc => {
      res.status(200).json([checkedPermission, userCan(doc.roles, checkedPermission)]);
      // next();
    })
    .catch(err => {
      res.status(500).json(message.error(err));
    });
};

export default userCheckPerm;
