import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from '@hello-pangea/dnd';
import { BlocksList, BlockItem, RemoveButton } from './Blocks.styles';
import { BlockListProps } from '../DraggableBlockList.utils';

export const Blocks = ({ blocks, setBlocks }: BlockListProps) => {
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
  return (
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
  );
};
