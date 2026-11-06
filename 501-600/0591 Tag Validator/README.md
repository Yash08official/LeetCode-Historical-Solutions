---
comments: true
difficulty: Hard
tags:
  - String
  - Stack
---

# 591. Tag Validator

**[View Problem on LeetCode](https://leetcode.com/problems/tag-validator/)**

| Attribute | Details |
| :--- | :--- |
| **Problem ID** | `0591` (`591`) |
| **Difficulty** | Hard |
| **Topics / Tags** | `String`, `Stack` |
| **Solution Language** | Java |

---

## Problem Description

Given a string representing a code snippet, implement a tag validator to parse the code and return whether it is valid.

A code snippet is valid if all the following rules hold:
1. The code must be wrapped in a **valid closed tag**. Otherwise, the code is invalid.
2. A **closed tag** has the format `<TAG_NAME>TAG_CONTENT</TAG_NAME>`. The `TAG_NAME` in start and end tags must match.
3. A **valid `TAG_NAME`** only contains **uppercase letters** and has length in range `[1, 9]`.
4. A **valid `TAG_CONTENT`** may contain other closed tags, cdata, and any characters except unmatched `<`, unmatched tags, or closed tags with invalid `TAG_NAME`.
5. CDATA has the format `<![CDATA[CDATA_CONTENT]]>`. `CDATA_CONTENT` may contain any characters.
6. The entire code must be enclosed by a single root tag (no content outside the outer enclosing tag).

---

## Examples

### Example 1

```text
Input: code = "<DIV>This is the first line <![CDATA[<div>]]></DIV>"
Output: true
Explanation:
The code is wrapped in a closed tag: <DIV> and </DIV>.
The TAG_NAME is valid, the TAG_CONTENT contains some text and valid CDATA.
Hence the code is valid.
```

### Example 2

```text
Input: code = "<DIV>>>  ![cdata[]] <![CDATA[<div>]>]]>]]>>]</DIV>"
Output: true
```

### Example 3

```text
Input: code = "<A>  <B> </A>   </B>"
Output: false
Explanation: Unbalanced. If <A> is closed, <B> must be unmatched, and vice versa.
```

---

## Constraints

- `1 <= code.length <= 500`
- `code` consists of English letters, digits, `'<'`, `'>'`, `'/'`, `'!'`, `'['`, `']'`, `'.'`, and `' '`.

---

## Problem Understanding

- The parser must enforce three main structural checks:
  1. **Single Root Tag Enclosure:** If the stack becomes empty before reaching the end of the string (`i > 0 && stk.isEmpty()`), return `false`.
  2. **CDATA Handling:** Any characters inside `<![CDATA[` up to the first `]]>` are raw text and can contain literal `<` or `>` characters without triggering tag validation.
  3. **Tag Name Constraints:** Tag names must be 1 to 9 characters long, containing strictly uppercase letters. End tags must match the most recently opened start tag on the stack.

---

## Approach

### Optimized Approach (Stack-Based Lexical Parsing)

1. Use a stack of strings `Deque<String> stk` to hold currently open tag names.
2. Iterate `i` through `code`:
   - If `i > 0 && stk.isEmpty()`, trailing characters exist outside the enclosing root tag $
ightarrow$ return `false`.
   - **CDATA Block (`<![CDATA[`):**
     - Fast-forward to the first occurrence of `]]>`. If not found, return `false`.
     - Advance index `i` past `]]>`.
   - **Closing Tag (`</`):**
     - Find next `>` after `i + 2`. If not found, return `false`.
     - Extract tag name $t$.
     - Verify $t$ via helper `check(t)` (length $1..9$, all uppercase).
     - Verify stack is non-empty and `stk.pop().equals(t)`.
   - **Opening Tag (`<`):**
     - Find next `>` after `i + 1`. If not found, return `false`.
     - Extract tag name $t$.
     - Verify $t$ via `check(t)`.
     - Push $t$ onto `stk`.
3. Return `stk.isEmpty()`.

### Step-by-Step Thinking Process

1. Check for premature stack clearance (`i > 0 && stk.isEmpty()`).
2. Order tag checks: `<![CDATA[` before `</` before `<`.
3. Validate tag length ($1 \le |t| \le 9$) and character class (`Character.isUpperCase`).
4. Ensure exact nesting with standard stack push/pop.

---

## Complexity Analysis

- **Time Complexity:** $O(n)$ — Where $n$ is the length of `code` ($n \le 500$). Each character is scanned a constant number of times during substring matching.
- **Space Complexity:** $O(n)$ — Stack space for tag names in deeply nested tags.

---

## Available Solutions

Only verified solution files present in this folder are listed below:

| Language | Solution File |
| :--- | :--- |
| **Java** | [591tag-validator.java](./591tag-validator.java) |

---

## Key Learnings

- Order of prefix matching is critical: check `<![CDATA[` and `</` before general `<` tags.
- Verifying single root enclosing scope is easily guaranteed by asserting `!stk.isEmpty()` whenever `i > 0`.
