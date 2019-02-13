import { FONTS_AVAILABLE } from './constants';

export default http => new Themes(http);

class Themes {
  constructor(_http) {
    this._http = _http;
  }

  /**
   * Creates a new theme.
   * 
   * @param {Object} args Theme to create.
   * @param {Object} [args.background] Settings for the background.
   * @param {Object} args.colors Colors the theme will apply to answers, background, buttons, and questions.
   * @param {string} args.font Font for the theme.
   * Valid values: 'Acme", "Arial", "Arvo", "Avenir Next", "Bangers", "Cabin", "Cabin Condensed", "Courier", "Crete Round",
   * "Dancing Script", "Exo", "Georgia", "Handlee", "Helvetica Neue", "Karla", "Lato", "Lekton", "Lobster", "Lora", "McLaren",
   * "Montserrat", "Nixie One", "Old Standard TT", "Open Sans", "Oswald", "Playfair Display", "Quicksand", "Raleway", "Signika",
   * "Sniglet", "Source Sans Pro", "Vollkorn"
   * Default: "Source Sans Pro"
   * @param {boolean} [args.hasTransparentButton] `true` if buttons should be transparent. Otherwise, `false`.
   * @param {string} args.name Name for the theme.
   * @returns {Promise} Promise that resolves with created theme.
   */
  create({ background, colors, font, hasTransparentButton, name }  = {}) {
    // check if required properties are defined
    if ([name, font, colors].includes(undefined)) {
      throw new Error(`Please add the required fields`);
    }

    if (!FONTS_AVAILABLE.includes(font)) {
      throw new Error(`It's not a valid font`);
    }

    return this._http.request({
      method: 'post',
      url: `/themes`,
      background,
      colors,
      font,
      has_transparent_button: hasTransparentButton,
      name
    });
  }

  /**
   * Deletes a theme from your Typeform account.
   * 
   * @param {Object} args
   * @param {string} args.id Theme ID.
   * @returns {Promise} Promise that resolves on success.
   */
  delete({ id }  = {}) {
    return this._http.request({
      method: 'delete',
      url: `/themes/${id}`
    });
  }

  /**
   * Retrieves a theme in your Typeform account.
   * 
   * @param {Object} args
   * @param {string} args.id Theme ID.
   * @returns {Promise} Promise that resolves with theme.
   */
  get({ id }  = {}) {
    return this._http.request({
      method: 'get',
      url: `/themes/${id}`
    });
  }

  /**
   * Retrieves a list of JSON descriptions for all themes in your Typeform account (and private).
   * Themes are listed in reverse-chronological order based on the date you added them to your account.
   * 
   * @param {Object} args
   * @param {number} [args.page] The page of results to retrieve. Default 1 is the first page of results.
   * @param {number} [args.pageSize] Number of results to retrieve per page. Default is 10. Maximum is 200.
   * @returns {Promise} Promise that resolves with a list of themes.
   */
  list({ page, pageSize }  = {}) {
    return this._http.request({
      method: 'get',
      url: '/themes',
      params: {
        page,
        page_size: pageSize
      }
    });
  }

  /**
   * Updates a theme in your Typeform account.
   * NOTE: You can't change Typeform's themes (the built-in themes that are available in all accounts).
   * 
   * @param {Object} args Theme to update.
   * @param {string} args.id Unique ID for the theme.
   * @param {Object} [args.background] Settings for the background.
   * @param {Object} args.colors Colors the theme will apply to answers, background, buttons, and questions.
   * @param {string} args.font Font for the theme.
   * Valid values: 'Acme", "Arial", "Arvo", "Avenir Next", "Bangers", "Cabin", "Cabin Condensed", "Courier", "Crete Round",
   * "Dancing Script", "Exo", "Georgia", "Handlee", "Helvetica Neue", "Karla", "Lato", "Lekton", "Lobster", "Lora", "McLaren",
   * "Montserrat", "Nixie One", "Old Standard TT", "Open Sans", "Oswald", "Playfair Display", "Quicksand", "Raleway", "Signika",
   * "Sniglet", "Source Sans Pro", "Vollkorn"
   * Default: "Source Sans Pro"
   * @param {boolean} [args.hasTransparentButton] `true` if buttons should be transparent. Otherwise, `false`.
   * @param {string} args.name Name for the theme.
   * @returns {Promise} Promise that resolves with created theme.
   */
  update({ id, background, colors, font, hasTransparentButton, name }  = {}) {
    // check if required properties are defined
    if ([name, font, colors].includes(undefined)) {
      throw new Error(`Please add the required fields`);
    }

    if (!FONTS_AVAILABLE.includes(font)) {
      throw new Error(`It's not a valid font`);
    }

    return this._http.request({
      method: 'put',
      url: `/themes/${id}`,
      background,
      colors,
      font,
      has_transparent_button: hasTransparentButton,
      name
    });
  }
}
