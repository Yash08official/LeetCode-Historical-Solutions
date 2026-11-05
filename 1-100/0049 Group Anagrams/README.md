---
comments: true
difficulty: Medium
tags:
  - Array
  - Hash Table
  - String
  - Sorting
---

# 49. Group Anagrams

**[View Problem on LeetCode](https://leetcode.com/problems/group-anagrams/)**

| Attribute | Details |
| :--- | :--- |
| **Problem ID** | `0049` (`49`) |
| **Difficulty** | Medium |
| **Topics / Tags** | `Array`, `Hash Table`, `String`, `Sorting` |
| **Solution Language** | Java |

---

## Problem Description

Given an array of strings `strs` consisting of lowercase English letters, group all strings that are **anagrams** of one another into sublists. You may return the groups (and the strings within each group) in **any order**.

Two strings are anagrams if one can be formed by rearranging all the characters of the other using the exact same character frequencies.

---

## Examples

### Example 1

**Input:** `strs = ["eat","tea","tan","ate","nat","bat"]`

**Output:** `[["bat"],["nat","tan"],["ate","eat","tea"]]`

**Explanation:**

- There is no string in strs that can be rearranged to form `"bat"`.

- The strings `"nat"` and `"tan"` are anagrams as they can be rearranged to form each other.

- The strings `"ate"`, `"eat"`, and `"tea"` are anagrams as they can be rearranged to form each other.

### Example 2

**Input:** `strs = [""]`

**Output:** `[[""]]`

### Example 3

**Input:** `strs = ["a"]`

**Output:** `[["a"]]`

---

## Constraints

- `1 <= strs.length <= 10^4`

- `0 <= strs[i].length <= 100`

- `strs[i]` consists of lowercase English letters.

---

## Problem Understanding

- **Equivalence Relation:** "Is an anagram of" partitions `strs` into disjoint equivalence classes. Every string belongs to exactly one output sublist.
- **Canonical Representation:** Two strings are anagrams if and only if sorting their characters alphabetically produces the exact same string (for example, `"eat"`, `"tea"`, and `"ate"` all sort to `"aet"`).
- **Edge Cases:** Empty strings `""` sort to `""` and group together cleanly; single-character strings sort to themselves; duplicate identical strings in `strs` must all be preserved inside their group.

---

## Approach

### Brute Force Approach

A naive pairwise approach maintains a `boolean[] grouped` array, picks each ungrouped string `strs[i]`, and compares it against every remaining string `strs[j]` (`j > i`) using a frequency check to see if they are anagrams. With up to `n = 10^4` strings of length `k <= 100`, pairwise comparison takes `O(n^2 * k)` operations (`~10^10` steps in the worst case), resulting in Time Limit Exceeded.

### Optimized Approach

Map each string to its **sorted-character canonical key** inside a `HashMap<String, List<String>>`. For every string `s` in `strs`, convert `s` to a `char[]`, sort the array to produce key `k`, append `s` to `d.computeIfAbsent(k, ...)`, and finally return all map value lists.

### Step-by-Step Thinking Process

1. To group items in a single pass, design a canonical key function `f(s)` such that `f(s1).equals(f(s2))` if and only if `s1` and `s2` are anagrams.
2. Sorting the characters of `s` (`char[] t = s.toCharArray(); Arrays.sort(t);`) directly produces such a canonical string `k = String.valueOf(t)` in `O(k log k)` time—very fast since `k <= 100`.
3. Store groups in `Map<String, List<String>> d = new HashMap<>()` mapping each canonical key `k` to the list of original strings sharing that key.
4. Use Java's `d.computeIfAbsent(k, key -> new ArrayList<>()).add(s)` to concisely initialize new buckets on demand and append `s`.
5. Wrap `d.values()` in `new ArrayList<>(d.values())` to return the `List<List<String>>` required by the method signature.

### Algorithm / Intuition

In `groupAnagrams(String[] strs)`:
- `Map<String, List<String>> d = new HashMap<>()` acts as the grouping dictionary.
- For each string `s`: `char[] t = s.toCharArray()` copies its characters, `Arrays.sort(t)` orders them alphabetically using Dual-Pivot Quicksort, and `String k = String.valueOf(t)` turns the sorted characters into an immutable `String` suitable as a `HashMap` key.
- `d.computeIfAbsent(k, key -> new ArrayList<>()).add(s)` looks up `k` in `O(k)` expected hashing time, creates an empty `ArrayList` if `k` has not been seen yet, and appends the original unsorted string `s`.
- After processing all strings, `new ArrayList<>(d.values())` collects all grouped buckets in `O(G)` time (where `G <= n` is the number of distinct anagram groups).

---

## Dry Run

**Input:** `strs = ["eat", "tea", "tan", "ate", "nat", "bat"]`

| Step | `s` | Sorted `t` -> Key `k` | Map `d` State After `.add(s)` |
| :--- | :--- | :--- | :--- |
| 1 | `"eat"` | `"aet"` | `{"aet": ["eat"]}` |
| 2 | `"tea"` | `"aet"` | `{"aet": ["eat", "tea"]}` |
| 3 | `"tan"` | `"ant"` | `{"aet": ["eat", "tea"], "ant": ["tan"]}` |
| 4 | `"ate"` | `"aet"` | `{"aet": ["eat", "tea", "ate"], "ant": ["tan"]}` |
| 5 | `"nat"` | `"ant"` | `{"aet": ["eat", "tea", "ate"], "ant": ["tan", "nat"]}` |
| 6 | `"bat"` | `"abt"` | `{"aet": ["eat", "tea", "ate"], "ant": ["tan", "nat"], "abt": ["bat"]}` |

**Return `new ArrayList<>(d.values())`:** `[["eat", "tea", "ate"], ["tan", "nat"], ["bat"]]` *(valid in any order)*.

---

## Complexity Analysis

- **Time Complexity:** `O(n * k log k)` — Where `n` is `strs.length` and `k` is the maximum string length (`k <= 100`). Each of the `n` strings is converted to `char[]`, sorted in `O(k log k)` time, and hashed in `O(k)` time.
- **Space Complexity:** `O(n * k)` — The `HashMap` `d` stores up to `n` canonical keys of length up to `k` alongside lists holding all `n` input strings.

---

## Available Solutions

Only verified solution files present in this folder are listed below:

| Language | Solution File |
| :--- | :--- |
| **Java** | [49group-anagrams.java](./49group-anagrams.java) |

---

## Key Learnings

- Canonicalization (mapping equivalent objects to an identical normalized signature) reduces `O(n^2)` pairwise equivalence grouping to an `O(n)` hash-map pass.
- Java's `Map.computeIfAbsent(k, key -> new ArrayList<>()).add(s)` cleanly replaces verbose `containsKey` / `put` / `get` boilerplate.
- If string length `k` were very large over a fixed 26-letter alphabet, building a 26-letter frequency signature could replace `O(k log k)` sorting with `O(k)` counting, though for `k <= 100` `Arrays.sort` on a compact `char[]` is exceptionally fast in practice.
