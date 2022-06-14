import Header from '@/root/components/ui/Header';
import api from '@/root/src/libs/api';
import { getBase64 } from '@/root/src/libs/utils';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';

// import { Container } from './styles';

function posts() {
  const router = useRouter()
  const [uuid_url, setUuidUrl] = useState();
  const [loading, setLoading] = useState(true);
  const [product, setProduct] = useState({});
  const [brands, setBrands] = useState([]);
  const [categories, setCategories] = useState([]);
  const [departments, setDepartments] = useState([]);

  const getBrands = async () => {
    try {
      setLoading(true);
      const brands_req = await api.get("products/brands");
      setBrands(brands_req.data.data);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

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

  const getDepartments = async () => {
    try {
      setLoading(true);
      const departments_req = await api.get("/products/departments");
      setDepartments(departments_req.data.data);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let req = null
      delete product.category
      delete product.department

      if (product.uuid) {
        req = await api.put(`/products?uuid=${product.uuid}`, product);
      } else {
        req = await api.post("/products", product);
      }

      console.log(req)

      if (req.data.success) router.push("/dashboard/produtos");
    } catch (error) {
      console.log(error);
    }
  }

  const handleInput = async (e) => {
    const { name, value } = e.target;

    if (name === "active") { if (!product.active) { value = true } else value = !product.active; }
    if (name === "thumbnail") value = await getBase64(e.target.files[0]);


    setProduct({ ...product, [name]: value })
  }

  useEffect(() => {
    getCategories();
    getBrands();
    getDepartments();
  }, []);

  useEffect(() => {
    (async () => {
      setLoading(true);
      if (router.query.product_uuid) {
        setUuidUrl(router.query.product_uuid);
        const get_product = await api.get(`/products?uuid=${router.query.product_uuid}`)
        if (get_product.data.success && get_product.data.rows == 1) {
          console.log('get_product', get_product.data.data[0])
          setProduct(get_product.data.data[0]);
          setLoading(false);
        }
        setLoading(false);
      }
    })()
  }, [router.query]);


  return <main>
    <Header />
    {loading ? <div className="text-center my-4"><div className="spinner-border text-primary text-center" role="status" /> </div> :
      <div className="container">
        <div className="d-flex align-items-center my-4 gap-3 ">
          <a href='/dashboard/produtos/' >
            <button className="btn btn-secondary"><i className='fal fa-arrow-left' /></button>
          </a>
          <h1>{uuid_url == 'adicionar' ? "Adicionar" : "Atualizar"} Produto</h1>
        </div>
        <form className="row g-3" onSubmit={handleSubmit}>

          <div className="col-md-4">
            <div className="form-floating">
              <input type="barcode" name='barcode' id={"barcode"} className="form-control" value={product.barcode ?? ""} onChange={handleInput} placeholder="Digite o titulo do product" />
              <label htmlFor="barcode">Código de barras</label>
            </div>
          </div>
          <div className="w-100"></div>
          <div className="col-md-6">
            <div className="form-floating">
              <input type="title" name='title' id={"title"} className="form-control" value={product.title ?? ""} onChange={handleInput} placeholder="Digite o titulo do product" />
              <label htmlFor="title">Titulo</label>
            </div>
          </div>

          <div className="col-md-6">
            <div className="form-floating">
              <input className="form-control" type="text" id='slug' name="slug" value={product.slug ?? ""} onChange={handleInput} aria-label="slug" placeholder='slug' />
              <label htmlFor="slug">Slug</label>
            </div>
          </div>

          <div className="col-md-4">
            <div className="form-floating">
              <input className="form-control" type="text" id='unit_price' name="unit_price" value={product.unit_price ?? ""} onChange={handleInput} aria-label="unit_price" placeholder='unit_price' />
              <label htmlFor="unit_price">Preço</label>
            </div>
          </div>

          <div className="col-md-4">
            <div className="form-floating">
              <input className="form-control" type="text" id='unit_pkg' name="unit_pkg" value={product.unit_pkg ?? ""} onChange={handleInput} aria-label="unit_pkg" placeholder='unit_pkg' />
              <label htmlFor="unit_pkg">Nome da unidade</label>
            </div>
          </div>

          <div className="col-md-4">
            <div className="form-floating">
              <input className="form-control" type="text" id='unit_pkgabbr' name="unit_pkgabbr" value={product.unit_pkgabbr ?? ""} onChange={handleInput} aria-label="unit_pkgabbr" placeholder='unit_pkgabbr' />
              <label htmlFor="unit_pkgabbr">Unidade</label>
            </div>
          </div>

          <div className="w-100"></div>

          <div className="col-md-4">
            <div className="form-floating">
              <select className="form-select" id='brand_id' name="brand_id" value={product.brand_id ?? ""} onChange={handleInput} aria-label="departament">
                <option value="0">Selecione a marca</option>
                {brands.map(brand => <option key={brand.id} value={brand.id}>{brand.title}</option>)}
              </select>
              <label htmlFor="brand_id">Marca</label>
            </div>
          </div>

          <div className="col-md-4">
            <div className="form-floating ">
              <select className="form-select" id='category_id' name="category_id" value={product.category_id ?? "1"} onChange={handleInput}>
                <option value="0">Selecione a categoria</option>
                {categories.map(category => <option key={category.id} value={category.id}>{category.title}</option>)}
              </select>
              <label htmlFor="category">Categoria</label>
            </div>
          </div>
          <div className="col-md-4">
            <div className="form-floating">
              <select className="form-select" id='department_id' name="department_id" value={product.department_id ?? ""} onChange={handleInput} aria-label="department_id">
                <option value="0">Selecione o departamento</option>
                {departments.map(department => <option key={department.id} value={department.id}>{department.title}</option>)}

              </select>
              <label htmlFor="department_id">Departamento</label>
            </div>
          </div>


          <div className="col-12">
            <div className="">
              <input type="checkbox" id='active' name="active" value={product.active ?? ""} onChange={handleInput} /> produto ativo
            </div>
          </div>

          <div className="col-md-12">
            <textarea className="form-control" rows={4} name='excerpt' id={"excerpt"} value={product.excerpt ?? ""} onChange={handleInput} placeholder="Digite os ingredientes  do produto" />
          </div>
          <div className="col-md-12">
            <textarea name='description' rows={8} id={"description"} className="form-control" value={product.description ?? ""} onChange={handleInput} placeholder="Digite a descrição do produto" />
          </div>
          <div className="col-12">
            <div className=" d-flex flex-row justify-content-center">
              <div className="form-group">
                <div className='border w-100 rounded p-2 d-flex flex-column gap-2'>
                  <label htmlFor="thumbnail" className="text-center"><img src={product.thumbnail ?? "/assets/logotipo.png"} alt="thumbnail" className="mx-auto img-fluid" style={{ maxHeight: 128, opacity: product.thumbnail ? 1 : 0.35 }} /></label>
                  {product.thumbnail ?
                    <a className="btn btn-danger btn-sm w-100" onClick={() => setProduct({ ...product, thumbnail: null })}>Remover</a>
                    :
                    <label htmlFor="thumbnail" className="btn btn-success btn-sm w-100">Adicionar</label>
                  }
                </div>
                <input type="file" className="form-control invisible" id="thumbnail" name="thumbnail" placeholder="foto" onChange={handleInput} />
              </div>
            </div>
          </div>

          <div className="col-12">
            <div className="d-flex flex-row justify-content-end">
              <button className="btn btn-success" type='submit'>Salvar</button>

            </div>
          </div>
        </form>
      </div>
    }
  </main >;
}

export default posts;