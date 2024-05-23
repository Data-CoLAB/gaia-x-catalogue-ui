import type { Meta, StoryObj } from '@storybook/react'
import { Tooltip } from './Tooltip.component'
import { InputField } from '../InputField'

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta = {
  title: 'Tooltip',
  component: Tooltip,
  tags: ['autodocs'],
} satisfies Meta<typeof Tooltip>

export default meta
type Story = StoryObj<typeof meta>

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Default: Story = {
  args: {
    title: 'Legal name',
    arrow: true,
    children: (
      <InputField
        variant="standard"
        label="Service name"
        fullWidth
        id="serviceName"
        placeholder="Enter Service name"
        required
      />
    ),

    placement: 'top',
  },
}

export const Outline: Story = {
  args: {
    title: 'Legal name',
    children: <p>Test</p>,
    placement: 'top',
  },
}
