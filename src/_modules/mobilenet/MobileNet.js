'use strict';

import * as tfc from '@tensorflow/tfjs-core';
import { loadFrozenModel } from '@tensorflow/tfjs-converter';

export default class MobileNet {
    constructor() {
        const self = this;

        this.classes = {};
        this.IMAGE_SIZE = 224;
        this.TOPK_PREDICTIONS = 3;
        this.IMAGENET_CLASSES = {};

        /**
         * Get new classes dynamically
         */
        fetch('./assets/not-hotdog-pwa/models/output_labels.txt')
            .then(function (response) {
                return response.text();
            })
            .then(function (text) {
                let n = text.split("\n");
                let numOfLineBreaks = (text.match(/\n/g)||[]).length;

                for (let i = 0, l = numOfLineBreaks; i < l; i++) {
                    self.IMAGENET_CLASSES[i] = n[i];
                }
            });
    }

    async loadMobilenet() {
        const MODEL_URL = './assets/not-hotdog-pwa/models/saved_model_web/tensorflowjs_model.pb';
        const WEIGHTS_URL = './assets/not-hotdog-pwa/models/saved_model_web/weights_manifest.json';

        this.model = await loadFrozenModel(MODEL_URL, WEIGHTS_URL);
    }


    /**
     * Given an image element, makes a prediction through mobilenet returning the
     * probabilities of the top K classes.
     */
    async predict(imgElement) {
        console.time('Predicting');

        const logits = tfc.tidy(() => {
            const img = tfc.fromPixels(imgElement).toFloat();
            const offset = tfc.scalar(127.5);
            const normalized = img.sub(offset).div(offset);
            const reshapedInput = normalized.reshape([1, this.IMAGE_SIZE, this.IMAGE_SIZE, 3]);
            const dict = {};
            const INPUT_NODE_NAME = 'Placeholder';
            const OUTPUT_NODE_NAME = 'final_result';

            dict[INPUT_NODE_NAME] = reshapedInput;

            return this.model.execute(dict, OUTPUT_NODE_NAME);
        });

        // Convert logits to probabilities and class names.
        const classes = await this.getTopKClasses(logits, this.TOPK_PREDICTIONS);

        console.timeEnd('Predicting');

        // Show the classes in the DOM.
        this.classes = classes;
    }

    /**
     * Computes the probabilities of the topK classes given logits by computing
     * softmax to get probabilities and then sorting the probabilities.
     * @param logits Tensor representing the logits from MobileNet.
     * @param topK The number of top predictions to show.
     */
    async getTopKClasses(logits, topK) {
        const values = await logits.data();
        const valuesAndIndices = [];

        for (let i = 0; i < values.length; i++) {
            valuesAndIndices.push({ value: values[i], index: i });
        }

        valuesAndIndices.sort((a, b) => {
            return b.value - a.value;
        });

        const topkValues = new Float32Array(topK);
        const topkIndices = new Int32Array(topK);

        for (let i = 0; i < topK; i++) {
            topkValues[i] = valuesAndIndices[i].value;
            topkIndices[i] = valuesAndIndices[i].index;
        }

        const topClassesAndProbs = [];

        for (let i = 0; i < topkIndices.length; i++) {
            topClassesAndProbs.push({
                className: this.IMAGENET_CLASSES[topkIndices[i]],
                probability: topkValues[i]
            })
        }

        return topClassesAndProbs;
    }
}

