import type { Meta, StoryObj } from '@storybook/vue3';
import Typography from './Typography.vue';

const meta = {
    title: 'Example/Typography',
    component: Typography,
    tags: ['autodocs'],
    argTypes: {
        variant: { control: 'select', options: ['h1', 'h2', 'h3', 'p', 'span'] },
        weight: { control: 'select', options: ['light', 'medium', 'bold'] },
        color: { control: 'color' },
    },
    args: {
        variant: 'p',
        weight: 'medium',
        color: '#000',
    },
} satisfies Meta<typeof Typography>;

export default meta;

type Story = StoryObj<typeof meta>;


export const Heading1: Story = {
    args: {
        variant: 'h1',
        weight: 'semibold',
        color: '#333',
    },
};

export const Heading2: Story = {
    args: {
        variant: 'h2',
        weight: 'medium',
        color: '#666',
    },
};

export const Paragraph: Story = {
    args: {
        variant: 'p',
        weight: 'medium',
        color: '#000',
    },
};

export const SmallText: Story = {
    args: {
        variant: 'span',
        weight: 'light',
        color: 'red',
    },
};
