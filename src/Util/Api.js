import Config from './Config'

const { api: { baseAddress, productByKeyword, productBySellerId, addProduct, addSeller } } = Config;
export const setUrl = (uri) => `${baseAddress}${uri}`;

export const url = {
  productByKeyword: setUrl(productByKeyword),
  productBySellerId: setUrl(productBySellerId),
  addProduct: setUrl(addProduct),
  addSeller: setUrl(addSeller)
};

export const options = {
  headers: {
    'Content-Type': 'application/json'
  }
};
