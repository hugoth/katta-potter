var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var price = 8; // price of one book in euros
var discounts = [1, 0.95, 0.9, 0.8, 0.75]; // tab representing the discount for 1 book, 2 books, 3 books, 4 books, 5 books. eg: 2 books = 5% discount = 100% - 5% = 95% = 0.95
var getNumberOfOccurence = function (books, nbOfBooks) {
    var numberOfDifferentBooks = 0;
    var copyBooks = __spreadArray([], books, true);
    var positiveBooks = copyBooks.filter(function (book) { return book > 0; });
    var littleNumberOfBooks = positiveBooks.sort(function (a, b) { return a - b; })[0];
    if (positiveBooks.length === nbOfBooks) {
        numberOfDifferentBooks = littleNumberOfBooks;
    }
    return numberOfDifferentBooks;
};
// this function substracts the number of books of the repartition to the books array
var substractToAllBooks = function (books, numberOfDifferentBooks) {
    var substractedBooks = books.map(function (book) { return book - numberOfDifferentBooks; });
    return substractedBooks;
};
// this function applies the specific discount for each repartition of book and returns the price
var processPriceCalcultation = function (distributionTab) {
    var inverseDistributionArr = distributionTab.reverse(); // reverse as we gonna apply the corresponding discount from the end of the array
    var price = 0;
    for (var i = 0; i < inverseDistributionArr.length; i++) {
        if (inverseDistributionArr[i] > 0) {
            price += inverseDistributionArr[i] * (i + 1) * 8 * discounts[i];
        }
    }
    return price;
};
var isMultipleOfFour = function (sum) {
    return sum % 4 === 0;
};
var getBestPriceWithDiscount = function (books) {
    var distributionArr = [];
    var booksLeft = __spreadArray([], books, true); // copy of the books array as order matters
    for (var i = 5; i > 0; i--) {
        // get the number of occurence of the repartition starting with 5 books, then 4 books, etc...
        var numberOfOccurence = getNumberOfOccurence(booksLeft, i);
        // substract the number of occurence to the books array
        booksLeft = substractToAllBooks(booksLeft, numberOfOccurence);
        // push the number of occurence to the repartition Arr
        distributionArr.push(numberOfOccurence);
    }
    // special case: as the discount for two sets of four books is greater than a set of five and a set of three.
    // we need to check if we can have two sets of four books instead of a set of five and a set of three.
    // if so, we need to update the repartition Arr accordingly.
    if (distributionArr[0] + distributionArr[2] >= distributionArr[1]) {
        distributionArr[1] = distributionArr[0] + distributionArr[2];
        distributionArr[0] = 0;
        distributionArr[2] = 0;
    }
    return processPriceCalcultation(distributionArr);
};
var booksDistributionInput = [2, 2, 2, 1, 1]; // number of first book, second book, third book, fourth book, fifth book.
var result = getBestPriceWithDiscount(booksDistributionInput); // returns 51.2
console.log("result:", result + "€");
