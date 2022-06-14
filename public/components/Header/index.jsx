import localforage from 'localforage';
import React, { useEffect, useState } from 'react';

// import { Container } from './styles';

function Header() {
    const [user, setUser] = useState(null);

    useEffect(() => {
        localforage.getItem('user').then(user => {
            if (user) {
                console.log(user)
                setUser(user[0]);
            }
        });
    }, []);

    useEffect(() => {
        if (user) {
            console.log(user);
        }
    }, [user]);

    return <header className='main_header'>
        <div className="container d-flex flex-row justify-content-between align-items-baseline">
            <div className="left m-0">
                <img src="/assets/logo.svg" alt="Volx Logo" width={75} />
            </div>

            <nav className="middle desktop-nav">
                <ul className='navbar-nav text-secondary d-flex flex-row align-items-stretch'>
                    <li className="navbar-item-custom">Home</li>
                    <li className='navbar-item-custom'>
                        <spam className="dropdown-toggle" data-bs-toggle="dropdown" id="dropdownMenuLink"  >Produtos</spam>
                        <ul className="dropdown-menu  drop-desktop mt-4 p-2 border-white w-100" aria-labelledby="dropdownMenuLink">
                            <div className="d-flex flex-row justify-content-around">
                                <li>
                                    <a className="dropdown-item-custom text-decoration-none" href="#bot_double">
                                        <img src="/assets/blaze_icons/double.svg" width={50} />
                                        <p className='mt-3 text-muted'>BOT Double</p>
                                    </a>
                                </li>
                                <a className="dropdown-item-custom text-decoration-none" href="#bot_crash">
                                    <li>
                                        <img src="/assets/blaze_icons/crash.svg" width={50} />
                                        <p className='mt-3 text-muted'>BOT Crash</p>
                                    </li>
                                </a>
                            </div>
                        </ul>
                    </li>
                    <a href='#about' className='text-decoration-none' style={{ color: "rgb(108,117,125)" }}>
                        <li className='navbar-item-custom'>
                            Sobre
                        </li>
                    </a>
                    <li className='navbar-item-custom' data-bs-toggle="modal" data-bs-target="#ContactModal">Contato</li>
                </ul>
            </nav>
            <div className="d-flex flex-row align-items-center ">
                <div className="sign-in mx-4 desktop-nav">
                    <i className='fal fa-user mx-2' style={{ color: "#4249db" }}></i>
                    {user ?
                        <a href="/me" className='text-decoration-none fw-bold signin-link' style={{ fontSize: 13 }}>Dash</a>
                        :
                        <a href="/auth/login" className='text-decoration-none fw-bold signin-link' style={{ fontSize: 13 }}>Entrar</a>}
                </div>
                <a href='/auth/registrar' className='btn text-white desktop-nav fw-bold signup-btn' style={{ border: "2px solid #4249db", fontSize: 13 }}>CADASTRAR</a>
            </div>
            <div className="menu-toogle">
                <i className="fa-light fa-bars fa-2xl " style={{ color: "#4249db" }} data-bs-toggle="collapse" data-bs-target="#collapseExample" aria-expanded="false" aria-controls="collapseExample"></i>
            </div>
        </div>
        <nav className="mobile-nav container collapse" id="collapseExample">
            <ul className='navbar-nav text-secondary d-flex flex-column gap-3 m-2'>
                <li>Home</li>
                <li>
                    <spam className="dropdown-toggle" data-bs-toggle="dropdown" id="dropdownMenuLink">Produtos</spam>
                    <ul className="dropdown-menu main_header mt-4 p-2 border-white w-100" aria-labelledby="dropdownMenuLink">
                        <li>
                            <a className="dropdown-item-custom text-decoration-none" href="#bot_double">
                                <img src="/assets/blaze_icons/double.svg" width={50} />
                                <p className='mt-3 text-muted'>BOT Double</p>
                            </a>
                        </li>
                        <li>
                            <a className="dropdown-item-custom text-decoration-none" href="#bot_crash">
                                <img src="/assets/blaze_icons/crash.svg" width={50} />
                                <p className='mt-3 text-muted'>BOT Crash</p>
                            </a>
                        </li>
                    </ul>
                </li>
                <a href='#about' className='text-decoration-none' style={{ color: "rgb(108,117,125)" }}>
                    <li>
                        Sobre
                    </li>
                </a>
                <li>Contato</li>
            </ul>
            <div className="d-flex flex-row align-items-center justify-content-between">
                <div className="sign-in">
                    <i className='fal fa-user mx-2' style={{ color: "#4249db" }}></i>
                    {user ?
                        <a href="/me" className='text-decoration-none fw-bold signin-link' style={{ fontSize: 13 }}>Dash</a>
                        :
                        <a href="/auth/login" className='text-decoration-none fw-bold signin-link' style={{ fontSize: 13 }}>Entrar</a>}
                    {/* <a href="/auth/login" className='text-white text-decoration-none fw-bold signin-link'>Entrar</a> */}
                </div>

                <a href='/auth/registrar' className='btn text-white fw-bold' style={{ border: "2px solid #4249db", fontSize: 13 }}>CADASTRAR</a>
            </div>
        </nav>
    </header>;
}

export default Header;