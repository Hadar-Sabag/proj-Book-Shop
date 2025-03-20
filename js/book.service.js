'use strict'

const gBooks = [
    {
        id: 'bg4J78',
        title: 'Harry Potter',
        price: 120,
        imgUrl: 'lori-ipsi.jpg'
    },
    {
        id: 'bg4J79',
        title: 'Twilight',
        price: 300,
        imgUrl: 'lori-ipsi.jpg'
    },
    {
        id: 'bg4J77',
        title: 'Hunger Games',
        price: 87,
        imgUrl: 'lori-ipsi.jpg'
    }
]

function getBooks() {
    return gBooks()
}

function removeBook(bookId) {

    var bookIdx = gBooks.findIndex(book => book.id === bookId)
    if (bookIdx !== -1) gBooks.splice(bookIdx, 1)
}
