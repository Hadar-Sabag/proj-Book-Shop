'use strict'

var gBooks
_createBooks()
console.log('gBooks: ', gBooks)

function getBooks() {
    return gBooks
}

function getBook(bookId) {
    return gBooks.find(book => book.id === bookId)
}


function removeBook(bookId) {
    var bookIdx = gBooks.findIndex(book => book.id === bookId)
    if (bookIdx !== -1) gBooks.splice(bookIdx, 1)
}

function updatePrice(bookId, price) {
    var book = getBook(bookId)
    book.price = price
    return book
}

function addBook(name, price) {
    var book = _createBook(name, price)
    gBooks.push(book)

}

function _createBooks() {
    if (!gBooks || !gBooks.length) {
        gBooks = [
            _createBook('Harry Potter', 120),
            _createBook('Twilight', 300),
            _createBook('Hunger Games', 87)
        ]
    }
}

function _createBook(title, price) {
    return {
        id: makeId(),
        title,
        price,
        imgUrl: `<img src="img/'${title}'.jpg">`
    }
}

