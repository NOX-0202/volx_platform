import api from '@/root/src/libs/api';
import axios from 'axios';
import React, { useEffect, useState } from 'react';

// import { Container } from './styles';

function double() {

    const [page, setPage] = useState(1);
    const [history, setHistory] = useState([]);

    useEffect(() => {
        (async () => {
            api.get(`/bots/history?page=${page}`).then(res => {
                console.log(res)
                setHistory(res.data.records);
            });
        })();
    }, [])

    return <main>
        <h1>Historico</h1>
        <div className="d-flex flex-wrap justify-content-center gap-2">
            {history.map(item => (
                <div hey={item.id} className="d-flex flex-column flex-wrap justify-content-center align-items-center">
                    {item.created_at.substring(14, 19)}
                    <div style={{ backgroundColor: item.color == 1 ? "#f12c4c" : item.color == 2 ? "#1b1d2b" : "#fff", color: "#fff", padding: 10, width: 70, borderRadius: 6 }}>
                        <div className="d-flex flex-column flex-wrap justify-content-center align-items-center" style={{ borderRadius: "100%", border: "4px solid #fff", padding: 10, width: 50, height: 50, fontWeight: 900, fontSize: "1.5em" }}>
                            <div>
                                {item.roll}
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    </main>;
}

export default double;