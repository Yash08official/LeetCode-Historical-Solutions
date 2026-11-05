---
comments: true
difficulty: Easy
tags:
  - Array
  - Hash Table
  - Two Pointers
---

# 2570. Merge Two 2D Arrays by Summing Values

**[View Problem on LeetCode](https://leetcode.com/problems/merge-two-2d-arrays-by-summing-values/)**

| Attribute | Details |
| :--- | :--- |
| **Problem ID** | `2570` (`2570`) |
| **Difficulty** | Easy |
| **Topics / Tags** | `Array`, `Hash Table`, `Two Pointers` |
| **Solution Language** | Java |

---

## Problem Description

You are given two 2D integer arrays `nums1` and `nums2`.

Each array contains unique ids sorted in ascending order, where each element is a pair `[id_i, val_i]`.

Merge the two arrays into a single 2D array sorted in ascending order by id, following these rules:
1. Only include each unique id once in the result.
2. If an id appears in only one array, keep its original value.
3. If an id appears in both arrays, its value in the merged result should be the sum of its values in `nums1` and `nums2`.

Return the resulting merged 2D array.

---

## Examples

### Example 1

```text
Input: nums1 = [[1,2],[2,3],[4,5]], nums2 = [[1,4],[3,2],[4,1]]
Output: [[1,6],[2,3],[3,2],[4,6]]
Explanation: The resulting array contains the following:
- id = 1, the value of this id is 2 + 4 = 6.
- id = 2, the value of this id is 3.
- id = 3, the value of this id is 2.
- id = 4, the value of this id is 5 + 1 = 6.
```

### Example 2

```text
Input: nums1 = [[2,4],[3,6],[5,5]], nums2 = [[1,3],[4,3]]
Output: [[1,3],[2,4],[3,6],[4,3],[5,5]]
Explanation: There are no common ids, so we just include each id with its value in the resulting list.
```

---

## Constraints

- `1 <= nums1.length, nums2.length <= 200`

- `nums1[i].length == nums2[j].length == 2`

- `1 <= id_i, val_i <= 1000`

- Both arrays contain unique ids.

- Both arrays are in strictly ascending order by id.

---

## Problem Understanding

We have two lists of key-value pairs sorted by key. We need to perform an outer join and aggregate values by key (summing duplicates), returning the result sorted by key. Constraints state that each `id` is between 1 and 1000, and array lengths are $\le 200$. The small bound on `id` allows direct indexing into a fixed-size bucket array.

---

## Approach

### Brute Force Approach

Concatenate both arrays into a single list of size $n_1 + n_2$, sort them by ID using a general sorting algorithm ($O((n_1 + n_2) \log(n_1 + n_2))$), and then make a linear pass to merge pairs with identical IDs into a new list.

### Optimized Approach

Because the maximum possible ID is 1000, use a direct-addressed frequency array `int[] cnt = new int[1001]`. Traverse `nums1` and add `x[1]` to `cnt[x[0]]`. Traverse `nums2` and do the same. Count how many indices in `cnt` are positive to allocate the exact result array size `n`. Finally, iterate from `1` to `1000` to fill the resulting array `ans` in ascending order of `id`.

### Step-by-Step Thinking Process

1. We need to merge and sum values by ID while preserving sorted order of IDs.
2. Since $1 \le id_i \le 1000$, a direct lookup table (bucket array) of size 1001 can track the aggregated sum for each ID in $O(1)$ time.
3. First pass: add values from `nums1` to `cnt`.
4. Second pass: add values from `nums2` to `cnt`.
5. Third pass: count non-zero entries in `cnt` to allocate exact array dimension.
6. Fourth pass: construct and return `int[n][2]`.

### Algorithm / Intuition

The array `cnt` acts as a direct hash table where the array index corresponds to the ID. For each `[id, val]` in `nums1` and `nums2`, `cnt[x[0]] += x[1]` accumulates the sum. A quick loop over `cnt` counts how many distinct IDs were touched (`cnt[i] > 0`), determining `n`. We allocate `int[][] ans = new int[n][2]` and populate it sequentially from `i = 0` to `1000` wherever `cnt[i] > 0`. Because we traverse indices `i` in increasing numerical order, `ans` is naturally sorted by ID without an explicit sort step.

---

## Dry Run

Trace with Example 1: `nums1 = [[1,2],[2,3],[4,5]]`, `nums2 = [[1,4],[3,2],[4,1]]`.
- Initialize `cnt` of size 1001 with zeros.
- Process `nums1`:
  - `cnt[1] += 2` -> 2
  - `cnt[2] += 3` -> 3
  - `cnt[4] += 5` -> 5
- Process `nums2`:
  - `cnt[1] += 4` -> 6
  - `cnt[3] += 2` -> 2
  - `cnt[4] += 1` -> 6
- Count non-zero IDs: `cnt[1]=6`, `cnt[2]=3`, `cnt[3]=2`, `cnt[4]=6`. Distinct count `n = 4`.
- Build `ans`: `[[1, 6], [2, 3], [3, 2], [4, 6]]`.
Return `ans`.

---

## Complexity Analysis

- **Time Complexity:** `O(n1 + n2 + M)` where `n1` and `n2` are the lengths of `nums1` and `nums2`, and `M = 1001` is the fixed range of IDs. Since `M` is a constant ($1001$) and `n1, n2 <= 200`, the execution runs in virtually instantaneous $O(1)$ time.
- **Space Complexity:** `O(M)` = `O(1)` auxiliary space — The counting array `cnt` has a fixed size of 1001 regardless of input length.

---

## Available Solutions

Only verified solution files present in this folder are listed below:

| Language | Solution File |
| :--- | :--- |
| **Java** | [2570merge-two-2d-arrays-by-summing-values.java](./2570merge-two-2d-arrays-by-summing-values.java) |

---

## Key Learnings

- When key ranges are small and bounded (here $1 \le id \le 1000$), direct indexing (counting array / bucket sort idea) is faster and simpler than two pointers or hash maps.
- Traversing the counting array from smallest index to largest naturally produces sorted results without an explicit sorting phase.
- Counting distinct active keys beforehand allows exact 2D array allocation without intermediate dynamic lists.
