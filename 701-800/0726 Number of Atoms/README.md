---
comments: true
difficulty: Hard
tags:
  - Hash Table
  - String
  - Stack
  - Sorting
---

# 726. Number of Atoms

**[View Problem on LeetCode](https://leetcode.com/problems/number-of-atoms/)**

| Attribute | Details |
| :--- | :--- |
| **Problem ID** | `0726` (`726`) |
| **Difficulty** | Hard |
| **Topics / Tags** | `Hash Table`, `String`, `Stack`, `Sorting` |
| **Solution Language** | Java |

---

## Problem Description

Given a string `formula` representing a chemical formula, return *the count of each atom*.

The atomic element always starts with an uppercase character, then zero or more lowercase letters, representing the name.

One or more digits representing that element's count may follow if the count is greater than 1. If the count is 1, no digits will follow.

- For example, `"H2O"` and `"H2O2"` are possible, but `"H1O2"` is impossible.

Two formulas are concatenated together to produce another formula.

- For example, `"H2O2He3Mg4"` is also a formula.

A formula placed in parentheses, and a count (optional) may follow, is also a formula.

- For example, `"(H2O2)"` and `"(H2O2)3"` are formulas.

Return the count of all elements as a string in the following form: the first name (in sorted order), followed by its count (if that count is more than 1), followed by the second name (in sorted order), followed by its count (if that count is more than 1), and so on.

---

## Examples

### Example 1

```text
Input: formula = "H2O"
Output: "H2O"
Explanation: The count of elements are {'H': 2, 'O': 1}.
```

### Example 2

```text
Input: formula = "Mg(OH)2"
Output: "H2MgO2"
Explanation: The count of elements are {'H': 2, 'Mg': 1, 'O': 2}.
```

### Example 3

```text
Input: formula = "K4(ON(SO3)2)2"
Output: "K4N2O14S4"
Explanation: The count of elements are {'K': 4, 'N': 2, 'O': 14, 'S': 4}.
```

---

## Constraints

- `1 <= formula.length <= 1000`
- `formula` consists of English letters, digits, `'('`, and `')'`.
- `formula` is always a valid formula.

---

## Problem Understanding

- Chemical formulas can contain nested parentheses with trailing multipliers (e.g. `(ON(SO3)2)2`).
- Parsing left-to-right requires distributing multipliers downwards into nested scopes.
- Parsing right-to-left simplifies parsing because multipliers are encountered **before** the sub-formulas they affect.

---

## Approach

### Optimized Approach (Right-to-Left Stack Parsing with Multiplier Tracking)

1. Maintain `multiplier = 1`, running `freq = 0`, atom count map `map`, and an integer stack for nested multipliers.
2. Iterate through characters of `formula` from right to left ($i = n - 1 \dots 0$):
   - **Digits:** Parse continuous integer multiplier `freq`.
   - **Right Parenthesis `)`:**
     - Push current `multiplier` onto stack.
     - Multiply: `multiplier *= Math.max(freq, 1)`.
     - Reset `freq = 0`.
   - **Left Parenthesis `(`:**
     - Pop previous multiplier from stack: `multiplier = stack[--top]`.
   - **Element Name (Lowercase followed by Uppercase):**
     - Collect full element name.
     - Add to `map`: count is `Math.max(freq, 1) * multiplier`.
     - Reset `freq = 0`.
3. Sort unique element keys lexicographically and construct the output string (appending count only when $> 1$).

---

## Complexity Analysis

- **Time Complexity:** $O(N + K \log K)$ where $N$ is formula length and $K$ is number of unique elements. Sorting keys takes $O(K \log K)$.
- **Space Complexity:** $O(N)$ for stack and hash map storage.

---

## Available Solutions

Only verified solution files present in this folder are listed below:

| Language | Solution File |
| :--- | :--- |
| **Java** | [726number-of-atoms.java](./726number-of-atoms.java) |

---

## Key Learnings

- Reverse (right-to-left) traversal turns look-ahead multiplier distribution into immediate multiplier maintenance.
- Keeping a running multiplier product with a stack of previous states eliminates multi-pass map merging.
