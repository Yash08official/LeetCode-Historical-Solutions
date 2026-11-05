---
comments: true
difficulty: Hard
tags:
  - Array
  - Hash Table
  - Math
  - Design
  - Randomized
---

# 381. Insert Delete GetRandom O(1) - Duplicates allowed

**[View Problem on LeetCode](https://leetcode.com/problems/insert-delete-getrandom-o1-duplicates-allowed/)**

| Attribute | Details |
| :--- | :--- |
| **Problem ID** | `0381` (`381`) |
| **Difficulty** | Hard |
| **Topics / Tags** | `Array`, `Hash Table`, `Math`, `Design`, `Randomized` |
| **Solution Language** | Java |

---

## Problem Description

Implement the `RandomizedCollection` class supporting a multiset of integers (duplicates allowed) where every operation runs in **average `O(1)` time**:
- `RandomizedCollection()`: Initializes an empty multiset.
- `boolean insert(int val)`: Inserts `val` (even if already present) and returns `true` if `val` was **not** previously present, or `false` if at least one copy already existed.
- `boolean remove(int val)`: Removes a single occurrence of `val` if present and returns `true`, or returns `false` if `val` is absent.
- `int getRandom()`: Returns a random element from the multiset such that each value's selection probability is directly proportional to its current multiplicity.

---

## Examples

### Example 1

```text
Input
["RandomizedCollection", "insert", "insert", "insert", "getRandom", "remove", "getRandom"]
[[], [1], [1], [2], [], [1], []]
Output
[null, true, false, true, 2, true, 1]

Explanation
RandomizedCollection randomizedCollection = new RandomizedCollection();
randomizedCollection.insert(1);   // return true since the collection does not contain 1.
                                  // Inserts 1 into the collection.
randomizedCollection.insert(1);   // return false since the collection contains 1.
                                  // Inserts another 1 into the collection. Collection now contains [1,1].
randomizedCollection.insert(2);   // return true since the collection does not contain 2.
                                  // Inserts 2 into the collection. Collection now contains [1,1,2].
randomizedCollection.getRandom(); // getRandom should:
                                  // - return 1 with probability 2/3, or
                                  // - return 2 with probability 1/3.
randomizedCollection.remove(1);   // return true since the collection contains 1.
                                  // Removes 1 from the collection. Collection now contains [1,2].
randomizedCollection.getRandom(); // getRandom should return 1 or 2, both equally likely.
```

---

## Constraints

- `-2^31 <= val <= 2^31 - 1`

- At most `2 * 10^5` calls **in total** will be made to `insert`, `remove`, and `getRandom`.

- There will be **at least one** element in the data structure when `getRandom` is called.

---

## Problem Understanding

Supporting `getRandom()` with multiplicity-weighted probability in `O(1)` time points directly to storing all active elements (including duplicates) in a contiguous dynamic array `ArrayList<Integer> l`, where picking a uniform index in `[0, l.size() - 1]` automatically weights each distinct value by its count!

The challenge is supporting `remove(val)` in `O(1)` time without shifting array elements (`O(n)`), even when `val` appears at multiple indices or equals the last element of `l`.

---

## Approach

### Brute Force Approach

Storing elements solely in an `ArrayList` makes `insert` and `getRandom` `O(1)`, but `insert` (checking existence) and `remove` (finding `val` and shifting suffix elements left) degrade to `O(n)` per call.

Conversely, storing `(value -> count)` in a `HashMap` gives `O(1)` `insert` and `remove`, but `getRandom()` must scan counts to sample proportionally in `O(n)` time.

### Optimized Approach

Combine an `ArrayList<Integer> l` storing every element occurrence with a `HashMap<Integer, Set<Integer>> m` mapping each distinct value to a `HashSet` of all its current indices in `l`. To delete `val` in `O(1)` average time, overwrite one of `val`'s indices `idx` with the array's last element `l.get(lastIdx)`, carefully update both index sets, and pop the tail of `l`.

### Step-by-Step Thinking Process

1. Maintain `l` (`ArrayList<Integer>`) for `O(1)` uniform random indexing, `m` (`HashMap<Integer, Set<Integer>>`) for `O(1)` index lookup, and `rnd` (`Random`).
2. In `insert(val)`, record index `l.size()` inside `m.computeIfAbsent(val, k -> new HashSet<>())`, append `val` to `l`, and return `m.get(val).size() == 1` (true iff this was the first copy).
3. In `remove(val)`, return `false` if `!m.containsKey(val)`. Otherwise grab an arbitrary index `idx = idxSet.iterator().next()` of `val` and let `lastIdx = l.size() - 1`.
4. Copy `l.get(lastIdx)` into `l.set(idx, l.get(lastIdx))`, remove `idx` from `idxSet`, remove `lastIdx` from `lastIdxSet = m.get(l.get(lastIdx))`, and—only if `idx < lastIdx`—add `idx` into `lastIdxSet`.
5. Clean up `m.remove(val)` if `idxSet` became empty, remove `lastIdx` from `l`, and return `true`.
6. In `getRandom()`, sample `l.get(rnd.nextInt(l.size()))`.

### Algorithm / Intuition

Two subtle edge cases in `remove(val)` often break naive swap-with-last implementations, and this code handles both cleanly:
1. **Removing the element already at `lastIdx` (`idx == lastIdx`):** After `idxSet.remove(idx)` and `lastIdxSet.remove(lastIdx)`, we must **not** re-insert `idx` into `lastIdxSet` because index `lastIdx` is about to be deleted from `l`! Guarding with `if (idx < lastIdx) lastIdxSet.add(idx);` prevents resurrecting a deleted index.
2. **`val` equals the last element (`l.get(lastIdx) == val`, so `idxSet` and `lastIdxSet` are the exact same `Set`):** If `idx < lastIdx`, `idxSet.remove(idx)` removes `idx`, `lastIdxSet.remove(lastIdx)` removes `lastIdx`, and `lastIdxSet.add(idx)` puts `idx` back—leaving the shared set properly holding `idx` instead of `lastIdx`!

---

## Dry Run

Tracing **Example 1**:

| Call | `l` After Call | `m` (`val -> {indices}`) | Return |
| :--- | :--- | :--- | :--- |
| `insert(1)` | `[1]` | `{1: {0}}` | `true` (`size == 1`) |
| `insert(1)` | `[1, 1]` | `{1: {0, 1}}` | `false` (`size == 2`) |
| `insert(2)` | `[1, 1, 2]` | `{1: {0, 1}, 2: {2}}` | `true` (`size == 1`) |
| `getRandom()` | `[1, 1, 2]` | `{1: {0, 1}, 2: {2}}` | `1` (prob `2/3`) or `2` (prob `1/3`) |
| `remove(1)` | `idx = 0`, `lastIdx = 2` (`val=2`): `l[0]=2`, `1`'s set loses `0`, `2`'s set loses `2` & gains `0`, pop tail -> `[2, 1]` | `{1: {1}, 2: {0}}` | `true` |
| `getRandom()` | `[2, 1]` | `{1: {1}, 2: {0}}` | `1` or `2` (prob `1/2` each) |

---

## Complexity Analysis

- **Time Complexity:** `O(1)` average time for `insert`, `remove`, and `getRandom` — `ArrayList` tail append/pop, `HashMap` lookup, and `HashSet` add/remove/iterator.next all run in expected `O(1)` time.
- **Space Complexity:** `O(n)` — `l` stores `n` integers and `m` stores a total of `n` index entries across all `HashSet` buckets.

---

## Available Solutions

Only verified solution files present in this folder are listed below:

| Language | Solution File |
| :--- | :--- |
| **Java** | [381insert-delete-getrandom-o1-duplicates-allowed.java](./381insert-delete-getrandom-o1-duplicates-allowed.java) |

---

## Key Learnings

- Pairing a dense `ArrayList` with a value-to-index `HashMap` is the canonical pattern for combining `O(1)` random sampling with `O(1)` arbitrary deletion.
- When duplicates are permitted, upgrading the map's value from `Integer` to `Set<Integer>` preserves `O(1)` index retrieval and removal.
- Always trace the two aliasing edge cases during swap-with-last removal: `idx == lastIdx` and `l.get(idx).equals(l.get(lastIdx))`.
