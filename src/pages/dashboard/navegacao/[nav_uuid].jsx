import Header from '@/root/components/ui/Header';
import api from '@/root/src/libs/api';
import { getBase64 } from '@/root/src/libs/utils';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';

// import { Container } from './styles';

function Brand() {
    const router = useRouter()
    const [id_url, setIdUrl] = useState();
    const [loading, setLoading] = useState(true);
    const [navigation, setNavigation] = useState({});

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            let req = null
            console.log(navigation)
            if (navigation.id) {
                req = await api.put(`/navigation?uuid=${navigation.id}`, navigation);
            } else {
                req = await api.post("/navigation", navigation);
            }

            console.log(req)

            if (req.data.success) router.push("/dashboard/");
        } catch (error) {
            console.log(error);
        }
    }

    const handleInput = async (e) => {
        const { name, value } = e.target;

        if (name === "active") { if (!navigation.active) { value = true } else value = !navigation.active; }
        if (name === "external") { if (!navigation.external) { value = true } else value = !navigation.external; }
        if (name === "icon") value = await getBase64(e.target.files[0]);


        setNavigation({ ...navigation, [name]: value })
    }

    useEffect(() => {
        (async () => {
            setLoading(true);
            if (router.query.nav_uuid && router.query.nav_uuid !== 'adicionar') {
                console.log(router.query.nav_uuid)
                setIdUrl(router.query.nav_uuid);

                const get_navigation = await api.get(`/navigation?uuid=${router.query.nav_uuid}`)
                console.log(get_navigation)
                if (get_navigation.data.success && get_navigation.data.rows == 1) {
                    console.log('get_navigation', get_navigation.data.data[0])
                    setNavigation(get_navigation.data.data[0]);
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
    //             setnavigation({});
    //             setLoading(false);
    //         }
    //     })()
    // }, [router.query]);



    return <main>
        <Header />
        {loading ? <div className="text-center my-4"><div className="spinner-border text-primary text-center" role="status" /> </div> :
            <div className="container">
                <div className="d-flex align-items-center my-4 gap-3 ">
                    <a href='/dashboard/' >
                        <button className="btn btn-secondary"><i className='fal fa-arrow-left' /></button>
                    </a>
                    <h1>{!id_url ? "Adicionar" : "Atualizar"} Navegação</h1>
                </div>
                <form className="row g-3" onSubmit={handleSubmit}>

                    <div className="col-md-6">
                        <div className="form-floating">
                            <input type="label" name='label' id={"label"} className="form-control" value={navigation.label ?? ""} onChange={handleInput} placeholder="Digite o titulo do navigation" />
                            <label htmlFor="label">Titulo</label>
                        </div>
                    </div>

                    <div className="col-md-6">
                        <div className="form-floating">
                            <input type="text" name='url' id={"url"} className="form-control" value={navigation.url ?? ""} onChange={handleInput} placeholder="Digite o titulo do navigation" />
                            <label htmlFor="url">link</label>
                        </div>
                    </div>

                    <div className="col-md-6">
                        <div className="form-floating">
                            <input className="form-control" type="text" id='position' name="position" value={navigation.position ?? ""} onChange={handleInput} aria-label="position" placeholder='position' />
                            <label htmlFor="position">position</label>
                        </div>
                    </div>

                    <div className="col-md-6">
                        <div className="form-floating">
                            <input className="form-control" type="number" id='order' name="order" value={navigation.order ?? ""} onChange={handleInput} aria-label="order" placeholder='order' />
                            <label htmlFor="order">Ordem</label>
                        </div>
                    </div>

                    <div className="col-12">
                        <div className="">
                            <input type="checkbox" id='active' name="active" value={navigation.active ?? ""} onChange={handleInput} /> Link ativo <br />
                            <input type="checkbox" id='external' name="external" value={navigation.external ?? ""} onChange={handleInput} /> Link externo
                        </div>
                    </div>
                    <div className="col-md-12">
                        <textarea name='class' rows={8} id={"class"} className="form-control" value={navigation.class ?? ""} onChange={handleInput} placeholder="Digite a estilização" />
                    </div>
                    <div className="col-md-12">
                        <textarea name='description' rows={8} id={"description"} className="form-control" value={navigation.description ?? ""} onChange={handleInput} placeholder="Digite o conteúdo da categoria" />
                    </div>
                    <div className="col-md-4">
                        <div className="form-group">
                            <div className='border w-100 rounded p-2 d-flex flex-column align-items-end gap-3'>
                                <div className="align-self-center">
                                    <label htmlFor="icon" className="text-center"><img src={navigation.icon ?? "/assets/logotipo.png"} alt="icon" className="mx-auto img-fluid" style={{ maxHeight: 128, opacity: navigation.icon ? 1 : 0.35 }} /></label>
                                </div>
                                {navigation.icon ?
                                    <a className="btn btn-danger btn-sm w-100" onClick={() => setNavigation({ ...navigation, icon: null })}>Remover</a>
                                    :
                                    <label htmlFor="icon" className="btn btn-success btn-sm">Adicionar</label>
                                }
                            </div>
                            <input type="file" className="form-control invisible" id="icon" name="icon" placeholder="foto" onChange={handleInput} />
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

export default Brand;