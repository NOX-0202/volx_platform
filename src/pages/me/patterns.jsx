import { set } from 'nprogress';
import React, { useEffect } from 'react';

function patterns() {


    const [pattern, setPattern] = React.useState("");
    const [type, setType] = React.useState('color');


    return <div className="m-2">
        <h1>Padrões</h1>
        <ul className="nav nav-pills mb-3 nav-fill" id="pills-tab" role="tablist">
            <li className="nav-item" role="presentation">
                <button className="nav-link active" id="pills-home-tab" data-bs-toggle="pill" data-bs-target="#pills-home" type="button" role="tab" aria-controls="pills-home" aria-selected="true" onClick={() => { setPattern(""); setType("color") }}>COR</button>
            </li>
            <li className="nav-item" role="presentation">
                <button className="nav-link" id="pills-profile-tab" data-bs-toggle="pill" data-bs-target="#pills-profile" type="button" role="tab" aria-controls="pills-profile" aria-selected="false" onClick={() => { setPattern(""); setType("number") }}>NÚMERO</button>
            </li>
            <li className="nav-item" role="presentation">
                <button className="nav-link" id="pills-contact-tab" data-bs-toggle="pill" data-bs-target="#pills-contact" type="button" role="tab" aria-controls="pills-contact" aria-selected="false" onClick={() => { setPattern(""); setType("custom") }}>PERSONALIZADO</button>
            </li>
        </ul>
        <div className="tab-content" id="pills-tabContent">
            <div className="tab-pane fade show active" id="pills-home" role="tabpanel" aria-labelledby="pills-home-tab">
                <div className="row text-center">
                    <div className="col-4 p-3" onClick={() => setPattern(pattern += "🔴")}><button className="btn btn-outline-primary w-100">🔴</button></div>
                    <div className="col-4 p-3" onClick={() => setPattern(pattern += "⚫")}><button className="btn btn-outline-primary w-100">⚫</button></div>
                    <div className="col-4 p-3" onClick={() => setPattern(pattern += "⚪")}><button className="btn btn-outline-primary w-100">⚪</button></div>
                </div>
            </div>
            <div className="tab-pane fade" id="pills-profile" role="tabpanel" aria-labelledby="pills-profile-tab"></div>
            <div className="tab-pane fade" id="pills-contact" role="tabpanel" aria-labelledby="pills-contact-tab">
                <div className="row text-center">
                    <div className="col-4 p-3" onClick={() => setPattern(pattern += "🔴")}><button className="btn btn-outline-primary w-100">🔴</button></div>
                    <div className="col-4 p-3" onClick={() => setPattern(pattern += "⚫")}><button className="btn btn-outline-primary w-100">⚫</button></div>
                    <div className="col-4 p-3" onClick={() => setPattern(pattern += "⚪")}><button className="btn btn-outline-primary w-100">⚪</button></div>
                </div>
            </div>
        </div>
        <div className="text-muted">
            sempre separar os padrões por espaço:
        </div>
        <div className="input-group mb-3">
            <input type={"text"} className="form-control" placeholder="Digite o padrão" value={pattern.split(" ").join(",")} onChange={(e) => setPattern(e.target.value)} />
            <button className="btn btn-outline-primary" type="button">ENVIAR</button>
        </div>
    </div >;
}

export default patterns;