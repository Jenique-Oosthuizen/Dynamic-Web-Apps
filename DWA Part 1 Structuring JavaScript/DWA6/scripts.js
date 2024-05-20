
import { books, authors, genres, BOOKS_PER_PAGE } from './data.js'
import { DOM } from './view.js';

/**
 * @type {number} 
 * The current page number.
 */
let page = 1;

/**
 * @type {Array<Object>} 
 * The list of book objects.
 */
let matches = books

/**
 * @type {DocumentFragment} 
 * A document fragment to hold the elements before appending to the DOM.
 */
const starting = document.createDocumentFragment()

const extractedBooks = books.slice(0, 36)
/**
 * Creates a preview element for a book.
 * @param {object} book - The book object containing information like id, image, title, and author.
 * @returns {HTMLElement} - The HTML button element representing the book preview.
 */
const createPreview = (book) => {
    const { author, id, image, title } = book
    const authorName = authors[author]
    const element = document.createElement('button')
    element.classList.add('preview')
    element.setAttribute('data-preview', id)
    element.innerHTML = /*html*/`
        <img
            class="preview__image"
            src="${image}"
        />
            
        <div class="preview__info">
            <h3 class="preview__title">${title}</h3>
            <div class="preview__author">${authorName}</div>
        </div>
        `
    return element
    }    

extractedBooks.forEach((book) => {
    const preview = createPreview(book)
    starting.appendChild(preview)
})

DOM.list.items.appendChild(starting)
//----------------------------------------------------------------------------//
/**
 * Creates and appends genre options to the genre select element.
 * @type {DocumentFragment}
 */
const genreHtml = document.createDocumentFragment()
const firstGenreElement = document.createElement('option')
firstGenreElement.value = 'any'
firstGenreElement.innerText = 'All Genres'
genreHtml.appendChild(firstGenreElement)

for (const [id, name] of Object.entries(genres)) {
    const element = document.createElement('option')
    element.value = id
    element.innerText = name
    genreHtml.appendChild(element)
}

DOM.search.genres.appendChild(genreHtml)
//----------------------------------------------------------------------------//
/**
 * Creates and appends author options to the author select element.
 * @type {DocumentFragment}
 */
const authorsHtml = document.createDocumentFragment()
const firstAuthorElement = document.createElement('option')
firstAuthorElement.value = 'any'
firstAuthorElement.innerText = 'All Authors'
authorsHtml.appendChild(firstAuthorElement)

for (const [id, name] of Object.entries(authors)) {
    const element = document.createElement('option')
    element.value = id
    element.innerText = name
    authorsHtml.appendChild(element)
}

DOM.search.authors.appendChild(authorsHtml)
//----------------------------------------------------------------------------//
/**
 * Sets the initial theme based on the user's preferred color scheme.
 * If the preferred color scheme is dark, sets the theme to night; otherwise, sets it to day.
 */
if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    DOM.settings.theme.value = 'night'
    document.documentElement.style.setProperty('--color-dark', '255, 255, 255');
    document.documentElement.style.setProperty('--color-light', '10, 10, 20');
} else {
    DOM.settings.theme.value = 'day'
    document.documentElement.style.setProperty('--color-dark', '10, 10, 20');
    document.documentElement.style.setProperty('--color-light', '255, 255, 255');
}
//----------------------------------------------------------------------------//
/**
 * Updates the "Show more" button with the number of remaining books and enables/disables the button based on the remaining books.
 */
DOM.list.button.innerText = `Show more (${books.length - BOOKS_PER_PAGE})`
DOM.list.button.disabled = (matches.length - (page * BOOKS_PER_PAGE)) > 0

DOM.list.button.innerHTML = `
    <span>Show more</span>
    <span class="list__remaining"> (${(matches.length - (page * BOOKS_PER_PAGE)) > 0 ? (matches.length - (page * BOOKS_PER_PAGE)) : 0})</span>
`
//---------------------EVENT LISTENERS------------------------//
/**
 * Event listener for the settings form submission.
 * Updates the theme based on user selection.
 * 
 * @param {Event} event - The event object.
 */
DOM.settings.form.addEventListener('submit', (event) => {
    event.preventDefault()
    const formData = new FormData(event.target)
    const { theme } = Object.fromEntries(formData)

    if (theme === 'night') {
        document.documentElement.style.setProperty('--color-dark', '255, 255, 255');
        document.documentElement.style.setProperty('--color-light', '10, 10, 20');
    } else {
        document.documentElement.style.setProperty('--color-dark', '10, 10, 20');
        document.documentElement.style.setProperty('--color-light', '255, 255, 255');
    }
    
    document.querySelector('[data-settings-overlay]').open = false
})

//----------------------------------------------------------------------------//
DOM.search.cancel.addEventListener('click', () => {
    DOM.search.overlay.open = false
})

DOM.settings.cancel.addEventListener('click', () => {
    DOM.settings.overlay.open = false
})

DOM.header.search.addEventListener('click', () => {
    DOM.search.overlay.open = true 
    DOM.search.title.focus()
})

DOM.header.settings.addEventListener('click', () => {
    DOM.settings.overlay.open = true 
})

DOM.list.close.addEventListener('click', () => {
    DOM.list.active.open = false
})
//----------------------------------------------------------------------------//
/**
 * Event listener for the search form submission.
 * Filters the book list based on the search criteria and updates the display.
 * 
 * @param {Event} event - The event object.
 */
DOM.search.form.addEventListener('submit', (event) => {
    event.preventDefault()
    const formData = new FormData(event.target)
    const filters = Object.fromEntries(formData)
    const result = []

    for (const book of books) {
        let genreMatch = filters.genre === 'any'

        for (const singleGenre of book.genres) {
            if (genreMatch) break;
            if (singleGenre === filters.genre) { genreMatch = true }
        }

        if (
            (filters.title.trim() === '' || book.title.toLowerCase().includes(filters.title.toLowerCase())) && 
            (filters.author === 'any' || book.author === filters.author) && 
            genreMatch
        ) {
            result.push(book)
        }
    }

    page = 1;
    matches = result

    if (result.length < 1) {
        DOM.list.message.classList.add('list__message_show')
    } else {
        DOM.list.message.classList.remove('list__message_show')
    }

    DOM.list.items.innerHTML = ''
    const newItems = document.createDocumentFragment()

    for (const { author, id, image, title } of result.slice(0, BOOKS_PER_PAGE)) {
        const element = document.createElement('button')
        element.classList = 'preview'
        element.setAttribute('data-preview', id)
    
        element.innerHTML = `
            <img
                class="preview__image"
                src="${image}"
            />
            
            <div class="preview__info">
                <h3 class="preview__title">${title}</h3>
                <div class="preview__author">${authors[author]}</div>
            </div>
        `

        newItems.appendChild(element)
    }

    DOM.list.items.appendChild(newItems)
    DOM.list.button.disabled = (matches.length - (page * BOOKS_PER_PAGE)) < 1

    DOM.list.button.innerHTML = `
        <span>Show more</span>
        <span class="list__remaining"> (${(matches.length - (page * BOOKS_PER_PAGE)) > 0 ? (matches.length - (page * BOOKS_PER_PAGE)) : 0})</span>
    `

    window.scrollTo({top: 0, behavior: 'smooth'});
    DOM.search.overlay.open = false
})
//----------------------------------------------------------------------------//
/**
 * Event listener for the "Show more" button.
 * Loads and displays more book previews when the button is clicked.
 */
DOM.list.button.addEventListener('click', () => {
    const fragment = document.createDocumentFragment()

    for (const { author, id, image, title } of matches.slice(page * BOOKS_PER_PAGE, (page + 1) * BOOKS_PER_PAGE)) {
        const element = document.createElement('button')
        element.classList = 'preview'
        element.setAttribute('data-preview', id)
    
        element.innerHTML = `
            <img
                class="preview__image"
                src="${image}"
            />
            
            <div class="preview__info">
                <h3 class="preview__title">${title}</h3>
                <div class="preview__author">${authors[author]}</div>
            </div>
        `

        fragment.appendChild(element)
    }

    DOM.list.items.appendChild(fragment)
    page += 1
})
//----------------------------------------------------------------------------//
/**
 * Event listener for the list items.
 * Displays the details of the selected book in an overlay.
 * 
 * @param {Event} event - The event object.
 */
DOM.list.items.addEventListener('click', (event) => {
    const pathArray = Array.from(event.path || event.composedPath())
    let active = null

    for (const node of pathArray) {
        if (active) break

        if (node?.dataset?.preview) {
            let result = null
    
            for (const singleBook of books) {
                if (result) break;
                if (singleBook.id === node?.dataset?.preview) result = singleBook
            } 
        
            active = result
        }
    }
    
    if (active) {
        DOM.list.active.open = true
        DOM.list.blur.src = active.image
        DOM.list.image.src = active.image
        DOM.list.title.innerText = active.title
        DOM.list.subtitle.innerText = `${authors[active.author]} (${new Date(active.published).getFullYear()})`
        DOM.list.description.innerText = active.description
    }
})
//---------------------...ooo000 END OF FILE 000ooo...------------------------//