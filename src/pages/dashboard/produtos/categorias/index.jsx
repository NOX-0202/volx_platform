import Header from '@/root/components/ui/Header';
import api from '@/root/src/libs/api';
import React, { useEffect, useState } from 'react';

// import { Container } from './styles';

function categorias() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  const getCategories = async () => {
    try {
      setLoading(true);
      const categories_req = await api.get("/products/categories");
      setCategories(categories_req.data.data);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getCategories();
  }, []);


  const deleteCategory = async (id_category) => {
    try {
      console.log(id_category);
      if (confirm("Deseja realmente excluir esta categoria?")) {
        const delete_req = await api.delete(`/products/categories?id=${id_category}`);
        console.log(delete_req);
        if (delete_req.data.success) getCategories();
      }
    } catch (error) {
      console.log(error);
    }
  };



  return <main>
    <Header />

    <div className="container">
      <div className="d-flex justify-content-between my-4 ">
        <h1>Categoria dos produtos</h1>
        <a href='/dashboard/produtos/categorias/adicionar' >
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
              {categories.length > 0 && categories.map(category => <tr key={category.id}>
                <td>{category.title} <br /> <span className='small text-muted'>{category.slug}</span> </td>
                <td className='d-flex gap-3'>
                  <a href={`/dashboard/produtos/categorias/${category.id}`}>
                    <button className="btn btn-warning"><i className='fal fa-edit' /></button>
                  </a>
                  <button className="btn btn-danger" onClick={() => deleteCategory(category.id)}><i className='fal fa-trash-alt' /></button>
                </td>
              </tr>)}
            </tbody>
          </table>
        </>}
    </div>


  </main>;
}

export default categorias;