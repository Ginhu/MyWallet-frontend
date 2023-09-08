import axios from "axios"
import styled from "styled-components"

export default function TransactionItem({date, description, type, value, id}) {

  function clickDelete() {

    const token = localStorage.getItem("access_token")    
    const body = {id: id, Authorization: token}
    console.log(id, body)
    window.confirm("Deseja deletar a transação?")
    axios.delete(`${process.env.REACT_APP_API_URL}/transactions`, body)
    .then(res=>console.log(res))
    .catch(err=> console.log(err.response.data))
  }
    return (
        <ListItemContainer>
            <div>
                <span>{date}</span>
                <strong>{description}</strong>
            </div>
            <Value color={type === "saida" ? "negativo" : "positivo"}>R$ {value.replace(".", ",")}<span onClick={clickDelete}>x</span></Value>
        </ListItemContainer>
    )
}

const Value = styled.div`
  font-size: 16px;
  text-align: right;
  color: ${(props) => (props.color === "positivo" ? "green" : "red")};
  span {
    margin-left: 10px;
  }
`
const ListItemContainer = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
  color: #000000;
  margin-right: 10px;
  div span {
    color: #c6c6c6;
    margin-right: 10px;
  }
`