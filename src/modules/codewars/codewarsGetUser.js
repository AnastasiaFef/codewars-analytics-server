import axios from 'axios';
import message from '../messages/messages';

function codewarsGetUser(codewarsId = 0) {
  return axios
    .get(`https://www.codewars.com/api/v1/users/${codewarsId}`)
    .then(response => message.success('Codewars get user OK', response.data))
    .catch(error => message.error('Codewars get user error', error));
}

export default codewarsGetUser;
