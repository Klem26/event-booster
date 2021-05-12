export default class Pagination {
  constructor(totalPages, buttonRefs) {
    this.totalPages = totalPages;
    this.buttonRefs = buttonRefs;
    this.currentPageIndex = '1';

    this.initPagin();
  }

  createButtons() {
    const buttons = [];

    for (let i = 1; i <= this.totalPages; i += 1) {
      if (i > 5) {
        break;
      } else {
        const newButton = document.createElement('button');
        newButton.classList.add('page-button');
        newButton.textContent = i;
        newButton.setAttribute('data-index', i);
        buttons.push(newButton);
      }
    }

    this.buttonRefs.pageButtonsList.append(...buttons);

    if (this.totalPages <= 5) {
      this.hideNextButton();
    }
  }

  onPageBtnClick(e) {
    this.currentPageIndex = e.target.dataset.index;
  }

  setLastPageBtn() {
    this.buttonRefs.lastPage.textContent = this.totalPages;
    this.buttonRefs.lastPage.setAttribute('data-index', this.totalPages);
  }

  onFirstPageClick() {
    console.log('First page')
  }

  onLastPageClick() {
    console.log('Last page')
  }

  onNextBtnClick() {
    this.buttonRefs.pageButtonsList.children.forEach(button => {
      let btnIndex = button.dataset.index;

      if (btnIndex > this.totalPages) {
        return;
      }

      button.dataset.index = Number(btnIndex) + 1;
      button.textContent = button.dataset.index;
    });

    this.toggleBtnVisibility();
  }

  onPrevBtnClick() {
    this.buttonRefs.pageButtonsList.children.forEach(button => {
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
    const buttonsList = this.buttonRefs.pageButtonsList.children;
    const firstBtnIndex = buttonsList[0].dataset.index;
    const lastBtnIndex = buttonsList[4].dataset.index;

    if (firstBtnIndex === '1') {
      this.hidePrevButton();
    } else {
      this.showPrevButton();
    }

    if (lastBtnIndex >= this.totalPages) {
      this.hideNextButton();
    } else {
      this.showNextButton();
    }
  }

  showPrevButton() {
    this.buttonRefs.firstPage.classList.remove('visually-hidden');
    this.buttonRefs.prevBtnRef.classList.remove('visually-hidden');
    this.buttonRefs.leftDotsRef.classList.remove('visually-hidden');
  }

  hidePrevButton() {
    this.buttonRefs.firstPage.classList.add('visually-hidden');
    this.buttonRefs.prevBtnRef.classList.add('visually-hidden');
    this.buttonRefs.leftDotsRef.classList.add('visually-hidden');
  }

  showNextButton() {
    this.buttonRefs.lastPage.classList.remove('visually-hidden');
    this.buttonRefs.nextBtnRef.classList.remove('visually-hidden');
    this.buttonRefs.rightDotsRef.classList.remove('visually-hidden');
  }

  hideNextButton() {
    this.buttonRefs.lastPage.classList.add('visually-hidden');
    this.buttonRefs.nextBtnRef.classList.add('visually-hidden');
    this.buttonRefs.rightDotsRef.classList.add('visually-hidden');
  }

  initPagin() {
    this.createButtons();
    this.hidePrevButton();
    this.setLastPageBtn();
  }

  get currentPage() {
    return this.currentPageIndex;
  }
}
