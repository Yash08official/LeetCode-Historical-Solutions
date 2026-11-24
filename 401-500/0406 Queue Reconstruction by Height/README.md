---
comments: true
difficulty: Medium
tags:
  - Array
  - Binary Indexed Tree
  - Segment Tree
  - Sorting
---

# 406. Queue Reconstruction by Height

**[View Problem on LeetCode](https://leetcode.com/problems/queue-reconstruction-by-height/)**

| Attribute | Details |
| :--- | :--- |
| **Problem ID** | `0406` (`406`) |
| **Difficulty** | Medium |
| **Topics / Tags** | `Array`, `Binary Indexed Tree`, `Segment Tree`, `Sorting` |
| **Solution Language** | Java |

---

## Problem Description

You are given an array of people, `people`, which are the attributes of some people in a queue (not necessarily in order). Each `people[i] = [h_i, k_i]` represents the `i^th` person of height `h_i` with **exactly** `k_i` other people in front who have a height greater than or equal to `h_i`.

Reconstruct and return *the queue that is represented by the input array *`people`. The returned queue should be formatted as an array `queue`, where `queue[j] = [h_j, k_j]` is the attributes of the `j^th` person in the queue (`queue[0]` is the person at the front of the queue).

---

## Examples

### Example 1

```text
**Input:** people = [[7,0],[4,4],[7,1],[5,0],[6,1],[5,2]]
**Output:** [[5,0],[7,0],[5,2],[6,1],[4,4],[7,1]]
**Explanation:**
Person 0 has height 5 with no other people taller or the same height in front.
Person 1 has height 7 with no other people taller or the same height in front.
Person 2 has height 5 with two persons taller or the same height in front, which is person 0 and 1.
Person 3 has height 6 with one person taller or the same height in front, which is person 1.
Person 4 has height 4 with four people taller or the same height in front, which are people 0, 1, 2, and 3.
Person 5 has height 7 with one person taller or the same height in front, which is person 1.
Hence [[5,0],[7,0],[5,2],[6,1],[4,4],[7,1]] is the reconstructed queue.
```

### Example 2

```text
**Input:** people = [[6,0],[5,0],[4,0],[3,2],[2,2],[1,4]]
**Output:** [[4,0],[5,0],[2,2],[3,2],[1,4],[6,0]]
```

 

**

---

## Constraints

**

	
- `1 <= people.length <= 2000`
	
- `0 <= h_i <= 10^6`
	
- `0 <= k_i < people.length`
	
- It is guaranteed that the queue can be reconstructed.

---

## Problem Understanding

- Reconstruct a queue of people `[h, k]` where `h` is height and `k` is the exact count of people in front with height `>= h`.

---

## Approach

### Optimized Approach (Tallest-First Sort + Index Insertion)
1. Sort people by height descending (`b[0] - a[0]`), breaking ties by `k` ascending (`a[1] - b[1]`).
2. Insert each person at index `p[1]` in `List<int[]> ans`: shorter people inserted later never affect the `k` count of taller people already placed.

---

## Complexity Analysis

- **Time Complexity:** $O(n^2)$ due to `ArrayList` insertions.\n- **Space Complexity:** $O(n)$.

---

## Available Solutions

Only verified solution files present in this folder are listed below:

| Language | Solution File |
| :--- | :--- |
| **Java** | [406queue-reconstruction-by-height.java](./406queue-reconstruction-by-height.java) |

---

## Key Learnings

- Placing taller elements first establishes relative invariants that subsequent shorter insertions cannot violate.
