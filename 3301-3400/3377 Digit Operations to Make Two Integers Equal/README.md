---
comments: true
difficulty: Medium
tags:
  - Math
  - Graph Theory
  - Heap (Priority Queue)
  - Number Theory
  - Shortest Path
---

# 3377. Digit Operations to Make Two Integers Equal

**[View Problem on LeetCode](https://leetcode.com/problems/digit-operations-to-make-two-integers-equal/)**

| Attribute | Details |
| :--- | :--- |
| **Problem ID** | `3377` (`3377`) |
| **Difficulty** | Medium |
| **Topics / Tags** | `Math`, `Graph Theory`, `Heap (Priority Queue)`, `Number Theory`, `Shortest Path` |
| **Solution Language** | Java |

---

## Problem Description

You are given two integers `n` and `m` that consist of the same number of digits.

You can perform the following operations any number of times:
1. Choose any digit from `n` that is not 9 and **increase** it by 1.
2. Choose any digit from `n` that is not 0 and **decrease** it by 1.

Rules:
- At no point can the integer have a leading zero (the first digit cannot be 0).
- At no point can the integer be a **prime** number. This restriction applies to the initial integer `n`, the target integer `m`, and all intermediate values.

The **cost** of an operation is the value of the new integer obtained after the operation. The total cost to transform `n` into `m` is the sum of the values of all integers on the path, **including** the starting integer `n`.

Return the **minimum** total cost to transform `n` into `m`, or `-1` if it is impossible.

---

## Examples

### Example 1

**Input:** `n = 10, m = 12`

**Output:** `85`

**Explanation:**

We perform the following operations:

- Increase the first digit, now `n = 20`.

- Increase the second digit, now `n = 21`.

- Increase the second digit, now `n = 22`.

- Decrease the first digit, now `n = 12`.

### Example 2

**Input:** `n = 4, m = 8`

**Output:** `-1`

**Explanation:**

It is impossible to make `n` equal to `m`.

### Example 3

**Input:** `n = 6, m = 2`

**Output:** `-1`

**Explanation:**

Since 2 is already a prime, we can't make `n` equal to `m`.

---

## Constraints

- `1 <= n, m < 10^4`

- `n` and `m` consist of the same number of digits.

---

## Problem Understanding

- **Graph Modeling:** Integers with the same number of digits form the vertices of a graph. An undirected edge connects two integers if they differ by `+1` or `-1` in exactly one digit position.
- **Prime Obstacles:** Any integer that is prime is an impassable obstacle. If `n` or `m` itself is prime, no valid path can ever exist, so we must immediately return `-1`.
- **Edge Weight and Cost:** Moving from number `u` to number `v` incurs a cost of `v`. The starting cost is `n`. Since all vertex values `v` are strictly positive (`v >= 10^{d-1}`), this is a shortest path problem with non-negative edge weights.
- **Algorithm Choice:** Dijkstra's algorithm with a min-heap priority queue finds the minimum cost path from `n` to `m`.

---

## Approach

### Brute Force Approach

Breadth-First Search (BFS) only finds the shortest path in terms of the number of transitions, but does NOT find the minimum cost path because edge costs depend on the numerical value of the destination vertex. Unweighted search would yield suboptimal paths.

### Optimized Approach

We precompute primes up to 9999 using the Sieve of Eratosthenes. If `isPrime[n]` or `isPrime[m]`, return `-1`. We use Dijkstra's algorithm: array `minSumArr` of size 10000 tracks the minimum total cost to reach each number, initialized to infinity with `minSumArr[n] = n`. A min-heap `PriorityQueue<Pair>` orders by cumulative sum. While `pq` is not empty, poll `current`: if `currentNum == m`, return `(int) currentSum`. Generate all valid neighbor integers by incrementing or decrementing each digit (ensuring no leading zeros and not prime). If `currentSum + newNum < minSumArr[newNum]`, update `minSumArr[newNum]` and push `new Pair(newNum, newSum)` into `pq`. If the queue empties without reaching `m`, return `-1`.

### Step-by-Step Thinking Process

1. Precompute primes up to 9999 using Sieve of Eratosthenes.
2. Check initial condition: if `isPrime[n]` or `isPrime[m]`, return `-1`.
3. Model as a weighted graph where each transition from `u` to `v` costs `v`, with starting cost `n`.
4. Since weights are positive, Dijkstra's algorithm is optimal.
5. Initialize `minSumArr` with infinity and `minSumArr[n] = n`.
6. PriorityQueue stores `Pair(num, sum)` ordered by `sum`.
7. For current number, convert to padded string. For each digit position, try `+1` (if `< '9'`) and `-1` (if `> '0'`).
8. Validate: leading digit cannot be `'0'`, and the new number must not be prime.
9. If a cheaper sum to `newNum` is found, update `minSumArr` and push to `pq`.
10. Return `currentSum` when `currentNum == m`, or `-1` if unreachable.

### Algorithm / Intuition

In `Solution.minOperations`: `sieve(9999)` returns a boolean array `isPrime` identifying primes up to 9999. If `isPrime[n] || isPrime[m]`, `-1` is returned immediately. `minSumArr` of size `MAX = 10000` is filled with `Long.MAX_VALUE`, and `minSumArr[n] = n`. `pq` is a min-heap sorted by `a.sum`. The loop polls `Pair current`. If `currentNum == m`, we have reached target `m` with minimal accumulated cost, returning `(int) currentSum`. If `currentSum > minSumArr[currentNum]`, this state is stale and skipped. The digit manipulation iterates over each digit `i` of the padded string `numStr`: it tests increasing `digit + 1` (when `< '9'`) and decreasing `digit - 1` (when `> '0'`). If the first digit is non-zero and `!isPrime[newNum]`, edge relaxation updates `minSumArr[newNum] = currentSum + newNum` and enqueues the neighbor.

---

## Dry Run

### Step-by-Step Execution on Example 1: `n = 10`, `m = 12`

- Neither 10 nor 12 is prime.
- Dijkstra starts at `n = 10` with initial cost `10`. `minSumArr[10] = 10`.
- From 10, possible 2-digit non-prime neighbors:
  - Change first digit: `20` (cost `10 + 20 = 30`).
  - Change second digit: `11` (is prime -> blocked!).
- Poll 20 (`sum = 30`):
  - From 20, neighbors: `30` (`sum = 60`), `21` (not prime, `sum = 30 + 21 = 51`).
- Poll 21 (`sum = 51`):
  - From 21: `22` (not prime, `sum = 51 + 22 = 73`), `31` (prime -> blocked), `11` (prime -> blocked).
- Poll 22 (`sum = 73`):
  - From 22: decrease first digit to 1 -> `12` (not prime, cost `73 + 12 = 85`).
- Eventually, `12` is polled from `pq` with `sum = 85`.
- Target `m = 12` reached. Return `85`.

---

## Complexity Analysis

- **Time Complexity:** `O(V * D * log V)` — The number of vertices `V` is at most `10^4 = 10000`. Each vertex has at most `2 * D` neighbors where `D <= 4` is the number of digits. Dijkstra's algorithm processes each edge with priority queue operations in `O(E log V)` time.
- **Space Complexity:** `O(V)` — Sieve array, distance table `minSumArr`, and PriorityQueue each require at most 10,000 entries.

---

## Available Solutions

Only verified solution files present in this folder are listed below:

| Language | Solution File |
| :--- | :--- |
| **Java** | [3377digit-operations-to-make-two-integers-equal.java](./3377digit-operations-to-make-two-integers-equal.java) |

---

## Key Learnings

- Shortest path problems where edge weights depend on the identity of the next visited vertex are standard instances of Dijkstra's algorithm.
- Pruning forbidden states (such as primes or numbers with leading zeros) during neighbor generation keeps graph exploration efficient.
