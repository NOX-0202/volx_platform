import localforage from 'localforage';
import { useRouter } from 'next/router';
import React from 'react';

// import { Container } from './styles';

function DashNav({ title }) {
    const router = useRouter();


    const logout = async () => {
        await localforage.removeItem('user');
        router.push('/');
    }

    return <div className="p-2" style={{ backgroundColor: "rgb(32, 32, 36)" }}>
        <div className="container d-flex flex-row justify-content-between align-items-center">
            <div className="d-flex flex-row align-items-center gap-3">
                <i data-bs-toggle="offcanvas" data-bs-target="#offcanvasExample" className="fa-solid fa-bars fa-2xl text-white"></i>
                <h3 className='mt-2 text-white'>{title}</h3>
            </div>

            <button className='btn text-white fw-bold signup-btn' onClick={() => logout()} style={{ border: "2px solid #4249db", fontSize: 13 }}>Sair</button>
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
    </div>;
}

export default DashNav;