import {
  formatDistanceToNow,
  intervalToDuration,
  isToday,
  isYesterday,
  parse,
} from 'date-fns';

export function formatDateDistance(endDate) {
  const currentDate = new Date();
  const end = endDate ? new Date(endDate) : new Date();

  const isPast = end < currentDate;

  let formattedDistance;

  if (isPast) {
    formattedDistance = `Exp. ${formatDistanceToNow(end)} ago`;
  } else {
    const duration = intervalToDuration({ start: currentDate, end });
    const { years, months, weeks, days } = duration;

    if (years >= 1) {
      formattedDistance = `In ${years} year${years > 1 ? 's' : ''}`;
    } else if (months >= 1) {
      formattedDistance = `In ${months} month${months > 1 ? 's' : ''}`;
    } else if (weeks >= 1) {
      formattedDistance = `In ${weeks} week${weeks > 1 ? 's' : ''}`;
    } else {
      formattedDistance = `In ${days} day${days > 1 ? 's' : ''}`;
    }
  }

  return formattedDistance;
}

export function formatDateToRelative(dateString) {
  const date = parse(dateString, 'yyyy-MM-dd', new Date());

  if (isToday(date)) {
    return 'today';
  } else if (isYesterday(date)) {
    return 'yesterday';
  } else {
    return formatDistanceToNow(date, { addSuffix: true });
  }
}

export function capitalizeFirstLetter(str) {
  const stringArray = str.split(/-| /);

  if (stringArray.length >= 2) {
    const newArray = stringArray.map(
      (string) => string.charAt(0).toUpperCase() + string.slice(1).toLowerCase()
    );
    return newArray.join(' ');
  }
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}
