var SmallestInfiniteSet = function() {
    this.s = new Set();
    this.sm = 1;
    for (let i = 1; i <= 1000; ++i) {
        this.s.add(i);
    }
};

/**
 * @return {number}
 */
SmallestInfiniteSet.prototype.popSmallest = function() {
    let x = this.sm;
    while (!this.s.has(x)) {
        x++;
    }
    this.s.delete(x);
    this.sm = x + 1;
    return x;
};

/** 
 * @param {number} num
 * @return {void}
 */
SmallestInfiniteSet.prototype.addBack = function(num) {
    this.s.add(num);
    if (num < this.sm) {
        this.sm = num;
    }
}