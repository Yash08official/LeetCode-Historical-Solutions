---
comments: true
difficulty: Medium
tags:
  - Array
  - Two Pointers
  - String
  - Simulation
---

# 2109. Adding Spaces to a String

**[View Problem on LeetCode](https://leetcode.com/problems/adding-spaces-to-a-string/)**

| Attribute | Details |
| :--- | :--- |
| **Problem ID** | `2109` (`2109`) |
| **Difficulty** | Medium |
| **Topics / Tags** | `Array`, `Two Pointers`, `String`, `Simulation` |
| **Solution Language** | Java |

---

## Problem Description

You are given a **0-indexed** string `s` and a **0-indexed** strictly increasing integer array `spaces`. Each element in `spaces` specifies an index in the original string `s` immediately **before** which a single space character `' '` must be inserted.

Return the resulting string after inserting all requested spaces.

---

## Examples

### Example 1

```text
Input: s = "LeetcodeHelpsMeLearn", spaces = [8,13,15]
Output: "Leetcode Helps Me Learn"
Explanation:
The indices 8, 13, and 15 correspond to the underlined characters in "LeetcodeHelpsMeLearn".
We then place spaces before those characters.
```

### Example 2

```text
Input: s = "icodeinpython", spaces = [1,5,7,9]
Output: "i code in py thon"
Explanation:
The indices 1, 5, 7, and 9 correspond to the underlined characters in "icodeinpython".
We then place spaces before those characters.
```

### Example 3

```text
Input: s = "spacing", spaces = [0,1,2,3,4,5,6]
Output: " s p a c i n g"
Explanation:
We are also able to place spaces before the first character of the string.
```

---

## Constraints

- `1 <= s.length <= 3 * 10^5`

- `s` consists only of lowercase and uppercase English letters.

- `1 <= spaces.length <= 3 * 10^5`

- `0 <= spaces[i] <= s.length - 1`

- All the values of `spaces` are **strictly increasing**.

---

## Problem Understanding

- **Original Indices Remain Fixed:** All indices in `spaces` refer to positions in the **original** string `s`, not shifted indices after earlier insertions.
- **Sorted Space Indices:** Because `spaces` is strictly increasing (`spaces[0] < spaces[1] < ...`), we only ever need to compare our current position `i` in `s` against a single pointer `spaces[j]`.
- **Edge Cases & Scale:** `spaces[0]` can be `0` (inserting a leading space before `s.charAt(0)`). Both `s.length()` and `spaces.length` can be up to `3 * 10^5`, so modifying strings repeatedly via insertion or `+` concatenation would cause quadratic `O(n^2)` copying.

---

## Approach

### Brute Force Approach

Iterating through `spaces` and calling string slicing/concatenation `s = s.substring(0, pos + offset) + " " + s.substring(pos + offset)` allocates a brand-new `String` of length `O(n)` on every space insertion. With up to `3 * 10^5` spaces, this takes `O(n * m)` (`~9 * 10^{10}`) character copies and results in `Time Limit Exceeded`.

### Optimized Approach

Use a `StringBuilder` and two synchronized pointers—`i` scanning characters of `s` and `j` tracking the next target index in `spaces`—appending `' '` whenever `i == spaces[j]` before appending `s.charAt(i)`.

### Step-by-Step Thinking Process

1. Avoid `O(n)` string shifts per insertion by constructing the output sequentially from left to right in a `StringBuilder`.
2. Maintain index `i` over `s` (`0` to `s.length() - 1`) and index `j` over `spaces` (`0` to `spaces.length - 1`).
3. At each character `i`, check if `j < spaces.length && i == spaces[j]`; if so, append `' '` to `ans` and advance `j`.
4. Append `s.charAt(i)` to `ans`, then convert `ans` to a `String` once the loop finishes.

### Algorithm / Intuition

Because `spaces` is strictly increasing and satisfies `0 <= spaces[j] < s.length()`, every value `spaces[j]` will be matched by `i` at most once and in exact left-to-right order. Checking `if (j < spaces.length && i == spaces[j])` **before** `ans.append(s.charAt(i))` ensures the space is placed immediately *before* character `i` (including at index `0` if `spaces[0] == 0`), and advancing `++j` immediately arms the next space position for future iterations.

---

## Dry Run

Trace on **Example 1**: `s = "LeetcodeHelpsMeLearn"` (length `20`), `spaces = [8, 13, 15]`.

- `i = 0..7` (`"Leetcode"`): `i != spaces[0] (8)` -> appends `'L','e','e','t','c','o','d','e'`. (`j = 0`)
- `i = 8` (`'H'`): `i == spaces[0] (8)` -> appends `' '`, increments `j` to `1`, then appends `'H'`. (`ans = "Leetcode H"`)
- `i = 9..12` (`"elps"`): `i != spaces[1] (13)` -> appends `'e','l','p','s'`. (`ans = "Leetcode Helps"`)
- `i = 13` (`'M'`): `i == spaces[1] (13)` -> appends `' '`, increments `j` to `2`, then appends `'M'`. (`ans = "Leetcode Helps M"`)
- `i = 14` (`'e'`): `i != spaces[2] (15)` -> appends `'e'`. (`ans = "Leetcode Helps Me"`)
- `i = 15` (`'L'`): `i == spaces[2] (15)` -> appends `' '`, increments `j` to `3`, then appends `'L'`. (`ans = "Leetcode Helps Me L"`)
- `i = 16..19` (`"earn"`): `j == 3 == spaces.length` -> appends `'e','a','r','n'`.
- Returns `"Leetcode Helps Me Learn"`.

---

## Complexity Analysis

- **Time Complexity:** `O(n)` — Letting `n = s.length()` and `m = spaces.length` (with `m <= n`), the loop iterates `n` times and appends `n + m` characters to `StringBuilder` in `O(n + m) = O(n)` total time.
- **Space Complexity:** `O(n)` — `StringBuilder ans` allocates a character buffer proportional to the output length `n + m` (`O(1)` auxiliary space beyond the output builder).

---

## Available Solutions

Only verified solution files present in this folder are listed below:

| Language | Solution File |
| :--- | :--- |
| **Java** | [2109adding-spaces-to-a-string.java](./2109adding-spaces-to-a-string.java) |

---

## Key Learnings

- Two-pointer stream merging with `StringBuilder` converts `m` mid-string insertions from `O(n * m)` down to a single linear `O(n + m)` pass.
- Checking the insertion trigger before appending `s.charAt(i)` naturally handles index `0` without special-case logic.
