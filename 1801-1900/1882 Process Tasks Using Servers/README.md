---
comments: true
difficulty: Medium
tags:
  - Array
  - Heap (Priority Queue)
---

# 1882. Process Tasks Using Servers

**[View Problem on LeetCode](https://leetcode.com/problems/process-tasks-using-servers/)**

| Attribute | Details |
| :--- | :--- |
| **Problem ID** | `1882` |
| **Difficulty** | Medium |
| **Topics / Tags** | `Array`, `Heap (Priority Queue)` |
| **Solution Language** | Java |

---

## Problem Description

You are given two **0-indexed** integer arrays `servers` and `tasks` of lengths `n` and `m` respectively. `servers[i]` is the **weight** of the $i^{	ext{th}}$ server, and `tasks[j]` is the **time needed** to process the $j^{	ext{th}}$ task in seconds.

Tasks are assigned to the servers using a task queue. Initially, all servers are free, and the tasks are queued in the order they appear in the array.

At second `j`, the $j^{	ext{th}}$ task is inserted into the queue (starting with the $0^{	ext{th}}$ task at second `0`). You want to assign the next task in the queue to the free server with the **smallest weight**, and in case of a tie, choose the server with the **smallest index**. If there are no free servers and the queue is not empty, we wait until a server becomes free and immediately assign the next task. If multiple servers become free at the same time, then multiple tasks from the queue will be assigned in order of insertion.

A server that is assigned task `j` at second `t` will be free again at second `t + tasks[j]`.

Build an array `ans` of length `m`, where `ans[j]` is the index of the server that the $j^{	ext{th}}$ task will be assigned to.

Return the array `ans`.

---

## Examples

### Example 1

```text
Input: servers = [3,3,2], tasks = [1,2,3,2,1,2]
Output: [2,2,0,2,1,2]
Explanation: Events proceed as follows:
- At second 0, task 0 is added and processed using server 2 until second 1.
- At second 1, server 2 becomes free. Task 1 is added and processed using server 2 until second 3.
- At second 2, task 2 is added and processed using server 0 until second 5.
- At second 3, server 2 becomes free. Task 3 is added and processed using server 2 until second 5.
- At second 4, task 4 is added and processed using server 1 until second 5.
- At second 5, all servers become free. Task 5 is added and processed using server 2 until second 7.
```

### Example 2

```text
Input: servers = [5,1,4,3,2], tasks = [2,1,2,4,5,2,1]
Output: [1,4,1,4,1,3,2]
```

---

## Constraints

- `servers.length == n`
- `tasks.length == m`
- `1 <= n, m <= 2 * 10^5`
- `1 <= servers[i], tasks[j] <= 2 * 10^5`

---

## Problem Understanding

- We need to allocate $m$ tasks across $n$ servers.
- Free servers are selected by `(weight, index)`.
- Running servers are tracked by `(available_time, weight, index)`.
- If no server is free when task $j$ arrives, time fast-forwards to when the earliest busy server completes.

---

## Approach

### Optimized Approach (Two Priority Queues: Idle & Busy)

1. Use two priority queues:
   - `idle`: stores `[weight, index]` of available servers, sorted by weight then index.
   - `busy`: stores `[free_time, weight, index]` of active servers, sorted by `free_time` then weight then index.
2. Initialize `idle` with all $n$ servers at time $0$.
3. For each task $j$ with duration $t$:
   - Release all servers in `busy` whose `free_time <= j` back into `idle`.
   - If `idle` is not empty:
     - Pop server $i$ from `idle`.
     - Assign `ans[j] = i`.
     - Push to `busy` with completion time `j + t`.
   - Else (`idle` is empty):
     - Fast-forward: pop the earliest completing server from `busy`.
     - Assign `ans[j] = server_index`.
     - Push back to `busy` with completion time `p[0] + t`.
4. Return `ans`.

---

## Complexity Analysis

- **Time Complexity:** $O((n + m) \log n)$ — Initializing $n$ servers takes $O(n \log n)$. Each task triggers at most a constant number of heap operations in $O(\log n)$.
- **Space Complexity:** $O(n + m)$ — Two priority queues storing at most $n$ servers, and output array of size $m$.

---

## Available Solutions

Only verified solution files present in this folder are listed below:

| Language | Solution File |
| :--- | :--- |
| **Java** | [1882process-tasks-using-servers.java](./1882process-tasks-using-servers.java) |

---

## Key Learnings

- Maintaining separate priority queues for idle and busy resources cleanly separates spatial selection (weight/index) from temporal event sequencing (completion time).
- When all resources are saturated, advancing time directly to `busy.peek()[0]` avoids empty-cycle polling.
