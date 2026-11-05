---
comments: true
difficulty: Medium
tags:
  - Array
  - Hash Table
  - Two Pointers
  - Sorting
---

# 2491. Divide Players Into Teams of Equal Skill

**[View Problem on LeetCode](https://leetcode.com/problems/divide-players-into-teams-of-equal-skill/)**

| Attribute | Details |
| :--- | :--- |
| **Problem ID** | `2491` (`2491`) |
| **Difficulty** | Medium |
| **Topics / Tags** | `Array`, `Hash Table`, `Two Pointers`, `Sorting` |
| **Solution Language** | JavaScript |

---

## Problem Description

You are given a positive integer array `skill` of even length $n$, where `skill[i]` represents the skill of the $i$-th player. You want to divide the players into $n / 2$ teams of size 2 such that the total skill of each team is equal.

The **chemistry** of a team is the product of the skills of its two players: $\text{skill}[i] \times \text{skill}[j]$.

Return the sum of the chemistry of all teams, or return `-1` if it is impossible to divide the players into teams satisfying the condition.

---

## Examples

### Example 1

```text
Input: skill = [3,2,5,1,3,4]
Output: 22
Explanation:
Divide the players into the following teams: (1, 5), (2, 4), (3, 3), where each team has a total skill of 6.
The sum of the chemistry of all the teams is: 1 * 5 + 2 * 4 + 3 * 3 = 5 + 8 + 9 = 22.
```

### Example 2

```text
Input: skill = [3,4]
Output: 12
Explanation:
The two players form a team with a total skill of 7.
The chemistry of the team is 3 * 4 = 12.
```

### Example 3

```text
Input: skill = [1,1,2,3]
Output: -1
Explanation:
There is no way to divide the players into teams such that the total skill of each team is equal.
```

---

## Constraints

- `2 <= skill.length <= 10^5`

- `skill.length` is even.

- `1 <= skill[i] <= 1000`

---

## Problem Understanding

For all $n / 2$ teams to have equal total skill, every team must sum to the same target value $S$. The sum of all team skills must equal the total sum of all player skills: $\frac{n}{2} \times S = \sum \text{skill}[i]$, meaning $S = \frac{2 \sum \text{skill}[i]}{n}$.

If we sort the array in ascending order, the smallest skill player `skill[0]` must pair with the largest skill player `skill[n - 1]`. If `skill[0]` paired with any smaller player, their sum would be strictly less than $S$. Thus, sorting determines the unique valid pairing: the $i$-th smallest must pair with the $i$-th largest (`skill[i]` with `skill[n - 1 - i]`). If any pair fails to sum to $S$, a valid team assignment is impossible, returning `-1`.

---

## Approach

### Brute Force Approach

A brute force approach would explore all possible pair partitions of the $n$ players. The number of ways to partition $n$ players into pairs is $(n - 1)!! = (n-1) \times (n-3) \times \dots \times 1$. Even for $n = 20$, $(19)!! \approx 6.5 \times 10^8$, and for $n = 10^5$, it is astronomical, resulting in TLE.

### Optimized Approach

Sort `skill` in ascending order in $O(n \log n)$. Compute `target = skill[0] + skill[n - 1]`. Use two pointers $i = 0$ and $j = n - 1$. In each step, verify `skill[i] + skill[j] === target` (returning `-1` if not) and accumulate `ans += skill[i] * skill[j]`.

### Step-by-Step Thinking Process

1. Recognize the greedy pairing property: to make all pair sums identical, pair the minimum remaining element with the maximum remaining element.
2. Sort the `skill` array ascending.
3. Set the required target sum: `target = skill[0] + skill[n - 1]`.
4. Initialize two pointers `i = 0` and `j = n - 1`, and chemistry accumulator `ans = 0`.
5. Move pointers inward: if `skill[i] + skill[j] !== target`, return `-1`.
6. Otherwise, add `skill[i] * skill[j]` to `ans` and continue until $i \ge j$.
7. Return the total chemistry sum `ans`.

### Algorithm / Intuition

In the provided JavaScript solution:

1. `skill.sort((a, b) => a - b)` sorts the player skills in ascending order.
2. `target = skill[0] + skill[n - 1]` sets the reference pair skill sum.
3. A two-pointer loop `for (let i = 0, j = n - 1; i < j; i++, j--)` checks each exterior pair:
   - If `skill[i] + skill[j] !== target`, it is mathematically impossible to form equal skill teams, so the function returns `-1` immediately.
   - Otherwise, `ans += skill[i] * skill[j]` accumulates the chemistry product.
4. When all pairs match `target`, `ans` is returned.

---

## Dry Run

Consider Example 1: `skill = [3, 2, 5, 1, 3, 4]`

1. Sorted: `skill = [1, 2, 3, 3, 4, 5]`, $n = 6$.
2. `target = skill[0] + skill[5] = 1 + 5 = 6`.
3. **Two-pointer scan**:
   - $i = 0, j = 5$: $1 + 5 = 6 == target$. Chemistry: $1 \times 5 = 5$. `ans = 5`.
   - $i = 1, j = 4$: $2 + 4 = 6 == target$. Chemistry: $2 \times 4 = 8$. `ans = 5 + 8 = 13`.
   - $i = 2, j = 3$: $3 + 3 = 6 == target$. Chemistry: $3 \times 3 = 9$. `ans = 13 + 9 = 22`.

Final Return: `22`.

---

## Complexity Analysis

- **Time Complexity:** `O(n \log n)` — Sorting the array of $n$ elements takes $O(n \log n)$ time. The subsequent two-pointer scan takes linear time $O(n)$.
- **Space Complexity:** `O(1)` or `O(n)` — Auxiliary space depends on JavaScript engine's in-place quicksort/Timsort implementation.

---

## Available Solutions

Only verified solution files present in this folder are listed below:

| Language | Solution File |
| :--- | :--- |
| **JavaScript** | [2491divide-players-into-teams-of-equal-skill.js](./2491divide-players-into-teams-of-equal-skill.js) |

---

## Key Learnings

- Pairing extreme elements (smallest with largest) is the canonical greedy strategy for equalizing two-element group sums.
- Early validation of pair consistency eliminates invalid test cases immediately.
- Using two pointers after sorting is clean, intuitive, and avoids extra hash table overhead.
