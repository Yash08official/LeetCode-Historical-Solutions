class Solution:
    def canAliceWin(self, n: int) -> bool:
        cnt =0 
        curr =10
        while n>=curr:
            n-=curr
            curr-=1
            cnt+=1
        if cnt%2:
            return True
        return False
            
        