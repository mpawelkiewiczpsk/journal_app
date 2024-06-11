import React, {useEffect, useState} from 'react';
import {Button, Card, Space} from 'antd';
import {getProtectedInfo, getUserInfo} from '../../api';

const cards = [
    {
        id: 0,
        title: 'Pakiet XS',
        content: 'To jest pakiet xs'
    },
    {
        id: 1,
        title: 'Pakiet M',
        content: 'To jest pakiet m'
    },
    {
        id: 2,
        title: 'Pakiet L',
        content: 'To jest pakiet l'
    }
]

const Home: React.FC = () => {

    const [data, setData] = useState('');
    const [data2, setData2] = useState('');
    const [list, setList] = useState(cards);

    const getDataFromServer = () => {
        getProtectedInfo().then(data => {
            setData(data?.message ? data?.message : data)

        })

        getUserInfo().then(data => {
            setData2(data?.message ? data?.message : data)

        })
    }

    useEffect(() => {
        getDataFromServer();
    }, []);

    const removeItem = (id: number) => {
        setList(list.filter(item => item.id !== id))
    }


    return (
        <>
            <p>{data}</p>
            <p>{data2}</p>
            <Space direction="vertical" size={16}>
                {list.map(card =>
                    <Card
                        key={card.id}
                        title={card.title}
                        extra={<Button data-testid={`button${card.id}`} onClick={() => removeItem(card.id)} type="primary" danger>X</Button>}
                        style={{ width: 300 }}>
                    {card.content}
                </Card>)}

            </Space>
        </>
    );
};

export default Home;
