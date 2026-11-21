---
comments: true
difficulty: Medium
tags:
  - Array
  - Design
  - Iterator
---

# 284. Peeking Iterator

**[View Problem on LeetCode](https://leetcode.com/problems/peeking-iterator/)**

| Attribute | Details |
| :--- | :--- |
| **Problem ID** | `0284` (`284`) |
| **Difficulty** | Medium |
| **Topics / Tags** | `Array`, `Design`, `Iterator` |
| **Solution Language** | Java |

---

## Problem Description

Design an iterator that supports the `peek` operation on an existing iterator in addition to the `hasNext` and the `next` operations.

Implement the `PeekingIterator` class:

	
- `PeekingIterator(Iterator<int> nums)` Initializes the object with the given integer iterator `iterator`.
	
- `int next()` Returns the next element in the array and moves the pointer to the next element.
	
- `boolean hasNext()` Returns `true` if there are still elements in the array.
	
- `int peek()` Returns the next element in the array **without** moving the pointer.

**Note:** Each language may have a different implementation of the constructor and `Iterator`, but they all support the `int next()` and `boolean hasNext()` functions.

---

## Examples

### Example 1

```text
**Input**
["PeekingIterator", "next", "peek", "next", "next", "hasNext"]
[[[1, 2, 3]], [], [], [], [], []]
**Output**
[null, 1, 2, 2, 3, false]

**Explanation**
PeekingIterator peekingIterator = new PeekingIterator([1, 2, 3]); // [**1**,2,3]
peekingIterator.next();    // return 1, the pointer moves to the next element [1,**2**,3].
peekingIterator.peek();    // return 2, the pointer does not move [1,**2**,3].
peekingIterator.next();    // return 2, the pointer moves to the next element [1,2,**3**]
peekingIterator.next();    // return 3, the pointer moves to the next element [1,2,3]
peekingIterator.hasNext(); // return False
```

 

**

---

## Constraints

**

	
- `1 <= nums.length <= 1000`
	
- `1 <= nums[i] <= 1000`
	
- All the calls to `next` and `peek` are valid.
	
- At most `1000` calls will be made to `next`, `hasNext`, and `peek`.

 

**Follow up:** How would you extend your design to be generic and work with all types, not just integer?

---

## Problem Understanding

- Wrap a standard Java `Iterator<Integer>` to support `peek()` without advancing the underlying iterator.

---

## Approach

### Optimized Approach (One-Element Lookahead Cache)
1. Maintain `boolean hasPeeked` and `Integer peekedElement`.
2. `peek()`: if `!hasPeeked`, pull one element from `iterator.next()`, cache it, and set `hasPeeked = true`; return `peekedElement`.
3. `next()`: if `hasPeeked`, return cached `peekedElement` and clear the cache; otherwise delegate directly to `iterator.next()`.
4. `hasNext()`: return `hasPeeked || iterator.hasNext()`.

---

## Complexity Analysis

- **Time Complexity:** $O(1)$ for `peek`, `next`, and `hasNext`.
- **Space Complexity:** $O(1)$ — Single cached element.

---

## Available Solutions

Only verified solution files present in this folder are listed below:

| Language | Solution File |
| :--- | :--- |
| **Java** | [284peeking-iterator.java](./284peeking-iterator.java) |

---

## Key Learnings

- Using a separate `hasPeeked` flag handles `null` elements safely and avoids eagerly calling `next()` in the constructor.
