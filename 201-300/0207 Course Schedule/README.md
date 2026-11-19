---
comments: true
difficulty: Medium
tags:
  - Depth-First Search
  - Breadth-First Search
  - Graph Theory
  - Topological Sort
  - Directed Acyclic Graph
---

# 207. Course Schedule

**[View Problem on LeetCode](https://leetcode.com/problems/course-schedule/)**

| Attribute | Details |
| :--- | :--- |
| **Problem ID** | `0207` (`207`) |
| **Difficulty** | Medium |
| **Topics / Tags** | `Depth-First Search`, `Breadth-First Search`, `Graph Theory`, `Topological Sort`, `Directed Acyclic Graph` |
| **Solution Language** | Java |

---

## Problem Description

There are a total of `numCourses` courses you have to take, labeled from `0` to `numCourses - 1`. You are given an array `prerequisites` where `prerequisites[i] = [a_i, b_i]` indicates that you **must** take course `b_i` first if you want to take course `a_i`.

	
- For example, the pair `[0, 1]`, indicates that to take course `0` you have to first take course `1`.

Return `true` if you can finish all courses. Otherwise, return `false`.

---

## Examples

### Example 1

```text
**Input:** numCourses = 2, prerequisites = [[1,0]]
**Output:** true
**Explanation:** There are a total of 2 courses to take. 
To take course 1 you should have finished course 0. So it is possible.
```

### Example 2

```text
**Input:** numCourses = 2, prerequisites = [[1,0],[0,1]]
**Output:** false
**Explanation:** There are a total of 2 courses to take. 
To take course 1 you should have finished course 0, and to take course 0 you should also have finished course 1. So it is impossible.
```

 

**

---

## Constraints

**

	
- `1 <= numCourses <= 2000`
	
- `0 <= prerequisites.length <= 5000`
	
- `prerequisites[i].length == 2`
	
- `0 <= a_i, b_i < numCourses`
	
- All the pairs prerequisites[i] are **unique**.

---

## Problem Understanding

- Given `numCourses` courses labeled `0` to `numCourses - 1` and directed prerequisite pairs `[a, b]` (must take `b` before `a`), determine whether all courses can be finished (i.e., whether the prerequisite graph is a Directed Acyclic Graph / has no cycles).

---

## Approach

### Optimized Approach (Kahn's Algorithm — BFS Topological Sort)
1. Build adjacency list `g` where edge `b -> a` represents prerequisite `b` unlocking `a`, and track incoming edge counts in `indeg[a]`.
2. Push all courses with `indeg[i] == 0` into queue `q`.
3. While `q` is non-empty:
   - Poll course `i` and decrement `numCourses`.
   - For each dependent course `j` in `g[i]`, decrement `indeg[j]`; if it reaches `0`, offer `j` to `q`.
4. Return `numCourses == 0` (every course was processed, proving no cycle exists).

### Dry Run (`numCourses = 2`, `prerequisites = [[1,0]]`)
- `g[0] = [1]`, `indeg = [0, 1]`.
- Queue starts with `[0]`. Poll `0` (`numCourses = 1`), decrement `indeg[1]` to `0`, offer `1`.
- Poll `1` (`numCourses = 0`). Returns `true`.

---

## Complexity Analysis

- **Time Complexity:** $O(V + E)$ — Each course (vertex $V$) and prerequisite (edge $E$) is processed once.
- **Space Complexity:** $O(V + E)$ — Adjacency list, indegree array, and BFS queue.

---

## Available Solutions

Only verified solution files present in this folder are listed below:

| Language | Solution File |
| :--- | :--- |
| **Java** | [207course-schedule.java](./207course-schedule.java) |

---

## Key Learnings

- A directed graph has a valid topological ordering if and only if Kahn's BFS algorithm visits all $V$ vertices.
