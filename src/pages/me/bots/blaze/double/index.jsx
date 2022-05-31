import DashNav from '@/root/public/components/DashNav';
import Spinner from '@/root/src/components/Pageloading';
import api from '@/root/src/libs/api';
import { verifyUser } from '@/root/src/libs/verify_user';
import axios from 'axios';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';

// import { Container } from './styles';

function bots() {
    const router = useRouter();
    const [loading, toggleLoading] = useState(true);
    const [btn_loading, toggleBtnLoading] = useState(false);
    const [blaze_data, setBlazeData] = useState({});
    const [bot_active, setBotActive] = useState(false);
    const [user, setUser] = useState({});

    const getBlazeConfig = async (userdata) => {
        try {
            toggleLoading(true);
            const response = await api.get('/bots/double?user_uuid=' + userdata.uuid);
            console.log(response)
            setBlazeData(response.data.data[0] ?? {});
        } catch (error) {
            toggleLoading(false);
        }
        toggleLoading(false);
    };

    const changeBotActivity = async (userdata, activity) => {
        try {
            toggleBtnLoading(true);
            const response = await api.post('/bots/double', {
                user_uuid: userdata.uuid,
                active: activity
            });
            const [bot_active, setBotActive] = useState(false);
            setBlazeData(response.data.data[0] ?? {});
        } catch (error) {
            toggleBtnLoading(false);
        }
        toggleBtnLoading(false);
    };

    const handleInput = (e) => setBlazeData({ ...blaze_data, [e.target.name]: e.target.value })

    const handleSubmit = (e) => {
        e.preventDefault()
        toggleBtnLoading(true)
        console.log(blaze_data)
        delete blaze_data.created_at
        api.post(`/bots/double?user_uuid=${user.uuid}`, blaze_data).then(async res => {
            console.log(res)

        }).catch(err => {
            console.log(err)
        }
        ).finally(() => {
            toggleBtnLoading(false)
        })
    }

    useEffect(() => {
        console.log('me');
        verifyUser().then(async user => {
            console.log(user)
            setUser(user[0])
            getBlazeConfig(user[0])
        })

    }, []);


    return loading ? <Spinner className="text-primary" /> : <main>
        <DashNav title="Double Bot" />
        <div className="container mt-3">
            <a href="/me" className="text-volx fw-bold text-decoration-none"><i className="fa-light fa-arrow-left"></i> Voltar</a>
            <div className="d-flex flex-row align-items-center gap-3 my-3">
                <button className="btn btn-primary w-100 text-uppercase" onClick={() => changeBotActivity()}>{!bot_active ? "Iniciar Bot" : "Parar bot"}</button>
            </div>

            <h2>Configurações</h2>
            <hr />

        </div>
    </main>;
}

export default bots;