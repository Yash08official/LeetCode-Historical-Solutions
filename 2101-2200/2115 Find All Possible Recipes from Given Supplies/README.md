---
comments: true
difficulty: Medium
tags:
  - Array
  - Hash Table
  - String
  - Graph Theory
  - Topological Sort
  - Directed Acyclic Graph
---

# 2115. Find All Possible Recipes from Given Supplies

**[View Problem on LeetCode](https://leetcode.com/problems/find-all-possible-recipes-from-given-supplies/)**

| Attribute | Details |
| :--- | :--- |
| **Problem ID** | `2115` (`2115`) |
| **Difficulty** | Medium |
| **Topics / Tags** | `Array`, `Hash Table`, `String`, `Graph Theory`, `Topological Sort`, `Directed Acyclic Graph` |
| **Solution Language** | Java |

---

## Problem Description

You are given `n` recipes described by a string array `recipes` and a 2D list `ingredients`, where creating `recipes[i]` requires having **all** items listed in `ingredients[i]`. An ingredient may either be a raw item or another recipe from `recipes`.

You are also given a string array `supplies` representing raw ingredients initially available in infinite quantity. Once a recipe can be created, it can also be used as an infinite ingredient for other recipes. Note that recipes may have circular dependencies on one another.

Return a list of all recipes you can create in **any order**.

---

## Examples

### Example 1

```text
Input: recipes = ["bread"], ingredients = [["yeast","flour"]], supplies = ["yeast","flour","corn"]
Output: ["bread"]
Explanation:
We can create "bread" since we have the ingredients "yeast" and "flour".
```

### Example 2

```text
Input: recipes = ["bread","sandwich"], ingredients = [["yeast","flour"],["bread","meat"]], supplies = ["yeast","flour","meat"]
Output: ["bread","sandwich"]
Explanation:
We can create "bread" since we have the ingredients "yeast" and "flour".
We can create "sandwich" since we have the ingredient "meat" and can create the ingredient "bread".
```

### Example 3

```text
Input: recipes = ["bread","sandwich","burger"], ingredients = [["yeast","flour"],["bread","meat"],["sandwich","meat","bread"]], supplies = ["yeast","flour","meat"]
Output: ["bread","sandwich","burger"]
Explanation:
We can create "bread" since we have the ingredients "yeast" and "flour".
We can create "sandwich" since we have the ingredient "meat" and can create the ingredient "bread".
We can create "burger" since we have the ingredient "meat" and can create the ingredients "bread" and "sandwich".
```

---

## Constraints

- `n == recipes.length == ingredients.length`

- `1 <= n <= 100`

- `1 <= ingredients[i].length, supplies.length <= 100`

- `1 <= recipes[i].length, ingredients[i][j].length, supplies[k].length <= 10`

- `recipes[i], ingredients[i][j]`, and `supplies[k]` consist only of lowercase English letters.

- All the values of `recipes` and `supplies` combined are unique.

- Each `ingredients[i]` does not contain any duplicate values.

---

## Problem Understanding

- **Directed Dependency Graph:** A recipe `R` becomes creatable as soon as every item `v` in its ingredient list is available. Thus each requirement `v` imposes a directed edge `v -> R`.
- **In-Degree as Missing Ingredients:** If we define `indeg[R] = ingredients[R].size()`, then each time an available supply or newly unlocked recipe `i` is processed, we can decrement `indeg[R]` for every recipe `R` that depends on `i`. When `indeg[R]` hits `0`, all prerequisites of `R` are satisfied!
- **Handling Cycles & Missing Items:**
  - If two recipes depend on each other in a cycle, neither will ever have its `indeg` reduced to `0`, so Kahn's algorithm safely ignores them without infinite loops.
  - If an ingredient in `ingredients[i]` is neither in `supplies` nor a creatable recipe, it never enters the queue, so `indeg[recipes[i]]` never reaches `0`.

---

## Approach

### Brute Force Approach

Put initial `supplies` in a `HashSet` and repeatedly loop over all uncreated recipes, checking whether every ingredient of `recipes[i]` is currently in the set; if at least one new recipe is created during a pass, add it to the set and repeat until a full pass creates nothing. In a chain of `n` dependent recipes each having `m` ingredients, this performs `O(n)` passes over `O(n * m)` strings, taking `O(n^2 * m)` time.

### Optimized Approach

Build a dependency graph (`ingredient -> dependent recipes`) and an `indeg` map (`recipe -> unmet ingredient count`), then run **Kahn's Topological Sort (BFS)** seeded with initial `supplies` to unlock recipes in `O(R + S + I)` time.

### Step-by-Step Thinking Process

1. Model dependencies forward from ingredient to recipe: for each recipe `recipes[i]` and each ingredient `v` in `ingredients.get(i)`, add a directed edge `v -> recipes[i]` in map `g`.
2. Record `indeg.put(recipes[i], ingredients.get(i).size())`, since `ingredients[i]` contains no duplicate strings.
3. Seed a BFS queue `q` with all initial `supplies` (items already available with zero prerequisites).
4. Pop each available item `i` from `q`, iterate over its dependent recipes `j` in `g`, decrement `indeg[j]`, and whenever `indeg[j] == 0`, add `j` to both `ans` and `q` so `j` can unlock downstream recipes.

### Algorithm / Intuition

In `findAllRecipes`, `g` maps any string `v` (whether raw supply, intermediate recipe, or unavailable item) to the `List<String>` of recipes that list `v` as an ingredient, while `indeg` tracks how many distinct ingredients each recipe still lacks (valid because the constraints guarantee each `ingredients[i]` has no duplicates, and `recipes` and `supplies` are mutually disjoint).

Initially, only `supplies` are pushed into `Deque<String> q`. Note that `supplies` are **not** added to `ans`—only nodes whose `indeg` drops to `0` inside the BFS loop are added to `ans`, and since only recipes exist in `indeg`, `ans` exclusively collects creatable recipes! Whenever `indeg.get(j) == 0`, `j` is immediately enqueued into `q`, propagating availability through arbitrarily deep recipe chains while leaving cyclic dependencies untouched.

---

## Dry Run

Trace on **Example 1** (and note chain behavior): `recipes = ["bread"]`, `ingredients = [["yeast", "flour"]]`, `supplies = ["yeast", "flour", "corn"]`.

1. **Build `g` and `indeg`:**
   - `g = {"yeast": ["bread"], "flour": ["bread"]}`
   - `indeg = {"bread": 2}`
2. **Initialize Queue `q`:**
   - `q = ["yeast", "flour", "corn"]`, `ans = []`
3. **BFS Execution:**
   - Poll `"yeast"`: neighbor `"bread"` -> `indeg["bread"]` becomes `2 - 1 = 1` (`!= 0`).
   - Poll `"flour"`: neighbor `"bread"` -> `indeg["bread"]` becomes `1 - 1 = 0`! Add `"bread"` to `ans` (`["bread"]`) and `q.offer("bread")`.
   - Poll `"corn"`: `g.getOrDefault("corn", empty)` is empty -> nothing to update.
   - Next level: poll `"bread"`: `g.getOrDefault("bread", empty)` is empty -> queue becomes empty.
4. **Return `ans`:** `["bread"]`.

---

## Complexity Analysis

- **Time Complexity:** `O(R + S + I)` — Letting `R = recipes.length`, `S = supplies.length`, and `I` be the total number of strings across `ingredients` (with string length bounded by `10`), building `g`/`indeg` and processing each node and directed edge once in Kahn's BFS takes linear time in the input size.
- **Space Complexity:** `O(R + S + I)` — The adjacency map `g` stores `I` recipe references, `indeg` stores `R` entries, and the queue `q` holds at most `S + R` strings.

---

## Available Solutions

Only verified solution files present in this folder are listed below:

| Language | Solution File |
| :--- | :--- |
| **Java** | [2115find-all-possible-recipes-from-given-supplies.java](./2115find-all-possible-recipes-from-given-supplies.java) |

---

## Key Learnings

- Kahn's algorithm (BFS topological sort) naturally handles cyclic dependencies in prerequisite graphs without explicit cycle-detection flags—nodes in a cycle simply never reach `in-degree == 0`.
- Directing edges from *prerequisite* to *dependent* (`ingredient -> recipe`) lets availability propagate forward from base supplies in a single pass.
