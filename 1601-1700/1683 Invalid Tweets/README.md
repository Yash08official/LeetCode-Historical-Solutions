---
comments: true
difficulty: Easy
tags:
  - Database
---

# 1683. Invalid Tweets

**[View Problem on LeetCode](https://leetcode.com/problems/invalid-tweets/)**

| Attribute | Details |
| :--- | :--- |
| **Problem ID** | `1683` (`1683`) |
| **Difficulty** | Easy |
| **Topics / Tags** | `Database` |
| **Solution Language** | SQL (MySQL) |

---

## Problem Description

You are given a `Tweets` table with columns `tweet_id` (primary key `int`) and `content` (`varchar` containing alphanumeric characters, `'!'`, and `' '`). A tweet is considered **invalid** if its `content` has **strictly more than `15` characters**. Write a SQL query to return the `tweet_id` of all invalid tweets in any order.

---

## Examples

### Example 1

```text
Input:
Tweets table:
+----------+-----------------------------------+
| tweet_id | content                           |
+----------+-----------------------------------+
| 1        | Let us Code                       |
| 2        | More than fifteen chars are here! |
+----------+-----------------------------------+
Output:
+----------+
| tweet_id |
+----------+
| 2        |
+----------+
Explanation:
Tweet 1 has length = 11. It is a valid tweet.
Tweet 2 has length = 33. It is an invalid tweet.
```

---

## Constraints

_No explicit numeric constraints listed on LeetCode (see problem specification / schema rules above)._

---

## Problem Understanding

- 'Strictly greater than `15`' translates to `> 15` (a tweet of exact length `15` is **valid** and must be excluded).
- In MySQL, `CHAR_LENGTH(str)` measures the **number of characters**, whereas `LENGTH(str)` measures the **number of bytes** (which differs for multi-byte UTF-8 characters).

---

## Approach

### Brute Force Approach

Retrieving both `tweet_id` and `content` for every tweet into client code just to check `.length > 15` transfers full text payloads across the network instead of letting the database filter rows down to integer IDs.

### Optimized Approach

Select `tweet_id` from `Tweets` using `WHERE CHAR_LENGTH(content) > 15`.

### Step-by-Step Thinking Process

1. Target the `Tweets` table and project only the required `tweet_id` column.
2. Use `CHAR_LENGTH(content)` to count characters accurately.
3. Filter rows with strict inequality `> 15`.

### Algorithm / Intuition

The query scans `Tweets`, computes `CHAR_LENGTH(content)` for each row, and emits `tweet_id` whenever the character count is `16` or higher.

---

## Dry Run

Tracing Example 1 (`Tweets`):

| `tweet_id` | `content` | `CHAR_LENGTH(content)` | `> 15`? | Output? |
| :--- | :--- | :--- | :--- | :--- |
| `1` | `'Let us Code'` | `11` | False | No |
| `2` | `'More than fifteen chars are here!'` | `33` | **True** | **Yes (`2`)** |

Result table contains `tweet_id = 2`.

---

## Complexity Analysis

- **Time Complexity:** `O(N * L)` — Scans `N` rows in `Tweets`, inspecting string metadata/characters up to length `L`.
- **Space Complexity:** `O(1)` — Evaluates each row statelessly with constant working memory.

---

## Available Solutions

Only verified solution files present in this folder are listed below:

| Language | Solution File |
| :--- | :--- |
| **SQL (MySQL)** | [1683invalid-tweets.sql](./1683invalid-tweets.sql) |

---

## Key Learnings

- Prefer `CHAR_LENGTH()` over `LENGTH()` in MySQL whenever specifications refer to character counts rather than byte size, as UTF-8 characters can occupy 1 to 4 bytes.
- Pay close attention to boundary wording: 'strictly greater than 15' means `> 15`, not `>= 15`.
