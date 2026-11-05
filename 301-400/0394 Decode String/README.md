---
comments: true
difficulty: Medium
tags:
  - String
  - Stack
  - Recursion
---

# 394. Decode String

**[View Problem on LeetCode](https://leetcode.com/problems/decode-string/)**

| Attribute | Details |
| :--- | :--- |
| **Problem ID** | `0394` (`394`) |
| **Difficulty** | Medium |
| **Topics / Tags** | `String`, `Stack`, `Recursion` |
| **Solution Language** | JavaScript |

---

## Problem Description

Given an encoded string `s`, return its fully decoded string.

The encoding format is `k[encoded_string]`, meaning the `encoded_string` enclosed within square brackets is repeated `k` times (`k >= 1`). Bracketed expressions may be nested arbitrarily (such as `3[a2[c]]`), input strings are guaranteed to be well-formed without stray spaces, and digits only appear as repeat multipliers `k`.

---

## Examples

### Example 1

```text
Input: s = "3[a]2[bc]"
Output: "aaabcbc"
```

### Example 2

```text
Input: s = "3[a2[c]]"
Output: "accaccacc"
```

### Example 3

```text
Input: s = "2[abc]3[cd]ef"
Output: "abcabccdcdcdef"
```

---

## Constraints

- `1 <= s.length <= 30`

- `s` consists of lowercase English letters, digits, and square brackets `'[]'`.

- `s` is guaranteed to be **a valid** input.

- All the integers in `s` are in the range `[1, 300]`.

---

## Problem Understanding

Nested brackets behave in a **Last-In, First-Out (LIFO)** manner: in `3[a2[c]]`, we must finish decoding the inner `2[c]` into `"cc"` and append it to `'a'` (`"acc"`) before multiplying the outer group by `3`.

Key observations:
- Multipliers `k` can have multiple digits (up to `300`), so digits must be accumulated via `num = num * 10 + digit` rather than assuming single-digit counts.
- Whenever `[` is encountered, both the accumulated repeat count `num` and the string prefix `res` built so far at the current nesting level must be saved on stacks before starting fresh inside the brackets.

---

## Approach

### Brute Force Approach

Repeatedly scanning the string with regular expressions or index searches to find the innermost `[...]` pair (one with no nested brackets inside), expanding it into a newly concatenated string, and restarting from index `0` until no brackets remain.

Each expansion copies the entire string, leading to `O(d * M)` repeated string reconstructions where `d` is the number of bracket groups and `M` is the decoded length.

### Optimized Approach

Use **Two Parallel Stacks** (`stackNum` for multipliers and `stackRes` for outer string prefixes) in a single left-to-right scan of `s`. Maintain `num` (current multiplier) and `res` (string built in the current bracket scope), pushing onto the stacks at `'['` and popping/repeating at `']'`.

### Step-by-Step Thinking Process

1. Initialize `stackNum = []`, `stackRes = []`, current multiplier `num = 0`, and current scope string `res = ""`.
2. Iterate character by character (`for (let c of s)`):
3. If `c` is a digit (`'0' <= c <= '9'`), shift `num` into base 10: `num = num * 10 + parseInt(c)`.
4. If `c === '['`, push `num` to `stackNum` and `res` to `stackRes`, then reset `num = 0` and `res = ""` for the newly entered inner scope.
5. If `c === ']'`, pop repeat count `n = stackNum.pop()`, repeat `res` `n` times into temporary string `t`, and restore the enclosing scope via `res = stackRes.pop() + t`.
6. Otherwise (`c` is a letter), append `res += c` to the current scope string, and return `res` after scanning `s`.

### Algorithm / Intuition

At any point during the scan, `res` holds only the decoded text belonging to the **innermost currently open `[...]` block** (or top-level text if no brackets are open), while `stackRes` holds the frozen prefixes waiting outside each open `'['`.

When `']'` arrives, `res` is complete for that inner block. Repeating `res` `stackNum.pop()` times produces `t`, and prepending `stackRes.pop()` seamlessly merges the expanded inner block onto the end of its parent scope's string!

---

## Dry Run

Tracing `decodeString("3[a]2[bc]")` (**Example 1**):

| Char `c` | Action | `num` | `res` | `stackNum` | `stackRes` |
| :--- | :--- | :--- | :--- | :--- | :--- |
| `'3'` | Digit | `3` | `""` | `[]` | `[]` |
| `'['` | Push & reset | `0` | `""` | `[3]` | `[""]` |
| `'a'` | Append letter | `0` | `"a"` | `[3]` | `[""]` |
| `']'` | Pop `3` & `""`, `t = "aaa"` | `0` | `"aaa"` | `[]` | `[]` |
| `'2'` | Digit | `2` | `"aaa"` | `[]` | `[]` |
| `'['` | Push & reset | `0` | `""` | `[2]` | `["aaa"]` |
| `'b'` | Append letter | `0` | `"b"` | `[2]` | `["aaa"]` |
| `'c'` | Append letter | `0` | `"bc"` | `[2]` | `["aaa"]` |
| `']'` | Pop `2` & `"aaa"`, `t = "bcbc"` | `0` | `"aaabcbc"` | `[]` | `[]` |

Loop finishes and returns `"aaabcbc"`.

---

## Complexity Analysis

- **Time Complexity:** `O(|s| + M)` where `M <= 10^5` is the length of the decoded output — Every input character is processed once, and total work across all repetition loops is proportional to the total characters generated.
- **Space Complexity:** `O(|s| + M)` — `stackNum` and `stackRes` grow to at most the bracket nesting depth `O(|s|)`, and intermediate/final strings store up to `M` characters.

---

## Available Solutions

Only verified solution files present in this folder are listed below:

| Language | Solution File |
| :--- | :--- |
| **JavaScript** | [394decode-string.js](./394decode-string.js) |

---

## Key Learnings

- Saving the outer accumulator (`res`) on a stack whenever `'['` opens eliminates the need to push individual characters onto a stack and reverse them on `']'`.
- Always parse multi-digit integers (`num = num * 10 + digit`) before `'['` and reset `num = 0` immediately upon pushing.
- In JavaScript, `res.repeat(stackNum.pop())` can also replace the manual `for` loop while expressing the exact same operation.
