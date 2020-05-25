import AbstractSmartComponent from './abstract-smart-component';

export default class MainMenu extends AbstractSmartComponent {
  getTemplate() {
    return `<nav class="main-navigation">
        <a href="#stats" class="main-navigation__additional">Stats</a>
    </nav>`;
  }

  onStatisticsClick(cb) {
    this.addCbToClickOnElement(`.main-navigation__additional`, cb);
  }
}
