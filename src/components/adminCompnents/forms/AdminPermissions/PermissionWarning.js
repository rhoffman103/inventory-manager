import React from 'react'

const PermissionWarning = () => (
    <div className="alert alert-warning" role="alert">
        <p className='text-dark mb-0'>This will give the employee permission to add and edit...</p>
        <ul className='text-dark mb-0'>
            <li>other employees permissions</li>
            <li>job jackets</li>
            <li>schedules</li>
        </ul>
    </div>
);

export default PermissionWarning;