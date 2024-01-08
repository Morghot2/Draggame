import { DraggableBlockListWrapper, Title } from './DraggableBlockList.styles';
import { BlockAdd } from './BlockAdd/BlockAdd';

export const DraggableBlockList = () => {
  return (
    <DraggableBlockListWrapper>
      <Title>Draggame</Title>
      <BlockAdd />
    </DraggableBlockListWrapper>
  );
};
