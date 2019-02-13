export default http => new Images(http);

class Images {
  constructor(_http) {
    this._http = _http;
  }

  /**
   * Adds an image in your Typeform account.
   * Specify the URL of your image or send your image in base64 format, which encodes the image data as ASCII text.
   * You can use a tool like Base64 Image Encoder to get the base64 code for the image you want to add.
   * 
   * @param {Object} args
   * @param {string} args.image Base64 code for the image. Note that base64 encoders may add descriptors to the code (such as data:image/png;base64,)
   * Do not include these descriptors in your image string---include only the base64 code.
   * @param {string} [args.mediaType]
   * @param {string} args.fileName File name for the image.
   * @returns {Promise} Promise that resolves on success.
   */
  add({ image, mediaType, fileName}  = {}) {
    return this._http.request({
      method: 'post',
      url: `/images`,
      data: {
        image,
        file_name: fileName,
        media_type: mediaType
      }
    });
  }

  /**
   * Deletes an image from your Typeform account.
   * 
   * @param {Object} args
   * @param {string} args.id Unique ID for the image to retrieve.
   * @returns {Promise} Promise that resolves on success.
   */
  delete({ id }  = {}) {
    return this._http.request({
      method: 'delete',
      url: `/images/${id}`
    });
  }

  /**
   * Retrieves the JSON description or the binary of the original image for the specified image_id.
   * NOTE: Default is to return the binary of the original image.
   * Use the Accept header to specify application/json to return the JSON description of the image instead.
   * 
   * @param {Object} args
   * @param {string} args.id Unique ID for the image to retrieve.
   * @param {string} [args.returns] Default is to return the binary of the original image.
   * Use 'json' to specify application/json to return the JSON description of the image instead.
   * @param {string} [args.size] Image size to retrieve. Options include "default", "thumbnail", "mobile"
   * @param {string} [args.backgroundSize] Image size to retrieve. Options include "default", "thumbnail", "mobile", "tablet"
   * @param {string} [args.choiceSize] Image size to retrieve.
   * Options include "default", "thumbnail", "supersize", "supermobile", "supersizefit", "supermobilefit"
   * @returns {Promise} Promise that resolves with image resource with associated metadata.
   */
  get({ id, returns, size, backgroundSize, choiceSize }  = {}) {
    const requestQuery = {
      method: 'get',
      url: `/images/${id}`
    };
  
    if (returns === 'json') {
      requestQuery.headers = {
        Accept: 'application/json'
      };
    }
  
    if (size !== undefined) {
      if (['default', 'thumbnail', 'mobile'].includes(size)) {
        requestQuery.url += `/image/${size}`;
      } else {
        throw new Error(`Image size doesn't exists`);
      }
    }
  
    if (backgroundSize !== undefined) {
      if (['default', 'thumbnail', 'mobile', 'tablet'].includes(backgroundSize)) {
        requestQuery.url += `/background/${backgroundSize}`;
      } else {
        throw new Error(`Image background size doesn't exists`);
      }
    }
  
    const choiceImageSizes = [
      'default',
      'thumbnail',
      'supersize',
      'supermobile',
      'supersizefit',
      'supermobilefit'
    ];

    if (choiceSize !== undefined) {
      if (choiceImageSizes.includes(choiceSize)) {
        requestQuery.url += `/choice/${choiceSize}`;
      } else {
        throw new Error(`Image choice size doesn't exists`);
      }
    }
  
    return this._http.request(requestQuery);
  }

  /**
   * Retrieves a list of JSON descriptions for all images in your Typeform account.
   * Images are listed in reverse-chronological order based on the date you added them to your account.
   * 
   * @returns {Promise} Promise that resolves with an array of image descriptions.
   */
  list() {
    return this._http.request({
      method: 'get',
      url: '/images'
    });
  }
}
