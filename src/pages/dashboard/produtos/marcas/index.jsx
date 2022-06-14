import Header from '@/root/components/ui/Header';
import api from '@/root/src/libs/api';
import React, { useEffect, useState } from 'react';

// import { Container } from './styles';

function categorias() {
    const [departments, setDepartments] = useState([]);
    const [loading, setLoading] = useState(true);

    const getBrands = async () => {
        try {
            setLoading(true);
            const categories_req = await api.get("/products/brands");
            setDepartments(categories_req.data.data);
            setLoading(false);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getBrands();
    }, []);


    const deleteDepartment = async (id_category) => {
        try {
            if (confirm("Deseja realmente excluir esta marca?")) {
                const delete_req = await api.delete(`/products/brands?id=${id_category}`);

                if (delete_req.data.success) getBrands();
            }
        } catch (error) {
            console.log(error);
        }
    };



    return <main>
        <Header />

        <div className="container">
            <div className="d-flex justify-content-between my-4 ">
                <h1>Marcas dos produtos</h1>
                <a href='/dashboard/produtos/marcas/adicionar' >
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
                                        <a href={`/dashboard/produtos/marcas/${department.uuid}`}>
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