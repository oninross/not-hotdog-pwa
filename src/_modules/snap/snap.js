'use strict';

import * as tfc from '@tensorflow/tfjs-core';
import MobileNet from '../mobilenet/MobileNet';
import Speech from '../speech/speech';

export default class Snap {
    constructor() {
        const self = this;
        const pixelRatio = window.devicePixelRatio || 1;

        /**
         * Load the model
         */
        console.time('Loading of model');
        this.mobileNet = new MobileNet();
        this.mobileNet.loadMobilenet();
        console.timeEnd('Loading of model');


        this.SPEECH = new Speech();

        this.CANVAS = document.createElement('canvas');
        this.IMAGE = document.createElement('img');

        this.MESSAGE = document.getElementsByClassName('snap__message')[0];
        this.VIEWER = document.getElementsByClassName('snap__viewer')[0];
        this.CAMERA = document.getElementsByClassName('snap__btn -camera')[0];
        this.DETAILS = document.getElementsByClassName('snap__details')[0];
        this.POLAROID = document.getElementsByClassName('snap__polaroid')[0];
        this.TAKE_PHOTO = document.getElementsByClassName('js-take-photo')[0];
        this.CONTEXT = this.CANVAS.getContext('2d');

        this.topPrediction = '';

        this.CONTEXT.scale(pixelRatio, pixelRatio);
        this.VIDEO = document.getElementById('video');
        this.VIDEO.setAttribute('playsinline', '');
        this.VIDEO.setAttribute('muted', '');

        this.IMAGE.setAttribute('id', 'image');
        document.body.appendChild(this.IMAGE);

        /**
         * Take a photo event listener
         */
        this.TAKE_PHOTO.addEventListener('click', () => {
            self.MESSAGE.textContent = 'what is this?';
            self.SPEECH.speak('en-US', 'native', 'what is this?');

            self.CONTEXT.drawImage(self.VIDEO, 0, 0, self.VIDEO.width, self.VIDEO.height);

            let imgDataURL = self.CANVAS.toDataURL('image/png');
            let desc = '';

            self.VIEWER.classList.add('-show');

            self.IMAGE.onload = () => {
                tfc.tidy(() => {
                    self.CAMERA.classList.add('-hide');
                    self.mobileNet.predict(self.IMAGE)
                        .then(() => {
                            if (self.mobileNet.classes.length == undefined) {
                                self.unknownImage();
                            } else {
                                let classes = self.mobileNet.classes;
                                self.topPrediction = classes[0].className;

                                self.MESSAGE.innerHTML = self.topPrediction;
                                self.SPEECH.speak('en-US', 'native', 'It\'s ' + self.checkForVowel(self.topPrediction) + self.topPrediction);

                                for (let i = 0, l = classes.length; i < l; i++) {
                                    desc += '<p><strong>' + classes[i].className + '</strong>: ' + classes[i].probability.toFixed(4) + '</p>';
                                }
                            }

                            self.DETAILS.innerHTML = desc;
                        });
                });
            };

            self.IMAGE.src = imgDataURL;
            self.POLAROID.style.backgroundImage = `url(${imgDataURL})`;
        });

        /**
         * Delete preview event listener
         */
        document.getElementsByClassName('js-delete-photo')[0].addEventListener('click', () => {
            self.reset();
        });

        this.initCamera();
    }

    async initCamera() {
        const self = this;

        return new Promise((resolve, reject) => {
            if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
                navigator.mediaDevices
                    .getUserMedia({
                        video: {
                            facingMode: 'environment'
                        },
                        audio: false
                    })
                    .then(stream => {
                        this.VIDEO.srcObject = stream;
                        this.VIDEO.addEventListener('loadeddata', async () => {
                            this.VIDEO.width = this.VIDEO.videoWidth;
                            this.VIDEO.height = this.VIDEO.videoHeight;

                            this.CANVAS.width = this.VIDEO.videoWidth;
                            this.CANVAS.height = this.VIDEO.videoHeight;

                            resolve();
                        }, false);
                    })
                    .catch(error => {
                        console.error(error);
                        self.MESSAGE.textContent = 'I need a camera to identify the hotdog';
                    });
            } else {
                reject();
            }
        });
    }

    unknownImage() {
        const self = this;

        self.MESSAGE.textContent = 'unknown image';
        self.SPEECH.speak('en-US', 'native', 'Sorry, can\'t determine the image.');
    }

    checkForVowel(str) {
        let firstLetter = str.charAt(0);

        if (firstLetter.match(/[aeiouAEIOU]/)) {
            return ' an ';
        } else {
            return ' a ';
        }
    }

    reset() {
        const self = this;

        this.IMAGE.removeAttribute('src');
        self.MESSAGE.textContent = '';
        self.DETAILS.innerHTML = '';
        self.VIEWER.classList.remove('-show');
        self.CAMERA.classList.remove('-hide');
    }
}
