import styled from "styled-components"
import { Link, useNavigate } from "react-router-dom"
import MyWalletLogo from "../components/MyWalletLogo"
import axios from "axios"
import { useState } from "react"

export default function SignInPage({email, setEmail, password, setPassword}) {

  const [disabled, setDisabled] = useState(false)
  const navigate = useNavigate()

  function clickSignIn () {
    if (!email) return alert("É necessário informar o email para realizar o login")
    if (!password) return alert("É necessário informar a senha para realizar o login")
    const body = {email, password}
    setDisabled(true)
    axios.post(`${process.env.REACT_APP_API_URL}/login`, body)
    .then(res=>{
      console.log(res)
      localStorage.setItem("access_token", res.data)
      navigate("/home")
    })
    .catch(err=>{
      alert(`${err.response.data} | statuscode:${err.response.status}`)
      setDisabled(false)
    })
  }

  return (
    <SingInContainer>
      <form>
        <MyWalletLogo />
        <input placeholder="E-mail" onChange={(e)=>setEmail(e.target.value)} value={email} disabled={disabled} type="email" />
        <input placeholder="Senha" onChange={(e)=>setPassword(e.target.value)} value={password} type="password" disabled={disabled} autoComplete="new-password" />
        <button onClick={clickSignIn} disabled={disabled}>Entrar</button>
      </form>

      <Link to="/cadastro">
        Primeira vez? Cadastre-se!
      </Link>
    </SingInContainer>
  )
}

const SingInContainer = styled.section`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`
