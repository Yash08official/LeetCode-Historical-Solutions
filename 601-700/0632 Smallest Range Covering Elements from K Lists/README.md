---
comments: true
difficulty: Hard
tags:
  - Array
  - Hash Table
  - Greedy
  - Sliding Window
  - Sorting
  - Heap (Priority Queue)
---

# 632. Smallest Range Covering Elements from K Lists

**[View Problem on LeetCode](https://leetcode.com/problems/smallest-range-covering-elements-from-k-lists/)**

| Attribute | Details |
| :--- | :--- |
| **Problem ID** | `0632` (`632`) |
| **Difficulty** | Hard |
| **Topics / Tags** | `Array`, `Hash Table`, `Greedy`, `Sliding Window`, `Sorting`, `Heap (Priority Queue)` |
| **Solution Language** | Java |

---

## Problem Description

You are given `k` lists of integers in `nums`, where each individual list is sorted in **non-decreasing order**. Find the **smallest closed range `[a, b]`** that contains **at least one number from every one** of the `k` lists.

Range `[a, b]` is considered smaller than `[c, d]` if its length is strictly shorter (`b - a < d - c`), or if they have the same length (`b - a == d - c`) and `a < c`.

---

## Examples

### Example 1

```text
Input: nums = [[4,10,15,24,26],[0,9,12,20],[5,18,22,30]]
Output: [20,24]
Explanation:
List 1: [4, 10, 15, 24,26], 24 is in range [20,24].
List 2: [0, 9, 12, 20], 20 is in range [20,24].
List 3: [5, 18, 22, 30], 22 is in range [20,24].
```

### Example 2

```text
Input: nums = [[1,2,3],[1,2,3],[1,2,3]]
Output: [1,1]
```

---

## Constraints

- `nums.length == k`

- `1 <= k <= 3500`

- `1 <= nums[i].length <= 50`

- `-10^5 <= nums[i][j] <= 10^5`

- `nums[i]` is sorted in **non-decreasing** order.

---

## Problem Understanding

- **Reduction to Sliding Window:** Suppose we tag every number `x` with which list `i` (`0 <= i < k`) it came from, and sort all `(x, i)` pairs globally by value `x`. Then any contiguous subarray of this merged list whose elements span from value `a` (leftmost) to value `b` (rightmost) defines the value range `[a, b]`!
- **Coverage Invariant:** A subarray in the sorted `(value, listIndex)` array is valid if and only if it contains **at least one element from all `k` distinct lists** — identical to the classic *Minimum Window Substring* problem.
- **Tie-Breaking:** Processing left-to-right naturally visits smaller `a` values earlier, and checking `b - a < ans[1] - ans[0]` (or `b - a == ans[1] - ans[0] && a < ans[0]`) enforces the exact tie-breaking rule.

---

## Approach

### Brute Force Approach

Checking every possible pair of values `(a, b)` present in the input as candidate range endpoints and verifying via binary search across all `k` lists whether each list has an element in `[a, b]` takes `O(N^2 * k log M)` time (where `N` is total elements and `M` is max list length), which times out when `N` reaches `1.75 * 10^5`.

### Optimized Approach

Flatten all elements into an `N x 2` array `t` of `[value, listIndex]` pairs, sort `t` globally by `value`, and run a **Two-Pointer Sliding Window** with a frequency `HashMap` `cnt` to find the narrowest window covering all `k` lists.

### Step-by-Step Thinking Process

1. Count the total number of elements `n` across all `k` lists and allocate `int[][] t = new int[n][2]`.
2. Populate `t` with pairs `{x, i}` where `x` is the integer value and `i` (`0 <= i < k`) is its source list index.
3. Sort `t` in ascending order of value `t[idx][0]`.
4. Maintain a sliding window `[j .. right]` over `t` and a `HashMap<Integer, Integer> cnt` mapping each list index present in the window to its frequency.
5. Expand the right endpoint `e = {b, v}`: increment `cnt` for list `v`. While `cnt.size() == k` (all `k` lists are covered), compare `[a, b]` (`a = t[j][0]`) against `ans`, update `ans` if smaller, and shrink from the left by decrementing `cnt` for `w = t[j][1]` (removing `w` when its count hits `0`) and advancing `j`.

### Algorithm / Intuition

By tagging every value with its origin list ID and sorting `t`, the `k`-list range problem becomes a 1D sliding window problem:
- `cnt.size()` equals the number of distinct lists currently represented inside `t[j .. current]`.
- Whenever `cnt.size() == k`, `[t[j][0], e[0]]` (`[a, b]`) is a valid range covering all `k` lists. Shrinking `j` rightward cannot make `b - a` larger — it only makes `a` larger (thus shrinking `b - a`) until one list loses its last representative in the window (`cnt.size() < k`).
- `int x = b - a - (ans[1] - ans[0])` computes the length difference safely (`ans` starts at `[-1000000, 1000000]`, span `2,000,000`, while `-10^5 <= a <= b <= 10^5` has max span `200,000`, so no 32-bit overflow occurs).

---

## Dry Run

Tracing Example 1: `nums = [[4,10,15,24,26], [0,9,12,20], [5,18,22,30]]` (`k = 3`):

1. **Sorted `t` (`(value, listId)`):**
   `(0,1), (4,0), (5,2), (9,1), (10,0), (12,1), (15,0), (18,2), (20,1), (22,2), (24,0), (26,0), (30,2)`.
2. **Sliding window highlights:**
   - Expand to `(5,2)`: window `[(0,1), (4,0), (5,2)]` covers `{0,1,2}` (`cnt.size() == 3`) -> `ans = [0, 5]` (len `5`), shrink `j` past `(0,1)`.
   - Next full coverage at `(9,1)`: window `[(4,0), (5,2), (9,1)]` -> `[4, 9]` (len `5`, `4 > 0` so keep `[0, 5]`), shrink `(4,0)`.
   - At `(18,2)`: shrinks down to `[(12,1), (15,0), (18,2)]` -> `[12, 18]` (len `6`, keep `[0, 5]`).
   - At `(20,1)`: shrinks to `[(15,0), (18,2), (20,1)]` -> `[15, 20]` (len `5 == 5`, `15 > 0`, so `ans` stays `[0, 5]`).
   - At `(24,0)`: window `[(18,2), (20,1), (22,2), (24,0)]` shrinks `(18,2)` (list `2` still has `(22,2)`!) -> window `[(20,1), (22,2), (24,0)]` has `[a, b] = [20, 24]` (len `4 < 5`!) -> **`ans = [20, 24]`**.
   - Remaining elements `[22, 26]` (missing list `1`) and `[26, 30]` never reach `cnt.size() == 3` again.
3. **Return:** `[20, 24]`.

---

## Complexity Analysis

- **Time Complexity:** `O(N log N)` — Let `N` be the total number of elements across all `k` lists. Building `t` takes `O(N)`, sorting `t` takes `O(N log N)`, and the sliding window advances both `e` and `j` at most `N` times with `O(1)` `HashMap` operations.
- **Space Complexity:** `O(N)` — The flattened array `t` stores `N` pairs (`O(N)` space), and the `HashMap` `cnt` holds at most `k <= N` entries.

---

## Available Solutions

Only verified solution files present in this folder are listed below:

| Language | Solution File |
| :--- | :--- |
| **Java** | [632smallest-range-covering-elements-from-k-lists.java](./632smallest-range-covering-elements-from-k-lists.java) |

---

## Key Learnings

- Merging `k` lists into `(value, listId)` pairs converts multi-list coverage problems directly into the standard 1D Minimum Window Substring template.
- Note on alternative optimization: because each input list is *already* sorted, a Min-Heap of size `k` tracking one pointer per list can solve this in `O(N log k)` time and `O(k)` space without flattening all `N` elements.
- Be careful with `Arrays.sort(t, (a, b) -> a[0] - b[0])`: here `-10^5 <= a[0], b[0] <= 10^5` cannot overflow `int`, whereas for arbitrary `int` ranges `Integer.compare(a[0], b[0])` prevents subtraction overflow.
