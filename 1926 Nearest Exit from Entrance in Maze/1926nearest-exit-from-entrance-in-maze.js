/**
 * @param {character[][]} maze
 * @param {number[]} entrance
 * @return {number}
 */
var nearestExit = function(maze, entrance) {
    let m = maze.length;
    let n = maze[0].length;
    let q = [entrance];
    maze[entrance[0]][entrance[1]] = '+';
    let ans = 0;
    let dirs = [-1, 0, 1, 0, -1];
    while (q.length > 0) {
        ++ans;
        for (let k = q.length - 1; k >= 0; --k) {
            let p = q.shift();
            let i = p[0], j = p[1];
            for (let l = 0; l < 4; ++l) {
                let x = i + dirs[l], y = j + dirs[l + 1];
                if (x >= 0 && x < m && y >= 0 && y < n && maze[x][y] === '.') {
                    if (x === 0 || x === m - 1 || y === 0 || y === n - 1) {
                        return ans;
                    }
                    q.push([x, y]);
                    maze[x][y] = '+';
                }
            }
        }
    }
    return -1;
};