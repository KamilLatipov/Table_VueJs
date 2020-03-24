import products from './products.json';

/** True = 65%, False = 35% */
const rejectByChance = () => {
  return Math.random() <= 0.35;
};

/** Emulate get request */
export const getProducts = ({ commit }) => new Promise((resolve, reject) => {
  if (rejectByChance()) {
    return reject({
      error: 'Server error'
    });
  }
  const delay = parseInt(Math.random() * 1000);
  setTimeout(() => {
    resolve(products);
    commit('GET_PRODUCTS', products)
  }, delay);
});

/** Emulate delete request */
export const deleteProducts = () => new Promise((resolve, reject) => {
  if (rejectByChance()) {
    return reject({
      error: 'Server error'
    });
  }
  const delay = parseInt(Math.random() * 1000);
  setTimeout(() => {
    resolve({ message: 'deleted' });
  }, delay);
});
