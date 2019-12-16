console.log("start");
setTimeout(() => {
  console.log("setTimeout 1000");
}, 1000);

setInterval(() => {
  console.log("setInterval 500");
}, 500);

setInterval(() => {
  console.log("setInterval 300");
}, 300);

// start
// setInterval 300
// setInterval 500
// setTimeout 1000
