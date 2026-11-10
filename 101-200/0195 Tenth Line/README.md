---
comments: true
difficulty: Easy
tags:
  - Shell
---

# 195. Tenth Line

**[View Problem on LeetCode](https://leetcode.com/problems/tenth-line/)**

| Attribute | Details |
| :--- | :--- |
| **Problem ID** | `0195` (`195`) |
| **Difficulty** | Easy |
| **Topics / Tags** | `Shell` |
| **Solution Language** | Bash |

---

## Problem Description

Given a text file `file.txt`, print just the 10th line of the file.

---

## Examples

### Example 1

Assume that `file.txt` has the following content:

```text
Line 1
Line 2
Line 3
Line 4
Line 5
Line 6
Line 7
Line 8
Line 9
Line 10
```

Your script should output the tenth line, which is:

```text
Line 10
```

---

## Constraints

- If the file contains less than 10 lines, what should you output? There should be no output.

---

## Problem Understanding

- Extract and print exclusively the 10th line of a text file.
- If the file has fewer than 10 lines, output nothing.

---

## Approach

### Optimized Approach (sed Stream Editor Line Addressing)

Using the stream editor `sed`:
- `-n`: Suppress automatic default printing of pattern space.
- `10p`: Specifically print line number 10.
- Command: `sed -n 10p file.txt`.

If `file.txt` has fewer than 10 lines, `10p` never triggers, producing empty output as required.

---

## Complexity Analysis

- **Time Complexity:** $O(L)$ where $L$ is the number of lines up to the 10th line.
- **Space Complexity:** $O(1)$ memory streaming buffer.

---

## Available Solutions

Only verified solution files present in this folder are listed below:

| Language | Solution File |
| :--- | :--- |
| **Bash** | [195tenth-line.sh](./195tenth-line.sh) |

---

## Key Learnings

- `sed -n 'Np'` is the idiomatic Unix stream pattern for extracting specific line numbers safely without error on short files.
