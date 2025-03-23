'use strict'

const BOOK_KEY = 'bookDB'

var gFilterBy = ''

var gBooks

_createBooks(6)

function getBooks(options = {}) {
    const filterBy = options.filterBy
    // const sortBy = options.sortBy
    // console.log('sortBy:', sortBy)
    // const page = options.page
    // console.log('page:', page)

    var books = gBooks

    books = _filterBooks(filterBy)

    // if (sortBy.vendor) {
    //     const sortDir = sortBy.vendor
    //     books = books.toSorted((c1, c2) => c1.vendor.localeCompare(c2.vendor) * sortDir)

    // } else if (sortBy.maxSpeed) {
    //     const sortDir = sortBy.maxSpeed
    //     books = books.toSorted((c1, c2) => (c1.maxSpeed - c2.maxSpeed) * sortDir)
    // }

    // console.log('cars:', cars)
    // const startIdx = page.idx * page.size // 0 , 3 , 6
    // books = books.slice(startIdx, startIdx + page.size) // 0-3 , 3-6 , 6-9

    return books
}

function _filterBooks(filterBy) {
    var books = gBooks
    if (filterBy.txt) {
        books = books.filter(book => book.title.toLowerCase().includes(filterBy.txt.toLowerCase()))
    }
    if (filterBy.rate) {
        books = books.filter(book => book.rating >= filterBy.rate)
    }
    return books
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

// function getExpensiveBooksCount() {
//     return gBooks.filter(book => book.price >= 200).length
// }

// function getAverageBooksCount() {
//     return gBooks.filter(book => book.price > 80 && book.price < 200).length
// }

// function getCheapBooksCount() {
//     return gBooks.filter(book => book.price <= 80).length
// }

// function setFilterBy(filterBy) {
//     gFilterBy = filterBy
// }

// function getFilterBy() {
//     return gFilterBy
// }

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
    gBooks = loadFromStorage(BOOK_KEY)
    if (!gBooks || !gBooks.length) {
        gBooks = []
        for (let i = 0; i < count; i++) {
            const book = _createBook(`Harry Potter ${i + 1}`, getRandomIntInclusive(50, 250), `img/Harry_Potter_${i + 1}.jpg`)
            gBooks.push(book)
        }

        for (let i = 0; i < count; i++) {
            const book = _createBook(`Twilight ${i + 1}`, getRandomIntInclusive(50, 250), `img/Twilight_${i + 1}.jpg`)
            gBooks.push(book)
        }
        saveToStorage(BOOK_KEY, gBooks)
    }
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
