---
comments: true
difficulty: Medium
tags:
  - Array
  - Binary Search
  - Sorting
---

# 2070. Most Beautiful Item for Each Query

**[View Problem on LeetCode](https://leetcode.com/problems/most-beautiful-item-for-each-query/)**

| Attribute | Details |
| :--- | :--- |
| **Problem ID** | `2070` (`2070`) |
| **Difficulty** | Medium |
| **Topics / Tags** | `Array`, `Binary Search`, `Sorting` |
| **Solution Language** | Java |

---

## Problem Description

You are given a 2D integer array `items`, where each entry `items[i] = [price_i, beauty_i]` represents the cost and beauty score of an item. Multiple items may share the same price or beauty score.

You are also given a **0-indexed** integer array `queries`. For each budget `queries[j]`, your goal is to find the **maximum beauty** among all items whose price is less than or equal to `queries[j]`. If every item costs more than `queries[j]`, the result for that query is `0`.

Return an integer array `answer` of length `queries.length` where `answer[j]` stores the maximum achievable beauty for `queries[j]`.

---

## Examples

### Example 1

```text
Input: items = [[1,2],[3,2],[2,4],[5,6],[3,5]], queries = [1,2,3,4,5,6]
Output: [2,4,5,5,6,6]
Explanation:
- For queries[0]=1, [1,2] is the only item which has price <= 1. Hence, the answer for this query is 2.
- For queries[1]=2, the items which can be considered are [1,2] and [2,4].
  The maximum beauty among them is 4.
- For queries[2]=3 and queries[3]=4, the items which can be considered are [1,2], [3,2], [2,4], and [3,5].
  The maximum beauty among them is 5.
- For queries[4]=5 and queries[5]=6, all items can be considered.
  Hence, the answer for them is the maximum beauty of all items, i.e., 6.
```

### Example 2

```text
Input: items = [[1,2],[1,2],[1,3],[1,4]], queries = [1]
Output: [4]
Explanation:
The price of every item is equal to 1, so we choose the item with the maximum beauty 4.
Note that multiple items can have the same price and/or beauty.
```

### Example 3

```text
Input: items = [[10,1000]], queries = [5]
Output: [0]
Explanation:
No item has a price less than or equal to 5, so no item can be chosen.
Hence, the answer to the query is 0.
```

---

## Constraints

- `1 <= items.length, queries.length <= 10^5`

- `items[i].length == 2`

- `1 <= price_i, beauty_i, queries[j] <= 10^9`

---

## Problem Understanding

- **Monotonicity of Budget vs. Beauty:** If an item is affordable under budget `B`, it is also affordable under any larger budget `B' >= B`. Therefore, once items are ordered by ascending price, the best beauty achievable up to index `k` is simply the prefix maximum of beauties across indices `0..k`.
- **Independent Queries:** Each query only asks for the rightmost item whose price does not exceed `queries[j]`. Because prices are sorted, this boundary can be located using binary search rather than scanning all items.
- **Edge Cases:**
  - `queries[j]` is smaller than the minimum item price: no item qualifies, so the answer must be `0`.
  - Multiple items have identical prices: only the largest beauty among all items with `price <= queries[j]` matters.
  - `items.length` and `queries.length` can both reach `10^5`, requiring an `O((n + m) log n)` or `O(n log n + m log m)` solution.

---

## Approach

### Brute Force Approach

For each query `queries[j]`, scan the entire `items` array from start to finish, checking whether `items[i][0] <= queries[j]` and tracking the maximum `items[i][1]` seen. With `n` items and `m` queries up to `10^5`, scanning `n` items per query takes `O(n * m)` time (`~10^10` operations), which exceeds the time limit.

### Optimized Approach

Sort `items` by ascending price, compute prefix maximum beauties in-place while extracting sorted prices into a `prices` array, and answer each query using binary search (`Arrays.binarySearch`) to locate the last item with `price <= queries[i]`.

### Step-by-Step Thinking Process

1. Observe that scanning all items per query repeats work because affordability depends solely on `price <= queries[i]`.
2. Sort `items` in non-decreasing order of price so that all affordable items for any budget form a contiguous prefix of `items`.
3. Transform `items[i][1]` into the prefix maximum beauty `max(items[0][1], ..., items[i][1])` and copy sorted prices into a 1D array `prices` for fast searching.
4. For each query `queries[i]`, binary search in `prices` for `queries[i] + 1` to find the cutoff index `j` of the rightmost item with price at most `queries[i]`, returning `0` if `j < 0` or `items[j][1]` otherwise.

### Algorithm / Intuition

In `maximumBeauty`, we first sort `items` by price via `Arrays.sort(items, (a, b) -> a[0] - b[0])` (safe from overflow here since `1 <= price_i <= 10^9`). Next, we populate `int[] prices = new int[n]` with `items[i][0]` and update `items[i][1] = Math.max(items[i - 1][1], items[i][1])`. After this preprocessing pass, `items[j][1]` holds the maximum beauty among the cheapest `j + 1` items.

To process `queries[i]`, the code calls `Arrays.binarySearch(prices, queries[i] + 1)`:
- If `queries[i] + 1` is **not** in `prices`, `binarySearch` returns `-(insertionPoint) - 1` (a negative value), where `insertionPoint` is the first index with `prices[idx] > queries[i]`. Evaluating `-j - 2` yields `insertionPoint - 1`, which is the exact rightmost index with `prices[j] <= queries[i]`.
- If `queries[i] + 1` **is** found at index `j`, subtracting `1` gives `j - 1`. (Note: if `queries[i] + 1` appears multiple times in `prices`, `Arrays.binarySearch` returns an arbitrary matching index rather than strictly the first; deduplicating equal prices or writing a custom upper-bound binary search guarantees landing before the first occurrence in all distributions.)
- Finally, if `j < 0`, no item has `price <= queries[i]`, so `ans[i] = 0`; otherwise `ans[i] = items[j][1]`.

---

## Dry Run

Trace on **Example 1**: `items = [[1,2],[3,2],[2,4],[5,6],[3,5]]`, `queries = [1,2,3,4,5,6]`.

1. **Sort `items` by price:**
   `items = [[1,2], [2,4], [3,2], [3,5], [5,6]]`
2. **Build `prices` and in-place prefix max beauty:**
   - `i = 0`: `prices[0] = 1`, `items[0][1] = 2`
   - `i = 1`: `prices[1] = 2`, `items[1][1] = max(2, 4) = 4`
   - `i = 2`: `prices[2] = 3`, `items[2][1] = max(4, 2) = 4`
   - `i = 3`: `prices[3] = 3`, `items[3][1] = max(4, 5) = 5`
   - `i = 4`: `prices[4] = 5`, `items[4][1] = max(5, 6) = 6`
   Now `prices = [1, 2, 3, 3, 5]` and prefix beauties in `items[*][1]` are `[2, 4, 4, 5, 6]`.
3. **Answer queries:**

| `i` | `queries[i]` | Search Target (`queries[i] + 1`) | Raw `binarySearch` | Adjusted `j` | `ans[i]` |
| :--- | :--- | :--- | :--- | :--- | :--- |
| `0` | `1` | `2` | `1` (found at idx `1`) | `1 - 1 = 0` | `items[0][1] = 2` |
| `1` | `2` | `3` | `2` (found at mid idx `2`) | `2 - 1 = 1` | `items[1][1] = 4` |
| `2` | `3` | `4` | `-5` (`insertionPoint = 4`) | `-(-5) - 2 = 3` | `items[3][1] = 5` |
| `3` | `4` | `5` | `4` (found at idx `4`) | `4 - 1 = 3` | `items[3][1] = 5` |
| `4` | `5` | `6` | `-6` (`insertionPoint = 5`) | `-(-6) - 2 = 4` | `items[4][1] = 6` |
| `5` | `6` | `7` | `-6` (`insertionPoint = 5`) | `-(-6) - 2 = 4` | `items[4][1] = 6` |

Final returned array: `ans = [2, 4, 5, 5, 6, 6]`.

---

## Complexity Analysis

- **Time Complexity:** `O((n + m) log n)` — Sorting the `n` items takes `O(n log n)`, computing prefix maximums takes `O(n)`, and running `m` binary searches over `prices` takes `O(m log n)`.
- **Space Complexity:** `O(n)` — Excluding the output array `ans` of size `m`, the `prices` array uses `O(n)` space and sorting `items` uses up to `O(n)` auxiliary space in Java's TimSort.

---

## Available Solutions

Only verified solution files present in this folder are listed below:

| Language | Solution File |
| :--- | :--- |
| **Java** | [2070most-beautiful-item-for-each-query.java](./2070most-beautiful-item-for-each-query.java) |

---

## Key Learnings

- Sorting combined with prefix maximums turns arbitrary 2D dominance queries (`price <= Q`, maximize `beauty`) into 1D binary searches.
- Be cautious with `Arrays.binarySearch` when duplicate keys exist: because it does not guarantee returning the leftmost occurrence of `queries[i] + 1`, writing a dedicated `upperBound` binary search (or collapsing duplicate prices to their max beauty first) is safer in general.
- Prefer `Integer.compare(a[0], b[0])` over `a[0] - b[0]` when array values can be negative to prevent signed 32-bit integer overflow.
