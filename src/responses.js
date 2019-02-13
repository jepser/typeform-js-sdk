export default http => new Responses(http);

class Responses {
  constructor(_http) {
    this._http = _http;
  }

  /**
   * Returns form responses and date and time of form landing and submission.
   * 
   * @param {Object} args
   * @param {string} args.uid Unique ID for the form. Find in your form URL.
   * For example, in the URL "https://mysite.typeform.com/to/u6nXL7" the form_id is u6nXL7. 
   * @param {number} [args.pageSize] Maximum number of responses. Default value is 25. Maximum value is 1000.
   * If your typeform has fewer than 1000 responses, you can retrieve all of the responses in a single request by adding
   * the page_size parameterrather than sending multiple requests that iterate through a page={X} parameter.
   * If your typeform has more than 1000 responses, use the since and until query parameters to narrow the scope of your request.
   * @param {string} [args.since] Limit request to responses submitted since the specified date and time.
   * In ISO 8601 format, UTC time, to the second, with T as a delimiter between the date and time.
   * @param {string} [args.until] Limit request to responses submitted until the specified date and time.
   * In ISO 8601 format, UTC time, to the second, with T as a delimiter between the date and time.
   * @param {string} [args.after] Limit request to responses submitted after the specified token. If you use the after parameter,
   * the responses will be sorted in the order that our system processed them (instead of the default order, submitted_at).
   * This ensures that you can traverse the complete set of responses without repeating entries.
   * @param {string} [args.before] Limit request to responses submitted before the specified token. If you use the before parameter,
   * the responses will be sorted in the order that our system processed them (instead of the default order, submitted_at).
   * This ensures that you can traverse the complete set of responses without repeating entries.
   * @param {boolean} [args.completed] true if form was submitted. Otherwise, false.
   * @param {string} [args.sort] Order of responses. Currently, responses are automatically sorted by submitted_at,desc---the date they were submitted,
   * from newest to oldest. We plan to add more options for sort order soon.
   * @param {string} [args.query] Limit request to only responses that that include the specified term.
   * @param {string[]} [args.fields] Limit request to only responses for the specified fields.
   * @returns {Promise} Promise that resolves with a representation of collection of responses to a specific form.
   * It is used for displaying results in a human-friendly format.
   */
  list({ uid, pageSize, since, until, after, before, completed, sort, query, fields } = {}) {
    return this._http.request({
      method: 'get',
      url: `/forms/${uid}/responses`,
      params: {
        page_size: pageSize,
        since,
        until,
        after,
        before,
        completed,
        sort,
        query,
        fields
      }
    });
  }
}
