import styled, { css } from 'styled-components';

const BlockListWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 20px;
`;

const BlocksList = styled.ul`
  padding-inline-start: 0px;
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

const BlockItem = styled.li<{ $selected: boolean }>`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  gap: 5px;
  padding: 16px;
  color: #cd7777;
  background-color: #6d335c;
  border-radius: 10px;
  width: 40vw;
  word-break: break-all;
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  font-family: 'Poppins', sans-serif;
  font-family: Poppins;
  ${({ $selected }) =>
    $selected &&
    css`
      border: 2px solid #cd7777;
      box-shadow: 0px 0px 10px 0px #cd7777;
      margin: -2px;
    `}
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

const MoveButtonsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 20px;
`;

const MoveButton = styled.button`
  font-family: 'Poppins', sans-serif;
  font-family: Poppins;
  padding: 8px 12px;
  border: none;
  background-color: #cd7777;
  border-radius: 4px;
  cursor: pointer;
  color: #4d244e;
  width: 100px;
  height: 100px;

  &:hover {
    background-color: #6d335c;
    color: #cd7777;
    border: 2px solid #cd7777;
  }
  transition: background-color 0.2s ease-in-out;
`;

export {
  BlocksList,
  BlockItem,
  RemoveButton,
  MoveButton,
  MoveButtonsWrapper,
  BlockListWrapper,
};
