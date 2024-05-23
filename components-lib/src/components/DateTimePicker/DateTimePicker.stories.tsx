import type { Meta, StoryObj } from '@storybook/react'
import { DateTimePicker } from './DateTimePicker.component'

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta = {
  title: 'Form Controls/DateTimePicker',
  component: DateTimePicker,
  tags: ['autodocs'],
} satisfies Meta<typeof DateTimePicker>

export default meta
type Story = StoryObj<typeof meta>

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Default: Story = {
  args: {
    label: 'DateTimePicker',
    slotProps: {
      textField: {
        variant: 'standard',
      },
    },
    tooltip: 'This is datepicker tooltip',
  },
}

export const Disabled: Story = {
  args: {
    label: 'DateTimePicker',
    slotProps: {
      textField: {
        variant: 'standard',
      },
    },
    disabled: true,
    tooltip: 'This is datepicker tooltip',
  },
}
