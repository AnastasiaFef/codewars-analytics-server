import User from '../userModel';
import message from '../../messages/messages';
import codewarsGetUser from '../../codewars/codewarsGetUser';

const userUpdateCw = (req, res, next) => {
  const userId = req.params.userId;

  getUser('5b6a2c0cfdc9bf540a47440b-')
    .then(a => {
      console.log('Then', a);
      res.status(200).json(message.success('---'));
      // if (allowToUpdateCodewarsByDate(user.codewarsAnalytics)) {
      //   // const codewarsUserNewData = await cwGetUser(user.codewarsId);
      // } else {
      //   res
      //     .status(400)
      //     .json(message.error('You can update statistic after 24h after previous call'));
      // }
    })
    .catch(e => {
      console.log('==========');
      console.log(e);
      res.status(400).json(message.error(e));
      console.log('==========');
    });
};

function getUser(userId) {
  return User.findById(userId)
    .select('-__v -password')
    .exec()
    .then(doc => doc)
    .catch(() => {
      console.log('--Get User error--');
      return 'Get User error';
    });
}

function allowToUpdateCodewarsByDate(codewarsAnalytics) {
  const lastRecord = codewarsAnalytics[codewarsAnalytics.length - 1];
  const lastRecordTime = lastRecord.timestamp;
  const currentTime = new Date();
  const hoursDifference = (new Date(currentTime) - new Date(lastRecordTime)) / 36e5;
  return hoursDifference > 24;
}

function cwGetUser(codewarsId) {
  return codewarsGetUser(codewarsId)
    .then(codewarsUser => codewarsUser)
    .catch(err => {
      if (err.message === 'codewars_user_not_found') {
        throw new Error('Wrong codewars URL or user not exist');
      } else {
        throw new Error(err.message);
      }
    });
}

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
