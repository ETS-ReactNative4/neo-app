const storeService = {};

export const updateStoreService = store => {
  for (const key in store) {
    if (store.hasOwnProperty(key)) {
      storeService[key] = store[key];
    }
  }
};

export default storeService;
