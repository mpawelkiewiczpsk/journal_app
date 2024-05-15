import React, {useEffect, useState} from 'react';
import { getProtectedInfo } from '../../api';

const Home: React.FC = () => {

    const [data, setData] = useState('Home')

    useEffect(() => {
        getProtectedInfo().then(data => {
            setData(data?.message ? data?.message : 'Home')

        })
    }, []);


    return (
        <p>{data}</p>
    );
};

export default Home;
