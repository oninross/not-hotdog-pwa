// Main javascript entry point
// Should handle bootstrapping/starting application

'use strict';

import $ from 'jquery';
import 'TweenLite';
import 'EasePack';
import 'AttrPlugin';
import 'CSSPlugin';
import 'doT';
import './_modernizr';

import Snap from '../_modules/snap/snap';

import ServiceWorker from '../_modules/serviceworker/serviceworker';


$(() => {
    new Snap();

    // Set framerate to 60fps
    TweenLite.ticker.fps(60);


    // Simple Service Worker to make App Install work (OPTIONAL)
    // new ServiceWorker();


    // toaster("I'm a not-hotdog-pwa!!!", 0, true);
    console.log("I'm a not-hotdog-pwa!!!");
});
