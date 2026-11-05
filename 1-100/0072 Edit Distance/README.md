---
comments: true
difficulty: Medium
tags:
  - String
  - Dynamic Programming
---

# 72. Edit Distance

**[View Problem on LeetCode](https://leetcode.com/problems/edit-distance/)**

| Attribute | Details |
| :--- | :--- |
| **Problem ID** | `0072` (`72`) |
| **Difficulty** | Medium |
| **Topics / Tags** | `String`, `Dynamic Programming` |
| **Solution Language** | Java |

---

## Problem Description

Given two lowercase strings `word1` and `word2`, find the minimum number of single-character edits needed to transform `word1` into `word2`. At any step, you are allowed to perform one of three operations on `word1`:
- **Insert** a single character anywhere.
- **Delete** an existing character.
- **Replace** an existing character with another character.

---

## Examples

### Example 1

```text
Input: word1 = "horse", word2 = "ros"
Output: 3
Explanation:
horse -> rorse (replace 'h' with 'r')
rorse -> rose (remove 'r')
rose -> ros (remove 'e')
```

### Example 2

```text
Input: word1 = "intention", word2 = "execution"
Output: 5
Explanation:
intention -> inention (remove 't')
inention -> enention (replace 'i' with 'e')
enention -> exention (replace 'n' with 'x')
exention -> exection (replace 'n' with 'c')
exection -> execution (insert 'u')
```

---

## Constraints

- `0 <= word1.length, word2.length <= 500`

- `word1` and `word2` consist of lowercase English letters.

---

## Problem Understanding

- This is the classic **Levenshtein (Edit) Distance** problem.
- Matching characters at the ends of two prefixes require `0` extra operations beyond transforming the preceding prefixes.
- Mismatched characters can be resolved in three ways: deleting the last char of `word1`'s prefix, inserting the last char of `word2`'s prefix, or replacing `word1`'s char to match `word2`'s char.
- Edge cases include empty strings (`0 <= word1.length, word2.length <= 500`): converting an empty string to length `j` takes `j` insertions, and converting length `i` to an empty string takes `i` deletions.

---

## Approach

### Brute Force Approach

A naive recursive exploration tries all three edit choices (`insert`, `delete`, `replace`) at every mismatch between indices `(i, j)`. Without memoization, the recursion tree branches up to 3 ways per step, taking `O(3^(m + n))` time — completely infeasible for string lengths up to `500`.

### Optimized Approach

Build a 2D bottom-up Dynamic Programming table `f` of size `(m + 1) x (n + 1)`, where `f[i][j]` stores the minimum edit distance between the first `i` characters of `word1` and the first `j` characters of `word2`.

### Step-by-Step Thinking Process

1. Define state `f[i][j]` as the minimum operations required to convert `word1[0 .. i - 1]` into `word2[0 .. j - 1]`.
2. Establish base cases: `f[0][j] = j` (inserting `j` characters into an empty `word1`) and `f[i][0] = i` (deleting `i` characters from `word1`).
3. When `word1.charAt(i - 1) == word2.charAt(j - 1)`, no edit is needed at the last character, so `f[i][j] = f[i - 1][j - 1]`.
4. When they differ, take `1 + min` over the three transitions: `f[i - 1][j]` (delete `word1[i - 1]`), `f[i][j - 1]` (insert `word2[j - 1]`), and `f[i - 1][j - 1]` (replace `word1[i - 1]` with `word2[j - 1]`).
5. Return `f[m][n]` after filling rows `1..m` and columns `1..n`.

### Algorithm / Intuition

In `minDistance(String word1, String word2)`, `m` and `n` hold the lengths of `word1` and `word2`, and `int[][] f = new int[m + 1][n + 1]` allocates the DP grid (`f[0][0]` defaults to `0`).
- First, `for (int j = 1; j <= n; ++j) f[0][j] = j;` initializes row `0`.
- Next, the outer loop `for (int i = 1; i <= m; ++i)` sets `f[i][0] = i` at the start of row `i` and iterates `j` from `1` to `n`.
- Inside the inner loop, `word1.charAt(i - 1) == word2.charAt(j - 1)` checks if the current characters match. If so, `f[i][j] = f[i - 1][j - 1]`. Otherwise, `f[i][j] = Math.min(f[i - 1][j], Math.min(f[i][j - 1], f[i - 1][j - 1])) + 1` selects the cheapest edit plus `1`.
- Finally, `f[m][n]` gives the minimum edits for the full strings.

---

## Dry Run

Tracing Example 1 with `word1 = "horse"` (`m = 5`) and `word2 = "ros"` (`n = 3`). Below is the completed DP table `f[i][j]`:

| `i \ j` | `""` (0) | `'r'` (1) | `'o'` (2) | `'s'` (3) |
| :--- | :--- | :--- | :--- | :--- |
| **`""` (0)** | `0` | `1` | `2` | `3` |
| **`'h'` (1)** | `1` | `1` (rep `h->r`) | `2` | `3` |
| **`'o'` (2)** | `2` | `2` | `1` (`'o'=='o'`) | `2` |
| **`'r'` (3)** | `3` | `2` (`'r'=='r'`) | `2` | `2` |
| **`'s'` (4)** | `4` | `3` | `3` | `2` (`'s'=='s'`) |
| **`'e'` (5)** | `5` | `4` | `4` | **`3`** (del `'e'`) |

At `i = 5, j = 3` (`'e'` vs `'s'`), `f[5][3] = min(f[4][3], f[5][2], f[4][2]) + 1 = min(2, 4, 3) + 1 = 3`. Returns `3`.

---

## Complexity Analysis

- **Time Complexity:** `O(m * n)` — Every cell in the `(m + 1) x (n + 1)` DP table is computed once in `O(1)` time.
- **Space Complexity:** `O(m * n)` — The 2D integer array `f` stores `(m + 1) * (n + 1)` entries.

---

## Available Solutions

Only verified solution files present in this folder are listed below:

| Language | Solution File |
| :--- | :--- |
| **Java** | [72edit-distance.java](./72edit-distance.java) |

---

## Key Learnings

- Prefix-based 2D DP (`f[i][j]` on prefixes of length `i` and `j`) cleanly models two-sequence alignment and string transformation problems.
- Always map the three edit operations clearly to grid neighbors: `f[i - 1][j]` is deletion from `word1`, `f[i][j - 1]` is insertion into `word1`, and `f[i - 1][j - 1]` is character replacement.
- If memory is tight, `f` can be compressed to a 1D array of size `n + 1` since row `i` only depends on row `i - 1` and earlier cells of row `i`.
