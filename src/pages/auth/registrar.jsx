import localforage from 'localforage';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import Spinner from '../../components/Pageloading';
import api from '../../libs/api';

// import { Container } from './styles';

function auth() {
    const router = useRouter();
    const [loading, toggleLoading] = useState(false);
    const [user, setUser] = useState({});
    const [error_message, setErrorMessage] = useState('')

    const handleInput = (e) => {

        const { name, value } = e.target;
        setUser({
            ...user,
            [name]: value
        })
        console.log(user)
        if (name == 'password' || name == 'password_confirm') {
            if (value.length < 6) { setErrorMessage('A senha deve ter no mínimo 6 caracteres'); return; }
            setErrorMessage('')
        }


    }

    const handleSubmit = (e) => {
        e.preventDefault()
        toggleLoading(true)
        console.log(user)
        if (user.password != user.password_confirm) { setErrorMessage('As senhas não conferem'); toggleLoading(false); return; }
        delete user.password_confirm
        api.post('/users/auth/register', user).then(async res => {
            console.log(res)
            if (!res.data.success) {
                setErrorMessage('Erro no cadastro')
                return;
            }

            setErrorMessage('')
            delete res.data.success
            await localforage.setItem('user', [res.data])
            router.push('/me')

        }).catch(err => {
            setErrorMessage('Não foi possível realizar o cadastro, tente novamente mais tarde')
        }).finally(() => {
            toggleLoading(false)
        })
    }
    return (
        <main className="bg-volx">
            <a href="/" className="text-volx fw-bold m-3 text-decoration-none"><i className="fa-light fa-arrow-left"></i> Voltar</a>
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
                            <input type="text" placeholder="Nome completo" name="name" className="form-control-lg" value={user.name ?? ""} onChange={handleInput} />
                            <input type="text" placeholder="username" name="username" className="form-control-lg" value={user.username ?? ""} onChange={handleInput} />
                            <input type="password" placeholder="Senha" name="password" className="form-control-lg" value={user.password ?? ""} onChange={handleInput} />
                            <input type="password" placeholder="Confirmar senha" name="password_confirm" className="form-control-lg" value={user.password_confirm ?? ""} onChange={handleInput} />
                            {error_message != '' && <p className="alert alert-danger">{error_message}</p>}
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