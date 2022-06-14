import Header from '@/root/public/components/Header';
import VolxInput from '@/root/public/components/VolxInput';

import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import api from '../../libs/api';
import { extractInt, floatMask, mask, priceMask } from '../../libs/utils';

// import { Container } from './styles';

function payment() {
    const router = useRouter();
    const [loading, setLoading] = useState(true);

    const [form_data, setFormData] = useState({});
    const [togglePillNav, toggleNavPills] = useState(null);
    const [billing_url, setBillingUrl] = useState(null);

    const [product, setProduct] = useState({});

    const [pay_form, setPayForm] = useState({
        price: 0.0
    });
    const [loading_register_form, toggleLoadingRegisterForm] = useState(false);

    const submitForm = async (event) => {
        event.preventDefault();
        toggleLoadingRegisterForm(true);

        // await Api.post(`/register`, form_data).then(({ data }) => {
        //     setFormStep(2)
        //     console.log('suucesss')
        //     let transactions = data.transaction_data
        //     let user = data.user_data

        //     console.log(user)

        //     pay_form.id_transaction = transactions.data.insertId
        //     pay_form.price = data.price
        //     pay_form.service_id = form_data.service
        //     pay_form.user_id = user.data.insertId
        //     pay_form.asaas_id = data.asaas_id

        //     setPayForm({ ...pay_form })
        // }).catch(error => console.log(error)).finally(() => {
        //     toggleLoadingRegisterForm(false);
        // })
    }

    const pay = async e => {
        e.preventDefault()
        toggleLoadingRegisterForm(true);
        console.log(pay_form)

        // Api.post('/endcheckout', { pay_form, form_data }).then(async (res) => {
        //     const data = res.data;
        //     console.log(data)
        //     switch (data.type) {
        //         case 'BOLETO':
        //             setBillingUrl(data.data.url)
        //             break;
        //         case 'PIX':
        //             setBillingUrl(data.data.url)
        //             break;
        //         case 'CREDIT_CARD':

        //             break;
        //         default:
        //             break;
        //     }
        // }).catch(err => console.log(err)).finally(() => {
        //     toggleLoadingRegisterForm(false);
        // })



    }

    const registerFormHandler = (event) => {
        let { name, value } = event.target;


        if (name === 'price') value = floatMask(value).toPrecision(2);
        if (name === "customer_document") value = mask("###.###.###-##", extractInt(value).substr(0, 11));
        if (name === "birthdate") value = mask("##/##/####", extractInt(value).substr(0, 8));

        setFormData({ ...form_data, [name]: value });
    };

    const registerPayFormHandler = (event) => {
        let { name, value } = event.target;

        if (name === "card_number") value = mask("#### #### #### ####", extractInt(value).substr(0, 16))
        if (name === "card_cvv") value = extractInt(value).substr(0, 3)

        console.log(name, value)

        setPayForm({ ...pay_form, [name]: value });
    };

    const handleMask = (value, pattern, el) => {
        console.clear();

        console.log(this);

        if (pattern === "document") {
            value = extractInt(value);
            console.log(value.length);
            if (value.length <= 11) pattern = "###.###.###-##";
            else pattern = "##.###.###/####-##";

            if (el) el.maxLength = 20;
        }

        if (pattern === "phone") {
            value = extractInt(value);
            console.log(value.length);
            if (value.length > 10) pattern = "(##) #####-####";
            else pattern = "(##) ####-####";

            if (el) el.maxLength = 15;
        }

        if (pattern === "cep") {
            value = extractInt(value);
            console.log(value.length);
            if (value.length > 10) pattern = "(##) #####-####";
            else pattern = "(##) ####-####";

            if (el) el.maxLength = 15;
        }

        const masked_value = mask(pattern, value);

        if (el) el.value = masked_value;
        return masked_value;
    }

    useEffect(() => {
        (async () => {
            setLoading(true);
            if (router.query.product_uuid) {
                const get_product = await api.get(`/products?uuid=${router.query.product_uuid}`)
                if (get_product.data.success && get_product.data.rows == 1) {
                    console.log('get_product', get_product.data.data[0])
                    setProduct(get_product.data.data[0]);
                    setLoading(false);
                }
                setLoading(false);
            }
        })()
    }, [router.query]);


    return <main className='bg-volx pb-5'>
        <Header />
        <div className="container">
            {loading ?
                <div className="d-flex justify-content-center my-5">
                    <div className="spinner-border text-volx" role="status">
                        <span className="sr-only">Loading...</span>
                    </div>
                </div>
                : <>
                    <div className="row">
                        <div className="col-md-6">
                            <div className="container mt-4">
                                <h3 className='h3 text-white'>Informações do produto:</h3>
                                {/* center image */}
                                <div className="d-flex flex-column align-items-center gap-3 mt-5">
                                    <img src={product.thumbnail} className="img-fluid w-50 rounded-circle" />
                                    <p className="text-white fw-bold text-uppercase">{product.title}</p>
                                    <p className="text-white">{product.description}</p>
                                </div>
                                <div className="container d-flex flex-row justify-content-between align-items-center pt-3 border-top border-bottom">
                                    <p className="text-white fw-bold text-uppercase">VALOR</p>
                                    <p className="text-white">R$ {priceMask(product.unit_price.toFixed(2))}</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="my-4">
                                <h3 className='h3 text-white'>Informe seus dados</h3>
                            </div>
                            <form onSubmit={submitForm}>
                                <fieldset className="row g-2 justify-content-start align-items-start">
                                    <div className="col-12 col-md-6">
                                        <VolxInput type="tel" label="CPF" name="customer_document" id="customer_document" value={form_data.customer_document} onChange={registerFormHandler} placeholder="CPF" pattern="[0-9.\-]*" required />
                                    </div>
                                    <div className="col-12 col-md-6">
                                        <VolxInput type="tel" label="Nascimento" name="birthdate" id="birthdate" value={form_data.birthdate} onChange={registerFormHandler} placeholder="CPF" pattern="[0-9.\-]*" required />
                                    </div>
                                    <div className="col-md-12">
                                        <VolxInput type="text" label="Nome" placeholder="Nome" name="name" id="customer_name" required value={form_data.name} onChange={registerFormHandler} />
                                    </div>
                                    <div className="col-md-6">
                                        <VolxInput type="text" label="E-mail" name="email" placeholder="E-mail" id="customer_email" required value={form_data.email} onChange={registerFormHandler} />
                                    </div>

                                    <div className="col-12 col-md-6">
                                        <VolxInput type="tel" label="Telefone" name="phone" inputMode="numeric" placeholder="Telefone" value={form_data.phone} onChange={registerFormHandler} id="customer_phone" onKeyUp={(event) => handleMask(event.target.value, "phone", event.target)} required />
                                    </div>
                                </fieldset>
                            </form>
                            <div className="my-4">
                                <p className="h4 text-white">Selecione a forma de pagamento:</p>
                            </div>
                            <form onSubmit={pay} className="mt-2">
                                <ul className="nav nav-pills nav-fill">
                                    <li className="nav-item">
                                        <button className="nav-link active" id="pills-home-tab" data-bs-toggle={togglePillNav ?? "pill"} data-bs-target="#pills-home" type="button" role="tab" aria-controls="pills-home" aria-selected="false" onClick={() => { setPayForm({ ...pay_form, type: 'BOLETO' }) }}>
                                            Boleto
                                        </button>
                                    </li>
                                    <li className="nav-item">
                                        <button className="nav-link" id="pills-profile-tab" data-bs-toggle={togglePillNav ?? "pill"} data-bs-target="#pills-profile" type="button" role="tab" aria-controls="pills-profile" aria-selected="false" onClick={() => setPayForm({ ...pay_form, type: 'PIX' })}>
                                            PIX
                                        </button>
                                    </li>
                                    <li className="nav-item">
                                        <button className="nav-link" id="pills-contact-tab" data-bs-toggle={togglePillNav ?? "pill"} data-bs-target="#pills-contact" type="button" role="tab" aria-controls="pills-contact" aria-selected="true" onClick={() => setPayForm({ ...pay_form, type: 'CREDIT_CARD' })}>
                                            Cartão de crédito
                                        </button>
                                    </li>
                                </ul>
                                <div className="tab-content" id="pills-tabContent">
                                    <div className="tab-pane fade show active" id="pills-home" role="tabpanel" aria-labelledby="pills-home-tab">
                                        {/* Boleto form */}
                                        <div className="col-12 mt-4">
                                            {billing_url ? <>
                                                <p className=" mt-3 alert alert-success text-center"> boleto gerado com sucesso! </p>
                                                <a href={billing_url} className="alert-link" target="_blank">
                                                    <button type="button" className={`btn btn-volx btn-lg text-uppercase fw-bolder mt-3 px-5 rounded-pill w-100 shadow-sm ${loading_register_form && "disabled"}`} onClick={() => toggleNavPills(false)}>
                                                        Imprimir boleto {loading_register_form ? <i className="fad fa-spinner-third fa-spin ms-2" /> : <i className="fad fa-arrow-right ms-2" />}
                                                    </button>
                                                </a>

                                            </> : <>
                                                <button type="submit" className={`btn btn-volx btn-lg text-uppercase fw-bolder mt-3 px-5 rounded-pill w-100 shadow-sm ${loading_register_form && "disabled"}`} onClick={() => toggleNavPills(false)}>
                                                    Gerar boleto {loading_register_form ? <i className="fad fa-spinner-third fa-spin ms-2" /> : <i className="fad fa-arrow-right ms-2" />}
                                                </button>

                                            </>}
                                        </div>


                                    </div>
                                    <div className="tab-pane fade" id="pills-profile" role="tabpanel" aria-labelledby="pills-profile-tab">
                                        {/* PIX form */}
                                        {billing_url && <>
                                            <div className="text-center my-5">
                                                <img src={billing_url} alt="qrcode" />
                                            </div>
                                        </>}
                                        <div className="col-12 my-4">
                                        </div>
                                        <button type="submit" className={`btn btn-volx btn-lg text-uppercase fw-bolder mt-3 px-5 rounded-pill w-100 shadow-sm ${loading_register_form && "disabled"}`} onClick={() => { toggleNavPills(false) }}>
                                            Gerar qrcode {loading_register_form ? null : <i className="fad fa-arrow-right ms-2" />}
                                        </button>
                                    </div>
                                    <div className="tab-pane fade" id="pills-contact" role="tabpanel" aria-labelledby="pills-contact-tab">
                                        {/* credit card */}
                                        {pay_form.type == "CREDIT_CARD" && <>
                                            <div className="row ">
                                                <div className="col-md-12 mt-2">
                                                    <VolxInput type="text" label="Número do cartão" className="form-control" name="card_number" placeholder="Número do cartão" id="card_number" required value={pay_form.card_number ?? ""} onChange={registerPayFormHandler} />
                                                </div>
                                                <div className="col-md-12 mt-2">
                                                    <VolxInput type="text" label="Nome do titular do cartão" className="form-control" placeholder="Nome do titular do cartão" name="card_name_customer" id="card_name_customer" required value={pay_form.card_name_customer ?? ""} onChange={registerPayFormHandler} />
                                                </div>
                                                <div className="col-md-6 mt-2">
                                                    <VolxInput type="month" label="Data de validade" className="form-control" name="card_expiration_date" id="card_expiration_date" required value={pay_form.card_expiration_date ?? ""} onChange={registerPayFormHandler} />
                                                </div>
                                                <div className="col-md-6 mt-2">
                                                    <VolxInput type="number" label="CVV" className="form-control" name="card_cvv" id="card_cvv" required value={pay_form.card_cvv ?? ""} onChange={registerPayFormHandler} />
                                                </div>
                                            </div>
                                        </>}
                                        <footer>
                                            <button type="submit" className={`btn btn-volx btn-lg text-uppercase fw-bolder mt-3 px-5 rounded-pill w-100 shadow-sm ${loading_register_form && "disabled"}`}>
                                                Finalizar {loading_register_form ? <i className="fad fa-spinner-third fa-spin ms-2" /> : <i className="fad fa-arrow-right ms-2" />}
                                            </button>
                                        </footer>
                                    </div>

                                </div>
                            </form>
                        </div>
                    </div>
                </>}
        </div>
    </main >;
}

export default payment;