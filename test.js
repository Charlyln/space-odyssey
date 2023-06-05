// function padTo2Digits(num) {
//   return num.toString().padStart(2, '0');
// }

// function convertMsToTime(milliseconds) {
//   let seconds = Math.floor(milliseconds / 1000);
//   let minutes = Math.floor(seconds / 60);
//   let hours = Math.floor(minutes / 60);

//   seconds = seconds % 60;
//   minutes = minutes % 60;

//   hours = hours % 24;

//   return `${padTo2Digits(hours)}h : ${padTo2Digits(minutes)} m : ${padTo2Digits(seconds)} s`;
// }

// function convertMsToMin(milliseconds) {
//   let seconds = Math.floor(milliseconds / 1000);
//   let minutes = Math.floor(seconds / 60);
//   // let hours = Math.floor(minutes / 60);

//   // seconds = seconds % 60;
//   // minutes = minutes % 60;

//   // hours = hours % 24;

//   return `${padTo2Digits(minutes)} m`;
// }

// const duration = 60000 * 100; // 100 min
// const start = 60000 * 0; // 0 min
// const comeback = 60000 * 40; // 40 min

// const done = comeback - start; // 40 min
// const notdone = duration - comeback; // 60 min

// const halfduration = duration / 2; // 50 min
// const halfdiff = halfduration - comeback / 2;

// // const test = ((100 * notdone) / duration).toFixed(2);
// const test = ((100 * 80) / 100).toFixed(2);

// const rest = halfduration
// // done

// // console.log('done', convertMsToMin(done));
// // console.log('notdone', convertMsToMin(notdone));

// console.log('test', test);
// // console.log('halfdiff', convertMsToTime(halfdiff));
// // console.log('halfpercent', halfpercent);

// // const check = 60000 * 50; // 50 min

// // const startTime = new Date('2023-05-22T09:11:00.069Z').getTime();
// // const commebackDate = new Date('2023-05-22T09:11:44.069Z').getTime();
// // // const commebackDate = new Date('2023-05-22 14:02:00.000 +00:00').getTime();
// // const checkProductionDate = new Date('2023-05-22T09:11:50.069Z').getTime(); // 90%

// const diff = comeback - start;
// const rest = duration - diff;
// const percent = ((100 * diff) / duration).toFixed(2);
// // console.log('rest', convertMsToTime(rest));
// // console.log(`${percent}%`);

// // const newdiff = comeback - start;
// const newduration = rest;
// // console.log('newdiff', convertMsToTime(newdiff));

// const newpercent = ((100 * diff) / duration).toFixed(2);
// // console.log(`${newpercent}%`);

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

function convertMsToMin(milliseconds) {
  let seconds = Math.floor(milliseconds / 1000);
  let minutes = Math.floor(seconds / 60);
  // let hours = Math.floor(minutes / 60);

  // seconds = seconds % 60;
  // minutes = minutes % 60;

  // hours = hours % 24;

  return `${padTo2Digits(minutes)} m`;
}

// const duration = 60000; // 1 min
// const start = 60000 * 0; // 0 min
// const comeback = 60000 * 30; // 20 min
// const newDate = start - duration; // -100 min

// const diff = comeback - start;
// // const rest = duration - diff;
// const percent = ((100 * comeback) / newDate + 100).toFixed(2);

// const duration = 60000 * 1; // 1 min
// const startTime =           new Date(2023, 4, 22, 13, 30, 0).getTime();
// // const commebackDate =       new Date(2023, 4, 22, 13, 30, 20).getTime();
// const checkProductionDate = new Date(2023, 4, 22, 13, 30, 20).getTime();

// const duration = 420000;
// const startTime = new Date(1684757731396);
// const commebackDate = new Date(1684757746194);
// const checkProductionDate = new Date(1684757746194);

// 22/05/2023 14:15:46 duration 420000
// 22/05/2023 14:15:46 startTime 1684757731396
// 22/05/2023 14:15:46 checkProductionDate 1684757746194
// 22/05/2023 14:15:46 percent 3.52

// const backdate = startTime - duration;
// const diff = checkProductionDate - backdate;
// const percent = ((100 * diff) / duration - 100).toFixed(2);

// const percent = ((100 * rest) / duration).toFixed(2);
// const percent = ((100 * checkProductionDate) / backdate + 100).toFixed(2);

// console.log(convertMsToTime(backdate));
// console.log(`${percent}%`);

// const backdate = starttime - duration;

const subtractMilliseconds = (date, milliseconds) => {
  const result = new Date(date);
  result.setMilliseconds(result.getMilliseconds() - milliseconds);
  return result;
};

// let date = new Date('2021-08-30T00:00:00.000Z');

// console.log(subtractMilliseconds(date, 5).toISOString());

const startTime = new Date(2023, 4, 22, 20, 9, 0);

console.log(startTime.toISOString());

const duration = 60000;

console.log(subtractMilliseconds(startTime, duration).toISOString());
