'use strict'

var gBooks
var gFilterBy = ''
const STORAGE_KEY = 'booksdb'

_createBooks()

function getBooks() {
    return gBooks
}

function getBook(bookId) {
    return gBooks.find(book => book.id === bookId)
}


function removeBook(bookId) {
    var bookIdx = gBooks.findIndex(book => book.id === bookId)
    if (bookIdx !== -1) gBooks.splice(bookIdx, 1)

    _saveBooks()
}

function updatePrice(bookId, price) {
    var book = getBook(bookId)
    book.price = price

    _saveBooks()
    return book
}

function addBook(name, price) {
    if (!name || !price) return
    var book = _createBook(name, price)
    gBooks.push(book)

    _saveBooks()
    return book
}

function _createBooks() {
    gBooks = loadFromStorage(STORAGE_KEY)

    if (!gBooks || !gBooks.length) {
        gBooks = [
            _createBook('Harry Potter', 120, 'img/Harry_Potter.jpg'),
            _createBook('Twilight', 300, 'img/Twilight.jpg'),
            _createBook('Hunger Games', 87, 'img/Hunger_Games.jpg')
        ]
        _saveBooks()
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

function _saveBooks() {
    saveToStorage(STORAGE_KEY, gBooks)
}

function setFilter(filterBy) {
    gFilterBy = filterBy
}

function getBooksForDisplay() {
    return gBooks.filter(book => book.title.toLowerCase().includes(gFilterBy))
}

function getExpensiveBooksCount() {
    return gBooks.filter(book => book.price > 200).length
}

function getAverageBooksCount() {
    return gBooks.filter(book => book.price > 80).length
}

function getCheapBooksCount() {
    return gBooks.filter(book => book.price < 80).length
}


