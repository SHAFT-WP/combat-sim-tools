'use strict';
const openers = new WeakMap();
document.querySelectorAll('[data-open]').forEach(button => {
  button.addEventListener('click', () => {
    const dialog = document.getElementById(button.dataset.open);
    if (!(dialog instanceof HTMLDialogElement)) return;
    openers.set(dialog, button);
    dialog.showModal();
    document.body.classList.add('modal-open');
  });
});
document.querySelectorAll('dialog').forEach(dialog => {
  dialog.querySelector('.close').addEventListener('click', () => dialog.close());
  dialog.addEventListener('click', event => {
    if (event.target !== dialog) return;
    const rect = dialog.getBoundingClientRect();
    if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) dialog.close();
  });
  dialog.addEventListener('close', () => {
    document.body.classList.remove('modal-open');
    openers.get(dialog)?.focus({ preventScroll: true });
  });
});
