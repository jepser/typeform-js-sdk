import { clientConstructor } from '../../src/create-client'
import { API_BASE_URL } from '../../src/constants'

import webhooks from '../../src/webhooks'

beforeEach(() => {
  fetch.resetMocks()
})

const http = clientConstructor({
  token: '123'
})
const webhooksRequest = webhooks(http)

test('List webhooks has the correct path and method', () => {
  webhooksRequest.get({ uid: 2, tag: 'test' })
  expect(fetch.mock.calls[0][1].method).toBe('get')
  expect(fetch.mock.calls[0][0]).toBe(`${API_BASE_URL}/forms/2/webhooks/test`)
})

test('Create a new webhooks has the correct path, method and url', () => {
  webhooksRequest.create({
    uid: 2,
    tag: 'test',
    url: 'http://test.com',
    enable: true
  })
  expect(fetch.mock.calls[0][1].method).toBe('put')
  expect(fetch.mock.calls[0][0]).toBe(`${API_BASE_URL}/forms/2/webhooks/test`)
  expect(fetch.mock.calls[0][1].data.url).toBe('http://test.com')
})

test('Create a new webhooks requires a url', () => {
  expect(() => webhooksRequest.create({ uid: 2, tag: 'test' })).toThrow()
})

test('update a new webhooks sends the correct payload', () => {
  webhooksRequest.update({
    uid: 2,
    tag: 'test',
    url: 'http://example.com'
  })
  expect(fetch.mock.calls[0][1].data.url).toBe('http://example.com')
  expect(fetch.mock.calls[0][1].method).toBe('put')
})

test('Delete a webhook has the correct path and method', () => {
  webhooksRequest.delete({ uid: 2, tag: 'test' })
  expect(fetch.mock.calls[0][1].method).toBe('delete')
  expect(fetch.mock.calls[0][0]).toBe(`${API_BASE_URL}/forms/2/webhooks/test`)
})