---
comments: true
difficulty: Medium
tags:
  - Array
  - String
  - Binary Search
  - Trie
  - Sorting
  - Heap (Priority Queue)
---

# 1268. Search Suggestions System

**[View Problem on LeetCode](https://leetcode.com/problems/search-suggestions-system/)**

| Attribute | Details |
| :--- | :--- |
| **Problem ID** | `1268` (`1268`) |
| **Difficulty** | Medium |
| **Topics / Tags** | `Array`, `String`, `Binary Search`, `Trie`, `Sorting`, `Heap (Priority Queue)` |
| **Solution Language** | JavaScript |

---

## Problem Description

Given an array of unique lowercase strings `products` and a lowercase string `searchWord`, build an autocomplete suggestion system.

After each character of `searchWord` is typed (from the 1-character prefix up to the full `searchWord`), suggest **at most three** product names from `products` that share that prefix. Whenever more than three products match the current prefix, return the **three lexicographically smallest** matching products. Return a list of `searchWord.length` lists containing the suggestions after each keystroke.

---

## Examples

### Example 1

```text
Input: products = ["mobile","mouse","moneypot","monitor","mousepad"], searchWord = "mouse"
Output: [["mobile","moneypot","monitor"],["mobile","moneypot","monitor"],["mouse","mousepad"],["mouse","mousepad"],["mouse","mousepad"]]
Explanation: products sorted lexicographically = ["mobile","moneypot","monitor","mouse","mousepad"].
After typing m and mo all products match and we show user ["mobile","moneypot","monitor"].
After typing mou, mous and mouse the system suggests ["mouse","mousepad"].
```

### Example 2

```text
Input: products = ["havana"], searchWord = "havana"
Output: [["havana"],["havana"],["havana"],["havana"],["havana"],["havana"]]
Explanation: The only word "havana" will be always suggested while typing the search word.
```

---

## Constraints

- `1 <= products.length <= 1000`

- `1 <= products[i].length <= 3000`

- `1 <= sum(products[i].length) <= 2 * 10^4`

- All the strings of `products` are **unique**.

- `products[i]` consists of lowercase English letters.

- `1 <= searchWord.length <= 1000`

- `searchWord` consists of lowercase English letters.

---

## Problem Understanding

- If `searchWord` has length `M`, the output must contain exactly `M` sublists, where index `i` corresponds to prefix `searchWord[0..i]`.
- Once a prefix matches zero products at some index `i`, every longer prefix `i + 1, ..., M - 1` will also match zero products and produce `[]`.
- All strings in `products` are unique and lowercase (`'a'`–`'z'`), and the sum of lengths of all `products` is at most `2 * 10^4`.
- Sorting `products` lexicographically up front means the first three products encountered that pass through any prefix are automatically the top three suggestions for that prefix.

---

## Approach

### Brute Force Approach

For each of the `M` prefixes of `searchWord`, scan all `N` strings in `products`, filter those starting with the current prefix (taking up to `O(M)` per comparison), sort the matching strings, and slice the first three. In the worst case this takes `O(M * (N * M + N log N))` time, repeating prefix checks across every character typed.

### Optimized Approach

Sort `products` lexicographically once, then insert each product's index into a prefix tree (`Trie`) where every node caches at most `3` product indices in `this.v`. Finally, walk `searchWord` down the `Trie` in a single pass to collect the precomputed top-3 suggestions for each prefix.

### Step-by-Step Thinking Process

1. Sorting `products` first guarantees that if we insert products in increasing index order `0, 1, ..., N - 1`, every prefix node visits matching words in lexicographical order.
2. Design a `Trie` node with `children` of size `26` (for `'a'` to `'z'`) and an array `v` that stores indices into the sorted `products` array.
3. During `insert(w, i)`, as we step into each character node along `w`, append index `i` to `node.v` only if `node.v.length < 3`. Storing integer indices instead of full strings saves memory during Trie construction.
4. During `search(searchWord)`, allocate `ans` with `M` empty arrays, walk character by character through the Trie, copy `node.v` into `ans[i]`, and `break` immediately if a `null` child is hit.
5. Map each index in `ans` back to `products[i]` to build the final string lists.

### Algorithm / Intuition

In `suggestedProducts`, `products.sort()` orders lowercase ASCII words lexicographically. Each `Trie` instance represents a prefix node holding `this.children` (26 pointers) and `this.v` (up to 3 indices). When `trie.insert(products[i], i)` traverses `products[i]`, the guard `if (node.v.length < 3) node.v.push(i)` records at most the first three sorted product indices sharing that prefix. Then `trie.search(searchWord)` initializes `ans` as `n` empty sublists and walks down `searchWord`: as long as `node.children[idx]` exists, `ans[i] = node.v`; on the first missing character transition, `break` exits early, leaving all subsequent entries as `[]`. Finally, the outer loop translates index lists into product name arrays.

---

## Dry Run

Tracing `products = ["mobile","mouse","moneypot","monitor","mousepad"]`, `searchWord = "mouse"` (**Example 1**):

1. **Sort `products`:**
   `["mobile" (0), "moneypot" (1), "monitor" (2), "mouse" (3), "mousepad" (4)]`
2. **Insert into `Trie` (`node.v` capped at length 3):**
   - Prefix `"m"`: receives `0, 1, 2` (`3, 4` skipped since `v.length === 3`) -> `v = [0, 1, 2]`
   - Prefix `"mo"`: receives `0, 1, 2` -> `v = [0, 1, 2]`
   - Prefix `"mou"`: only `"mouse"` (3) and `"mousepad"` (4) pass here -> `v = [3, 4]`
   - Prefix `"mous"`: `v = [3, 4]`
   - Prefix `"mouse"`: `v = [3, 4]`
3. **Search `"mouse"` and map indices to strings:**
   - `i = 0` (`'m'`): `[0, 1, 2]` -> `["mobile", "moneypot", "monitor"]`
   - `i = 1` (`'o'`): `[0, 1, 2]` -> `["mobile", "moneypot", "monitor"]`
   - `i = 2` (`'u'`): `[3, 4]` -> `["mouse", "mousepad"]`
   - `i = 3` (`'s'`): `[3, 4]` -> `["mouse", "mousepad"]`
   - `i = 4` (`'e'`): `[3, 4]` -> `["mouse", "mousepad"]`

---

## Complexity Analysis

- **Time Complexity:** `O(L log N + M)` — Let `N = products.length`, `L = sum(products[i].length)`, and `M = searchWord.length`. Sorting takes at most `O(L log N)` character comparisons, inserting all characters into the `Trie` takes `O(L)`, and querying `searchWord` plus mapping at most `3 * M` indices takes `O(M)`.
- **Space Complexity:** `O(L + M)` — At most `L` `Trie` nodes are created (each with a fixed 26-slot `children` array and up to 3 integer indices in `v`, i.e., `O(26 * L)`), plus `O(M)` for the output suggestion lists.

---

## Available Solutions

Only verified solution files present in this folder are listed below:

| Language | Solution File |
| :--- | :--- |
| **JavaScript** | [1268search-suggestions-system.js](./1268search-suggestions-system.js) |

---

## Key Learnings

- Pre-sorting words before inserting into a Trie eliminates the need for per-node heaps or sorting at query time—a simple `v.length < 3` check suffices.
- Storing integer array indices (`i`) instead of string references inside Trie nodes keeps each node lightweight.
- Initializing the result array with empty lists (`[]`) allows `search` to `break` as soon as a prefix is missing from the Trie.
