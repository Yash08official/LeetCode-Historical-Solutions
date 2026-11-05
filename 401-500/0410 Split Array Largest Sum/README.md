---
comments: true
difficulty: Hard
tags:
  - Array
  - Binary Search
  - Dynamic Programming
  - Greedy
  - Prefix Sum
---

# 410. Split Array Largest Sum

**[View Problem on LeetCode](https://leetcode.com/problems/split-array-largest-sum/)**

| Attribute | Details |
| :--- | :--- |
| **Problem ID** | `0410` (`410`) |
| **Difficulty** | Hard |
| **Topics / Tags** | `Array`, `Binary Search`, `Dynamic Programming`, `Greedy`, `Prefix Sum` |
| **Solution Language** | Java |

---

## Problem Description

Given an array of non-negative integers `nums` and an integer `k`, partition `nums` into `k` non-empty contiguous subarrays so that the **maximum subarray sum** among the `k` parts is as small as possible.

Return this minimized largest subarray sum.

---

## Examples

### Example 1

```text
Input: nums = [7,2,5,10,8], k = 2
Output: 18
Explanation: There are four ways to split nums into two subarrays.
The best way is to split it into [7,2,5] and [10,8], where the largest sum among the two subarrays is only 18.
```

### Example 2

```text
Input: nums = [1,2,3,4,5], k = 2
Output: 9
Explanation: There are four ways to split nums into two subarrays.
The best way is to split it into [1,2,3] and [4,5], where the largest sum among the two subarrays is only 9.
```

---

## Constraints

- `1 <= nums.length <= 1000`

- `0 <= nums[i] <= 10^6`

- `1 <= k <= min(50, nums.length)`

---

## Problem Understanding

Instead of directly searching over all `C(n - 1, k - 1)` ways to place split points, ask the **decision version**: *Given a candidate cap `mx`, can we split `nums` into at most `k` contiguous subarrays such that every subarray's sum is `<= mx`?*

Key observations:
- **Monotonicity:** If cap `mx` is feasible, any larger cap `mx' > mx` is also feasible. Binary search applies directly!
- **Tight bounds:** Every single element must fit into some subarray, so `left = max(nums)`. At worst (`k = 1`), one subarray holds the whole array, so `right = sum(nums)`.
- Note: If greedy packing uses `cnt < k` non-empty subarrays with each sum `<= mx` (since `k <= nums.length`), we can always split some multi-element subarrays further without increasing any subarray sum (as `nums[i] >= 0`), so `cnt <= k` is both necessary and sufficient!

---

## Approach

### Brute Force Approach

2D Dynamic Programming defines `dp[i][j]` as the minimum largest subarray sum when splitting the first `i` elements into `j` subarrays, trying every split point `p < i`.

This takes `O(n^2 * k)` time (`1000^2 * 50 = 5 * 10^7` operations), which is significantly slower and uses more memory than binary searching the answer.

### Optimized Approach

Apply **Binary Search on the Answer** over `[max(nums), sum(nums)]`. For each midpoint `mid`, run a linear-time greedy `check(nums, mid, k)` scan that packs as many elements as possible into the current subarray before starting a new one whenever `s + x > mid`.

### Step-by-Step Thinking Process

1. Scan `nums` once to compute `left = max(nums)` and `right = sum(nums)`.
2. Binary search while `left < right` using `mid = (left + right) >> 1`.
3. In `check(nums, mx, k)`, greedily accumulate subarray sum `s` and count subarrays `cnt`: whenever `s + x > mx`, start a new subarray (`++cnt; s = x`).
4. If `cnt <= k`, cap `mid` is feasible, so narrow `right = mid`; otherwise set `left = mid + 1`.
5. Return `left` when the binary search converges.

### Algorithm / Intuition

Look closely at the clever initialization inside `check(nums, mx, k)`: `int s = 1 << 30, cnt = 0;`!

Because `sum(nums) <= 1000 * 10^6 = 10^9 < (1 << 30)` (`1,073,741,824`), `mx` is always `< 10^9`, while `(1 << 30) + 10^6` safely avoids 32-bit signed `int` overflow. Thus, on the very first element `nums[0]`, `s += nums[0]` is guaranteed to exceed `mx`, triggering `++cnt; s = nums[0];` to open the first subarray cleanly without needing `cnt = 1, s = 0`!

---

## Dry Run

Tracing `splitArray([7, 2, 5, 10, 8], 2)` (**Example 1**, `k = 2`):

Bounds: `left = max(nums) = 10`, `right = sum(nums) = 32`.

| Step | `left` | `right` | `mid` | Greedy Subarrays Formed (`<= mid`) | `cnt <= 2`? | Next Bounds |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| 1 | `10` | `32` | `21` | `[7, 2, 5]` (`14`), `[10, 8]` (`18`) -> `cnt = 2` | `true` | `[10, 21]` |
| 2 | `10` | `21` | `15` | `[7, 2, 5]` (`14`), `[10]` (`10`), `[8]` (`8`) -> `cnt = 3` | `false` | `[16, 21]` |
| 3 | `16` | `21` | `18` | `[7, 2, 5]` (`14`), `[10, 8]` (`18`) -> `cnt = 2` | `true` | `[16, 18]` |
| 4 | `16` | `18` | `17` | `[7, 2, 5]` (`14`), `[10]` (`10`), `[8]` (`8`) -> `cnt = 3` | `false` | `[18, 18]` |

Converges at `left = 18`, returning `18`.

---

## Complexity Analysis

- **Time Complexity:** `O(n log S)` where `S = sum(nums) - max(nums) <= 10^9` — At most `30` binary search iterations, each scanning `n` elements in `O(n)` time.
- **Space Complexity:** `O(1)` — Only a handful of primitive integer variables are used.

---

## Available Solutions

Only verified solution files present in this folder are listed below:

| Language | Solution File |
| :--- | :--- |
| **Java** | [410split-array-largest-sum.java](./410split-array-largest-sum.java) |

---

## Key Learnings

- "Minimize the maximum" (or "maximize the minimum") over contiguous partitions of non-negative numbers is the textbook signature for Binary Search on the Answer + Greedy Validation.
- Setting `left = max(nums)` is mandatory so no single element `x > mx` ever creates an impossible subarray in `check`.
- Verify integer overflow carefully: here `left + right <= 2 * 10^9 < Integer.MAX_VALUE`, so `(left + right) >> 1` is safe, whereas larger constraints would require `(left + right) >>> 1` or `long`.
