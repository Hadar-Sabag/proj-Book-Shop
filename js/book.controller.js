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
                      <button>Read</button>
                      <button>Update</button>
                      <button>Delete</button>
                   </td>
                </tr>`
    })

    document.querySelector('.Book-list').innerHTML =
        strHTMLs.join('')
}
