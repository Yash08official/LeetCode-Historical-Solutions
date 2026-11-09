---
comments: true
difficulty: Medium
tags:
  - String
  - Backtracking
---

# 93. Restore IP Addresses

**[View Problem on LeetCode](https://leetcode.com/problems/restore-ip-addresses/)**

| Attribute | Details |
| :--- | :--- |
| **Problem ID** | `0093` (`93`) |
| **Difficulty** | Medium |
| **Topics / Tags** | `String`, `Backtracking` |
| **Solution Language** | Java |

---

## Problem Description

A **valid IP address** consists of exactly four integers separated by single dots. Each integer is between `0` and `255` (**inclusive**) and cannot have leading zeros.

- For example, `"0.1.2.201"` and `"192.168.1.1"` are **valid** IP addresses, but `"0.011.255.245"`, `"192.168.1.312"` and `"192.168@1.1"` are **invalid** IP addresses.

Given a string `s` containing only digits, return *all possible valid IP addresses that can be formed by inserting dots into* `s`. You are **not** allowed to reorder or remove any digits in `s`. You may return the valid IP addresses in **any order**.

---

## Examples

### Example 1

```text
Input: s = "25525511135"
Output: ["255.255.11.135","255.255.111.35"]
```

### Example 2

```text
Input: s = "0000"
Output: ["0.0.0.0"]
```

### Example 3

```text
Input: s = "101023"
Output: ["1.0.10.23","1.0.102.3","10.1.0.23","10.10.2.3","101.0.2.3"]
```

---

## Constraints

- `1 <= s.length <= 20`
- `s` consists of digits only.

---

## Problem Understanding

- An IPv4 address has exactly 4 octets.
- Each octet must be an integer in $[0, 255]$.
- No leading zeros are allowed (e.g., `"0"` is valid, but `"00"`, `"01"` are invalid).
- The total length of `s` must be consumed by the 4 octets.

---

## Approach

### Optimized Approach (Depth-First Search / Backtracking)

1. Maintain path list `t` for current octets and `ans` for complete IPs.
2. Define `dfs(i)`:
   - If `i >= n` and `t.size() == 4`: join `t` with `.` and add to `ans`.
   - If `i >= n` or `t.size() >= 4`: prune invalid branch.
   - For length $1$ to $3$ (from index `i` to `j < min(i + 3, n)`):
     - Incrementally accumulate integer value `x = x * 10 + digit`.
     - Check constraints:
       - `x > 255` -> break (subsequent longer substrings will be even larger).
       - Leading zero: `s[i] == '0' && i != j` -> break (cannot extend a multi-digit segment starting with `'0'`).
     - Add `s.substring(i, j + 1)` to `t`, recurse `dfs(j + 1)`, then backtrack `t.remove(last)`.
3. Return `ans`.

---

## Dry Run

For `s = "25525511135"`:
- Octet 1 tries `"2"`, `"25"`, `"255"`.
- Under `"255"`:
  - Octet 2 tries `"255"`.
  - Octet 3 tries `"1"`, `"11"`, `"111"`.
    - If `"11"`: Octet 4 is `"135"` (valid, $\le 255$) -> `"255.255.11.135"`.
    - If `"111"`: Octet 4 is `"35"` (valid) -> `"255.255.111.35"`.
Results captured cleanly.

---

## Complexity Analysis

- **Time Complexity:** $O(3^4) = O(81) = O(1)$ — Depth is strictly bounded by 4 octets with at most 3 choices each.
- **Space Complexity:** $O(1)$ — Depth of recursion tree is at most 4.

---

## Available Solutions

Only verified solution files present in this folder are listed below:

| Language | Solution File |
| :--- | :--- |
| **Java** | [93restore-ip-addresses.java](./93restore-ip-addresses.java) |

---

## Key Learnings

- Pruning branches early (when `x > 255` or leading zeros occur) keeps search tree operations minimal.
- Backtracking with strict segment count bounding guarantees clean termination.
