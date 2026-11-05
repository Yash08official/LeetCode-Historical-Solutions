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

# 315. Count of Smaller Numbers After Self

**[View Problem on LeetCode](https://leetcode.com/problems/count-of-smaller-numbers-after-self/)**

| Attribute | Details |
| :--- | :--- |
| **Problem ID** | `0315` (`315`) |
| **Difficulty** | Hard |
| **Topics / Tags** | `Array`, `Binary Search`, `Divide and Conquer`, `Binary Indexed Tree`, `Segment Tree`, `Merge Sort`, `Ordered Set`, `Treap` |
| **Solution Language** | Java |

---

## Problem Description

Given an integer array `nums`, return a list `counts` of the same length where `counts[i]` equals the number of elements to the right of index `i` (`j > i`) that are strictly smaller than `nums[i]` (`nums[j] < nums[i]`).

---

## Examples

### Example 1

```text
Input: nums = [5,2,6,1]
Output: [2,1,1,0]
Explanation:
To the right of 5 there are 2 smaller elements (2 and 1).
To the right of 2 there is only 1 smaller element (1).
To the right of 6 there is 1 smaller element (1).
To the right of 1 there is 0 smaller element.
```

### Example 2

```text
Input: nums = [-1]
Output: [0]
```

### Example 3

```text
Input: nums = [-1,-1]
Output: [0,0]
```

---

## Constraints

- `1 <= nums.length <= 10^5`

- `-10^4 <= nums[i] <= 10^4`

---

## Problem Understanding

- For each `i`, we only care about elements at indices `j > i`. Scanning `nums` from **right to left** means that at step `i`, the set of elements already visited is precisely the suffix `nums[i + 1 .. n - 1]`.
- Thus, at each step `i` during a right-to-left scan, we need two dynamic operations on the multiset of visited values: (1) count how many visited values are strictly less than `nums[i]`, and (2) insert `nums[i]` into the visited multiset.
- Since `-10^4 <= nums[i] <= 10^4` (and `nums.length <= 10^5`), values can be negative, so coordinate compression maps unique values cleanly to positive `1`-based Fenwick Tree indices.

---

## Approach

### Brute Force Approach

Checking every pair `(i, j)` with `i < j` using two nested loops counts `nums[j] < nums[i]` directly, but takes `O(n^2)` time—up to `5 * 10^9` comparisons for `n = 10^5`, resulting in Time Limit Exceeded.

### Optimized Approach

Discretize (coordinate-compress) the unique values of `nums` into `1`-based ranks `1..m`, then sweep `nums` from right to left using a Binary Indexed Tree (Fenwick Tree) to query prefix frequency `tree.query(x - 1)` and increment frequency `tree.update(x, 1)`.

### Step-by-Step Thinking Process

1. Collect all distinct integers from `nums` into `HashSet<Integer> s`, sort them in ascending list `alls`, and map each value to its `1`-based rank (`1 .. alls.size()`) in `HashMap<Integer, Integer> m`.
2. Instantiate `BinaryIndexedTree tree = new BinaryIndexedTree(alls.size())` initialized to all zeros, representing frequencies of seen ranks.
3. Use `LinkedList<Integer> ans = new LinkedList<>()` so right-to-left results can be prepended in `O(1)` via `ans.addFirst(...)`.
4. Iterate `i` from `nums.length - 1` down to `0`: look up `x = m.get(nums[i])`, call `tree.update(x, 1)` to record `nums[i]`, and query `tree.query(x - 1)` (sum of frequencies of ranks `1 .. x - 1`, i.e., strictly smaller elements already seen to the right).
5. Note that updating rank `x` before querying `x - 1` is completely safe because `query(x - 1)` strictly excludes index `x`!

### Algorithm / Intuition

Coordinate compression preserves strict inequality (`a < b` iff `rank(a) < rank(b)`) while shrinking arbitrary integers (including negatives) into compact `1`-based indices `1..n` required by `lowbit(x) = x & -x` in a Fenwick Tree. As we sweep leftward, `c[]` inside `BinaryIndexedTree` maintains frequency counts of all right-hand elements, letting `query(x - 1)` sum all strictly smaller ranks in `O(log n)` time.

---

## Dry Run

Tracing **Example 1** (`nums = [5, 2, 6, 1]`):

- Sorted unique values `alls = [1, 2, 5, 6]` -> ranks `m = {1: 1, 2: 2, 5: 3, 6: 4}`.
- Sweep right-to-left (`tree` tracks frequencies of ranks `1..4`):
  - `i = 3` (`nums[3] = 1`, `x = 1`): `update(1, 1)`, `query(0) = 0` -> `ans = [0]`.
  - `i = 2` (`nums[2] = 6`, `x = 4`): `update(4, 1)`, `query(3) = 1` (rank `1` seen) -> `ans = [1, 0]`.
  - `i = 1` (`nums[1] = 2`, `x = 2`): `update(2, 1)`, `query(1) = 1` (rank `1` seen) -> `ans = [1, 1, 0]`.
  - `i = 0` (`nums[0] = 5`, `x = 3`): `update(3, 1)`, `query(2) = 2` (ranks `1, 2` seen) -> `ans = [2, 1, 1, 0]`.
- Returns `[2, 1, 1, 0]`.

---

## Complexity Analysis

- **Time Complexity:** `O(n log n)` — Sorting up to `n` unique elements takes `O(n log n)`, and each of the `n` right-to-left iterations performs one `O(1)` map lookup plus one `O(log n)` Fenwick update and query.
- **Space Complexity:** `O(n)` — `Set s`, `List alls`, `Map m`, Fenwick array `c`, and output `LinkedList ans` each hold up to `n` entries.

---

## Available Solutions

Only verified solution files present in this folder are listed below:

| Language | Solution File |
| :--- | :--- |
| **Java** | [315count-of-smaller-numbers-after-self.java](./315count-of-smaller-numbers-after-self.java) |

---

## Key Learnings

- Right-to-left sweeping converts 2D suffix dominance queries (`j > i` and `nums[j] < nums[i]`) into 1D dynamic prefix-sum queries.
- Coordinate compression (`1`-based rank mapping) makes Fenwick Trees work seamlessly on negative or sparse integer domains.
- `LinkedList.addFirst(...)` builds reversed sweep outputs in `O(1)` per element without needing `Collections.reverse(...)`.
