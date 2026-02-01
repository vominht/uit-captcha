// ==UserScript==
// @name         Auto Fill CAPTCHA UIT
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  Tự động điền captcha UIT
// @match        https://student.uit.edu.vn/*
// @match        https://daa.uit.edu.vn/*
// @grant        none
// @run-at       document-idle
// ==/UserScript==

(function () {
  'use strict';

  function autoFillCaptcha() {
    const label = document.querySelector('label[for="edit-english-captcha-answer"]');
    const input = document.getElementById('edit-english-captcha-answer');
    if (!label || !input) return false;

    const matches = label.innerText.match(/\(([^)]+)\)/g);
    if (!matches || !matches.length) return false;

    const answer = matches[matches.length - 1].replace(/[()]/g, '').trim();
    if (!answer) return false;

    input.value = answer;
    input.dispatchEvent(new Event('input', { bubbles: true }));
    input.dispatchEvent(new Event('change', { bubbles: true }));
    input.style.backgroundColor = '#d4edda';
    return true;
  }

  if (autoFillCaptcha()) return;

  let tries = 0;
  const timer = setInterval(() => {
    tries++;
    if (autoFillCaptcha() || tries >= 40) {
      clearInterval(timer);
    }
  }, 250);

  const obs = new MutationObserver(() => {
    if (autoFillCaptcha()) obs.disconnect();
  });
  obs.observe(document.documentElement, { childList: true, subtree: true });
})();
