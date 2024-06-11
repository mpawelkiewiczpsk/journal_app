import React, {useEffect, useState} from 'react';
import {getProtectedInfo} from '../../api';

const PriceList: React.FC = () => {

    const [data, setData] = useState('');


    const getDataFromServer = () => {
        getProtectedInfo().then(data => {
            setData(data?.message ? data?.message : data)

        })
    }

    useEffect(() => {
        getDataFromServer();
    }, []);


    return (
        <>
            <p>{data}</p>
        </>
    );

};

export default PriceList

