---
comments: true
difficulty: Hard
tags:
  - Array
  - Hash Table
  - String
  - Dynamic Programming
  - Backtracking
  - Bit Manipulation
  - Memoization
  - Bitmask
---

# 691. Stickers to Spell Word

**[View Problem on LeetCode](https://leetcode.com/problems/stickers-to-spell-word/)**

| Attribute | Details |
| :--- | :--- |
| **Problem ID** | `0691` (`691`) |
| **Difficulty** | Hard |
| **Topics / Tags** | `Array`, `Hash Table`, `String`, `Dynamic Programming`, `Backtracking`, `Bit Manipulation`, `Memoization`, `Bitmask` |
| **Solution Language** | Java |

---

## Problem Description

We are given `n` different types of stickers. Each sticker has a lowercase English word on it.

You would like to spell out the given string `target` by cutting individual letters from your collection of stickers and rearranging them. You can use each sticker more than once if you want, and you have infinite quantities of each sticker.

Return the minimum number of stickers that you need to spell out `target`. If the task is impossible, return `-1`.

---

## Examples

### Example 1

```text
Input: stickers = ["with","example","science"], target = "thehat"
Output: 3
Explanation:
We can use 2 "with" stickers, and 1 "example" sticker.
After cutting letters we have 4 't's, 1 'e', 2 'h's, 2 'i's, 2 'w's, 1 'a', 1 'm', 1 'p', 1 'l', and 1 'x'.
We can form the target "thehat" from these letters.
```

### Example 2

```text
Input: stickers = ["notice","possible"], target = "basicbasic"
Output: -1
Explanation:
We cannot form target "basicbasic" from given letters.
```

---

## Constraints

- `n == stickers.length`
- `1 <= n <= 50`
- `1 <= stickers[i].length <= 10`
- `1 <= target.length <= 15`
- `stickers[i]` and `target` consist of lowercase English letters.

---

## Problem Understanding

- Length of `target` is small ($m \le 15$), suggesting a **Bitmask State Representation**.
- Bit $i$ of state is $1$ if `target[i]` has been covered, and $0$ otherwise.
- Total states: $2^{15} = 32768$.
- Finding the minimum stickers corresponds to finding the shortest path from state $0$ to state $(1 \ll m) - 1$ in an unweighted state transition graph, solvable via **BFS**.

---

## Approach

### Optimized Approach (BFS over Bitmask State Space)

1. Let $m = 	ext{target.length()}$.
2. Initialize distance array `f` of size $2^m$ filled with `-1`, with `f[0] = 0`.
3. Use a queue `q` initialized with state `0`.
4. While `q` is not empty:
   - Dequeue state `state`.
   - If `state == (1 << m) - 1`, return `f[state]`.
   - For each sticker in `stickers`:
     - Count character frequencies of the sticker.
     - Form next state `nxt = state`: for each unset bit $i$ in `state`, if the sticker has `target[i]`, consume it and set bit $i$ in `nxt`.
     - If `f[nxt] == -1`, set `f[nxt] = f[state] + 1` and push `nxt` to queue.
5. If target state is unreachable, return `-1`.

---

## Complexity Analysis

- **Time Complexity:** $O(2^m \cdot S \cdot m)$ — At most $2^m$ states visited, each testing $S$ stickers with $m$ character checks. With $m \le 15$, $2^{15} pprox 3.2 	imes 10^4$.
- **Space Complexity:** $O(2^m)$ — Array `f` and BFS queue of size up to $2^m$.

---

## Available Solutions

Only verified solution files present in this folder are listed below:

| Language | Solution File |
| :--- | :--- |
| **Java** | [691stickers-to-spell-word.java](./691stickers-to-spell-word.java) |

---

## Key Learnings

- Small target lengths ($N \le 15$) strongly indicate bitmask representation.
- BFS naturally discovers the shortest sequence of sticker applications without redundant re-computations.
