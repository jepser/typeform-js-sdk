import { axios } from '../common'
import { clientConstructor } from '../../src/create-client'
import { API_BASE_URL } from '../../src/constants'
import { Webhooks } from '../../src/webhooks'

beforeEach(() => {
  axios.reset()
  axios.onAny().reply(200)
})

const http = clientConstructor({
  token: '123'
})
const webhooksRequest = new Webhooks(http)

test('Create a new webhooks has the correct path, method and url', async () => {
  const request = {
    uid: '2',
    tag: 'test',
    url: 'http://test.com',
    enable: true
  }
  await webhooksRequest.create(request)
  const bodyParsed = JSON.parse(axios.history.put[0].data)
  expect(axios.history.put[0].method).toBe('put')
  expect(axios.history.put[0].url).toBe(`${API_BASE_URL}/forms/2/webhooks/test`)
  expect(bodyParsed.url).toBe(request.url)
})

test('Create a new webhooks requires a url', () => {
  // @ts-ignore
  expect(() => webhooksRequest.create({ uid: '2', tag: 'test' })).toThrow()
})

test('`get()` webhooks has the correct path and method', async () => {
  await webhooksRequest.get({ uid: '2', tag: 'test' })
  expect(axios.history.get[0].url).toBe(`${API_BASE_URL}/forms/2/webhooks/test`)
  expect(axios.history.get[0].method).toBe('get')
})

test('`list()` webhooks has the correct path and method', async () => {
  await webhooksRequest.list({ uid: '2' })
  expect(axios.history.get[0].url).toBe(`${API_BASE_URL}/forms/2/webhooks`)
  expect(axios.history.get[0].method).toBe('get')
})

test('update a new webhooks sends the correct payload', async () => {
  const request = {
    uid: '2',
    tag: 'test',
    url: 'http://test.com'
  }
  await webhooksRequest.update(request)
  const bodyParsed = JSON.parse(axios.history.put[0].data)
  expect(axios.history.put[0].method).toBe('put')
  expect(bodyParsed.url).toBe(request.url)
})

test('Delete a webhook has the correct path and method', async () => {
  await webhooksRequest.delete({ uid: '2', tag: 'test' })
  expect(axios.history.delete[0].url).toBe(`${API_BASE_URL}/forms/2/webhooks/test`)
  expect(axios.history.delete[0].method).toBe('delete')
})

test('toggle(false) Disable a webhook', async () => {
  await webhooksRequest.toggle({ uid: '2', tag: 'test', enabled: false })
  const bodyParsed = JSON.parse(axios.history.put[0].data)
  expect(axios.history.put[0].method).toBe('put')
  expect(axios.history.put[0].url).toBe(`${API_BASE_URL}/forms/2/webhooks/test`)
  expect(bodyParsed.enabled).toBe(false)
})

test('toggle(true) Enable a webhook', async () => {
  await webhooksRequest.toggle({ uid: '2', tag: 'test', enabled: true })
  const bodyParsed = JSON.parse(axios.history.put[0].data)
  expect(axios.history.put[0].method).toBe('put')
  expect(axios.history.put[0].url).toBe(`${API_BASE_URL}/forms/2/webhooks/test`)
  expect(bodyParsed.enabled).toBe(true)
})
