---
comments: true
difficulty: Easy
tags:
  - Database
---

# 1527. Patients With a Condition

**[View Problem on LeetCode](https://leetcode.com/problems/patients-with-a-condition/)**

| Attribute | Details |
| :--- | :--- |
| **Problem ID** | `1527` (`1527`) |
| **Difficulty** | Easy |
| **Topics / Tags** | `Database` |
| **Solution Language** | SQL (MySQL) |

---

## Problem Description

The `Patients` table records patient records in a hospital, containing `patient_id`, `patient_name`, and a space-separated list of medical diagnosis codes stored in `conditions`.

We are tasked with retrieving the `patient_id`, `patient_name`, and `conditions` for all patients diagnosed with Type I Diabetes. According to medical coding rules in this problem, any condition code representing Type I Diabetes always starts with the prefix `DIAB1`.

The result table can be returned in any order.

---

## Examples

### Example 1

```text
Input:
Patients table:
+------------+--------------+--------------+
| patient_id | patient_name | conditions   |
+------------+--------------+--------------+
| 1          | Daniel       | YFEV COUGH   |
| 2          | Alice        |              |
| 3          | Bob          | DIAB100 MYOP |
| 4          | George       | ACNE DIAB100 |
| 5          | Alain        | DIAB201      |
+------------+--------------+--------------+
Output:
+------------+--------------+--------------+
| patient_id | patient_name | conditions   |
+------------+--------------+--------------+
| 3          | Bob          | DIAB100 MYOP |
| 4          | George       | ACNE DIAB100 |
+------------+--------------+--------------+
Explanation: Bob and George both have a condition that starts with DIAB1.
```

---

## Constraints

_No explicit numeric constraints listed on LeetCode (see problem specification / schema rules above)._

---

## Problem Understanding

A patient can have zero, one, or multiple condition codes in the `conditions` column, separated by a single space.
A valid Type I Diabetes condition must start with the prefix `DIAB1` as an individual word. Specifically:
- It can appear at the very beginning of the `conditions` string (e.g., `'DIAB100 MYOP'`).
- It can appear after a space delimiter anywhere later in the string (e.g., `'ACNE DIAB100'`).
- Crucially, codes where `DIAB1` appears as an internal substring without being prefixed by a word boundary or space (e.g., `'SUDIAB100'`) must NOT match, because the disease code itself does not begin with `DIAB1`.

---

## Approach

### Brute Force Approach

A naive approach in an application layer would fetch every row from the `Patients` table into memory, split the `conditions` string by spaces into an array of individual condition tokens, and check if any token starts with `'DIAB1'`. In SQL, attempting a generic substring search like `conditions LIKE '%DIAB1%'` is incorrect because it matches words that have `DIAB1` in the middle (such as `'PREDIAB1'`), incorrectly classifying non-qualifying patients.

### Optimized Approach

Filter the rows directly in SQL using two pattern matching conditions combined with `OR`: `conditions LIKE 'DIAB1%'` captures diagnoses where the diabetes code is the first word in the list, and `conditions LIKE '% DIAB1%'` captures diagnoses where the diabetes code appears after a preceding space separator.

### Step-by-Step Thinking Process

1. Identify that condition codes are space-separated tokens within a single VARCHAR field.
2. Recognize the two valid positions for a code starting with 'DIAB1': either at index 1 of the string, or immediately preceded by a space character ' '.
3. Formulate the SQL pattern: `conditions LIKE 'DIAB1%'` matches the code if it begins the text.
4. Formulate the secondary SQL pattern: `conditions LIKE '% DIAB1%'` matches the code if it is preceded by a whitespace delimiter.
5. Combine both conditions using an `OR` clause in the `WHERE` filter and select `patient_id`, `patient_name`, and `conditions`.

### Algorithm / Intuition

In MySQL, the `LIKE` operator evaluates string pattern templates where `%` acts as a wildcard matching zero or more characters. By specifying `conditions LIKE 'DIAB1%'`, we ensure any string whose very first word starts with `DIAB1` is selected. By specifying `conditions LIKE '% DIAB1%'`, the leading space before `DIAB1` guarantees that `DIAB1` is the start of a distinct token rather than a suffix of another condition code (e.g., it will not match `'XDIAB1'`). Because MySQL pattern matching evaluates per row, this provides a clean, single-pass filtering mechanism.

---

## Dry Run

Let's trace Example 1 with `Patients` records:
- Row 1: `Daniel`, `conditions = 'YFEV COUGH'`
  - Does it start with `'DIAB1%'`? No.
  - Does it contain `'% DIAB1%'`? No. Row excluded.
- Row 2: `Alice`, `conditions = ''`
  - Neither pattern matches. Row excluded.
- Row 3: `Bob`, `conditions = 'DIAB100 MYOP'`
  - Matches `'DIAB1%'` because `'DIAB100'` is at the very beginning. Row included.
- Row 4: `George`, `conditions = 'ACNE DIAB100'`
  - Does not match `'DIAB1%'`, but matches `'% DIAB1%'` because `' DIAB100'` is preceded by a space. Row included.
- Row 5: `Alain`, `conditions = 'DIAB201'`
  - Starts with `'DIAB2'`, neither pattern matches. Row excluded.

Final result rows: `patient_id` 3 (`Bob`) and `patient_id` 4 (`George`).

---

## Complexity Analysis

- **Time Complexity:** `O(N * L)` where `N` is the number of rows in `Patients` and `L` is the maximum length of the `conditions` column. The database performs a full table scan, evaluating string matching on each row.
- **Space Complexity:** `O(N * L)` in the worst case to store and return the filtered result set; auxiliary database query execution requires `O(1)` additional memory.

---

## Available Solutions

Only verified solution files present in this folder are listed below:

| Language | Solution File |
| :--- | :--- |
| **SQL (MySQL)** | [1527patients-with-a-condition.sql](./1527patients-with-a-condition.sql) |

---

## Key Learnings

- When matching word prefixes in space-separated text fields, check both start-of-string (`'WORD%'`) and space-preceded (`'% WORD%'`) patterns.
- Avoid overly broad wildcards like `'%WORD%'` which inadvertently match mid-word substrings.
- Regular expressions (`REGEXP '\\bDIAB1'`) can also achieve this, but dual `LIKE` patterns are standard, fast, and portable across SQL engines.
