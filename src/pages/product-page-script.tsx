import React from "react";
import { Root, createRoot} from "react-dom/client";
import {waitForElement} from "../utils/wait-for-element";

import SpoComponent from "../components/spo-components/spo-component";
import {getAllStores} from "../utils/get-all-stores";
import StorageInfo from "../components/storage-info/storage-info";
import {wbGetProductData} from "../api/wb-get-product-data";
import {arrayToDictionaryFromArrayElementKeyValue} from "../utils/array-to-dictionary-from-array-element-key-value";
import {calculateTime} from "../utils/calculate-time";
import {waitForHrefChange} from "../utils/wait-for-href-change";

const renderModule = async () => {
  const rootReactComponents: Root[] = [];
  const rootContainersComponents: HTMLDivElement[] = [];

  const currentHref = window.location.href
  const productId = currentHref.substring(currentHref.indexOf("/catalog/") + 9, currentHref.lastIndexOf("/detail.aspx"));

  const reguestExtraArg = JSON.parse(localStorage.getItem('geo-data-v1-0') || '')?.data?.xinfo;
  const productData = await wbGetProductData(productId, reguestExtraArg)

  const spoPercentage = productData.extended.clientSale;
  const beforeSpoPrice = productData.extended.basicPriceU / 100;

  const storesData = await getAllStores();
  const storeInfoDict = arrayToDictionaryFromArrayElementKeyValue(storesData,'id')

  const fastStoreId = productData.sizes[0].wh
  const productStocks = productData.sizes[0].stocks
  const fastStoreTime = calculateTime(productData.sizes[0])


  waitForElement('.product-page__aside-container').then((elm) => {
    const desktopSpoContainer = document.createElement('div',{ });
    elm.insertBefore(desktopSpoContainer, elm.children[1])

    const root = createRoot(desktopSpoContainer);
    rootReactComponents.push(root)
    rootContainersComponents.push(desktopSpoContainer)

    root.render(
      <React.StrictMode>
        <SpoComponent spoPercentage={spoPercentage} beforeSpoPrice={beforeSpoPrice}/>
      </React.StrictMode>
    );

  });

  waitForElement('.product-page__price-block').then((elm) => {
    const desktopSpoContainer = document.createElement('div',{ });
    elm.children[0].append(desktopSpoContainer)

    const root = createRoot(desktopSpoContainer);
    rootReactComponents.push(root)
    rootContainersComponents.push(desktopSpoContainer)

    root.render(
      <React.StrictMode>
        <SpoComponent spoPercentage={21} beforeSpoPrice={377}/>
      </React.StrictMode>
    );
  });

  waitForElement('.product-page__aside-sticky').then((elm) => {
    const desktopSpoContainer = document.createElement('div',{ });
    elm.insertBefore(desktopSpoContainer, elm.children[1])

    const root = createRoot(desktopSpoContainer);
    rootReactComponents.push(root)
    rootContainersComponents.push(desktopSpoContainer)

    root.render(
      <React.StrictMode>
        <StorageInfo storeInfoDict={storeInfoDict} fastStoreId={fastStoreId} fastStoreTime={fastStoreTime} productStocks={productStocks}/>
      </React.StrictMode>
    );
  });


  await waitForHrefChange().then(() => {
    rootReactComponents.forEach(root => root.unmount())
    rootContainersComponents.forEach(elem => elem.remove())
    renderModule()
  })
}

renderModule()





