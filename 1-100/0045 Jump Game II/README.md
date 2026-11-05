---
comments: true
difficulty: Medium
tags:
  - Array
  - Dynamic Programming
  - Greedy
---

# 45. Jump Game II

**[View Problem on LeetCode](https://leetcode.com/problems/jump-game-ii/)**

| Attribute | Details |
| :--- | :--- |
| **Problem ID** | `0045` (`45`) |
| **Difficulty** | Medium |
| **Topics / Tags** | `Array`, `Dynamic Programming`, `Greedy` |
| **Solution Language** | Java |

---

## Problem Description

You are given a **0-indexed** integer array `nums` of length `n`, starting at index `0`. Each element `nums[i]` specifies the maximum forward jump length from index `i`—meaning from `i` you may jump to any index `i + j` satisfying `0 <= j <= nums[i]` and `i + j < n`.

Return the **minimum number of jumps** required to reach the last index `n - 1`. It is guaranteed that index `n - 1` is always reachable.

---

## Examples

### Example 1

```text
Input: nums = [2,3,1,1,4]
Output: 2
Explanation: The minimum number of jumps to reach the last index is 2. Jump 1 step from index 0 to 1, then 3 steps to the last index.
```

### Example 2

```text
Input: nums = [2,3,0,1,4]
Output: 2
```

---

## Constraints

- `1 <= nums.length <= 10^4`

- `0 <= nums[i] <= 1000`

- It's guaranteed that you can reach `nums[n - 1]`.

---

## Problem Understanding

- **Single-Element Base Case:** When `n == 1`, you start at index `n - 1 = 0`, so `0` jumps are needed.
- **Reachability Layers (Implicit BFS):** Jump `0` covers `[0, 0]`. Jump `1` covers all indices `[1, nums[0]]`. In general, jump `k + 1` covers all new indices reachable in one jump from any index inside jump `k`'s range.
- **Stop at `n - 2`:** Because we only count jumps *departing* toward `n - 1`, iterating up to `nums.length - 2` ensures we never take an unnecessary extra jump once we land on `n - 1`.

---

## Approach

### Brute Force Approach

A naive recursive or dynamic programming solution computes `dp[i] = 1 + min(dp[i + 1 .. min(n - 1, i + nums[i])])` for every index `i` from `n - 2` down to `0`. Because `nums[i]` can be up to `1000` and `n` up to `10^4`, scanning all reachable neighbors per index takes `O(n * max(nums[i]))` (up to `O(n^2)`) time and `O(n)` space.

### Optimized Approach

Use a **greedy single-pass implicit BFS**: maintain `last` (the rightmost index reachable with the current number of jumps `ans`) and `mx` (the farthest index reachable by taking one additional jump from any position scanned so far). Whenever the loop index `i` reaches `last`, increment `ans` and advance `last = mx`.

### Step-by-Step Thinking Process

1. View the problem as finding the shortest path in an unweighted directed graph, where each jump corresponds to one BFS level.
2. Notice that because jump ranges are contiguous intervals, each BFS level is simply a contiguous index segment `[prevLast + 1 .. last]`.
3. While scanning `i` across the current segment, track the farthest point reachable in the *next* jump via `mx = Math.max(mx, i + nums[i])`.
4. When `i == last`, we have finished inspecting every launchpad in the current jump level and must commit to one jump (`++ans`) to extend our horizon to `last = mx`.
5. Loop `i` only up to `nums.length - 2` (`i < nums.length - 1`): if `last` happened to equal `n - 1`, stopping before `i = n - 1` avoids counting a jump *out* of the destination.

### Algorithm / Intuition

In `jump(int[] nums)`, three scalar integers track the greedy state:
- `ans`: minimum jumps committed so far (starts at `0`).
- `last`: the right boundary of the current jump's reach (starts at `0`, representing our initial standing position at index `0`).
- `mx`: the farthest index reachable from any index in `0..i` (starts at `0`).

For each `i` from `0` to `nums.length - 2`:
1. `mx = Math.max(mx, i + nums[i])` updates the farthest horizon reachable on the next jump.
2. `if (last == i)` detects that we have reached the end of our current jump's range without yet passing `n - 2`. We increment `++ans` and expand the active range boundary to `last = mx`.

If `nums.length == 1`, the loop `i < 0` never executes and `ans = 0` is returned immediately.

---

## Dry Run

**Input:** `nums = [2, 3, 1, 1, 4]` (`nums.length = 5`, loop runs for `i = 0, 1, 2, 3`)

- **Initial State:** `ans = 0`, `mx = 0`, `last = 0`

| `i` | `nums[i]` | `i + nums[i]` | Updated `mx` | `last == i`? | Updated `ans` | Updated `last` |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| `0` | `2` | `0 + 2 = 2` | `max(0, 2) = 2` | `0 == 0` (`true`) | `1` | `2` |
| `1` | `3` | `1 + 3 = 4` | `max(2, 4) = 4` | `2 == 1` (`false`) | `1` | `2` |
| `2` | `1` | `2 + 1 = 3` | `max(4, 3) = 4` | `2 == 2` (`true`) | `2` | `4` |
| `3` | `1` | `3 + 1 = 4` | `max(4, 4) = 4` | `4 == 3` (`false`) | `2` | `4` |

- Loop terminates (`i = 4` is not `< 4`).
- **Output:** `2`

---

## Complexity Analysis

- **Time Complexity:** `O(n)` — We traverse `nums` from index `0` to `n - 2` in a single pass, performing `O(1)` arithmetic and comparisons per element.
- **Space Complexity:** `O(1)` — Only three integer variables (`ans`, `mx`, `last`) and loop counter `i` are used.

---

## Available Solutions

Only verified solution files present in this folder are listed below:

| Language | Solution File |
| :--- | :--- |
| **Java** | [45jump-game-ii.java](./45jump-game-ii.java) |

---

## Key Learnings

- Contiguous reachability problems on arrays often allow collapsing an `O(n)`-space BFS queue into two boundary pointers (`last` and `mx`) for an `O(1)`-space greedy scan.
- Stopping the loop at `nums.length - 2` (`i < nums.length - 1`) cleanly handles both `n == 1` (`0` jumps) and cases where `last` lands squarely on `n - 1`.
- We never need to explicitly record *which* index achieved `mx`; knowing the maximum reach `mx` across the entire current window is sufficient to count jumps.
