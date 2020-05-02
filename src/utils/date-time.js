const getMonthName = (dateObject) => {
  const monthNames = [
    `January`, `February`, `March`, `April`, `May`, `June`,
    `July`, `August`, `September`, `October`, `November`, `December`,
  ];
  return monthNames[dateObject.getMonth()];
};

const getFormatDuration = (duration) => {
  const hours = Math.floor(duration / 60);
  const minutes = Math.round(duration % 60);
  return `${hours}h ${minutes}m`;
};

const getCommentFormatDate = (date) => {
  return `${date.getFullYear()}/${date.getMonth()}/${date.getDate()} ${date.getHours()}:${date.getMinutes()}`;
};

export {getMonthName, getFormatDuration, getCommentFormatDate};
