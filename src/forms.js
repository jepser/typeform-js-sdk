export default http => new Form(http);

class Form {
  constructor(_http) {
    this._http = _http;
    this._messages = new FormMessages(_http);
  }

  get messages() {
    return this._messages;
  }

  /**
   * Creates a form.
   * 
   * @param {Object} args
   * @param {Object} args.data Form to be created.
   * @returns {Promise} Promise that resolves on success.
   */
  create({ data } = {}) {
    return this._http.request({
      method: 'post',
      url: `/forms`,
      data
    });
  }

  /**
   * Deletes the form with the given form_id and all of the form's responses.
   * 
   * @param {Object} args
   * @param {string} args.uid Unique ID for the form. Find in your form URL.
   * For example, in the URL "https://mysite.typeform.com/to/u6nXL7" the form_id is u6nXL7.
   * @returns {Promise} Promise that resolves on success.
   */
  delete({ uid } = {}) {
    return this._http.request({
      method: 'delete',
      url: `/forms/${uid}`
    });
  }

  /**
   * Retrieves a form by the given form_id. Includes any theme and images attached to the form as references.
   * 
   * @param {Object} args
   * @param {string} args.uid Unique ID for the form. Find in your form URL.
   * For example, in the URL "https://mysite.typeform.com/to/u6nXL7" the form_id is u6nXL7.
   * @returns {Promise} Promise that resolves with Form.
   */
  get({ uid } = {}) {
    return this._http.request({
      method: 'get',
      url: `/forms/${uid}`
    });
  }

  /**
   * Retrieves a list of JSON descriptions for all forms in your Typeform account (public and private).
   * Forms are listed in reverse-chronological order based on the last date they were modified.
   * 
   * @param {Object} args
   * @param {number} [args.page] The page of results to retrieve. Default 1 is the first page of results.
   * @param {number} [args.pageSize] Number of results to retrieve per page. Default is 10. Maximum is 200.
   * @param {string} [args.search] Returns items that contain the specified string.
   * @param {string} [args.workspaceId] Retrieve typeforms for the specified workspace.
   * @returns {Promise} Promise that resolves with list of all Form.
   */
  list({ page, pageSize, search, workspaceId } = {}) {
    return this._http.request({
      method: 'get',
      url: `/forms`,
      params: {
        page,
        page_size: pageSize,
        search,
        workspace_id: workspaceId
      }
    });
  }

  /**
   * Updates an existing form.
   * 
   * @param {Object} args
   * @param {string} args.uid Unique ID for the form. Find in your form URL.
   * For example, in the URL "https://mysite.typeform.com/to/u6nXL7" the form_id is u6nXL7.
   * @param {boolean} [args.override] Set update to be put rather than patch.
   * @param {Object} args.data Update data.
   * @returns {Promise} Promise that resolves on success.
   */
  update({ uid, override, data } = {}) {
    const methodType = override ? 'put' : 'patch';

    return this._http.request({
      method: methodType,
      url: `/forms/${uid}`,
      data
    });
  }
}

class FormMessages {
  constructor(_http) {
    this._http = _http;
  }

  /**
   * Retrieves the customizable messages for a form (specified by form_id) using the form's specified language.
   * You can format messages with bold (*bold*) and italic (_italic_) text. HTML tags are forbidden.
   * 
   * @param {Object} args
   * @param {string} args.uid Unique ID for the form. Find in your form URL.
   * For example, in the URL "https://mysite.typeform.com/to/u6nXL7" the form_id is u6nXL7.
   * @returns {Promise} Returns the customizable messages for a form.
   */
  get({ uid }  = {}) {
    return this._http.request({
      method: 'get',
      url: `/forms/${uid}/messages`
    });
  }

  /**
   * Specifies new values for the customizable messages in a form (specified by form_id).
   * You can format messages with bold (*bold*) and italic (_italic_) text. HTML tags are forbidden.
   * 
   * @param {Object} args
   * @param {string} args.uid Unique ID for the form. Find in your form URL.
   * For example, in the URL "https://mysite.typeform.com/to/u6nXL7" the form_id is u6nXL7.
   * @param {Object} args.data Request body.
   * @returns {Promise} Promise that resolves on success.
   */
  update({ uid, data }  = {}) {
    return this._http.request({
      method: 'put',
      url: `/forms/${uid}/messages`,
      data
    });
  }
}
