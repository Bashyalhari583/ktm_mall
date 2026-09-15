// Controller — manages space filtering and delegates rendering to SpacesView
window.KTM = window.KTM || {};

KTM.SpacesController = {
  _activeCategory: "All",

  init() {
    this._render();
  },

  _render() {
    const cats = KTM.DataModel.getCategories();
    KTM.SpacesView.renderChips(cats, this._activeCategory, cat => this._handleFilter(cat));
    KTM.SpacesView.renderGrid(KTM.DataModel.getByCategory(this._activeCategory));
  },

  _handleFilter(category) {
    this._activeCategory = category;
    this._render();
  }
};
