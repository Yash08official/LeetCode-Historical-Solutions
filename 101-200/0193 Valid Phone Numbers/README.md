---
comments: true
difficulty: Easy
tags:
  - Shell
---

# 193. Valid Phone Numbers

**[View Problem on LeetCode](https://leetcode.com/problems/valid-phone-numbers/)**

| Attribute | Details |
| :--- | :--- |
| **Problem ID** | `0193` (`193`) |
| **Difficulty** | Easy |
| **Topics / Tags** | `Shell` |
| **Solution Language** | Bash |

---

## Problem Description

Given a text file `file.txt` that contains a list of phone numbers (one per line), write a one-liner bash script to print all valid phone numbers.

You may assume that a valid phone number must appear in one of the following two formats: (xxx) xxx-xxxx or xxx-xxx-xxxx. (x means a digit)

You may also assume each line in the text file must not contain leading or trailing white spaces.

Example:

Assume that `file.txt` has the following content:

```text
987-123-4567
123 456 7890
(123) 456-7890
```

Your script should output the following valid phone numbers:

```text
987-123-4567
(123) 456-7890
```

---

## Examples

*(Refer to problem description on LeetCode)*

---

## Constraints

*(Refer to problem description on LeetCode)*

---

## Problem Understanding

- Read from `file.txt` and print all valid phone numbers matching formats: `(xxx) xxx-xxxx` or `xxx-xxx-xxxx` (where x is a digit).

---

## Approach

### Optimized Approach (AWK Regular Expression Pattern Matching)

1. Use `awk` with a pattern-matching filter:
   `/^([0-9]{3}-|\([0-9]{3}\) )[0-9]{3}-[0-9]{4}$/`
2. Anchors `^` and `$` ensure the pattern matches the entire line with no extraneous characters.
3. Alternation `([0-9]{3}-|\([0-9]{3}\) )` accepts either 3 digits followed by `-`, or 3 digits inside parentheses followed by a space.
4. Suffix `[0-9]{3}-[0-9]{4}` matches the remaining 7 digits with a hyphen.
5. In AWK, lines matching the pattern are printed automatically.

---

## Complexity Analysis

- **Time Complexity:** $O(L)$ — Single-pass linear scan over $L$ lines in `file.txt`.
- **Space Complexity:** $O(1)$ — Line-by-line streaming without buffering the full file.

---

## Available Solutions

Only verified solution files present in this folder are listed below:

| Language | Solution File |
| :--- | :--- |
| **Bash** | [193valid-phone-numbers.sh](./193valid-phone-numbers.sh) |

---

## Key Learnings

- AWK pattern-action syntax allows concise stream filtering without boilerplate print statements.
