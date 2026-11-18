---
comments: true
difficulty: Medium
tags:
  - Shell
---

# 192. Word Frequency

**[View Problem on LeetCode](https://leetcode.com/problems/word-frequency/)**

| Attribute | Details |
| :--- | :--- |
| **Problem ID** | `0192` (`192`) |
| **Difficulty** | Medium |
| **Topics / Tags** | `Shell` |
| **Solution Language** | Bash |

---

## Problem Description

Write a bash script to calculate the frequency of each word in a text file `words.txt`.

For simplicity sake, you may assume:

	
- `words.txt` contains only lowercase characters and space `' '` characters.
	
- Each word must consist of lowercase characters only.
	
- Words are separated by one or more whitespace characters.

Example:

Assume that `words.txt` has the following content:

```text
the day is sunny the the
the sunny is is
```

Your script should output the following, sorted by descending frequency:

```text
the 4
is 3
sunny 2
day 1
```

Note:

	
- Don't worry about handling ties, it is guaranteed that each word's frequency count is unique.
	
- Could you write it in one-line using Unix pipes?

---

## Examples

*(Refer to problem description on LeetCode)*

---

## Constraints

*(Refer to problem description on LeetCode)*

---

## Problem Understanding

- Read words from `words.txt` and output the word frequency list to stdout, formatted with word followed by count, ordered by frequency descending.

---

## Approach

### Optimized Approach (Unix Shell Pipeline: tr + sort + uniq + awk)

1. `cat words.txt`: Stream file contents.
2. `tr -s ' ' '\n'`: Replace sequences of spaces with newlines, splitting words onto individual lines.
3. `sort`: Sort words alphabetically so identical words are adjacent.
4. `uniq -c`: Count occurrences of adjacent identical words (outputs `<count> <word>`).
5. `sort -nr`: Sort numerically in reverse order by count.
6. `awk '{print $2, $1}'`: Swap columns to output `<word> <count>`.

---

## Complexity Analysis

- **Time Complexity:** $O(W \log W)$ — Dominated by sorting $W$ words.
- **Space Complexity:** $O(W)$ — Disk/memory buffering in sort.

---

## Available Solutions

Only verified solution files present in this folder are listed below:

| Language | Solution File |
| :--- | :--- |
| **Bash** | [192word-frequency.sh](./192word-frequency.sh) |

---

## Key Learnings

- Composing specialized Unix utility filters through pipes creates robust, performant stream-processing pipelines in a single command.
