import { TextInput, TextInputWrapper, AddButton } from './BlockAdd.styles';

export const BlockAdd = () => {
  return (
    <TextInputWrapper>
      <TextInput type="text" placeholder="Name block" />
      <AddButton onClick={() => console.log('clicked')}>Add Item</AddButton>
    </TextInputWrapper>
  );
};
