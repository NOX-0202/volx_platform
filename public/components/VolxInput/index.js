import React from 'react';

// import { Container } from './styles';

function VolxInput({ label, id, ...props }) {
    return <div className="form-floating flex-fill">
        <input className="form-control input-volx" id={id}  {...props} />
        <label htmlFor={id} className={'text-volx'}>{label}</label>
    </div>;
}

export default VolxInput;