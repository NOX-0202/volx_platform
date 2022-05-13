import localforage from 'localforage';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';

// import { Container } from './styles';

function me() {
    const router = useRouter();
    const [user, setUser] = useState({});



    useEffect(() => {
        console.log('me');
        localforage.getItem('user').then(user => {
            if (user) {
                setUser(user[0]);
            } else {
                router.push('/');
            }
        });
    }, []);

    return <div />;
}

export default me;