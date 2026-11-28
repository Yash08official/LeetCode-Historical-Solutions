---
comments: true
difficulty: Easy
tags:
  - Array
  - Sorting
  - Heap (Priority Queue)
---

# 506. Relative Ranks

**[View Problem on LeetCode](https://leetcode.com/problems/relative-ranks/)**

| Attribute | Details |
| :--- | :--- |
| **Problem ID** | `0506` (`506`) |
| **Difficulty** | Easy |
| **Topics / Tags** | `Array`, `Sorting`, `Heap (Priority Queue)` |
| **Solution Language** | Java |

---

## Problem Description

You are given an integer array `score` of size `n`, where `score[i]` is the score of the `i^th` athlete in a competition. All the scores are guaranteed to be **unique**.

The athletes are **placed** based on their scores, where the `1^st` place athlete has the highest score, the `2^nd` place athlete has the `2^nd` highest score, and so on. The placement of each athlete determines their rank:

	- The `1^st` place athlete's rank is `"Gold Medal"`.

	- The `2^nd` place athlete's rank is `"Silver Medal"`.

	- The `3^rd` place athlete's rank is `"Bronze Medal"`.

	- For the `4^th` place to the `n^th` place athlete, their rank is their placement number (i.e., the `x^th` place athlete's rank is `"x"`).

Return an array `answer` of size `n` where `answer[i]` is the **rank** of the `i^th` athlete.

---

## Examples

### Example 1

```
Input: score = [5,4,3,2,1]
Output: ["Gold Medal","Silver Medal","Bronze Medal","4","5"]
Explanation: The placements are [1st, 2nd, 3rd, 4th, 5th].
```

### Example 2

```
Input: score = [10,3,8,9,4]
Output: ["Gold Medal","5","Bronze Medal","Silver Medal","4"]
Explanation: The placements are [1st, 5th, 3rd, 2nd, 4th].
```

 

**

---

## Constraints

**

	- `n == score.length`

	- `1 <= n <= 10^4`

	- `0 <= score[i] <= 10^6`

	- All the values in `score` are **unique**.

---

## Problem Understanding

- Assign ranks to athletes based on their scores, where the top 3 receive `"Gold Medal"`, `"Silver Medal"`, and `"Bronze Medal"`, and ranks 4+ receive their 1-based rank number as a string.

---

## Approach

### Optimized Approach (Index Array Sorting by Score)
1. Create an index array `idx` initialized with `[0, 1, ..., n - 1]`.
2. Sort `idx` descending based on the values in `score[i]`.
3. Map the top 3 indices to medals and subsequent indices to string ranks `String.valueOf(i + 1)`.
4. Return the populated `ans` array indexed by original position.

---

## Complexity Analysis

- **Time Complexity:** $O(n \log n)$ due to sorting $n$ athletes.
- **Space Complexity:** $O(n)$ for the index array and result array.

---

## Available Solutions

Only verified solution files present in this folder are listed below:

| Language | Solution File |
| :--- | :--- |
| **Java** | [506relative-ranks.java](./506relative-ranks.java) |

---

## Key Learnings

- Sorting indices rather than pairs or objects keeps original position mapping clean and memory-efficient.
