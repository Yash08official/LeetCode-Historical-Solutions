---
comments: true
difficulty: Easy
tags:
  - Two Pointers
  - String
---

# 925. Long Pressed Name

**[View Problem on LeetCode](https://leetcode.com/problems/long-pressed-name/)**

| Attribute | Details |
| :--- | :--- |
| **Problem ID** | `0925` (`925`) |
| **Difficulty** | Easy |
| **Topics / Tags** | `Two Pointers`, `String` |
| **Solution Language** | JavaScript |

---

## Problem Description

Your friend meant to type their `name` on a keyboard, where holding down a key too long can cause a character to repeat `1` or more times in the resulting `typed` string.

Given `name` and `typed` (both lowercase English letters), return `true` if `typed` could have been produced from `name` by long-pressing zero or more characters, or `false` otherwise.

---

## Examples

### Example 1

```text
Input: name = "alex", typed = "aaleex"
Output: true
Explanation: 'a' and 'e' in 'alex' were long pressed.
```

### Example 2

```text
Input: name = "saeed", typed = "ssaaedd"
Output: false
Explanation: 'e' must have been pressed twice, but it was not in the typed output.
```

---

## Constraints

- `1 <= name.length, typed.length <= 1000`

- `name` and `typed` consist of only lowercase English letters.

---

## Problem Understanding

- **Run-Length Grouping:** Every string can be viewed as a sequence of maximal contiguous groups of identical characters—for instance, `"saeed"` has groups `[('s', 1), ('a', 1), ('e', 2), ('d', 1)]`.
- **Necessary and Sufficient Conditions:** `typed` is a valid long-pressed version of `name` if and only if:
  1. Both strings decompose into the **exact same number** of character groups with matching characters in order.
  2. For every group, its consecutive count in `typed` is **greater than or equal to** its consecutive count in `name` (`count_typed >= count_name`).
- **Leftover Tail Trap:** If one string finishes while the other still has remaining groups (e.g., `name = "alex"`, `typed = "aaleexa"`), the result must be `false`.

---

## Approach

### Brute Force Approach

Explicitly building two arrays of `[char, count]` run-length objects for `name` and `typed` and then comparing the two arrays element-by-element works in `O(m + n)` time, but requires `O(m + n)` auxiliary memory to store all run-length objects.

### Optimized Approach

Use **Group-by-Group Two Pointers** (`i` on `name`, `j` on `typed`) to measure consecutive run lengths `[i, x)` and `[j, y)` on the fly in `O(1)` space, verifying character equality, `y - j >= x - i`, and full exhaustion of both strings.

### Step-by-Step Thinking Process

1. Maintain pointer `i` at the start of the current character group in `name` (`m = name.length`) and `j` at the start of the current group in `typed` (`n = typed.length`).
2. While `i < m && j < n`, first verify `name[i] === typed[j]`; if they differ, the groups are out of sync, so return `false`.
3. Advance `x` from `i` across all identical consecutive characters in `name` (group length `x - i`), and advance `y` from `j` across all identical consecutive characters in `typed` (group length `y - j`).
4. If `x - i > y - j`, `typed` has fewer copies of the character than `name` requires (as in Example 2's `'e'`), so return `false`.
5. Jump `i = x` and `j = y` to the next group, and after the loop verify `i === m && j === n` so neither string has leftover characters.

### Algorithm / Intuition

In `isLongPressedName`, instead of tricky single-character pointer updates that look back at `typed[j - 1]`, the outer `while` loop processes **one whole run** per iteration.

Pointers `x` and `y` scan to the first differing character in `name` and `typed` respectively. Thus `x - i` is the exact multiplicity of `name[i]` in the current run, and `y - j` is the multiplicity in `typed`. Checking `x - i > y - j` directly enforces the long-press rule (`y - j >= x - i`). Finally, `return i === m && j === n` ensures neither `name` has untyped characters left nor `typed` has spurious trailing characters.

---

## Dry Run

Trace on **Example 1**: `name = "alex"` (`m = 4`), `typed = "aaleex"` (`n = 6`)

| Group | Start `(i, j)` | `name[i]` vs `typed[j]` | End `(x, y)` | Lengths `(x - i)` vs `(y - j)` | Valid (`x - i <= y - j`)? |
| :--- | :--- | :--- | :--- | :--- | :--- |
| 1 | `(0, 0)` | `'a' === 'a'` | `(1, 2)` | `1` vs `2` | Yes -> `(i, j) = (1, 2)` |
| 2 | `(1, 2)` | `'l' === 'l'` | `(2, 3)` | `1` vs `1` | Yes -> `(i, j) = (2, 3)` |
| 3 | `(2, 3)` | `'e' === 'e'` | `(3, 5)` | `1` vs `2` | Yes -> `(i, j) = (3, 5)` |
| 4 | `(3, 5)` | `'x' === 'x'` | `(4, 6)` | `1` vs `1` | Yes -> `(i, j) = (4, 6)` |

- Loop exits with `i = 4 === m` and `j = 6 === n` -> returns `true`.

---

## Complexity Analysis

- **Time Complexity:** `O(m + n)` — Where `m = name.length` and `n = typed.length`. Although there are nested `while` loops, `x` (hence `i`) visits each index of `name` once and `y` (hence `j`) visits each index of `typed` once.
- **Space Complexity:** `O(1)` — Uses only six integer variables (`m`, `n`, `i`, `j`, `x`, `y`).

---

## Available Solutions

Only verified solution files present in this folder are listed below:

| Language | Solution File |
| :--- | :--- |
| **JavaScript** | [925long-pressed-name.js](./925long-pressed-name.js) |

---

## Key Learnings

- Run-length two-pointer traversal (`x` and `y` finding group boundaries) is much less error-prone than character-by-character backtracking when multiplicities matter.
- Always check `i === m && j === n` after a dual-string `while (i < m && j < n)` loop so trailing characters in either string are caught.
