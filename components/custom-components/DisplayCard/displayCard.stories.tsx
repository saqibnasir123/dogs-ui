import type { Meta, StoryObj } from '@storybook/nextjs';

import { fn } from 'storybook/test';

import DogCard from './displayCard';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: 'DogsAndBreed/Components/DisplayCard',
  component: DogCard,
  args: { 
      data:{
            DogName:"Some dog name",
            BreedList:["breed 1", "breed 2"]
        },
        isLoggedIn:true,
        onEdit: fn(),
        onDelete: fn(),
    }
};

export default meta;
type Story = StoryObj<typeof meta>;
export const Primary: Story = {
  args: {},
};

export const Populated: Story = {
  args: {
    data:{
            DogName:"bull dog",
            BreedList:["russian", "german"]
        },

        onEdit: fn(),
        onDelete: fn(),
    
  },
};



