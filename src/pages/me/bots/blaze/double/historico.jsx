import api from '@/root/src/libs/api';
import axios from 'axios';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';

// import { Container } from './styles';

function double() {
    const router = useRouter();

    // const [page, setPage] = useState(1);
    const [history, setHistory] = useState([]);

    const getHistory = async (page) => {
        try {
            const get_history_req = await api.get(`/bots/blaze/double/history?page=${page}`)
            history.push(...get_history_req.data.records);
            setHistory([...history]);
        } catch (error) {
            console.log(error);
        }
    }


    useEffect(() => {
        (async () => {
            [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(async (page) => {
                await getHistory(page)
            })
        })();
    }, [])


    return <main>
        <div className="container">
            {/* back btn */}
            <div className="d-flex flex-row align-items-center gap-3">
                <button className="btn btn-secondary" onClick={() => router.back()}>
                    <i className="fas fa-arrow-left"></i> Voltar
                </button>
                <h1>Historico</h1>

            </div>
            <hr />
            <div className="d-flex flex-wrap justify-content-center gap-3">
                {history.reverse().map(item => (
                    <div hey={item.id} className="d-flex flex-column flex-wrap justify-content-center align-items-center">
                        {item.created_at.substring(11, 19)}
                        <div style={{ backgroundColor: item.color == 1 ? "#f12c4c" : item.color == 2 ? "#1b1d2b" : "#fff", color: "#fff", padding: 10, width: 70, borderRadius: 6 }}>
                            <div className="d-flex flex-column flex-wrap justify-content-center align-items-center" style={{ borderRadius: "100%", border: "4px solid #fff", padding: 10, width: 50, height: 50, fontWeight: 900, fontSize: "1.5em" }}>
                                <div>
                                    {item.roll == 0 ? <img src="/assets/white-roll.svg" /> : item.roll}
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <div className="d-flex flex-wrap justify-content-center gap-2">
                <button className="btn btn-primary" onClick={() => setPage(page + 1)}> Ver mais </button>
            </div>

        </div>
    </main>;
}

export default double;