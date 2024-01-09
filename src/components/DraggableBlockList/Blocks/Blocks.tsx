import { BlocksList, BlockItem, RemoveButton } from './Blocks.styles';

export const Blocks = ({ initialBlocks }) => {
  return (
    <BlocksList>
      {initialBlocks.map((block, index) => (
        <BlockItem key={index}>
          {block}
          <RemoveButton onClick={() => console.log('clicked')}>
            Remove
          </RemoveButton>
        </BlockItem>
      ))}
    </BlocksList>
  );
};
