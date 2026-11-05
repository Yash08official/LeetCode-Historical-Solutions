---
comments: true
difficulty: Medium
tags:
  - Hash Table
  - Design
  - Heap (Priority Queue)
  - Ordered Set
---

# 2336. Smallest Number in Infinite Set

**[View Problem on LeetCode](https://leetcode.com/problems/smallest-number-in-infinite-set/)**

| Attribute | Details |
| :--- | :--- |
| **Problem ID** | `2336` (`2336`) |
| **Difficulty** | Medium |
| **Topics / Tags** | `Hash Table`, `Design`, `Heap (Priority Queue)`, `Ordered Set` |
| **Solution Language** | JavaScript |

---

## Problem Description

You have a set containing all positive integers `[1, 2, 3, 4, 5, ...]`. Implement the `SmallestInfiniteSet` class:
- `SmallestInfiniteSet()` Initializes the `SmallestInfiniteSet` object to contain all positive integers.
- `int popSmallest()` Removes and returns the smallest integer contained in the infinite set.
- `void addBack(int num)` Adds a positive integer `num` back into the infinite set if it is not already present.

---

## Examples

### Example 1

```text
Input
["SmallestInfiniteSet", "addBack", "popSmallest", "popSmallest", "popSmallest", "addBack", "popSmallest", "popSmallest", "popSmallest"]
[[], [2], [], [], [], [1], [], [], []]
Output
[null, null, 1, 2, 3, null, 1, 4, 5]

Explanation
SmallestInfiniteSet smallestInfiniteSet = new SmallestInfiniteSet();
smallestInfiniteSet.addBack(2);    // 2 is already in the set, so no change is made.
smallestInfiniteSet.popSmallest(); // return 1, since 1 is the smallest number, and remove it from the set.
smallestInfiniteSet.popSmallest(); // return 2, and remove it from the set.
smallestInfiniteSet.popSmallest(); // return 3, and remove it from the set.
smallestInfiniteSet.addBack(1);    // 1 is added back to the set.
smallestInfiniteSet.popSmallest(); // return 1, since 1 was added back to the set and
                                   // is the smallest number, and remove it from the set.
smallestInfiniteSet.popSmallest(); // return 4, and remove it from the set.
smallestInfiniteSet.popSmallest(); // return 5, and remove it from the set.
```

---

## Constraints

- `1 <= num <= 1000`

- At most `1000` calls will be made **in total** to `popSmallest` and `addBack`.

---

## Problem Understanding

Key observations and constraints:
- `1 <= num <= 1000`.
- At most `1000` calls will be made in total to `popSmallest` and `addBack`.
- Because at most 1000 numbers can ever be popped, any number greater than 1000 will never be needed during the test execution.
- The set must support: finding and removing the minimum available integer, and re-inserting an integer without introducing duplicates.

---

## Approach

### Brute Force Approach

A naive implementation might store an unbounded list or dynamically allocate integers on the fly, scanning through the entire collection to find the minimum upon every `popSmallest` call, which would take `O(N)` per pop without tracking the current minimum boundary.

### Optimized Approach

Leverage the problem constraints: since at most 1000 calls are made and `num <= 1000`, initialize a JavaScript `Set` containing integers `1` through `1000`. Maintain a pointer `sm = 1` indicating the lower bound of the smallest available number.
- `popSmallest()`: Advance `x = sm` until `s.has(x)` is true. Delete `x` from `s`, advance `sm = x + 1`, and return `x`.
- `addBack(num)`: Add `num` to `s`. If `num < sm`, update `sm = num` so the next `popSmallest` starts from this newly restored smaller number.

### Step-by-Step Thinking Process

1. Analyze constraints: at most 1000 operations, and `num <= 1000`.
2. An infinite set only needs to track integers up to the maximum potential pop count (1000).
3. Pre-fill a `Set` with numbers `1` through `1000`.
4. Maintain a cursor `sm` to avoid checking already popped numbers from 1 each time.
5. In `popSmallest`, start checking from `sm`, find the first present number, delete it, update `sm`, and return.
6. In `addBack`, insert `num` and if `num < sm`, lower `sm = num` to maintain the invariant.

### Algorithm / Intuition

In `SmallestInfiniteSet`, the constructor initializes `this.s = new Set()` and populates it with values `1` through `1000`, setting `this.sm = 1`.

In `popSmallest()`, `let x = this.sm` scans forward with `while (!this.s.has(x)) x++` until an active integer in the set is found. That element is removed via `this.s.delete(x)`, the cursor is moved forward `this.sm = x + 1`, and `x` is returned.

In `addBack(num)`, `this.s.add(num)` restores `num` to the set (idempotent if already present). The condition `if (num < this.sm) this.sm = num` ensures that if a smaller number is reintroduced, `sm` is pulled back so subsequent `popSmallest` calls will immediately find it.

---

## Dry Run

Execution trace for Example 1:
- Constructor: `s = {1..1000}`, `sm = 1`.
- `addBack(2)`: `s.add(2)` (already present). `2 < 1` is False. `sm = 1`. Returns `null`.
- `popSmallest()`: `sm = 1`, `s.has(1)` is True. Delete `1`, `sm = 2`. Returns `1`.
- `popSmallest()`: `sm = 2`, `s.has(2)` is True. Delete `2`, `sm = 3`. Returns `2`.
- `popSmallest()`: `sm = 3`, `s.has(3)` is True. Delete `3`, `sm = 4`. Returns `3`.
- `addBack(1)`: `s.add(1)`. `1 < 4` is True -> `sm = 1`. Returns `null`.
- `popSmallest()`: `sm = 1`, `s.has(1)` is True. Delete `1`, `sm = 2`. Returns `1`.
- `popSmallest()`: `sm = 2`, `s.has(2)` is False, `s.has(3)` is False, `s.has(4)` is True. Delete `4`, `sm = 5`. Returns `4`.
- `popSmallest()`: `sm = 5`, `s.has(5)` is True. Delete `5`, `sm = 6`. Returns `5`.
- Output matches Example 1: `[null, null, 1, 2, 3, null, 1, 4, 5]`.

---

## Complexity Analysis

- **Time Complexity:** - Constructor: `O(M)` where `M = 1000` to populate the initial set.
- `popSmallest()`: Amortized `O(1)`, worst-case `O(M)`. Across operations, `sm` advances forward monotonically except when reset by `addBack`.
- `addBack()`: `O(1)` hash set addition and comparison.
- **Space Complexity:** `O(M)` — where `M = 1000`, storing at most 1000 integers in the JavaScript `Set`.

---

## Available Solutions

Only verified solution files present in this folder are listed below:

| Language | Solution File |
| :--- | :--- |
| **JavaScript** | [2336smallest-number-in-infinite-set.js](./2336smallest-number-in-infinite-set.js) |

---

## Key Learnings

- Analyzing operation limits (at most 1000 calls) allows bounding an theoretically 'infinite' set to a concrete, manageable size.
- Maintaining a lower-bound cursor `sm` prevents redundant scanning over previously popped values.
- JavaScript `Set.has()`, `Set.add()`, and `Set.delete()` provide clean `O(1)` average time operations.
