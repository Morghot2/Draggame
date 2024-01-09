import styled from 'styled-components';

const BlocksList = styled.ul`
  padding-inline-start: 0px;
`;

const BlockItem = styled.li`
  padding: 16px;
  margin: 10px 0px;
  color: #cd7777;
  background-color: #6d335c;
  border-radius: 10px;
  width: 40vw;
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  font-family: 'Poppins', sans-serif;
  font-family: Poppins;
`;

const RemoveButton = styled.button`
  font-family: 'Poppins', sans-serif;
  font-family: Poppins;
  padding: 8px 12px;
  border: none;
  background-color: #cd7777;
  border-radius: 4px;
  cursor: pointer;
  color: #4d244e;

  &:hover {
    background-color: #4d244e;
    color: #cd7777;
  }
  transition: background-color 0.2s ease-in-out;
`;

export { BlocksList, BlockItem, RemoveButton };
