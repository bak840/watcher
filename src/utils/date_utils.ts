function addSecondsToDate(date: Date, seconds: number) {
  const epoch = date.getTime();
  const hoursToMs = seconds * 1000;
  return new Date(epoch + hoursToMs);
}

function addMinutesToDate(date: Date, minutes: number) {
  return addSecondsToDate(date, minutes * 60);
}

function addHoursToDate(date: Date, hours: number) {
  return addSecondsToDate(date, hours * 3600);
}

function dateWithHoursOffset(hours: number) {
  return addHoursToDate(new Date(), hours);
}

function addOneSecondToDate(date: Date) {
  return addSecondsToDate(date, 1);
}

export {
  addSecondsToDate,
  addMinutesToDate,
  addHoursToDate,
  addOneSecondToDate,
  dateWithHoursOffset,
};
