class SegmentTree:
    def __init__(self, size):
        self.n = size
        self.tree = [0] * (4 * size)
        self.lazy = [0] * (4 * size)

    def push_down(self, node, l, r):
        if self.lazy[node] != 0:
            self.tree[node] += self.lazy[node]
            if l != r:
                self.lazy[2 * node] += self.lazy[node]
                self.lazy[2 * node + 1] += self.lazy[node]
            self.lazy[node] = 0

    def build(self, allowed, node, l, r):
        self.push_down(node, l, r)
        if l == r:
            self.tree[node] = allowed[l]
        else:
            mid = l + (r - l) // 2
            self.build(allowed, 2 * node, l, mid)
            self.build(allowed, 2 * node + 1, mid + 1, r)
            self.tree[node] = min(self.tree[2 * node], self.tree[2 * node + 1])

    def query_min(self, node, l, r, ql, qr):
        self.push_down(node, l, r)
        if qr < l or ql > r:
            return float('inf')
        if ql <= l and qr >= r:
            return self.tree[node]
        mid = l + (r - l) // 2
        return min(self.query_min(2 * node, l, mid, ql, qr),
                   self.query_min(2 * node + 1, mid + 1, r, ql, qr))

    def decrement_range(self, node, l, r, ql, qr):
        self.push_down(node, l, r)
        if ql > r or qr < l:
            return
        if ql <= l and qr >= r:
            self.lazy[node] -= 1
            self.push_down(node, l, r)
            return
        mid = l + (r - l) // 2
        self.decrement_range(2 * node, l, mid, ql, qr)
        self.decrement_range(2 * node + 1, mid + 1, r, ql, qr)
        self.tree[node] = min(self.tree[2 * node], self.tree[2 * node + 1])


class Solution:
    def maxRemoval(self, nums, queries):
        n = len(nums)
        m = len(queries)
        allowed = [0] * n
        current = 0
        prefix = [0] * (n + 1)
        for l, r in queries:
            prefix[l] += 1
            prefix[r + 1] -= 1
        for i in range(n):
            current += prefix[i]
            allowed[i] = current - nums[i]
            if allowed[i] < 0:
                return -1
        sq = sorted(queries, key=lambda q: (q[1] - q[0] + 1, q[0]))
        seg = SegmentTree(n)
        seg.build(allowed, 1, 0, n - 1)
        cnt = 0
        for l, r in sq:
            mn = seg.query_min(1, 0, n - 1, l, r)
            if mn >= 1:
                seg.decrement_range(1, 0, n - 1, l, r)
                cnt += 1
        return cnt
