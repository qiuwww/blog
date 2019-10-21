exports.count = 0;
setTimeout(function() {
  console.log(
    "increase count to",
    ++exports.count,
    "in counter.js after 500ms"
  );
}, 500);
