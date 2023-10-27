export interface StoreInfo {
  id: number;
  name: string;
}

export async function getAllStores (): Promise<StoreInfo[]> {
  return new Promise((resolve, reject) => {
    let openDbRequest = indexedDB.open("all-stores", 2);

    openDbRequest.onerror = function() {
      reject(openDbRequest.error)
    };

    openDbRequest.onsuccess = function() {
      let db = openDbRequest.result;
      const allStores = db.transaction('stores-data','readonly');
      const reguestGetStores = allStores.objectStore('stores-data').getAll();
      db.close()

      // @ts-ignore
      reguestGetStores.onsuccess = () => resolve(reguestGetStores.result);
    };
  })
}
