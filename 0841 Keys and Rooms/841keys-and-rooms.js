/**
 * @param {number[][]} rooms
 * @return {boolean}
 */
var canVisitAllRooms = function(rooms) {
    let cnt = 0;
    let vis = new Array(rooms.length).fill(false);

    function dfs(i) {
        if (vis[i]) {
            return;
        }
        vis[i] = true;
        cnt++;
        for (let j of rooms[i]) {
            dfs(j);
        }
    }

    dfs(0);
    return cnt === rooms.length;
};