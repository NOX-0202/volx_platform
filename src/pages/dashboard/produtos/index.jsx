import Header from '@/root/components/ui/Header';
import api from '@/root/src/libs/api';
import React, { useEffect, useState } from 'react';

// import { Container } from './styles';

function produtos() {

    const [loading, setLoading] = useState(true);
    const [products, setProducts] = useState([]);

    const getProducts = async () => {
        try {
            setLoading(true);
            const products_req = await api.get("/products");
            setProducts(products_req.data.data);
            setLoading(false);
        } catch (error) {
            console.log(error);
        }
    };

    const deleteProduct = async (id) => {
        try {
            if (!confirm('Deseja realmente excluir este produto?')) return;
            setLoading(true);
            await api.delete(`/products?id=${id}`);
            setProducts(products.filter(product => product.id !== id));
            setLoading(false);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getProducts();
    }, []);

    return <main>
        <Header />

        <div className="container">
            <div className="d-flex justify-content-between my-4 ">
                <h1>Produtos</h1>
                <a href='/dashboard/produtos/adicionar' >
                    <button className="btn btn-success"><i className='fal fa-plus' /></button>
                </a>
            </div>

            {loading ? <div className="spinner-border text-primary text-center" role="status" /> : <>
                <div className="W-100">
                    <table className="table table-striped table-hover">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>foto</th>
                                <th>Nome</th>
                                <th>Preço</th>
                                <th>Categoria</th>
                                <th>Departamento</th>
                                <th>Ações</th>
                            </tr>
                        </thead>
                        <tbody>
                            {products.length > 0 && products.map(product => <tr key={product.id}>
                                <td>{product.id}</td>
                                <td><img src={product.thumbnail} alt={product.name} width="50" /></td>
                                <td>{product.title}</td>
                                <td>{product.unit_price.toFixed(2)}</td>
                                <td>{product.category}</td>
                                <td>{product.department}</td>
                                <td>
                                    <div className="d-flex gap-3">
                                        <a href={`/dashboard/produtos/${product.uuid}`}>
                                            <button className="btn btn-primary"><i className='fal fa-edit' /></button>
                                        </a>
                                        <button className="btn btn-danger" onClick={() => deleteProduct(product.id)}><i className='fal fa-trash' /></button>
                                    </div>
                                </td>
                            </tr>)}
                        </tbody>
                    </table>
                </div>
            </>}
        </div>
    </main>;
}

export default produtos;