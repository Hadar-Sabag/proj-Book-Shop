'use strict'

const BOOK_KEY = 'bookDB'
var gFilterBy = ''

var gBooks = _createBooks(6)


function getBooks() {
    if (!gFilterBy) return gBooks

    return gBooks.filter((book) =>
        book.title.toLowerCase().includes(gFilterBy.toLowerCase())
    )
}

// Get by ID
function getBook(bookId) {
    return gBooks.find((book) => book.id === bookId)
}

function addBook(title, price, imgUrl) {
    const book = _createBook(title, price, imgUrl)
    gBooks.push(book)

    _saveBooks()
    return book
}

function updateBook(bookId, newPrice) {
    const book = getBook(bookId)
    book.price = newPrice

    _saveBooks()
    return book
}

function removeBook(bookId) {
    const idx = gBooks.findIndex((book) => book.id === bookId)
    if (idx !== -1) gBooks.splice(idx, 1)

    _saveBooks()
}

function getBookStatistics() {
    return gBooks.reduce((acc, book) => {
        if (book.price < 80) acc.cheap++
        else if (book.price > 200) acc.expensive++
        else acc.avg++
        return acc
    }, { cheap: 0, avg: 0, expensive: 0 })
}

function getExpensiveBooksCount() {
    return gBooks.filter(book => book.price >= 200).length
}

function getAverageBooksCount() {
    return gBooks.filter(book => book.price > 80 && book.price < 200).length
}

function getCheapBooksCount() {
    return gBooks.filter(book => book.price <= 80).length
}

function setFilterBy(filterBy) {
    gFilterBy = filterBy
}

function getFilterBy() {
    return gFilterBy
}

function getLayout() {
    return loadFromStorage('layout_db') || 'table'
}

function saveLayout(layout) {
    saveToStorage('layout_db', layout)
}

function _saveBooks() {
    saveToStorage(BOOK_KEY, gBooks)
}

function _createBooks(count) {
    var books = loadFromStorage(BOOK_KEY)
    if (!books || !books.length) {
        books = []
        for (let i = 0; i < count; i++) {
            const book = _createBook(`Harry Potter ${i + 1}`, getRandomIntInclusive(50, 250), `img/Harry_Potter_${i + 1}.jpg`)
            books.push(book)
        }

        for (let i = 0; i < count; i++) {
            const book = _createBook(`Twilight ${i + 1}`, getRandomIntInclusive(50, 250), `img/Twilight_${i + 1}.jpg`)
            books.push(book)
        }
        saveToStorage(BOOK_KEY, books)
    }
    return books
}

function _createBook(title, price, imgUrl) {
    return {
        id: makeId(),
        title,
        price,
        imgUrl: imgUrl || 'https://islandpress.org/sites/default/files/default_book_cover_2015.jpg',
        desc: makeLorem(100),
        rating: getRandomIntInclusive(1, 5)
    }
}
