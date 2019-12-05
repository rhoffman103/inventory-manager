export const getGroupedKeys = (keys) => {
    let groupedKeysArray = [];
    let idArr = [];

    keys.forEach((key, index) => {
        if ((index + 1) % 10 !== 0) {
            idArr.push(key);
        }
        else  {
            idArr.push(key);
            groupedKeysArray.push(idArr);
            idArr = [];
        }
    });

    groupedKeysArray.push(idArr);

    return groupedKeysArray;
};