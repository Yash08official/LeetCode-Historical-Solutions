---
comments: true
difficulty: Easy
tags:
  - String
  - Stack
  - Bracket Sequences
---

# 20. Valid Parentheses

**[View Problem on LeetCode](https://leetcode.com/problems/valid-parentheses/)**

| Attribute | Details |
| :--- | :--- |
| **Problem ID** | `0020` (`20`) |
| **Difficulty** | Easy |
| **Topics / Tags** | `String`, `Stack`, `Bracket Sequences` |
| **Solution Language** | Java |

---

## Problem Description

Given a string `s` consisting solely of the six bracket characters `'('`, `')'`, `'{'`, `'}'`, `'['`, and `']'`, determine whether `s` is a valid, properly nested bracket sequence.

A string is valid if every opening bracket is closed by a bracket of the exact same type, brackets close in Last-In-First-Out (LIFO) nesting order, and no closing bracket appears without a matching unclosed opening bracket.

---

## Examples

### Example 1

**Input:** `s = "()"`

**Output:** `true`

### Example 2

**Input:** `s = "()[]{}"`

**Output:** `true`

### Example 3

**Input:** `s = "(]"`

**Output:** `false`

### Example 4

**Input:** `s = "([])"`

**Output:** `true`

### Example 5

**Input:** `s = "([)]"`

**Output:** `false`

---

## Constraints

- `1 <= s.length <= 10^4`

- `s` consists of parentheses only `'()[]{}'`.

---

## Problem Understanding

- **LIFO nesting property:** The most recently opened unclosed bracket **must** be the very first one closed next (e.g., `"([)]"` is invalid even though counts match).
- **Three failure modes:**
  1. A closing bracket arrives when no open brackets are waiting (`stack.isEmpty()`, e.g., `")"`).
  2. A closing bracket doesn't match the most recent opening bracket (`top != expected`, e.g., `"(]"`).
  3. Unclosed opening brackets remain after reading the entire string (`!stack.isEmpty()`, e.g., `"(("`).

---

## Approach

### Brute Force Approach

Repeatedly search `s` for adjacent valid pairs `"()"`, `"[]"`, or `"{}"` and remove them (`s = s.replace("()", "")...`) until no replacements occur, then check if `s.isEmpty()`. Because each `.replace()` copies up to `O(n)` characters across `O(n)` passes (e.g., `"((...))"`), runtime degrades to `O(n^2)` time and `O(n)` string churn.

### Optimized Approach

Scan `s` left to right using a `Stack<Character>`: push every opening bracket onto the stack, and on every closing bracket pop the top of the stack to verify it is the matching opening counterpart, finally checking `stack.isEmpty()`.

### Step-by-Step Thinking Process

1. Instantiate `Stack<Character> stack = new Stack<>()`.
2. Iterate `i` from `0` to `s.length() - 1` and read `ch = s.charAt(i)`.
3. If `ch` is `'('`, `'{'`, or `'['`, push `ch` onto `stack`.
4. Otherwise (`ch` is a closing bracket), first guard `if (stack.isEmpty()) return false;`, then `char top = stack.pop()` and return `false` if `(ch == ')' && top != '(')`, `(ch == '}' && top != '{')`, or `(ch == ']' && top != '[')`.
5. After processing all characters, return `stack.isEmpty()` to ensure no unmatched opening brackets remain.

### Algorithm / Intuition

In `20valid-parentheses.java`, `stack` stores all currently open brackets in exact nesting order, with the innermost unclosed bracket sitting on top. Popping immediately on a closing bracket either cancels out a matched innermost pair (exposing the enclosing bracket underneath for future checks) or exposes an immediate mismatch. Returning `stack.isEmpty()` rather than `true` at the end catches inputs like `"("` or `"([]"`.

---

## Dry Run

**Example 1 Input:** `s = "()"`

| `i` | `ch` | Branch | Stack Before | Action | Stack After |
| :--- | :--- | :--- | :--- | :--- | :--- |
| `0` | `'('` | Opening | `[]` | `stack.push('(')` | `['(']` |
| `1` | `')'` | Closing | `['(']` | `top = stack.pop()` (`'('`), matches `')'` | `[]` |

End of loop: `stack.isEmpty()` is **`true`**.

*(Contrast with invalid nesting `s = "([)]"`: pushes `'('`, pushes `'['`, then at `ch = ')'` pops `top = '[' != '('` -> immediately returns **`false`**.)*

---

## Complexity Analysis

- **Time Complexity:** `O(n)` — Visits each of the `n` characters in `s` at most once, performing `O(1)` stack push/pop operations per character.
- **Space Complexity:** `O(n)` — In the worst case (all opening brackets, e.g., `"((((..."`), `stack` holds `n` characters.

---

## Available Solutions

Only verified solution files present in this folder are listed below:

| Language | Solution File |
| :--- | :--- |
| **Java** | [20valid-parentheses.java](./20valid-parentheses.java) |

---

## Key Learnings

- Whenever nested structures must close in reverse order of opening, a LIFO stack is the canonical `O(n)` data structure.
- Always check both underflow (`stack.isEmpty()` before `pop()`) and leftover elements (`stack.isEmpty()` at return).
- In modern Java, `Deque<Character> stack = new ArrayDeque<>()` is often preferred over legacy `java.util.Stack` because `ArrayDeque` avoids synchronized `Vector` lock overhead.
