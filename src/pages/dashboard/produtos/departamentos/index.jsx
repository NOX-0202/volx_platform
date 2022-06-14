import Header from '@/root/components/ui/Header';
import api from '@/root/src/libs/api';
import React, { useEffect, useState } from 'react';

// import { Container } from './styles';

function categorias() {
    const [departments, setDepartments] = useState([]);
    const [loading, setLoading] = useState(true);

    const getDepartment = async () => {
        try {
            setLoading(true);
            const categories_req = await api.get("/products/departments");
            setDepartments(categories_req.data.data);
            setLoading(false);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getDepartment();
    }, []);


    const deleteDepartment = async (id_category) => {
        try {
            if (confirm("Deseja realmente excluir este departamento?")) {
                const delete_req = await api.delete(`/products/departments?id=${id_category}`);

                if (delete_req.data.success) getDepartment();
            }
        } catch (error) {
            console.log(error);
        }
    };



    return <main>
        <Header />

        <div className="container">
            <div className="d-flex justify-content-between my-4 ">
                <h1>Departamento dos produtos</h1>
                <a href='/dashboard/produtos/departamentos/adicionar' >
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
                            {departments.length > 0 && departments.map(department => <tr key={department.id}>
                                <td>{department.title} <br /> <span className='small text-muted'>{department.slug}</span> </td>
                                <td>
                                    <div className='d-flex gap-3'>
                                        <a href={`/dashboard/produtos/departamentos/${department.uuid}`}>
                                            <button className="btn btn-warning"><i className='fal fa-edit' /></button>
                                        </a>
                                        <button className="btn btn-danger" onClick={() => deleteDepartment(department.id)}><i className='fal fa-trash-alt' /></button>
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