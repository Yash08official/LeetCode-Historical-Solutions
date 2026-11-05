---
comments: true
difficulty: Easy
tags:
  - Array
  - Hash Table
  - Stack
  - Monotonic Stack
---

# 496. Next Greater Element I

**[View Problem on LeetCode](https://leetcode.com/problems/next-greater-element-i/)**

| Attribute | Details |
| :--- | :--- |
| **Problem ID** | `0496` (`496`) |
| **Difficulty** | Easy |
| **Topics / Tags** | `Array`, `Hash Table`, `Stack`, `Monotonic Stack` |
| **Solution Language** | JavaScript |

---

## Problem Description

Given two 0-indexed arrays of **distinct** integers `nums1` and `nums2` where every element of `nums1` also appears in `nums2`, answer next-greater queries for all elements of `nums1`.

For each element `x = nums1[i]`, locate `x` inside `nums2` and find the **first element strictly greater than `x` to its right** in `nums2` (or `-1` if no larger element exists to its right). Return the resulting array.

---

## Examples

### Example 1

```text
Input: nums1 = [4,1,2], nums2 = [1,3,4,2]
Output: [-1,3,-1]
Explanation: The next greater element for each value of nums1 is as follows:
- 4 is underlined in nums2 = [1,3,4,2]. There is no next greater element, so the answer is -1.
- 1 is underlined in nums2 = [1,3,4,2]. The next greater element is 3.
- 2 is underlined in nums2 = [1,3,4,2]. There is no next greater element, so the answer is -1.
```

### Example 2

```text
Input: nums1 = [2,4], nums2 = [1,2,3,4]
Output: [3,-1]
Explanation: The next greater element for each value of nums1 is as follows:
- 2 is underlined in nums2 = [1,2,3,4]. The next greater element is 3.
- 4 is underlined in nums2 = [1,2,3,4]. There is no next greater element, so the answer is -1.
```

---

## Constraints

- `1 <= nums1.length <= nums2.length <= 1000`

- `0 <= nums1[i], nums2[i] <= 10^4`

- All integers in `nums1` and `nums2` are **unique**.

- All the integers of `nums1` also appear in `nums2`.

---

## Follow-up Questions

Could you find an `O(nums1.length + nums2.length)` solution?

The implemented solution directly achieves the optimal **`O(nums1.length + nums2.length)`** time bound: precomputing `d` over `nums2` takes `O(nums2.length)` amortized time (at most `1` push and `1` pop per element in `nums2`), and resolving all `nums1` queries via `nums1.map(x => d[x])` takes `O(nums1.length)` time.

---

## Problem Understanding

- **All values are unique:** Because integers in `nums2` are pairwise distinct, each value `x` uniquely identifies its position in `nums2`, allowing us to precompute and cache `{value: nextGreater}` in a hash map/dictionary `d`.
- **Why elements get overshadowed:** As we look rightward from `x`, if an element `a` is followed by a larger element `b` (`a < b`), and our current `x` is even larger than `a` (`x > a`), `a` can *never* be the next greater element for `x` or any larger element to the left—only monotonically increasing candidates to the right matter!

---

## Approach

### Brute Force Approach

For each element `nums1[i]`, scanning `nums2` linearly to locate `nums1[i]` and then continuing rightward until finding an element `> nums1[i]` takes `O(nums2.length)` per query, resulting in `O(nums1.length * nums2.length)` total time.

### Optimized Approach

Use a **Right-to-Left Monotonic Stack + Lookup Dictionary (`d`)**: reverse `nums2` to sweep from right to left while maintaining a monotonic stack `stk` of greater candidates, record each element's answer in `d[x]`, and map `nums1` through `d`.

### Step-by-Step Thinking Process

1. Instead of answering `nums1` queries one by one, precompute the next greater element for *every* number in `nums2` in a single linear pass.
2. Process `nums2` from right to left (`nums2.reverse()`) so the stack `stk` always holds elements to the right of the current element `x`.
3. Pop any element from `stk` that is `< x` (`while (stk.length && stk.at(-1) < x) stk.pop()`): those smaller elements are neither greater than `x` nor useful for future elements to the left (since `x` itself sits closer and is larger!).
4. After popping, the top of `stk` (`stk.at(-1)`)—if any—is the closest element to the right of `x` that is greater than `x`; store `d[x] = stk.length ? stk.at(-1) : -1` and push `x` onto `stk`.
5. Return `nums1.map(x => d[x])` to look up every query in `O(1)` time.

### Algorithm / Intuition

In `nextGreaterElement(nums1, nums2)`:
- `nums2.reverse()` reverses `nums2` in-place so the `for (const x of ...)` loop visits elements from the rightmost index down to index `0`.
- `stk` maintains a strictly decreasing sequence from bottom to top (`stk.at(-1)` is the smallest retained element to the right of `x`).
- Because all integers in `nums2` are distinct, `< x` and `<= x` behave identically; once `while (stk.length && stk.at(-1) < x)` finishes, `stk.at(-1)` is guaranteed to be strictly greater than `x`.
- Finally, `nums1.map(x => d[x])` builds the output array cleanly in one expression.

---

## Dry Run

Tracing **Example 1** with `nums1 = [4, 1, 2]` and `nums2 = [1, 3, 4, 2]`:

1. `nums2.reverse()` mutates `nums2` to `[2, 4, 3, 1]`.
2. Sweep reversed `nums2`:

| Current `x` | Popped from `stk` (`< x`) | `d[x]` (`stk.at(-1)` or `-1`) | `stk` after `push(x)` |
| :--- | :--- | :--- | :--- |
| `2` | none | `-1` | `[2]` |
| `4` | `2` | `-1` | `[4]` |
| `3` | none (`4 > 3`) | `4` | `[4, 3]` |
| `1` | none (`3 > 1`) | `3` | `[4, 3, 1]` |

3. Map `nums1 = [4, 1, 2]` using `d`: `[d[4], d[1], d[2]] = [-1, 3, -1]`.

---

## Complexity Analysis

- **Time Complexity:** `O(nums1.length + nums2.length)` — Reversing `nums2` takes `O(nums2.length)`, each element of `nums2` is pushed onto and popped from `stk` at most once (`O(nums2.length)`), and mapping `nums1` takes `O(nums1.length)`.
- **Space Complexity:** `O(nums2.length)` — Dictionary `d` stores `nums2.length` key-value pairs and `stk` holds at most `nums2.length` elements.

---

## Available Solutions

Only verified solution files present in this folder are listed below:

| Language | Solution File |
| :--- | :--- |
| **JavaScript** | [496next-greater-element-i.js](./496next-greater-element-i.js) |

---

## Key Learnings

- Monotonic stacks solve "nearest greater/smaller element to the left/right" for an entire array in amortized `O(n)` time because each element enters and leaves the stack at most once.
- Note that `Array.prototype.reverse()` mutates `nums2` in-place; in production code where inputs must remain read-only, iterate with a classic index loop `for (let i = nums2.length - 1; i >= 0; --i)` instead.
- `Array.prototype.at(-1)` provides clean, readable access to the top of a JavaScript stack array.
