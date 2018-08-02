'use strict';

import { iOS } from '../../_js/_util';

export default class Speech {
    constructor() { }

    speak(newLang, newVoice, string) {
        const self = this;

        self.canITalk();

        /**
         * Create a new instance of SpeechSynthesisUtterance.
         */
        const msg = new SpeechSynthesisUtterance();

        /**
         * Set the text.
         */
        msg.text = string;

        msg.volume = 1;     // 0 to 1
        msg.rate = 1;       // 0.1 to 10
        msg.pitch = 1;      //0 to 2

        /**
         * Set the language
         */
        msg.lang = newLang;


        /**
         * If a voice has been selected, find the voice and set the
         * utterance instance's voice attribute.
         */
        msg.voice = speechSynthesis.getVoices().filter(function (voice) {
            return voice.name == newVoice;
            // native
            // Google Deutsch
            // Google US English
            // Google UK English Female
            // Google UK English Male
            // Google español
            // Google español de Estados Unidos
            // Google français
            // Google हिन्दी
            // Google Bahasa Indonesia
            // Google italiano
            // Google 日本語
            // Google 한국의
            // Google Nederlands
            // Google polski
            // Google português do Brasil
            // Google русский
            // Google 普通话（中国大陆）
            // Google 粤語（香港）
            // Google 國語（臺灣）
        })[0];


        window.speechSynthesis.speak(msg);

        // msg.onend = function(e) {
        //     console.log('Finished in ' + event.elapsedTime + ' seconds.');
        // };
    }

    canITalk() {
        if (iOS()) {
            return false;
        }

        let SpeechSynthesisUtterance = window.webkitSpeechSynthesisUtterance
            || window.mozSpeechSynthesisUtterance
            || window.msSpeechSynthesisUtterance
            || window.oSpeechSynthesisUtterance
            || window.SpeechSynthesisUtterance;

        if (SpeechSynthesisUtterance === undefined) {
            return false;
        }
    }
}
