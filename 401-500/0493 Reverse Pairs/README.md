---
comments: true
difficulty: Hard
tags:
  - Array
  - Binary Search
  - Divide and Conquer
  - Binary Indexed Tree
  - Segment Tree
  - Merge Sort
  - Ordered Set
  - Treap
---

# 493. Reverse Pairs

**[View Problem on LeetCode](https://leetcode.com/problems/reverse-pairs/)**

| Attribute | Details |
| :--- | :--- |
| **Problem ID** | `0493` (`493`) |
| **Difficulty** | Hard |
| **Topics / Tags** | `Array`, `Binary Search`, `Divide and Conquer`, `Binary Indexed Tree`, `Segment Tree`, `Merge Sort`, `Ordered Set`, `Treap` |
| **Solution Language** | Java |

---

## Problem Description

Given an integer array `nums`, return the total number of **reverse pairs** `(i, j)` in the array.

A pair of indices `(i, j)` is a **reverse pair** if:
1. `0 <= i < j < nums.length`, and
2. `nums[i] > 2 * nums[j]`.

---

## Examples

### Example 1

```text
Input: nums = [1,3,2,3,1]
Output: 2
Explanation: The reverse pairs are:
(1, 4) --> nums[1] = 3, nums[4] = 1, 3 > 2 * 1
(3, 4) --> nums[3] = 3, nums[4] = 1, 3 > 2 * 1
```

### Example 2

```text
Input: nums = [2,4,3,5,1]
Output: 3
Explanation: The reverse pairs are:
(1, 4) --> nums[1] = 4, nums[4] = 1, 4 > 2 * 1
(2, 4) --> nums[2] = 3, nums[4] = 1, 3 > 2 * 1
(3, 4) --> nums[3] = 5, nums[4] = 1, 5 > 2 * 1
```

---

## Constraints

- `1 <= nums.length <= 5 * 10^4`

- `-2^31 <= nums[i] <= 2^31 - 1`

---

## Problem Understanding

- **Why standard inversion count needs care:** Unlike standard inversions (`nums[i] > nums[j]`), here we compare `nums[i]` against `2 * nums[j]`, which may not even be an element of `nums`!
- **32-bit overflow hazard:** Because `-2^31 <= nums[j] <= 2^31 - 1`, multiplying `2 * nums[j]` in 32-bit `int` arithmetic will overflow whenever `|nums[j]| > 2^30`. Promoting both `nums[i]` and `2L * nums[j]` to `long` is mandatory.
- **Coordinate compression (`Discretization`):** Values span `[-2^32, 2^32 - 2]`, which is too wide to index directly in a Segment Tree array, but there are at most `2 * nums.length <= 10^5` distinct values among all `nums[k]` and `2L * nums[k]` combined!

---

## Approach

### Brute Force Approach

Checking every pair `(i, j)` with `0 <= i < j < n` via two nested loops and testing `(long) nums[i] > 2L * nums[j]` takes `O(n^2)` time.

For `n = 5 * 10^4`, `n * (n - 1) / 2` is roughly `1.25 * 10^9` comparisons, exceeding the time limit.

### Optimized Approach

Use **Coordinate Compression (`TreeSet` + `HashMap`) + Point-Update Range-Sum `SegmentTree`**: discretize all `nums[k]` and `2L * nums[k]` values into ranks `1..M`, then scan `nums` from right to left, querying the count of already-visited `2 * nums[j]` values with rank `< rank(nums[i])` before inserting `rank(2 * nums[i])`.

### Step-by-Step Thinking Process

1. Collect every `(long) num` and `(long) num * 2` into a sorted `TreeSet<Long> ts` so both query thresholds and inserted doubled values live in the same rank space.
2. Assign 1-based contiguous integer ranks `1 .. ts.size()` in `HashMap<Long, Integer> m`.
3. Build a sum `SegmentTree` over `[1, m.size()]` initialized to all zeros.
4. Iterate `i` backward from `nums.length - 1` down to `0` so that at step `i`, the segment tree contains `2 * nums[j]` for every index `j > i`.
5. Look up `x = m.get((long) nums[i])`, add `tree.query(1, 1, x - 1)` (the count of `j > i` with `2 * nums[j] < nums[i]`) to `ans`, and record the current element's doubled rank via `tree.modify(1, m.get((long) nums[i] * 2), 1)`.

### Algorithm / Intuition

In `reversePairs(int[] nums)`:
- Including **both** `(long) num` and `(long) num * 2` in `ts` makes range queries effortless: `nums[i] > 2 * nums[j]` holds if and only if `rank(2 * nums[j]) <= rank(nums[i]) - 1` (`x - 1`).
- Scanning right-to-left (`for (int i = nums.length - 1; i >= 0; --i)`) naturally enforces `j > i`: every element already added to `tree` sits strictly to the right of `i`.
- `SegmentTree` allocates `Node[4 * n]` (where `n = m.size() <= 2 * nums.length`), supporting `modify` (point increment `+1`) and `query` (prefix sum `[1, x - 1]`) in `O(log n)` time per element.

---

## Dry Run

Tracing **Example 1** with `nums = [1, 3, 2, 3, 1]`:

1. **Coordinate Compression:**
   - `ts` collects `{1, 2, 3, 4, 6}`.
   - Rank map `m`: `{1: 1, 2: 2, 3: 3, 4: 4, 6: 5}` (`m.size() = 5`).
2. **Right-to-Left Scan:**

| Index `i` | `nums[i]` | Rank `x = m.get(nums[i])` | `query(1, 1, x - 1)` | `ans` | `modify` Rank `m.get(2 * nums[i])` | Tree Counts `[r1..r5]` |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| `4` | `1` | `1` | `query(1, 1, 0) -> 0` | `0` | `m.get(2) = 2` (`+1`) | `[0, 1, 0, 0, 0]` |
| `3` | `3` | `3` | `query(1, 1, 2) -> 1` | `1` | `m.get(6) = 5` (`+1`) | `[0, 1, 0, 0, 1]` |
| `2` | `2` | `2` | `query(1, 1, 1) -> 0` | `1` | `m.get(4) = 4` (`+1`) | `[0, 1, 0, 1, 1]` |
| `1` | `3` | `3` | `query(1, 1, 2) -> 1` | `2` | `m.get(6) = 5` (`+1`) | `[0, 1, 0, 1, 2]` |
| `0` | `1` | `1` | `query(1, 1, 0) -> 0` | `2` | `m.get(2) = 2` (`+1`) | `[0, 2, 0, 1, 2]` |

Returns `ans = 2`.

---

## Complexity Analysis

- **Time Complexity:** `O(n log n)` — Inserting `2n` values into `TreeSet` takes `O(n log n)`, building the `SegmentTree` over `M <= 2n` ranks takes `O(n)`, and `n` `query`/`modify` pairs each run in `O(log n)` time.
- **Space Complexity:** `O(n)` — `ts`, `m`, and the `4 * M` `SegmentTree` array (`M <= 2n`) all use `O(n)` memory.

---

## Available Solutions

Only verified solution files present in this folder are listed below:

| Language | Solution File |
| :--- | :--- |
| **Java** | [493reverse-pairs.java](./493reverse-pairs.java) |

---

## Key Learnings

- Putting both `x` and `2 * x` into the coordinate-compression set avoids awkward binary searches for successor/predecessor ranks during range queries.
- Generalized inversion problems (`i < j` and `f(nums[i]) > g(nums[j])`) always reduce cleanly to sweeping in one direction while maintaining `g(nums[j])` in a Segment Tree or Fenwick Tree (BIT).
- Divide-and-conquer Merge Sort is another `O(n log n)` alternative with lower constant factors if you want to avoid building an explicit tree structure.
