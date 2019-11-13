import { rollLength, rollWeight, needsRework } from '../constants/pxConstants';

export const collectProductionForm = (values, rollSet) => {
    let greatestLength = 0;
    let productionMinutes = 0;
    const lineSpeed = parseInt(values.lineSpeed);
    let rolls = [];
    
    rollSet.forEach((position) => {
        const length = parseInt(values[`${position}_${rollLength}`]);
        if (length >  0) {
            if (length > greatestLength) {
                greatestLength = length;
                productionMinutes = Math.ceil(length / lineSpeed);
            }
            rolls.push({
                position,
                length,
                tagId: 'something',
                weight: values[`${position}_${rollWeight}`],
                needsRework: values[`${position}_${needsRework}`]
            });
        }
    });

    return {
        lineSpeed,
        productionMinutes,
        rolls
    }
};