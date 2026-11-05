---
comments: true
difficulty: Hard
tags:
  - Array
  - String
  - Depth-First Search
  - Graph Theory
  - Sorting
  - Heap (Priority Queue)
  - Eulerian Circuit
  - Eulerian Path
  - Semi-Eulerian Graph
---

# 332. Reconstruct Itinerary

**[View Problem on LeetCode](https://leetcode.com/problems/reconstruct-itinerary/)**

| Attribute | Details |
| :--- | :--- |
| **Problem ID** | `0332` (`332`) |
| **Difficulty** | Hard |
| **Topics / Tags** | `Array`, `String`, `Depth-First Search`, `Graph Theory`, `Sorting`, `Heap (Priority Queue)`, `Eulerian Circuit`, `Eulerian Path`, `Semi-Eulerian Graph` |
| **Solution Language** | Java |

---

## Problem Description

You are given a list of flight `tickets` where `tickets[i] = [from_i, to_i]` represents a directed flight from airport `from_i` to airport `to_i`. Starting from `"JFK"`, reconstruct a complete itinerary that uses **every ticket exactly once**.

At least one valid itinerary is guaranteed to exist. If multiple valid itineraries exist, return the one with the **smallest lexical order**.

---

## Examples

### Example 1

```text
Input: tickets = [["MUC","LHR"],["JFK","MUC"],["SFO","SJC"],["LHR","SFO"]]
Output: ["JFK","MUC","LHR","SFO","SJC"]
```

### Example 2

```text
Input: tickets = [["JFK","SFO"],["JFK","ATL"],["SFO","ATL"],["ATL","JFK"],["ATL","SFO"]]
Output: ["JFK","ATL","JFK","SFO","ATL","SFO"]
Explanation: Another possible reconstruction is ["JFK","SFO","ATL","JFK","ATL","SFO"] but it is larger in lexical order.
```

---

## Constraints

- `1 <= tickets.length <= 300`

- `tickets[i].length == 2`

- `from_i.length == 3`

- `to_i.length == 3`

- `from_i` and `to_i` consist of uppercase English letters.

- `from_i != to_i`

---

## Problem Understanding

- Airports are vertices and tickets are directed edges (possibly with duplicate parallel tickets). Using every directed edge **once and only once** starting at `"JFK"` is the textbook definition of finding an **Eulerian Path** in a directed multigraph.
- A naive greedy walk that always takes the smallest lexical flight can get trapped early at the final dead-end destination while unused cycles remain elsewhere!
- **Hierholzer's Algorithm** solves Eulerian Path cleanly in linear graph-traversal time: greedily explore lexicographically smallest edges first, and record an airport into `ans` in **post-order** (only after all outgoing flights from it are exhausted), then reverse `ans`.

---

## Approach

### Brute Force Approach

Backtracking over edge choices (marking tickets visited, checking `ans.size() == tickets.length + 1`, and undoing choices on dead ends) works on tiny inputs, but can degrade exponentially on graphs with repeated cycles before finding the valid completion.

### Optimized Approach

Sort `tickets` in **descending** destination order so each airport's adjacency `ArrayList` in `g` stores its lexicographically smallest destination at the **end** (for `O(1)` tail removal), run Hierholzer's post-order `dfs("JFK")`, and reverse `ans`.

### Step-by-Step Thinking Process

1. Sort `tickets` by `b.get(1).compareTo(a.get(1))` (descending arrival airport).
2. Build `Map<String, List<String>> g` where `g.get(from)` holds destinations in descending order—meaning `g.get(f).remove(g.get(f).size() - 1)` pops the **lexicographically smallest** remaining destination in `O(1)` time.
3. Define `dfs(String f)`: while `f` still has outgoing flights in `g`, pop the smallest destination `t` from the end of `g.get(f)` and recursively call `dfs(t)`.
4. Once `f` has zero remaining outgoing flights, append `ans.add(f)` (post-order).
5. After `dfs("JFK")` returns, call `Collections.reverse(ans)` and return `ans`.

### Algorithm / Intuition

Why does post-order recording fix dead-end traps? Because a valid Eulerian path starting at `"JFK"` exists, at most one vertex (the true final destination—or `"JFK"` itself if it's an Eulerian circuit) has `in_degree - out_degree == 1`, and every other vertex is balanced. Therefore, our greedy walk from `"JFK"` can **only** get stuck at the true final destination! Adding that stuck vertex to `ans` first, then unwinding back to splice in any bypassed side-loops (whose remaining edges are also explored smallest-first), constructs the exact lexicographically smallest itinerary in reverse.

---

## Dry Run

Tracing **Example 1** (`tickets = [["MUC","LHR"],["JFK","MUC"],["SFO","SJC"],["LHR","SFO"]]`):

- Graph `g`: `JFK -> [MUC]`, `MUC -> [LHR]`, `LHR -> [SFO]`, `SFO -> [SJC]`.
- `dfs("JFK")` pops `MUC` -> `dfs("MUC")` pops `LHR` -> `dfs("LHR")` pops `SFO` -> `dfs("SFO")` pops `SJC` -> `dfs("SJC")`.
- `SJC` has no outgoing edges -> `ans.add("SJC")`.
- Unwinding adds `"SFO"`, `"LHR"`, `"MUC"`, `"JFK"` -> `ans = ["SJC", "SFO", "LHR", "MUC", "JFK"]`.
- `Collections.reverse(ans)` -> `["JFK", "MUC", "LHR", "SFO", "SJC"]`.

---

## Complexity Analysis

- **Time Complexity:** `O(E log E)` — Sorting `E = tickets.length` tickets takes `O(E log E)` (with constant 3-character airport strings), and Hierholzer's `dfs` removes and traverses each edge exactly once in `O(1)` amortized `ArrayList` tail-pop time.
- **Space Complexity:** `O(E)` — Adjacency map `g`, recursion stack (depth at most `E + 1`), and result list `ans` all use `O(E)` memory.

---

## Available Solutions

Only verified solution files present in this folder are listed below:

| Language | Solution File |
| :--- | :--- |
| **Java** | [332reconstruct-itinerary.java](./332reconstruct-itinerary.java) |

---

## Key Learnings

- Hierholzer's post-order DFS finds Eulerian paths/circuits in `O(E)` traversal time without backtracking!
- Sorting destinations in **reverse** order inside an `ArrayList` lets `list.remove(list.size() - 1)` pop the smallest element in `O(1)` without `PriorityQueue` heap overhead or `O(n)` front-removal shifts.
