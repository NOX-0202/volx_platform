import React, { useState } from 'react';
import Spinner from '../../components/Pageloading';

// import { Container } from './styles';

function auth() {
    const [loading, toggleLoading] = useState(false);
    const [user, setUser] = useState({});
    const [error_message, setErrorMessage] = useState('')

    const handleInput = (e) => {
        setUser({
            ...user,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        toggleLoading(true)
        console.log(user)
        api.post('/users/auth', user).then(async res => {
            console.log(res)
            if (res.data.success && res.data.data.length < 1) {
                setErrorMessage('Login ou senha incorretos')
                return;
            }

            setErrorMessage('')
            await localforage.setItem('user', res.data.data)
            router.push('/me')

        }).catch(err => {
            console.log(err)
        }).finally(() => {
            toggleLoading(false)
        })
    }
    return (
        <main className="bg-volx">
            <a href="/" className="text-volx fw-bold m-3 text-decoration-none"><i class="fa-light fa-arrow-left"></i> Voltar</a>
            <div className="h-100 container d-flex justify-content-center align-items-center">
                <div className="row">
                    <div className="col">
                        <div className="d-block mb-4">
                            <img src="/assets/logo.svg" alt="" />
                        </div>
                        <h1 className="text-white fw-bold">Faça o cadastro na plataforma</h1>
                    </div>
                    <div className="col">
                        <form onSubmit={handleSubmit} className="d-flex flex-column gap-2 w-100 login-box">
                            <input type="text" placeholder="email" name="email" className="form-control-lg" value={user.email ?? ""} onChange={handleInput} />
                            <input type="text" placeholder="username" name="username" className="form-control-lg" value={user.username ?? ""} onChange={handleInput} />
                            <input type="password" placeholder="Senha" name="password" className="form-control-lg" value={user.password ?? ""} onChange={handleInput} />
                            <input type="password" placeholder="Confirmar senha" name="password_confirm" className="form-control-lg" value={user.password_confirm ?? ""} onChange={handleInput} />
                            {error_message && <p className="alert alert-danger">{error_message}</p>}
                            <button className="btn btn-volx d-flex flex-row justify-content-center align-items-center gap-2" style={{ height: 45 }}>ENVIAR {loading && <Spinner className={"text-white fa-xs m-0 p-0"} />} </button>
                            <a href="/auth/login" className='text-decoration-none'>
                                <p className="text-center text-white fw-bold">Já tem uma conta? <span className="text-volx fw-bold">Faça o login</span></p>
                            </a>
                        </form>
                    </div>
                </div>
            </div>
        </main>
    )
}

export default auth;