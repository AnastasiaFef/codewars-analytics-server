import User from '../userModel';
import message from '../../messages/messages';

const userControllerUpdateAddRole = () => {
  console.log('HERE');

  User.update(
    {},
    {
      $push: {
        roles: 'student',
      },
    },
    { multi: true },
  )
    .exec()
    .then(doc => {
      if (doc.n) {
        return message.success('Role successfully added');
      }
      return message.error('User not found');
    })
    .catch(error => message.error('Add Role error', error));
};

export default userControllerUpdateAddRole;
