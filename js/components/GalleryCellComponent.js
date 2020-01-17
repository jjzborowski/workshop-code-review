import BaseComponent from './BaseComponent.js';

export default class GalleryCellComponent extends BaseComponent {
    constructor(props) {
        super(props);
        this.initTemplate(props);
    }

    initTemplate = ({ content, onRemove }) => {
        this.template = document.createElement('div');

        // define cell
        this.template.setAttribute('id', content.id);
        this.template.classList.add('gallery__cell');

        // define image element
        this.imageElement = document.createElement('div');
        this.imageElement.classList.add('gallery__image');
        this.imageElement.appendChild(content.template);

        // define image title
        this.imageTitleElement = document.createElement('div');
        this.imageTitleElement.classList.add('gallery__image-title');
        this.imageTitleElement.innerText = content.title;

        // define remove button
        this.removeButton = document.createElement('div');
        this.removeButton.classList.add('gallery__remove_button');
        this.removeButton.innerText = 'X';
        this.removeButton.addEventListener('click', () => {
            return onRemove(content.id);
        });

        // add elements to cell
        this.template.appendChild(this.imageElement);
        this.template.appendChild(this.imageTitleElement);
        this.template.appendChild(this.removeButton);
        this.target.appendChild(this.template);
    };
};