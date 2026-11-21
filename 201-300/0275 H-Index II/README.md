---
comments: true
difficulty: Medium
tags:
  - Array
  - Binary Search
---

# 275. H-Index II

**[View Problem on LeetCode](https://leetcode.com/problems/h-index-ii/)**

| Attribute | Details |
| :--- | :--- |
| **Problem ID** | `0275` (`275`) |
| **Difficulty** | Medium |
| **Topics / Tags** | `Array`, `Binary Search` |
| **Solution Language** | Java |

---

## Problem Description

Given an array of integers `citations` where `citations[i]` is the number of citations a researcher received for their `i^th` paper and `citations` is sorted in **non-descending order**, return *the researcher's h-index*.

According to the definition of h-index on Wikipedia: The h-index is defined as the maximum value of `h` such that the given researcher has published at least `h` papers that have each been cited at least `h` times.

You must write an algorithm that runs in logarithmic time.

---

## Examples

### Example 1

```text
**Input:** citations = [0,1,3,5,6]
**Output:** 3
**Explanation:** [0,1,3,5,6] means the researcher has 5 papers in total and each of them had received 0, 1, 3, 5, 6 citations respectively.
Since the researcher has 3 papers with at least 3 citations each and the remaining two with no more than 3 citations each, their h-index is 3.
```

### Example 2

```text
**Input:** citations = [1,2,100]
**Output:** 2
```

 

**

---

## Constraints

**

	
- `n == citations.length`
	
- `1 <= n <= 10^5`
	
- `0 <= citations[i] <= 1000`
	
- `citations` is sorted in **ascending order**.

---

## Problem Understanding

- Given a `citations` array already sorted in ascending order, compute the H-Index in logarithmic time.

---

## Approach

### Optimized Approach (Binary Search for First Valid Suffix)
1. At index `mid`, there are `n - mid` papers with at least `citations[mid]` citations.
2. Binary search `[0, n)` for the leftmost `mid` satisfying `citations[mid] >= n - mid`.
3. Return `n - left`.

---

## Complexity Analysis

- **Time Complexity:** $O(\log n)$ — Standard binary search.
- **Space Complexity:** $O(1)$.

---

## Available Solutions

Only verified solution files present in this folder are listed below:

| Language | Solution File |
| :--- | :--- |
| **Java** | [275h-index-ii.java](./275h-index-ii.java) |

---

## Key Learnings

- Sorted input lets us map suffix length `n - mid` directly against `citations[mid]` in $O(\log n)$.
