import React, { useContext } from 'react';
import appContext from '../../../../context/appContext';
import useModal from '../../../../hooks/useModal';
import { selectProduct } from '../../../../actions/newProductActions';
import ModalContainer from '../../../common/Modals/ModalContainer';
import LayerList from './LayerList';
import Footer from './Footer';

const FormulaModal = () => {
    const { state, stateDispatch } = useContext(appContext);
    const { productQuickview, productsList } = state;
    const { closeModal } = useModal();

    const selectAndClose = () => {
        selectProduct(productQuickview.id, productsList, stateDispatch);
        closeModal('quickviewModal');
    };

    return (
        <ModalContainer
            title='Product Details'
            backdrop='static'
            centered
            size="lg"
            Footer={<Footer
                select={selectAndClose}
                close={() => closeModal('quickviewModal')}
                isSelected={productQuickview.isSelected}
            />}
        >
            <div>
                <p>
                    <span className='font-weight-bold'>Description: </span>
                    {productQuickview.description}
                </p>
                <p>
                    <span className='font-weight-bold'>ID: </span>
                    {productQuickview.id}
                </p>
                <h5>A-Layer: {productQuickview.layerA.percentage}%</h5>
                <LayerList
                    layer={productQuickview.layerA}
                    layerName='A'
                />
                <h5>B-Layer: {productQuickview.layerB.percentage}%</h5>
                <LayerList
                    layer={productQuickview.layerB}
                    layerName='B'
                />
                <h5>C-Layer: {productQuickview.layerC.percentage}%</h5>
                <LayerList
                    layer={productQuickview.layerC}
                    layerName='C'
                />
            </div>
        </ModalContainer>
    );
};

export default FormulaModal;