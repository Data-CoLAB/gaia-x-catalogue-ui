import type { Meta, StoryObj } from '@storybook/react'
import { Card } from './Card.component'
import { InputField } from '..'

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta = {
  title: 'Card',
  component: Card,
  tags: ['autodocs'],
} satisfies Meta<typeof Card>

export default meta
type Story = StoryObj<typeof meta>

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Default: Story = {
  args: {
    title: 'General Information',
    children: (
      <>
        <div>
          <InputField
            variant="standard"
            placeholder="Enter value"
            label="Name"
          />
        </div>
      </>
    ),
  },
}
