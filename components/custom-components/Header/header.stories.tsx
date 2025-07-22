import type { Meta, StoryObj } from '@storybook/nextjs';

import { fn } from 'storybook/test';
import Header from './header'

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: 'DogsAndBreed/Components/Header',
  component: Header,
  args: {
    isLoggedIn:false,
    title:"Dogs & Breed",
    }
};

export default meta;
type Story = StoryObj<typeof meta>;
export const Primary: Story = {
  args: {},
};
export const Logout: Story = {
  args: {
    isLoggedIn:true,
    title:"Dogs & Breed",
},
};



