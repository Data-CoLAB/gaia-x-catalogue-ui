import type { Meta, StoryObj } from '@storybook/react'
import { DropDown } from './DropDown.component'
import { SelectChangeEvent } from '@mui/material/Select'

const meta = {
  title: 'Form Controls/DropDown',
  component: DropDown,
} satisfies Meta<typeof DropDown>

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
  args: {
    items: [
      {
        label: 'High to Low',
        value: 1,
      },
      {
        label: 'Low to High',
        value: 2,
      },
    ],
    onChange: (e: SelectChangeEvent<unknown>) => {
      console.log(e.target.value)
    },
  },
}
