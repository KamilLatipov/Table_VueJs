import products from './products.json';

/** True = 65%, False = 35% */
const rejectByChance = () => {
  return Math.random() <= 0.35;
};

/** Emulate get request */
export const getProducts = ({ commit }) => new Promise((resolve, reject) => {
  if (rejectByChance()) {
    return reject({ error : 'something went wrong'});
  }
  const delay = parseInt(Math.random() * 1000);
  setTimeout(() => {
    resolve(products)
    commit('GET_PRODUCTS', products)
  }, delay);
});

/** Emulate delete request */
export const deleteProducts = ({ commit }, idArray) => new Promise((resolve, reject) => {
  if (rejectByChance()) {
    alert('Возникла ошибка, повторите действие еще раз')
    return reject({

    });
  }
  const delay = parseInt(Math.random() * 1000);
  setTimeout(() => {
    commit('DELETE_PRODUCTS', idArray);
    resolve({ message: 'deleted' });
  }, delay);
});
