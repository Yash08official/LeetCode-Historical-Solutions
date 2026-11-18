var titleToNumber = function(columnTitle) {

    let result = 0;

    for (let i = 0; i < columnTitle.length; i++) {

        let value = columnTitle.charCodeAt(i) - 64;

        result = result * 26 + value;
    }

    return result;
};