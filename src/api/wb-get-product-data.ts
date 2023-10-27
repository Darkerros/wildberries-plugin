
interface Product {
  extended: {
    basicPriceU: number;
    basicSale: number;
    clientPriceU: number;
    clientSale: number;
  },
  sizes: ProductSize[];
}

interface ProductSize {
  time1: number;
  time2: number;
  wh: number;
  stocks: ProductStock[];
}

export interface ProductStock {
  qty: string;
  time1: number;
  time2: number;
  wh: string;
}

export async function wbGetProductData (productId: string, extraArgs: string): Promise<Product> {
  const resp = await fetch(`https://card.wb.ru/cards/v1/detail?${extraArgs}&nm=${productId}`)
  const data = (await resp.json()).data;

  return data.products.find((elem: { id: string; }) => elem.id == productId)
}
