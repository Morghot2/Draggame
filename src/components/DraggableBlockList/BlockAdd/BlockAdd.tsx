// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { v4 as uuidv4 } from 'uuid';
import { TextInput, TextInputWrapper, AddButton } from './BlockAdd.styles';
import { BlockAddProps } from '../DraggableBlockList.utils';

export const BlockAdd = ({
  blocks,
  setBlocks,
  inputContent,
  setInputContent,
}: BlockAddProps) => {
  const handleAddBlock = () => {
    if (inputContent.trim() === '') {
      return;
    }
    const newBlock = {
      id: uuidv4(),
      name: inputContent,
    };

    setBlocks([...blocks, newBlock]);
    setInputContent('');
  };
  return (
    <TextInputWrapper>
      <TextInput
        id="add-block"
        type="text"
        placeholder="Name block"
        value={inputContent}
        onChange={e => setInputContent(e.target.value)}
        maxLength={20}
      />
      <AddButton onClick={handleAddBlock}>Add Item</AddButton>
    </TextInputWrapper>
  );
};
