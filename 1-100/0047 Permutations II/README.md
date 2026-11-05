---
comments: true
difficulty: Medium
tags:
  - Array
  - Backtracking
  - Sorting
---

# 47. Permutations II

**[View Problem on LeetCode](https://leetcode.com/problems/permutations-ii/)**

| Attribute | Details |
| :--- | :--- |
| **Problem ID** | `0047` (`47`) |
| **Difficulty** | Medium |
| **Topics / Tags** | `Array`, `Backtracking`, `Sorting` |
| **Solution Language** | Java |

---

## Problem Description

Given an integer array `nums` that **may contain duplicate values**, return all possible **unique** permutations in any order.

---

## Examples

### Example 1

```text
Input: nums = [1,1,2]
Output:
[[1,1,2],
 [1,2,1],
 [2,1,1]]
```

### Example 2

```text
Input: nums = [1,2,3]
Output: [[1,2,3],[1,3,2],[2,1,3],[2,3,1],[3,1,2],[3,2,1]]
```

---

## Constraints

- `1 <= nums.length <= 8`

- `-10 <= nums[i] <= 10`

---

## Problem Understanding

- **Source of Duplicates:** If `nums = [1a, 1b, 2]` (where `1a` and `1b` are both `1`), standard index-based permutation generation treats `[1a, 1b, 2]` and `[1b, 1a, 2]` as distinct branches even though both produce `[1, 1, 2]`.
- **Canonical Ordering Among Equals:** Sorting `nums` places identical values adjacent to one another. If we enforce the rule that equal elements can only be added to a permutation in left-to-right index order (`nums[j]` can only be chosen after `nums[j - 1]` has already been chosen in the current branch), every unique multiset permutation is generated exactly once.
- **Small Input Size:** `1 <= nums.length <= 8` (`8! = 40,320`), making pruned backtracking fast and memory-friendly.

---

## Approach

### Brute Force Approach

One naive approach runs standard `O(n * n!)` permutation backtracking ignoring duplicates completely and inserts every generated `List<Integer>` into a `HashSet<List<Integer>>` to deduplicate at the end. When many elements are identical (for example, `[1, 1, 1, 1, 1, 1, 1, 2]`, which has only `8` unique permutations), unpruned recursion still explores all `8! = 40,320` leaf branches and hashes every list instead of pruning redundant subtrees at the root.

### Optimized Approach

Sort `nums` first so duplicate numbers sit side-by-side, then run **DFS Backtracking with Level-Duplicate Pruning**: skip index `j` whenever `vis[j]` is already `true` OR `j > 0 && nums[j] == nums[j - 1] && !vis[j - 1]`.

### Step-by-Step Thinking Process

1. Sort `nums` in ascending order (`Arrays.sort(nums)`) so any identical numbers become contiguous neighbors (`nums[j] == nums[j - 1]`).
2. Use the standard backtracking state: current slot `i`, partial permutation `t`, and visited index mask `boolean[] vis`.
3. At recursion level `i`, suppose `nums[j] == nums[j - 1]`. If `vis[j - 1]` is `false`, that means `nums[j - 1]` is *not* part of our current prefix `t`—in fact, `nums[j - 1]` was already tried as the choice for this exact slot `i` in an earlier iteration of the loop and backtracked!
4. Therefore, picking `nums[j]` at slot `i` when `!vis[j - 1]` would start an identical subtree with the exact same value at slot `i`. Skipping via `if (vis[j] || (j > 0 && nums[j] == nums[j - 1] && !vis[j - 1])) continue;` eliminates all duplicate permutations before they are ever explored.
5. Record `new ArrayList<>(t)` whenever `i == nums.length`.

### Algorithm / Intuition

In `permuteUnique(int[] nums)`, `Arrays.sort(nums)` groups equal numbers together in `O(n log n)` time. Inside `dfs(int i)`:
- Base case `i == nums.length` appends a copy `new ArrayList<>(t)` to `ans`.
- Loop `for (int j = 0; j < nums.length; ++j)` checks the combined guard:
  `if (vis[j] || (j > 0 && nums[j] == nums[j - 1] && !vis[j - 1])) continue;`
  - `vis[j]` prevents reusing the exact same array slot twice in one permutation.
  - `j > 0 && nums[j] == nums[j - 1] && !vis[j - 1]` enforces canonical index order among identical values: `nums[j]` is permitted in `t` **only** if `nums[j - 1]` is already active (`vis[j - 1] == true`) earlier in `t`.
- Valid candidates execute `t.add(nums[j])`, `vis[j] = true`, `dfs(i + 1)`, and then revert `vis[j] = false` and `t.remove(t.size() - 1)`.

---

## Dry Run

**Input:** `nums = [1, 1, 2]` (already sorted: `nums[0] = 1, nums[1] = 1, nums[2] = 2`)

1. `dfs(0)` (`vis = [F, F, F]`, `t = []`):
   - `j = 0` (`1`): valid -> `t = [1]`, `vis = [T, F, F]` -> calls `dfs(1)`:
     - `j = 0`: `vis[0]` is `T` -> skip.
     - `j = 1` (`1`): `nums[1] == nums[0]`, and `vis[0]` is `T` (`!vis[0]` is `false`) -> **allowed!** `t = [1, 1]`, `vis = [T, T, F]` -> `dfs(2)` picks `j = 2` (`2`) -> `dfs(3)` adds **`[1, 1, 2]`**.
     - `j = 2` (`2`): valid -> `t = [1, 2]`, `vis = [T, F, T]` -> `dfs(2)` picks `j = 1` (`1`) -> `dfs(3)` adds **`[1, 2, 1]`**.
   - Backtracks `j = 0` (`vis = [F, F, F]`, `t = []`).
   - `j = 1` (`1`): `j > 0 && nums[1] == nums[0] && !vis[0]` is **`true`**! **Pruned immediately** (skips entire duplicate subtree!).
   - `j = 2` (`2`): valid -> `t = [2]`, `vis = [F, F, T]` -> calls `dfs(1)`:
     - `j = 0` (`1`): valid -> `t = [2, 1]`, `vis = [T, F, T]` -> `dfs(2)` picks `j = 1` (`1`) -> `dfs(3)` adds **`[2, 1, 1]`**.
     - `j = 1` (`1`): after `j = 0` backtracks (`vis = [F, F, T]`), `!vis[0]` is `true` -> **pruned!**

**Output:** `[[1, 1, 2], [1, 2, 1], [2, 1, 1]]`

---

## Complexity Analysis

- **Time Complexity:** `O(n * n!)` in the worst case (when all `n` elements are distinct; initial sorting takes `O(n log n)`). More precisely, it runs in `O(n * U)` where `U = n! / (c1! * c2! * ...)` is the exact number of unique permutations, because dead duplicate subtrees are pruned immediately.
- **Space Complexity:** `O(n)` auxiliary space — Excluding the output list `ans`, recursion stack depth, `vis`, and `t` each use `O(n)` space.

---

## Available Solutions

Only verified solution files present in this folder are listed below:

| Language | Solution File |
| :--- | :--- |
| **Java** | [47permutations-ii.java](./47permutations-ii.java) |

---

## Key Learnings

- Sorting + `!vis[j - 1]` is the canonical pattern for pruning duplicate branches in permutation/multiset backtracking without allocating hash sets.
- Understand the difference between `!vis[j - 1]` and `vis[j - 1]`: both technically yield unique results, but `!vis[j - 1]` prunes at the *highest* possible level of the recursion tree (right when the first duplicate is attempted), whereas `vis[j - 1]` wastes work descending before failing deeper down.
- Pruning early transforms inputs with heavy repetition (such as `[1, 1, ..., 1]`) from `O(n!)` down to `O(n)`.
