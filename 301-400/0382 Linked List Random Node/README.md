---
comments: true
difficulty: Medium
tags:
  - Linked List
  - Math
  - Reservoir Sampling
  - Randomized
---

# 382. Linked List Random Node

**[View Problem on LeetCode](https://leetcode.com/problems/linked-list-random-node/)**

| Attribute | Details |
| :--- | :--- |
| **Problem ID** | `0382` (`382`) |
| **Difficulty** | Medium |
| **Topics / Tags** | `Linked List`, `Math`, `Reservoir Sampling`, `Randomized` |
| **Solution Language** | Java |

---

## Problem Description

Given a singly linked list, return a random node's value from the linked list. Each node must have the **same probability** of being chosen.

Implement the `Solution` class:

	
- `Solution(ListNode head)` Initializes the object with the head of the singly-linked list `head`.
	
- `int getRandom()` Chooses a node randomly from the list and returns its value. All the nodes of the list should be equally likely to be chosen.

---

## Examples

### Example 1

```text
**Input**
["Solution", "getRandom", "getRandom", "getRandom", "getRandom", "getRandom"]
[[[1, 2, 3]], [], [], [], [], []]
**Output**
[null, 1, 3, 2, 2, 3]

**Explanation**
Solution solution = new Solution([1, 2, 3]);
solution.getRandom(); // return 1
solution.getRandom(); // return 3
solution.getRandom(); // return 2
solution.getRandom(); // return 2
solution.getRandom(); // return 3
// getRandom() should return either 1, 2, or 3 randomly. Each element should have equal probability of returning.
```

 

**

---

## Constraints

**

	
- The number of nodes in the linked list will be in the range `[1, 10^4]`.
	
- `-10^4 <= Node.val <= 10^4`
	
- At most `10^4` calls will be made to `getRandom`.

 

**Follow up:**

	
- What if the linked list is extremely large and its length is unknown to you?
	
- Could you solve this efficiently without using extra space?

---

## Problem Understanding

- Return a uniformly random node's value from a singly linked list of unknown length using $O(1)$ extra space.

---

## Approach

### Optimized Approach (Reservoir Sampling, $k = 1$)
1. Walk the list with 1-based counter `n`: for the `n`-th node, pick `x = 1 + random.nextInt(n)` and replace `ans = node.val` if `x == n` (probability $1/n$).
2. By induction, every node has exact probability $1/N$ of being retained at the end.

---

## Complexity Analysis

- **Time Complexity:** $O(n)$ per `getRandom()`.\n- **Space Complexity:** $O(1)$.

---

## Available Solutions

Only verified solution files present in this folder are listed below:

| Language | Solution File |
| :--- | :--- |
| **Java** | [382linked-list-random-node.java](./382linked-list-random-node.java) |

---

## Key Learnings

- Reservoir sampling selects uniformly from a stream of unknown length in a single pass and $O(1)$ memory.
