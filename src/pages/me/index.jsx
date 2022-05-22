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

    const blaze_menu = [];
    blaze_menu.push({ name: 'Padrões', icon: "/assets/blaze_icons/double.svg", link: '/me/bots/blaze/double/patterns' });
    blaze_menu.push({ name: 'Bot Double', icon: "/assets/blaze_icons/double.svg", link: '/me/bots/blaze/double' });
    blaze_menu.push({ name: 'Bot Crash', icon: "/assets/blaze_icons/crash.svg", link: '/me/bots/blaze/double' });

    return loading ? <Spinner className="text-primary" /> : <main>
        <div className="p-2" style={{ backgroundColor: "rgb(32, 32, 36)" }}>
            <div className="container d-flex flex-row justify-content-between align-items-center">
                <div className="d-flex flex-row align-items-center gap-3">
                    <i data-bs-toggle="offcanvas" data-bs-target="#offcanvasExample" className="fa-solid fa-bars fa-2xl text-white"></i>
                    <h3 className='mt-2 text-white'>Eae, {user.name ?? ""}</h3>
                </div>

                <button className='btn text-white fw-bold signup-btn' onClick={() => logout()} style={{ border: "2px solid #4249db", fontSize: 13 }}>Sair</button>

            </div>
        </div>

        <div className="bg-volx h-100 ">
            <div className="container d-flex flex-column my-4">
                <h3 className='text-white'>Pacote Blaze: </h3>
                <div className=" d-flex flex-row gap-3">
                    {
                        blaze_menu.map(item => {
                            return <div className="d-flex flex-column justify-content-center align-items-center gap-2 rounded" style={{ backgroundColor: "rgb(32, 32, 36)", height: 150, width: 250 }} key={item.name}>
                                <div>
                                    <img src={item.icon} height="60" />
                                </div>
                                <a href={item.link} className="text-volx">{item.name}</a>
                            </div>
                        })
                    }
                </div>
            </div>
        </div>


        <div className="offcanvas offcanvas-start bg-volx border-white" tabindex="-1" id="offcanvasExample" aria-labelledby="offcanvasExampleLabel">
            <div className="offcanvas-header">
                <img src="/assets/logo.svg" width={80} />
                <button type="button" className="btn text-volx h1" data-bs-dismiss="offcanvas" aria-label="Close">X</button>
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
    </main>;
}

export default me;