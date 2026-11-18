var BSTIterator = function(root) {

    this.stack = [];

    // Push all left nodes
    this.pushLeft(root);
};

BSTIterator.prototype.pushLeft = function(node) {

    while (node !== null) {

        this.stack.push(node);

        node = node.left;
    }
};

BSTIterator.prototype.next = function() {

    // Get the smallest available node
    let node = this.stack.pop();

    // Process right subtree
    if (node.right !== null) {

        this.pushLeft(node.right);
    }

    return node.val;
};

BSTIterator.prototype.hasNext = function() {

    return this.stack.length > 0;
};