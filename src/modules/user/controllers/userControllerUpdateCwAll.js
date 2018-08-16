import User from '../userModel';
import message from '../../messages/messages';
import codewarsGetUser from '../../codewars/codewarsGetUser';

// 1. Get all users from Mongo
// 2. Cycle by id's
// 3. Get new codewars data
// 4. Update existing user

const userUpdateCwAll = async (req, res, next) => {
  console.log('userUpdateCwAll');

  // 1. Get users from Mongo
  const users = await getUserAll();

  if (users.message.type === 'error') {
    return res.status(400).json(message.error(users.message.text));
  }

  const report = {
    successfully: [],
    problems: [],
  };

  await users.payload.forEach(async (el, i) => {
    console.log(el);
    // 3. Get new codewars data
    const codewarsUserNewData = await codewarsGetUser(el.codewarsId);
    if (codewarsUserNewData.message.type === 'success') {
      // 4. Update existing user
      const userUpdateResult = await userUpdate(el._id, codewarsUserNewData.payload);
      if (userUpdateResult.message.type === 'success') {
        report.successfully.push(el._id);
        // return res.status(200).json(message.success(userUpdateResult.message.text));
      } else {
        report.problems.push(el._id);
        // return res.status(400).json(message.error(userUpdateResult.message.text));
      }
    } else {
      report.problems.push(el.codewarsId);
      //return res.status(400).json(message.error(codewarsUserNewData.message.text));
    }
  });

  console.log('end');
  return res.status(200).json(message.success(report));
};

export function getUserAll() {
  return User.find()
    .select('-__v -password -email')
    .exec()
    .then(doc => message.success('Get all users OK', doc))
    .catch(() => {
      return message.error('Get all users ERROR');
    });
}

const userUpdate = (userId, codewarsUserData) => {
  return message.success('User updated successfully');
  return User.update(
    { _id: userId },
    {
      $push: {
        codewarsAnalytics: {
          timestamp: Date.now(),
          data: codewarsUserData,
        },
      },
    },
  )
    .exec()
    .then(doc => {
      if (doc.n) {
        return message.success('User updated successfully');
      } else {
        return message.error('User not found');
      }
    })
    .catch(error => message.error('Update user error', error));
};

export default userUpdateCwAll;
