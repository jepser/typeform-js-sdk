import { createOrUpdateWebhook } from './utils';

export default http => new Webhooks(http);

class Webhooks {
  constructor(_http) {
    this._http = _http;
  }

  /**
   * Create a webhook.
   * 
   * @param {Object} args Arguments to create a webhook.
   * @param {string} args.uid Unique ID for the form. Find in your form URL.
   * For example, in the URL "https://mysite.typeform.com/to/u6nXL7" the form_id is u6nXL7.
   * @param {string} args.tag Unique name you want to use for the webhook.
   * @param {string} [args.url] Webhook URL.
   * @param {boolean} [args.enabled] True if you want to send responses to the webhook immediately. Otherwise, false.
   * @returns {Promise} Promise that resolves with created webhook.
   */
  create(args) {
    return createOrUpdateWebhook(this._http, args);
  }

  /**
   * Delete a webhook.
   * 
   * @param {Object} args
   * @param {string} args.uid Unique ID for the form. Find in your form URL.
   * For example, in the URL "https://mysite.typeform.com/to/u6nXL7" the form_id is u6nXL7.
   * @param {string} args.tag Unique name you want to use for the webhook.
   * @returns {Promise} Promise that resolves on success.
   */
  delete({ uid, tag }  = {}) {
    return this._http.request({
      method: 'delete',
      url: `/forms/${uid}/webhooks/${tag}`
    });
  }

  /**
   * Retrieve data about a webhook.
   * 
   * @param {Object} args
   * @param {string} args.uid Unique ID for the form. Find in your form URL.
   * For example, in the URL "https://mysite.typeform.com/to/u6nXL7" the form_id is u6nXL7.
   * @param {string} args.tag Unique name you want to use for the webhook.
   * @returns {Promise} Promise that resolves with created webhook.
   */
  get({ uid, tag }  = {}) {
    return this._http.request({
      method: 'get',
      url: `/forms/${uid}/webhooks/${tag}`
    });
  }

  /**
   * Updates a webhook.
   * 
   * @param {Object} args Arguments to update a webhook.
   * @param {string} args.uid Unique ID for the form. Find in your form URL.
   * For example, in the URL "https://mysite.typeform.com/to/u6nXL7" the form_id is u6nXL7.
   * @param {string} args.tag Unique name you want to use for the webhook.
   * @param {string} [args.url] Webhook URL.
   * @param {boolean} [args.enabled] True if you want to send responses to the webhook immediately. Otherwise, false.
   * @returns {Promise} Promise that resolves with updated webhook.
   */
  update(args) {
    return createOrUpdateWebhook(this._http, args);
  }
}
