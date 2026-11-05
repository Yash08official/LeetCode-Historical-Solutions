---
comments: true
difficulty: Hard
tags:
  - Trie
---

# 440. K-th Smallest in Lexicographical Order

**[View Problem on LeetCode](https://leetcode.com/problems/k-th-smallest-in-lexicographical-order/)**

| Attribute | Details |
| :--- | :--- |
| **Problem ID** | `0440` (`440`) |
| **Difficulty** | Hard |
| **Topics / Tags** | `Trie` |
| **Solution Language** | Java |

---

## Problem Description

Given two integers `n` and `k` (`1 <= k <= n <= 10^9`), return the `k`-th smallest integer in `[1, n]` when sorted in **lexicographical (dictionary) order**.

---

## Examples

### Example 1

```text
Input: n = 13, k = 2
Output: 10
Explanation: The lexicographical order is [1, 10, 11, 12, 13, 2, 3, 4, 5, 6, 7, 8, 9], so the second smallest number is 10.
```

### Example 2

```text
Input: n = 1, k = 1
Output: 1
```

---

## Constraints

- `1 <= k <= n <= 10^9`

---

## Problem Understanding

Unlike Problem 386 (`n <= 5 * 10^4`), here `n` and `k` can be up to **`10^9`**! Even an `O(n)` traversal will Time Limit Exceed (`10^9` steps).

Instead of walking node-by-node through the implicit **10-ary prefix tree (Trie)**, we can **count the exact size of `curr`'s entire subtree** in `O(log_{10} n)` time:
- At root `curr` (say `1`), the intervals of descendants level-by-level are `[1, 2)`, `[10, 20)`, `[100, 200)`, `[1000, 2000)`, ... clipped at `n`!
- If `k` is at least that subtree size `cnt`, we skip the entire subtree in one `O(1)` step (`k -= cnt; ++curr`); otherwise, we step inside the subtree to its first child (`--k; curr *= 10`).

---

## Approach

### Brute Force Approach

Generating all integers `1..n` and sorting them as strings takes `O(n log n)` time and `O(n)` memory; even Problem 386's `O(1)`-space iterative traversal takes `O(k)` time, which hits up to `10^9` iterations when `k = 10^9`.

### Optimized Approach

Navigate the implicit 10-ary Trie starting at `curr = 1` with `--k` remaining steps. At each node, call `count(curr)` to sum the number of integers `<= n` having prefix `curr` across all decimal depths; if `k >= cnt`, skip to sibling `++curr` (`k -= cnt`), else consume `curr` (`--k`) and descend to child `curr *= 10`.

### Step-by-Step Thinking Process

1. Store `this.n = n`, start at the 1st lexicographical number `long curr = 1`, and decrement `--k` (`k` is now the number of forward lexicographical steps still needed).
2. Write `count(long curr)` using `long next = curr + 1`: while `curr <= n`, add `Math.min(n - curr + 1, next - curr)` to `cnt`, then expand both bounds to the next decimal level via `curr *= 10` and `next *= 10`.
3. Loop `while (k > 0)`: compute `int cnt = count(curr)`.
4. If `k >= cnt`, the target lies after `curr`'s entire prefix subtree, so subtract `k -= cnt` and advance to next sibling `++curr`.
5. Otherwise (`k < cnt`), the target is strictly inside `curr`'s subtree: spend `1` step to pass `curr` itself (`--k`) and descend to `curr`'s smallest child (`curr *= 10`).
6. Once `k == 0`, return `(int) curr`.

### Algorithm / Intuition

Look at `count(curr)` for `curr = 1, next = 2` when `n = 13`:
- Depth 0: `[1, 2)` clipped to `13` -> `min(13 - 1 + 1, 2 - 1) = min(13, 1) = 1` (`{1}`)
- Depth 1: `[10, 20)` clipped to `13` -> `min(13 - 10 + 1, 20 - 10) = min(4, 10) = 4` (`{10, 11, 12, 13}`)
- Depth 2: `curr = 100 > 13` -> stops! Total `cnt = 5` (`{1, 10, 11, 12, 13}`).

Notice why `curr` and `next` **must** be `long`: when `n = 10^9` and `curr` reaches `10^8..9*10^8`, multiplying `curr *= 10` reaches up to `9 * 10^9`, which would overflow a 32-bit `int` (`max ~2.14 * 10^9`) and cause an infinite loop!

---

## Dry Run

Tracing `findKthNumber(13, 2)` (**Example 1**, `n = 13, k = 2`) and `(13, 6)`:

1. **Example 1 (`n = 13, k = 2`):**
   - Init: `curr = 1`, `--k` -> `k = 1`.
   - Iteration 1 (`k = 1 > 0`): `count(1)` = `1` (`[1,2)`) + `4` (`[10..13]`) = `5`.
   - Since `k < cnt` (`1 < 5`), target is inside `1`'s subtree -> `--k` (`k = 0`), `curr *= 10` (`curr = 10`).
   - Loop ends (`k == 0`), returns `10`.
2. **Bonus check (`n = 13, k = 6`, expecting `2`):**
   - Init: `curr = 1`, `k = 5`.
   - `count(1) = 5`: `k >= cnt` (`5 >= 5`) -> skip `1`'s subtree! `k -= 5` (`k = 0`), `++curr` (`curr = 2`). Returns `2`!

---

## Complexity Analysis

- **Time Complexity:** `O((log_{10} n)^2)` — At each decimal level we move right across at most `9` siblings before descending one of at most `log_{10} n` levels (`<= 90` outer iterations for `n <= 10^9`), and each `count(curr)` call takes `O(log_{10} n)` steps.
- **Space Complexity:** `O(1)` — Only primitive scalar variables (`curr`, `next`, `cnt`) are used.

---

## Available Solutions

Only verified solution files present in this folder are listed below:

| Language | Solution File |
| :--- | :--- |
| **Java** | [440k-th-smallest-in-lexicographical-order.java](./440k-th-smallest-in-lexicographical-order.java) |

---

## Key Learnings

- When `n` reaches `10^9`, replace step-by-step Trie traversal (`O(n)`) with level-interval subtree counting (`O((log n)^2)`) to skip entire prefix subtrees at once.
- Converting 1-indexed rank `k` to 0-indexed remaining steps (`--k` while starting at `curr = 1`) makes `k == 0` a clean, uniform termination condition.
- Always use 64-bit `long` for `curr` and `next` inside `count` because `curr * 10` can reach `9 * 10^9 > Integer.MAX_VALUE` when `n <= 10^9`.
