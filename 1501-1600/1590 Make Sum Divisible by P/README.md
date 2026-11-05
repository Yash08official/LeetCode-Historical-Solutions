---
comments: true
difficulty: Medium
tags:
  - Array
  - Hash Table
  - Prefix Sum
---

# 1590. Make Sum Divisible by P

**[View Problem on LeetCode](https://leetcode.com/problems/make-sum-divisible-by-p/)**

| Attribute | Details |
| :--- | :--- |
| **Problem ID** | `1590` (`1590`) |
| **Difficulty** | Medium |
| **Topics / Tags** | `Array`, `Hash Table`, `Prefix Sum` |
| **Solution Language** | JavaScript |

---

## Problem Description

Given an array of positive integers `nums` and an integer `p`, we want to find the length of the shortest non-empty contiguous subarray whose removal makes the sum of the remaining elements divisible by `p`.

We are not allowed to remove the entire array (at least one element must remain). If the initial array sum is already divisible by `p`, we remove 0 elements. If it is impossible to make the remaining sum divisible by `p`, return -1.

---

## Examples

### Example 1

```text
Input: nums = [3,1,4,2], p = 6
Output: 1
Explanation: The sum of the elements in nums is 10, which is not divisible by 6. We can remove the subarray [4], and the sum of the remaining elements is 6, which is divisible by 6.
```

### Example 2

```text
Input: nums = [6,3,5,2], p = 9
Output: 2
Explanation: We cannot remove a single element to get a sum divisible by 9. The best way is to remove the subarray [5,2], leaving us with [6,3] with sum 9.
```

### Example 3

```text
Input: nums = [1,2,3], p = 3
Output: 0
Explanation: Here the sum is 6. which is already divisible by 3. Thus we do not need to remove anything.
```

---

## Constraints

- `1 <= nums.length <= 10^5`

- `1 <= nums[i] <= 10^9`

- `1 <= p <= 10^9`

---

## Problem Understanding

Let $S$ be the total sum of `nums`. If $S \pmod p == 0$, no elements need to be removed; return 0.
Otherwise, let $r = S \pmod p$, where $1 \le r < p$. Removing a subarray `nums[j+1..i]` with sum $s_{sub}$ leaves a remaining sum $(S - s_{sub})$. For $(S - s_{sub}) \pmod p == 0$, we require:
$$s_{sub} \equiv r \pmod p$$
Since $s_{sub} = \text{prefixSum}[i] - \text{prefixSum}[j]$, this translates to:
$$\text{prefixSum}[j] \equiv (\text{prefixSum}[i] - r) \pmod p$$
We must find the pair $(j, i)$ with $j < i$ satisfying this modular congruence that minimizes $i - j$, while ensuring we do not remove all $n$ elements ($i - j < n$).

---

## Approach

### Brute Force Approach

A naive approach checks every possible subarray by iterating over all start indices $j$ and end indices $i$. For each of the $O(n^2)$ subarrays, it computes the subarray sum modulo $p$ and checks if it equals $r$. With $n$ up to $10^5$, an $O(n^2)$ loop performs up to $10^{10}$ operations, resulting in a Time Limit Exceeded error.

### Optimized Approach

Use prefix sum modulo $p$ and a hash map (`prefixMap`) storing the most recent index where each remainder occurred. Initialize `prefixMap.set(0, -1)`. For each index `i`, update `prefixSum`, compute `currentMod = prefixSum % p`, and compute the required complement `target = (currentMod - remainder + p) % p`. If `target` exists in `prefixMap`, the length $i - \text{prefixMap.get}(target)$ is a candidate for `minLength`. Then update `prefixMap.set(currentMod, i)`.

### Step-by-Step Thinking Process

1. Compute total sum using `reduce` and determine `remainder = totalSum % p`. If `remainder === 0`, return 0.
2. Realize this is an exact modular difference problem: we need a subarray whose sum modulo $p$ equals `remainder`.
3. Express the condition in prefix sums: `(prefixSum[i] - prefixSum[j]) % p === remainder`.
4. Rearrange to isolate the earlier prefix remainder: `prefixSum[j] % p === (prefixSum[i] % p - remainder + p) % p`.
5. To minimize the subarray length $i - j$, we want the most recent index $j$ where `target` occurred.
6. Maintain a hash map `prefixMap` that maps each remainder to its latest index. Check for `target` at each step $i$, then update `prefixMap` with `currentMod`.

### Algorithm / Intuition

The JavaScript solution computes `totalSum % p`. It sets up `prefixMap` initialized with `(0, -1)` to handle subarrays starting at index 0. As we iterate through `nums`, `prefixSum` accumulates the numbers, and `currentMod` tracks the running remainder. The expression `target = (currentMod - remainder + p) % p` correctly handles wrap-around in modular arithmetic. If `prefixMap.has(target)`, the distance `i - prefixMap.get(target)` represents the length of a valid removable subarray. By constantly overwriting `prefixMap.set(currentMod, i)`, we ensure future lookups find the closest preceding index, naturally minimizing subarray length.

---

## Dry Run

Let's trace Example 1: `nums = [3, 1, 4, 2]`, `p = 6`
- Total sum = 10. `remainder = 10 % 6 = 4 != 0`.
- Init `prefixMap = {0: -1}`, `prefixSum = 0`, `minLength = 4`.
- `i = 0, nums[0] = 3`:
  - `prefixSum = 3`, `currentMod = 3 % 6 = 3`.
  - `target = (3 - 4 + 6) % 6 = 5`.
  - `prefixMap.has(5)` is false.
  - `prefixMap.set(3, 0)`.
- `i = 1, nums[1] = 1`:
  - `prefixSum = 4`, `currentMod = 4 % 6 = 4`.
  - `target = (4 - 4 + 6) % 6 = 0`.
  - `prefixMap.has(0)` is true! Index is -1. Subarray length = $1 - (-1) = 2$ (`[3, 1]`, remaining `[4, 2]` sum 6). `minLength = min(4, 2) = 2`.
  - `prefixMap.set(4, 1)`.
- `i = 2, nums[2] = 4`:
  - `prefixSum = 8`, `currentMod = 8 % 6 = 2`.
  - `target = (2 - 4 + 6) % 6 = 4`.
  - `prefixMap.has(4)` is true! Index is 1. Subarray length = $2 - 1 = 1$ (`[4]`, remaining `[3, 1, 2]` sum 6). `minLength = min(2, 1) = 1`.
  - `prefixMap.set(2, 2)`.
- `i = 3, nums[3] = 2`:
  - `prefixSum = 10`, `currentMod = 10 % 6 = 4`.
  - `target = (4 - 4 + 6) % 6 = 0`.
  - `prefixMap.has(0)` is true! Index -1. Length = $3 - (-1) = 4$ (cannot remove entire array, but $1 < 4$). `minLength = 1`.
  - `prefixMap.set(4, 3)`.
- End of loop. `minLength = 1 != n` -> returns 1.

---

## Complexity Analysis

- **Time Complexity:** `O(n)` — We traverse the array of length `n` once, executing $O(1)$ arithmetic operations and Map lookups/insertions at each index.
- **Space Complexity:** `O(min(n, p))` — The `prefixMap` stores at most $\min(n, p)$ distinct remainder-index pairs.

---

## Available Solutions

Only verified solution files present in this folder are listed below:

| Language | Solution File |
| :--- | :--- |
| **JavaScript** | [1590make-sum-divisible-by-p.js](./1590make-sum-divisible-by-p.js) |

---

## Key Learnings

- Modular arithmetic converts 'sum divisible by $p$' into matching a target remainder: $(A - B) \equiv r \pmod p$.
- Always store the *latest* index of each remainder in the map when aiming to minimize subarray length.
- Guard against the constraint forbidding total removal by validating `minLength === n ? -1 : minLength`.
