import { ExternalClient, IOContext, InstanceOptions } from '@vtex/api'
import { CREDENTIALS } from '../credentials'

export default class Products extends ExternalClient {
  constructor(context: IOContext, options?: InstanceOptions) {
    super('http://pragma.vtexcommercestable.com.br', context, options)
  }


  public getProduct = async () => {
    const response = await this.http.get(
      `http://pragma.vtexcommercestable.com.br/api/catalog/pvt/product/17`,
      {
        headers: {
          'Content-Type': 'application/json',
          Accept: `application/json`,
          'x-vtex-api-appkey': CREDENTIALS.appKey,
          'x-vtex-api-apptoken': CREDENTIALS.appToken,
        }
      }
    )

    return response
  }
}
