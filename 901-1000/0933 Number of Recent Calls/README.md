---
comments: true
difficulty: Easy
tags:
  - Design
  - Queue
  - Data Stream
---

# 933. Number of Recent Calls

**[View Problem on LeetCode](https://leetcode.com/problems/number-of-recent-calls/)**

| Attribute | Details |
| :--- | :--- |
| **Problem ID** | `0933` (`933`) |
| **Difficulty** | Easy |
| **Topics / Tags** | `Design`, `Queue`, `Data Stream` |
| **Solution Language** | JavaScript |

---

## Problem Description

Implement the `RecentCounter` class to count incoming requests within a sliding `3000`-millisecond window:
- `RecentCounter()`: Initializes the counter with zero historical requests.
- `int ping(int t)`: Records a new request at timestamp `t` (in milliseconds) and returns the total number of requests whose timestamps fall within the inclusive interval `[t - 3000, t]`.

Every call to `ping` is guaranteed to provide a **strictly larger** value of `t` than the previous call.

---

## Examples

### Example 1

```text
Input
["RecentCounter", "ping", "ping", "ping", "ping"]
[[], [1], [100], [3001], [3002]]
Output
[null, 1, 2, 3, 3]

Explanation
RecentCounter recentCounter = new RecentCounter();
recentCounter.ping(1);     // requests = [1], range is [-2999,1], return 1
recentCounter.ping(100);   // requests = [1, 100], range is [-2900,100], return 2
recentCounter.ping(3001);  // requests = [1, 100, 3001], range is [1,3001], return 3
recentCounter.ping(3002);  // requests = [1, 100, 3001, 3002], range is [2,3002], return 3
```

---

## Constraints

- `1 <= t <= 10^9`

- Each test case will call `ping` with **strictly increasing** values of `t`.

- At most `10^4` calls will be made to `ping`.

---

## Problem Understanding

- **Strictly Increasing Timestamps:** Because each `t` is strictly larger than all prior calls, the history of recorded timestamps is naturally sorted in ascending order.
- **Inclusive Boundary:** A request at `t - 3000` **is** counted (`[t - 3000, t]` is inclusive on both ends), whereas `t - 3001` is outside the window.
- **Bounded Call Count:** At most `10^4` calls to `ping` are made per test case.

---

## Approach

### Brute Force Approach

Appending each timestamp `t` to an array and scanning the entire array from index `0` on every `ping(t)` to count elements `>= t - 3000` takes `O(N)` per call and `O(N^2)` across `N` calls.

### Optimized Approach

Store incoming timestamps in a pre-allocated fixed-size array `this.s` of size `10010` tracked by `this.idx`, and use **Lower-Bound Binary Search** (`this.search(t - 3000)`) over `this.s[0 .. idx - 1]` to find the first valid timestamp index in `O(log N)` time per call.

### Step-by-Step Thinking Process

1. Since constraints cap `ping` calls at `10^4`, pre-allocating `this.s = new Array(10010)` with write pointer `this.idx = 0` avoids dynamic resizing or array shifting.
2. Because `t` is strictly increasing, the active prefix `this.s[0 .. this.idx - 1]` is always sorted.
3. Every timestamp in `this.s[0 .. this.idx - 1]` is already `<= t` (since `t` was just placed at `this.idx - 1`), so we only need to count how many elements satisfy `this.s[k] >= t - 3000`.
4. Implement `search(x)` using binary search on `[0, this.idx)` to find the smallest index `left` where `this.s[left] >= x`; the count of valid requests in `[left, this.idx - 1]` is simply `this.idx - left`.

### Algorithm / Intuition

In `RecentCounter`, `ping(t)` writes `t` at `this.s[this.idx++]`, so `this.idx` equals the total number of requests seen so far.

Next, `this.search(t - 3000)` searches `[0, this.idx)` for the lower bound of `x = t - 3000`. Inside `search(x)`, when `this.s[mid] >= x`, `mid` could be the first valid index, so `right = mid`; when `this.s[mid] < x`, `mid` is too old, so `left = mid + 1`. Because `this.s[this.idx - 1] === t >= t - 3000`, at least one valid element always exists, and `left` lands on the exact first index in `[t - 3000, t]`. Subtracting `left` from `this.idx` gives the count of elements in `s[left .. idx - 1]`.

*(Note: While a two-pointer queue evicting `< t - 3000` achieves `O(1)` amortized time, binary search over the retained array runs in `O(log N)`—at most `~14` comparisons—and preserves the full timestamp log if arbitrary historical queries were ever needed.)*

---

## Dry Run

Trace on **Example 1**: calls `ping(1)`, `ping(100)`, `ping(3001)`, `ping(3002)`

| Call | Active `this.s[0 .. idx - 1]` | `idx` | Target `x = t - 3000` | `search(x)` -> `left` | `idx - left` (Output) |
| :--- | :--- | :--- | :--- | :--- | :--- |
| `ping(1)` | `[1]` | `1` | `-2999` | `0` (`s[0] = 1 >= -2999`) | `1 - 0 = 1` |
| `ping(100)` | `[1, 100]` | `2` | `-2900` | `0` (`s[0] = 1 >= -2900`) | `2 - 0 = 2` |
| `ping(3001)` | `[1, 100, 3001]` | `3` | `1` | `0` (`s[0] = 1 >= 1`) | `3 - 0 = 3` |
| `ping(3002)` | `[1, 100, 3001, 3002]` | `4` | `2` | `1` (`s[0] = 1 < 2`, `s[1] = 100 >= 2`) | `4 - 1 = 3` |

---

## Complexity Analysis

- **Time Complexity:** `O(log N)` per `ping` call — Where `N` (`this.idx <= 10^4`) is the number of requests recorded so far; `this.search` halves `[0, idx)` in logarithmic time.
- **Space Complexity:** `O(M)` — Pre-allocates a fixed array `this.s` of size `M = 10010` (`O(N)` with respect to the maximum `10^4` calls).

---

## Available Solutions

Only verified solution files present in this folder are listed below:

| Language | Solution File |
| :--- | :--- |
| **JavaScript** | [933number-of-recent-calls.js](./933number-of-recent-calls.js) |

---

## Key Learnings

- Monotonic timestamps turn a time-window count query into a lower-bound search (or two-pointer sliding window) on an implicitly sorted array.
- If old timestamps never need to be queried again, advancing a persistent `head` pointer across `this.s` while `this.s[head] < t - 3000` can further optimize `ping` from `O(log N)` to `O(1)` amortized time.
- Pay close attention to inclusive vs. exclusive interval bounds: `[t - 3000, t]` uses `this.s[mid] >= x` so `3001 - 3000 = 1` still includes timestamp `1`.
