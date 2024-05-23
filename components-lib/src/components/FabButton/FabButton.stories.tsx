import type { Meta, StoryObj } from '@storybook/react'
import { FabButton } from './FabButton.component'
import AddIcon from '@mui/icons-material/Add'

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta = {
  title: 'Form Controls/FabButton',
  component: FabButton,
  tags: ['autodocs'],
} satisfies Meta<typeof FabButton>

export default meta
type Story = StoryObj<typeof meta>

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Primary: Story = {
  args: {
    color: 'primary',
    children: <AddIcon />,
  },
}

export const Secondary: Story = {
  args: {
    color: 'secondary',
    children: <AddIcon sx={{ fill: '#465aff' }} />,
  },
}

export const Disabled: Story = {
  args: {
    color: 'primary',
    children: <AddIcon />,
    disabled: true,
  },
}

export const Medium: Story = {
  args: {
    color: 'primary',
    children: <AddIcon />,
    size: 'medium',
  },
}

export const Small: Story = {
  args: {
    color: 'secondary',
    children: <AddIcon sx={{ fill: '#465aff' }} />,
    size: 'small',
  },
}
