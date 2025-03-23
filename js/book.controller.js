'use strict'

function onInit() {
    renderBooks()
}

function renderBooks() {
    const books = getBooks()
    const layout = getLayout()
    // BONUS : Render different layouts.
    if (layout === 'table') renderBooksTable(books)
    else renderBooksCards(books)

    renderStatistics()
}

function renderBooksTable(books) {
    // Hide cards container
    document.querySelector('.cards-container ').style.display = 'none'

    var strHTML
    if (!books.length) {
        strHTML = `<tr>
                        <td colspan="4">No matching books were found...</td>
                   </tr>`
    } else {
        strHTML = books.map(book => {
            return `<tr>
                        <td>${book.title}</td>
                        <td>$${book.price.toFixed(2)}</td>
                        <td>${book.rating}</td>
                        <td class="actions">
                            <button onclick="onReadBook('${book.id}')" >Read</button>
                            <button onclick="onUpdateBook('${book.id}')" >Update</button>
                            <button onclick="onRemoveBook('${book.id}')" >Delete</button>
                        </td>
                    </tr>`
        }).join('')
    }

    // Show and render table container 
    const elContainer = document.querySelector('.table-container tbody')
    elContainer.innerHTML = strHTML
    document.querySelector('table').style.display = 'table'
}

function renderBooksCards(books) {
    // Hide table container
    document.querySelector('.table-container').style.display = 'none'

    var strHTML
    if (!books.length) {
        strHTML = `<div class="book-card">No matching books were found...</div>`
    } else {
        strHTML = books.map(book => {
            return `
            <div class="book-card">
                <p><strong>title:</strong> ${book.title}</p>
                <img src="${book.imgUrl}" />
                <div class="actions">
                    <button onclick="onReadBook('${book.id}')" >Read</button>
                    <button onclick="onUpdateBook('${book.id}')" >Update</button>
                    <button onclick="onRemoveBook('${book.id}')" >Delete</button>
                </div>
            </div>`
        }).join('')
    }
    // Show and render cards container
    const elContainer = document.querySelector('.cards-container')
    elContainer.innerHTML = strHTML
    elContainer.style.display = 'flex'
}

function renderStatistics() {
    const elFooter = document.querySelector('footer')

    // Using filters
    // elFooter.querySelector('.expensive-count').innerText = getExpensiveBooksCount()
    // elFooter.querySelector('.avg-count').innerText = getAverageBooksCount()
    // elFooter.querySelector('.cheap-count').innerText = getCheapBooksCount()

    // Using reduce
    const bookStatisticMap = getBookStatistics()
    elFooter.querySelector('.expensive-count').innerText = bookStatisticMap.expensive
    elFooter.querySelector('.avg-count').innerText = bookStatisticMap.avg
    elFooter.querySelector('.cheap-count').innerText = bookStatisticMap.cheap
}

function onSetLayout(layout) {
    saveLayout(layout)
    renderBooks()
}

function onSetFilterBy(elInput) {
    const filterBy = elInput.value
    setFilterBy(filterBy)
    renderBooks()
}

// Create 
function onAddBook() {
    const title = prompt('Book title')
    const price = +prompt('Book price')
    const imgUrl = prompt('Book image url')
    if (!title || !price) {
        alert('Please make sure to enter all required book details properly.')
    } else {
        addBook(title, price, imgUrl)
        renderBooks()
        showMsg('added')
    }
}

// Delete
function onRemoveBook(bookId) {
    const isRemoving = confirm('Are you sure you want to remove this book?')
    if (!isRemoving) return

    removeBook(bookId)
    renderBooks()
    showMsg('deleted')
}

// Update
function onUpdateBook(bookId) {
    const newPrice = +prompt('Enter a new price')
    if (!newPrice) {
        alert('You must enter a new price')
        return
    }
    updateBook(bookId, newPrice)
    renderBooks()
    showMsg('updated')
}

// Read
function onReadBook(bookId) {
    const book = getBook(bookId)

    const elModal = document.querySelector('.book-details')
    elModal.querySelector('img').src = book.imgUrl
    elModal.querySelector('.title span').innerText = book.title
    elModal.querySelector('.price span').innerText = '$' + book.price
    elModal.querySelector('.desc').innerText = book.desc

    elModal.classList.remove('hide')
}

function closeModal() {
    const elBookModal = document.querySelector('.book-details')
    elBookModal.classList.add('hide')
}

// can also send the the entie msg instead of just the action.
function showMsg(action) {
    const msg = `you successfully ${action} the book`
    const elMsg = document.querySelector('.user-msg')
    elMsg.innerText = msg
    elMsg.classList.remove('hide')

    setTimeout(() => {
        elMsg.classList.add('hide')
    }, 2000)
}



