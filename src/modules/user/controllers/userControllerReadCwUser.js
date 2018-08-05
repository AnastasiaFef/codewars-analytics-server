import message from '../../messages/messages';
import getCodewarsUser from '../../codewars/getCodewarsUser';

const readCwUser = (req, res, next) => {
  const codewarsId = req.params.codewarsId;

  getCodewarsUser(codewarsId)
    .then(codewarsUser => {
      if (codewarsUser.success === false) {
        throw new Error('codewars_user_not_found'); // Express will catch this on its own.
      } else if (codewarsUser.name) {
        res.status(200).json(codewarsUser);
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
