import { Typeform } from './typeform-types'

export class Webhooks {
  constructor (private _http: Typeform.HTTPClient) { }

  public create (
    args: { uid: string, tag: string, url: string, enabled?: boolean, secret?: string, verifySSL?: boolean }
  ): Promise<Typeform.Webhook> {
    return createOrUpdateWebhook(this._http, args)
  }

  public delete (args: { uid: string, tag: string }): Promise<null> {
    const { uid, tag } = args

    return this._http.request({
      method: 'delete',
      url: `/forms/${uid}/webhooks/${tag}`
    })
  }

  public get (args: { uid: string, tag: string }): Promise<Typeform.Webhook> {
    const { uid, tag } = args

    return this._http.request({
      method: 'get',
      url: `/forms/${uid}/webhooks/${tag}`
    })
  }

  public list (args: { uid: string }): Promise<Typeform.API.Webhooks.List> {
    const { uid } = args

    return this._http.request({
      method: 'get',
      url: `/forms/${uid}/webhooks`
    })
  }
  
  public toggle (args: { uid: string, tag: string, enabled: boolean }): Promise<Typeform.API.Webhooks.List> {
    const { uid, tag, enabled } = args

    return this._http.request({
      method: 'put',
      url: `/forms/${uid}/webhooks/${tag}`,
      data: {
        enabled
      }
    })
  }

  update (
    args: { uid: string, tag: string, url: string, enabled?: boolean, secret?: string, verifySSL?: boolean }
  ): Promise<Typeform.Webhook> {
    return createOrUpdateWebhook(this._http, args)
  }
}

const createOrUpdateWebhook = (
  http: Typeform.HTTPClient,
  args: { uid: string, tag: string, url: string, enabled?: boolean, secret?: string, verifySSL?: boolean }
): Promise<Typeform.Webhook> => {
  const { uid, tag, url, enabled = false, secret, verifySSL } = args

  if (!url) {
    throw new Error(`Please provide an url for ${tag}`)
  }

  if (!tag) {
    throw new Error(`Please provide a tag name for the webhook`)
  }

  return http.request({
    method: 'put',
    url: `/forms/${uid}/webhooks/${tag}`,
    data: {
      url,
      enabled,
      secret,
      verify_ssl: verifySSL ? true : undefined
    }
  })
}
