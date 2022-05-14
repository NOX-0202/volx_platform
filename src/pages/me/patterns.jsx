import localforage from 'localforage';
import { useRouter } from 'next/router';
import { set } from 'nprogress';
import React, { useEffect } from 'react';
import api from '../../libs/api';

function patterns() {
    const router = useRouter();
    const [patterns, setPatterns] = React.useState([]);
    const [pattern_data, setPatternData] = React.useState({
        pattern: '',
        timestamps: null
    });
    const [type, setType] = React.useState('color');

    const getPatterns = async () => {
        api.get('/patterns').then(res => {
            setPatterns(res.data.data);
        });
    }

    const insertPattern = async (e) => {
        e.preventDefault()
        api.post('/patterns', {
            timestamps: pattern_data.timestamps,
            user_uuid: await localforage.getItem('user').then(res => res[0].uuid),
            pattern: pattern_data.pattern,
            result: pattern_data.result,
            type: type
        }).then(res => {
            getPatterns();
        });
    }

    const handleTypes = (type) => {
        setType(type);
        setPatternData({ ...pattern_data, pattern: "", timestamps: null });
    }

    const handleInput = (e) => {
        setPatternData({ ...pattern_data, [e.target.name]: e.target.value });
    }

    const handleEmoji = (color_id = null) => {

        const emojis = {
            "0": "⚪",
            "1": "⭕",
            "2": "⚫",
        }

        handleInput({ target: { name: 'pattern', value: pattern_data.pattern += color_id } });
    }

    const formatDate = (date) => {

        date = date.split("T");
        date = `${date[0].split("-").reverse().join("/")} ${date[1].split(".")[0]}`;

        return date

    }

    useEffect(() => {
        getPatterns();
    }, []);

    useEffect(() => {
        console.log(pattern_data);
    }, [pattern_data]);



    return <main>
        <div className="container-fluid container-lg d-flex flex-column p-3 gap-3">
            <div className="d-flex flex-row align-items-center gap-2">
                <button className="btn btn-sm btn-secondary" onClick={() => router.back()}>Voltar</button><span className="h1">Padrões</span>
            </div>
            <ul className="nav nav-pills mb-3 nav-fill" id="pills-tab" role="tablist">
                <li className="nav-item" role="presentation">
                    <button className="nav-link active" id="pills-home-tab" data-bs-toggle="pill" data-bs-target="#pills-home" type="button" role="tab" aria-controls="pills-home" aria-selected="true" onClick={() => { handleTypes("color") }}>COR</button>
                </li>
                <li className="nav-item" role="presentation">
                    <button className="nav-link" id="pills-profile-tab" data-bs-toggle="pill" data-bs-target="#pills-profile" type="button" role="tab" aria-controls="pills-profile" aria-selected="false" onClick={() => { handleTypes("number") }}>NÚMERO</button>
                </li>
                {/* <li className="nav-item" role="presentation">
                    <button className="nav-link" id="pills-contact-tab" data-bs-toggle="pill" data-bs-target="#pills-contact" type="button" role="tab" aria-controls="pills-contact" aria-selected="false" onClick={() => { handleTypes("custom") }}>PERSONALIZADO</button>
                </li> */}
            </ul>

            <p className="text-muted mb-3 text-uppercase">sempre separar os padrões por espaço:</p>
            <form onSubmit={insertPattern}>
                <div className="row g-3">
                    <div className="col-12 col-md-8">
                        <div className="input-group">
                            <input type={"text"} readOnly={type == 'color' ? true : false} className="form-control" name="pattern" placeholder="Digite o padrão" value={pattern_data.pattern.split(" ").join(",")} onChange={handleInput} />
                            <select name="result" value={pattern_data.result ?? ''} onChange={handleInput} style={{ width: 100 }}>
                                <option value="">Resultado</option>
                                <option value="0">⚪</option>
                                <option value="1">🔴</option>
                                <option value="2">⚫</option>
                            </select>
                            <div className="btn btn-danger" onClick={() => setPatternData({ ...pattern_data, pattern: '' })}> X </div>
                        </div>
                    </div>

                    <div className="col-12 col-md-4 d-flex flex-row gap-3">
                        <input type="datetime-local" name="timestamps" className="form-control" value={pattern_data.timestamps ?? ''} onChange={handleInput} step="1" />
                        <button className="btn btn-outline-primary" type="submit">ENVIAR</button>
                    </div>
                </div>
            </form>

            <div className="tab-content" id="pills-tabContent">
                <div className="tab-pane fade show active" id="pills-home" role="tabpanel" aria-labelledby="pills-home-tab">
                    <div className="row text-center">
                        <div className="col-4 p-3" onClick={() => handleEmoji('1')}><button className="btn btn-outline-primary w-100">🔴</button></div>
                        <div className="col-4 p-3" onClick={() => handleEmoji('2')}><button className="btn btn-outline-primary w-100">⚫</button></div>
                        <div className="col-4 p-3" onClick={() => handleEmoji('0')}><button className="btn btn-outline-primary w-100">⚪</button></div>
                    </div>
                </div>
                <div className="tab-pane fade" id="pills-profile" role="tabpanel" aria-labelledby="pills-profile-tab"></div>
                <div className="tab-pane fade" id="pills-contact" role="tabpanel" aria-labelledby="pills-contact-tab">
                    <div className="row text-center">
                        <div className="col-4 p-3" onClick={() => handleEmoji('1')}><button className="btn btn-outline-primary w-100">🔴</button></div>
                        <div className="col-4 p-3" onClick={() => handleEmoji('2')}><button className="btn btn-outline-primary w-100">⚫</button></div>
                        <div className="col-4 p-3" onClick={() => handleEmoji('0')}><button className="btn btn-outline-primary w-100">⚪</button></div>
                    </div>
                </div>
            </div>


            <table className="table">
                <thead>
                    <tr>
                        <th>tipo</th>
                        <th>Padrão</th>
                        <th>Resultado</th>
                        <th>Data</th>
                    </tr>
                </thead>
                <tbody>
                    {patterns.length > 0 && patterns.map(pattern => {

                        let date = "";

                        if (pattern.timestamp) date = formatDate(pattern.timestamp);

                        return <tr key={pattern.id}>
                            <td className="w-20">{pattern.type}</td>
                            <td className="w-50">{pattern.pattern}</td>
                            <td className="w-20">{pattern.result == 0 ? '⚪' : pattern.result == 1 ? '🔴' : '⚫'}</td>
                            <td className="w-30">{date}</td>
                        </tr>
                    })}
                </tbody>
            </table>
        </div>
    </main >;
}

export default patterns;