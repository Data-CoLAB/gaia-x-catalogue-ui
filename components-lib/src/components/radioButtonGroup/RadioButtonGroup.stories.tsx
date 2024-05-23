import type { Meta, StoryObj } from '@storybook/react'
import { RadioButtonGroup as Component } from './RadioButtonGroup.component'

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta = {
  title: 'Form Controls/RadioButtonGroup',
  component: Component,
  tags: ['autodocs'],
} satisfies Meta<typeof Component>

export default meta
type Story = StoryObj<typeof meta>

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Default: Story = {
  args: {
    direction: 'column',
    radioGroupProps: { defaultValue: 'male', name: 'radio-button-group' },
    options: [
      {
        value: 'male',
        label: 'Male',
      },
      {
        value: 'female',
        label: 'Female',
      },
    ],
  },
}

export const Disabled: Story = {
  args: {
    direction: 'column',
    disabledGroup: false,
    radioGroupProps: { defaultValue: 'male', name: 'radio-button-group' },
    options: [
      {
        value: 'male',
        label: 'Male',
      },
      {
        value: 'female',
        label: 'Female',
        disabled: true,
      },
    ],
  },
}
