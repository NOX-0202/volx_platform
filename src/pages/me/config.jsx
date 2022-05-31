import DashNav from '@/root/public/components/DashNav';
import VolxInput from '@/root/public/components/VolxInput';
import { SP } from 'next/dist/shared/lib/utils';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import Spinner from '../../components/Pageloading';
import api from '../../libs/api';
import { verifyUser } from '../../libs/verify_user';

// import { Container } from './styles';

function me() {
    const router = useRouter();
    const [loading, toggleLoading] = useState(true);
    const [btn_loading, toggleBtnLoading] = useState(false);
    const [blaze_double_user_data, setBlazeDoubleUserData] = useState({});
    const [blaze_crash_user_data, setBlazeCrashUserData] = useState({});
    const [user, setUser] = useState({});


    const handleInput = (e) => setBlazeDoubleUserData({ ...blaze_double_user_data, [e.target.name]: e.target.value })
    const handleDoubleInput = (e) => setBlazeDoubleUserData({ ...blaze_double_user_data, [e.target.name]: e.target.value })
    const handleCrashInput = (e) => setBlazeCrashUserData({ ...blaze_crash_user_data, [e.target.name]: e.target.value })

    const handleSubmit = (e) => {
        e.preventDefault()
        toggleBtnLoading(true)
        console.log({ blaze_double_user_data })
        console.log({ blaze_crash_user_data })
        // console.log(blaze_double_user_data)
        // delete blaze_double_user_data.created_at
        // api.post(`/bots/blaze/double?user_uuid=${user.uuid}`, blaze_double_user_data).then(async res => {
        //     console.log(res)

        // }).catch(err => {
        //     console.log(err)
        // }
        // ).finally(() => {
        //     toggleBtnLoading(false)
        // })
    }


    const getBlazeConfig = async (userdata) => {
        try {
            toggleLoading(true);
            const response = await api.get('/bots/blaze/double?user_uuid=' + userdata.uuid);
            console.log(response)
            setBlazeDoubleUserData(response.data.data[0] ?? {});
            toggleLoading(false);
        } catch (error) {
            toggleLoading(false);
        }
    };

    useEffect(() => {
        console.log('me');
        setBlazeDoubleUserData({ ...blaze_double_user_data, bet_type: 1 })
        verifyUser().then(async user => {
            console.log(user)
            setUser(user[0] ?? [])
            getBlazeConfig(user[0])
        })

    }, []);


    return !loading ? <main>
        <DashNav title="Configurações do sistema" />
        <div className="bg-volx  d-flex flex-column pt-4">
            <div className="container">
                <a className="text-volx fw-bold m-3 text-decoration-none" onClick={() => router.back()}><i className="fa-light fa-arrow-left"></i> Voltar</a>
                <form onSubmit={handleSubmit}>
                    <div className="row g-3">
                        <div className="col-12">
                            <h1 className="h3 text-white">Configurações da blaze</h1>
                        </div>
                        <div className="col-12 col-md-6">
                            <VolxInput type="text" label="Login da blaze" id="blaze_login" name="blaze_login" value={blaze_double_user_data.blaze_login ?? ""} onChange={handleInput} placeholder="name" />
                        </div>
                        <div className="col-12 col-md-6">
                            <VolxInput type="password" label="Senha da blaze" id="blaze_password" name="blaze_password" value={blaze_double_user_data.blaze_password ?? ""} onChange={handleInput} placeholder="pass" />
                        </div>
                        <div className="col-12 text-white">
                            OU SE PREFIRIR:
                        </div>
                        <div className="col-12">
                            <VolxInput type="text" label="Token de acesso" id="token" name="token" value={blaze_double_user_data.token ?? ""} onChange={handleInput} placeholder="name" />
                        </div>
                        <div className="col-12">
                            <h1 className="h3 text-white">Configurações do double</h1>
                        </div>
                        <div className="col-12 d-flex gap-3">
                            <div>
                                <input type="checkbox" name="margingale_enabled" defaultChecked={blaze_double_user_data.margingale_enabled ?? false} value={blaze_double_user_data.margingale_enabled ?? "1"} onChange={handleDoubleInput} /> <span className='text-white'>margingale</span>
                            </div>
                            <div>
                                <input type="checkbox" name="soros_enabled" defaultChecked={blaze_double_user_data.soros_enabled ?? false} value={blaze_double_user_data.soros_enabled ?? "1"} onChange={handleDoubleInput} /> <span className='text-white'>Soros</span>
                            </div>
                            <div>
                                <input type="checkbox" name="white_protection" defaultChecked={blaze_double_user_data.white_protection ?? false} value={blaze_double_user_data.white_protection ?? "1"} onChange={handleDoubleInput} />  <span className='text-white'>Protegido no branco</span>
                            </div>
                        </div>
                        <div className="col-12 col-md-6 col-lg-4">
                            <div className="input-group">
                                <button type="button" className="btn btn-input-group-volx" onClick={() => {
                                    if (blaze_double_user_data.bet_type == 1) setBlazeDoubleUserData({ ...blaze_double_user_data, bet_type: 2 })
                                    else setBlazeDoubleUserData({ ...blaze_double_user_data, bet_type: 1 })
                                }}>{blaze_double_user_data.bet_type ? (blaze_double_user_data.bet_type == 1 ? "$" : "%") : "$"}</button>
                                <VolxInput type="number" label="Valor da aposta" id="value_bet" name="value_bet" value={blaze_double_user_data.value_bet ?? ""} onChange={handleDoubleInput} placeholder="name" />
                            </div>
                        </div>
                        <div className="col-12 col-md-6 col-lg-4">
                            <div className="input-group">
                                <button type="button" className="btn btn-input-group-volx" onClick={() => {
                                    if (blaze_double_user_data.gain_type == 1) setBlazeDoubleUserData({ ...blaze_double_user_data, gain_type: 2 })
                                    else setBlazeDoubleUserData({ ...blaze_double_user_data, gain_type: 1 })
                                }}>{blaze_double_user_data.gain_type ? (blaze_double_user_data.gain_type == 1 ? "$" : "%") : "$"}</button>
                                <VolxInput type="number" label="limite de ganhos" id="max_gain" name="max_gain" value={blaze_double_user_data.max_gain ?? ""} onChange={handleDoubleInput} placeholder="name" />
                            </div>
                        </div>
                        <div className="col-12 col-md-6 col-lg-4">
                            <div className="input-group">
                                <button type="button" className="btn btn-input-group-volx" onClick={() => {
                                    if (blaze_double_user_data.loss_type == 1) setBlazeDoubleUserData({ ...blaze_double_user_data, loss_type: 2 })
                                    else setBlazeDoubleUserData({ ...blaze_double_user_data, loss_type: 1 })
                                }}>{blaze_double_user_data.loss_type ? (blaze_double_user_data.loss_type == 1 ? "$" : "%") : "$"}</button>
                                <VolxInput type="number" label="limite de perda" id="max_loss" name="max_loss" value={blaze_double_user_data.max_loss ?? ""} onChange={handleDoubleInput} placeholder="name" />
                            </div>
                        </div>
                        <div className="col-12 col-md-6 col-lg-4">
                            <VolxInput type="number" label="QTD margingale" id="martingale_tries" name="martingale_tries" value={blaze_double_user_data.martingale_tries ?? ""} onChange={handleDoubleInput} placeholder="name" />
                        </div>
                        <div className="col-12">
                            <h1 className="h3 text-white">Configurações do crash</h1>
                        </div>
                        <div className="col-12 d-flex gap-3">
                            <div>
                                <input type="checkbox" name="margingale_enabled" defaultChecked={blaze_crash_user_data.margingale_enabled ?? false} value={blaze_crash_user_data.margingale_enabled ?? "1"} onChange={handleCrashInput} /> <span className='text-white'>margingale</span>
                            </div>
                        </div>
                        <div className="col-12 col-md-6 col-lg-4">
                            <div className="input-group">
                                <button type="button" className="btn btn-input-group-volx" onClick={() => {
                                    if (blaze_crash_user_data.loss_type == 1) setBlazeCrashUserData({ ...blaze_crash_user_data, loss_type: 2 })
                                    else setBlazeCrashUserData({ ...blaze_crash_user_data, loss_type: 1 })
                                }}>{blaze_crash_user_data.loss_type ? (blaze_crash_user_data.loss_type == 1 ? "$" : "%") : "$"}</button>
                                <VolxInput type="number" label="Valor da aposta" id="value_bet" name="value_bet" value={blaze_crash_user_data.value_bet ?? ""} onChange={handleCrashInput} placeholder="name" />
                            </div>
                        </div>
                        <div className="col-12 col-md-6 col-lg-4">
                            <div className="input-group">
                                <button type="button" className="btn btn-input-group-volx" onClick={() => {
                                    if (blaze_crash_user_data.loss_type == 1) setBlazeCrashUserData({ ...blaze_crash_user_data, loss_type: 2 })
                                    else setBlazeCrashUserData({ ...blaze_crash_user_data, loss_type: 1 })
                                }}>{blaze_crash_user_data.loss_type ? (blaze_crash_user_data.loss_type == 1 ? "$" : "%") : "$"}</button>
                                <VolxInput type="number" label="limite de ganhos" name="max_gain" value={blaze_crash_user_data.max_gain ?? ""} onChange={handleCrashInput} placeholder="name" />
                            </div>
                        </div>
                        <div className="col-12 col-md-6 col-lg-4">
                            <div className="input-group">
                                <button type="button" className="btn btn-input-group-volx" onClick={() => {
                                    if (blaze_crash_user_data.loss_type == 1) setBlazeCrashUserData({ ...blaze_crash_user_data, loss_type: 2 })
                                    else setBlazeCrashUserData({ ...blaze_crash_user_data, loss_type: 1 })
                                }}>{blaze_crash_user_data.loss_type ? (blaze_crash_user_data.loss_type == 1 ? "$" : "%") : "$"}</button>
                                <VolxInput type="number" label="limite de perda" name="max_loss" value={blaze_crash_user_data.max_loss ?? ""} onChange={handleCrashInput} placeholder="name" />
                            </div>
                        </div>
                        <div className="col-12 col-md-6 col-lg-4">
                            <VolxInput type="number" label="QTD margingale" name="martingale_tries" value={blaze_crash_user_data.martingale_tries ?? ""} onChange={handleCrashInput} placeholder="name" />
                        </div>
                    </div>

                    <div className="col my-3 d-flex flex-row justify-content-end">
                        <button className="btn btn-volx">{btn_loading ? <Spinner className="text-white fa-sm" /> : "Salvar"}</button>
                    </div>
                </form>
            </div>
        </div >
    </main > : <div className="h-100 bg-volx"><Spinner className="text-volx" /></div>;
}

export default me;