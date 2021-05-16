export default function createModal(title, content) {
  const modal = document.createElement('div');
    modal.classList.add('auth-modal');
    
    const html = `<h1>${title}</h1><div class='modal-content'>${content}</div>`;
    modal.innerHTML = html;

  mui.overlay('on', modal);
}
