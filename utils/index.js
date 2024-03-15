import moment from "moment";

export function timeAgo(date) {
  const dateTimeAgo = moment(date).fromNow();
  return dateTimeAgo;
}
