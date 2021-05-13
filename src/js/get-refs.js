export default function getRefs() {
  return {
    bodyRef: document.querySelector('body'),
    htmlRef: document.querySelector('html'),
    loader: document.querySelector('.loader'),
  };
}
