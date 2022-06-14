import Head from 'next/head';
import React from 'react';

const pkg = require("@/root/package.json");

export default function Header({ title, hide, className, loggedIn, ...props }) {
    return <>
        <Head>
            <title>{title || pkg.description}</title>
        </Head>
        {!hide && <header className={`navbar navbar-expand-lg navbar-dark bg-volx ${className}`}>
            <div className="container">
                <a className="navbar-brand" href="#">
                    <img src="/assets/logo.svg" alt="Volx Logo" width={75} />
                </a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <nav className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav">
                        <li className="nav-item active">
                            <a className="nav-link" href="/dashboard">Home <span className="sr-only">(current)</span></a>
                        </li>
                        <li className="nav-item active">
                            <a className="nav-link" href="/dashboard/usuarios">Usuários</a>
                        </li>
                        <li className="nav-item dropdown">
                            <a className="nav-link dropdown-toggle" id="navbarDarkDropdownMenuLink" data-bs-toggle="dropdown">
                                páginas
                            </a>
                            <ul className="dropdown-menu dropdown-menu" aria-labelledby="navbarDarkDropdownMenuLink">
                                <li><a className="dropdown-item" href="/dashboard/posts">Posts</a></li>
                                <li><a className="dropdown-item" href="/dashboard/posts/tipos">Modelos</a></li>
                                <li><a className="dropdown-item" href="/dashboard/posts/categorias">Categorias</a></li>
                            </ul>
                        </li>
                        <li className="nav-item dropdown">
                            <a className="nav-link dropdown-toggle" id="navbarDarkDropdownMenuLink" data-bs-toggle="dropdown">
                                Produtos
                            </a>
                            <ul className="dropdown-menu dropdown-menu" aria-labelledby="navbarDarkDropdownMenuLink">
                                <li><a className="dropdown-item" href="/dashboard/produtos">Produtos</a></li>
                                <li><a className="dropdown-item" href="/dashboard/produtos/marcas">Marcas</a></li>
                                <li><a className="dropdown-item" href="/dashboard/produtos/categorias">Categorias</a></li>
                                <li><a className="dropdown-item" href="/dashboard/produtos/departamentos">Departamentos</a></li>
                            </ul>
                        </li>
                    </ul>
                </nav>
            </div>
        </header>
        }
    </>
}
