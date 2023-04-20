import { Link, useNavigate } from "react-router-dom"
import styled from "styled-components"
import MyWalletLogo from "../components/MyWalletLogo"
import { useState } from "react"
import axios from "axios"

export default function SignUpPage({email, setEmail, password, setPassword, name, setName}) {

  
  
  const [confirmPassword, setConfirmPassword] = useState("")
  const [disabled, setDisabled] = useState(false)
  const navigate = useNavigate()

  function submitSignUp () {
    const body = {name, email, password}
    if (!name || !email || !password || !confirmPassword) return alert("Todos os campos são obrigatório")
    if (password !== confirmPassword) return alert("A senha e confirmação são diferentes")
    setDisabled(true)

    axios.post("https://mywallet-api-a26k.onrender.com/cadastro", body)
    .then(res => {
      console.log(res)
      navigate("/")
    })
    .catch(err => {
      alert(`${err.response.data} | statuscode:${err.response.status}`)
      setDisabled(false)
      setName("")
      setEmail("")
      setPassword("")
      setConfirmPassword("")
    })
  }

  return (
    <SingUpContainer>
      <form>
        <MyWalletLogo />
        <input placeholder="Nome" onChange={(e)=>setName(e.target.value)} value={name} disabled={disabled} type="text" />
        <input placeholder="E-mail" onChange={(e)=>setEmail(e.target.value)} value={email} disabled={disabled} type="email" />
        <input placeholder="Senha" onChange={(e)=>setPassword(e.target.value)} value={password} disabled={disabled} type="password" autoComplete="new-password" />
        <input placeholder="Confirme a senha" onChange={(e)=>setConfirmPassword(e.target.value)} value={confirmPassword} disabled={disabled} type="password" autoComplete="new-password" />
        <button onClick={submitSignUp} disabled={disabled}>Cadastrar</button>
      </form>

      <Link to="/">
        Já tem uma conta? Entre agora!
      </Link>
    </SingUpContainer>
  )
}

const SingUpContainer = styled.section`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`
