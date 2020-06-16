import { $ } from '@core/dom';
import {ActiveRouts} from '@core/routs/ActiveRouts';
export class Router {
  constructor(selector, routes) {
    if (!selector) {
      throw new Error(`Selector in Router is ${selector}`);
    }
    this.$placeholder = $(selector);
    this.routes = routes;
    this.changePageHandler = this.changePageHandler.bind(this);
    this.init();
    this.page = null;
  }
  init() {
    window.addEventListener('hashchange', this.changePageHandler);
    this.changePageHandler();
  }
  changePageHandler() {
    if (this.page) {
      this.page.destroy();
    }
    this.$placeholder.clear();
    const Page = ActiveRouts.path.includes('excel')
        ? this.routes.excel
        : this.routes.dashboard;
    this.page = new Page(ActiveRouts.param);
    this.$placeholder.append(this.page.getRoot());
    this.page.afterRender();
  }
  destroy() {
    window.removeEventListener('hashchange', this.changePageHandler);
  }
}