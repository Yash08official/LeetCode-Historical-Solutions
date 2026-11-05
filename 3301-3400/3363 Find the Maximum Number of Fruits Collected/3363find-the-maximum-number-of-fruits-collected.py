class Solution:
    def maxCollectedFruits(self, fruits: List[List[int]]) -> int:
        n = len(fruits)

        @lru_cache(None)
        def solve1(i, j):
            if i == j == n - 1:
                return 0
            if i >= j:
                return -sys.maxsize
            mx = fruits[i][j] + solve1(i + 1, j)
            if j + 1 < n:
                mx = max(mx, fruits[i][j] + solve1(i + 1, j + 1))
            if j - 1 >= 0:
                mx = max(mx, fruits[i][j] + solve1(i + 1, j - 1))
            return mx

        @lru_cache(None)
        def solve2(i, j):
            if i == j == n - 1:
                return 0
            if i <= j:
                return -sys.maxsize
            mx = fruits[i][j] + solve2(i, j + 1)
            if i + 1 < n:
                mx = max(mx, fruits[i][j] + solve2(i + 1, j + 1))
            if i - 1 >= 0:
                mx = max(mx, fruits[i][j] + solve2(i - 1, j + 1))
            return mx

        return sum([fruits[i][i] for i in range(n)]) + solve1(0, n - 1) + solve2(n - 1, 0)