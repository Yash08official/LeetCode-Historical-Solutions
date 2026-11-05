---
comments: true
difficulty: Medium
tags:
  - Dynamic Programming
---

# 2466. Count Ways To Build Good Strings

**[View Problem on LeetCode](https://leetcode.com/problems/count-ways-to-build-good-strings/)**

| Attribute | Details |
| :--- | :--- |
| **Problem ID** | `2466` (`2466`) |
| **Difficulty** | Medium |
| **Topics / Tags** | `Dynamic Programming` |
| **Solution Language** | Java |

---

## Problem Description

Given four integers `low`, `high`, `zero`, and `one`, you construct strings starting with an empty string `""` and performing any number of operations:
- Append the character `'0'` `zero` times.
- Append the character `'1'` `one` times.

A string is called **good** if its total length is between `low` and `high` (inclusive).

Return the number of different good strings that can be constructed. Since the answer can be large, return it modulo $10^9 + 7$.

---

## Examples

### Example 1

```text
Input: low = 3, high = 3, zero = 1, one = 1
Output: 8
Explanation:
One possible valid good string is "011".
It can be constructed as follows: "" -> "0" -> "01" -> "011".
All binary strings from "000" to "111" are good strings in this example.
```

### Example 2

```text
Input: low = 2, high = 3, zero = 1, one = 2
Output: 5
Explanation: The good strings are "00", "11", "000", "110", and "011".
```

---

## Constraints

- `1 <= low <= high <= 10^5`

- `1 <= zero, one <= low`

---

## Problem Understanding

Notice that the exact characters `'0'` and `'1'` are irrelevant except to differentiate between the two choices: every step either increases the string's length by `zero` or by `one`. Because appending `zero` 0s vs `one` 1s produces distinguishable sequences at each step, two constructions yield the same string if and only if they make the identical sequence of append choices.

Hence, the problem is equivalent to counting the number of distinct choice paths that result in a total length $L$ such that $\text{low} \le L \le \text{high}$. This is an unconstrained knapsack / coin-change style dynamic programming problem with step sizes `zero` and `one`.

---

## Approach

### Brute Force Approach

A recursive branch without memoization forks into 2 choices at every step, creating a binary recursion tree of depth up to $\text{high} / \min(\text{zero}, \text{one}) \le 10^5$. The number of leaves would be $O(2^{\text{high}})$, which causes an immediate Time Limit Exceeded.

### Optimized Approach

Use memoized depth-first search (or bottom-up DP) on the current length $i$. Let `dfs(i)` be the number of good strings that can be formed starting from current length $i$. If $\text{low} \le i \le \text{high}$, the current string is itself good, contributing 1. Then recurse on `dfs(i + zero)` and `dfs(i + one)`. Store results in an array `f` of size $\text{high} + 1$, taking results modulo $10^9 + 7$.

### Step-by-Step Thinking Process

1. Abstract the string construction to tracking only the string's length $i$.
2. Define state `dfs(i)`: total good strings constructible starting from length $i$.
3. Base case: if $i > \text{high}$, no valid string can be formed from this branch, return 0.
4. Check memo: if `f[i] != -1`, return cached value `f[i]`.
5. Count: if $\text{low} \le i \le \text{high}$, the current length $i$ is valid, so initialize `ans = 1`; otherwise `ans = 0`.
6. Transition: add `dfs(i + zero)` and `dfs(i + one)` to `ans`, modulo $10^9 + 7$.
7. Cache in `f[i]` and return.

### Algorithm / Intuition

In the provided Java solution:

1. `f` is an integer array of size `high + 1`, initialized to `-1` with `Arrays.fill(f, -1)` to mark unvisited states.
2. The helper method `dfs(int i)` computes the total good strings reachable from length `i`:
   - If `i > hi`, the string exceeds maximum allowed length, returning 0.
   - If `f[i] != -1`, the previously computed count is returned immediately.
   - `long ans = 0` is incremented by 1 if `i >= lo && i <= hi`.
   - The two branching options `dfs(i + zero)` and `dfs(i + one)` are added to `ans`.
   - `ans %= MOD` ensures values stay within bounds of $10^9 + 7$.
   - `f[i] = (int) ans` stores the state.
3. The search starts from the empty string via `return dfs(0)`.

---

## Dry Run

Consider Example 1: `low = 3, high = 3, zero = 1, one = 1`

1. Every operation adds length 1. Valid good strings must have length exactly 3.
2. From length 0, we need exactly 3 steps. Each step has 2 independent choices (append '0' or append '1').
3. Total sequences of choices: $2^3 = 8$ distinct binary strings of length 3: `000`, `001`, `010`, `011`, `100`, `101`, `110`, `111`.
4. In the code:
   - `dfs(3)`: $3 \in [3, 3]$ -> `ans = 1`, children `dfs(4)` return 0 -> returns `1`.
   - `dfs(2)`: not in range -> `ans = dfs(3) + dfs(3) = 1 + 1 = 2`.
   - `dfs(1)`: not in range -> `ans = dfs(2) + dfs(2) = 2 + 2 = 4`.
   - `dfs(0)`: not in range -> `ans = dfs(1) + dfs(1) = 4 + 4 = 8`.

Final Return: `8`.

---

## Complexity Analysis

- **Time Complexity:** `O(high)` — There are $\text{high} + 1$ unique states (lengths from $0$ to $\text{high}$). Each state is visited and computed exactly once with $O(1)$ arithmetic operations.
- **Space Complexity:** `O(high)` — The memoization array `f` takes $O(\text{high})$ space, and the call stack can reach a recursion depth of up to $O(\text{high})$.

---

## Available Solutions

Only verified solution files present in this folder are listed below:

| Language | Solution File |
| :--- | :--- |
| **Java** | [2466count-ways-to-build-good-strings.java](./2466count-ways-to-build-good-strings.java) |

---

## Key Learnings

- When string contents are determined entirely by the branch choice at each step, track the length rather than the string itself.
- Memoization transforms exponential-time combinatorial branching into linear-time state evaluation.
- Always apply the modulo operation at each addition step when counts can grow exponentially.
