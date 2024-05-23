import type { Meta, StoryObj } from '@storybook/react'
import { Select as Component } from './Select.component'

const meta: Meta<typeof Component> = {
  title: 'Form Controls/Select',
  component: Component,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof Component>

const items = [
  {
    value: 'AD',
    label: 'Andorra',
  },
  {
    value: 'AE',
    label: 'United Arab Emirates',
  },
  {
    value: 'DE',
    label: 'Germany',
  },
  {
    value: 'IN',
    label: 'India',
  },
]

export const Controlled: Story = {
  args: {
    items,
    placeholder: 'Placeholder IS Fun',
    error: false,
    required: true,
    defaultValue: '',
    label: 'Label',
    onChange: (value) => console.log('Select value::', value.target.value),
    tooltip: 'This is tooltip',
  },
}

export const Error: Story = {
  args: {
    items,
    placeholder: 'Placeholder IS Fun',
    error: true,
    required: true,
    helperText: 'This is required field',
    defaultValue: '',
    label: 'Label',
    onChange: (value) => console.log('Select value::', value.target.value),
    tooltip: 'This is tooltip',
  },
}
