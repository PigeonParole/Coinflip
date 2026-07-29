'use strict';

const coin = document.querySelector('#coin');
const result = document.querySelector('#result');
const flipButton = document.querySelector('#flipButton');

const FLIP_DURATION_MS = 300;
const REDUCED_MOTION_DURATION_MS = 30;

let isFlipping = false;

function secureRandomAvailable() {
  return window.isSecureContext
    && typeof window.crypto !== 'undefined'
    && typeof window.crypto.getRandomValues === 'function';
}

function getSecureFlip() {
  const value = new Uint32Array(1);
  window.crypto.getRandomValues(value);
  return value[0] % 2 === 0 ? 'HEADS' : 'TAILS';
}

function finishFlip(outcome) {
  coin.textContent = outcome === 'HEADS' ? 'H' : 'T';
  result.textContent = outcome;
  result.setAttribute('aria-busy', 'false');
  coin.classList.remove('flip-heads', 'flip-tails');
  flipButton.disabled = false;
  isFlipping = false;
}

function flip() {
  if (isFlipping || !secureRandomAvailable()) {
    return;
  }

  const outcome = getSecureFlip();
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  isFlipping = true;
  flipButton.disabled = true;
  result.setAttribute('aria-busy', 'true');
  result.textContent = 'FLIPPING';
  coin.textContent = '?';
  coin.classList.remove('flip-heads', 'flip-tails');
  void coin.offsetWidth;
  coin.classList.add(outcome === 'HEADS' ? 'flip-heads' : 'flip-tails');

  const duration = reduceMotion ? REDUCED_MOTION_DURATION_MS : FLIP_DURATION_MS;
  window.setTimeout(() => finishFlip(outcome), duration);
}

if (!secureRandomAvailable()) {
  flipButton.disabled = true;
  result.textContent = 'UNAVAILABLE';
}

flipButton.addEventListener('click', flip);

document.addEventListener('keydown', (event) => {
  if (event.repeat) {
    return;
  }

  if (event.code === 'Space') {
    event.preventDefault();
    flip();
    return;
  }

  if (event.key === '1') {
    window.location.href = './';
    return;
  }

  if (event.key === '3') {
    window.location.href = 'three-way.html';
  }
});

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('./sw.js').catch(() => {});
  });
}
