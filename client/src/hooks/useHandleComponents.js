import { useContext } from 'react';
import appContext from '../context/appContext';

const useHandleComponents = () => {

    const { state, stateDispatch } = useContext(appContext);

    const resetComponents = () => {
        const { components } = state.currentPage;
        const componentKeys = Object.keys(components)
        return componentKeys.forEach(compKey => components[compKey] = null);
    };

    const handleOneVisibleComponent = ({ component, mount, title }) => {
        
        const newComponentState = resetComponents();
        
        if (!mount) mount = true;

        stateDispatch({
            type: 'HANDLE_COMPONENT',
            components: {
                ...state.currentPage.components,
                ...newComponentState,
                [component]: mount,
                title
            },
            currentPage: state.currentPage
        });
    };

    const handleComponents = ({ component, mount }) => {

        stateDispatch({
            type: 'HANDLE_COMPONENT',
            components: {
                ...state.currentPage.components,
                [component]: mount
            },
            currentPage: state.currentPage
        });
    };

    const unmountAll = (page = '') => {

        stateDispatch({
            type: 'UPDATE_PAGE',
            currentPage: {
                page,
                msg: null,
                components: {}
            }
        });
    }

    return { handleOneVisibleComponent, handleComponents, unmountAll };

};

export default useHandleComponents;