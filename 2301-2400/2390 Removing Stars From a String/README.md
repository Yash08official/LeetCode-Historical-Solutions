---
comments: true
difficulty: Medium
tags:
  - String
  - Stack
  - Simulation
---

# 2390. Removing Stars From a String

**[View Problem on LeetCode](https://leetcode.com/problems/removing-stars-from-a-string/)**

| Attribute | Details |
| :--- | :--- |
| **Problem ID** | `2390` (`2390`) |
| **Difficulty** | Medium |
| **Topics / Tags** | `String`, `Stack`, `Simulation` |
| **Solution Language** | JavaScript |

---

## Problem Description

You are given a string `s` that contains lowercase English letters and stars `*`.

In one operation, you can:
- Choose any star `*` in `s`.
- Remove the closest non-star character to its left, as well as remove the star itself.

Return the string after all stars and their corresponding cancelled characters have been removed. The input is guaranteed to be generated such that the operation is always possible.

---

## Examples

### Example 1

```text
Input: s = "leet**cod*e"
Output: "lecoe"
Explanation: Performing the removals from left to right:
- The closest character to the 1^st star is 't' in "leet**cod*e". s becomes "lee*cod*e".
- The closest character to the 2^nd star is 'e' in "lee*cod*e". s becomes "lecod*e".
- The closest character to the 3^rd star is 'd' in "lecod*e". s becomes "lecoe".
There are no more stars, so we return "lecoe".
```

### Example 2

```text
Input: s = "erase*****"
Output: ""
Explanation: The entire string is removed, so we return an empty string.
```

---

## Constraints

- `1 <= s.length <= 10^5`

- `s` consists of lowercase English letters and stars `*`.

- The operation above can be performed on `s`.

---

## Problem Understanding

Key observations and constraints:
- `1 <= s.length <= 10^5`, containing lowercase English letters and `*`.
- Each star removes the nearest non-star character to its left that has not already been deleted.
- This behavior corresponds directly to a Last-In, First-Out (LIFO) stack: normal characters are pushed onto the stack, and encountering a `*` pops the most recent character off the stack.
- The operation is always valid, meaning a star will never be processed when the stack is empty.

---

## Approach

### Brute Force Approach

A naive approach might repeatedly find the first star in `s`, delete the star and its left neighbor, and repeat until no stars remain. Each string deletion takes `O(n)` time, leading to `O(n^2)` time in the worst case (e.g., `s` with many stars alternating with letters), which will time out for `n = 10^5`.

### Optimized Approach

Simulate the stack using an accumulating string or array. The implemented solution processes characters of `s` sequentially from left to right:
- Initialize `let ans = ''`.
- For each character `c` in `s`:
  - If `c === '*'`, pop the last character using `ans = ans.slice(0, -1)`.
  - Otherwise, push the character using `ans += c`.
- Return `ans`.

### Step-by-Step Thinking Process

1. A star deletes the immediately preceding available non-star character.
2. This matches stack semantics (LIFO order).
3. Iterate through the string left-to-right.
4. If character is `*`, pop the most recent character.
5. If character is a letter, append it to the current stack/string.
6. Return the collected characters.

### Algorithm / Intuition

In `removeStars`, `let ans = ''` serves as the character stack. We loop over each character `c` of `s`. If `c === '*'`, the slice operation `ans = ans.slice(0, -1)` removes the trailing character (equivalent to a stack `pop()`). If `c` is a letter, `ans += c` appends it to the end (equivalent to a stack `push(c)`). Once the loop finishes, all stars and their paired left characters have been removed, and `ans` is returned.

---

## Dry Run

Consider `s = "leet**cod*e"`:
- Initial `ans = ""`.
- `c = 'l'`: `ans = "l"`.
- `c = 'e'`: `ans = "le"`.
- `c = 'e'`: `ans = "lee"`.
- `c = 't'`: `ans = "leet"`.
- `c = '*'`: pop -> `ans = "lee"`.
- `c = '*'`: pop -> `ans = "le"`.
- `c = 'c'`: `ans = "lec"`.
- `c = 'o'`: `ans = "leco"`.
- `c = 'd'`: `ans = "lecod"`.
- `c = '*'`: pop -> `ans = "leco"`.
- `c = 'e'`: `ans = "lecoe"`.
- Return `"lecoe"`.

---

## Complexity Analysis

- **Time Complexity:** `O(n)` — Modern JavaScript engines (V8) optimize short string slicing and flat strings, running in linear time. In standard worst-case string reallocation it is `O(n^2)`, while using an explicit array stack would be strictly guaranteed `O(n)`.
- **Space Complexity:** `O(n)` — Required to store the result string `ans`, which contains at most `n` characters.

---

## Available Solutions

Only verified solution files present in this folder are listed below:

| Language | Solution File |
| :--- | :--- |
| **JavaScript** | [2390removing-stars-from-a-string.js](./2390removing-stars-from-a-string.js) |

---

## Key Learnings

- Backtracking deletion patterns ('cancel the closest previous element') are classic manifestations of the Stack data structure.
- Linear left-to-right scanning resolves cancellations without needing multiple passes or recursive parsing.
- String slicing can simulate a stack, though an array `push`/`pop` followed by `.join('')` is often preferred for guaranteed $O(1)$ stack operations in JavaScript.
