---
comments: true
difficulty: Medium
tags:
  - Array
  - Bit Manipulation
---

# 393. UTF-8 Validation

**[View Problem on LeetCode](https://leetcode.com/problems/utf-8-validation/)**

| Attribute | Details |
| :--- | :--- |
| **Problem ID** | `0393` (`393`) |
| **Difficulty** | Medium |
| **Topics / Tags** | `Array`, `Bit Manipulation` |
| **Solution Language** | Java |

---

## Problem Description

Given an integer array `data` representing the data, return whether it is a valid **UTF-8** encoding (i.e. it translates to a sequence of valid UTF-8 encoded characters).

A character in **UTF8** can be from **1 to 4 bytes** long, subjected to the following rules:

	
- For a **1-byte** character, the first bit is a `0`, followed by its Unicode code.
	
- For an **n-bytes** character, the first `n` bits are all one's, the `n + 1` bit is `0`, followed by `n - 1` bytes with the most significant `2` bits being `10`.

This is how the UTF-8 encoding would work:

```text
Number of Bytes   |        UTF-8 Octet Sequence
                       |              (binary)
   --------------------+-----------------------------------------
            1          |   0xxxxxxx
            2          |   110xxxxx 10xxxxxx
            3          |   1110xxxx 10xxxxxx 10xxxxxx
            4          |   11110xxx 10xxxxxx 10xxxxxx 10xxxxxx
```

`x` denotes a bit in the binary form of a byte that may be either `0` or `1`.

**Note: **The input is an array of integers. Only the **least significant 8 bits** of each integer is used to store the data. This means each integer represents only 1 byte of data.

---

## Examples

### Example 1

```text
**Input:** data = [197,130,1]
**Output:** true
**Explanation:** data represents the octet sequence: 11000101 10000010 00000001.
It is a valid utf-8 encoding for a 2-bytes character followed by a 1-byte character.
```

### Example 2

```text
**Input:** data = [235,140,4]
**Output:** false
**Explanation:** data represented the octet sequence: 11101011 10001100 00000100.
The first 3 bits are all one's and the 4th bit is 0 means it is a 3-bytes character.
The next byte is a continuation byte which starts with 10 and that's correct.
But the second continuation byte does not start with 10, so it is invalid.
```

 

**

---

## Constraints

**

	
- `1 <= data.length <= 2 * 10^4`
	
- `0 <= data[i] <= 255`

---

## Problem Understanding

- Validate whether an array of byte integers represents a valid UTF-8 encoded sequence.

---

## Approach

### Optimized Approach (Continuation-Byte State Machine)
1. Track `cnt` = expected trailing `10xxxxxx` continuation bytes.
2. When `cnt > 0`, verify `v >> 6 == 0b10` and decrement `cnt`.
3. When `cnt == 0`, inspect leading bit prefixes (`0`, `110`, `1110`, `11110`) to set `cnt = 0, 1, 2, 3` (reject anything else).
4. Valid iff `cnt == 0` at the end.

---

## Complexity Analysis

- **Time Complexity:** $O(n)$.\n- **Space Complexity:** $O(1)$.

---

## Available Solutions

Only verified solution files present in this folder are listed below:

| Language | Solution File |
| :--- | :--- |
| **Java** | [393utf-8-validation.java](./393utf-8-validation.java) |

---

## Key Learnings

- Bit-shifting right directly checks UTF-8 leading bit signatures without string formatting.
