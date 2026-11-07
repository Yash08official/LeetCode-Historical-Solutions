---
comments: true
difficulty: Medium
tags:
  - String
  - Stack
---

# 71. Simplify Path

**[View Problem on LeetCode](https://leetcode.com/problems/simplify-path/)**

| Attribute | Details |
| :--- | :--- |
| **Problem ID** | `0071` (`71`) |
| **Difficulty** | Medium |
| **Topics / Tags** | `String`, `Stack` |
| **Solution Language** | Java |

---

## Problem Description

You are given an absolute path for a Unix-style file system, which always begins with a slash `'/'`. Your task is to transform this absolute path into its **simplified canonical path**.

The rules of a Unix-style file system are as follows:

- A single period `'.'` represents the current directory.
- A double period `'..'` represents the previous/parent directory.
- Multiple consecutive slashes such as `'//'` and `'///'` are treated as a single slash `'/'`.
- Any sequence of periods that does not match the rules above should be treated as a valid directory or file name. For example, `'...'` and `'....'` are valid directory or file names.

The simplified canonical path should follow these rules:

- The path must start with a single slash `'/'`.
- Directories within the path must be separated by exactly one slash `'/'`.
- The path must not end with a slash `'/'`, unless it is the root directory.
- The path must not have any single or double periods (`'.'` and `'..'`) used to denote current or parent directories.

Return the **simplified canonical path**.

---

## Examples

### Example 1

```text
Input: path = "/home/"
Output: "/home"
Explanation: The trailing slash should be removed.
```

### Example 2

```text
Input: path = "/home//foo/"
Output: "/home/foo"
Explanation: Multiple consecutive slashes are replaced by a single one.
```

### Example 3

```text
Input: path = "/home/user/Documents/../Pictures"
Output: "/home/user/Pictures"
Explanation: A double period ".." refers to the directory up a level.
```

### Example 4

```text
Input: path = "/../"
Output: "/"
Explanation: Going one level up from the root directory is not possible.
```

---

## Constraints

- `1 <= path.length <= 3000`
- `path` consists of English letters, digits, period `'.'`, slash `'/'` or `'_'`.
- `path` is a valid absolute Unix path.

---

## Problem Understanding

- Splitting by `'/'` extracts tokens.
- Tokens that are empty or `'.'` are no-ops.
- Token `'..'` pops the last directory if the stack is non-empty.
- Any other token is pushed onto the stack.

---

## Approach

### Optimized Approach (Tokenization + Stack / Deque)

1. Split input `path` by delimiter `"/"`.
2. Use a `Deque<String>` as a directory stack.
3. For each token `s`:
   - If `s.isEmpty() || ".".equals(s)`, continue.
   - If `"..".equals(s)`, pop from stack: `stk.pollLast()`.
   - Else, push directory name: `stk.offerLast(s)`.
4. Join all remaining elements with `"/"` prefixed by `"/"`.

---

## Complexity Analysis

- **Time Complexity:** $O(N)$ — Splitting and single-pass iteration over tokens of string of length $N$.
- **Space Complexity:** $O(N)$ — Stack stores directory components proportional to path length.

---

## Available Solutions

Only verified solution files present in this folder are listed below:

| Language | Solution File |
| :--- | :--- |
| **Java** | [71simplify-path.java](./71simplify-path.java) |

---

## Key Learnings

- `split("/")` naturally collapses consecutive slashes into empty strings.
- Stack discipline perfectly models hierarchical filesystem parent navigation (`..`).
