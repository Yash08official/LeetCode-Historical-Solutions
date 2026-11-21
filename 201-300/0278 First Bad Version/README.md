---
comments: true
difficulty: Easy
tags:
  - Binary Search
  - Interactive
---

# 278. First Bad Version

**[View Problem on LeetCode](https://leetcode.com/problems/first-bad-version/)**

| Attribute | Details |
| :--- | :--- |
| **Problem ID** | `0278` (`278`) |
| **Difficulty** | Easy |
| **Topics / Tags** | `Binary Search`, `Interactive` |
| **Solution Language** | Java |

---

## Problem Description

You are a product manager and currently leading a team to develop a new product. Unfortunately, the latest version of your product fails the quality check. Since each version is developed based on the previous version, all the versions after a bad version are also bad.

Suppose you have `n` versions `[1, 2, ..., n]` and you want to find out the first bad one, which causes all the following ones to be bad.

You are given an API `bool isBadVersion(version)` which returns whether `version` is bad. Implement a function to find the first bad version. You should minimize the number of calls to the API.

---

## Examples

### Example 1

```text
**Input:** n = 5, bad = 4
**Output:** 4
**Explanation:**
call isBadVersion(3) -> false
call isBadVersion(5) -> true
call isBadVersion(4) -> true
Then 4 is the first bad version.
```

### Example 2

```text
**Input:** n = 1, bad = 1
**Output:** 1
```

 

**

---

## Constraints

**

	
- `1 <= bad <= n <= 2^31 - 1`

---

## Problem Understanding

- Find the first bad version in `[1, n]` while minimizing calls to `isBadVersion(version)`.

---

## Approach

### Optimized Approach (Lower-Bound Binary Search)
1. Maintain search range `[l = 1, r = n]` and compute overflow-safe midpoint `mid = (l + r) >>> 1`.
2. If `isBadVersion(mid)` is true, narrow right to `r = mid`; otherwise narrow left to `l = mid + 1`.
3. Return `l`.

---

## Complexity Analysis

- **Time Complexity:** $O(\log n)$ API calls.
- **Space Complexity:** $O(1)$.

---

## Available Solutions

Only verified solution files present in this folder are listed below:

| Language | Solution File |
| :--- | :--- |
| **Java** | [278first-bad-version.java](./278first-bad-version.java) |

---

## Key Learnings

- Unsigned right shift `(l + r) >>> 1` prevents signed 32-bit overflow when `l + r` exceeds `Integer.MAX_VALUE`.
