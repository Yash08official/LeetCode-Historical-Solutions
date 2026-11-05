---
comments: true
difficulty: Medium
tags:
  - String
  - Stack
  - Bracket Sequences
---

# 856. Score of Parentheses

**[View Problem on LeetCode](https://leetcode.com/problems/score-of-parentheses/)**

| Attribute | Details |
| :--- | :--- |
| **Problem ID** | `0856` (`856`) |
| **Difficulty** | Medium |
| **Topics / Tags** | `String`, `Stack`, `Bracket Sequences` |
| **Solution Language** | Java |

---

## Problem Description

Given a balanced parentheses string `s` consisting solely of `'('` and `')'`, compute and return its **score** according to these recursive rules:

- `"()"` has score `1`.
- Concatenation `AB` has score `A + B`, where `A` and `B` are balanced parentheses strings.
- Nesting `(A)` has score `2 * A`, where `A` is a non-empty balanced parentheses string.

---

## Examples

### Example 1

```text
Input: s = "()"
Output: 1
```

### Example 2

```text
Input: s = "(())"
Output: 2
```

### Example 3

```text
Input: s = "()()"
Output: 2
```

---

## Constraints

- `2 <= s.length <= 50`

- `s` consists of only `'('` and `')'`.

- `s` is a balanced parentheses string.

---

## Problem Understanding

- Every `'('` opens a new nesting level whose interior score starts at `0`.
- When the matching `')'` arrives, if the accumulated interior score `inner` is still `0`, the pair was an atomic `"()"` worth `1`; if `inner > 0`, the pair wraps a non-empty expression `A` and is worth `2 * inner`.
- Both cases unify into a single formula: `Math.max(2 * inner, 1)`, which is then added into the enclosing level's running total!

---

## Approach

### Brute Force Approach

A recursive divide-and-conquer parser that repeatedly scans `s[l .. r]` to find where prefix balance hits `0` (splitting `AB` vs stripping outer `(A)`) takes `O(n^2)` time on deeply nested strings like `"((((...))))"`.

### Optimized Approach

Maintain a `Stack<Integer>` storing the running score at each active nesting depth (initialized with `0` for the outermost level); push `0` on `'('`, and on `')'` pop `inner`, compute `score = Math.max(2 * inner, 1)`, and add `score` onto the new top frame.

### Step-by-Step Thinking Process

1. Push an initial `0` onto `stack` to represent the top-level score accumulator.
2. Scan `s` character by character: whenever `ch == '('`, push `0` onto `stack` to start accumulating the interior score of this new parenthesized group.
3. Whenever `ch == ')'`, pop `inner` (the completed interior score), evaluate this group's value as `score = Math.max(2 * inner, 1)`, pop `outer` (the enclosing level's running sum), and push `outer + score`.
4. After processing all characters of the balanced string, return `stack.pop()` as the total score.

### Algorithm / Intuition

In `scoreOfParentheses(String s)`:
- Seeding `stack.push(0)` before the loop eliminates empty-stack edge cases when closing top-level groups like `"()()"`.
- `Math.max(2 * inner, 1)` handles both base and inductive cases seamlessly: when `inner == 0`, `2 * 0 = 0 < 1` gives `1`; when `inner >= 1` (since all scores are positive integers), `2 * inner >= 2 > 1` gives `2 * inner`.
- Popping `outer` and pushing `outer + score` implements the `AB -> A + B` concatenation rule at every nesting depth.

---

## Dry Run

Trace on **Example 1** (`s = "()"`) and **Example 2** (`s = "(())"`):

**Example 1 (`s = "()"`):**
1. Init: `stack = [0]`.
2. `ch = '('`: `stack.push(0)` -> `stack = [0, 0]`.
3. `ch = ')'`: `inner = 0`, `score = Math.max(0, 1) = 1`, `outer = 0`, `stack.push(0 + 1)` -> `stack = [1]`.
4. Return `stack.pop()` -> `1`.

**Example 2 (`s = "(())"`):**
1. Init: `stack = [0]`.
2. `'('` -> `[0, 0]`; `'('` -> `[0, 0, 0]`.
3. First `')'`: `inner = 0`, `score = 1`, `outer = 0` -> `[0, 1]`.
4. Second `')'`: `inner = 1`, `score = Math.max(2, 1) = 2`, `outer = 0` -> `[2]`.
5. Return `stack.pop()` -> `2`.

---

## Complexity Analysis

- **Time Complexity:** `O(n)` — Iterates once over the `n` characters of `s` with `O(1)` stack operations per character.
- **Space Complexity:** `O(n)` — `stack` stores at most `n / 2 + 1` integers (plus `s.toCharArray()` of size `n`).

---

## Available Solutions

Only verified solution files present in this folder are listed below:

| Language | Solution File |
| :--- | :--- |
| **Java** | [856score-of-parentheses.java](./856score-of-parentheses.java) |

---

## Key Learnings

- Pushing a base accumulator `0` onto a stack is a clean pattern for evaluating nested hierarchical expressions without recursion.
- `Math.max(2 * inner, 1)` unifies empty-pair base cases (`"()" -> 1`) and nested doubling (`"(A)" -> 2 * A`).
- As a space-saving bonus, counting only leaf `"()"` cores weighted by `1 << depth` can also solve this in `O(1)` space.
