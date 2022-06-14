import Header from '@/root/components/ui/Header';
import api from '@/root/src/libs/api';
import { getBase64 } from '@/root/src/libs/utils';
import e from 'cors';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';

// import { Container } from './styles';

function posts() {
    const router = useRouter()
    const [uuid_url, setUuidUrl] = useState();
    const [loading, setLoading] = useState(true);
    const [post, setPost] = useState({});
    const [users, setUsers] = useState([]);
    const [brands, setBrands] = useState([]);
    const [categories, setCategories] = useState([]);
    const [metaLoading, setMetaLoading] = useState(true);
    const [metas, setMetas] = useState([]);
    const [meta, setMeta] = useState({});

    const getCategories = async () => {
        try {
            setLoading(true);
            const categories_req = await api.get("/posts/categories");
            setCategories(categories_req.data.data);
            setLoading(false);
        } catch (error) {
            console.log(error);
        }
    };

    const getBrands = async () => {
        try {
            setLoading(true);
            const brands_req = await api.get("/posts/types");
            setBrands(brands_req.data.data);
            setLoading(false);
        } catch (error) {
            console.log(error);
        }
    };

    const getUsers = async () => {
        try {
            setLoading(true);
            const users_req = await api.get("/users");
            if (users_req.data.success) {
                setLoading(false);
                setUsers(users_req.data.data);
            }
        } catch (error) {
            console.log(error);
        }

    }

    const getPostMeta = async () => {
        try {
            setMetaLoading(true);
            const post_req = await api.get(`/posts/meta?post_uuid=${router.query.uuid_post}`);
            setMetas(post_req.data.data);
            setMetaLoading(false);
        } catch (error) {
            console.log(error);
        }
    };

    const submitMeta = async (e) => {
        e.preventDefault();
        try {
            setMetaLoading(true);
            let post_req = null;

            if (!meta.id) {
                post_req = await api.post(`/posts/meta`, {
                    post_uuid: router.query.uuid_post,
                    ...meta
                });
            } else {
                post_req = await api.put(`/posts/meta`, {
                    post_uuid: router.query.uuid_post,
                    ...meta
                });
            }

            if (post_req.data.success) {
                setMetaLoading(false);
                getPostMeta();
                setMeta({});
            }
        } catch (error) {
            console.log(error);
        }
    }

    const deleteMeta = async () => {
        try {
            setMetaLoading(true);
            const post_req = await api.delete(`/posts/meta?id=${meta.id}`);
            if (post_req.data.success) {
                setMetaLoading(false);
                setMeta({})
                getPostMeta();
            }
        } catch (error) {
            console.log(error);
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            let req = null

            if (post.uuid) {
                req = await api.put(`/posts?uuid=${post.uuid}`, post);
            } else {
                req = await api.post("/posts", post);
            }

            console.log(req)

            if (req.data.success) router.push("/dashboard/posts");
        } catch (error) {
            console.log(error);
        }
    }

    const handleInput = async (e) => {
        const { name, value } = e.target;

        if (name === "active") { if (!post.active) { value = true } else value = !post.active; }
        if (name === "thumbnail") value = await getBase64(e.target.files[0]);


        setPost({ ...post, [name]: value })
    }

    useEffect(() => {
        getCategories();
        getBrands();
        getPostMeta();
        getUsers();
    }, []);

    useEffect(() => {
        (async () => {
            setLoading(true);
            if (router.query.uuid_post) {
                setUuidUrl(router.query.uuid_post);
                const get_post = await api.get(`/posts?uuid=${router.query.uuid_post}`)
                if (get_post.data.success && get_post.data.rows == 1) {
                    getPostMeta();
                    setPost(get_post.data.data[0]);
                    setLoading(false);
                }
                setLoading(false);
            }
        })()
    }, [router.query]);


    return <main>
        <Header />
        {loading ? <div className="text-center my-4"><div className="spinner-border text-primary text-center" role="status" /> </div> :
            <div className="container mb-4">
                <div className="d-flex align-items-center my-4 gap-3 ">
                    <a href='/dashboard/posts/' >
                        <button className="btn btn-secondary"><i className='fal fa-arrow-left' /></button>
                    </a>
                    <h1>{uuid_url == 'adicionar' ? "Adicionar" : "Atualizar"} Post</h1>
                </div>
                <form className="row g-3" onSubmit={handleSubmit}>
                    <div className="col-md-4">
                        <div className="form-group">
                            <div className='border w-100 rounded p-2 d-flex flex-column gap-2'>
                                <label htmlFor="thumbnail" className="text-center"><img src={post.thumbnail ?? "/assets/logotipo.png"} alt="thumbnail" className="mx-auto img-fluid" style={{ maxHeight: 128, opacity: post.thumbnail ? 1 : 0.35 }} /></label>
                                {post.thumbnail ?
                                    <a className="btn btn-danger btn-sm w-100" onClick={() => setPost({ ...post, thumbnail: null })}>Remover</a>
                                    :
                                    <label htmlFor="thumbnail" className="btn btn-success btn-sm w-100">Adicionar</label>
                                }
                            </div>
                            <input type="file" className="form-control invisible" id="thumbnail" name="thumbnail" placeholder="foto" onChange={handleInput} />
                        </div>
                    </div>
                    <div className="col-md-4 my-auto">
                        <div className="form-floating">
                            {/* create a type select */}
                            <select className="form-select" id='type' name="type" value={post.type ?? "0"} onChange={handleInput} aria-label="Type">
                                <option value="0">Selecione o tipo</option>
                                {brands.map((brand, index) => <option key={index} value={brand.id}>{brand.label} ({brand.name})</option>)}
                            </select>
                            <label htmlFor="type">Tipo do post</label>
                        </div>
                    </div>
                    <div className="col-md-4 my-auto">
                        <div className="form-floating ">
                            <select className="form-select" id='category_id' name="category_id" value={post.category_id ?? "0"} onChange={handleInput}>
                                <option value="0">Selecione a categoria</option>
                                {categories.map(category => <option key={category.id} value={category.id}>{category.title}</option>)}
                            </select>
                            <label htmlFor="category">Categoria</label>
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="form-floating">
                            <select className="form-select" id='language' name="language" value={post.language ?? "1"} onChange={handleInput} aria-label="Language">
                                <option value="1">Selecione a linguagem</option>
                                <option value="markdown">markdown</option>
                                <option value="html">html</option>
                            </select>
                            <label htmlFor="language">Linguagem</label>
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="form-floating">
                            <select className="form-select" id='layout' name="layout" value={post.layout ?? "1"} onChange={handleInput} aria-label="layout">
                                <option value="1">Selecione o layout</option>
                                <option value="default">default</option>
                                <option value="page">Página</option>
                            </select>
                            <label htmlFor="title">layout</label>
                        </div>
                    </div>
                    <div className="col-md-3">
                        <div className="form-floating">
                            <input className="form-control" type="number" id='order' name="order" value={post.order ?? ""} onChange={handleInput} aria-label="order" placeholder='order' />
                            <label htmlFor="order">Ordem</label>
                        </div>
                    </div>
                    <div className="col-md-9">
                        <div className="form-floating">

                            <select className="form-select" id='author_uuid' name="author_uuid" value={post.author_uuid ?? "0"} onChange={handleInput} aria-label="author_uuid">
                                <option value="0">Selecione o autor</option>
                                {users.map(user => <option key={user.uuid} value={user.uuid}>{user.name}</option>)}
                            </select>
                            <label htmlFor="author_uuid">Autor</label>
                        </div>
                    </div>

                    <div className="col-12">
                        <div className="">
                            <input type="checkbox" id='active' name="active" value={post.active ?? ""} onChange={handleInput} /> Post ativo
                        </div>
                    </div>

                    <div className="col-md-6">
                        <div className="form-floating">
                            <input className="form-control" type="text" id='slug' name="slug" value={post.slug ?? ""} onChange={handleInput} aria-label="slug" placeholder='slug' />
                            <label htmlFor="slug">Slug</label>
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="form-floating">
                            <input type="title" name='title' id={"title"} className="form-control" value={post.title ?? ""} onChange={handleInput} placeholder="Digite o titulo do post" />
                            <label htmlFor="title">Titulo</label>
                        </div>
                    </div>
                    <div className="col-md-12">
                        <textarea className="form-control" rows={4} name='excerpt' id={"excerpt"} value={post.excerpt ?? ""} onChange={handleInput} placeholder="Digite o resumo da página" />
                    </div>
                    <div className="col-md-12">
                        <textarea name='content' rows={8} id={"content"} className="form-control" value={post.content ?? ""} onChange={handleInput} placeholder="Digite o conteúdo da página" />
                    </div>

                    <div className="col-12">
                        <div className="d-flex flex-row justify-content-end">
                            <button className="btn btn-success" type='submit'>Salvar</button>

                        </div>
                    </div>
                </form>

                <form className="row g-3" onSubmit={submitMeta}>
                    <div className="col-12">
                        <h1>Meta dados do post</h1>
                    </div>
                    {metaLoading ? <div className="col-12">
                        <div className="d-flex justify-content-center">
                            <div className="spinner-border text-success" role="status">
                                <span className="sr-only">Loading...</span>
                            </div>
                        </div>
                    </div> : <>
                        <div className="col-md-3">
                            <div className="list-group" id="list-tab" role="tablist">
                                <a className="list-group-item list-group-item-action active" id="list-home-list" data-bs-toggle="list" href="#list-home" role="tab" onClick={() => {
                                    setMeta({})
                                }} aria-controls="list-home">Adicionar</a>
                                {metas.map((meta, index) => <a key={index} className="list-group-item list-group-item-action" id={`list-${meta.key}-list`} data-bs-toggle="list" href={`#list-${meta.key}`} onClick={() => {
                                    setMeta(meta)
                                }} role="tab" aria-controls={`list-${meta.key}`}>{meta.key}</a>)}
                            </div>
                        </div>
                        <div className="col-md-9 d-flex flex-column gap-3">
                            <div className="form-floating">
                                <input type="text" className='form-control' id="key" value={meta.key ?? ""} onChange={(e) => { setMeta({ ...meta, key: e.target.value }) }} placeholder="meta key" />
                                <label htmlFor="key">Chave</label>
                            </div>
                            <div className="">
                                <textarea name="value" id="value" value={meta.value ?? ""} onChange={(e) => { setMeta({ ...meta, value: e.target.value }) }} className="form-control" cols="30" rows="10" placeholder='meta value'></textarea>
                            </div>

                            <div className="d-flex flex-row justify-content-between">
                                {meta.id && <button type='button' className='btn btn-danger' onClick={deleteMeta}>Excluir</button>}
                                <button className="btn btn-success" type='submit'>Salvar</button>
                            </div>
                        </div>
                    </>}
                </form>

            </div>
        }
    </main >;
}

export default posts;