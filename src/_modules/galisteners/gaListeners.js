'use strict';

export default class Galisteners {
    constructor() { }

    init() {
        const TRACKING_ID = 'UA-XXXXXXXXX-X';
        const script = document.createElement('script');
        const scriptStr = 'https://www.googletagmanager.com/gtag/js?id=' + TRACKING_ID;

        script.type = 'text/javascript';
        script.async = true;
        script.src = scriptStr;
        document.body.appendChild(script);

        window.dataLayer = window.dataLayer || [];
        function gtag() { dataLayer.push(arguments); }
        gtag('js', new Date());

        gtag('config', TRACKING_ID);
    }
}
