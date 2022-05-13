import localforage from 'localforage';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import Spinner from '../../components/Pageloading';

// import { Container } from './styles';

function me() {
    const router = useRouter();
    const [loading, toggleLoading] = useState(true);
    const [user, setUser] = useState({});

    const logout = async () => {
        await localforage.removeItem('user');
        router.push('/');
    }

    useEffect(() => {
        console.log('me');
        localforage.getItem('user').then(user => {
            toggleLoading(true);
            if (user) {
                setUser(user[0]);
            } else {
                router.push('/');
            }
            toggleLoading(false);
        });
    }, []);

    const menu = [];
    menu.push({ name: 'Padrões', link: '/me/patterns' });
    menu.push({ name: 'Bot Double', link: '/me/bots/double' });

    return loading ? <Spinner className="text-primary" /> : <main>
        <div className="container my-4">
            <div className="d-flex flex-row justify-content-between align-items-center">
                <h1>Eae, {user.name ?? ""}</h1>
                <button className="btn btn-danger" onClick={() => logout()}>Sair</button>
            </div>
            <hr />
            <div className="d-flex flex-row gap-3">
                {
                    menu.map(item => {
                        return <div className="d-flex flex-row gap-2" key={item.name}>
                            <a href={item.link} className="btn btn-primary">{item.name}</a>
                        </div>
                    })
                }
            </div>

        </div>
    </main>;
}

export default me;