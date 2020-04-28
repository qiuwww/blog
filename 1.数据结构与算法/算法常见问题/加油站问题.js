var canCompleteCircuit = function (gas, cost) {
  let cur;
  gas = gas.concat(gas);
  cost = cost.concat(cost);

  for (let i = 0; i < gas.length / 2; i++) {
    if (gas[i] < cost[i]) {
      continue;
    } else {
      cur = gas[i] - cost[i];
      while (cur >= 0) {
        cur = cur + gas[++i] - cost[++i];
        if (i > gas.length / 2 + i) {
          return i;
        }
      }
    }
  }
};
