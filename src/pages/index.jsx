import localforage from "localforage"
import { useRouter } from "next/router"
import react, { useState } from "react"
import Spinner from "../components/Pageloading"
import api from "../libs/api"

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
    api.post('/users/auth', login_form).then(async res => {
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


  return (
    <main style={{ height: "100vh" }} className="border">
      <div className="h-100 d-flex flex-column container justify-content-center align-items-center">
        <h1>Blaze Bot</h1>
        <form onSubmit={handleSubmit} className="d-flex flex-column gap-2 w-100" style={{ maxWidth: 550 }}>
          <input type="text" placeholder="email ou username" name="login" className="form-control" value={login_form.login ?? ""} onChange={handleInput} />
          <input type="password" placeholder="Senha" name="password" className="form-control" value={login_form.password ?? ""} onChange={handleInput} />
          {error_message && <p className="alert alert-danger">{error_message}</p>}
          <button className="btn btn-success d-flex flex-row justify-content-center align-items-center gap-2" style={{ height: 40 }}>ENVIAR {loading && <Spinner className={"text-white fa-xs m-0 p-0"} />} </button>
        </form>
      </div>
    </main>
  )
}
