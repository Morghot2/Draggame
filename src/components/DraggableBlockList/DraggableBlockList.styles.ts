import styled from 'styled-components';

const DraggableBlockListWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 50px;
  width: 100%;
  height: calc(100vh - 50px);
  font-family: 'Poppins', sans-serif;
  font-family: Poppins;
`;

const Title = styled.h1`
  color: #a98d8c;
  font-size: 48px;
`;

export { DraggableBlockListWrapper, Title };
