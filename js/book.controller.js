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
                <button>
                  Read
                </button>
                <button 
                 onclick="onUpdateBook('${book.id}')">
                  Update
                </button>
                <button 
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

