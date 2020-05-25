import moment from 'moment';
import momentDurationFormatSetup from 'moment-duration-format';

momentDurationFormatSetup(moment);

const getFormatDuration = (duration) => {
  return moment.duration(duration, `minutes`).format(`h[h] m[m]`);
};

const getReleaseDate = (date) => {
  return moment(date).format(`DD MMMM YYYY`);
};

const getCommentFormatDate = (date) => {
  return moment(date).fromNow();
};

const getStatisticsFormatDuration = (duration) => {
  return JSON.parse(moment.duration(duration, `minutes`).format(`{["h"]:h, ["m"]:m}`));
};

export {getStatisticsFormatDuration, getFormatDuration, getReleaseDate, getCommentFormatDate};
