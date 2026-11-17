---
comments: true
difficulty: Medium
tags:
  - Hash Table
  - Linked List
  - Design
  - Doubly-Linked List
---

# 146. LRU Cache

**[View Problem on LeetCode](https://leetcode.com/problems/lru-cache/)**

| Attribute | Details |
| :--- | :--- |
| **Problem ID** | `0146` (`146`) |
| **Difficulty** | Medium |
| **Topics / Tags** | `Hash Table`, `Linked List`, `Design`, `Doubly-Linked List` |
| **Solution Language** | JavaScript |

---

## Problem Description

Design a data structure that follows the constraints of a **Least Recently Used (LRU) cache**.

Implement the `LRUCache` class:

	
- `LRUCache(int capacity)` Initialize the LRU cache with **positive** size `capacity`.
	
- `int get(int key)` Return the value of the `key` if the key exists, otherwise return `-1`.
	
- `void put(int key, int value)` Update the value of the `key` if the `key` exists. Otherwise, add the `key-value` pair to the cache. If the number of keys exceeds the `capacity` from this operation, **evict** the least recently used key.

The functions `get` and `put` must each run in `O(1)` average time complexity.

---

## Examples

### Example 1

```text
**Input**
["LRUCache", "put", "put", "get", "put", "get", "put", "get", "get", "get"]
[[2], [1, 1], [2, 2], [1], [3, 3], [2], [4, 4], [1], [3], [4]]
**Output**
[null, null, null, 1, null, -1, null, -1, 3, 4]

**Explanation**
LRUCache lRUCache = new LRUCache(2);
lRUCache.put(1, 1); // cache is {1=1}
lRUCache.put(2, 2); // cache is {1=1, 2=2}
lRUCache.get(1);    // return 1
lRUCache.put(3, 3); // LRU key was 2, evicts key 2, cache is {1=1, 3=3}
lRUCache.get(2);    // returns -1 (not found)
lRUCache.put(4, 4); // LRU key was 1, evicts key 1, cache is {4=4, 3=3}
lRUCache.get(1);    // return -1 (not found)
lRUCache.get(3);    // return 3
lRUCache.get(4);    // return 4
```

 

**

---

## Constraints

**

	
- `1 <= capacity <= 3000`
	
- `0 <= key <= 10^4`
	
- `0 <= value <= 10^5`
	
- At most `2 * 10^5` calls will be made to `get` and `put`.

---

## Problem Understanding

- Implement a Least Recently Used (LRU) cache supporting $O(1)$ `get(key)` and `put(key, value)` operations with capacity eviction.

---

## Approach

### Optimized Approach (Hash Map + Doubly Linked List)

1. Use a Doubly Linked List with sentinel dummy nodes `head` and `tail`:
   - Most recently used nodes reside immediately after `head`.
   - Least recently used nodes reside immediately before `tail`.
2. Maintain a Hash Map `cache` mapping keys to DLL node pointers.
3. `get(key)`:
   - If `key` not found, return `-1`.
   - Remove node from its current position and insert it directly after `head`. Return `node.val`.
4. `put(key, value)`:
   - If `key` exists, update value, remove from current position, and move to head.
   - If `key` does not exist, create new node, insert after `head`, and add to `cache`.
   - If size exceeds `capacity`, evict `tail.prev`, delete its key from `cache`, and decrement size.

---

## Complexity Analysis

- **Time Complexity:** $O(1)$ for both `get` and `put` operations.
- **Space Complexity:** $O(	ext{capacity})$ — To store up to `capacity` nodes and hash map entries.

---

## Available Solutions

Only verified solution files present in this folder are listed below:

| Language | Solution File |
| :--- | :--- |
| **JavaScript** | [146lru-cache.js](./146lru-cache.js) |

---

## Key Learnings

- Sentinel dummy head and tail nodes eliminate edge cases during DLL insertion and deletion.
