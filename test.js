function padTo2Digits(num) {
  return num.toString().padStart(2, '0');
}

function convertMsToTime(milliseconds) {
  let seconds = Math.floor(milliseconds / 1000);
  let minutes = Math.floor(seconds / 60);
  let hours = Math.floor(minutes / 60);

  seconds = seconds % 60;
  minutes = minutes % 60;

  hours = hours % 24;

  return `${padTo2Digits(hours)}h : ${padTo2Digits(minutes)} m : ${padTo2Digits(seconds)} s`;
}

// const percent = ((100 * diff) / duration).toFixed(2);

const startTime = new Date('2023-05-22 07:10:06.092 +00:00').getTime();
const checkProductionDate = new Date('2023-05-22 07:12:06.092 +00:00').getTime();
const diff = checkProductionDate - startTime;

const duration = 60000 * 10; // 5 min
const rest = duration - diff;

// console.log(convertMsToTime(duration));
// console.log(convertMsToTime(diff));
// console.log(convertMsToTime(rest));

console.log(convertMsToTime(84486));
