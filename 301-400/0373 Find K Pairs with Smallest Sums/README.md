---
comments: true
difficulty: Medium
tags:
  - Array
  - Heap (Priority Queue)
---

# 373. Find K Pairs with Smallest Sums

**[View Problem on LeetCode](https://leetcode.com/problems/find-k-pairs-with-smallest-sums/)**

| Attribute | Details |
| :--- | :--- |
| **Problem ID** | `0373` (`373`) |
| **Difficulty** | Medium |
| **Topics / Tags** | `Array`, `Heap (Priority Queue)` |
| **Solution Language** | Java |

---

## Problem Description

You are given two integer arrays `nums1` and `nums2` sorted in **non-decreasing order** and an integer `k`.

Define a pair `(u, v)` which consists of one element from the first array and one element from the second array.

Return *the* `k` *pairs* `(u_1, v_1), (u_2, v_2), ..., (u_k, v_k)` *with the smallest sums*.

---

## Examples

### Example 1

```text
**Input:** nums1 = [1,7,11], nums2 = [2,4,6], k = 3
**Output:** [[1,2],[1,4],[1,6]]
**Explanation:** The first 3 pairs are returned from the sequence: [1,2],[1,4],[1,6],[7,2],[7,4],[11,2],[7,6],[11,4],[11,6]
```

### Example 2

```text
**Input:** nums1 = [1,1,2], nums2 = [1,2,3], k = 2
**Output:** [[1,1],[1,1]]
**Explanation:** The first 2 pairs are returned from the sequence: [1,1],[1,1],[1,2],[2,1],[1,2],[2,2],[1,3],[1,3],[2,3]
```

 

**

---

## Constraints

**

	
- `1 <= nums1.length, nums2.length <= 10^5`
	
- `-10^9 <= nums1[i], nums2[i] <= 10^9`
	
- `nums1` and `nums2` both are sorted in **non-decreasing order**.
	
- `1 <= k <= 10^4`
	
- `k <= nums1.length * nums2.length`

---

## Problem Understanding

- Given two sorted arrays `nums1` and `nums2`, return the `k` pairs `(u, v)` with the smallest sums.

---

## Approach

### Optimized Approach (K-Way Min-Heap Merge)
1. Seed a min-heap with `(nums1[i] + nums2[0], i, 0)` for `0 <= i < min(nums1.length, k)`.
2. Pop the smallest pair `(i, j)` up to `k` times and push `(nums1[i] + nums2[j + 1], i, j + 1)` if `j + 1 < nums2.length`.

---

## Complexity Analysis

- **Time Complexity:** $O(k \log(\min(n_1, k)))$.\n- **Space Complexity:** $O(\min(n_1, k))$.

---

## Available Solutions

Only verified solution files present in this folder are listed below:

| Language | Solution File |
| :--- | :--- |
| **Java** | [373find-k-pairs-with-smallest-sums.java](./373find-k-pairs-with-smallest-sums.java) |

---

## Key Learnings

- Seeding only `j = 0` for each row `i` and advancing `j + 1` on pop visits pairs strictly without duplicates.
