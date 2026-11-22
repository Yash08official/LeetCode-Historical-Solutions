---
comments: true
difficulty: Medium
tags:
  - Stack
  - Tree
  - Depth-First Search
  - Design
  - Queue
  - Iterator
---

# 341. Flatten Nested List Iterator

**[View Problem on LeetCode](https://leetcode.com/problems/flatten-nested-list-iterator/)**

| Attribute | Details |
| :--- | :--- |
| **Problem ID** | `0341` (`341`) |
| **Difficulty** | Medium |
| **Topics / Tags** | `Stack`, `Tree`, `Depth-First Search`, `Design`, `Queue`, `Iterator` |
| **Solution Language** | Java |

---

## Problem Description

You are given a nested list of integers `nestedList`. Each element is either an integer or a list whose elements may also be integers or other lists. Implement an iterator to flatten it.

Implement the `NestedIterator` class:

	
- `NestedIterator(List<NestedInteger> nestedList)` Initializes the iterator with the nested list `nestedList`.
	
- `int next()` Returns the next integer in the nested list.
	
- `boolean hasNext()` Returns `true` if there are still some integers in the nested list and `false` otherwise.

Your code will be tested with the following pseudocode:

```text
initialize iterator with nestedList
res = []
while iterator.hasNext()
    append iterator.next() to the end of res
return res
```

If `res` matches the expected flattened list, then your code will be judged as correct.

---

## Examples

### Example 1

```text
**Input:** nestedList = [[1,1],2,[1,1]]
**Output:** [1,1,2,1,1]
**Explanation:** By calling next repeatedly until hasNext returns false, the order of elements returned by next should be: [1,1,2,1,1].
```

### Example 2

```text
**Input:** nestedList = [1,[4,[6]]]
**Output:** [1,4,6]
**Explanation:** By calling next repeatedly until hasNext returns false, the order of elements returned by next should be: [1,4,6].
```

 

**

---

## Constraints

**

	
- `1 <= nestedList.length <= 500`
	
- The values of the integers in the nested list is in the range `[-10^6, 10^6]`.

---

## Problem Understanding

- Design an iterator that flattens a nested list of `NestedInteger` objects into a linear sequence of integers.

---

## Approach

### Optimized Approach (Constructor DFS Flattening)
1. Recursively traverse `nestedList` in the constructor via `dfs`, appending every integer leaf to `List<Integer> nums`.
2. Track cursor `i = -1`; `hasNext()` checks `i + 1 < nums.size()` and `next()` returns `nums.get(++i)`.

---

## Complexity Analysis

- **Time Complexity:** $O(N)$ constructor (where $N$ is total nested elements), $O(1)$ `next()` and `hasNext()`.\n- **Space Complexity:** $O(N)$.

---

## Available Solutions

Only verified solution files present in this folder are listed below:

| Language | Solution File |
| :--- | :--- |
| **Java** | [341flatten-nested-list-iterator.java](./341flatten-nested-list-iterator.java) |

---

## Key Learnings

- Pre-flattening via DFS guarantees $O(1)$ `hasNext()` even when nested lists contain deeply empty sublists.
