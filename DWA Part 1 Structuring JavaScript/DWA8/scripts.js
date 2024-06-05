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
 * Creates an event listener function to show more book previews when a button is clicked.
 *
 * @param {Array} matches - Array of book objects to display. Each book object should contain `author`, `id`, `image`, and `title` properties.
 * @param {Object} authors - Object mapping author IDs to author names.
 * @param {number} booksPerPage - Number of books to display per page.
 * @returns {Function} - An event listener function that loads and displays more book previews when executed.
 */
const createShowMoreButton = (matches, authors, booksPerPage) => {
    let page = 0;

    const showMoreBooks = () => {
        const fragment = document.createDocumentFragment();

        for (const { author, id, image, title } of matches.slice(page * booksPerPage, (page + 1) * booksPerPage)) {
            const element = document.createElement('button');
            element.classList = 'preview';
            element.setAttribute('data-preview', id);

            element.innerHTML = `
                <img
                    class="preview__image"
                    src="${image}"
                />
                
                <div class="preview__info">
                    <h3 class="preview__title">${title}</h3>
                    <div class="preview__author">${authors[author]}</div>
                </div>
            `;

            fragment.appendChild(element);
        }

        DOM.list.items.appendChild(fragment);
        page += 1;
    };

    return showMoreBooks;
};

// Usage example:
const showMoreListener = createShowMoreButton(books, authors, BOOKS_PER_PAGE);
DOM.list.button.addEventListener('click', showMoreListener);

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

const themeManager = () => {
    let theme = 'day';

    const applyTheme = () => {
        if (theme === 'night') {
            document.documentElement.style.setProperty('--color-dark', '255, 255, 255');
            document.documentElement.style.setProperty('--color-light', '10, 10, 20');
        } else {
            document.documentElement.style.setProperty('--color-dark', '10, 10, 20');
            document.documentElement.style.setProperty('--color-light', '255, 255, 255');
        }
        DOM.settings.theme.value = theme
    }

    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        theme = 'night';
    } else {
        theme = 'day';
    }
    applyTheme()

    //get() & set()?
    return {
        get theme() {
            
        }
    }
}