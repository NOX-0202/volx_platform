import { set } from 'nprogress';
import React, { useEffect } from 'react';
import api from '../../libs/api';

function patterns() {

    const [pattern_data, setPatternData] = React.useState({
        pattern: '',
    });
    const [type, setType] = React.useState('color');

    const getPatterns = async () => {
        api.get('/patterns').then(res => {
            console.log(res)
            // setPatternData(res.data);
        });
    }

    const insertPattern = async (e) => {
        e.preventDefault()
        console.log(pattern_data)
        api.post('/patterns', {
            timestamps: pattern_data.timestamps,
            pattern: pattern_data.pattern,
            type: type
        }).then(res => {
            getPatterns();
        });
    }

    const handleTypes = (type) => {
        setType(type);
        setPatternData({ ...pattern_data, pattern: "" });
    }

    const handleInput = (e) => {
        setPatternData({ ...pattern_data, [e.target.name]: e.target.value });
    }

    useEffect(() => {
        getPatterns();
    }, []);



    return <main className="">
        <div className="container-fluid container-lg d-flex flex-column p-3 gap-3">
            <h1>Padrões</h1>
            <ul className="nav nav-pills mb-3 nav-fill" id="pills-tab" role="tablist">
                <li className="nav-item" role="presentation">
                    <button className="nav-link active" id="pills-home-tab" data-bs-toggle="pill" data-bs-target="#pills-home" type="button" role="tab" aria-controls="pills-home" aria-selected="true" onClick={() => { handleTypes("color") }}>COR</button>
                </li>
                <li className="nav-item" role="presentation">
                    <button className="nav-link" id="pills-profile-tab" data-bs-toggle="pill" data-bs-target="#pills-profile" type="button" role="tab" aria-controls="pills-profile" aria-selected="false" onClick={() => { handleTypes("number") }}>NÚMERO</button>
                </li>
                <li className="nav-item" role="presentation">
                    <button className="nav-link" id="pills-contact-tab" data-bs-toggle="pill" data-bs-target="#pills-contact" type="button" role="tab" aria-controls="pills-contact" aria-selected="false" onClick={() => { handleTypes("custom") }}>PERSONALIZADO</button>
                </li>
            </ul>

            <p className="text-muted mb-3 text-uppercase">sempre separar os padrões por espaço:</p>
            <form onSubmit={insertPattern}>
                <div className="row g-3">
                    <div className="col-12 col-md-8">
                        <div className="input-group">
                            <input type={"text"} readOnly={type == 'color' ? true : false} className="form-control" name="pattern" placeholder="Digite o padrão" value={pattern_data.pattern.split(" ").join(",")} onChange={(e) => setPatternData({ ...pattern_data, pattern: e.target.value })} />
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
                        <div className="col-4 p-3" onClick={() => setPatternData({ ...pattern_data, pattern: pattern_data.pattern + "🔴" })}><button className="btn btn-outline-primary w-100">🔴</button></div>
                        <div className="col-4 p-3" onClick={() => setPatternData({ ...pattern_data, pattern: pattern_data.pattern + "⚫" })}><button className="btn btn-outline-primary w-100">⚫</button></div>
                        <div className="col-4 p-3" onClick={() => setPatternData({ ...pattern_data, pattern: pattern_data.pattern + "⚪" })}><button className="btn btn-outline-primary w-100">⚪</button></div>
                    </div>
                </div>
                <div className="tab-pane fade" id="pills-profile" role="tabpanel" aria-labelledby="pills-profile-tab"></div>
                <div className="tab-pane fade" id="pills-contact" role="tabpanel" aria-labelledby="pills-contact-tab">
                    <div className="row text-center">
                        <div className="col-4 p-3" onClick={() => setPatternData({ ...pattern_data, pattern: pattern_data.pattern + "🔴" })}><button className="btn btn-outline-primary w-100">🔴</button></div>
                        <div className="col-4 p-3" onClick={() => setPatternData({ ...pattern_data, pattern: pattern_data.pattern + "⚫" })}><button className="btn btn-outline-primary w-100">⚫</button></div>
                        <div className="col-4 p-3" onClick={() => setPatternData({ ...pattern_data, pattern: pattern_data.pattern + "⚪" })}><button className="btn btn-outline-primary w-100">⚪</button></div>
                    </div>
                </div>
            </div>


            <table className="table table-stripped">
                <thead>
                    <tr>
                        <th>tipo</th>
                        <th>Padrão</th>
                        <th>Data</th>
                    </tr>
                </thead>
            </table>
        </div>
    </main >;
}

export default patterns;