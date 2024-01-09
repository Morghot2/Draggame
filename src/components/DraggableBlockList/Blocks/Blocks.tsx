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
import {
  handleRemoveBlock,
  handleOnDragEnd,
  handleMoveDown,
  handleMoveUp,
} from './Blocks.utils';

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

  const handleMoveUpAction = () => {
    handleMoveUp(selectedBlockId, blocks, setBlocks, setSelectedBlockId);
  };

  const handleMoveDownAction = () => {
    handleMoveDown(selectedBlockId, blocks, setBlocks, setSelectedBlockId);
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
      <DragDropContext
        onDragEnd={(result: DropResult) =>
          handleOnDragEnd(
            result,
            blocks,
            setBlocks,
            selectedBlockId,
            setSelectedBlockId,
          )
        }
      >
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
                      <RemoveButton
                        onClick={() => handleRemoveBlock(blocks, id, setBlocks)}
                      >
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
          <MoveButton onClick={handleMoveUpAction} disabled={isMoveUpDisabled}>
            Move <br />
            up
          </MoveButton>
          <MoveButton
            onClick={handleMoveDownAction}
            disabled={isMoveDownDisabled}
          >
            Move <br />
            down
          </MoveButton>
        </MoveButtonsWrapper>
      )}
    </BlockListWrapper>
  );
};
