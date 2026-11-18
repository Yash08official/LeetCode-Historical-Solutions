---
comments: true
difficulty: Medium
tags:
  - Shell
---

# 194. Transpose File

**[View Problem on LeetCode](https://leetcode.com/problems/transpose-file/)**

| Attribute | Details |
| :--- | :--- |
| **Problem ID** | `0194` (`194`) |
| **Difficulty** | Medium |
| **Topics / Tags** | `Shell` |
| **Solution Language** | Bash |

---

## Problem Description

Given a text file `file.txt`, transpose its content.

You may assume that each row has the same number of columns, and each field is separated by the `' '` character.

Example:

If `file.txt` has the following content:

```text
name age
alice 21
ryan 30
```

Output the following:

```text
name alice ryan
age 21 30
```

---

## Examples

*(Refer to problem description on LeetCode)*

---

## Constraints

*(Refer to problem description on LeetCode)*

---

## Problem Understanding

- Read from `file.txt` and print its transposed content to stdout (swap rows and columns).
- Assume each row has the same number of fields separated by space.

---

## Approach

### Optimized Approach (AWK Matrix Transposition via Associative Array)

1. For each record/line:
   - Loop field index `i` from 1 to `NF` (number of fields).
   - On line 1 (`NR == 1`), initialize column accumulator: `res[i] = $i`.
   - On subsequent lines (`NR > 1`), append field with space: `res[i] = res[i]" "$i`.
2. In the `END` block:
   - Loop `i` from 1 to `NF`.
   - Print each transposed row: `print res[i]`.

---

## Complexity Analysis

- **Time Complexity:** $O(R \cdot C)$ — Linear in total matrix elements (rows $	imes$ columns).
- **Space Complexity:** $O(R \cdot C)$ — To buffer transposed line strings in associative array `res`.

---

## Available Solutions

Only verified solution files present in this folder are listed below:

| Language | Solution File |
| :--- | :--- |
| **Bash** | [194transpose-file.sh](./194transpose-file.sh) |

---

## Key Learnings

- AWK's built-in field count `NF` and record number `NR` make multi-line matrix manipulations straightforward and memory-efficient.
