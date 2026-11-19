---
comments: true
difficulty: Medium
tags:
  - Depth-First Search
  - Breadth-First Search
  - Graph Theory
  - Topological Sort
---

# 210. Course Schedule II

**[View Problem on LeetCode](https://leetcode.com/problems/course-schedule-ii/)**

| Attribute | Details |
| :--- | :--- |
| **Problem ID** | `0210` (`210`) |
| **Difficulty** | Medium |
| **Topics / Tags** | `Depth-First Search`, `Breadth-First Search`, `Graph Theory`, `Topological Sort` |
| **Solution Language** | Java |

---

## Problem Description

There are a total of `numCourses` courses you have to take, labeled from `0` to `numCourses - 1`. You are given an array `prerequisites` where `prerequisites[i] = [a_i, b_i]` indicates that you **must** take course `b_i` first if you want to take course `a_i`.

	
- For example, the pair `[0, 1]`, indicates that to take course `0` you have to first take course `1`.

Return *the ordering of courses you should take to finish all courses*. If there are many valid answers, return **any** of them. If it is impossible to finish all courses, return **an empty array**.

---

## Examples

### Example 1

```text
**Input:** numCourses = 2, prerequisites = [[1,0]]
**Output:** [0,1]
**Explanation:** There are a total of 2 courses to take. To take course 1 you should have finished course 0. So the correct course order is [0,1].
```

### Example 2

```text
**Input:** numCourses = 4, prerequisites = [[1,0],[2,0],[3,1],[3,2]]
**Output:** [0,2,1,3]
**Explanation:** There are a total of 4 courses to take. To take course 3 you should have finished both courses 1 and 2. Both courses 1 and 2 should be taken after you finished course 0.
So one correct course order is [0,1,2,3]. Another correct ordering is [0,2,1,3].
```

### Example 3

```text
**Input:** numCourses = 1, prerequisites = []
**Output:** [0]
```

 

**

---

## Constraints

**

	
- `1 <= numCourses <= 2000`
	
- `0 <= prerequisites.length <= numCourses * (numCourses - 1)`
	
- `prerequisites[i].length == 2`
	
- `0 <= a_i, b_i < numCourses`
	
- `a_i != b_i`
	
- All the pairs `[a_i, b_i]` are **distinct**.

---

## Problem Understanding

- Given `numCourses` courses and prerequisite pairs `[a, b]` (take `b` before `a`), return any valid topological ordering of all courses, or an empty array `[]` if impossible (cycle exists).

---

## Approach

### Optimized Approach (Kahn's Algorithm — BFS Topological Sort with Result Recording)
1. Construct adjacency list `g` (`b -> a`) and indegree array `indeg`.
2. Enqueue all courses with `indeg[i] == 0`.
3. Maintain result array `ans = new int[numCourses]` and counter `cnt = 0`.
4. While queue `q` is non-empty:
   - Poll `i` and record `ans[cnt++] = i`.
   - For each neighbor `j` in `g[i]`, decrement `indeg[j]` and enqueue `j` if `indeg[j] == 0`.
5. If `cnt == numCourses`, return `ans`; otherwise return `new int[0]`.

### Dry Run (`numCourses = 2`, `prerequisites = [[1,0]]`)
- `indeg = [0, 1]`. Queue polls `0` (`ans[0] = 0`), unlocks `1`, polls `1` (`ans[1] = 1`).
- `cnt == 2` -> returns `[0, 1]`.

---

## Complexity Analysis

- **Time Complexity:** $O(V + E)$ — Every vertex and directed edge is visited once.
- **Space Complexity:** $O(V + E)$ — Adjacency list, indegree array, queue, and output array.

---

## Available Solutions

Only verified solution files present in this folder are listed below:

| Language | Solution File |
| :--- | :--- |
| **Java** | [210course-schedule-ii.java](./210course-schedule-ii.java) |

---

## Key Learnings

- Extending Course Schedule (I) to record each popped zero-indegree node yields a complete topological order in linear time.
