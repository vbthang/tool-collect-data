import React from 'react';
import { Tooltip } from 'react-tooltip';
import 'react-tooltip/dist/react-tooltip.css'; // Import CSS từ đường dẫn chính

const Field = (props) => {
    const tooltip = props.tooltip === true ? <Tooltip anchorSelect={`#${props.id}`} place="top" effect="solid">
    {<img src="./picture/2.png" alt={'vòng ngực'} />} 
    </Tooltip> : null;

    return (
        
        <div className={props.col}>
        <h3 className='label fs-5' id = {props.id}>
            {props.name}    
        </h3>
        {tooltip}
        <input id={`${props.id}`} placeholder={props.placeholder} type="text" required={props.require} />
        </div>
    );
};

export default Field;
