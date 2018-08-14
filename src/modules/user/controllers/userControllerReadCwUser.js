import message from '../../messages/messages';
import codewarsGetUser from '../../codewars/codewarsGetUser';

const readCwUser = (req, res, next) => {
  const codewarsId = req.params.codewarsId;

  codewarsGetUser(codewarsId)
    .then(codewarsUser => {
      if (codewarsUser.message.type === 'success') {
        res.status(200).json(codewarsUser.payload);
      } else if (codewarsUser.name) {
        throw new Error('codewars_user_not_found'); // Express will catch this on its own.
      }
    })
    .catch(err => {
      if (err.message === 'codewars_user_not_found') {
        res.status(409).json(message.error('Wrong codewars URL or user not exist'));
      } else {
        res.status(409).json(message.error(''));
      }
    });
};

export default readCwUser;
