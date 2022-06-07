import DashNav from '@/root/public/components/DashNav';
import Spinner from '@/root/src/components/Pageloading';
import api from '@/root/src/libs/api';
import { addHours } from '@/root/src/libs/utils';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';

// import { Container } from './styles';

function historico() {
    const router = useRouter();
    const [loading, setLoading] = useState(true);
    // const [page, setPage] = useState(1);
    const [history, setHistory] = useState([]);

    const getHistory = async (page) => {
        try {
            setLoading(true);
            const get_history_req = await api.get(`/bots/blaze/crash/history`)
            console.log(get_history_req.data.data);
            setHistory(get_history_req.data.data);
            setLoading(false);
        } catch (error) {
            console.log(error);
        }
    }


    useEffect(() => {
        (async () => {
            await getHistory()
            setInterval(async () => {
                await getHistory()
            }, 15000);

        })();
    }, [])
    return <main className='h-100 bg-volx'>
        <DashNav />
        <div className="bg-volx">
            <div className="container">
                <div className="d-flex flex-column justify-content-center gap-2 py-3">
                    <a className="text-volx" onClick={() => router.back()}>
                        <i className="fas fa-arrow-left"></i> Voltar
                    </a>
                    <h1 className='text-white'>Historico Crash</h1>
                    <hr />
                </div>
            </div>

            <div className="container">
                <div className="d-flex flex-row-reverse flex-wrap justify-content-center gap-3">
                    <div className='bg-volx h-100 d-flex justify-content-center align-items-center fw-bold py-3' style={{ width: 90, height: 40, fontSize: "1.5em" }}>
                        {loading ? <div className='bg-volx h-100'><Spinner className="text-primary" /></div> : <i className='fal fa-arrow-left text-white'></i>}
                    </div>
                    {history.reverse().map(item => (
                        <div hey={item.id} className="d-flex flex-column flex-wrap justify-content-center align-items-center">
                            <div className="d-flex flex-column flex-wrap fw-bold justify-content-center align-items-center" style={{
                                padding: 10, fontSize: "1.2em", minWidth: 90,
                                backgroundColor: item.crash_point > 2 ? "#04d47c" : "#1b1d2b", borderRadius: 6,
                                color: item.crash_point > 2 ? "#006D3F" : "#fff"
                            }}>
                                {item.crash_point.toFixed(2)}x
                            </div>
                            <span className='text-white fw-bold'>{addHours(item.created_at, 6).substring(11, 16)}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    </main >;
}

export default historico;