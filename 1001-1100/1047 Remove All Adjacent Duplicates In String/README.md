---
comments: true
difficulty: Easy
tags:
  - String
  - Stack
---

# 1047. Remove All Adjacent Duplicates In String

**[View Problem on LeetCode](https://leetcode.com/problems/remove-all-adjacent-duplicates-in-string/)**

| Attribute | Details |
| :--- | :--- |
| **Problem ID** | `1047` (`1047`) |
| **Difficulty** | Easy |
| **Topics / Tags** | `String`, `Stack` |
| **Solution Language** | JavaScript |

---

## Problem Description

Given a string `s` of lowercase English letters, a **duplicate removal** deletes any two **adjacent** and **equal** characters from `s`. You repeatedly apply duplicate removals until no adjacent equal pair remains.

Return the final resulting string (which is guaranteed to be unique regardless of removal order).

---

## Examples

### Example 1

```text
Input: s = "abbaca"
Output: "ca"
Explanation:
For example, in "abbaca" we could remove "bb" since the letters are adjacent and equal, and this is the only possible move.  The result of this move is that the string is "aaca", of which only "aa" is possible, so the final string is "ca".
```

### Example 2

```text
Input: s = "azxxzy"
Output: "ay"
```

---

## Constraints

- `1 <= s.length <= 10^5`

- `s` consists of lowercase English letters.

---

## Problem Understanding

- **Cascading Collisions:** Deleting an adjacent pair in the middle of a string brings the character immediately to its left next to the character immediately to its right—for example, in `"abbaca"`, deleting `"bb"` makes the two `'a'`s adjacent (`"aaca"`), triggering another removal (`"ca"`).
- **LIFO Adjacency:** As we scan `s` from left to right, the character immediately to the left of the current character `c` (after all prior cancellations!) is always the **most recently surviving character**—the top of a stack.

---

## Approach

### Brute Force Approach

Scanning `s` to remove one adjacent duplicate pair (`s = s.slice(0, i) + s.slice(i + 2)`) and restarting from index `0` until a full pass finds no pair takes `O(n^2)` time—on `"aaaa...bbbb..."` of length `10^5`, `5 * 10^4` string copies take billions of operations.

### Optimized Approach

Simulate cancellations in a single pass using an explicit **Stack** (`const stk = []`): for each character `c` of `s`, pop `stk` if its top equals `c`, otherwise push `c`, and finally return `stk.join('')`.

### Step-by-Step Thinking Process

1. Initialize an empty array `stk = []` to hold surviving prefix characters in order.
2. Iterate over each character `c` of `s`.
3. Compare `c` against the top of the stack (`stk[stk.length - 1]` when `stk.length > 0`).
4. If they match, `c` and the top character form an adjacent duplicate pair—call `stk.pop()` and discard `c` (exposing the previous surviving character on top for the next iteration!).
5. Otherwise, push `c` onto `stk`, and once the loop ends, concatenate the stack into a string with `stk.join('')`.

### Algorithm / Intuition

In `removeDuplicates`, `stk` maintains the invariant that it contains **no adjacent duplicates** at any point, and equals the fully reduced prefix `s[0 .. idx]`.

When the next character `c` arrives:
- If `stk` is empty or `stk[stk.length - 1] != c`, appending `c` preserves the duplicate-free invariant.
- If `stk[stk.length - 1] == c`, popping removes the pair immediately, and because `stk` before the pop was already duplicate-free, no cascading chain of `>= 2` pops can occur in a single step—any secondary collision will happen naturally when a later matching character arrives!

---

## Dry Run

Trace on **Example 1**: `s = "abbaca"`

| Step | `c` | `stk` Top Before | Match? | Action | `stk` After |
| :--- | :--- | :--- | :--- | :--- | :--- |
| 0 | `'a'` | *(empty)* | No | `stk.push('a')` | `['a']` |
| 1 | `'b'` | `'a'` | No | `stk.push('b')` | `['a', 'b']` |
| 2 | `'b'` | `'b'` | Yes | `stk.pop()` | `['a']` |
| 3 | `'a'` | `'a'` | Yes | `stk.pop()` | `[]` |
| 4 | `'c'` | *(empty)* | No | `stk.push('c')` | `['c']` |
| 5 | `'a'` | `'c'` | No | `stk.push('a')` | `['c', 'a']` |

- `stk.join('')` -> returns `"ca"`.

---

## Complexity Analysis

- **Time Complexity:** `O(n)` — Each of the `n` characters in `s` is pushed at most once and popped at most once (`O(1)` per character), and `stk.join('')` takes `O(n)` time.
- **Space Complexity:** `O(n)` — In the worst case (no adjacent duplicates, e.g., `"abcdef"`), `stk` stores all `n` characters.

---

## Available Solutions

Only verified solution files present in this folder are listed below:

| Language | Solution File |
| :--- | :--- |
| **JavaScript** | [1047remove-all-adjacent-duplicates-in-string.js](./1047remove-all-adjacent-duplicates-in-string.js) |

---

## Key Learnings

- Whenever local pairwise cancellations expose earlier elements to new neighbors (like adjacent duplicates, asteroid collisions, or balanced brackets), a stack tracks the exposed frontier in `O(1)` per step.
- To generalize this problem to removing `k` adjacent duplicates (`Remove All Adjacent Duplicates in String II`), store `[char, count]` pairs on the stack instead of raw characters.
