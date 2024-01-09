import styled from 'styled-components';

const TextInputWrapper = styled.div`
  display: flex;
  flex-direction: row;
  gap: 16px;
  margin-bottom: 20px;
`;

const TextInput = styled.input`
  font-family: 'Poppins', sans-serif;
  font-family: Poppins;
  min-width: 20vw;
  background-color: white;
  border: 1px solid #e56b6f;
  border-radius: 4px;
  padding-left: 8px;
  color: #e56b6f;
  outline: none;
  &:hover {
    border: 2px solid #e56b6f;
  }
  &::placeholder {
    color: #e56b6f;
  }
`;

const AddButton = styled.button`
  font-family: 'Poppins', sans-serif;
  font-family: Poppins;
  background-color: #6d335c;
  color: #d27a79;
  padding: 8px 16px;
  border: 2px solid #d27a79;
  border-radius: 4px;
  cursor: pointer;
  -webkit-transition: color 0.2s ease-in-out;
  &:hover {
    background-color: #d27a79;
    color: white;
    cursor: pointer;
  }
`;

export { TextInputWrapper, TextInput, AddButton };
