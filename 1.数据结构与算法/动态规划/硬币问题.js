// [动态规划](https://leetcode-cn.com/problems/coin-lcci/solution/pythonjsdong-tai-gui-hua-he-zhu-zhan-518-ling-qian/)

// 递推解答 https://leetcode-cn.com/problems/coin-lcci/solution/pythonjsdong-tai-gui-hua-he-zhu-zhan-518-ling-qian/

// f(i,v)=f(i−1,v)+f(i,v−ci)

// d[i][j]取决于左边相邻的单元格和上边某一个单元格

// 用 dp[i] 来表示组成 i 块钱，需要最少的硬币数，那么

// 1.第 j 个硬币我可以选择不拿 这个时候， 组成数 = dp[i]
// 2.第 j 个硬币我可以选择拿 这个时候， 组成数 = dp[i - coins[j]] + dp[i]
// 3. 和背包问题不同， 硬币是可以拿任意个
// 4. 对于每一个 dp[i] 我们都选择遍历一遍 coin， 不断更新 dp[i]

/*
 * @lc app=leetcode id=518 lang=javascript
 *
 * [518] Coin Change 2
 *
 */
/**
 * @param {number} amount
 * @param {number[]} coins
 * @return {number}
 */
// 目标就是最终把使用硬币的种类减少到最少
let waysToChange = (n) => {
  let dp = new Array(n + 1).fill(1);
  let coins = [1, 5, 10, 25];
  // 遍历钱币
  for (let i = 1; i < 4; i++) {
    // 遍历目标值，逐渐增大目标值
    for (let j = 1; j <= n; j++) {
      if (j - coins[i] >= 0) {
        // dp[100] = dp[100] + dp[99];
        dp[j] = (dp[j] + dp[j - coins[i]]) % (1e9 + 7);
      }
    }
  }
  return dp[n];
};

waysToChange(200);
