---
comments: true
difficulty: Medium
tags:
  - Hash Table
  - Math
  - Reservoir Sampling
  - Randomized
---

# 398. Random Pick Index

**[View Problem on LeetCode](https://leetcode.com/problems/random-pick-index/)**

| Attribute | Details |
| :--- | :--- |
| **Problem ID** | `0398` (`398`) |
| **Difficulty** | Medium |
| **Topics / Tags** | `Hash Table`, `Math`, `Reservoir Sampling`, `Randomized` |
| **Solution Language** | Java |

---

## Problem Description

Given an integer array `nums` with possible **duplicates**, randomly output the index of a given `target` number. You can assume that the given target number must exist in the array.

Implement the `Solution` class:

	
- `Solution(int[] nums)` Initializes the object with the array `nums`.
	
- `int pick(int target)` Picks a random index `i` from `nums` where `nums[i] == target`. If there are multiple valid i's, then each index should have an equal probability of returning.

---

## Examples

### Example 1

```text
**Input**
["Solution", "pick", "pick", "pick"]
[[[1, 2, 3, 3, 3]], [3], [1], [3]]
**Output**
[null, 4, 0, 2]

**Explanation**
Solution solution = new Solution([1, 2, 3, 3, 3]);
solution.pick(3); // It should return either index 2, 3, or 4 randomly. Each index should have equal probability of returning.
solution.pick(1); // It should return 0. Since in the array only nums[0] is equal to 1.
solution.pick(3); // It should return either index 2, 3, or 4 randomly. Each index should have equal probability of returning.
```

 

**

---

## Constraints

**

	
- `1 <= nums.length <= 2 * 10^4`
	
- `-2^31 <= nums[i] <= 2^31 - 1`
	
- `target` is an integer from `nums`.
	
- At most `10^4` calls will be made to `pick`.

---

## Problem Understanding

- Given an integer array `nums` with possible duplicates, uniformly pick an index `i` where `nums[i] == target`.

---

## Approach

### Optimized Approach (Reservoir Sampling)
1. Scan `nums`, counting matches `n` of `target`.
2. For the `n`-th match, select `ans = i` with probability `1 / n` (`1 + random.nextInt(n) == n`).

---

## Complexity Analysis

- **Time Complexity:** $O(1)$ constructor, $O(n)$ per `pick`.\n- **Space Complexity:** $O(1)$ auxiliary.

---

## Available Solutions

Only verified solution files present in this folder are listed below:

| Language | Solution File |
| :--- | :--- |
| **Java** | [398random-pick-index.java](./398random-pick-index.java) |

---

## Key Learnings

- Reservoir sampling avoids building a full value-to-index-list map when memory is tight.
