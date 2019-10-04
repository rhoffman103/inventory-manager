import database from '../config/firebaseConfig';

const dbProducts = {
    addNewProduct: (product) => {
        return database.collection('products').where('id', '==', product.id).get()
        .then(querySnapshot => {
            let idExists = false;
                querySnapshot.forEach(doc => {
                    if (doc.exists) {
                        idExists = true;
                        return false;
                    }
                })
                if (idExists) {
                    return Promise.reject({
                        code: 'Product ID exists',
                        message: `Product ID: ${product.id} already exists!`
                    });
                }
                else return Promise.resolve();
        })
        .then(() => database.collection('products').add(product))    
    },

    getProductsByType: (productType) => {
        return database.collection('products').where('type', '==', productType).get()
        .then(querySnapshot => {
            let products = []
            querySnapshot.forEach(doc => {
                products.push({
                    ...doc.data(),
                    key: doc.id
                })
            });
            return Promise.resolve(products);
        })
    },

    getProductByKey: (key) => {
        return database.collection('products').doc(key).get()
        .then(doc => Promise.resolve(doc.data()))
        .catch(err => Promise.reject(err));
    },

    getAllProductsByKey: (keys) => {
        return Promise.all([].concat(keys)
            .map(key => database.collection('products').doc(key).get())
        );
    }
};

export default dbProducts;