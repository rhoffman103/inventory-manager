import { useContext } from 'react';
import appContext from '../context/appContext';

const useHandleComponents = () => {

    const { state, stateDispatch } = useContext(appContext);

    const getComponents = () => {
        const { components } = state.adminPage;
        const componentKeys = Object.keys(components)
        return componentKeys.forEach(compKey => components[compKey] = null);
    };

    const returnActionType = (page) => {
        switch(page) {
            case 'adminPage':
                return 'UPDATE_ADMIN_PAGE';
            case 'homePage':
                return 'UPDATE_HOME_PAGE';
            default:
                return 'NONE';
        };
    };

    const handleOneVisibleComponent = ({ page, component, mount, title }) => {
        
        const actionType = returnActionType(page);
        const newComponentState = getComponents();
        
        if (!mount) mount = true;

        stateDispatch({
            type: actionType,
            stateUpdate: {
                [page]: {
                    ...state[page],
                    title,
                    components: {
                        ...newComponentState,
                        [component]: mount
                    }
                }
            }
        });
    };

    const handleComponents = ({ page, component, mount}) => {
       
        const actionType = returnActionType(page);

        stateDispatch({
            type: actionType,
            stateUpdate: {
                [page]: {
                    ...state[page],
                    components: {
                        ...state[page].components,
                        [component]: mount
                    }
                }
            }
        });
    };

    const unmountAll = (page) => {

        const actionType = returnActionType(page);

        stateDispatch({
            type: actionType,
            stateUpdate: {
                [page]: {
                    ...state[page],
                    components: {}
                }
            }
        });
    }

    return { handleOneVisibleComponent, handleComponents, unmountAll };

};

export default useHandleComponents;