import Header from '@/root/components/ui/Header';
import api from '@/root/src/libs/api';

import { getBase64 } from '@/root/src/libs/utils';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';

// import { Container } from './styles';

function Department() {
    const router = useRouter()
    const [id_url, setIdUrl] = useState();
    const [loading, setLoading] = useState(true);
    const [department, setDepartment] = useState({});

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            let req = null

            if (department.id) {
                req = await api.put(`/products/departments?uuid=${department.id}`, department);
            } else {
                req = await api.post("/products/departments", department);
            }

            console.log(req)

            if (req.data.success) router.push("/dashboard/produtos/departamentos");
        } catch (error) {
            console.log(error);
        }
    }

    const handleInput = async (e) => {
        const { name, value } = e.target;

        if (name === "active") { if (!department.active) { value = true } else value = !department.active; }
        if (name === "thumbnail" || name === 'banner') value = await getBase64(e.target.files[0]);


        setDepartment({ ...department, [name]: value })
    }

    useEffect(() => {
        (async () => {
            setLoading(true);
            if (router.query.department_uuid && router.query.department_uuid !== 'adicionar') {
                const get_department = await api.get(`/products/departments?uuid=${router.query.department_uuid}`)
                setIdUrl(router.query.department_uuid);

                if (get_department.data.success && get_department.data.rows == 1) {
                    setDepartment(get_department.data.data[0]);
                    setLoading(false);
                }
            }
            setLoading(false);
        })()
    }, [router.query]);

    // useEffect(() => {
    //     (async () => {
    //         setLoading(true);
    //         if (router.query.category_id && router.query.category_id === 'adicionar') {
    //             setDepartment({});
    //             setLoading(false);
    //         }
    //     })()
    // }, [router.query]);



    return <main>
        <Header />
        {loading ? <div className="text-center my-4"><div className="spinner-border text-primary text-center" role="status" /> </div> :
            <div className="container">
                <div className="d-flex align-items-center my-4 gap-3 ">
                    <a href='/dashboard/produtos/departamentos' >
                        <button className="btn btn-secondary"><i className='fal fa-arrow-left' /></button>
                    </a>
                    <h1>{id_url == 'adicionar' ? "Adicionar" : "Atualizar"} Departamento</h1>
                </div>
                <form className="row g-3" onSubmit={handleSubmit}>

                    <div className="col-md-6">
                        <div className="form-floating">
                            <input type="title" name='title' id={"title"} className="form-control" value={department.title ?? ""} onChange={handleInput} placeholder="Digite o titulo do department" />
                            <label htmlFor="title">Titulo</label>
                        </div>
                    </div>

                    <div className="col-md-6">
                        <div className="form-floating">
                            <input className="form-control" type="text" id='slug' name="slug" value={department.slug ?? ""} onChange={handleInput} aria-label="slug" placeholder='slug' />
                            <label htmlFor="slug">Slug</label>
                        </div>
                    </div>

                    <div className="col-md-9">
                        <div className="form-floating">
                            <input className="form-control" type="text" id='read_more' name="read_more" value={department.read_more ?? ""} onChange={handleInput} aria-label="read_more" placeholder='read_more' />
                            <label htmlFor="read_more">Saiba mais</label>
                        </div>
                    </div>

                    <div className="col-md-3">
                        <div className="form-floating">
                            <input className="form-control" type="number" id='order' name="order" value={department.order ?? ""} onChange={handleInput} aria-label="order" placeholder='order' />
                            <label htmlFor="order">Ordem</label>
                        </div>
                    </div>

                    <div className="col-12">
                        <div className="">
                            <input type="checkbox" id='active' name="active" value={department.active ?? ""} onChange={handleInput} /> Categotia ativa
                        </div>
                    </div>

                    <div className="col-md-12">
                        <textarea className="form-control" rows={4} name='excerpt' id={"excerpt"} value={department.excerpt ?? ""} onChange={handleInput} placeholder="Digite o resumo da categoria" />
                    </div>
                    <div className="col-md-12">
                        <textarea name='content' rows={8} id={"content"} className="form-control" value={department.content ?? ""} onChange={handleInput} placeholder="Digite o conteúdo da categoria" />
                    </div>
                    <div className="col-md-4">
                        <div className="form-group">
                            <div className='border w-100 rounded p-2 d-flex flex-column align-items-end gap-3'>
                                <div className="align-self-center">
                                    <label htmlFor="thumbnail" className="text-center"><img src={department.thumbnail ?? "/assets/logotipo.png"} alt="thumbnail" className="mx-auto img-fluid" style={{ maxHeight: 128, opacity: department.thumbnail ? 1 : 0.35 }} /></label>
                                </div>
                                {department.thumbnail ?
                                    <a className="btn btn-danger btn-sm w-100" onClick={() => setDepartment({ ...department, thumbnail: null })}>Remover</a>
                                    :
                                    <label htmlFor="thumbnail" className="btn btn-success btn-sm">Adicionar</label>
                                }
                            </div>
                            <input type="file" className="form-control invisible" id="thumbnail" name="thumbnail" placeholder="foto" onChange={handleInput} />
                        </div>
                    </div>
                    <div className="col-md-8">
                        <div className="form-group">
                            <div className='border w-100 rounded p-2 d-flex flex-column align-items-end gap-3'>
                                <div className="align-self-center">
                                    <label htmlFor="thumbnail" className="text-center"><img src={department.banner ?? "/assets/logotipo.png"} alt="banner" className="img-fluid" style={{ maxHeight: 128, opacity: department.banner ? 1 : 0.35 }} /></label>
                                </div>
                                {department.banner ?
                                    <a className="btn btn-danger btn-sm" onClick={() => setDepartment({ ...department, banner: null })}>Remover</a>
                                    :
                                    <label htmlFor="banner" className="btn btn-success btn-sm">Adicionar</label>
                                }
                            </div>
                            <input type="file" className="form-control invisible" id="banner" name="banner" placeholder="foto" onChange={handleInput} />
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

export default Department;