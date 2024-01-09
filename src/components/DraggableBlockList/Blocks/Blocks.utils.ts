import { DropResult } from '@hello-pangea/dnd';
import { BlockType, BlockListProps } from '../DraggableBlockList.utils';

export type HandleOnDragEndArgs = {
  result: DropResult;
  blocks: BlockType[];
  setBlocks: React.Dispatch<React.SetStateAction<BlockType[]>>;
  selectedBlockId: string;
  setSelectedBlockId: React.Dispatch<React.SetStateAction<string>>;
};

const handleRemoveBlock = (
  blocks: BlockType[],
  id: string,
  setBlocks: React.Dispatch<React.SetStateAction<BlockType[]>>,
) => {
  const updatedBlocks = blocks.filter(block => block.id !== id);
  setBlocks(updatedBlocks);
};

const handleOnDragEnd = (
  result: DropResult,
  blocks: BlockType[],
  setBlocks: BlockListProps['setBlocks'],
  selectedBlockId: string | null,
  setSelectedBlockId: React.Dispatch<React.SetStateAction<string | null>>,
) => {
  if (!result.destination) return;

  const items = [...blocks];
  const [reorderedItem] = items.splice(result.source.index, 1);
  items.splice(result.destination.index, 0, reorderedItem);
  setBlocks(items);

  const movedItemId = blocks[result.source.index]?.id;
  setSelectedBlockId(
    movedItemId === selectedBlockId ? result.draggableId : selectedBlockId,
  );
};

const moveItem = (
  currentId: string,
  targetIndex: number,
  blocks: BlockListProps['blocks'],
  setBlocks: BlockListProps['setBlocks'],
  setSelectedBlockId: React.Dispatch<React.SetStateAction<string | null>>,
) => {
  const currentIndex = blocks.findIndex(block => block.id === currentId);
  if (currentIndex === -1) return;

  const newBlocks = [...blocks];
  const item = newBlocks.splice(currentIndex, 1)[0];
  newBlocks.splice(targetIndex, 0, item);
  setBlocks(newBlocks);
  setSelectedBlockId(
    currentIndex === targetIndex ? currentId : newBlocks[targetIndex].id,
  );
};

const handleMoveDown = (
  selectedBlockId: string | null,
  blocks: BlockListProps['blocks'],
  setBlocks: BlockListProps['setBlocks'],
  setSelectedBlockId: React.Dispatch<React.SetStateAction<string | null>>,
) => {
  if (!selectedBlockId) return;

  const currentIndex = blocks.findIndex(block => block.id === selectedBlockId);
  if (currentIndex !== -1 && currentIndex < blocks.length - 1) {
    const targetIndex = currentIndex + 1;
    moveItem(
      selectedBlockId,
      targetIndex,
      blocks,
      setBlocks,
      setSelectedBlockId,
    );
  }
};

const handleMoveUp = (
  selectedBlockId: string | null,
  blocks: BlockListProps['blocks'],
  setBlocks: BlockListProps['setBlocks'],
  setSelectedBlockId: React.Dispatch<React.SetStateAction<string | null>>,
) => {
  if (!selectedBlockId) return;

  const currentIndex = blocks.findIndex(block => block.id === selectedBlockId);
  if (currentIndex !== -1 && currentIndex > 0) {
    const targetIndex = currentIndex - 1;
    moveItem(
      selectedBlockId,
      targetIndex,
      blocks,
      setBlocks,
      setSelectedBlockId,
    );
  }
};

export {
  handleRemoveBlock,
  handleOnDragEnd,
  moveItem,
  handleMoveDown,
  handleMoveUp,
};
