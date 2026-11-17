---
comments: true
difficulty: Medium
tags:
  - Stack
  - Design
---

# 155. Min Stack

**[View Problem on LeetCode](https://leetcode.com/problems/min-stack/)**

| Attribute | Details |
| :--- | :--- |
| **Problem ID** | `0155` (`155`) |
| **Difficulty** | Medium |
| **Topics / Tags** | `Stack`, `Design` |
| **Solution Language** | JavaScript |

---

## Problem Description

Design a stack that supports push, pop, top, and retrieving the minimum element in constant time.

Implement the `MinStack` class:

	
- `MinStack()` initializes the stack object.
	
- `void push(int value)` pushes the element `value` onto the stack.
	
- `void pop()` removes the element on the top of the stack.
	
- `int top()` gets the top element of the stack.
	
- `int getMin()` retrieves the minimum element in the stack.

You must implement a solution with `O(1)` time complexity for each function.

---

## Examples

### Example 1

```text
**Input**
["MinStack","push","push","push","getMin","pop","top","getMin"]
[[],[-2],[0],[-3],[],[],[],[]]

**Output**
[null,null,null,null,-3,null,0,-2]

**Explanation**
MinStack minStack = new MinStack();
minStack.push(-2);
minStack.push(0);
minStack.push(-3);
minStack.getMin(); // return -3
minStack.pop();
minStack.top();    // return 0
minStack.getMin(); // return -2
```

 

**

---

## Constraints

**

	
- `-2^31 <= val <= 2^31 - 1`
	
- Methods `pop`, `top` and `getMin` operations will always be called on **non-empty** stacks.
	
- At most `3 * 10^4` calls will be made to `push`, `pop`, `top`, and `getMin`.

---

## Problem Understanding

- Design a stack supporting `push`, `pop`, `top`, and `getMin` in constant $O(1)$ time.

---

## Approach

### Optimized Approach (Dual Stacks / Monotonic Auxiliary Min Stack)

1. Maintain two internal arrays/stacks:
   - `stk1`: Main data stack storing pushed elements.
   - `stk2`: Min stack storing running minimums, initialized with `Infinity`.
2. `push(val)`:
   - Push `val` to `stk1`.
   - Push `min(current_min, val)` to `stk2`.
3. `pop()`:
   - Pop top elements from both `stk1` and `stk2`.
4. `top()`:
   - Return top element of `stk1`.
5. `getMin()`:
   - Return top element of `stk2`.

---

## Complexity Analysis

- **Time Complexity:** $O(1)$ for all operations (`push`, `pop`, `top`, `getMin`).
- **Space Complexity:** $O(n)$ — To store elements and their corresponding prefix minimums.

---

## Available Solutions

Only verified solution files present in this folder are listed below:

| Language | Solution File |
| :--- | :--- |
| **JavaScript** | [155min-stack.js](./155min-stack.js) |

---

## Key Learnings

- Tracking running minimums synchronously with element pushes ensures $O(1)$ minimum retrieval without scanning.
