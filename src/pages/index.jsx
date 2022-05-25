import React from 'react';

function pages() {

    const features = [];
    features.push('Apostas automáticas')
    features.push('Padrões personalizados')
    features.push('Martingale')
    features.push('Materiais técnicos')
    features.push('Mentorias')
    features.push('Promoções')



    return <main>
        <header className='main_header'>
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
                        <a href="/auth/login" className='text-decoration-none fw-bold signin-link' style={{ fontSize: 13 }}>Entrar</a>
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
                        <a href="/auth/login" className='text-white text-decoration-none fw-bold signin-link'>Entrar</a>
                    </div>

                    <a href='/auth/registrar' className='btn text-white fw-bold' style={{ border: "2px solid #4249db", fontSize: 13 }}>CADASTRAR</a>
                </div>
            </nav>
        </header>
        <section className='main_section d-flex flex-column justify-content-center align-items-center'>
            <div className="d-flex flex-column justify-content-center align-items-center" style={{ height: "70vh" }}>
                <h1 className='text-white text-center  fw-bolder'>Seja bem-vindo a VOLX</h1>
                <p className='text-white text-center'>A plataforma que facilita a vida nas apostas</p>
            </div>
            <div style={{ border: "1px solid #4249db", padding: 10 }} className="image-top rounded">
                <img src="/assets/dash.png" className='img-fluid' />
            </div>
        </section>


        <a name="bot_double" />
        <section className="bg-gray py-5">
            <h1 className='h3 text-volx text-center p-4'>Bot Double</h1>
            <div className="container">
                <div className="row my-4 g-3">
                    <div className="col-md-6 d-flex flex-column justify-content-center">
                        <p className='text-white'>O Blaze double é uma roleta que fica 24/7 rodando e você pode apostar em 3 cores: branco, vermelho e branco que você pode ganhar até 14 vezes oque você apostou!</p>
                        <p className='text-white'>A volx te ajuda a tomar melhores decisões nas suas apostas com mais acertividade e facilidade pois nós temos todas as ferramentas necessárias como canal de apostas e bots automáticos!</p>
                        <a href='/auth/registrar' className='text-decoration-none'>
                            <button className='btn-volx d-flex flex-row gap-3 text-uppercase'>
                                Tenha acesso a tudo isso
                                <div>
                                    <i className="pl-4 fal fa-arrow-right"></i>
                                </div>
                            </button>
                        </a>
                    </div>
                    <div className="col-md-6 d-flex flex-row align-items-center justify-content-center">
                        <div className="p-2 rounded" style={{ border: "1px solid #4249db", width: "490px" }}>
                            <img src="/assets/blaze_double_panel.png" className='img-fluid' />
                        </div>
                    </div>
                </div>
            </div>
        </section>
        <a name="bot_crash" />
        <section className="bg-volx py-5">
            <h1 className='h3 text-volx text-center p-4'>Bot Crash</h1>
            <div className="container">
                <div className="row my-4 g-3">
                    <div className="col-md-6 d-flex flex-row align-items-center justify-content-center">
                        <div className="p-2 rounded" style={{ border: "1px solid #4249db", width: "520px" }}>
                            <img src="/assets/blaze_crash_panel.png" className='img-fluid' />
                        </div>
                    </div>
                    <div className="col-md-6 d-flex flex-column justify-content-center">
                        <p className='text-white'>O Blaze crash é um Gráfico que vai subindo sem parar mas a qualquer momento ele pode quebrar e todas as apostas que não foram retiradas antes de quebrar vão ser perdidas!</p>
                        <p className='text-white'>A volx te ajuda a tomar melhores decisões nas suas apostas com mais acertividade e facilidade pois nós temos todas as ferramentas necessárias como canal de apostas e bots automáticos!</p>
                        <a href='/auth/registrar' className='text-decoration-none'>
                            <button className='btn-volx d-flex flex-row gap-3 text-uppercase'>
                                Tenha acesso a tudo isso
                                <div>
                                    <i className="pl-4 fal fa-arrow-right"></i>
                                </div>
                            </button>
                        </a>
                    </div>
                </div>
            </div>
        </section>
        <a name='about' />
        <section className="bg-gray py-5">
            <h1 className='h3 text-volx text-center p-4'>Sobre a Volx</h1>
            <div className="container">
                <p className='text-white text-center mx-5'>
                    A Volx é uma plataforma que ajuda apostadores online e tem como objetivo facilitar a vida dos jogadores e ajudar a ganhar dinheiro com menos risco e com rapidez.
                </p>
            </div>
        </section>
        <section className="bg-volx pb-4">
            <h1 className='text-volx text-center h3 py-4'>Algumas das nossas funcionalidades!</h1>
            <div className="container d-flex flex-row flex-wrap justify-content-center align-items-center gap-3">
                {features.map((feature, index) => {
                    return <article className=" bg-gray d-flex flex-row justify-content-center align-items-center rounded" key={index} style={{ width: "270px", height: "50px" }}>
                        <h1 className='text-muted h6'>{feature}</h1>
                    </article>
                })}
            </div>
        </section>
        <footer className='bg-gray p-3'>
            <div className="container">
                <div className="d-flex flex-row justify-content-center align-items-center gap-4">
                    <a href="https://www.facebook.com/volxinvest/" target="_blank" rel="noopener noreferrer">
                        <i className="fab fa-facebook-f fa-2x" style={{ color: "#4249db", height: "70px" }}></i>
                    </a>
                    <a href="https://www.instagram.com/volxinvest/" target="_blank" rel="noopener noreferrer">
                        <i className="fab fa-instagram fa-2x" style={{ color: "#4249db", height: "70px" }}></i>
                    </a>
                    <a href="https://twitter.com/volxinvest" target="_blank" rel="noopener noreferrer">
                        <i className="fab fa-twitter fa-2x" style={{ color: "#4249db", height: "70px" }}></i>
                    </a>
                    <a href="https://www.youtube.com/channel/UC-lHJZR3Gqxm24_Vd_AJ5Yw" target="_blank" rel="noopener noreferrer">
                        <i className="fab fa-youtube fa-2x" style={{ color: "#4249db", height: "70px" }}></i>
                    </a>
                </div>
                <div className="d-flex flex-row justify-content-center align-items-center gap-4">
                    <a className='text-white fw-bold text-decoration-none'>Termos de uso</a>
                    <a className='text-white fw-bold text-decoration-none'>Política de privacidade</a>
                    <a className='text-white fw-bold text-decoration-none'>Ajuda</a>
                </div>
                <hr className='text-white' />
                <div className='text-white fw-bold text-center'>
                    <p className="text-muted">© 2020 Volxinvest. Todos os direitos reservados.</p>
                </div>
            </div>
        </footer>
        <div class="modal fade " id="ContactModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog ">
                <div class="modal-content bg-volx">
                    <div class="modal-header">
                        <h5 class="modal-title text-volx" id="exampleModalLabel">Contato</h5>
                        <spam type="button" class="text-volx" data-bs-dismiss="modal" aria-label="Close">X</spam>
                    </div>
                    <div class="modal-body">
                        <p className='text-center text-white fw-bolder'>Precisa de ajuda contacte-nos pelo whatsapp</p>
                        <div className='d-flex flex-column justify-content-center align-items-center gap-2'>
                            <a href="https://api.whatsapp.com/send?phone=5511998888888&text=Ol%C3%A1%2C%20gostaria%20de%20saber%20mais%20sobre%20o%20Blaze%20Crash%20e%20a%20Volxinvest%20!" target="_blank" rel="noopener noreferrer" className='text-decoration-none'>
                                <i className="fab fa-whatsapp fa-2x" style={{ color: "#4249db", height: "70px" }}></i>
                                <span className='text-white fw-bolder ml-4'>+55 (21) 9 9789-5329</span>
                            </a>
                            <button type="button" class="btn btn-volx" data-bs-dismiss="modal">Fechar</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>


    </main >;
}

export default pages;