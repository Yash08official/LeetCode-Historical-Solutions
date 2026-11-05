---
comments: true
difficulty: Medium
tags:
  - Array
  - Hash Table
  - Simulation
---

# 3160. Find the Number of Distinct Colors Among the Balls

**[View Problem on LeetCode](https://leetcode.com/problems/find-the-number-of-distinct-colors-among-the-balls/)**

| Attribute | Details |
| :--- | :--- |
| **Problem ID** | `3160` (`3160`) |
| **Difficulty** | Medium |
| **Topics / Tags** | `Array`, `Hash Table`, `Simulation` |
| **Solution Language** | Java |

---

## Problem Description

We are given an integer `limit` and a 2D array `queries` of size `m x 2`. There are `limit + 1` balls numbered `0` to `limit`, all initially uncolored. In each query `queries[i] = [x, y]`, ball `x` is assigned color `y` (overwriting any previous color it had).

After applying each query, we must find the total number of distinct colors present among all currently colored balls. We return an array `ans` of length `m` containing the result after each query.

---

## Examples

### Example 1

**Input:** `limit = 4, queries = [[1,4],[2,5],[1,3],[3,4]]`

**Output:** `[1,2,2,3]`

**Explanation:**

- After query 0, ball 1 has color 4.

- After query 1, ball 1 has color 4, and ball 2 has color 5.

- After query 2, ball 1 has color 3, and ball 2 has color 5.

- After query 3, ball 1 has color 3, ball 2 has color 5, and ball 3 has color 4.

### Example 2

**Input:** `limit = 4, queries = [[0,1],[1,2],[2,2],[3,4],[4,5]]`

**Output:** `[1,2,2,3,4]`

**Explanation:**

- After query 0, ball 0 has color 1.

- After query 1, ball 0 has color 1, and ball 1 has color 2.

- After query 2, ball 0 has color 1, and balls 1 and 2 have color 2.

- After query 3, ball 0 has color 1, balls 1 and 2 have color 2, and ball 3 has color 4.

- After query 4, ball 0 has color 1, balls 1 and 2 have color 2, ball 3 has color 4, and ball 4 has color 5.

---

## Constraints

- `1 <= limit <= 10^9`

- `1 <= n == queries.length <= 10^5`

- `queries[i].length == 2`

- `0 <= queries[i][0] <= limit`

- `1 <= queries[i][1] <= 10^9`

---

## Problem Understanding

State management and constraints:
- `limit` can be up to `10^9`, so we CANNOT allocate an array of size `limit + 1` (which would trigger Out Of Memory error).
- `queries.length` is at most `10^5`, meaning at most `10^5` distinct balls will ever be colored.
- This requires sparse data structures (hash maps) rather than arrays.
- We need to track:
  1. The current color of each colored ball (`ball -> color`).
  2. The frequency of each active color (`color -> count of balls with this color`).
- When a ball changes color, its old color's count decreases by 1 (and if it drops to 0, that color is completely gone and removed from the active color set), while the new color's count increases by 1.
- The number of distinct colors at any moment is simply the number of entries in the active color frequency map.

---

## Approach

### Brute Force Approach

After every query, scan all previously colored balls, insert their colors into a set, and take the set's size. For `m` queries, scanning up to `m` colored balls takes `O(m^2)` time, which times out for `m = 10^5`.

### Optimized Approach

We use two hash maps:
- `Map<Integer, Integer> g`: records the current color of each ball (`ball -> color`).
- `Map<Integer, Integer> cnt`: records the number of balls currently holding each color (`color -> count`).
For each query `[x, y]`:
1. Increment the frequency of the new color `y` in `cnt` via `cnt.merge(y, 1, Integer::sum)`.
2. If ball `x` was already colored (`g.containsKey(x)`):
   - Decrement the count of its previous color `g.get(x)` in `cnt`.
   - If that count reaches 0, remove the color entry from `cnt`.
3. Update `g.put(x, y)`.
4. Record `ans[i] = cnt.size()`.

### Step-by-Step Thinking Process

1. We need the count of distinct active colors after each query.
2. `limit <= 10^9` rules out direct-address arrays.
3. Use a hash map `g` to track which ball has which color.
4. Use another hash map `cnt` to track the frequency of each color currently on the table.
5. Whenever a ball's color changes, update both maps. If an old color's count drops to 0, remove it so `cnt.size()` accurately reflects the number of distinct active colors.
6. Each map operation is `O(1)` on average, giving `O(m)` total time.

### Algorithm / Intuition

The algorithm manages color reference counts:
1. Allocate `Map<Integer, Integer> g = new HashMap<>()` and `Map<Integer, Integer> cnt = new HashMap<>()`.
2. Allocate `ans = new int[m]`.
3. For `i = 0` to `m - 1`:
   - Let `x = queries[i][0]`, `y = queries[i][1]`.
   - `cnt.merge(y, 1, Integer::sum)`: register addition of color `y`.
   - If `g.containsKey(x)`: fetch old color `prev = g.get(x)`. Decrement its count using `cnt.merge(prev, -1, Integer::sum)`. If result is 0, remove `prev` from `cnt`.
   - Record new color `g.put(x, y)`.
   - `ans[i] = cnt.size()`.
4. Return `ans`.

---

## Dry Run

Trace on Example 1: `limit = 4, queries = [[1,4],[2,5],[1,3],[3,4]]`

- Query 0: `[1, 4]` (Ball 1 colored 4)
  - `cnt` adds color 4: `{4: 1}`.
  - Ball 1 had no previous color.
  - `g` records `1 -> 4`.
  - `ans[0] = cnt.size() = 1`.
- Query 1: `[2, 5]` (Ball 2 colored 5)
  - `cnt` adds color 5: `{4: 1, 5: 1}`.
  - Ball 2 had no previous color.
  - `g` records `2 -> 5`.
  - `ans[1] = cnt.size() = 2`.
- Query 2: `[1, 3]` (Ball 1 recolored to 3)
  - `cnt` adds color 3: `{4: 1, 5: 1, 3: 1}`.
  - Ball 1 was color 4: `cnt[4]` decrements from 1 to 0 -> removed from `cnt`.
  - `cnt` is now `{5: 1, 3: 1}`.
  - `g` updates `1 -> 3`.
  - `ans[2] = cnt.size() = 2`.
- Query 3: `[3, 4]` (Ball 3 colored 4)
  - `cnt` adds color 4: `{5: 1, 3: 1, 4: 1}`.
  - Ball 3 had no previous color.
  - `g` records `3 -> 4`.
  - `ans[3] = cnt.size() = 3`.
- Return `[1, 2, 2, 3]`, matching Example 1.

---

## Complexity Analysis

- **Time Complexity:** O(m) — Where m = queries.length. Each query performs a constant number of hash map lookups, insertions, and deletions, taking O(1) amortized time per query.
- **Space Complexity:** O(m) — Storing at most m ball-to-color mappings in `g` and at most m color-to-count mappings in `cnt`.

---

## Available Solutions

Only verified solution files present in this folder are listed below:

| Language | Solution File |
| :--- | :--- |
| **Java** | [3160find-the-number-of-distinct-colors-among-the-balls.java](./3160find-the-number-of-distinct-colors-among-the-balls.java) |

---

## Key Learnings

- When coordinate ranges are large (`limit <= 10^9`) but the number of operations is small (`m <= 10^5`), hash maps provide memory-safe sparse representation.
- Maintaining frequency counts alongside element states enables `O(1)` distinct count tracking without scanning sets.
- Using `Map.merge()` with `Integer::sum` provides concise and thread-safe idiomatic Java frequency management.
