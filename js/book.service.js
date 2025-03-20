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
            _createBook('Harry Potter', 120, 'img/Harry_Potter.jpg'),
            _createBook('Twilight', 300, 'img/Twilight.jpg'),
            _createBook('Hunger Games', 87, 'img/Hunger_Games.jpg')
        ]
    }
}

function _createBook(title, price, img) {
    return {
        id: makeId(),
        title,
        price,
        imgUrl: img || 'img/random.jpg'
    }
}

function openBookDetails(bookId) {

}

