# Typeform JavaScript SDK

[![Build Status](https://travis-ci.com/Typeform/js-api-client.svg?token=nePyGZWpdyBxUnh9PswC&branch=master)](https://travis-ci.com/Typeform/js-api-client)

------

JS Client wrapper for Typeform API

## Table of contents

- [Installation](#installation)
- [Usage](#usage)
  - [Initialize](#initialize)
- [Reference](#reference)
  - [Create Client](#createclienttoken)
  - [Forms](#forms)
  - [Images](#images)
  - [Teams](#teams)
  - [Themes](#themes)
  - [Workspaces](#workspaces)
  - [Responses](#responses)
  - [Webhooks](#webhooks)
- [Examples](#examples)
- [Testing](#testing)
- [Suggestions](#suggestions-or-feedback)

## Installation

``` bash
# install with yarn
yarn add @typeform/api-client

# install with npm
npm install @typeform/api-client --save
```

## Usage

### Initialize

1. Import client library

``` javascript
  // If using ESM syntax
  import { createClient } from '@typeform/api-client'
  // If using CJS syntax
  const { createClient } = require('@typeform/api-client')
```

2. Create an instance with your personal token

``` javascript
  const typeformAPI = createClient({ token: '<your token>' })
```

3. Use any of the methods available in the [reference](#reference)

``` javascript
  // will retrieve all forms
  typeformAPI
    .forms
    .list()
    .then(response => {
      // do what do you want with your typeforms
    })
```

## Reference

### `createClient({token})`

- Creates a new instance of Typeform's JS client
- Returns an instance with the methods described below

``` javascript
  const typeformClient = createClient({ token: '<your token>' })

  // If what you are trying to acces doesn't require a token, you can construct the client without any argument
  const typeformAPI = createClient()
```

Client returns the following properties:

- `forms`
- `images`
- `teams`
- `workspaces`
- `themes`
- `responses`
- `webhooks`

Each one of them encapsulates the operations related to it (like listing, updating, deleting the resource).

### Forms

#### `forms.list({ page: 1, pageSize = 10, search = '', page })`

- Get a list of your typeforms
- Returns a list of typeforms with the payload [referenced here](https://developer.typeform.com/create/reference/retrieve-forms/).

#### `forms.get({ uid })`

- Get a typeform by UID
- Returns a typeform with the payload [referenced here](https://developer.typeform.com/create/reference/retrieve-form/).

#### `forms.create({ data = {} })`

- Create a typeform
- Returns a typeform with the payload [referenced here](https://developer.typeform.com/create/reference/create-form/).

#### `forms.update({ uid, data = {}, override = false })`

- Update a typeform by UID
- Returns a typeform with the payload [referenced here](https://developer.typeform.com/create/reference/update-form/).

#### `forms.delete({ uid })`

- Deletes a typeform by UID

#### `forms.messages.get({ uid })`

- Get custom messages of the typeform with the given UID

#### `forms.messages.update({ uid })`

- Updates custom messages of the typeform with the given UID

### Images

#### `images.list()`

- Get your images collection

#### `images.get({ id, size, backgroundSize, choiceSize })`

- Get custom image by ID
- `size`: default, thumbnail, mobile
- `backgroundSize`: default, thumbnail, mobile, tablet
- `choiceSize`: default, thumbnail, supersize, supermobile, supersizefit, supermobilefit

#### `images.add({ image, url, fileName })`

- Add an image to Typeform
- `image`: Base64 code for the image. Note that base64 encoders may add descriptors to the code (such as `data:image/png;base64,`). Do not include these descriptors in your image string---include only the base64 code. Use this or `url` (below)
- `url`: URL of the image. Use this or `image` (above)
- `fileName`: File name for the image

#### `images.delete({ id })`

- Deletes an image with the given ID

### Themes

#### `themes.list({ page, pageSize })`

- Gets your themes collection
- `page`: default `1`
- `pageSize: default `10`

#### `themes.get({ id })`

- Gets a theme for the given ID

#### `themes.create({ background, colors, font, hasTransparentButton, name })`

- Creates a theme with the given configuration
- See more details of the payload in [the documentation](https://developer.typeform.com/create/reference/create-theme/)

#### `themes.update({ background, colors, font, hasTransparentButton, name })`

- Updates a theme with the given configuration
- See more details of the payload in [the documentation](https://developer.typeform.com/create/reference/update-theme/)

#### `themes.delete({ id })`

- Deletes the theme with the given ID

### Workspaces

#### `workspaces.add({ name })`

- Create a workspace.
- `name`: Name of the new workspace.

#### `workspaces.addMembers({ id, members })`

- Add members to a workspace for the given ID
- `id`: Unique ID for the workspace.
- `members`: `string` or an `array` that should be the email of the user
- Adding multiple members at once is possible using an array of emails

#### `workspaces.delete({ id })`

- Delete a workspace.
- `id`: Unique ID for the workspace.

#### `workspaces.get({ id })`

- Retrieve a workspace.
- `id`: Unique ID for the workspace.

#### `workspaces.list({ page, pageSize, search })`

- Retrieve all workspaces in your account.
- `page`: The page of results to retrieve. Default `1` is the first page of results.
- `pageSize`: Number of results to retrieve per page. Default is 10. Maximum is 200.
- `search`: Returns items that contain the specified string.

#### `workspaces.removeMembers({ id, members })`

- Remove members from a workspace for the given ID
- `members`: `string` or an `array` that should be the email of the user
- Removing multiple members at once is possible using an array of emails

#### `workspaces.update({ id, data })`

- Update a workspace.
- `id`: Unique ID for the workspace.
- `data`: Patch operation to perform in an array structure. See more details in [the documentation](https://developer.typeform.com/create/reference/update-workspace/)

### Responses

#### `responses.delete({ uid, ids })`

- Delete responses to a form.
- `uid`: Unique ID for the form.
- `ids`: Tokens of the responses to delete. You can list up to 1000 tokens. Accepts either a string or an array of strings.

#### `responses.list({ uid, pageSize, since, until, after, before, ids, completed, sort, query, fields })`

- Returns form responses and date and time of form landing and submission.
- `uid`: Unique ID for the form.
- `pageSize`: Maximum number of responses. Default value is 25. Maximum value is 1000.
- `since`: Limit request to responses submitted since the specified date and time. In ISO 8601 format, UTC time, to the second, with T as a delimiter between the date and time.
- `until`: Limit request to responses submitted until the specified date and time. In ISO 8601 format, UTC time, to the second, with T as a delimiter between the date and time.
- `after`: Limit request to responses submitted after the specified token. If you use the `after` parameter, the responses will be sorted in the order that our system processed them (instead of the default order, `submitted_at`).
- `before`: Limit request to responses submitted before the specified token. If you use the `before` parameter, the responses will be sorted in the order that our system processed them (instead of the default order, `submitted_at`).
- `ids`: Limit request to the specified ids. Accepts either a string or an array of strings.
- `completed`: `true` if form was submitted. Otherwise, `false`.
- `sort`: Order of responses. Currently, responses are automatically sorted by `submitted_at,desc`---the date they were submitted, from newest to oldest. We plan to add more options for sort order soon.
- `query`: Limit request to only responses that that include the specified string. You can specify any string as the `query` value. The string will be escaped, and the query will include Hidden Fields.
- `fields`: Limit request to only responses for the specified fields. Accepts either a string or an array of strings.
- For parameter details check [the documentation](https://developer.typeform.com/responses/reference/retrieve-responses/)

### Webhooks

#### `webhooks.create({ uid, tag, url, enabled = false, secret, verifySSL })`

- Create a webhook.
- `uid`: Unique ID for the form.
- `tag`: Unique name you want to use for the webhook.
- `url`: Webhook URL.
- `enabled`: `true` if you want to send responses to the webhook immediately. Otherwise, `false`.
- `secret`: If specified, will be used to sign the webhook payload with HMAC SHA256, so that you can verify that it came from Typeform. (Recommended to add security)
- `verifySSL`: `true` if you want Typeform to verify SSL certificates when delivering payloads.

#### `webhooks.delete({ uid, tag })`

- Delete a webhook.
- `uid`: Unique ID for the form.
- `tag`: Unique name of the webhook.

#### `webhooks.get({ uid, tag })`

- Get details for a webhook with the given tag
- `uid`: Unique ID for the form.
- `tag`: tag of the webhook created

#### `webhooks.list({ uid })`

- Retrieve all webhooks for the specified typeform.
- `uid`: Unique ID for the form.

#### `webhooks.update({ uid, tag, url, enabled = false, secret, verifySSL })`

- Update a webhook.
- `uid`: Unique ID for the form.
- `tag`: Unique name you want to use for the webhook.
- `url`: Webhook URL.
- `enabled`: `true` if you want to send responses to the webhook immediately. Otherwise, `false`.
- `secret`: If specified, will be used to sign the webhook payload with HMAC SHA256, so that you can verify that it came from Typeform.
- `verifySSL`: `true` if you want Typeform to verify SSL certificates when delivering payloads.

#### `webhooks.toggle({ uid, tag, enabled })`

- Turn on or off a webhook.
- `uid`: Unique ID for the form.
- `tag`: tag of the webhook created.
- `enabled`: `true` or `false`.

## Examples

### Update specific typeform property, as [referenced here](https://developer.typeform.com/create/reference/update-form-patch/)

``` javascript
  typeformClient
    .forms
    .update({
      uid: 'asdf',
      data: [
        {
          "op": "replace",
          "path": "/title",
          "value": 'new title'
        }
      ]
    })
    .then(response => {
      //...
    })
```

### Update the whole typeform

``` javascript
  typeformClient
    .forms
    .update({
      uid: 'asdf',
      override: true,
      data: {
        "title": newTitle,
        "theme": {
          "href": "https://api.typeform.com/themes/6lPNE6"
        }
      }
    })
    .then(response => {
      //...
    })
```

**Note:**
The theme property applies a `theme` to the form. If you don't specify a value for the 'theme' property, Typeform applies a new copy of the default theme to the form, **even if you already have a copy of the default theme applied to this form**. 

### Uploading an image

``` javascript
  typeformClient
    .images
    .add({
      image: "bGRqZmxzZGpmbHNoZmtoc2RrZmpoc2tqZA==",
      mediaType: "image/gif",
      fileName: "newimage.gif"
    })
    .then(response => {
      //...
    })

```

### Getting the thumbnail of an image

``` javascript
  typeformClient
    .images
    .get({ id: 'asdf', size: 'thumbnail' })
    .then(response => {
      //...
    })

```

## Testing

To run unit tests.

``` bash
yarn install

# Runs unit tests
yarn test:unit

```

## Suggestions or feedback

Fill out this [conversation](https://bit.ly/2wmzCXi) 🙂
