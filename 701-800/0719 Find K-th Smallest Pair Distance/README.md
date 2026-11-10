---
comments: true
difficulty: Hard
tags:
  - Array
  - Two Pointers
  - Binary Search
  - Sorting
---

# 719. Find K-th Smallest Pair Distance

**[View Problem on LeetCode](https://leetcode.com/problems/find-k-th-smallest-pair-distance/)**

| Attribute | Details |
| :--- | :--- |
| **Problem ID** | `0719` (`719`) |
| **Difficulty** | Hard |
| **Topics / Tags** | `Array`, `Two Pointers`, `Binary Search`, `Sorting` |
| **Solution Language** | Java |

---

## Problem Description

The **distance of a pair** of integers `a` and `b` is defined as the absolute difference `|a - b|`.

Given an integer array `nums` and an integer `k`, return *the* $k^{\text{th}}$ *smallest **distance among all the pairs*** `nums[i]` and `nums[j]` where `0 <= i < j < nums.length`.

---

## Examples

### Example 1

```text
Input: nums = [1,3,1], k = 1
Output: 0
Explanation: Here are all the pairs:
(1,3) -> 2
(1,1) -> 0
(3,1) -> 2
Then the 1st smallest distance pair is (1,1), and its distance is 0.
```

### Example 2

```text
Input: nums = [1,1,1], k = 2
Output: 0
```

### Example 3

```text
Input: nums = [1,6,1], k = 3
Output: 5
```

---

## Constraints

- `n == nums.length`
- `2 <= n <= 10^4`
- `0 <= nums[i] <= 10^6`
- `1 <= k <= n * (n - 1) / 2`

---

## Problem Understanding

- Total pairs: $\frac{n(n-1)}{2}$, which can be up to $\approx 5 \times 10^7$, making explicit pair generation infeasible.
- Pair distances range between $0$ and $\max(nums) - \min(nums)$.
- Monotonic property: As the distance threshold $D$ increases, the number of pairs with distance $\le D$ increases monotonically.

---

## Approach

### Optimized Approach (Binary Search on Answer + Sliding Window / Binary Search Count)

1. Sort `nums` in ascending order.
2. Binary search the target distance in range $[0, nums[n - 1] - nums[0]]$:
   - For a candidate distance `mid = (left + right) >> 1`:
   - Count pairs with difference $\le mid$:
     - For each index $i$, find the leftmost index where $nums[mid\_idx] \ge nums[i] - dist$ via binary search (or two pointers).
     - Number of valid pairs ending at $i$ is $i - left\_idx$.
   - If total count $\ge k$, search lower half: `right = mid`.
   - Else, search upper half: `left = mid + 1`.
3. Return `left`.

---

## Complexity Analysis

- **Time Complexity:** $O(N \log N + N \log(\max - \min) \log N)$ using internal binary search per element (or $O(N \log N + N \log(\max - \min))$ using two pointers). Easily executes well within the 1-second limit.
- **Space Complexity:** $O(1)$ auxiliary space beyond input sorting.

---

## Available Solutions

Only verified solution files present in this folder are listed below:

| Language | Solution File |
| :--- | :--- |
| **Java** | [719find-k-th-smallest-pair-distance.java](./719find-k-th-smallest-pair-distance.java) |

---

## Key Learnings

- When pair counts are too large for direct selection or priority queues, binary searching the answer domain combined with a monotonic counting predicate is the optimal strategy.
