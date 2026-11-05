class Solution:
    def shiftDistance(self, s: str, t: str, nextCost: List[int], previousCost: List[int]) -> int:
        pre1 = [0]
        pre2 = [0]
        for i in nextCost:
            pre1.append(i+pre1[-1])
        for i in previousCost:
            pre2.append(i+pre2[-1])
        n = len(s)
        ans = 0
        for i in range(n):
            a,b = ord(s[i])-97, ord(t[i])-97
            if a==b:
                continue
            elif a<b:
                mn1 = pre1[b]-pre1[a]
                # print(mn1, pre2[a]+pre2[-1]-pre2[b], a,b)
                mn1 = min(mn1, pre2[a+1]+pre2[-1]-pre2[b+1])
                ans+=mn1
            else:
                mn2 = pre2[a+1]-pre2[b+1]
                # print(mn2, pre1[-1]-pre1[a]+pre1[b], a,b)
                mn2 = min(mn2, pre1[-1]-pre1[a]+pre1[b])
                ans+=mn2
        return ans
"""
48
9+9+9+15+6

"ccdbbcaadb"
"aadbbdaaac"
[6,6,9,8,2,4,10,10,6,4,9,5,5,5,2,7,9,7,4,1,4,10,1,5,2,4]
[0,4,5,6,7,10,5,5,8,1,1,10,7,8,10,8,7,2,3,3,6,3,0,6,4,0]

"""
 
        