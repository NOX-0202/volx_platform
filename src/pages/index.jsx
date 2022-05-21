import React from 'react';

function pages() {
    return <main>
        <header className='main_header'>
            <div className="container d-flex flex-row justify-content-between align-items-baseline">
                <div className="left m-0">
                    <img src="/assets/logo.svg" alt="Volx Logo" width={75} />
                </div>

                <div className="middle desktop-nav">
                    <ul className='navbar-nav text-secondary d-flex flex-row align-items-stretch'>
                        <li className="navbar-item-custom">Home</li>
                        <li className='navbar-item-custom'>
                            <spam className="dropdown-toggle" data-bs-toggle="dropdown" id="dropdownMenuLink"  >Produtos</spam>
                            <ul className="dropdown-menu  drop-desktop mt-4 p-2 border-white w-100" aria-labelledby="dropdownMenuLink">
                                <div className="d-flex flex-row justify-content-around">
                                    <li>
                                        <a className="dropdown-item-custom text-decoration-none" href="#">
                                            <img src="/assets/blaze_icons/double.svg" width={50} />
                                            <p className='mt-3 text-muted'>BOT Double</p>
                                        </a>
                                    </li>
                                    <li>
                                        <a className="dropdown-item-custom text-decoration-none" href="#">
                                            <img src="/assets/blaze_icons/crash.svg" width={50} />
                                            <p className='mt-3 text-muted'>BOT Crash</p>
                                        </a>
                                    </li>
                                </div>
                            </ul>
                        </li>
                        <li className='navbar-item-custom'>Sobre</li>
                        <li className='navbar-item-custom'>Contato</li>
                    </ul>
                </div>
                <div className="d-flex flex-row align-items-center ">
                    <div className="sign-in mx-4 desktop-nav">
                        <i className='fal fa-user mx-2' style={{ color: "#4249db" }}></i>
                        <a href="/auth/login" className='text-decoration-none fw-bold signin-link' style={{ fontSize: 13 }}>Entrar</a>
                    </div>
                    <a href='/auth/registrar' className='btn text-white desktop-nav fw-bold signup-btn' style={{ border: "2px solid #4249db", fontSize: 13 }}>CADASTRAR</a>
                </div>
                <div className="menu-toogle">
                    <i className="fa-light fa-bars fa-2xl " style={{ color: "#4249db" }} data-bs-toggle="collapse" data-bs-target="#collapseExample" aria-expanded="false" aria-controls="collapseExample"></i>
                </div>
            </div>
            <div className="mobile-nav container collapse" id="collapseExample">
                <ul className='navbar-nav text-secondary d-flex flex-column gap-3 m-2'>
                    <li>Home</li>
                    <li>
                        <spam className="dropdown-toggle" data-bs-toggle="dropdown" id="dropdownMenuLink"  >Produtos</spam>
                        <ul className="dropdown-menu main_header mt-4 p-2 border-white w-100" aria-labelledby="dropdownMenuLink">
                            <li>
                                <a className="dropdown-item-custom text-decoration-none" href="#">
                                    <img src="/assets/blaze_icons/double.svg" width={50} />
                                    <p className='mt-3 text-muted'>BOT Double</p>
                                </a>
                            </li>
                            <li>
                                <a className="dropdown-item-custom text-decoration-none" href="#">
                                    <img src="/assets/blaze_icons/crash.svg" width={50} />
                                    <p className='mt-3 text-muted'>BOT Crash</p>
                                </a>
                            </li>
                        </ul>
                    </li>
                    <li>Sobre</li>
                    <li>Contato</li>
                </ul>
                <div className="d-flex flex-row align-items-center justify-content-between">
                    <div className="sign-in">
                        <i className='fal fa-user mx-2' style={{ color: "#4249db" }}></i>
                        <a href="/auth/login" className='text-white text-decoration-none fw-bold signin-link'>Entrar</a>
                    </div>

                    <a href='/auth/registrar' className='btn text-white fw-bold' style={{ border: "2px solid #4249db", fontSize: 13 }}>CADASTRAR</a>
                </div>
            </div>
        </header>
        <section className="main_content mt-5">

        </section>
    </main>;
}

export default pages;