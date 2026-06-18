"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.countdown = countdown;
function countdown(n) {
    if (n <= 0) {
        return 0;
    }
    console.log(n);
    return countdown(n - 1);
}
