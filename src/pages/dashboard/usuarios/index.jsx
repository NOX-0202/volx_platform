import Header from '@/root/components/ui/Header';
import api from '@/root/src/libs/api';
import React, { useEffect, useState } from 'react';

// import { Container } from './styles';

function categorias() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);

    const getUsers = async () => {
        try {
            setLoading(true);
            const users_req = await api.get("/users");
            setUsers(users_req.data.data);
            setLoading(false);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getUsers();
    }, []);


    const deleteUser = async (uuid_user) => {
        try {
            console.log(uuid_user);
            if (confirm("Deseja realmente excluir este usuário?")) {
                const delete_req = await api.delete(`/users?uuid=${uuid_user}`);
                console.log(delete_req);
                if (delete_req.data.success) getUsers();
            }
        } catch (error) {
            console.log(error);
        }
    };



    return <main>
        <Header />

        <div className="container">
            <div className="d-flex justify-content-between my-4 ">
                <h1>Usuários</h1>
                <a href='/dashboard/usuarios/adicionar' >
                    <button className="btn btn-success"><i className='fal fa-plus' /></button>
                </a>
            </div>
            {loading ?
                <div className="spinner-border text-primary text-center" role="status" />
                : <>
                    <table className="table table-striped">
                        <thead>
                            <tr>
                                <th scope="col" className='w-75'>Nome</th>
                                <th scope="col">Ações</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.length > 0 && users.map(user => <tr key={user.id}>
                                <td>{user.name} <br /> <span className='small text-muted'>{user.nickname}</span> </td>
                                <td>
                                    <div className='d-flex gap-3'>
                                        <a href={`/dashboard/usuarios/${user.uuid}`}>
                                            <button className="btn btn-warning"><i className='fal fa-edit' /></button>
                                        </a>
                                        <button className="btn btn-danger" onClick={() => deleteUser(user.uuid)}><i className='fal fa-trash-alt' /></button>
                                    </div>
                                </td>
                            </tr>)}
                        </tbody>
                    </table>
                </>}
        </div>


    </main>;
}

export default categorias;