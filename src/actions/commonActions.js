export const openModal = (modal) => ({
    type: 'OPEN_MODAL',
    modal
});

export const modalSpinner = () => ({ type: 'MODAL_SPINNER' });

export const formRequestAction = ({ data, emptyCurrentForm = false, employee = {} }) => ({
    type: 'FORM_REQUEST_COMPLETE',
    emptyCurrentForm,
    employee,
    data
});