---
comments: true
difficulty: Hard
tags:
  - Array
  - Heap (Priority Queue)
  - Simulation
  - Ordered Set
---

# 1606. Find Servers That Handled Most Number of Requests

**[View Problem on LeetCode](https://leetcode.com/problems/find-servers-that-handled-most-number-of-requests/)**

| Attribute | Details |
| :--- | :--- |
| **Problem ID** | `1606` (`1606`) |
| **Difficulty** | Hard |
| **Topics / Tags** | `Array`, `Heap (Priority Queue)`, `Simulation`, `Ordered Set` |
| **Solution Language** | Java |

---

## Problem Description

You have `k` servers numbered from `0` to `k-1` that are being used to handle requests. Each server has fixed request capacity. A request is assigned to an available server using the following algorithm:

1. The $i^{	ext{th}}$ request arrives at time `arrival[i]`.
2. First, check if any server from `(i % k)` to `(k - 1)` is free. If so, assign the request to the first free server found in this range.
3. Otherwise, check if any server from `0` to `(i % k - 1)` is free. If so, assign the request to the first free server found in this range.
4. If no server is free, the request is dropped (not handled at all).
5. Some server handled the request for `load[i]` time and cannot handle any other requests until time `arrival[i] + load[i]`.

Return a list containing the IDs of the **busiest server(s)**. You may return the IDs in any order.

---

## Examples

### Example 1

```text
Input: k = 3, arrival = [1,2,3,4,5], load = [5,2,3,3,3] 
Output: [1] 
Explanation: 
All of the servers start out available.
The first 3 requests are handled by the first 3 servers in order.
Request 3 comes in. Server 0 is busy, so it's assigned to the next available server, which is 1.
Request 4 comes in. It cannot be handled and is dropped.
Servers 0 and 2 handled one request each, while server 1 handled 2 requests. Hence server 1 is the busiest server.
```

### Example 2

```text
Input: k = 3, arrival = [1,2,3,4], load = [1,2,1,2]
Output: [0]
Explanation: 
The first 3 requests are handled by first 3 servers.
Request 3 comes in. It is handled by server 0 since server 0 became free at time 2.
Server 0 handled 2 requests while servers 1 and 2 handled one request each. Hence server 0 is the busiest server.
```

### Example 3

```text
Input: k = 3, arrival = [1,2,3], load = [10,12,11]
Output: [0,1,2]
Explanation: Each server handles a single request, so they are all considered the busiest.
```

---

## Constraints

- `1 <= k <= 10^5`
- `1 <= arrival.length == load.length <= 10^5`
- `1 <= arrival[i], load[i] <= 10^9`
- `arrival` is strictly increasing.

---

## Problem Understanding

- We simulate $N$ requests arriving at non-decreasing times `arrival[i]`.
- When request $i$ arrives at `start = arrival[i]`:
  - Any server whose busy period ends at or before `start` becomes free.
  - If no servers are free, the request is dropped.
  - Otherwise, find the smallest available server id $\ge (i \% k)$ (circular search). If none $\ge (i \% k)$, wrap around to find the smallest available server overall.
- Return all server IDs with the maximum request count.

---

## Approach

### Optimized Approach (Min-Heap for Busy Servers + TreeSet for Free Servers)

1. Maintain an array `cnt[k]` to track request counts for each server.
2. Maintain a min-heap `busy` storing pairs `[endTime, serverId]`, sorted by `endTime`.
3. Maintain a `TreeSet<Integer> free` containing all currently available server IDs, initially `[0..k-1]`.
4. For each request `i` from $0$ to `arrival.length - 1`:
   - `start = arrival[i]`, `end = start + load[i]`.
   - Free all servers whose `busy.peek()[0] <= start` by polling them from `busy` and adding their IDs back into `free`.
   - If `free.isEmpty()`, request is dropped; continue.
   - Use `free.ceiling(i % k)` to find the lowest available server index $\ge i \% k$.
   - If `server == null` (none in $[i \% k, k-1]$), wrap around using `free.first()`.
   - Increment `cnt[server]++`.
   - Add `[end, server]` to `busy`, and remove `server` from `free`.
5. Find the maximum count `mx = max(cnt)` and return all server IDs where `cnt[i] == mx`.

---

## Dry Run

For `k = 3`, `arrival = [1, 2, 3, 4, 5]`, `load = [5, 2, 3, 3, 3]`:
- Initial: `free = {0, 1, 2}`, `busy = []`.
- Req 0: `arrival = 1, load = 5`. `server = ceiling(0 % 3) = 0`. `cnt[0] = 1`, `busy = {[6, 0]}`, `free = {1, 2}`.
- Req 1: `arrival = 2, load = 2`. `server = ceiling(1 % 3) = 1`. `cnt[1] = 1`, `busy = {[4, 1], [6, 0]}`, `free = {2}`.
- Req 2: `arrival = 3, load = 3`. `server = ceiling(2 % 3) = 2`. `cnt[2] = 1`, `busy = {[4, 1], [6, 0], [6, 2]}`, `free = {}`.
- Req 3: `arrival = 4, load = 3`. Server 1 finishes at 4 -> freed: `free = {1}`.
  `server = ceiling(3 % 3 = 0) = 1`. `cnt[1] = 2`, `busy = {[6, 0], [6, 2], [7, 1]}`, `free = {}`.
- Req 4: `arrival = 5, load = 3`. No servers finished $\le 5$. `free` is empty -> dropped!
Max count is 2 (Server 1). Output: `[1]`.

---

## Complexity Analysis

- **Time Complexity:** $O(N \log k)$ — Each of the $N$ requests adds and removes from the heap and TreeSet of size at most $k$ in $O(\log k)$ time.
- **Space Complexity:** $O(k)$ — Heap, TreeSet, and counter array store at most $k$ elements.

---

## Available Solutions

Only verified solution files present in this folder are listed below:

| Language | Solution File |
| :--- | :--- |
| **Java** | [1606find-servers-that-handled-most-number-of-requests.java](./1606find-servers-that-handled-most-number-of-requests.java) |

---

## Key Learnings

- Combining a priority queue (for chronological release of busy resources) with an ordered set (for ceiling/first circular lookups) is a standard pattern for event-driven resource scheduling.
- `TreeSet.ceiling(x)` followed by `TreeSet.first()` cleanly implements circular modular server assignment.
