import type { Meta, StoryObj } from '@storybook/nextjs';

import { fn } from 'storybook/test';

import AddDogModal from './AddDogModal';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: 'DogsAndBreed/Components/AddDogModal',
  component: AddDogModal,
  args: { 
    isOpen:true,
    onClose:fn(),
    onSubmit: fn()
    }
};

export default meta;
type Story = StoryObj<typeof meta>;
export const Primary: Story = {
  args: {},
};




