import User from '../userModel';
import message from '../../messages/messages';
import codewarsGetUser from '../../codewars/codewarsGetUser';

const userUpdateCw = async (req, res, next) => {
  const userId = req.params.userId;

  const user = await getUser('5b6a2c0cfdc9bf540a47440b-');

  if (user.type === 'error') {
    return res.status(400).json(message.error(user.payload));
  }

  if (allowToUpdateCodewarsByDate(user.payload.codewarsAnalytics)) {
    const codewarsUserNewData = await codewarsGetUser(user.payload.codewarsId);
  } else {
    res
      .status(400)
      .json(message.error('You can update statistic after 24h after previous call'));
  }

};

function getUser(userId) {
  return User.findById(userId)
    .select('-__v -password')
    .exec()
    .then(doc => ({
      type: 'success',
      payload: doc,
    }))
    .catch(() => {
      return {
        type: 'error',
        payload: 'User not found',
      };
    });
}

function allowToUpdateCodewarsByDate(codewarsAnalytics) {
  const lastRecord = codewarsAnalytics[codewarsAnalytics.length - 1];
  const lastRecordTime = lastRecord.timestamp;
  const currentTime = new Date();
  const hoursDifference = (new Date(currentTime) - new Date(lastRecordTime)) / 36e5;
  return hoursDifference > 24;
}

// function codewarsGetUser(codewarsId) {
//   return codewarsGetUser(codewarsId)
//     .then(codewarsUser => codewarsUser)
//     .catch(err => {
//       if (err.message === 'codewars_user_not_found') {
//         throw new Error('Wrong codewars URL or user not exist');
//       } else {
//         throw new Error(err.message);
//       }
//     });
// }

const userUpdate = (userId, codewarsUserData) => {
  return User.update({ _id: id }, { $push: { codewarsAnalytics: codewarsUserData } })
    .exec()
    .then(doc => {
      if (doc.n) {
        res.status(200).json(message.success('Ok'));
      } else {
        res.status(400).json(message.error('User not found'));
      }
    })
    .catch(err => {
      res.status(500).json(message.error(err));
    });
};

export default userUpdateCw;
