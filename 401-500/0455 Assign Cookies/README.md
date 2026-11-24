---
comments: true
difficulty: Easy
tags:
  - Array
  - Two Pointers
  - Greedy
  - Sorting
  - Quicksort
---

# 455. Assign Cookies

**[View Problem on LeetCode](https://leetcode.com/problems/assign-cookies/)**

| Attribute | Details |
| :--- | :--- |
| **Problem ID** | `0455` (`455`) |
| **Difficulty** | Easy |
| **Topics / Tags** | `Array`, `Two Pointers`, `Greedy`, `Sorting`, `Quicksort` |
| **Solution Language** | Java |

---

## Problem Description

Assume you are an awesome parent and want to give your children some cookies. But, you should give each child at most one cookie.

Each child `i` has a greed factor `g[i]`, which is the minimum size of a cookie that the child will be content with; and each cookie `j` has a size `s[j]`. If `s[j] >= g[i]`, we can assign the cookie `j` to the child `i`, and the child `i` will be content. Your goal is to maximize the number of your content children and output the maximum number.

---

## Examples

### Example 1

```text
**Input:** g = [1,2,3], s = [1,1]
**Output:** 1
**Explanation:** You have 3 children and 2 cookies. The greed factors of 3 children are 1, 2, 3. 
And even though you have 2 cookies, since their size is both 1, you could only make the child whose greed factor is 1 content.
You need to output 1.
```

### Example 2

```text
**Input:** g = [1,2], s = [1,2,3]
**Output:** 2
**Explanation:** You have 2 children and 3 cookies. The greed factors of 2 children are 1, 2. 
You have 3 cookies and their sizes are big enough to gratify all of the children, 
You need to output 2.
```

 

**

---

## Constraints

**

	
- `1 <= g.length <= 3 * 10^4`
	
- `0 <= s.length <= 3 * 10^4`
	
- `1 <= g[i], s[j] <= 2^31 - 1`

 

**Note:** This question is the same as  2410: Maximum Matching of Players With Trainers.

---

## Problem Understanding

- Assign at most one cookie `s[j]` to each child `i` (`s[j] >= g[i]`) to maximize the number of content children.

---

## Approach

### Optimized Approach (Sort + Two-Pointer Greedy)
1. Sort both greed factors `g` and cookie sizes `s` ascending.
2. For each child `i`, advance cookie pointer `j` past cookies smaller than `g[i]`; if none remain (`j >= n`), return `i`.

---

## Complexity Analysis

- **Time Complexity:** $O(m \log m + n \log n)$.\n- **Space Complexity:** $O(\log m + \log n)$ sorting stack.

---

## Available Solutions

Only verified solution files present in this folder are listed below:

| Language | Solution File |
| :--- | :--- |
| **Java** | [455assign-cookies.java](./455assign-cookies.java) |

---

## Key Learnings

- Matching the least greedy child with the smallest sufficient cookie preserves larger cookies for greedier children.
