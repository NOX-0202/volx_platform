import Header from '@/root/components/ui/Header';
import { api } from '@/root/src/libs/api';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';

// import { Container } from './styles';

function tipos() {
    const router = useRouter();
    const [type_uuid, setTypeUuid] = useState('');
    const [types, setTypes] = useState({});
    const [loading, setLoading] = useState(true);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            let req = null

            if (types.id) {
                req = await api.put(`/posts/types?id=${types.id}`, types);
            } else {
                req = await api.post("/posts/types", types);
            }

            console.log(req)

            if (req.data.success) router.push("/dashboard/posts/tipos");
        } catch (error) {
            console.log(error);
        }
    }

    const handleInput = async (e) => {
        const { name, value } = e.target;

        if (name === "active") { if (!types.active) { value = true } else value = !types.active; }


        setTypes({ ...types, [name]: value })
    }


    useEffect(() => {
        (async () => {
            setLoading(true);
            if (router.query.type_uuid) {
                setTypeUuid(router.query.type_uuid);
                const get_type = await api.get(`/posts/types?id=${router.query.type_uuid}`)
                if (get_type.data.success && get_type.data.rows == 1) {
                    console.log('get_type', get_type.data.data[0])
                    setTypes(get_type.data.data[0]);
                    setLoading(false);
                }
                setLoading(false);
            }
        })()
    }, [router.query]);

    return <main>
        <Header />
        <div className="container">
            <div className="d-flex align-items-center my-4 gap-3 ">
                <a href='/dashboard/posts/tipos' >
                    <button className="btn btn-secondary"><i className='fal fa-arrow-left' /></button>
                </a>
                <h1>{type_uuid == 'adicionar' ? "Adicionar" : "Atualizar"} Modelo</h1>
            </div>

            {loading ?
                <div className="spinner-border text-primary text-center" role="status" />
                : <>
                    <form className="row g-3" onSubmit={handleSubmit}>
                        <div className="col-md-6">
                            <div className="form-floating">
                                <input type="text" className="form-control" id="name" name="name" value={types.name ?? ""} onChange={handleInput} />
                                <label htmlFor="name">Nome</label>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="form-floating">
                                <input type="text" className="form-control" id="label" name="label" value={types.label ?? ""} onChange={handleInput} />
                                <label htmlFor="label">Label</label>
                            </div>
                        </div>
                        <div className="form-group">
                            <input type="checkbox" className="" id="active" name="active" checked={types.active ?? ""} onChange={handleInput} />
                            <label htmlFor="active">Ativo</label>
                        </div>
                        <div className="col-12 d-flex justify-content-end">
                            <button type="submit" className="btn btn-primary">Salvar</button>
                        </div>
                    </form>
                </>
            }

        </div>
    </main>;
}

export default tipos;