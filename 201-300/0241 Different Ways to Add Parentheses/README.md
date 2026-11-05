---
comments: true
difficulty: Medium
tags:
  - Math
  - String
  - Dynamic Programming
  - Recursion
  - Memoization
  - Bracket Sequences
---

# 241. Different Ways to Add Parentheses

**[View Problem on LeetCode](https://leetcode.com/problems/different-ways-to-add-parentheses/)**

| Attribute | Details |
| :--- | :--- |
| **Problem ID** | `0241` (`241`) |
| **Difficulty** | Medium |
| **Topics / Tags** | `Math`, `String`, `Dynamic Programming`, `Recursion`, `Memoization`, `Bracket Sequences` |
| **Solution Language** | JavaScript |

---

## Problem Description

Given a string `expression` consisting of non-negative integers (`0`–`99`) and binary operators `'+'`, `'-'`, and `'*'`, compute and return **all possible results** obtainable from every valid way of parenthesizing the numbers and operators. Duplicate result values resulting from distinct parenthesizations must all be included, and the answer may be returned in any order.

---

## Examples

### Example 1

```text
Input: expression = "2-1-1"
Output: [0,2]
Explanation:
((2-1)-1) = 0
(2-(1-1)) = 2
```

### Example 2

```text
Input: expression = "2*3-4*5"
Output: [-34,-14,-10,-10,10]
Explanation:
(2*(3-(4*5))) = -34
((2*3)-(4*5)) = -14
((2*(3-4))*5) = -10
(2*((3-4)*5)) = -10
(((2*3)-4)*5) = 10
```

---

## Constraints

- `1 <= expression.length <= 20`

- `expression` consists of digits and the operator `'+'`, `'-'`, and `'*'`.

- All the integer values in the input expression are in the range `[0, 99]`.

- The integer values in the input expression do not have a leading `'-'` or `'+'` denoting the sign.

---

## Problem Understanding

Think about what a full parenthesization actually chooses: **which operator is evaluated LAST**! If an expression has `m` operators, picking the `k`-th operator (`+`, `-`, or `*`) as the root of the expression tree splits the string into a completely independent left subexpression and right subexpression. Combining every result `a` of the left subexpression with every result `b` of the right subexpression enumerates all trees rooted at that operator.

Also note a handy consequence of the constraints (`0 <= value <= 99` and no unary signs): any pure number has `1` or `2` characters (`exp.length < 3`), whereas any expression containing at least one operator has at least `3` characters (e.g. `"1+2"`).

---

## Approach

### Brute Force Approach

Recursively split at every operator `c` in `exp` and recursively evaluate `exp.substring(0, i)` and `exp.substring(i + 1)` **without** caching. In longer expressions (up to length `20`, i.e., up to `9` operators), identical substrings like `"2*3-4"` are sliced and re-evaluated across many different outer split orders, repeating subproblem work unnecessarily.

### Optimized Approach

Use **Divide-and-Conquer Recursion with Memoization** (`let memo = {}`): cache computed result arrays by substring `exp`, handle pure numbers in `O(1)` when `exp.length < 3`, and otherwise split at every operator index `i` to take the Cartesian product of `left = dfs(exp.substring(0, i))` and `right = dfs(exp.substring(i + 1))`.

### Step-by-Step Thinking Process

1. Create a closure-scoped lookup object `let memo = {}` mapping substring `exp` to its array of all possible evaluation results.
2. Inside `dfs(exp)`, return `memo[exp]` immediately if already computed.
3. Base case: if `exp.length < 3`, `exp` contains no operators (since numbers are `0..99` with no unary `+`/`-`), so return `[parseInt(exp)]`.
4. Recursive step: scan `i` from `0` to `exp.length - 1`. Whenever `c = exp.charAt(i)` is `'-'`, `'+'`, or `'*'`, recursively solve `left = dfs(exp.substring(0, i))` and `right = dfs(exp.substring(i + 1))`.
5. Combine every `a` in `left` with every `b` in `right` using operator `c`, push into `ans`, store `memo[exp] = ans`, and return `ans`.

### Algorithm / Intuition

Every valid parenthesization of `m` operators corresponds 1-to-1 with a full binary expression tree having `m` internal operator nodes — counted by the **`m`-th Catalan number** `C_m`:
- `dfs(exp)` treats each operator character `c` at index `i` as the root of such a binary tree.
- `left` contains the values of all valid left subtrees, and `right` contains the values of all valid right subtrees.
- The nested `for (let a of left) for (let b of right)` loop computes the exact Cartesian product of left and right subtree outcomes, while `memo[exp] = ans` turns overlapping substring evaluations into instant table lookups.

---

## Dry Run

Tracing Example 1: `expression = "2-1-1"` (`dfs("2-1-1")`):

1. `"2-1-1".length` is `5` (`>= 3`). Scans `i = 0..4`:
2. **`i = 1` (`c = '-'`):** Splits into `"2"` and `"1-1"`:
   - `left = dfs("2")` -> length `1 < 3` -> returns `[2]`.
   - `right = dfs("1-1")`: splits at `i = 1` (`'-'`) into `dfs("1") = [1]` and `dfs("1") = [1]` -> computes `1 - 1 = 0` -> caches `memo["1-1"] = [0]` and returns `[0]`.
   - Combines `left = [2]` and `right = [0]` with `'-'`: pushes `2 - 0 = 2` -> `ans = [2]`.
3. **`i = 3` (`c = '-'`):** Splits into `"2-1"` and `"1"`:
   - `left = dfs("2-1")`: splits at `i = 1` (`'-'`) into `[2]` and `[1]` -> computes `2 - 1 = 1` -> caches `memo["2-1"] = [1]` and returns `[1]`.
   - `right = dfs("1")` -> length `1 < 3` -> returns `[1]`.
   - Combines `left = [1]` and `right = [1]` with `'-'`: pushes `1 - 1 = 0` -> `ans = [2, 0]`.
4. Caches `memo["2-1-1"] = [2, 0]` and returns `[2, 0]` (matches `[0, 2]` since any order is valid).

---

## Complexity Analysis

- **Time Complexity:** `O(m * C_m)` (bounded by `O(4^m / sqrt(m))`) — Where `m <= 9` is the number of operators and `C_m` is the `m`-th Catalan number (`C_9 = 4862`), since we materialize every distinct parenthesization result.
- **Space Complexity:** `O(m * C_m)` — `memo` stores result lists across the `O(m^2)` distinct subexpressions, with the top-level result holding `C_m` integers.

---

## Available Solutions

Only verified solution files present in this folder are listed below:

| Language | Solution File |
| :--- | :--- |
| **JavaScript** | [241different-ways-to-add-parentheses.js](./241different-ways-to-add-parentheses.js) |

---

## Key Learnings

- Problems asking for all ways to group/parenthesize linear elements (expressions, matrix chain multiplication, unique BSTs) follow the **Catalan divide-and-conquer** pattern: iterate over which element acts as the root/last split.
- The `exp.length < 3` base-case shortcut specifically relies on numbers having at most 2 digits (`0..99`); if arbitrary multi-digit integers were allowed, you would instead check whether the loop found zero operators (`ans.length === 0`) and push `parseInt(exp)` afterward.
- Memoizing by substring (`memo[exp]`) avoids recomputing shared sub-intervals across different outer parenthesizations.
