import Footer from '../components/footer';
import {render} from '../utils/render';

export default class FooterController {
  constructor(moviesModel, container) {
    this._moviesModel = moviesModel;
    this._container = container;
    this._moviesModel.onDataChange(this.render.bind(this));
  }

  render() {
    if (this._footer) {
      this._footer.getElement().remove();
    }
    this._footer = new Footer(this._moviesModel.getCountMovies());
    render(this._container, this._footer);
  }
}
