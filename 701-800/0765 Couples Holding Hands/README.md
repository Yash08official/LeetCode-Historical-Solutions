---
comments: true
difficulty: Hard
tags:
  - Greedy
  - Depth-First Search
  - Breadth-First Search
  - Union-Find
  - Graph Theory
---

# 765. Couples Holding Hands

**[View Problem on LeetCode](https://leetcode.com/problems/couples-holding-hands/)**

| Attribute | Details |
| :--- | :--- |
| **Problem ID** | `0765` (`765`) |
| **Difficulty** | Hard |
| **Topics / Tags** | `Greedy`, `Depth-First Search`, `Breadth-First Search`, `Union-Find`, `Graph Theory` |
| **Solution Language** | Java |

---

## Problem Description

There are n couples sitting in 2n seats arranged in a row and want to hold hands.

The people and seats are represented by an integer array row where row[i] is the ID of the person sitting in the ith seat. The couples are numbered in order, the first couple being (0, 1), the second couple being (2, 3), and so on with the last couple being (2n - 2, 2n - 1).

Return the minimum number of swaps so that every couple is sitting side by side. A swap consists of choosing any two people, then they stand up and switch seats.

 
Example 1:


Input: row = [0,2,1,3]
Output: 1
Explanation: We only need to swap the second (row[1]) and third (row[2]) person.


Example 2:


Input: row = [3,2,0,1]
Output: 0
Explanation: All couples are already seated side by side.


 
Constraints:


	2n == row.length
	2 <= n <= 30​​​​​​​
	0 <= row[i] < 2n
	All the elements of row are unique.

---

## Problem Understanding

- There are $N$ couples (persons $2i$ and $2i+1$).
- Couch seats $2j$ and $2j+1$ form couch $j$.
- If person $x$ and person $y$ sit on the same couch, their couple groups $x/2$ and $y/2$ are connected.
- If $k$ couples are interconnected in a cycle/component, they require exactly $k - 1$ swaps to be resolved.

---

## Approach

### Optimized Approach (Disjoint Set Union / Connected Components)

1. Initialize DSU with $N$ couple elements ($0$ to $N - 1$).
2. For each couch pair at indices $(2i, 2i+1)$:
   - Determine couple groups $a = row[2i] / 2$ and $b = row[2i+1] / 2$.
   - Union groups $a$ and $b$.
3. Total swaps required = $N - (\text{number of connected components})$.
4. Count components where `i == find(i)` and subtract from $N$.

---

## Dry Run

For `row = [0, 2, 1, 3]`:
- Couple 0 (person 0) sits with Couple 1 (person 2).
- Couple 0 (person 1) sits with Couple 1 (person 3).
- Union(0, 1) creates 1 component of size 2.
- Swaps = $2 - 1 = 1$.

---

## Complexity Analysis

- **Time Complexity:** $O(N \alpha(N))$ where $\alpha$ is the Inverse Ackermann function.
- **Space Complexity:** $O(N)$ for the disjoint set array.

---

## Available Solutions

Only verified solution files present in this folder are listed below:

| Language | Solution File |
| :--- | :--- |
| **Java** | [765couples-holding-hands.java](./765couples-holding-hands.java) |

---

## Key Learnings

- Cyclic permutations of size $k$ decompose into $k - 1$ transpositions.
- DSU provides an elegant, minimal implementation to count permutation cycles.
