import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
  WritableSignal,
  computed,
  signal,
} from '@angular/core';
import { IonButtonComponent } from '../button';
import { IonPaginationProps, Page, PageEvent } from './types';

export const ITEMS_PER_PAGE_DEFAULT = 10;
const VISIBLE_PAGES_DEFAULT_AMOUNT = 5;
const MIN_PAGES_SHOW_ADVANCED_PAG = 10;
const FIRST_PAGE = 1;

@Component({
  standalone: true,
  imports: [IonButtonComponent],
  selector: 'ion-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss'],
})
export class IonPaginationComponent implements OnChanges, OnInit {
  @Input({ required: true }) total!: IonPaginationProps['total'];
  @Input() itemsPerPage: IonPaginationProps['itemsPerPage'] =
    ITEMS_PER_PAGE_DEFAULT;
  @Input() size: IonPaginationProps['size'] = 'md';
  @Input() loading: IonPaginationProps['loading'] = false;
  @Input() page: IonPaginationProps['page'] = 0;
  @Output() events: IonPaginationProps['events'] =
    new EventEmitter<PageEvent>();
  public currentPage: WritableSignal<number> = signal(this.page || 0);
  public pages: Page[] = [];
  public isAdvanced!: boolean;
  public moreBtnsConfig = {
    left: { hover: false, visible: true },
    right: { hover: false, visible: true },
  };
  public currentVisibleButtons!: Page[];
  public hasPrevius = computed(() => {
    const isInFirstPage = this.isInFirstPage(this.currentPage());
    return (
      isInFirstPage !== undefined && isInFirstPage !== null && !isInFirstPage
    );
  });
  public hasNext = computed(() => {
    return this.currentPage() && !this.isInLastPage(this.currentPage());
  });
  public IS_HOVER = true;

  ngOnChanges(changes: SimpleChanges): void {
    const { total, page } = changes;
    if (total && total.firstChange) {
      this.remountPages();
    }

    if (total) {
      this.remountPages(false);
    }

    if (page && page.currentValue) {
      this.setPage(page.currentValue);
    }
  }

  ngOnInit(): void {
    this.updateIsAdvanced();
    this.updateMoreBtnsVisibility();
  }

  public changeIconHover(side: string, isHover: boolean): void {
    this.moreBtnsConfig[side as keyof typeof this.moreBtnsConfig].hover =
      isHover;
  }

  public selectPageOnClick(pageNumber: number): void {
    if (pageNumber === this.currentPage() || this.loading) {
      return;
    }
    this.selectPage(pageNumber);
  }

  public previous(): void {
    if (!this.isInFirstPage(this.currentPage()) && !this.loading) {
      this.selectPage(this.currentPage() - 1);
    }
  }

  public next(): void {
    if (!this.isInLastPage(this.currentPage()) && !this.loading) {
      this.selectPage(this.currentPage() + 1);
    }
  }

  public jumpPagesForward(): void {
    this.moreBtnsConfig.right.hover = false;
    const pageDestination = Math.min(
      this.pages.length,
      this.currentPage() + VISIBLE_PAGES_DEFAULT_AMOUNT
    );
    this.selectPageOnClick(pageDestination);
  }

  public jumpPagesBackward(): void {
    this.moreBtnsConfig.left.hover = false;
    const pageDestination = Math.max(
      FIRST_PAGE,
      this.currentPage() - VISIBLE_PAGES_DEFAULT_AMOUNT
    );
    this.selectPageOnClick(pageDestination);
  }

  private selectPage(pageNumber = 1, emitEvent = true): void {
    if (this.pages && !this.loading) {
      this.pages.forEach(pageEach => {
        pageEach.selected = false;
      });
    }

    const page = this.pages[pageNumber - 1];
    page.selected = true;

    if (emitEvent && this.itemsPerPage) {
      this.events.emit({
        currentPage: page.page_number,
        itemsPerPage: this.itemsPerPage,
        offset: (page.page_number - 1) * this.itemsPerPage,
      });
    }
    this.currentPage.set(page.page_number);
    this.updateMoreBtnsVisibility();
    this.currentVisibleButtons = this.nextVisibleButtons();
  }

  private remountPages(emitEvent = true): void {
    this.createPages(this.totalPages());
    if (this.pages.length) {
      const pageToSelect =
        this.currentPage() && this.currentPage() > this.pages.length
          ? this.pages.length
          : this.currentPage();
      this.selectPage(pageToSelect || 1, emitEvent);
    }
    this.updateIsAdvanced();
  }

  private totalPages(): number {
    return Math.ceil(
      this.total / (this.itemsPerPage || ITEMS_PER_PAGE_DEFAULT)
    );
  }

  private nextVisibleButtons(): Page[] {
    const currentPageIndex = this.currentPage() - 1;
    const startPageIndex = this.getStartPageIndex(currentPageIndex);
    const endPageIndex = this.getLastPageIndex(
      currentPageIndex,
      startPageIndex
    );
    return this.pages.slice(startPageIndex, endPageIndex + 1);
  }

  private getStartPageIndex(currentIndex: number): number {
    const isLastThreePages = currentIndex >= this.pages.length - 4;

    if (isLastThreePages) {
      return this.pages.length - VISIBLE_PAGES_DEFAULT_AMOUNT;
    } else {
      return Math.max(
        FIRST_PAGE,
        currentIndex - Math.floor(VISIBLE_PAGES_DEFAULT_AMOUNT / 2)
      );
    }
  }

  private getLastPageIndex(
    currentIndex: number,
    startPageIndex: number
  ): number {
    const isFirstThreePages = currentIndex <= 3;

    if (isFirstThreePages) {
      return VISIBLE_PAGES_DEFAULT_AMOUNT - 1;
    } else {
      return Math.min(
        startPageIndex + VISIBLE_PAGES_DEFAULT_AMOUNT - 1,
        this.pages.length - 2
      );
    }
  }

  private updateIsAdvanced(): void {
    this.isAdvanced = this.pages.length > MIN_PAGES_SHOW_ADVANCED_PAG;
  }

  private updateMoreBtnsVisibility(): void {
    const isFirstFourPages = this.currentPage() < VISIBLE_PAGES_DEFAULT_AMOUNT;
    const isLastFourPages = this.currentPage() > this.pages.length - 4;
    this.moreBtnsConfig.left.visible = !isFirstFourPages;
    this.moreBtnsConfig.right.visible = !isLastFourPages;
  }

  private setPage(page = 1): void {
    if (page < 0) {
      return;
    }
    if (page === 1) {
      this.remountPages();
      return;
    }
    if (page > this.pages.length) {
      this.selectPage(this.pages.length);
      return;
    }
    this.selectPage(page);
  }

  private createPages(qtdOfPages: number): void {
    this.pages = [];
    for (let index = 0; index < qtdOfPages; index++) {
      this.pages.push({
        selected: false,
        page_number: index + 1,
      });
    }
  }

  private isInLastPage(page: number): boolean {
    return page === this.totalPages();
  }

  private isInFirstPage(page: number): boolean {
    return page === 1;
  }
}
