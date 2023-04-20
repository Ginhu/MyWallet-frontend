import styled from "styled-components"

export default function TransactionItem({date, description, type, value}) {
    return (
        <ListItemContainer>
            <div>
                <span>{date}</span>
                <strong>{description}</strong>
            </div>
            <Value color={type === "saida" ? "negativo" : "positivo"}>{value}</Value>
        </ListItemContainer>
    )
}

const Value = styled.div`
  font-size: 16px;
  text-align: right;
  color: ${(props) => (props.color === "positivo" ? "green" : "red")};
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