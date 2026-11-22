---
comments: true
difficulty: Medium
tags:
  - String
  - Stack
  - Depth-First Search
---

# 385. Mini Parser

**[View Problem on LeetCode](https://leetcode.com/problems/mini-parser/)**

| Attribute | Details |
| :--- | :--- |
| **Problem ID** | `0385` (`385`) |
| **Difficulty** | Medium |
| **Topics / Tags** | `String`, `Stack`, `Depth-First Search` |
| **Solution Language** | Java |

---

## Problem Description

Given a string s represents the serialization of a nested list, implement a parser to deserialize it and return *the deserialized* `NestedInteger`.

Each element is either an integer or a list whose elements may also be integers or other lists.

---

## Examples

### Example 1

```text
**Input:** s = "324"
**Output:** 324
**Explanation:** You should return a NestedInteger object which contains a single integer 324.
```

### Example 2

```text
**Input:** s = "[123,[456,[789]]]"
**Output:** [123,[456,[789]]]
**Explanation:** Return a NestedInteger object containing a nested list with 2 elements:
1. An integer containing value 123.
2. A nested list containing two elements:
    i.  An integer containing value 456.
    ii. A nested list with one element:
         a. An integer containing value 789
```

 

**

---

## Constraints

**

	
- `1 <= s.length <= 5 * 10^4`
	
- `s` consists of digits, square brackets `"[]"`, negative sign `'-'`, and commas `','`.
	
- `s` is the serialization of valid `NestedInteger`.
	
- All the values in the input are in the range `[-10^6, 10^6]`.

---

## Problem Understanding

- Parse a serialized nested list string (e.g. `"[123,[456,[789]]]"`) into a `NestedInteger` structure.

---

## Approach

### Optimized Approach (Iterative Stack Parser)
1. If `s` does not start with `'['`, parse and return a single `NestedInteger`.
2. Scan `s`: push a new `NestedInteger()` on `'['`, accumulate signed integer `x` on `'-'` / digits, and on `','` or `']'` flush any parsed number into `stk.peek()`.
3. On `']'` with `stk.size() > 1`, pop the completed list and attach it to its parent `stk.peek()`.

---

## Complexity Analysis

- **Time Complexity:** $O(n)$.\n- **Space Complexity:** $O(d)$ where $d$ is maximum nesting depth.

---

## Available Solutions

Only verified solution files present in this folder are listed below:

| Language | Solution File |
| :--- | :--- |
| **Java** | [385mini-parser.java](./385mini-parser.java) |

---

## Key Learnings

- Checking `Character.isDigit(s.charAt(i - 1))` cleanly distinguishes empty lists `[]` from lists ending with a number.
