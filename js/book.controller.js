'use strict'

function onInit() {
    render()
}

function render() {

    var strHTMLs = gBooks.map(book => {
        return `
        <tr>
            <td>${book.title}</td>
            <td>${book.price}</td>
            <td>
                <button class="Book-actions Read">
                  Read
                </button>
                <button class="Book-actions Update"
                 onclick="onUpdateBook('${book.id}')">
                  Update
                </button>
                <button class="Book-actions Delete"
                 onclick="onRemoveBook('${book.id}')">
                  Delete
                </button>
            </td>
        </tr>`
    })

    document.querySelector('.Book-list').innerHTML =
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

