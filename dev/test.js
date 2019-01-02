// @ts-check
'use strict';

/**
 * A simple phrase.
 * @typedef {string | number} Phrase
 */

/** A simple test class. */
export class Test {
    /**
     * Not much going on here.
     * @constructor
     * @param {Phrase} phrase A simple phrase.
     */
    constructor (phrase) {
        /** @type {Phrase} */
        this.phrase = phrase;
    }

    sayHi () {
        console.log(this.phrase);
    }
}