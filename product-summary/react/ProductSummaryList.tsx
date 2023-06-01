import React, { useCallback, useState } from 'react'
import axios, { AxiosResponse } from 'axios'
import type { ComponentType, PropsWithChildren } from 'react'
import { useQuery } from 'react-apollo'
import { QueryProducts } from 'vtex.store-resources'
import type { QueryProductsTypes } from 'vtex.store-resources'
import { usePixel } from 'vtex.pixel-manager'
import { ProductList as ProductListStructuredData } from 'vtex.structured-data'

import ProductSummaryListWithoutQuery from './ProductSummaryListWithoutQuery'
import { PreferenceType } from './utils/normalize'


const ORDER_BY_OPTIONS = {
  RELEVANCE: {
    name: 'admin/editor.productSummaryList.orderType.relevance',
    value: '',
  },
  TOP_SALE_DESC: {
    name: 'admin/editor.productSummaryList.orderType.sales',
    value: 'OrderByTopSaleDESC',
  },
  PRICE_DESC: {
    name: 'admin/editor.productSummaryList.orderType.priceDesc',
    value: 'OrderByPriceDESC',
  },
  PRICE_ASC: {
    name: 'admin/editor.productSummaryList.orderType.priceAsc',
    value: 'OrderByPriceASC',
  },
  NAME_ASC: {
    name: 'admin/editor.productSummaryList.orderType.nameAsc',
    value: 'OrderByNameASC',
  },
  NAME_DESC: {
    name: 'admin/editor.productSummaryList.orderType.nameDesc',
    value: 'OrderByNameDESC',
  },
  RELEASE_DATE_DESC: {
    name: 'admin/editor.productSummaryList.orderType.releaseDate',
    value: 'OrderByReleaseDateDESC',
  },
  BEST_DISCOUNT_DESC: {
    name: 'admin/editor.productSummaryList.orderType.discount',
    value: 'OrderByBestDiscountDESC',
  },
}

const parseFilters = ({ id, value }: { id: string; value: string }) =>
  `specificationFilter_${id}:${value}`


export interface ProductClickParams {
  position: number
}

interface SpecificationFilter {
  id: string
  value: string
}

interface Props {
  /** Category ID of the listed items. For sub-categories, use "/" (e.g. "1/2/3") */
  category?: string
  /** Specification Filters of the listed items. */
  specificationFilters?: SpecificationFilter[]
  /** Filter by collection. */
  collection?: string
  /**
   * Ordination type of the items. Possible values: `''`, `OrderByTopSaleDESC`, `OrderByReleaseDateDESC`, `OrderByBestDiscountDESC`, `OrderByPriceDESC`, `OrderByPriceASC`, `OrderByNameASC`, `OrderByNameDESC`
   * @default ""
   */
  orderBy?:
    | ''
    | 'OrderByTopSaleDESC'
    | 'OrderByPriceDESC'
    | 'OrderByPriceASC'
    | 'OrderByNameASC'
    | 'OrderByNameDESC'
    | 'OrderByReleaseDateDESC'
    | 'OrderByBestDiscountDESC'
  /** Hides items that are unavailable. */
  hideUnavailableItems?: boolean
  /**
   * Maximum items to be fetched.
   * @default 10
   */
  maxItems?: number
  /**
   * Control SKUs returned for each product in the query. The less SKUs needed to be returned, the more performant your shelf query will be.
   * @default "ALL_AVAILABLE"
   */
  skusFilter?: 'ALL_AVAILABLE' | 'ALL' | 'FIRST_AVAILABLE'
  /**
   * Control what price to be shown when price has different installments options.
   * @default "MAX_WITHOUT_INTEREST"
   */
  installmentCriteria?: 'MAX_WITHOUT_INTEREST' | 'MAX_WITH_INTEREST'
  /**
   * Name of the list property on Google Analytics events.
   */
  listName?: string
  /**
   * Logic to enable which SKU will be the selected item
   * */
  preferredSKU?: PreferenceType
  /** Slot of a product summary. */
  ProductSummary: ComponentType<{ product: any; actionOnClick: any }>
  /** Callback on product click. */
  actionOnProductClick?: (product: any) => void
}

function ProductSummaryList(props: PropsWithChildren<Props>) {
  const {
    category = '',
    collection,
    hideUnavailableItems = false,
    orderBy = ORDER_BY_OPTIONS.RELEVANCE.value,
    specificationFilters = [],    
    skusFilter,
    installmentCriteria,
    children,
    listName: rawListName,
    ProductSummary,
    actionOnProductClick,
    preferredSKU,
  } = props

  const { push } = usePixel()
  const { data, loading, error } = useQuery<
    QueryProductsTypes.Data,
    QueryProductsTypes.Variables
  >(QueryProducts, {
    variables: {
      category,
      ...(collection != null
        ? {
            collection,
          }
        : {}),
      specificationFilters: specificationFilters.map(parseFilters),
      orderBy,
      from: 0,
      to: 100 - 1,
      hideUnavailableItems,
      skusFilter,
      installmentCriteria,
    },
  })

 


  const { products } = data ?? {}  
  console.log("****products****");
  console.log(products);
  console.log("****products****");
  

  const baseURL = 'https://6ceedhs64m.execute-api.us-east-1.amazonaws.com/dev-test';

  /*
  const [orderTrackingForm] = useState({
    userId: "3840373493474947557494749",
  })
*/

  let bo : string ;  
  const [postt, setPost] = useState("");
  React.useEffect(() => {
    axios
  .post(baseURL, { userId: "3840373493474947557494749" })
       .then((response: AxiosResponse) => {          
          bo = JSON.stringify(response.data.itemList)   
          console.log("response.data-ok");           
          console.log(response.data.itemList);    
          setPost(bo);
        })
        .catch(function (error: any) {          
            // The request was made but no response was received
            console.error(error);
            let dds = '{"data":{"statusCode":"200","body":"{\\"ResponseMetadata\\": {\\"RequestId\\": \\"4d47c03c-1e18-4446-bf52-7df0a0babb75\\", \\"HTTPStatusCode\\": 200, \\"HTTPHeaders\\": {\\"date\\": \\"Fri, 14 Apr 2023 18:57:52 GMT\\", \\"content-type\\": \\"application/json\\", \\"content-length\\": \\"763\\", \\"connection\\": \\"keep-alive\\", \\"x-amzn-requestid\\": \\"4d47c03c-1e18-4446-bf52-7df0a0babb75\\"}, \\"RetryAttempts\\": 0}, \\"itemList\\": [{\\"itemId\\": \\"21\\"}, {\\"itemId\\": \\"6\\"}, {\\"itemId\\": \\"17\\"}, {\\"itemId\\": \\"28\\"}, {\\"itemId\\": \\"4\\"}, {\\"itemId\\": \\"11\\"}, {\\"itemId\\": \\"27\\"}, {\\"itemId\\": \\"7\\"}, {\\"itemId\\": \\"227\\"}, {\\"itemId\\": \\"16\\"}], \\"recommendationId\\": \\"RID-ab-4c13-9382-575725ddd78a-CID-bfe301\\"}"}}';
            let jds = JSON.parse(dds);
            bo = JSON.stringify(JSON.parse(jds.data.body).itemList);
            console.log(bo);
            setPost(bo);
          });
  

  }, []);
  
  // Not using ?? operator because listName can be ''
  // eslint-disable-next-line no-unneeded-ternary
  const listName = rawListName ? rawListName : 'List of products'

  let result;
  if(products != undefined) {
    //result = products;

    result = products.filter((obj) => {
      //return true;
      //return bo.filter((x : any) => x.itemId === obj.productId).length > 0  
      console.log("FILTRANDO ELEMENTOS -> " + postt);
      return postt.search(obj.productId) > 0;      
      //return obj.productId === '227';
    });
    
  }
  console.log(result);

  const productClick = useCallback(
    (product: any, productClickParams?: ProductClickParams) => {
      actionOnProductClick?.(product)

      const { position } = productClickParams ?? {}

      push({
        event: 'productClick',
        list: listName,
        product,
        position,
      })
    },
    [push, actionOnProductClick, listName]
  )

  if (loading || error) {
    return null
  }

  return (
    <ProductSummaryListWithoutQuery
      products={result}
      listName={listName}
      ProductSummary={ProductSummary}
      actionOnProductClick={productClick}
      preferredSKU={preferredSKU}
    >
      <ProductListStructuredData products={result} />
      {children}
    </ProductSummaryListWithoutQuery>
  )
}

export default ProductSummaryList
