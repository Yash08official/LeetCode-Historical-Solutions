---
comments: true
difficulty: Hard
tags:
  - String
  - Dynamic Programming
  - Stack
  - Bracket Sequences
---

# 32. Longest Valid Parentheses

**[View Problem on LeetCode](https://leetcode.com/problems/longest-valid-parentheses/)**

| Attribute | Details |
| :--- | :--- |
| **Problem ID** | `0032` (`32`) |
| **Difficulty** | Hard |
| **Topics / Tags** | `String`, `Dynamic Programming`, `Stack`, `Bracket Sequences` |
| **Solution Language** | Java |

---

## Problem Description

Given a string `s` consisting solely of `'('` and `')'` characters, find and return the length of the longest contiguous **substring** that forms a valid (properly matched and nested) parentheses sequence.

---

## Examples

### Example 1

```text
Input: s = "(()"
Output: 2
Explanation: The longest valid parentheses substring is "()".
```

### Example 2

```text
Input: s = ")()())"
Output: 4
Explanation: The longest valid parentheses substring is "()()".
```

### Example 3

```text
Input: s = ""
Output: 0
```

---

## Constraints

- `0 <= s.length <= 3 * 10^4`

- `s[i]` is `'('`, or `')'`.

---

## Problem Understanding

- **Substring vs. subsequence:** The valid parentheses must be contiguous in `s`. For example, in `"()(()"`, the longest valid substring has length `2`, not `4`.
- **Boundary anchors:** An unmatched `')'` can never be part of any valid substring—it acts as a hard wall separating potential valid substrings before and after it. Similarly, an unclosed `'('` splits valid segments until a matching `')'` arrives.

---

## Approach

### Brute Force Approach

Checking every even-length substring `s[i .. j]` for validity with a counter takes `O(n)` per substring across `O(n^2)` substrings (`O(n^3)` total), or `O(n^2)` if validating incrementally from each start index `i`—too slow for `s.length <= 3 * 10^4`.

### Optimized Approach

The implemented Java solution uses an **index-tracking `Stack<Integer>` initialized with sentinel `-1`**. For each index `i`, `'('` pushes `i` onto `stack`, while `')'` pops the top index: if `stack` becomes empty, `i` is pushed as the new unmatched right-paren base boundary; otherwise, `i - stack.peek()` gives the exact length of the longest valid substring ending at `i`.

### Step-by-Step Thinking Process

1. Create `Stack<Integer> stack = new Stack<>()` and push `-1` before scanning `s`. The bottom of the stack always holds the index immediately preceding the start of the current valid region.
2. Loop `i` from `0` to `s.length() - 1` inspecting `ch = s.charAt(i)`.
3. If `ch == '('`, push `i` onto `stack` as a candidate opening index waiting to be matched.
4. If `ch == ')'`, call `stack.pop()` to match the most recent `'('` (or pop the old unmatched boundary if no `'('` was open).
5. If `stack.isEmpty()` after popping, this `')'` had no matching `'('`—push `i` onto `stack` as the new boundary wall. Otherwise, update `maxLen = Math.max(maxLen, i - stack.peek())`.

### Algorithm / Intuition

Maintain this stack invariant: the bottom element of `stack` is the index of the **last unmatched `')'`** (initially `-1` before index `0`), and every element above it is the index of an **currently unmatched `'('`**. When a `')'` at index `i` pops a matching `'('`, `stack` is non-empty, and `stack.peek()` is the nearest unmatched character (`'('` or boundary `')'`) to the left of `i`. Everything strictly between `stack.peek()` and `i` has been completely matched, so the longest valid substring ending at `i` has length `i - stack.peek()`!

---

## Dry Run

Tracing Example 1 (`s = "(()"`) and Example 2 (`s = ")()())"`):

**Example 1: `s = "(()"`** (initial `stack = [-1]`, `maxLen = 0`)
- `i = 0` (`'('`): `stack.push(0)` -> `stack = [-1, 0]`.
- `i = 1` (`'('`): `stack.push(1)` -> `stack = [-1, 0, 1]`.
- `i = 2` (`')'`): `stack.pop()` removes `1` -> `stack = [-1, 0]` (not empty) -> `maxLen = max(0, 2 - 0) = 2`.
- Returns `2`.

**Example 2: `s = ")()())"`** (initial `stack = [-1]`, `maxLen = 0`)
- `i = 0` (`')'`): `pop()` removes `-1` -> empty -> `push(0)` -> `stack = [0]`.
- `i = 1` (`'('`): `push(1)` -> `stack = [0, 1]`.
- `i = 2` (`')'`): `pop()` removes `1` -> `stack = [0]` -> `maxLen = max(0, 2 - 0) = 2`.
- `i = 3` (`'('`): `push(3)` -> `stack = [0, 3]`.
- `i = 4` (`')'`): `pop()` removes `3` -> `stack = [0]` -> `maxLen = max(2, 4 - 0) = 4`.
- `i = 5` (`')'`): `pop()` removes `0` -> empty -> `push(5)` -> `stack = [5]`.
- Returns `4`.

---

## Complexity Analysis

- **Time Complexity:** `O(n)` — Single pass over `s` of length `n`, where each index is pushed and popped at most once.
- **Space Complexity:** `O(n)` — In the worst case (a string of all `'('` characters), `stack` stores `n + 1` integers.

---

## Available Solutions

Only verified solution files present in this folder are listed below:

| Language | Solution File |
| :--- | :--- |
| **Java** | [32longest-valid-parentheses.java](./32longest-valid-parentheses.java) |

---

## Key Learnings

- Pushing `-1` onto an index stack is a classic sentinel trick that lets `i - stack.peek()` compute prefix lengths starting at index `0` without special cases.
- Replacing a popped empty stack with the current unmatched `')'` index resets the left boundary cleanly in `O(1)`.
- An alternative two-pass (`left->right` and `right->left`) `open`/`close` counter scan can solve this in `O(1)` space, while the stack approach computes valid lengths in a single left-to-right pass.
