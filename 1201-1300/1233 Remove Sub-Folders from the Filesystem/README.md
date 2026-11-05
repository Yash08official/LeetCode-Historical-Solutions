---
comments: true
difficulty: Medium
tags:
  - Array
  - String
  - Depth-First Search
  - Trie
---

# 1233. Remove Sub-Folders from the Filesystem

**[View Problem on LeetCode](https://leetcode.com/problems/remove-sub-folders-from-the-filesystem/)**

| Attribute | Details |
| :--- | :--- |
| **Problem ID** | `1233` (`1233`) |
| **Difficulty** | Medium |
| **Topics / Tags** | `Array`, `String`, `Depth-First Search`, `Trie` |
| **Solution Language** | JavaScript |

---

## Problem Description

You are given an array `folder` of unique valid filesystem paths, each formatted as one or more segments of `'/'` followed by lowercase English letters (e.g., `"/a"`, `"/a/b"`).

Path `folder[i]` is a **sub-folder** of `folder[j]` if `folder[i]` starts with `folder[j]` immediately followed by `'/'` (so `"/a/b"` is a sub-folder of `"/a"`, whereas `"/a/b/ca"` is **not** a sub-folder of `"/a/b/c"`). Return the list of folders after removing all sub-folders, in any order.

---

## Examples

### Example 1

```text
Input: folder = ["/a","/a/b","/c/d","/c/d/e","/c/f"]
Output: ["/a","/c/d","/c/f"]
Explanation: Folders "/a/b" is a subfolder of "/a" and "/c/d/e" is inside of folder "/c/d" in our filesystem.
```

### Example 2

```text
Input: folder = ["/a","/a/b/c","/a/b/d"]
Output: ["/a"]
Explanation: Folders "/a/b/c" and "/a/b/d" will be removed because they are subfolders of "/a".
```

### Example 3

```text
Input: folder = ["/a/b/c","/a/b/ca","/a/b/d"]
Output: ["/a/b/c","/a/b/ca","/a/b/d"]
```

---

## Constraints

- `1 <= folder.length <= 4 * 10^4`

- `2 <= folder[i].length <= 100`

- `folder[i]` contains only lowercase letters and `'/'`.

- `folder[i]` always starts with the character `'/'`.

- Each folder name is **unique**.

---

## Problem Understanding

- **Delimiter Boundary Check:** Checking `child.startsWith(parent)` alone is wrong because `"/a/b/ca"` starts with `"/a/b/c"` even though `ca` is a sibling directory of `c`. A true sub-folder must be strictly longer (`m < n`), match `parent` on `0..m-1`, **and** have `'/'` at index `m`.
- **Lexicographical Contiguity:** When paths are sorted lexicographically (`folder.sort()`), any parent folder `P` appears **before** `P + "/..."`. Even better, because `'/'` (ASCII `47`) is smaller than `'a'`–`'z'` (ASCII `97`–`122`), every sub-folder `P/...` appears before any sibling `P<letter>...` (like `"/a/b/c/x"` appearing before `"/a/b/ca"`)!
- **Transitivity of Parenthood:** If `C` is a sub-folder of `B` and `B` was already discarded as a sub-folder of `A`, then `C` is automatically a sub-folder of `A`—so we only ever need to compare the current path against the **last kept** root folder `ans[ans.length - 1]`!

---

## Approach

### Brute Force Approach

For every path `folder[i]`, check all other paths `folder[j]` (`O(N^2)` pairs) or check every `'/'`-delimited prefix of `folder[i]` against a `Set` of all paths (`O(N * L^2)` if slicing prefixes repeatedly without sorting). Pairwise checking takes `O(N^2 * L)` time, which is too slow for `N = 4 * 10^4`.

### Optimized Approach

Sort `folder` lexicographically in-place via `folder.sort()`, push `folder[0]` into `ans`, and scan `i = 1..folder.length - 1`, appending `folder[i]` to `ans` whenever it is not a `'/'`-bounded prefix extension of `ans[ans.length - 1]`.

### Step-by-Step Thinking Process

1. Sort `folder` lexicographically with `folder.sort()` so parent directories always precede their sub-directories.
2. Initialize `ans = [folder[0]]`, since the lexicographically smallest path cannot have a shorter parent in the array.
3. For each subsequent `folder[i]`, let `m = ans[ans.length - 1].length` (the latest kept root folder's length) and `n = folder[i].length`.
4. Check if `folder[i]` is a sub-folder of `ans[ans.length - 1]`: this requires `m < n`, `ans[ans.length - 1] === folder[i].substring(0, m)`, and `folder[i].charAt(m) === '/'`. Whenever this fails (`m >= n || !(...)`), push `folder[i]` to `ans`.

### Algorithm / Intuition

Why is comparing `folder[i]` solely against `last = ans[ans.length - 1]` sufficient? Suppose `last = "/a"`. In sorted order:

1. Every true sub-folder `"/a/..."` has `'/'` (code `47`) at index `2`, so all of them appear right after `"/a"` (before any `"/aa"` which has `'a'` code `97` at index `2`, and before `"/b"`).
2. While scanning through `"/a/b"`, `"/a/b/c"`, etc., `last` remains `"/a"` and rejects all of them.
3. As soon as we encounter a path that is **not** under `"/a"` (such as `"/aa"` or `"/c/d"`), no future string can ever start with `"/a/"` again because the array is sorted! Appending this new root updates `ans[ans.length - 1]` to guard the next subtree.

---

## Dry Run

Using **Example 1** (`folder = ["/a", "/a/b", "/c/d", "/c/d/e", "/c/f"]`):

1. **`folder.sort()`:** Already sorted `["/a", "/a/b", "/c/d", "/c/d/e", "/c/f"]`.
2. **Init:** `ans = ["/a"]`.
3. **`i = 1` (`"/a/b"`, `n = 4` vs `last = "/a"`, `m = 2`):**
   - `m >= n` (`2 >= 4`) is false; `"/a" === "/a"` and `charAt(2) === '/'` is true -> sub-folder -> **skipped**.
4. **`i = 2` (`"/c/d"`, `n = 4` vs `last = "/a"`, `m = 2`):**
   - `"/a" === "/c"` is false -> not a sub-folder -> `ans.push("/c/d")` (`ans = ["/a", "/c/d"]`).
5. **`i = 3` (`"/c/d/e"`, `n = 6` vs `last = "/c/d"`, `m = 4`):**
   - `"/c/d" === "/c/d"` and `charAt(4) === '/'` -> sub-folder -> **skipped**.
6. **`i = 4` (`"/c/f"`, `n = 4` vs `last = "/c/d"`, `m = 4`):**
   - `m >= n` (`4 >= 4`) is true -> short-circuits -> `ans.push("/c/f")`.
7. **Return:** `["/a", "/c/d", "/c/f"]`.

---

## Complexity Analysis

- **Time Complexity:** `O(N * L * log N)` — Sorting `N` folder strings of maximum length `L` (`<= 100`) performs `O(N log N)` comparisons of up to `O(L)` characters each, followed by a single `O(N * L)` linear pass.
- **Space Complexity:** `O(N + L)` — In-place Timsort in V8 uses up to `O(N)` temporary pointer space, each `substring(0, m)` check uses at most `O(L)` space, and `ans` stores references to the kept strings.

---

## Available Solutions

Only verified solution files present in this folder are listed below:

| Language | Solution File |
| :--- | :--- |
| **JavaScript** | [1233remove-sub-folders-from-the-filesystem.js](./1233remove-sub-folders-from-the-filesystem.js) |

---

## Key Learnings

- Because ASCII `'/'` (`47`) sorts before `'a'`–`'z'` (`97`–`122`), lexicographical sorting naturally groups a directory immediately ahead of its entire subtree—even ahead of longer-named sibling directories like `"/a/b/ca"`.
- Always verify the `'/'` path separator boundary (`folder[i].charAt(m) === '/'`) when testing directory prefix containment.
- A Trie split on `'/'` segments can also solve this in `O(N * L)` time at the cost of higher object/map memory overhead.
