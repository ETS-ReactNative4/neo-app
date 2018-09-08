const storeService = {};

export const updateStoreService = store => {
  for (const key in store) {
    storeService[key] = store[key];
  }
};

export default storeService;
