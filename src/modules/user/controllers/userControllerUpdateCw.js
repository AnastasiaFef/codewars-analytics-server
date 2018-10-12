import User from '../userModel';
import message from '../../messages/messages';
import codewarsGetUser from '../../codewars/codewarsGetUser';

// 1. Get user from Mongo
// 2. Check if last request is no early than 24h
// 3. Get new codewars data
// 4. Update existing user

const userUpdateCw = async (req, res, next) => {
  const { userId } = req.params;
  // 1. Get user from Mongo
  const user = await getUser(userId);

  if (user.message.type === 'error') {
    return res.status(400).json(message.error(user.message.text));
  }

  // 2. Check if last request is no early than 24h
  if (allowToUpdateCodewarsByDate(user.payload.codewarsAnalytics)) {
    // 3. Get new codewars data
    const codewarsUserNewData = await codewarsGetUser(user.payload.codewarsId);
    if (codewarsUserNewData.message.type === 'success') {
      // 4. Update existing user
      // eslint-disable-next-line no-use-before-define
      const userUpdateResult = await userUpdate(userId, codewarsUserNewData.payload);
      if (userUpdateResult.message.type === 'success') {
        return res.status(200).json(message.success(userUpdateResult.message.text));
      }
      return res.status(400).json(message.error(userUpdateResult.message.text));
    }
    return res.status(400).json(message.error(codewarsUserNewData.message.text));
  }
  return res
    .status(400)
    .json(message.error('You can update statistic after 24h after previous call'));
};

function getUser(userId) {
  return User.findById(userId)
    .select('-__v -password')
    .exec()
    .then(doc => message.success('Get user OK', doc))
    .catch(() => message.error('User not found'));
}

function allowToUpdateCodewarsByDate(codewarsAnalytics) {
  const lastRecordTime = codewarsAnalytics[codewarsAnalytics.length - 1].timestamp;
  const currentTime = new Date();
  const hoursDifference = (new Date(currentTime) - new Date(lastRecordTime)) / 36e5;
  return hoursDifference > 24;
}

const userUpdate = (userId, codewarsUserData) =>
  User.update(
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
      }
      return message.error('User not found');
    })
    .catch(error => message.error('Update user error', error));

export default userUpdateCw;
