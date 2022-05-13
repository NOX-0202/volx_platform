import localforage from "localforage"
import { useRouter } from "next/router"
import react, { useState } from "react"
import api from "../libs/api"

export default function Home({ }) {
  const router = useRouter()
  const [login_form, setLoginForm] = useState({})

  const handleInput = (e) => {
    setLoginForm({
      ...login_form,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log(login_form)
    api.post('/users/auth', login_form).then(async res => {
      if (res.data.success && res.data.data === 1) {
        await localforage.setItem('user', res.data.data)
        router.push('/me')
      }
    })
  }


  return (
    <main style={{ height: "100vh" }} className="border">
      <div className="h-100 d-flex flex-column container justify-content-center align-items-center">
        <h1>Blaze Bot</h1>
        <form onSubmit={handleSubmit} className="d-flex flex-column gap-2">
          <input type="text" placeholder="email ou username" name="login" className="form-control" value={login_form.login ?? ""} onChange={handleInput} />
          <input type="password" placeholder="Senha" name="password" className="form-control" value={login_form.password ?? ""} onChange={handleInput} />
          <button className="btn btn-success">ENVIAR</button>
        </form>
      </div>
    </main>
  )
}
