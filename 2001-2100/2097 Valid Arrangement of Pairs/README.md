---
comments: true
difficulty: Hard
tags:
  - Array
  - Depth-First Search
  - Graph Theory
  - Eulerian Circuit
  - Eulerian Path
  - Semi-Eulerian Graph
---

# 2097. Valid Arrangement of Pairs

**[View Problem on LeetCode](https://leetcode.com/problems/valid-arrangement-of-pairs/)**

| Attribute | Details |
| :--- | :--- |
| **Problem ID** | `2097` (`2097`) |
| **Difficulty** | Hard |
| **Topics / Tags** | `Array`, `Depth-First Search`, `Graph Theory`, `Eulerian Circuit`, `Eulerian Path`, `Semi-Eulerian Graph` |
| **Solution Language** | Java |

---

## Problem Description

You are given a **0-indexed** 2D integer array `pairs` where `pairs[i] = [start_i, end_i]` represents a directed pair of distinct integers. No two pairs are identical.

A reordering of `pairs` is considered **valid** if the second element of each pair matches the first element of the immediately following pair—that is, `end_{i-1} == start_i` for every index `1 <= i < pairs.length`.

It is guaranteed that at least one valid arrangement exists. Return **any** valid arrangement of `pairs`.

---

## Examples

### Example 1

```text
Input: pairs = [[5,1],[4,5],[11,9],[9,4]]
Output: [[11,9],[9,4],[4,5],[5,1]]
Explanation:
This is a valid arrangement since end_i-1 always equals start_i.
end_0 = 9 == 9 = start_1
end_1 = 4 == 4 = start_2
end_2 = 5 == 5 = start_3
```

### Example 2

```text
Input: pairs = [[1,3],[3,2],[2,1]]
Output: [[1,3],[3,2],[2,1]]
Explanation:
This is a valid arrangement since end_i-1 always equals start_i.
end_0 = 3 == 3 = start_1
end_1 = 2 == 2 = start_2
The arrangements [[2,1],[1,3],[3,2]] and [[3,2],[2,1],[1,3]] are also valid.
```

### Example 3

```text
Input: pairs = [[1,2],[1,3],[2,1]]
Output: [[1,2],[2,1],[1,3]]
Explanation:
This is a valid arrangement since end_i-1 always equals start_i.
end_0 = 2 == 2 = start_1
end_1 = 1 == 1 = start_2
```

---

## Constraints

- `1 <= pairs.length <= 10^5`

- `pairs[i].length == 2`

- `0 <= start_i, end_i <= 10^9`

- `start_i != end_i`

- No two pairs are exactly the same.

- There **exists** a valid arrangement of `pairs`.

---

## Problem Understanding

- **Graph Formulation (Eulerian Path):** Treat each unique integer in `pairs` as a directed graph vertex and each pair `[from, to]` as a directed edge `from -> to`. Chaining all pairs so that `end_{i-1} == start_i` is equivalent to finding an **Eulerian path** (a trail that traverses every directed edge in the graph exactly once).
- **Start Vertex Degree Property:** In a directed graph that admits an Eulerian path:
  - Either `outDegree[v] == inDegree[v]` for every vertex (an **Eulerian circuit**, meaning we can start at *any* vertex with outgoing edges, such as `pairs[0][0]`), or
  - Exactly one vertex has `outDegree[v] - inDegree[v] == 1` (the mandatory **start** vertex) and one vertex has `inDegree[v] - outDegree[v] == 1` (the **end** vertex).
- **Large Vertex Labels:** Vertex values range up to `10^9` while `pairs.length <= 10^5`, so adjacency lists and degree counts must use `HashMap` rather than flat arrays.

---

## Approach

### Brute Force Approach

A naive backtracking DFS tries every unused pair `[u, v]` matching the previous pair's endpoint, marking edges visited and backtracking upon hitting a dead end before using all `E` pairs. Because vertices can have high degree, exploring permutations of outgoing edges takes exponential `O(E!)` time in the worst case, timing out immediately for `E = 10^5`.

### Optimized Approach

Model the pairs as directed edges using `HashMap` adjacency stacks and degree maps, identify the Eulerian start vertex via `outDegree - inDegree == 1`, and run **Hierholzer's Algorithm** iteratively with an explicit `Deque` stack to construct the Eulerian path in `O(V + E)` time.

### Step-by-Step Thinking Process

1. Translate each pair `[from, to]` into a directed edge `from -> to`; chaining all pairs end-to-start means traversing every edge exactly once (an Eulerian path).
2. Build `graph` (`Map<Integer, Stack<Integer>>`), `inDegree`, and `outDegree` in one pass over `pairs`.
3. Find `startNode`: initialize `startNode = pairs[0][0]`, then scan `graph.keySet()` and pick the unique node with `outDegree - inDegree == 1` if one exists.
4. Execute iterative Hierholzer's algorithm: maintain `stack` initialized with `startNode`; while `stack` is non-empty, if `stack.peek()` still has unused outgoing edges in `graph`, pop one edge and push `nextNode` onto `stack`; otherwise pop from `stack` into `path` (post-order).
5. Reverse `path` and pair adjacent vertices `(path.get(i), path.get(i + 1))` to form the `result` 2D array.

### Algorithm / Intuition

Why can't we just greedily walk edges and append vertices as we first visit them? Because if a graph has a side cycle attached to the main path, a greedy walk might head straight to the final sink vertex first, stranding the unvisited cycle! Hierholzer's algorithm solves this via **post-order edge consumption**:

1. Each edge `from -> to` is stored once in `graph.get(from)` (a `Stack<Integer>`), so `graph.get(node).pop()` removes an edge in `O(1)` time so it is never traversed twice.
2. When `node = stack.peek()` has no remaining outgoing edges (`!graph.containsKey(node) || graph.get(node).isEmpty()`), `node` must be the current endpoint of whatever remaining trail we are tracing, so we pop `node` from `stack` and append it to `path`.
3. Backtracking up `stack` automatically splices any remaining side cycles into the path at the exact vertex where those cycles branch off.
4. Because vertices are recorded in finish order (from sink back to `startNode`), `Collections.reverse(path)` restores forward order `[v_0, v_1, ..., v_E]`, and `result[i] = {path.get(i), path.get(i + 1)}` reconstructs all `E` valid consecutive pairs.

---

## Dry Run

Trace on **Example 1**: `pairs = [[5, 1], [4, 5], [11, 9], [9, 4]]`.

1. **Graph & Degrees:**
   - `graph`: `5 -> [1]`, `4 -> [5]`, `11 -> [9]`, `9 -> [4]`
   - `outDegree`: `{5:1, 4:1, 11:1, 9:1}`
   - `inDegree`: `{1:1, 5:1, 9:1, 4:1}`
2. **Find `startNode`:**
   - Check `outDegree - inDegree`: for `11`, `1 - 0 == 1` -> `startNode = 11`.
3. **Hierholzer's Loop (`stack = [11]`, `path = []`):**
   - Peek `11`: pop `9` from `graph[11]`, push `9` -> `stack = [9, 11]`
   - Peek `9`: pop `4` from `graph[9]`, push `4` -> `stack = [4, 9, 11]`
   - Peek `4`: pop `5` from `graph[4]`, push `5` -> `stack = [5, 4, 9, 11]`
   - Peek `5`: pop `1` from `graph[5]`, push `1` -> `stack = [1, 5, 4, 9, 11]`
   - Peek `1`: no outgoing edges left -> pop `1` to `path` (`[1]`) -> `stack = [5, 4, 9, 11]`
   - Peek `5`, `4`, `9`, `11`: all now empty -> popped in turn into `path = [1, 5, 4, 9, 11]`.
4. **Reverse & Build Pairs:**
   - `Collections.reverse(path)` -> `path = [11, 9, 4, 5, 1]`.
   - Consecutive pairs: `[[11, 9], [9, 4], [4, 5], [5, 1]]`.

---

## Complexity Analysis

- **Time Complexity:** `O(n)` — Letting `n = pairs.length` (`E = n` edges and `V <= 2n` vertices), building the maps, finding `startNode`, popping each edge once in Hierholzer's loop, and reversing `path` all run in `O(V + E) = O(n)` average time.
- **Space Complexity:** `O(n)` — The `graph`, `inDegree`, and `outDegree` hash maps, along with `stack` and `path`, store `O(V + E) = O(n)` elements.

---

## Available Solutions

Only verified solution files present in this folder are listed below:

| Language | Solution File |
| :--- | :--- |
| **Java** | [2097valid-arrangement-of-pairs.java](./2097valid-arrangement-of-pairs.java) |

---

## Key Learnings

- Whenever a problem asks to arrange dominoes, word chains, or pairs `[u, v]` end-to-start using every item once, model items as **directed edges** (not vertices) and find an **Eulerian path**.
- Using an explicit `Deque` stack for Hierholzer's algorithm avoids `StackOverflowError` on deep paths of length `10^5` that could crash recursive DFS in Java.
- Consuming edges via `.pop()` from adjacency lists shrinks the graph dynamically in `O(1)` per edge without needing a separate `visited` edge set.
