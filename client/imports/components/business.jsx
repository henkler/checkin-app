import React from 'react';

export const Business = (props) => (
    <div className="row">
        <div className="col-xs-4"><img src={props.image_url} /></div>
        <div className="col-xs-8"><p>{props.name}</p></div>
    </div>
);
