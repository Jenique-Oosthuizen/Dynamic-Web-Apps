//Previously, you worked on adding abstraction around the book preview functionality of the project.
// Next, you must turn the book preview abstraction into a fully-working web component.
// Then, apply the techniques you’ve learned about this module to the book preview.

const template = document.createElement("template");

template.innerHTML = /*html*/ `
    <style>
    /* Grid */
    .list__items {
      display: grid;
      padding: 2rem 1rem;
      grid-template-columns: 1fr;
      grid-column-gap: 0.5rem;
      grid-row-gap: 0.5rem;
      margin: 0 auto;
      width: 100%;
    }
    
    @media (min-width: 50rem) {
      .list__items {
        grid-template-columns: repeat(2, 1fr);
        grid-column-gap: 0.75rem;
        grid-row-gap: 0.75rem;
      }
    }
    
    @media (min-width: 100rem) {
      .list__items {
        grid-template-columns: repeat(4, 1fr);
        grid-column-gap: 0.75rem;
        grid-row-gap: 0.75rem;
      }
    }
    
    @media (min-width: 150rem) {
      .list__items {
        grid-template-columns: repeat(8, 1fr);
        grid-column-gap: 0.75rem;
        grid-row-gap: 0.75rem;
      }
    }

    /* preview */
  
  .preview {
    border-width: 0;
    width: 100%;
    font-family: Roboto, sans-serif;
    padding: 0.5rem 1rem;
    display: flex;
    align-items: center;
    cursor: pointer;
    text-align: left;
    border-radius: 8px;
    border: 1px solid rgba(var(--color-dark), 0.15);
    background: rgba(var(--color-light), 1);
  }
  
  @media (min-width: 60rem) {
    .preview {
      padding: 1rem;
    }
  }
  
  .preview_hidden {
    display: none;
  }
  
  .preview:hover {
    background: rgba(var(--color-blue), 0.05);
  }
  
  .preview__image {
    width: 48px;
    height: 70px;
    object-fit: cover;
    background: grey;
    border-radius: 2px;
    box-shadow: 0px 2px 1px -1px rgba(0, 0, 0, 0.2),
      0px 1px 1px 0px rgba(0, 0, 0, 0.1), 0px 1px 3px 0px rgba(0, 0, 0, 0.1);
  }
  
  .preview__info {
    padding: 1rem;
  }
  
  .preview__title {
    margin: 0 0 0.5rem;
    font-weight: bold;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;  
    overflow: hidden;
    color: rgba(var(--color-dark), 0.8)
  }
  
  .preview__author {
    color: rgba(var(--color-dark), 0.4);
  }
    </style>

    <main class="list">
      <div class="list__items" data-list-items></div>
      <div class="list__message" data-list-message>No results found. Your filters might be too narrow.</div>
      <button class="list__button" data-list-button></button>
    </main>

    <dialog class="overlay" data-list-active>
      <div class="overlay__preview"><img class="overlay__blur" data-list-blur src=""/><img class="overlay__image" data-list-image src=""/></div>
      <div class="overlay__content">
        <h3 class="overlay__title" data-list-title></h3>
        <div class="overlay__data" data-list-subtitle></div>
        <p class="overlay__data overlay__data_secondary" data-list-description></p>
      </div>

      <div class="overlay__row">
        <button class="overlay__button overlay__button_primary" data-list-close>Close</button>
      </div>
    </dialog>
`;
customElements.define(
  "book-preview",

class extends HTMLElement {
  inner = this.attachShadow({ mode: "closed" });

  constructor() {
    super();
    const { content } = template;
    this.inner.appendChild(content.cloneNode(true));
  }
})