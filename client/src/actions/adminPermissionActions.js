export const clickedGivePermission = ({ enteredName = '', correctName }) => {

    if (enteredName.toLowerCase() === correctName.toLowerCase()) {
        return {
            type: 'GIVE_ADMIN_PERMISSION',
            admin: true
        };
    }

    else {
        return {
            type: 'INCORRECT_EMPLOYEE_NAME',
            message: 'Entered Incorrect Name'
        };
    }
};