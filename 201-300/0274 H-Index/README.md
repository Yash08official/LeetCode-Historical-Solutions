---
comments: true
difficulty: Medium
tags:
  - Array
  - Sorting
  - Counting Sort
---

# 274. H-Index

**[View Problem on LeetCode](https://leetcode.com/problems/h-index/)**

| Attribute | Details |
| :--- | :--- |
| **Problem ID** | `0274` (`274`) |
| **Difficulty** | Medium |
| **Topics / Tags** | `Array`, `Sorting`, `Counting Sort` |
| **Solution Language** | Java |

---

## Problem Description

Given an array of integers `citations` where `citations[i]` is the number of citations a researcher received for their `i^th` paper, return *the researcher's h-index*.

According to the definition of h-index on Wikipedia: The h-index is defined as the maximum value of `h` such that the given researcher has published at least `h` papers that have each been cited at least `h` times.

---

## Examples

### Example 1

```text
**Input:** citations = [3,0,6,1,5]
**Output:** 3
**Explanation:** [3,0,6,1,5] means the researcher has 5 papers in total and each of them had received 3, 0, 6, 1, 5 citations respectively.
Since the researcher has 3 papers with at least 3 citations each and the remaining two with no more than 3 citations each, their h-index is 3.
```

### Example 2

```text
**Input:** citations = [1,3,1]
**Output:** 1
```

 

**

---

## Constraints

**

	
- `n == citations.length`
	
- `1 <= n <= 5000`
	
- `0 <= citations[i] <= 1000`

---

## Problem Understanding

- Find the maximum `h` such that the researcher has at least `h` papers with at least `h` citations each.

---

## Approach

### Optimized Approach (Binary Search on Answer)
1. The answer `h` is monotonic in `[0, n]`: if `h` is achievable, every `h' < h` is also achievable.
2. Binary search with upper-mid `mid = (l + r + 1) >> 1`, counting how many papers have `x >= mid`.
3. If `s >= mid`, set `l = mid`; else `r = mid - 1`. Return `l`.

---

## Complexity Analysis

- **Time Complexity:** $O(n \log n)$ — $O(\log n)$ binary search steps, each scanning `citations` in $O(n)$.
- **Space Complexity:** $O(1)$.

---

## Available Solutions

Only verified solution files present in this folder are listed below:

| Language | Solution File |
| :--- | :--- |
| **Java** | [274h-index.java](./274h-index.java) |

---

## Key Learnings

- Binary searching directly on the answer space `[0, n]` works cleanly without modifying or sorting the input array.
