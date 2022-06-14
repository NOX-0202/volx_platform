import Header from '@/root/components/ui/Header';
import React, { useEffect, useState } from 'react';
import api from '../../libs/api';

// import { Container } from './styles';

function Dash() {
    const [navigation, setNavigation] = useState([]);
    const [navigation_form, setNavigationForm] = useState([]);
    const [current_info, setCurrentInfo] = useState([]);
    const [infos, setInfos] = useState([]);

    const getInfos = async () => {
        try {
            const info_req = await api.get("/info");
            console.log(info_req.data);
            setInfos(info_req.data.data);
        } catch (error) {
            console.log(error);
        }
    }

    const getNavigation = async () => {
        try {
            const nav_req = await api.get("/navigation");
            console.log(nav_req.data);
            setNavigation(nav_req.data.data);
        } catch (error) {
            console.log(error);
        }
    }


    const deleteNavigation = async (id) => {
        try {
            if (!confirm("Tem certeza?")) return;
            const info_req = await api.delete(`/navigation?uuid=${id}`);
            console.log(info_req.data);
            setInfos(infos.filter(info => info.id !== id));
        } catch (error) {
            console.log(error);
        }
    }

    const handleInfoInput = async (e) => {
        const { name, value } = e.target;
        setCurrentInfo({ ...current_info, [name]: value });
    }

    const handleEditInfoInput = async (index, e) => {
        const { name, value } = e.target;
        console.log(index, name, value);
        infos[index][name] = value;
        console.log(infos);
        setInfos([...infos]);

    }

    const saveInfo = async (index) => {
        try {
            const info_req = await api.put(`/info?id=${infos[index].id}`, infos[index]);
            console.log(info_req.data);
        } catch (error) {
            console.log(error);
        }
    }

    const handleInfoSubmit = async () => {
        try {
            const info_req = await api.post("/info", current_info);

            console.log(info_req.data);
            current_info.id = info_req.data.insert_id
            setInfos([...infos, current_info]);
            setCurrentInfo({});
        } catch (error) {
            console.log(error);
        }
    }

    const deleteInfo = async (id) => {
        try {
            if (!confirm("Tem certeza?")) return;
            const info_req = await api.delete(`/info?id=${id}`);
            console.log(info_req.data);
            setInfos(infos.filter(info => info.id !== id));
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getInfos();
        getNavigation();
    }, []);

    return <main>
        <Header />
        <div className="container my-4">
            <div className="d-flex justify-content-between align-items-center">
                <h1>Navegação</h1>
                <a href='/dashboard/navegacao/adicionar' className="btn btn-sm btn-success">+</a>
            </div>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th scope="col" className='w-75'>Nome</th>
                        <th scope="col">Ativo</th>
                        <th scope="col">Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {navigation.map((item, index) => {
                        return <tr key={index}>
                            <td>
                                {item.label} <br />
                                <span className='small text-muted'>{item.url == "" ? "/" : item.url}</span>
                            </td>
                            <td>
                                {item.active == 1 ? <div className="btn btn-success" style={{ borderRadius: "100%", width: 10, height: 25 }} /> : <div className="btn btn-danger" style={{ borderRadius: "100%", width: 10, height: 25 }} />}
                            </td>
                            <td>
                                <div className="d-flex gap-2">
                                    <a href={`/dashboard/navegacao/${item.uuid}`} className="btn btn-sm btn-warning"><i className='fal fa-edit' /></a>
                                    <button className="btn btn-sm btn-danger" onClick={() => deleteNavigation(item.uuid)}>Excluir</button>
                                </div>
                            </td>
                        </tr>
                    })}
                </tbody>
            </table>
            <div className="row g-2">

            </div>
            <h1>Informações do site</h1>
            <div >
                <div className="row g-2 my-2">
                    <div className="col-md-4">
                        <input type="text" className='form-control' name='key' value={current_info.key ?? ""} onChange={handleInfoInput} />
                    </div>
                    <div className="col-md-4">
                        <input type="text" className='form-control' name='value' value={current_info.value ?? ""} onChange={handleInfoInput} />
                    </div>
                    <div className="col-md-3">
                        <input type="text" className='form-control' name='group' value={current_info.group ?? ""} onChange={handleInfoInput} />
                    </div>
                    <div className="col-md-1">
                        <div className="d-flex align-items-center gap-2">
                            <button className="btn btn-sm btn-success" onClick={handleInfoSubmit}>+</button>
                        </div>
                    </div>
                </div>
                {infos.map((info, index) => {
                    return <div key={index} className="row g-2 my-2">
                        <div className="col-md-4">
                            <input type="text" className='form-control' name='key' value={infos[index].key} onChange={(e) => handleEditInfoInput(index, e)} />
                        </div>
                        <div className="col-md-4">
                            <input type="text" className='form-control' name='value' value={infos[index].value} onChange={(e) => handleEditInfoInput(index, e)} />
                        </div>
                        <div className="col-md-2">
                            <input type="text" className='form-control' name='group' value={infos[index].group} onChange={(e) => handleEditInfoInput(index, e)} />
                        </div>
                        <div className="col-md-2">
                            <div className="d-flex align-items-center gap-2">
                                <button className="btn btn-sm btn-success" onClick={() => saveInfo(index)}>OK</button>
                                <button className="btn btn-sm btn-danger" onClick={() => deleteInfo(info.id)}>Excluir</button>
                            </div>
                        </div>
                    </div>
                })}
            </div>
        </div>
    </main >;
}

export default Dash;