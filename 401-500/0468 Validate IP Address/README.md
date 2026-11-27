---
comments: true
difficulty: Medium
tags:
  - String
---

# 468. Validate IP Address

**[View Problem on LeetCode](https://leetcode.com/problems/validate-ip-address/)**

| Attribute | Details |
| :--- | :--- |
| **Problem ID** | `0468` (`468`) |
| **Difficulty** | Medium |
| **Topics / Tags** | `String` |
| **Solution Language** | Java |

---

## Problem Description

Given a string `queryIP`, return `"IPv4"` if IP is a valid IPv4 address, `"IPv6"` if IP is a valid IPv6 address or `"Neither"` if IP is not a correct IP of any type.

**A valid IPv4** address is an IP in the form `"x1.x2.x3.x4"` where `0 <= xi <= 255` and `xi` **cannot contain** leading zeros. For example, `"192.168.1.1"` and `"192.168.1.0"` are valid IPv4 addresses while `"192.168.01.1"`, `"192.168.1.00"`, and `"192.168@1.1"` are invalid IPv4 addresses.

**A valid IPv6** address is an IP in the form `"x1:x2:x3:x4:x5:x6:x7:x8"` where:

	- `1 <= xi.length <= 4`

	- `xi` is a **hexadecimal string** which may contain digits, lowercase English letter (`'a'` to `'f'`) and upper-case English letters (`'A'` to `'F'`).

	- Leading zeros are allowed in `xi`.

For example, "`2001:0db8:85a3:0000:0000:8a2e:0370:7334"` and "`2001:db8:85a3:0:0:8A2E:0370:7334"` are valid IPv6 addresses, while "`2001:0db8:85a3::8A2E:037j:7334"` and "`02001:0db8:85a3:0000:0000:8a2e:0370:7334"` are invalid IPv6 addresses.

---

## Examples

### Example 1

```
Input: queryIP = "172.16.254.1"
Output: "IPv4"
Explanation: This is a valid IPv4 address, return "IPv4".
```

### Example 2

```
Input: queryIP = "2001:0db8:85a3:0:0:8A2E:0370:7334"
Output: "IPv6"
Explanation: This is a valid IPv6 address, return "IPv6".
```

### Example 3

```
Input: queryIP = "256.256.256.256"
Output: "Neither"
Explanation: This is neither a IPv4 address nor a IPv6 address.
```

 

**

---

## Constraints

**

	- `queryIP` consists only of English letters, digits and the characters `'.'` and `':'`.

---

## Problem Understanding

- Given a string `queryIP`, return `"IPv4"` if it is a valid IPv4 address (4 decimal octets `0..255` with no leading zeros), `"IPv6"` if it is a valid IPv6 address (8 hexadecimal groups of 1–4 hex digits), or `"Neither"` otherwise.

---

## Approach

### Optimized Approach (Dedicated IPv4 & IPv6 Structural Validators)
1. **`isIPv4(s)`:** Reject trailing `'.'`, split by `"\\."`, verify exactly 4 parts, reject empty parts or multi-digit parts starting with `'0'`, and parse digits strictly via `convert(t)` ensuring `0 <= x <= 255`.
2. **`isIPv6(s)`:** Reject trailing `':'`, split by `":"`, verify exactly 8 parts, verify each part has length `1..4`, and confirm every character is in `[0-9a-fA-F]`.
3. Return `"IPv4"`, `"IPv6"`, or `"Neither"` accordingly.

---

## Complexity Analysis

- **Time Complexity:** $O(n)$ where $n = \text{queryIP.length()}$.
- **Space Complexity:** $O(n)$ for the split token arrays.

---

## Available Solutions

Only verified solution files present in this folder are listed below:

| Language | Solution File |
| :--- | :--- |
| **Java** | [468validate-ip-address.java](./468validate-ip-address.java) |

---

## Key Learnings

- Checking for trailing delimiters (`endsWith(".")` / `endsWith(":")`) prevents Java's `String.split` from silently dropping trailing empty tokens.
