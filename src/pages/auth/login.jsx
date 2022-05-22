import localforage from "localforage"
import { useRouter } from "next/router"
import react, { useState, useEffect } from "react"
import Spinner from "../../components/Pageloading"
import api from "../../libs/api"
import { verifyUser } from "../../libs/verify_user"

export default function Home({ }) {
  const router = useRouter()
  const [login_form, setLoginForm] = useState({})
  const [loading, toggleLoading] = useState(false)
  const [error_message, setErrorMessage] = useState('')

  const handleInput = (e) => {
    setLoginForm({
      ...login_form,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    toggleLoading(true)
    console.log(login_form)
    api.post('/users/auth/login', login_form).then(async res => {
      console.log(res)
      if (res.data.success && res.data.data.length < 1) {
        setErrorMessage('Login ou senha incorretos')
        return;
      }

      setErrorMessage('')
      await localforage.setItem('user', res.data.data)
      router.push('/me')

    }).catch(err => {
      console.log(err)
    }).finally(() => {
      toggleLoading(false)
    })
  }

  useEffect(() => {
    console.log('home')
    localforage.getItem('user').then(user => {
      if (user) {
        router.push('/me')
      }
    }
    )
  }, [])



  return (
    <main className="bg-volx">
      <a href="/" className="text-volx fw-bold m-3 text-decoration-none"><i className="fa-light fa-arrow-left"></i> Voltar</a>
      <div className="h-100 container d-flex justify-content-center align-items-center">
        <div className="row">
          <div className="col">
            <div className="d-block mb-4">
              <img src="/assets/logo.svg" width={170} />
            </div>
            <h1 className="text-white fw-bold">Faça o login na plataforma</h1>
          </div>
          <div className="col">
            <form onSubmit={handleSubmit} className="d-flex flex-column gap-2 w-100 login-box">
              <input type="text" placeholder="email ou username" name="login" className="form-control-lg" value={login_form.login ?? ""} onChange={handleInput} />
              <input type="password" placeholder="Senha" name="password" className="form-control-lg" value={login_form.password ?? ""} onChange={handleInput} />
              <a href="/recuperar" className="text-volx text-decoration-none fw-bold text-center">Esquecei a senha</a>
              {error_message && <p className="alert alert-danger">{error_message}</p>}
              <button className="btn btn-volx d-flex flex-row justify-content-center align-items-center gap-2" style={{ height: 45 }}>ENVIAR {loading && <Spinner className={"text-white fa-xs m-0 p-0"} />} </button>
              <p className="text-center text-white fw-bold">Não tem uma conta? <span className="text-volx fw-bold"> Cadastre-se </span></p>
            </form>
          </div>
        </div>
      </div>
    </main>
  )
}
