export async function products(ctx: Context, next: () => Promise<any>) {
  const {
    clients: { products },
  } = ctx

  console.info('Pedir producto')

  const {
    headers,
    data,
    status: responseStatus,
  } = await products.getProduct()

  console.info('Status headers', headers)
  console.info('Status data:', data)

  ctx.status = responseStatus
  ctx.body = data
  ctx.set('Cache-Control', headers['cache-control'])

  await next()
}
