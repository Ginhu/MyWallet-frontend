import { useNavigate, useParams } from "react-router-dom"
import styled from "styled-components"
import { useEffect, useState } from "react"
import axios from "axios"

export default function TransactionsPage() {
  const {tipo} = useParams
  const navigate = useNavigate()
  const [description, setDescription] = useState("")
  const [value, setValue] = useState("")

  useEffect(()=>{
    axios.defaults.headers.common["Authorization"] = `Bearer ${localStorage.getItem("access_token")}`
    axios.get("https://mywallet-api-a26k.onrender.com/login")
    .then(res => {
      if (res.status === 401) {
        alert("Deslogado da aplicação!")
        return navigate("/")
      }
      
    })
    .catch(err=>alert(err.response.data))
  })

  function submitTransaction() {
    const data = {value, description, token: localStorage.getItem("access_token"), type: tipo}
    if(!value || !description) return alert("Todos os campos devem ser preenchidos para continuar")
  
    axios.post("https://mywallet-api-a26k.onrender.com/transactions", data)
    .then(res => {
      if (res.status === 401) {
        alert("Deslogado da aplicação!")
        return navigate("/")
      }

      if(res.status === 422) {
        return alert("Ocorreu um problema com a validação de dados no servidor! Verifique se está enviando os dados corretamente.")
      }
    })
    .catch(err=>alert(err.response.data))
  }


  return (
    <TransactionsContainer>
      <h1>Nova TRANSAÇÃO</h1>
      <form>
        <input placeholder="Valor" onChange={(e)=>setValue(e.target.value)} value={value} type="text"/>
        <input placeholder="Descrição" onChange={(e)=>setDescription(e.target.value)} value={description} type="text" />
        <button onClick={submitTransaction}>Salvar TRANSAÇÃO</button>
      </form>
    </TransactionsContainer>
  )
}

const TransactionsContainer = styled.main`
  height: calc(100vh - 50px);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;

  h1 {
    align-self: flex-start;
    margin-bottom: 40px;
  }
`
