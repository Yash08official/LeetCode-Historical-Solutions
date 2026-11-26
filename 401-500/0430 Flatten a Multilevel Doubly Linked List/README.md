---
comments: true
difficulty: Medium
tags:
  - Linked List
  - Depth-First Search
  - Doubly-Linked List
---

# 430. Flatten a Multilevel Doubly Linked List

**[View Problem on LeetCode](https://leetcode.com/problems/flatten-a-multilevel-doubly-linked-list/)**

| Attribute | Details |
| :--- | :--- |
| **Problem ID** | `0430` (`430`) |
| **Difficulty** | Medium |
| **Topics / Tags** | `Linked List`, `Depth-First Search`, `Doubly-Linked List` |
| **Solution Language** | Java |

---

## Problem Description

You are given a doubly linked list, which contains nodes that have a next pointer, a previous pointer, and an additional **child pointer**. This child pointer may or may not point to a separate doubly linked list, also containing these special nodes. These child lists may have one or more children of their own, and so on, to produce a **multilevel data structure** as shown in the example below.

Given the `head` of the first level of the list, **flatten** the list so that all the nodes appear in a single-level, doubly linked list. Let `curr` be a node with a child list. The nodes in the child list should appear **after** `curr` and **before** `curr.next` in the flattened list.

Return *the *`head`* of the flattened list. The nodes in the list must have **all** of their child pointers set to *`null`.

---

## Examples

### Example 1

![diagram](https://assets.leetcode.com/uploads/2021/11/09/flatten11.jpg)

```
Input: head = [1,2,3,4,5,6,null,null,null,7,8,9,10,null,null,11,12]
Output: [1,2,3,7,8,11,12,9,10,4,5,6]
Explanation: The multilevel linked list in the input is shown.
After flattening the multilevel linked list it becomes:
```

### Example 2

![diagram](https://assets.leetcode.com/uploads/2021/11/09/flatten2.1jpg)

```
Input: head = [1,2,null,3]
Output: [1,3,2]
Explanation: The multilevel linked list in the input is shown.
After flattening the multilevel linked list it becomes:
```

### Example 3

```
Input: head = []
Output: []
Explanation: There could be empty list in the input.
```

 

**

---

## Constraints

**

	- The number of Nodes will not exceed `1000`.

	- `1 <= Node.val <= 10^5`

 

**How the multilevel linked list is represented in test cases:**

We use the multilevel linked list from **Example 1** above:

```
1---2---3---4---5---6--NULL
         |
         7---8---9---10--NULL
             |
             11--12--NULL
```

The serialization of each level is as follows:

```
[1,2,3,4,5,6,null]
[7,8,9,10,null]
[11,12,null]
```

To serialize all levels together, we will add nulls in each level to signify no node connects to the upper node of the previous level. The serialization becomes:

```
[1,    2,    3, 4, 5, 6, null]
             |
[null, null, 7,    8, 9, 10, null]
                   |
[            null, 11, 12, null]
```

Merging the serialization of each level and removing trailing nulls we obtain:

```
[1,2,3,4,5,6,null,null,null,7,8,9,10,null,null,11,12]
```

---

## Problem Understanding

- Flatten a multilevel doubly linked list so that whenever a node has a non-null `child` list, the entire child list is spliced immediately between the node and its original `next` node, with all `child` pointers cleared to `null`.

---

## Approach

### Optimized Approach (Recursive Preorder Pointer Rewiring)
1. Use a `dummy` sentinel node whose `next` points to `head`, and run `preorder(pre, cur)` returning the tail of the flattened sublist.
2. Link `pre.next = cur` and `cur.prev = pre`, save `t = cur.next`, recursively flatten `cur.child` starting after `cur` to get `tail`, set `cur.child = null`, and then recursively flatten `t` starting after `tail`.
3. Detach the sentinel by setting `dummy.next.prev = null` and return `dummy.next`.

---

## Complexity Analysis

- **Time Complexity:** $O(N)$ — each node is visited and rewired once.
- **Space Complexity:** $O(D)$ recursion stack depth, where $D$ is the maximum nesting depth ($O(N)$ worst case).

---

## Available Solutions

Only verified solution files present in this folder are listed below:

| Language | Solution File |
| :--- | :--- |
| **Java** | [430flatten-a-multilevel-doubly-linked-list.java](./430flatten-a-multilevel-doubly-linked-list.java) |

---

## Key Learnings

- Treating a multilevel doubly linked list as a binary tree (`child` = left subtree, `next` = right subtree) reduces flattening to a single preorder traversal that returns the running tail.
