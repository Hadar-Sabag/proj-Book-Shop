'use strict'

function onInit() {
    render()
}

function render() {
    var books = getBooksForDisplay()

    var strHTMLs = books.map(book => {
        return `
        <tr>
            <td>${book.title}</td>
            <td>${book.price}</td>
            <td>
                <button class="book-actions read"
                 onclick="onOpenBookDetails('${book.id}')">
                  Read
                </button>
                <button class="book-actions update"
                 onclick="onUpdateBook('${book.id}')">
                  Update
                </button>
                <button class="book-actions delete"
                 onclick="onRemoveBook('${book.id}')">
                  Delete
                </button>
            </td>
        </tr>`
    })

    document.querySelector('.book-list').innerHTML =
        strHTMLs.join('')
}

function onRemoveBook(bookId) {

    removeBook(bookId)
    render()
}

function onUpdateBook(bookId) {

    var submitPrice = +prompt('Enter New Price')
    updatePrice(bookId, submitPrice)
    render()
}

function onAddBook() {
    var submitName = prompt('Enter Book Name')
    var submitPrice = +prompt('Enter Price')
    addBook(submitName, submitPrice)
    render()
}

function onOpenBookDetails(bookId) {
    var book = getBook(bookId)
    var elModal = document.querySelector('.book-modal')
    elModal.showModal()
    var elTitle = document.querySelector('.title span')
    elTitle.innerText = book.title
    var elPrice = document.querySelector('.price span')
    elPrice.innerText = book.price
    var elImg = document.querySelector('img')
    elImg.src = book.imgUrl
}

function onCloseModal() {
    var elModal = document.querySelector('.book-modal')
    elModal.close()
}

function onSetFilter(filterBy) {
    var filterText = filterBy.toLowerCase()
    setFilter(filterText)
    render()
}
function onClearFilter(filterBy) {
    filterBy = ''
    setFilter('')
    render()
}
