export default class Pagination {
  constructor(totalPages, refs) {
    this.totalPages = totalPages;
    this.refs = refs;
    this.currentPageIndex = '1';

    this.createButtons();
    this.addLastPage();
  }

  createButtons() {
    const buttons = [];

    for (let i = 1; i <= this.totalPages; i += 1) {
      if (i > 5) {
        break;
      } else {
        const newButton = document.createElement('button');
        newButton.classList.add('page-button');
        newButton.setAttribute('data-index', i);
        newButton.textContent = i;
        buttons.push(newButton);
      }
    }

    this.refs.buttonsList.append(...buttons);
  }

  addLastPage() {
    this.refs.lastPage.textContent = this.totalPages;
  }

  onPageBtnClick(e) {
    this.currentPageIndex = e.target.dataset.index;
  }

  onLastBtnClick() {
    this.refs.buttonsList.children.forEach(button => {
      let btnIndex = button.dataset.index;

      if (btnIndex > this.totalPages) {
        return;
      }

      button.dataset.index = Number(btnIndex) + 1;
      button.textContent = button.dataset.index;
    });

    this.toggleBtnVisibility();
  }

  onFirstBtnClick() {
    this.refs.pageButtonsList.children.forEach(button => {
      let btnIndex = button.dataset.index;

      if (btnIndex <= 0) {
        return;
      }

      button.dataset.index = Number(btnIndex) - 1;
      button.textContent = button.dataset.index;
    });

    this.toggleBtnVisibility();
  }

  toggleBtnVisibility() {
    const buttonsList = this.refs.buttonsList.children;
    const firstBtnIndex = buttonsList[0].dataset.index;
    const lastBtnIndex = buttonsList[4].dataset.index;

    if (firstBtnIndex === '1') {
      this.hideFirstPage();
    } else {
      this.showFirstPage();
    }

    if (lastBtnIndex >= this.totalPages) {
      this.hideLastPage();
    } else {
      this.showLastPage();
    }
  }

  showPrevButton() {
    this.refs.firstPage.classList.remove('visually-hidden');
    this.refs.leftDots.classList.remove('visually-hidden');
  }

  hidePrevButton() {
    this.refs.firstPage.classList.add('visually-hidden');
    this.refs.leftDots.classList.add('visually-hidden');
  }

  showNextButton() {
    this.refs.lastPage.classList.remove('visually-hidden');
    this.refs.rightDots.classList.remove('visually-hidden');
  }

  hideNextButton() {
    this.refs.lastPage.classList.add('visually-hidden');
    this.refs.rightDots.classList.add('visually-hidden');
  }

  get currentPage() {
    return this.currentPageIndex;
  }
}
