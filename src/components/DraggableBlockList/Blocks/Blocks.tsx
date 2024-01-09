import { useState, useRef, useEffect } from 'react';
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
  const [selectedBlockId, setSelectedBlockId] = useState<string | null>(null);

  const blockListRef = useRef<HTMLElement | null>(null);
  const moveButtonsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        blockListRef.current &&
        !blockListRef.current.contains(event.target as Node) &&
        moveButtonsRef.current &&
        !moveButtonsRef.current.contains(event.target as Node)
      ) {
        setSelectedBlockId(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

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
    const movedItemId = blocks[result.source.index]?.id;
    setSelectedBlockId(
      movedItemId === selectedBlockId ? result.draggableId : selectedBlockId,
    );
  };

  const moveItem = (currentId: string, targetIndex: number) => {
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

  const handleMoveUp = () => {
    if (!selectedBlockId) return;

    const currentIndex = blocks.findIndex(
      block => block.id === selectedBlockId,
    );
    if (currentIndex !== -1 && currentIndex > 0) {
      moveItem(selectedBlockId, currentIndex - 1);
    }
  };

  const handleMoveDown = () => {
    if (!selectedBlockId) return;

    const currentIndex = blocks.findIndex(
      block => block.id === selectedBlockId,
    );
    if (currentIndex !== -1 && currentIndex < blocks.length - 1) {
      moveItem(selectedBlockId, currentIndex + 1);
    }
  };

  const isMoveUpDisabled =
    selectedBlockId === null ||
    blocks.findIndex(block => block.id === selectedBlockId) === 0;

  const isMoveDownDisabled =
    selectedBlockId === null ||
    blocks.findIndex(block => block.id === selectedBlockId) ===
      blocks.length - 1;

  const showButtons = blocks.length >= 2;
  return (
    <BlockListWrapper>
      <DragDropContext onDragEnd={handleOnDragEnd}>
        <Droppable droppableId="droppable">
          {provided => (
            <BlocksList
              {...provided.droppableProps}
              ref={el => {
                provided.innerRef(el);
                blockListRef.current = el;
              }}
            >
              {blocks.map(({ id, name }, index) => (
                <Draggable key={id} draggableId={id} index={index}>
                  {provided => (
                    <BlockItem
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      $selected={selectedBlockId === id}
                      onClick={() => setSelectedBlockId(id)}
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
        <MoveButtonsWrapper ref={moveButtonsRef}>
          <MoveButton onClick={handleMoveUp} disabled={isMoveUpDisabled}>
            Up
          </MoveButton>
          <MoveButton onClick={handleMoveDown} disabled={isMoveDownDisabled}>
            Down
          </MoveButton>
        </MoveButtonsWrapper>
      )}
    </BlockListWrapper>
  );
};
