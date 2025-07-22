import type { Meta, StoryObj } from '@storybook/nextjs';

import { fn } from 'storybook/test';

import MultiWordInput from './MutiWordInput';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: 'DogsAndBreed/Components/MultiWordInput',
  component: MultiWordInput,
  args: { 
    wordList:[],
    onWordsChange: fn()
    }
};

export default meta;
type Story = StoryObj<typeof meta>;
export const Primary: Story = {
  args: {},
};




