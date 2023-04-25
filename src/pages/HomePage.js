import styled from "styled-components"
import { BiExit } from "react-icons/bi"
import { AiOutlineMinusCircle, AiOutlinePlusCircle } from "react-icons/ai"
import { useEffect, useState } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import TransactionItem from "../components/transactionItem"


export default function HomePage({name, setName, setEmail, setPassword}) {
  
  const [item, setItem] = useState([])
  const navigate = useNavigate()
  const [total, setTotal] = useState()
  const [totalcolor, setTotalcolor] = useState()

  useEffect(()=>{
    
    let soma = 0
    axios.defaults.headers.common["Authorization"] = `Bearer ${localStorage.getItem("access_token")}`
    axios.get(`${process.env.REACT_APP_API_URL}/login`)
    .then(res => {
      axios.get(`${process.env.REACT_APP_API_URL}/transactions`)
      .then(res => {
        res.data.transactions.map((el)=> {
          if(el.type === "saida") {
            return soma-=parseFloat(el.value)
          } else {
            return soma+=parseFloat(el.value)
          }
        })
        setTotal(soma.toFixed(2).replace(".", ","))
        setTotalcolor(soma)
  
        setName(res.data.name)
        setItem(res.data.transactions)
      })
      .catch(err=>alert(err.response.data))
    })
    .catch(err=>{
      alert(err.response.data)
      navigate("/")
    })
  })

  function clickButton (entry) {
    navigate(`/nova-transacao/${entry}`)
  }

  function logout() {
    window.confirm("Deseja mesmo deslogar?")
    axios.delete(`${process.env.REACT_APP_API_URL}/login`)
    .then(()=>{
      localStorage.clear()
      setEmail("")
      setPassword("")
      navigate("/")
    })
    .catch(err=>console.log(err.response.data))
  }

  return (
    <HomeContainer>
      <Header>
        <h1>Olá, {name.length !== 0 && name}</h1>
        <BiExit onClick={logout}/>
      </Header>

      <TransactionsContainer>
        <ul>
          {item.map((el)=> <TransactionItem 
          key={el._id} date={el.date} 
          description={el.description} 
          type={el.type} 
          value={el.value}/>
          )}
        </ul>

        <article>
          <strong>Saldo</strong>
          <Value color={totalcolor >= 0 ?"positivo":"negativo"}>R$ {total}</Value>
        </article>
      </TransactionsContainer>


      <ButtonsContainer>
        
        <button onClick={()=>clickButton("entrada")}>
          <AiOutlinePlusCircle />
          <p>Nova <br /> entrada</p>
        </button>
       
        <button onClick={()=>clickButton("saida")}>
          <AiOutlineMinusCircle />
          <p>Nova <br />saída</p>
        </button>
        
      </ButtonsContainer>

    </HomeContainer>
  )
}

const HomeContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: calc(100vh - 50px);
`
const Header = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 2px 5px 2px;
  margin-bottom: 15px;
  font-size: 26px;
  color: white;
`
const TransactionsContainer = styled.article`
  flex-grow: 1;
  background-color: #fff;
  color: #000;
  border-radius: 5px;
  padding: 16px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  article {
    display: flex;
    justify-content: space-between;   
    strong {
      font-weight: 700;
      text-transform: uppercase;
    }
  }
`
const ButtonsContainer = styled.section`
  margin-top: 15px;
  margin-bottom: 0;
  display: flex;
  gap: 15px;
  
  button {
    width: 50%;
    height: 115px;
    font-size: 22px;
    text-align: left;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    p {
      font-size: 18px;
    }
  }
`
const Value = styled.div`
  font-size: 16px;
  text-align: right;
  color: ${(props) => (props.color === "positivo" ? "green" : "red")};
`