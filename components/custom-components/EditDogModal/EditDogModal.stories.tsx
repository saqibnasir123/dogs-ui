import type { Meta, StoryObj } from '@storybook/nextjs';

import { fn } from 'storybook/test';

import EditDogModal from './EditDogModal';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: 'DogsAndBreed/Components/EditDogModal',
  component: EditDogModal,
  args: { 
    oldDogData:{
      DogName:"bull dog",
      BreedList:["russian", "german"]
    },
    isOpen:true,
    onSubmit: fn(),
    onClose:fn()
    }
};

export default meta;
type Story = StoryObj<typeof meta>;
export const Primary: Story = {
  args: {},
};




