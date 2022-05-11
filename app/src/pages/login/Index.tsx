import "./style.css"
import { useContext, useState } from 'react';
import { UserContext } from "../../context/userContext";

function Login() {

  const { signIn, error } = useContext(UserContext)

  const [username, setUsername] = useState("demo")
  const [password, setPassword] = useState("demo")

  return (
    <section className="vh-100">
      <div className="container py-5 h-100">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col-12 col-md-8 col-lg-6 col-xl-5">
            <div className="card shadow-2-strong" style={{ borderRadius: "1rem" }}>
              <div className="card-body p-5">

                <h3 className="mb-5">Entrar</h3>

                <div className="form-outline mb-4">
                  <label className="form-label" htmlFor="typeEmailX-2">Username</label>
                  <input type="text" id="typeEmailX-2" className="form-control form-control-lg"
                    onChange={event => setUsername(event.target.value)} value={username} />
                </div>

                <div className="form-outline mb-4">
                  <label className="form-label" htmlFor="typePasswordX-2">Senha</label>
                  <input type="password" id="typePasswordX-2" className="form-control form-control-lg"
                    onChange={event => setPassword(event.target.value)} value={password} />
                </div>
                <p style={{ color: "red" }}>
                  {error}
                </p>

                <button className="btn btn-primary btn-lg btn-block" onClick={_ => signIn(username, password)}>
                  Login
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Login;
