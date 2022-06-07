import DashNav from '@/root/public/components/DashNav';
import Spinner from '@/root/src/components/Pageloading';
import api from '@/root/src/libs/api';
import axios from 'axios';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';

// import { Container } from './styles';

function double() {
    const router = useRouter();
    const [loading, setLoading] = useState(true);
    // const [page, setPage] = useState(1);
    const [history, setHistory] = useState([]);

    const getHistory = async (page) => {
        try {
            setLoading(true);
            const get_history_req = await api.get(`/bots/blaze/double/history`)
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


    return <main>
        <DashNav />
        <div className="bg-volx">
            <div className="container h-100 ">
                {/* back btn */}
                <div className="d-flex flex-column justify-content-center gap-2 py-3">
                    <a className="text-volx" onClick={() => router.back()}>
                        <i className="fas fa-arrow-left"></i> Voltar
                    </a>
                    <h1 className='text-white'>Historico double</h1>
                    <hr />
                </div>
                <div className="d-flex flex-row-reverse flex-wrap justify-content-center gap-3">
                    <div className='bg-volx h-100 d-flex justify-content-center align-items-center fw-bold py-4' style={{ padding: 10, width: 70, height: 100, fontSize: "1.5em" }}>
                        {loading ? <Spinner className="text-primary fa-sm" /> : <i className='fal fa-arrow-left text-white'></i>}
                    </div>
                    {history.reverse().map(item => (
                        <div hey={item.id} className="d-flex flex-column flex-wrap justify-content-center align-items-center">
                            <div style={{ backgroundColor: item.color == 1 ? "#f12c4c" : item.color == 2 ? "#1b1d2b" : "#fff", color: "#fff", padding: 10, width: 70, borderRadius: 6 }}>
                                <div className="d-flex flex-column flex-wrap justify-content-center align-items-center" style={{ borderRadius: "100%", border: "4px solid #fff", padding: 10, width: 50, height: 50, fontWeight: 900, fontSize: "1.5em" }}>
                                    <div>
                                        {item.roll == 0 ? <img src="/assets/white-roll.svg" className='img-fluid' /> : item.roll}
                                    </div>
                                </div>
                            </div>
                            <span className='text-white fw-bold'>{item.created_at.substring(11, 16)}</span>
                        </div>
                    ))}
                </div>
                <div className="d-flex flex-wrap justify-content-center gap-2">
                    <button className="btn btn-primary" onClick={() => setPage(page + 1)}> Ver mais </button>
                </div>
            </div>
        </div>
    </main>;
}

export default double;