import React from 'react';
import { Tooltip } from 'react-tooltip';
import 'react-tooltip/dist/react-tooltip.css'; // Import CSS từ đường dẫn chính

const Field = (props) => {
    const {field, col} = props
    let tooltip = null
    if(field.tooltip) {
        const i1 = require(`../picture/${field.img}`)
        tooltip = <Tooltip anchorSelect={`#${field.id}`} place="top" effect="solid">
        {<img src={i1} alt='img' width={'300px'}/>} 
        </Tooltip>
    } 

    return (
        <div className={col}>
        <h3 className='label fs-5' id = {field.id}>
            {field.name}    
        </h3>
        {tooltip}
        <input id={`${field.id}`} placeholder={field.placeholder} type="text" required={field.require} />
        </div>
    );
};

export default Field;
