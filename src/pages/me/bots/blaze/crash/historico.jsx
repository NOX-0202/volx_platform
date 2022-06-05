import DashNav from '@/root/public/components/DashNav';
import api from '@/root/src/libs/api';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';

// import { Container } from './styles';

function historico() {
    const router = useRouter();

    // const [page, setPage] = useState(1);
    const [history, setHistory] = useState([]);

    const getHistory = async (page) => {
        try {
            const get_history_req = await api.get(`/bots/blaze/crash/history`)
            console.log(get_history_req.data.data);
            setHistory(get_history_req.data.data);
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
                    {history.reverse().map(item => (
                        <div hey={item.id} className="d-flex flex-column flex-wrap justify-content-center align-items-center">
                            <div className="d-flex flex-column flex-wrap fw-bold justify-content-center align-items-center" style={{
                                padding: 10, fontSize: "1.2em", minWidth: 90,
                                backgroundColor: item.crash_point > 2 ? "#04d47c" : "#1b1d2b", borderRadius: 6,
                                color: item.crash_point > 2 ? "#006D3F" : "#fff"
                            }}>
                                {item.crash_point.toFixed(2)}x
                            </div>
                            <span className='text-white fw-bold'>{item.created_at.substring(11, 16)}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    </main >;
}

export default historico;