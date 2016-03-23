import React from 'react';
import { Business } from './business.jsx';

export const BusinessList = (props) => (
    <div>
        {props.businesses.map(business => <Business key={business.id} doCheckin={props.doCheckin} {...business} />)}
    </div>
);