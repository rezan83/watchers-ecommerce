import app from '../app'
import * as db from './db'
import supertest from 'supertest'
const request = supertest(app)

describe('Test request with mongoose', () => {
  beforeAll(async () => {
    jest.setTimeout(100000)
    await db.connect()
  })
  afterEach(async () => {
    await db.clearDatabase()
  })
  afterAll(async () => {
    await db.closeDatabase()
  })
  test('get 0 products when databas empty', async () => {
    const res = await request.get('/api/v1/products/')

    expect(res.statusCode).toBe(200)
    expect(res.body.products.length).toBe(0)
  })

  test('get 1 product when 1 added', async () => {
    const product = {
      name: 'test',
      price: 200,
    }

    const res = await request.post('/api/v1/products/').send(product)
    expect(res.statusCode).toBe(201)
    const productsRes = await request.get('/api/v1/products/')
    expect(productsRes.body.products.length).toBe(1)
  })

  test('get 2 product when 2 added', async () => {
    const product = {
      name: 'test',
      price: 200,
    }

    await request.post('/api/v1/products/').send(product)
    await request.post('/api/v1/products/').send(product)
    const productsRes = await request.get('/api/v1/products/')
    expect(productsRes.body.products.length).toBe(2)
  })

  test('delete one of two product, get single product', async () => {
    const product = {
      name: 'test',
      price: 200,
    }

    const res = await request.post('/api/v1/products/').send(product)
    const res1 = await request.post('/api/v1/products/').send(product)

    await request.delete('/api/v1/products/' + res.body.product._id)
    const productsRes = await request.get('/api/v1/products/')
    const oneProductRes = await request.get(
      '/api/v1/products/' + res1.body.product._id
    )
    expect(productsRes.body.products.length).toBe(1)
    expect(oneProductRes.statusCode).toBe(200)
  })

  test('update a product product', async () => {
    const product = {
      name: 'test',
      price: 200,
    }

    const product1 = {
      name: 'updated',
    }

    const res = await request.post('/api/v1/products/').send(product)

    await request.put('/api/v1/products/' + res.body.product._id).send(product1)
    const oneProductRes = await request.get(
      '/api/v1/products/' + res.body.product._id
    )
    expect(oneProductRes.statusCode).toBe(200)
    expect(oneProductRes.body.name).toBe('updated')
  })
})
