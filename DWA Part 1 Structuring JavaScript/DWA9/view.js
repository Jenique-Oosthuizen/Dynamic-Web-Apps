//Object containing DOM elements
export const DOM = {
    list: {
        items: document.querySelector('[data-list-items]'),
        title: document.querySelector('[data-list-title]'),
        subtitle: document.querySelector('[data-list-subtitle]'),
        description: document.querySelector('[data-list-description]'),
        image: document.querySelector('[data-list-image]'),
        blur: document.querySelector('[data-list-blur]'),
        message: document.querySelector('[data-list-message]'),
        button: document.querySelector('[data-list-button]'),
        active: document.querySelector('[data-list-active]'),
        close: document.querySelector('[data-list-close]'),
},

header: {
        search: document.querySelector('[data-header-search]'),
        settings: document.querySelector('[data-header-settings]')
},

search: {
        title: document.querySelector('[data-search-title]'),
        overlay: document.querySelector('[data-search-overlay]'),
        form: document.querySelector('[data-search-form]'),
        genres: document.querySelector('[data-search-genres]'),
        authors: document.querySelector('[data-search-authors]'),
        cancel: document.querySelector('[data-search-cancel]'),
},
settings: {
        theme: document.querySelector('[data-settings-theme]'),
        cancel: document.querySelector('[data-settings-cancel]'),
        form: document.querySelector('[data-settings-form]'),
        overlay: document.querySelector('[data-settings-overlay]'),
}
}
