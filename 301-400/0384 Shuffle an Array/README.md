---
comments: true
difficulty: Medium
tags:
  - Array
  - Math
  - Design
  - Randomized
---

# 384. Shuffle an Array

**[View Problem on LeetCode](https://leetcode.com/problems/shuffle-an-array/)**

| Attribute | Details |
| :--- | :--- |
| **Problem ID** | `0384` (`384`) |
| **Difficulty** | Medium |
| **Topics / Tags** | `Array`, `Math`, `Design`, `Randomized` |
| **Solution Language** | Java |

---

## Problem Description

Given an integer array `nums`, design an algorithm to randomly shuffle the array. All permutations of the array should be **equally likely** as a result of the shuffling.

Implement the `Solution` class:

	
- `Solution(int[] nums)` Initializes the object with the integer array `nums`.
	
- `int[] reset()` Resets the array to its original configuration and returns it.
	
- `int[] shuffle()` Returns a random shuffling of the array.

---

## Examples

### Example 1

```text
**Input**
["Solution", "shuffle", "reset", "shuffle"]
[[[1, 2, 3]], [], [], []]
**Output**
[null, [3, 1, 2], [1, 2, 3], [1, 3, 2]]

**Explanation**
Solution solution = new Solution([1, 2, 3]);
solution.shuffle();    // Shuffle the array [1,2,3] and return its result.
                       // Any permutation of [1,2,3] must be equally likely to be returned.
                       // Example: return [3, 1, 2]
solution.reset();      // Resets the array back to its original configuration [1,2,3]. Return [1, 2, 3]
solution.shuffle();    // Returns the random shuffling of array [1,2,3]. Example: return [1, 3, 2]
```

 

**

---

## Constraints

**

	
- `1 <= nums.length <= 50`
	
- `-10^6 <= nums[i] <= 10^6`
	
- All the elements of `nums` are **unique**.
	
- At most `10^4` calls **in total** will be made to `reset` and `shuffle`.

---

## Problem Understanding

- Implement `reset()` and uniformly random `shuffle()` for an integer array.

---

## Approach

### Optimized Approach (Fisher–Yates Shuffle)
1. Store `original` copy for `reset()`.
2. In `shuffle()`, for each index `i` from `0` to `n - 1`, swap `nums[i]` with a uniformly chosen index in `[i, n - 1]`.

---

## Complexity Analysis

- **Time Complexity:** $O(n)$ for both `reset()` and `shuffle()`.\n- **Space Complexity:** $O(n)$ to retain `original`.

---

## Available Solutions

Only verified solution files present in this folder are listed below:

| Language | Solution File |
| :--- | :--- |
| **Java** | [384shuffle-an-array.java](./384shuffle-an-array.java) |

---

## Key Learnings

- Fisher–Yates generates every one of the $n!$ permutations with exact equal probability $1/n!$.
