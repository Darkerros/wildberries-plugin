import React, {FC} from 'react';
import './storage-info.css'

import { StoreInfo } from "../../utils/get-all-stores";
import {ProductStock} from "../../api/wb-get-product-data";
import {calculateTime} from "../../utils/calculate-time";

interface StorageInfoProps {
  fastStoreId: number;
  fastStoreTime: number;
  storeInfoDict: Record<string, StoreInfo>;
  productStocks: ProductStock[];
}

const StorageInfo: FC<StorageInfoProps> = (props) => {
  const {
    fastStoreId,
    fastStoreTime,
    storeInfoDict,
    productStocks
  } = props;

  return (
    <div className="storage-info">
      <p className="storage-info__title">Раскладка по складам</p>
      <p className="storage-info__main-store-info">{storeInfoDict[fastStoreId].name}: {fastStoreTime} час.</p>
      <div className="storage-info__stores">
        {
          productStocks.map(stockElem => {
            return (<><span>{storeInfoDict[stockElem.wh].name.replace(' WB','')}:</span><span className="storage-info__stores-time">{calculateTime(stockElem)} ч.</span><span>{stockElem.qty} шт.</span></>)
          })
        }
      </div>
    </div>
  );
};

export default StorageInfo;
