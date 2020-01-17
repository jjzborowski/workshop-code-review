import BaseComponent from './BaseComponent.js';

export default class ImageComponent extends BaseComponent {
    constructor(data) {
        super(data);
        this.title = data.content.id;
        this.initTemplate(data);
    }

    initTemplate = ({ content }) => {
        this.template = document.createElement('img')
        this.template.setAttribute('src', content.src)
        this.target.appendChild(this.template)
    };
};