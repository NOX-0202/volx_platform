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
    menu.push({ name: 'Padrões', link: '/me/bots/blaze/double/patterns' });
    menu.push({ name: 'Bot Double', link: '/me/bots/blaze/double' });

    return loading ? <Spinner className="text-primary" /> : <main>
        <div className="container my-4">
            <div className="offcanvas offcanvas-start" tabindex="-1" id="offcanvasExample" aria-labelledby="offcanvasExampleLabel">
                <div className="offcanvas-header">
                    <h5 className="offcanvas-title" id="offcanvasExampleLabel">Volx</h5>
                    <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                </div>
                <div className="offcanvas-body">
                    <ul>
                        <li>Blaze
                            <ul>
                                <li>double
                                    <ul>
                                        <li>aposta automatica</li>
                                        <li>Padrões</li>
                                        <li>Histórico</li>
                                    </ul>
                                </li>
                                <li>crash</li>
                            </ul>
                        </li>
                        <li>Bc-game
                            <ul>
                                <li>crash</li>
                            </ul>
                        </li>
                    </ul>
                </div>
            </div>
            <div className="d-flex flex-row justify-content-between align-items-center">
                <div className="d-flex flex-row align-items-center gap-3">
                    <i data-bs-toggle="offcanvas" data-bs-target="#offcanvasExample" className="fa-solid fa-bars fa-2xl"></i>
                    <h3 className='mt-2'>Eae, {user.name ?? ""}</h3>
                </div>
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