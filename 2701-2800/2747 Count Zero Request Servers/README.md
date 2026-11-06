---
comments: true
difficulty: Medium
tags:
  - Array
  - Hash Table
  - Sliding Window
  - Sorting
---

# 2747. Count Zero Request Servers

**[View Problem on LeetCode](https://leetcode.com/problems/count-zero-request-servers/)**

| Attribute | Details |
| :--- | :--- |
| **Problem ID** | `2747` |
| **Difficulty** | Medium |
| **Topics / Tags** | `Array`, `Hash Table`, `Sliding Window`, `Sorting` |
| **Solution Language** | Java |

---

## Problem Description

You are given an integer `n` denoting the total number of servers and a **2D 0-indexed** integer array `logs`, where `logs[i] = [server_id, time]` denotes that the server with id `server_id` received a request at time `time`.

You are also given an integer `x` and a **0-indexed** integer array `queries`.

Return *a **0-indexed** integer array* `arr` *of length* `queries.length` *where* `arr[i]` *represents the number of servers that **did not receive** any requests during the time interval* `[queries[i] - x, queries[i]]`.

Note that the time intervals are inclusive.

---

## Examples

### Example 1

```text
Input: n = 3, logs = [[1,3],[2,6],[1,5]], x = 5, queries = [10,11]
Output: [1,2]
Explanation:
For queries[0]: The servers with ids 1 and 2 get requests in the duration of [5, 10]. Hence, only server 3 gets zero requests.
For queries[1]: Only the server with id 2 gets a request in duration of [6, 11]. Hence, the servers with ids 1 and 3 are the only servers that do not receive any requests during that time period.
```

### Example 2

```text
Input: n = 3, logs = [[2,4],[2,1],[1,2],[3,1]], x = 2, queries = [3,4]
Output: [0,1]
Explanation:
For queries[0]: All servers get at least one request in the duration of [1, 3].
For queries[1]: Only server with id 3 gets no request in the duration [2, 4].
```

---

## Constraints

- `1 <= n <= 10^5`
- `1 <= logs.length <= 10^5`
- `1 <= queries.length <= 10^5`
- `logs[i].length == 2`
- `1 <= logs[i][0] <= n`
- `1 <= logs[i][1] <= 10^6`
- `1 <= x <= 10^5`
- `x < queries[i] <= 10^6`

---

## Problem Understanding

- We have $n$ servers indexed $1$ through $n$.
- Each entry in `logs` records a timestamp at which a specific server received a request.
- For each query $q \in 	ext{queries}$, we must determine how many of the $n$ servers received **zero** requests in the inclusive window $[q - x, q]$.
- Complementary counting simplifies the problem: if $D$ distinct servers received at least one request in $[q - x, q]$, then exactly $n - D$ servers received zero requests.
- Because queries arrive in arbitrary order, sorting the queries offline allows us to slide the query window monotonically forward in time.

---

## Approach

### Brute Force Approach

For every query `queries[i]`, scan all entries in `logs` to find which server IDs fall within `[queries[i] - x, queries[i]]`, collect distinct server IDs in a `HashSet`, and compute `n - set.size()`.
With up to $10^5$ queries and $10^5$ log entries, this takes $O(M \times L) = 10^{10}$ operations, resulting in Time Limit Exceeded.

### Optimized Approach (Offline Sorting + Two-Pointer Sliding Window)

1. **Sort logs by timestamp:**
   Sort `logs` in ascending order based on `logs[i][1]`.
2. **Sort queries offline:**
   Store each query along with its original index: `qs[i] = [queries[i], i]`. Sort `qs` in ascending order by query time $r$.
3. **Sliding window with two pointers (`j` and `k`):**
   - For each query with right endpoint $r$ and left endpoint $l = r - x$:
     - **Expand right (`k`):** While `k < logs.length` and `logs[k][1] <= r`, increment the frequency of server `logs[k][0]` in a frequency map `cnt`, then advance `k++`.
     - **Shrink left (`j`):** While `j < logs.length` and `logs[j][1] < l`, decrement the frequency of server `logs[j][0]`. If its frequency reaches `0`, remove it completely from `cnt`, then advance `j++`.
   - The size of `cnt` (`cnt.size()`) now represents the number of unique active servers in $[l, r]$.
   - Store $n - 	ext{cnt.size()}$ at the query's original index `ans[i]`.
4. Return `ans`.

### Step-by-Step Thinking Process

1. Track original query indices before sorting so answers can be restored in original order.
2. Sort logs chronologically and queries chronologically.
3. Both the window start ($l$) and window end ($r$) move strictly non-decreasingly across queries.
4. Use pointer `k` to add log entries entering the right of the window, and pointer `j` to evict log entries falling out of the left.
5. `cnt.size()` yields the number of unique servers in $O(1)$ time.

### Algorithm / Intuition

Because query endpoints move monotonically to the right, each log entry is added to `cnt` at most once by pointer `k` and removed from `cnt` at most once by pointer `j`. This transforms a quadratic range search into an optimal linear-scan sliding window.

---

## Dry Run

Tracing **Example 1**: `n = 3`, `logs = [[1, 3], [2, 6], [1, 5]]`, `x = 5`, `queries = [10, 11]`.
1. **Sorted logs:** `[[1, 3], [1, 5], [2, 6]]`.
2. **Sorted queries with indices:** `qs = [[10, 0], [11, 1]]`.
3. **Query 0:** $r = 10, l = 10 - 5 = 5$, original index $i = 0$:
   - Expand `k`:
     - `logs[0] = [1, 3] <= 10` -> `cnt = {1: 1}`, `k = 1`
     - `logs[1] = [1, 5] <= 10` -> `cnt = {1: 2}`, `k = 2`
     - `logs[2] = [2, 6] <= 10` -> `cnt = {1: 2, 2: 1}`, `k = 3`
   - Shrink `j` (< 5):
     - `logs[0] = [1, 3] < 5` -> `cnt = {1: 1, 2: 1}`, `j = 1`
     - `logs[1] = [1, 5] >= 5` -> stop shrinking.
   - Distinct active servers: `cnt.size() = 2` (servers 1 and 2).
   - Zero-request servers: `ans[0] = 3 - 2 = 1`.
4. **Query 1:** $r = 11, l = 11 - 5 = 6$, original index $i = 1$:
   - Expand `k`: `k = 3 == logs.length` -> no additions.
   - Shrink `j` (< 6):
     - `logs[1] = [1, 5] < 6` -> decrement server 1 count to 0, removed! `cnt = {2: 1}`, `j = 2`.
     - `logs[2] = [2, 6] >= 6` -> stop shrinking.
   - Distinct active servers: `cnt.size() = 1` (server 2).
   - Zero-request servers: `ans[1] = 3 - 1 = 2`.
5. **Output:** `[1, 2]`. Matches Example 1 output.

---

## Complexity Analysis

- **Time Complexity:** $O(L \log L + M \log M)$ — Where $L = \text{logs.length}$ and $M = \text{queries.length}$. Sorting `logs` and `queries` takes $O(L \log L + M \log M)$. The two-pointer sliding window traverses each log entry at most twice ($O(L)$) across all $M$ queries ($O(M)$), with $O(1)$ amortized hash map operations.
- **Space Complexity:** $O(M + \min(n, L))$ — Auxiliary space for the query array `qs`, output array `ans`, and the hash map `cnt` storing at most $\min(n, L)$ active server entries.

---

## Available Solutions

Only verified solution files present in this folder are listed below:

| Language | Solution File |
| :--- | :--- |
| **Java** | [2747count-zero-request-servers.java](./2747count-zero-request-servers.java) |

---

## Key Learnings

- Offline query sorting transforms independent static interval queries into a unified sliding window problem.
- Complementary counting ($n - \text{active servers}$) converts an "absence" question into a simpler "presence" tracking problem.
- Maintaining a frequency map with key deletion on count zero allows dynamic $O(1)$ queries for the number of unique active elements (`cnt.size()`).
