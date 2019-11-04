/**
 * Converts date into a time ago string like 2 hours ago
 *
 * @param {obj} date
 * @param {obj} $t
 */
export const timeAgo = date => {
  const seconds = Math.floor((new Date() - Number(date)) / 1000);
  let interval = Math.floor(seconds / 31536000);

  if (interval > 1) {
    return { interval, unit: 'years' };
  }

  interval = Math.floor(seconds / 2592000);
  if (interval > 1) {
    return { interval, unit: 'months' };
  }

  interval = Math.floor(seconds / 86400);
  if (interval > 1) {
    return { interval, unit: 'days' };
  }

  interval = Math.floor(seconds / 3600);
  if (interval > 1) {
    return { interval, unit: 'hours' };
  }

  interval = Math.floor(seconds / 60);
  if (interval > 1) {
    return { interval, unit: 'minutes' };
  }

  return { interval: Math.floor(seconds), unit: 'seconds' };
};
