import Header from '@/root/components/ui/Header';
import api from '@/root/src/libs/api';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';

// import { Container } from './styles';

function usuarios() {
    const router = useRouter()
    const [id_url, setIdUrl] = useState();
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState({});


    const getUser = async () => { }

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (user.password_new == user.password_confirmation) {
            user.password = user.password_confirmation;

        }

        if (user.password_new) delete user.password_new;
        if (user.password_confirmation) delete user.password_confirmation;
        if (user.password_old) delete user.password_old;
        let users_req = null;
        if (user.uuid) {
            users_req = await api.put(`/users?uuid=${user.uuid}`, user);
        } else {
            users_req = await api.post('/users', user);
        }
        if (users_req.data.success) router.push('/dashboard/usuarios/');
        console.log(users_req);
    }

    const handleInput = (e) => {
        const { name, value } = e.target;

        if (name === "active") { if (!user.active) { value = true } else value = !navigation.active; }

        setUser({ ...user, [name]: value });
    }



    useEffect(() => {
        (async () => {
            setLoading(true);
            if (router.query.user_uuid) {
                const get_users = await api.get(`/users?uuid=${router.query.user_uuid}`)
                if (get_users.data.success && get_users.data.rows == 1) {
                    setIdUrl(router.query.user_uuid);
                    setUser(get_users.data.data[0]);
                    setLoading(false);
                }
                setLoading(false);
            }
        })()
    }, [router.query]);



    return <main>
        <Header />
        {loading ? <div className="text-center my-4"><div className="spinner-border text-primary text-center" role="status" /> </div> : <>
            <div className="container">
                <div className="d-flex align-items-center my-4 gap-3 ">
                    <a href='/dashboard/usuarios' >
                        <button className="btn btn-secondary"><i className='fal fa-arrow-left' /></button>
                    </a>
                    <h1>{!id_url ? "Adicionar" : "Atualizar"} Usuário</h1>
                </div>
                <form className="row g-3" onSubmit={handleSubmit}>
                    <div className="col-md-6">
                        <div className="form-floating">
                            <input type="text" className='form-control' name='name' id='name' value={user.name ?? ""} onChange={handleInput} placeholder="name" />
                            <label htmlFor="name">Nome</label>
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="form-floating">
                            <input type="text" className='form-control' name='username' id='username' value={user.username ?? ""} onChange={handleInput} placeholder="username" />
                            <label htmlFor="username">Username</label>
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="form-floating">
                            <input type="text" className='form-control' name='nickname' id='nickname' value={user.nickname ?? ""} onChange={handleInput} placeholder="nickname" />
                            <label htmlFor="nickname">apelido</label>
                        </div>
                    </div>
                    <div className="col-12">
                        <div className="d-flex gap-1 align-items-center">
                            <input type="checkbox" id="active" name="active" checked={user.active ?? false} onChange={handleInput} />
                            <label htmlFor="active">Ativo</label>
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="form-floating">
                            <input type="text" className='form-control' name='email' id='email' value={user.email ?? ""} onChange={handleInput} placeholder="email" />
                            <label htmlFor="email">Email</label>
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="form-floating">
                            <input type="text" className='form-control' name='phone' id='phone' value={user.phone ?? ""} onChange={handleInput} placeholder="phone" />
                            <label htmlFor="phone">Celular</label>
                        </div>
                    </div>
                    {user.password && <div className="col-md-6">
                        <div className="form-floating">
                            <input type="password" className='form-control' name='password_old' id='password_old' value={user.password_old ?? ""} onChange={handleInput} placeholder="password_old" />
                            <label htmlFor="password_old">Senha antiga</label>
                        </div>
                    </div>}
                    <div className="col-md-6">
                        <div className="form-floating">
                            <input type="text" className='form-control' name='password_new' id='password_new' value={user.password_new ?? ""} onChange={handleInput} placeholder="password_new" />
                            <label htmlFor="password_new">Senha</label>
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="form-floating">
                            <input type="text" className='form-control' name='password_confirmation' id='password_confirmation' value={user.password_confirmation ?? ""} onChange={handleInput} placeholder="password_confirmation" />
                            <label htmlFor="password_confirmation">Confirmar Senha</label>
                        </div>
                    </div>
                    <div className="col-12">
                        <div className="d-flex justify-content-end">
                            <button className="btn btn-success">Salvar</button>
                        </div>
                    </div>
                </form>
            </div>
        </>}
    </main >;
}

export default usuarios;