---
comments: true
difficulty: Easy
tags:
  - Database
---

# 1517. Find Users With Valid E-Mails

**[View Problem on LeetCode](https://leetcode.com/problems/find-users-with-valid-e-mails/)**

| Attribute | Details |
| :--- | :--- |
| **Problem ID** | `1517` (`1517`) |
| **Difficulty** | Easy |
| **Topics / Tags** | `Database` |
| **Solution Language** | SQL (MySQL) |

---

## Problem Description

You are given a `Users` table with columns `user_id` (`int`, primary key), `name` (`varchar`), and `mail` (`varchar`).

Write a SQL query to select all rows whose `mail` column is a **valid e-mail**, defined by two rules:
1. **Prefix (before `'@'`)**: Must begin with an English letter (`a-z` or `A-Z`), followed by zero or more characters from letters (`a-z`, `A-Z`), digits (`0-9`), underscore (`'_'`), period (`'.'`), or dash (`'-'`).
2. **Domain**: Must be **exact** `'@leetcode.com'` in lowercase.

Return the matching rows in any order.

---

## Examples

### Example 1

```text
Input:
Users table:
+---------+-----------+-------------------------+
| user_id | name      | mail                    |
+---------+-----------+-------------------------+
| 1       | Winston   | winston@leetcode.com    |
| 2       | Jonathan  | jonathanisgreat         |
| 3       | Annabelle | bella-@leetcode.com     |
| 4       | Sally     | sally.come@leetcode.com |
| 5       | Marwan    | quarz#2020@leetcode.com |
| 6       | David     | david69@gmail.com       |
| 7       | Shapiro   | .shapo@leetcode.com     |
+---------+-----------+-------------------------+
Output:
+---------+-----------+-------------------------+
| user_id | name      | mail                    |
+---------+-----------+-------------------------+
| 1       | Winston   | winston@leetcode.com    |
| 3       | Annabelle | bella-@leetcode.com     |
| 4       | Sally     | sally.come@leetcode.com |
+---------+-----------+-------------------------+
Explanation:
The mail of user 2 does not have a domain.
The mail of user 5 has the # sign which is not allowed.
The mail of user 6 does not have the leetcode domain.
The mail of user 7 starts with a period.
```

---

## Constraints

_No explicit numeric constraints listed on LeetCode (see problem specification / schema rules above)._

---

## Problem Understanding

Every piece of the email specification translates to a strict boundary condition:
- Using unanchored matching would accept garbage prefixes before a letter or trailing text after `.com` (e.g., `'.shapo@leetcode.com'` or `'winston@leetcode.com.org'`), so both `^` (start of string) and `$` (end of string) anchors are mandatory.
- In regular expressions, an unescaped `.` matches **any** character (which would wrongly match `'winston@leetcodeXcom'`), so the dot inside `@leetcode.com` must be escaped or wrapped in `[.]`.
- Inside a character class `[...]`, `-` defines a character range unless placed at the very start or very end of the brackets.

---

## Approach

### Brute Force Approach

Attempting to validate emails using standard SQL string functions (`LIKE`, `LOCATE('@', mail)`, `LEFT`, `RIGHT`) cannot cleanly verify that *every* variable-length character in the prefix belongs solely to `{letters, digits, '_', '.', '-'}` without unwieldy character-by-character checks.

### Optimized Approach

The query filters `Users` using MySQL's **`REGEXP` regular expression operator**:
```sql
WHERE mail REGEXP '^[a-zA-Z][a-zA-Z0-9_.-]*@leetcode[.]com$'
```
Every component of the pattern enforces one rule of the specification in a single table scan.

### Step-by-Step Thinking Process

1. Anchor the start of `mail` with `^[a-zA-Z]` so the very first character must be an uppercase or lowercase letter.
2. Follow with `[a-zA-Z0-9_.-]*` to allow zero or more letters, digits, underscores, periods, or literal hyphens (placing `-` at the end of `[...]` prevents range interpretation).
3. Match the domain `@leetcode[.]com$`, wrapping `.` in `[.]` so it matches only a literal period and `$` so nothing follows `com`.
4. Select all columns (`SELECT *`) from `Users` matching the `WHERE mail REGEXP ...` predicate.

### Algorithm / Intuition

Breaking down `'^[a-zA-Z][a-zA-Z0-9_.-]*@leetcode[.]com$'`:
- `^`: start of the `mail` string.
- `[a-zA-Z]`: mandatory leading letter (rejects `'.shapo@leetcode.com'` and `'123@leetcode.com'`).
- `[a-zA-Z0-9_.-]*`: zero or more valid prefix characters (rejects `'quarz#2020@leetcode.com'` because `'#'` is excluded).
- `@leetcode[.]com`: exact domain with literal dot `[.]` (rejects `'jonathanisgreat'` and `'david69@gmail.com'`).
- `$`: end of the `mail` string.

---

## Dry Run

Trace on **Example 1** (`Users` table):

| `user_id` | `mail` | Regex Evaluation | Included? |
| :--- | :--- | :--- | :--- |
| `1` | `winston@leetcode.com` | Starts with `'w'`, valid prefix, ends with `@leetcode.com` | **Yes** |
| `2` | `jonathanisgreat` | Missing `@leetcode[.]com$` | No |
| `3` | `bella-@leetcode.com` | Starts with `'b'`, `'ella-'` matches `[a-zA-Z0-9_.-]*`, valid domain | **Yes** |
| `4` | `sally.come@leetcode.com` | Starts with `'s'`, `'ally.come'` matches `[a-zA-Z0-9_.-]*`, valid domain | **Yes** |
| `5` | `quarz#2020@leetcode.com` | `'#'` fails `[a-zA-Z0-9_.-]*` | No |
| `6` | `david69@gmail.com` | Domain `@gmail.com` fails `@leetcode[.]com$` | No |
| `7` | `.shapo@leetcode.com` | Leading `'.'` fails `^[a-zA-Z]` | No |

Outputs rows for `user_id` `1`, `3`, and `4`.

---

## Complexity Analysis

- **Time Complexity:** `O(N * L)` — Scans `N` rows in `Users`, evaluating a deterministic linear-time regular expression across each email string of length `L`.
- **Space Complexity:** `O(1)` auxiliary space — Each row is tested independently in constant memory (excluding the returned result set).

---

## Available Solutions

Only verified solution files present in this folder are listed below:

| Language | Solution File |
| :--- | :--- |
| **SQL (MySQL)** | [1517find-users-with-valid-e-mails.sql](./1517find-users-with-valid-e-mails.sql) |

---

## Key Learnings

- Always escape `.` (via `[.]` or `\\.`) inside SQL regex domain patterns — an unescaped `.` is a wildcard matching any character!
- Place `-` at the very end (or very beginning) of a regex bracket expression `[a-zA-Z0-9_.-]` so it matches a literal hyphen instead of forming an unintended ASCII range.
- In MySQL 8.0+ where default collations are case-insensitive (`utf8mb4_0900_ai_ci`), `REGEXP_LIKE(mail, '^[a-zA-Z][a-zA-Z0-9_.-]*@leetcode[.]com$', 'c')` (with match-type `'c'`) enforces strict lowercase matching on `@leetcode.com`.
