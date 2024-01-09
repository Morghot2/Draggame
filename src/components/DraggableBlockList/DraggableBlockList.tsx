import { DraggableBlockListWrapper, Title } from './DraggableBlockList.styles';
import { initialBlockList } from './DraggableBlockList.utils';
import { Blocks } from './Blocks/Blocks';
import { BlockAdd } from './BlockAdd/BlockAdd';

export const DraggableBlockList = () => {
  return (
    <DraggableBlockListWrapper>
      <Title>Draggame</Title>
      <BlockAdd />
      <Blocks initialBlocks={initialBlockList} />
    </DraggableBlockListWrapper>
  );
};
