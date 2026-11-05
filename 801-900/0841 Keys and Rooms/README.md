---
comments: true
difficulty: Medium
tags:
  - Depth-First Search
  - Breadth-First Search
  - Graph Theory
---

# 841. Keys and Rooms

**[View Problem on LeetCode](https://leetcode.com/problems/keys-and-rooms/)**

| Attribute | Details |
| :--- | :--- |
| **Problem ID** | `0841` (`841`) |
| **Difficulty** | Medium |
| **Topics / Tags** | `Depth-First Search`, `Breadth-First Search`, `Graph Theory` |
| **Solution Language** | JavaScript |

---

## Problem Description

There are `n` rooms labeled `0` through `n - 1`. Initially, room `0` is unlocked and all other rooms `1 .. n - 1` are locked.

Entering room `i` gives you all keys listed in `rooms[i]`, where each key unlocks its corresponding numbered room. You may carry and use keys in any order to visit unlocked rooms. Return `true` if you can eventually visit **every** room, or `false` otherwise.

---

## Examples

### Example 1

```text
Input: rooms = [[1],[2],[3],[]]
Output: true
Explanation:
We visit room 0 and pick up key 1.
We then visit room 1 and pick up key 2.
We then visit room 2 and pick up key 3.
We then visit room 3.
Since we were able to visit every room, we return true.
```

### Example 2

```text
Input: rooms = [[1,3],[3,0,1],[2],[0]]
Output: false
Explanation: We can not enter room number 2 since the only key that unlocks it is in that room.
```

---

## Constraints

- `n == rooms.length`

- `2 <= n <= 1000`

- `0 <= rooms[i].length <= 1000`

- `1 <= sum(rooms[i].length) <= 3000`

- `0 <= rooms[i][j] < n`

- All the values of `rooms[i]` are **unique**.

---

## Problem Understanding

- Rooms correspond to **vertices** `0 .. n - 1` and keys inside `rooms[i]` correspond to **directed edges** `i -> j`.
- Asking whether every room can be unlocked starting from room `0` is equivalent to asking whether all `n` vertices are reachable from vertex `0` in this directed graph.
- Since `rooms` may contain cycles (e.g., room `0` has key `1` and room `1` has key `0`), we must mark visited rooms to avoid infinite loops.

---

## Approach

### Brute Force Approach

Repeatedly scanning all `n` rooms in multiple passes to see if newly collected keys unlock additional unvisited rooms until a full pass unlocks nothing new can take `O(n * (n + e))` time if rooms unlock one by one in reverse order.

### Optimized Approach

Run a **Depth-First Search (`dfs`)** starting from room `0` with a boolean visited array `vis` and a visited room counter `cnt`; return `cnt === rooms.length`.

### Step-by-Step Thinking Process

1. Model `rooms` directly as an adjacency list of a directed graph.
2. Initialize `vis = new Array(rooms.length).fill(false)` and a counter `cnt = 0`.
3. Define `dfs(i)`: if `vis[i]` is already `true`, return immediately; otherwise mark `vis[i] = true`, increment `cnt`, and recursively call `dfs(j)` for every key `j` in `rooms[i]`.
4. Invoke `dfs(0)` (the only initially unlocked room) and check whether `cnt === rooms.length`.

### Algorithm / Intuition

In `canVisitAllRooms(rooms)`:
- `vis[i]` guarantees `dfs` enters and processes each room's key list at most once.
- `cnt` increments each time a brand-new room is marked visited, saving an extra pass over `vis` at the end.
- After `dfs(0)` finishes exploring the entire reachable component of room `0`, `cnt === rooms.length` is `true` if and only if all `n` rooms were reached.

---

## Dry Run

Trace on **Example 1**: `rooms = [[1], [2], [3], []]` (`rooms.length = 4`).

1. Init: `cnt = 0`, `vis = [false, false, false, false]`.
2. `dfs(0)` -> `vis[0] = true`, `cnt = 1`, key `1` -> calls `dfs(1)`.
3. `dfs(1)` -> `vis[1] = true`, `cnt = 2`, key `2` -> calls `dfs(2)`.
4. `dfs(2)` -> `vis[2] = true`, `cnt = 3`, key `3` -> calls `dfs(3)`.
5. `dfs(3)` -> `vis[3] = true`, `cnt = 4`, `rooms[3]` is empty -> returns up call stack.
6. Check `cnt === rooms.length`: `4 === 4` -> returns `true`.

---

## Complexity Analysis

- **Time Complexity:** `O(n + e)` — Where `n = rooms.length` and `e` is the total number of keys across all rooms; each room and key is processed at most once.
- **Space Complexity:** `O(n)` — For the `vis` boolean array of size `n` and recursion stack depth up to `n`.

---

## Available Solutions

Only verified solution files present in this folder are listed below:

| Language | Solution File |
| :--- | :--- |
| **JavaScript** | [841keys-and-rooms.js](./841keys-and-rooms.js) |

---

## Key Learnings

- Sequential dependency/unlocking puzzles with reusable keys reduce directly to single-source graph reachability (DFS/BFS).
- Maintaining an integer `cnt` of newly visited nodes avoids scanning the `vis` array afterward.
