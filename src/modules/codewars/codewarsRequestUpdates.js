import User from '../user/userModel';
import message from '../messages/messages';

function codewarsRequestUpdates(req, res, next) {

}

export default codewarsRequestUpdates;

function isActualCodewarsData(codewarsAnalytics) {
  const lastRecord = codewarsAnalytics[codewarsAnalytics.length - 1];
  console.log(lastRecord.timestamp);
  return true;
}
