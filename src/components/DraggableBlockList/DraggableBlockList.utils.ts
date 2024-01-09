export const initialBlockList: BlockType[] = [
  { id: '1', name: 'red' },
  { id: '2', name: 'blue' },
  { id: '3', name: 'green' },
  { id: '4', name: 'yellow' },
];

export type BlockType = {
  id: string;
  name: string;
};

export type BlockAddProps = {
  blocks: BlockType[];
  setBlocks: React.Dispatch<React.SetStateAction<BlockType[]>>;
  inputContent: string;
  setInputContent: React.Dispatch<React.SetStateAction<string>>;
};

export type BlockListProps = {
  blocks: BlockType[];
  setBlocks: React.Dispatch<React.SetStateAction<BlockType[]>>;
};
