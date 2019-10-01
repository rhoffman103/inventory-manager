export const collectForm = (values) => {
    const keys = Object.keys(values);

    const filterBy = (keysArray, layer, specifier) => {
        return keysArray.filter(key => {
            if (key.includes(`layer${layer}material`) && key.includes(specifier))
                return key;
        });
    };

    const returnLayerObj = (layer) => {
        const materialKeys = filterBy(keys, layer, `Name`);
        const percentageKeys = filterBy(keys, layer, `Percentage`);
    
        const materials = materialKeys.map((material, index) => {
            return {
                name: values[material],
                percent: values[percentageKeys[index]]
            }
        })
    
        return {
            percentage: values.layerAPercent,
            materials: materials
        }
    };

    return {
        layerA: returnLayerObj('A'),
        layerB: returnLayerObj('B'),
        layerC: returnLayerObj('C'),
        description: values.productDescription,
        id: values.productId,
        specs: {
            color: values.color,
            gauge: values.gauge,
            width: values.width
        },
        type: values.webType
    };
};

export const selectProduct = (id, productsList, dispatch) => {
    let isSelected = false;
    let products = productsList.map(product => {
        if ((product.id === id) && product.isSelected) {
            product.isSelected = false;
            isSelected = false;
        }
        else if (product.id === id) {
            product.isSelected = true;
            isSelected = true;
        }
        else product.isSelected = false;
        return product;
    });

    dispatch({
        type: 'SET_PRODUCTS_LIST',
        products,
        isSelected
    });
};