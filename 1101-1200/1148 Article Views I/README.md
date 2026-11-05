---
comments: true
difficulty: Easy
tags:
  - Database
---

# 1148. Article Views I

**[View Problem on LeetCode](https://leetcode.com/problems/article-views-i/)**

| Attribute | Details |
| :--- | :--- |
| **Problem ID** | `1148` (`1148`) |
| **Difficulty** | Easy |
| **Topics / Tags** | `Database` |
| **Solution Language** | SQL (MySQL) |

---

## Problem Description

You are given a `Views` table with columns `article_id`, `author_id`, `viewer_id`, and `view_date`. The table has no primary key and may contain duplicate rows. Each row records a view event on an article, and `author_id = viewer_id` indicates that the author viewed their own article.

Find all authors who viewed **at least one** of their own articles. Return a single-column table `id` sorted in **ascending** order.

---

## Examples

### Example 1

```text
Input:
Views table:
+------------+-----------+-----------+------------+
| article_id | author_id | viewer_id | view_date  |
+------------+-----------+-----------+------------+
| 1          | 3         | 5         | 2019-08-01 |
| 1          | 3         | 6         | 2019-08-02 |
| 2          | 7         | 7         | 2019-08-01 |
| 2          | 7         | 6         | 2019-08-02 |
| 4          | 7         | 1         | 2019-07-22 |
| 3          | 4         | 4         | 2019-07-21 |
| 3          | 4         | 4         | 2019-07-21 |
+------------+-----------+-----------+------------+
Output:
+------+
| id   |
+------+
| 4    |
| 7    |
+------+
```

---

## Constraints

_No explicit numeric constraints listed on LeetCode (see problem specification / schema rules above)._

---

## Problem Understanding

- **Self-View Condition:** An author viewed their own article whenever `author_id = viewer_id` on at least one row.
- **Duplicate Handling:** Because `Views` lacks a primary key (exact duplicate rows exist, as shown with author `4` in Example 1) and an author may view multiple self-authored articles, we must deduplicate `author_id`.
- **Explicit Ordering:** Unlike many SQL problems that accept any order, this problem strictly requires `ORDER BY id ASC`.

---

## Approach

### Brute Force Approach

Using `WHERE author_id IN (SELECT viewer_id FROM Views v2 WHERE v2.article_id = Views.article_id ...)` or joining `Views` against itself to check self-views is unnecessarily convoluted because each row already stores both `author_id` and `viewer_id` side by side.

### Optimized Approach

Filter rows with `where author_id = viewer_id`, deduplicate using `group by author_id`, alias `author_id as id`, and sort ascending with `order by author_id asc`.

### Step-by-Step Thinking Process

1. Keep only self-view events using `where author_id = viewer_id`.
2. Collapse duplicate occurrences of the same author with `group by author_id`.
3. Project `author_id as id` to satisfy the required output column name.
4. Sort the unique IDs in increasing order via `order by author_id asc`.

### Algorithm / Intuition

The query scans `Views` once to apply the predicate `author_id = viewer_id`, discarding views made by other readers. Then `group by author_id` acts identically to `SELECT DISTINCT author_id`, collapsing repeated self-views into one row per qualifying author. Finally, `order by author_id asc` sorts the deduplicated author IDs from smallest to largest.

---

## Dry Run

Using **Example 1**:

1. **Filter `where author_id = viewer_id`:**
   - `(1, 3, 5, ...)` -> `3 != 5` (discarded)
   - `(1, 3, 6, ...)` -> `3 != 6` (discarded)
   - `(2, 7, 7, '2019-08-01')` -> `7 = 7` (**kept**)
   - `(2, 7, 6, ...)` -> `7 != 6` (discarded)
   - `(4, 7, 1, ...)` -> `7 != 1` (discarded)
   - `(3, 4, 4, '2019-07-21')` -> `4 = 4` (**kept**)
   - `(3, 4, 4, '2019-07-21')` -> `4 = 4` (**kept**)
2. **`group by author_id`:** Collapses `[7, 4, 4]` into unique groups `{7, 4}`.
3. **`order by author_id asc`:** Sorts `{7, 4}` into `[4, 7]`, returned under column alias `id`.

---

## Complexity Analysis

- **Time Complexity:** `O(n + k log k)` — Scanning `n` rows and deduplicating `k` qualifying authors (`k <= n`) takes `O(n)` time, and sorting the `k` unique IDs takes `O(k log k)` time.
- **Space Complexity:** `O(k)` — Storing the `k` distinct qualifying `author_id` values for grouping and sorting.

---

## Available Solutions

Only verified solution files present in this folder are listed below:

| Language | Solution File |
| :--- | :--- |
| **SQL (MySQL)** | [1148article-views-i.sql](./1148article-views-i.sql) |

---

## Key Learnings

- When a table has no primary key, always account for duplicate rows using `GROUP BY` or `SELECT DISTINCT`.
- `GROUP BY col` with no aggregate functions produces the same deduplicated set as `SELECT DISTINCT col`.
- Pay close attention to explicit `ORDER BY` requirements in SQL problem specifications.
