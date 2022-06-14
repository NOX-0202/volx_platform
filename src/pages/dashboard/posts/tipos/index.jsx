import Header from '@/root/components/ui/Header';
import api from '@/root/src/libs/api';
import React, { useEffect, useState } from 'react';

// import { Container } from './styles';

function categorias() {
    const [types, setTypes] = useState([]);
    const [loading, setLoading] = useState(true);

    const getTypes = async () => {
        try {
            setLoading(true);
            const types_req = await api.get("/posts/types");
            setTypes(types_req.data.data);
            setLoading(false);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getTypes();
    }, []);


    const deleteType = async (id_type) => {
        try {
            console.log(id_type);
            if (confirm("Deseja realmente excluir este modelo?")) {
                const delete_req = await api.delete(`/posts/types?id=${id_type}`);
                console.log(delete_req);
                if (delete_req.data.success) getTypes();
            }
        } catch (error) {
            console.log(error);
        }
    };



    return <main>
        <Header />

        <div className="container">
            <div className="d-flex justify-content-between my-4 ">
                <h1>Modelo das páginas</h1>
                <a href='/dashboard/posts/tipos/adicionar' >
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
                            {types.length > 0 && types.map(type => <tr key={type.id}>
                                <td>{type.label} <br /> <span className='small text-muted'>{type.name}</span> </td>
                                <td>
                                    <div className='d-flex gap-3'>
                                        <a href={`/dashboard/posts/tipos/${type.id}`}>
                                            <button className="btn btn-warning"><i className='fal fa-edit' /></button>
                                        </a>
                                        <button className="btn btn-danger" onClick={() => deleteType(type.id)}><i className='fal fa-trash-alt' /></button>
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