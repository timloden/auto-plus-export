import axios from 'axios';

export const getProducts = (url, products, resolve, reject) => {
    axios
        .get(url, {
            headers: {
                AutoPlusApiKey: 'b09a1f86-1664-4cdc-967c-505b7d04034c',
                'Access-Control-Allow-Headers': 'Authorization',
                'Content-Type': 'application/json',
            },
        })
        .then((response) => {
            const retrievedProducts = products.concat(
                response.data.InventoryItems
            );
            const nextPage = `/api/inventory?batchsize=50&page=${
                response.data.CurrentPage + 1
            }`;
            if (response.data.CurrentPage !== 1) {
                getProducts(nextPage, retrievedProducts, resolve, reject);
            } else {
                resolve(retrievedProducts);
            }
        })
        .catch((error) => {
            console.log(error);
            reject('Something wrong. Please refresh the page and try again.');
        });
};

export const getDate = () => {
    const dt = new Date();
    const date = `${dt.getMonth() + 1}-${dt.getDate()}-${dt.getFullYear()}`;
    return date;
};
