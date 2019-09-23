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

}