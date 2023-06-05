export const formatNumber = (num) => {
  try {
    if (num > 1_000_000) {
      return (num / 1_000_000).toFixed(1) + 'M';
    } else {
      return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
    }
  } catch (error) {
    return '-';
  }
};

export function numTo2Digits(num) {
  return num.toString().padStart(2, '0');
}

export function convertMsToTime(milliseconds) {
  let seconds = Math.floor(milliseconds / 1000);
  let minutes = Math.floor(seconds / 60);
  let hours = Math.floor(minutes / 60);

  seconds = seconds % 60;
  minutes = minutes % 60;

  hours = hours % 24;

  return `${numTo2Digits(hours)}h ${numTo2Digits(minutes)}m ${numTo2Digits(seconds)}s`;
}
