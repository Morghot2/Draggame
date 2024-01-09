import { useState } from 'react';
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from '@hello-pangea/dnd';
import {
  BlocksList,
  BlockItem,
  RemoveButton,
  MoveButton,
  BlockListWrapper,
  MoveButtonsWrapper,
} from './Blocks.styles';
import { BlockListProps } from '../DraggableBlockList.utils';

export const Blocks = ({ blocks, setBlocks }: BlockListProps) => {
  const [selectedBlockIndex, setSelectedBlockIndex] = useState<number | null>(
    null,
  );
  const handleRemoveBlock = (id: string) => {
    const updatedBlocks = blocks.filter(block => block.id !== id);
    setBlocks(updatedBlocks);
  };

  const handleOnDragEnd = (result: DropResult) => {
    if (!result.destination) return;

    const items = [...blocks];
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    setBlocks(items);
  };

  const moveItem = (currentIndex: number, targetIndex: number) => {
    const newBlocks = [...blocks];
    const item = newBlocks.splice(currentIndex, 1)[0];
    newBlocks.splice(targetIndex, 0, item);
    setBlocks(newBlocks);
    setSelectedBlockIndex(targetIndex);
  };

  const handleMoveUp = () => {
    if (selectedBlockIndex !== null && selectedBlockIndex > 0) {
      moveItem(selectedBlockIndex, selectedBlockIndex - 1);
    }
  };

  const handleMoveDown = () => {
    if (selectedBlockIndex !== null && selectedBlockIndex < blocks.length - 1) {
      moveItem(selectedBlockIndex, selectedBlockIndex + 1);
    }
  };

  const showButtons = blocks.length >= 2;
  return (
    <BlockListWrapper>
      <DragDropContext onDragEnd={handleOnDragEnd}>
        <Droppable droppableId="droppable">
          {provided => (
            <BlocksList {...provided.droppableProps} ref={provided.innerRef}>
              {blocks.map(({ id, name }, index) => (
                <Draggable key={id} draggableId={id} index={index}>
                  {provided => (
                    <BlockItem
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      $selected={selectedBlockIndex === index}
                      onClick={() => setSelectedBlockIndex(index)}
                    >
                      {name}
                      <RemoveButton onClick={() => handleRemoveBlock(id)}>
                        Remove
                      </RemoveButton>
                    </BlockItem>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </BlocksList>
          )}
        </Droppable>
      </DragDropContext>
      {showButtons && (
        <MoveButtonsWrapper>
          <MoveButton
            onClick={handleMoveUp}
            disabled={selectedBlockIndex === 0}
          >
            Up
          </MoveButton>
          <MoveButton
            onClick={handleMoveDown}
            disabled={selectedBlockIndex === blocks.length - 1}
          >
            Down
          </MoveButton>
        </MoveButtonsWrapper>
      )}
    </BlockListWrapper>
  );
};
