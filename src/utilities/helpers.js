import {
  formatDistanceToNow,
  intervalToDuration,
  isToday,
  isYesterday,
  parse,
} from 'date-fns';

import imageCompression from 'browser-image-compression';

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

export function reformatDateString(dateString) {
  const date = new Date(dateString);
  return date.toISOString().split('T')[0];
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

export async function handleImageCompression(image, filename) {
  // console.log(`originalFile size ${image.size / 1024 / 1024} MB`);

  const options = {
    maxSizeMB: 0.3,
    maxWidthOrHeight: 1920,
    useWebWorker: true,
  };
  try {
    const compressedBlob = await imageCompression(image, options);

    const compressedFile = new File([compressedBlob], filename, {
      type: compressedBlob.type,
      lastModified: Date.now(),
    });
    // console.log(`compressedFile size ${compressedFile.size / 1024 / 1024} MB`);

    return compressedFile;
  } catch (error) {
    console.log(error);
  }
}

/* eslint-disable */
function extractVideoId(url) {
  const match = url.match(
    /(?:youtu\.be\/|youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/
  );
  return match ? match[1] : null;
}
/* eslint-enable */

export function convertToEmbedLink(normalLink) {
  const videoId = extractVideoId(normalLink);
  if (videoId) {
    return `https://www.youtube.com/embed/${videoId}`;
  }
  return null;
}

export const addQueryParam = (url, paramName, paramValue) => {
  if (paramValue) {
    url += url.includes('?')
      ? `&${paramName}=${paramValue}`
      : `?${paramName}=${paramValue}`;
  }

  return url;
};

export function truncateString(str, num = 10) {
  const words = str.split(' ');

  if (words.length <= num) {
    return str;
  }

  return words.slice(0, num).join(' ') + '...';
}

export function isEven(num) {
  return num % 2 === 0;
}
