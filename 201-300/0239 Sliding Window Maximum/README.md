---
comments: true
difficulty: Hard
tags:
  - Array
  - Queue
  - Sliding Window
  - Heap (Priority Queue)
  - Monotonic Queue
  - Range Minimum/Maximum Query
---

# 239. Sliding Window Maximum

**[View Problem on LeetCode](https://leetcode.com/problems/sliding-window-maximum/)**

| Attribute | Details |
| :--- | :--- |
| **Problem ID** | `0239` (`239`) |
| **Difficulty** | Hard |
| **Topics / Tags** | `Array`, `Queue`, `Sliding Window`, `Heap (Priority Queue)`, `Monotonic Queue`, `Range Minimum/Maximum Query` |
| **Solution Language** | Java |

---

## Problem Description

You are given an integer array `nums` and a window size `k`. A sliding window of length `k` starts at the leftmost `k` elements of `nums` and shifts one position to the right at each step until reaching the end of the array.

Return an integer array of length `nums.length - k + 1` containing the maximum value inside each consecutive window.

---

## Examples

### Example 1

```text
Input: nums = [1,3,-1,-3,5,3,6,7], k = 3
Output: [3,3,5,5,6,7]
Explanation:
Window position                Max
---------------               -----
[1  3  -1] -3  5  3  6  7       3
 1 [3  -1  -3] 5  3  6  7       3
 1  3 [-1  -3  5] 3  6  7       5
 1  3  -1 [-3  5  3] 6  7       5
 1  3  -1  -3 [5  3  6] 7       6
 1  3  -1  -3  5 [3  6  7]      7
```

### Example 2

```text
Input: nums = [1], k = 1
Output: [1]
```

---

## Constraints

- `1 <= nums.length <= 10^5`

- `-10^4 <= nums[i] <= 10^4`

- `1 <= k <= nums.length`

---

## Problem Understanding

There are `n - k + 1` windows in total: for right endpoint `i` (`k - 1 <= i < n`), the active window spans indices `[i - k + 1, i]`. As `i` increments, `nums[i]` enters on the right and `nums[i - k]` exits on the left. Tracking only a single scalar `currentMax` fails whenever the outgoing element `nums[i - k]` **was** the maximum, because we wouldn't know the second-largest element without rescanning.

---

## Approach

### Brute Force Approach

For each of the `n - k + 1` window positions, scan all `k` elements in `nums[j..j + k - 1]` to find their maximum. When `n = 10^5` and `k = n / 2`, this nested scan performs `O(n * k) = O(n^2)` comparisons (`~2.5 * 10^9` operations) and exceeds the time limit.

### Optimized Approach

Use a **Max-Heap** (`PriorityQueue<int[]> q`) storing `[value, index]` pairs ordered by `value` descending, pushing each incoming element `[nums[i], i]` and **lazily polling** stale heap tops whose index `<= i - k` before reading `q.peek()[0]`.

### Step-by-Step Thinking Process

1. Create a `PriorityQueue<int[]> q` with comparator `(a, b) -> a[0] == b[0] ? a[1] - b[1] : b[0] - a[0]` so the largest `nums[i]` always sits at `q.peek()`.
2. Pre-load the first `k - 1` pairs `[nums[i], i]` (`i = 0` to `k - 2`) into `q`.
3. Allocate `int[] ans = new int[n - k + 1]` and sweep the right window boundary `i` from `k - 1` to `n - 1`.
4. At each step `i`, push `new int[] {nums[i], i}` into `q`. Then lazily discard expired maxima at the top via `while (q.peek()[1] <= i - k) q.poll();`.
5. Once the top element's index lies within `[i - k + 1, i]`, record `ans[j++] = q.peek()[0]`.

### Algorithm / Intuition

Removing an arbitrary outgoing element `[nums[i - k], i - k]` from the middle of Java's `PriorityQueue` would cost `O(k)` linear search. **Lazy deletion** sidesteps this completely:
- If an expired element is smaller than the current window's maximum, it sits harmlessly buried beneath `q.peek()` and has zero effect on the answer!
- We only call `q.poll()` when an expired element (`index <= i - k`) actually rises to `q.peek()`.
- Note on worst-case heap size: if `nums` is strictly increasing (`[1, 2, 3, ..., n]`), newer elements always sit above older ones, so no stale elements are ever polled and `q` grows to size `n`, making each heap operation `O(log n)`.

---

## Dry Run

Tracing Example 1: `nums = [1, 3, -1, -3, 5, 3, 6, 7]`, `k = 3` (`n = 8`, `ans` length `6`):
- Pre-load `i = 0, 1`: `q` holds `{[3, 1], [1, 0]}`.

| `i` (`j`) | Active Window `[i-2..i]` | Offered `[val, i]` | Lazy Polls (`idx <= i - 3`) | `q.peek()` | `ans[j]` |
| :--- | :--- | :--- | :--- | :--- | :--- |
| `2` (`0`) | `[0..2]` (`[1, 3, -1]`) | `[-1, 2]` | None (`peek` idx `1 > -1`) | `[3, 1]` | `3` |
| `3` (`1`) | `[1..3]` (`[3, -1, -3]`) | `[-3, 3]` | None (`peek` idx `1 > 0`) | `[3, 1]` | `3` |
| `4` (`2`) | `[2..4]` (`[-1, -3, 5]`) | `[5, 4]` | None (`peek` idx `4 > 1`) | `[5, 4]` | `5` |
| `5` (`3`) | `[3..5]` (`[-3, 5, 3]`) | `[3, 5]` | None (`peek` idx `4 > 2`) | `[5, 4]` | `5` |
| `6` (`4`) | `[4..6]` (`[5, 3, 6]`) | `[6, 6]` | None (`peek` idx `6 > 3`) | `[6, 6]` | `6` |
| `7` (`5`) | `[5..7]` (`[3, 6, 7]`) | `[7, 7]` | None (`peek` idx `7 > 4`) | `[7, 7]` | `7` |

*(If `nums[4..7]` had been smaller than `3`, `[3, 1]` would have been lazily polled at `i = 4` since `1 <= 4 - 3`.)* Final `ans`: `[3, 3, 5, 5, 6, 7]`.

---

## Complexity Analysis

- **Time Complexity:** `O(n log n)` — Every element is offered once and polled at most once; because lazy deletion allows up to `n` elements to accumulate in `q` (e.g., on an ascending array), each heap operation takes `O(log n)` in the worst case.
- **Space Complexity:** `O(n)` — Excluding the output array `ans`, `PriorityQueue` `q` stores up to `n` two-element `int[]` pairs in the worst case.

---

## Available Solutions

Only verified solution files present in this folder are listed below:

| Language | Solution File |
| :--- | :--- |
| **Java** | [239sliding-window-maximum.java](./239sliding-window-maximum.java) |

---

## Key Learnings

- Lazy deletion (`while (q.peek()[1] <= i - k) q.poll()`) is a clean, versatile pattern whenever a heap tracks sliding-window or dynamic optima without supporting `O(log n)` arbitrary-key removal.
- Using integer subtraction `b[0] - a[0]` in comparators is safe here because `-10^4 <= nums[i] <= 10^4` (difference `<= 2 * 10^4`), though `Integer.compare(b[0], a[0])` is safer when values can approach `Integer.MAX_VALUE`.
- To optimize further from `O(n log n)` to optimal `O(n)` time and `O(k)` space, replace the max-heap with a **monotonic decreasing deque** (`ArrayDeque<Integer>`) of indices.
