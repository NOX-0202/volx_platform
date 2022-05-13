import react from "react"

export default function Home() {
  return (
    <main style={{ height: "100vh" }} className="border">
      <div className="h-100 d-flex flex-column container justify-content-center align-items-center">
        <h1>Blaze Bot</h1>
        <div className="d-flex flex-column gap-2" style={{ width: "40%" }}>
          <input type="text" placeholder="email ou username" className="form-control" />
          <input type="password" placeholder="Senha" className="form-control" />
          <button className="btn btn-success">ENVIAR</button>
        </div>
      </div>
    </main>
  )
}
