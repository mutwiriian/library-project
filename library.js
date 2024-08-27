const library = [];

class Book {
    constructor(title, author, pages, read){
        this.title = title
        this.author = author
        this.pages = pages
        this.read = read
    }
    
    info() {
    if (read === 'Yes') {
        return `${title} by ${author}, ${pages} pages, read`
    } else {
        return `${title} by ${author}, ${pages} pages, not read yet`
        }
    }

    toggleReadStatus() {
        this.read = !this.read
    }
}

function createBook(){
    let title = document.querySelector("#title").value
    let author = document.querySelector("#author").value
    let pages = document.querySelector("#pages").value
    let read = document.querySelector("#read").value

    let book = new Book(title, author, pages, read)

    return book
}

function addBookToLibrary(book) {
    library.push(book)
}

let dialogue = document.querySelector(".form-dialog")

let newBookButton = document.querySelector(".new-book-button")

newBookButton.addEventListener('click',() => {
    dialogue.showModal()
    let closeButton = document.querySelector('.close')

    closeButton.addEventListener('click', () => {
        dialogue.close()
    })

})

let submitButton = document.querySelector(".submit-button")
let booksContainer = document.querySelector(".books-container")

submitButton.addEventListener('click', (event) => {
    event.preventDefault()
    let book = createBook()
    dialogue.close()
    addBookToLibrary(book)

    let bookElement = document.createElement('div')
    bookElement.classList.add('book')
    bookElement.innerHTML = `
        <ul>
            <li>Title : ${book.title}</li>
            <li>Author : ${book.author}</li>
            <li>Pages : ${book.pages}</li>
            <li>Read : ${book.read}</li>
        </ul>
        <button type="submit" class="delete-button">Remove</button>
        <button type="submit" class="toggle-read">Toggle</button>
    `
    booksContainer.appendChild(bookElement)

    let deleteButton = bookElement.querySelector(".delete-button")

    deleteButton.addEventListener('click', (event) => {
        event.preventDefault()
        let bookElement = event.target.parentElement
        let bookTitle = bookElement.querySelector('ul > li:nth-child(1)').textContent.split(' : ')[1]
        let bookIndex = library.findIndex(book => book.title === bookTitle)
        if (bookIndex !== -1) {
            library.splice(bookIndex,1)

            bookElement.remove()
        }
    })

    let toggleButton = bookElement.querySelector('.toggle-read')

    toggleButton.addEventListener('click', () => {
        book.toggleReadStatus()
        let bookread = bookElement.querySelector('ul > li:last-child')
        bookread.textContent = book.read ? 'Read : Yes' : 'Read : No'
    })

})


