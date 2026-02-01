// ==UserScript==
// @name         Auto Fill CAPTCHA UIT
// @version      1.0
// @match        https://student.uit.edu.vn/*
// @match        https://daa.uit.edu.vn/*
// ==/UserScript==

(function () {
    'use strict';

    function autoFillCaptcha() {
        const label = document.querySelector('label[for="edit-english-captcha-answer"]');
        const input = document.getElementById('edit-english-captcha-answer');
        if (!label || !input) return;

        const matches = label.innerText.match(/\(([^)]+)\)/g);
        if (matches && matches.length) {
            const answer = matches[matches.length - 1]
                .replace(/[()]/g, '')
                .trim();
            input.value = answer;
            input.style.backgroundColor = "#d4edda";
        }
    }

    window.addEventListener('load', autoFillCaptcha);
})();
