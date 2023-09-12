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
// this function substracts the number of books of the distribution to the books array
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
var getMultipleAndRestOfFour = function (sum) {
    var floor = Math.floor(sum / 4);
    var decimal = sum / 4 - floor;
    return { floor: floor, decimal: decimal };
};
var getBestPriceWithDiscount = function (books) {
    var distributionArr = [];
    var booksLeft = __spreadArray([], books, true); // copy of the books array as order matters
    for (var i = 5; i > 0; i--) {
        // get the number of occurence of the distribution starting with 5 books, then 4 books, etc...
        var numberOfOccurence = getNumberOfOccurence(booksLeft, i);
        // substract the number of occurence to the books array
        booksLeft = substractToAllBooks(booksLeft, numberOfOccurence);
        // push the number of occurence to the distribution Arr
        distributionArr.push(numberOfOccurence);
    }
    // special case: as the discount for two sets of four books is greater than a set of five and a set of three.
    // we need to check if we can have two sets of four books instead of a set of five and a set of three.
    // there is four cases here for a multiple of 4: first one there is no rest, second one rest = 0.25, third one rest = 0.5 and last rest = 0.75
    // if there is no rest, it's multple of four no need to compensate with other set of books
    // if there is a rest of O.25 it means that we need to remove a set of 4 four books and add a set of 3 books
    // if there is a rest of O.5 it means that we need to remove a set of 4 four books and add a set of 2 books
    // if there is a rest of O.75 it means that we need to remove a set of 4 four books and add a set of 1 book
    // distributionArr[0] = sets of 5 books,
    // distributionArr[1] = sets of 4 books,
    // distributionArr[2] = sets of 3 books
    // distributionArr[3] = sets of 2 books
    // distributionArr[4] = sets of 1 book
    if (distributionArr[0] + distributionArr[2] >= distributionArr[1]) {
        var _a = getMultipleAndRestOfFour(distributionArr[0] * 5 + distributionArr[2] * 3), floor = _a.floor, decimal = _a.decimal;
        if (decimal === 0) {
            distributionArr[1] += floor;
            distributionArr[0] = 0;
            distributionArr[2] = 0;
        }
        if (decimal === 0.25) {
            distributionArr[1] += floor - 1;
            distributionArr[0] = 0;
            distributionArr[2] = 1;
        }
        if (decimal === 0.5) {
            distributionArr[1] += floor - 1;
            distributionArr[0] = 0;
            distributionArr[2] = 0;
            distributionArr[3] += 1;
        }
        if (decimal === 0.75) {
            distributionArr[1] += floor - 1;
            distributionArr[0] = 0;
            distributionArr[2] = 0;
            distributionArr[4] += 1;
        }
    }
    return processPriceCalcultation(distributionArr);
};
var booksDistributionInput = [2, 2, 2, 1, 1]; // number of first book, second book, third book, fourth book, fifth book.
var result = getBestPriceWithDiscount(booksDistributionInput); // returns 51.2
console.log("result:", result + "€");
