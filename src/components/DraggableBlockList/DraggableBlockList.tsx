import { useState } from 'react';
import { DraggableBlockListWrapper, Title } from './DraggableBlockList.styles';
import { initialBlockList } from './DraggableBlockList.utils';
import { Blocks } from './Blocks/Blocks';
import { BlockAdd } from './BlockAdd/BlockAdd';

export const DraggableBlockList = () => {
  const [blocks, setBlocks] = useState(initialBlockList);
  const [inputContent, setInputContent] = useState('');
  return (
    <DraggableBlockListWrapper>
      <Title>Draggame</Title>
      <BlockAdd
        blocks={blocks}
        setBlocks={setBlocks}
        inputContent={inputContent}
        setInputContent={setInputContent}
      />
      <Blocks blocks={blocks} setBlocks={setBlocks} />
    </DraggableBlockListWrapper>
  );
};
