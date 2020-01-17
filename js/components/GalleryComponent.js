import {
    apiGetImages,
    apiRemoveImageById,
    apiRemoveImages,
    ApiSetImage,
} from '../api.js';
import { PICSUM_URL } from '../constants.js';
import { getRandomIntegerNumberBetweenTwoValues } from '../constants.js';
import ButtonComponent from './ButtonComponent.js';
import BaseComponent from './BaseComponent.js';
import GalleryCellComponent from './GalleryCellComponent.js';
import ImageComponent from './ImageComponent.js';
import INPUT_COMPONENT from './INPUT_COMPONENT.js';

export default class GalleryComponent extends BaseComponent {
    constructor(props) {
        super(props);

        this.images = {};
        this.initTemplate();
        this.getImages();
    }

    initTemplate = () => {
        this.template = document.createElement('div');
        this.template.classList.add('gallery');

        // define panel
        this.galleryPanel = document.createElement('div');
        this.galleryPanel.classList.add('gallery__panel');

        // define container
        this.galleryContainer = document.createElement('div');
        this.galleryContainer.classList.add('gallery__container');

        // define input

        this.input = new INPUT_COMPONENT({
            id: 'imageAmountInput',
            target: this.galleryPanel,
        });

        // define buttons
        this.generateButton = new ButtonComponent({
            id: 'generateButton',
            target: this.galleryPanel,
            content: 'Generate images',
            onClickHandler: this.generateImages,
        });
        this.clearButton = new ButtonComponent({
            id: 'clearButton',
            target: this.galleryPanel,
            content: 'Clear gallery',
            onClickHandler: this.removeImages,
        });

        // add elements to gallery
        this.galleryPanel.appendChild(this.generateButton.template);
        this.galleryPanel.appendChild(this.clearButton.template);
        this.template.appendChild(this.galleryPanel);
        this.template.appendChild(this.galleryContainer);
        this.target.appendChild(this.template);
    };

    getImages = () => {
        apiGetImages()
            .then(response => {
                if (response) {
                    console.log(response);
                    for (let [id, image] of Object.entries(response)) {
                        if (!this.images[id]) this.images[id] = new ImageComponent({id: id, target: this.template, content: image});
                    }
                    this.fillGallery();
                }
            });
    };

    fillGallery = () => {
        const images = Object.values(this.images);
        for (let i = 0; i < images.length; i++) {
            if (!document.getElementById(images[i].id)) {
                new GalleryCellComponent({
                    id: images[i].id,
                    target: this.galleryContainer,
                    content: images[i],
                    onRemove: this.removeImageById,
                });
            }
        }
    };

    generateImages = () => {
        for (var i = 0; i < (this.input.template.value || 5); i++) {
            id = getRandomIntegerNumberBetweenTwoValues(1, 1000);
            var imageData = {
                id,
                src: `${PICSUM_URL}id/${ id }/200/200`,
            };

            if (!this.images[id]) {
                this.images[id] = new ImageComponent({
                    id: id,
                    target: this.template,
                    content: imageData,
                });
                ApiSetImage(imageData)
                    .then(response => {
                        console.log('setImage', response);
                    });
            }
        }
        this.fillGallery();
    };

    removeImageById = (imageId) => {
        const confirmation = confirm('Do you want to remove this image?');
        if (confirmation) {
            apiRemoveImageById(imageId)
                .then(() => {
                    delete this.images[imageId];
                    this.galleryContainer.removeChild(document.getElementById(imageId));
                });
        }
    };

    removeImages = () => {
        const confirmation = confirm('Do you want to remove all images?');
        if (confirmation) {
            apiRemoveImages()
                .then(() => {
                    while (this.galleryContainer.firstChild) {
                        this.galleryContainer.removeChild(this.galleryContainer.firstChild);
                    }
                    this.images = {};
                });
        }
    };
};