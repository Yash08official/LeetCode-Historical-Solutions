---
comments: true
difficulty: Medium
tags:
  - String
  - Stack
  - Greedy
  - Bracket Sequences
---

# 921. Minimum Add to Make Parentheses Valid

**[View Problem on LeetCode](https://leetcode.com/problems/minimum-add-to-make-parentheses-valid/)**

| Attribute | Details |
| :--- | :--- |
| **Problem ID** | `0921` (`921`) |
| **Difficulty** | Medium |
| **Topics / Tags** | `String`, `Stack`, `Greedy`, `Bracket Sequences` |
| **Solution Language** | Java |

---

## Problem Description

You are given a string `s` consisting only of `'('` and `')'` characters. A parentheses string is **valid** if every opening parenthesis `'('` is properly matched with a corresponding closing parenthesis `')'` in balanced order.

In a single move, you may insert either `'('` or `')'` at any position in `s`. Return the **minimum number of insertions** required to make `s` valid.

---

## Examples

### Example 1

```text
Input: s = "())"
Output: 1
```

### Example 2

```text
Input: s = "((("
Output: 3
```

---

## Constraints

- `1 <= s.length <= 1000`

- `s[i]` is either `'('` or `')'`.

---

## Problem Understanding

- **Greedy Matching Cancellation:** Any existing valid pair `'(' ... ')'` in `s` should always be matched with each other rather than inserting extra characters—matching two existing characters saves `2` insertions.
- **Two Types of Imbalance:**
  1. A closing `')'` appears when there is no unmatched `'('` before it (`open == 0`): we **must** insert one `'('` before it.
  2. After scanning the entire string, `open` unmatched `'('` characters remain: we **must** insert `open` closing `')'` characters after them.

---

## Approach

### Brute Force Approach

Repeatedly searching for the substring `"()"` and deleting it (`while (s.contains("()")) s = s.replace("()", "")`) until only unmatched characters remain takes `O(n^2)` time and `O(n)` space due to creating up to `n / 2` intermediate strings.

### Optimized Approach

Use a **Greedy Counter** approach in a single pass with two integer counters: `open` for currently unmatched `'('` brackets and `add` for `'('` insertions forced by unmatched `')'` brackets, returning `add + open`.

### Step-by-Step Thinking Process

1. A stack-based validator pushes `'('` and pops on `')'` when the stack is non-empty; since only one bracket type `'('` ever sits on the stack, we only need its size `open`!
2. Traverse `s` from left to right: whenever `ch == '('`, increment `open`.
3. Whenever `ch == ')'`: if `open > 0`, greedily pair it with a pending `'('` (`open--`); otherwise (`open == 0`), no prior `'('` can ever match it, so increment `add++` (conceptually inserting `'('` right before it).
4. At the end of `s`, any leftover `open > 0` brackets each require one `')'` insertion, giving total minimum moves `add + open`.

### Algorithm / Intuition

In `minAddToMakeValid`, `open` tracks the current surplus of `'('` waiting for a future `')'`, and `add` counts immediate deficits where a `')'` arrived while `open == 0`.

Notice why `open` never goes negative: whenever `')'` arrives at `open == 0`, incrementing `add` acts as inserting a `'('` that immediately cancels with that `')'`, keeping the running balance at `0`. Once the loop finishes, `add` accounts for all missing `'('` brackets and `open` accounts for all missing `')'` brackets, so `add + open` is the exact minimum number of insertions.

---

## Dry Run

Trace on **Example 1**: `s = "())"`

| Step | `ch` | Condition / Action | `open` | `add` |
| :--- | :--- | :--- | :--- | :--- |
| Init | — | Initial counters | `0` | `0` |
| 0 | `'('` | `ch == '('` -> `open++` | `1` | `0` |
| 1 | `')'` | `open > 0` -> match pair (`open--`) | `0` | `0` |
| 2 | `')'` | `open == 0` -> unmatched `')'` (`add++`) | `0` | `1` |

- **End of loop:** Returns `add + open = 1 + 0 = 1`.

---

## Complexity Analysis

- **Time Complexity:** `O(n)` — Converts `s` of length `n` to a character array and iterates through it once.
- **Space Complexity:** `O(n)` — `s.toCharArray()` allocates a `char[]` copy of length `n` in Java (the counter state itself uses `O(1)` variables, and using `s.charAt(i)` would make total space `O(1)`).

---

## Available Solutions

Only verified solution files present in this folder are listed below:

| Language | Solution File |
| :--- | :--- |
| **Java** | [921minimum-add-to-make-parentheses-valid.java](./921minimum-add-to-make-parentheses-valid.java) |

---

## Key Learnings

- For single-type parentheses (`'('` and `')'`), an explicit stack can always be replaced by an integer counter tracking stack depth.
- Resetting negative balance via a separate `add` counter avoids the mistake of letting a later `'('` cancel an earlier `')'` (since `')('` needs `2` insertions, not `0`).
- In Java, `for (char ch : s.toCharArray())` is clean and fast, but keep in mind it allocates an `O(n)` backing array unlike indexed `s.charAt(i)`.
