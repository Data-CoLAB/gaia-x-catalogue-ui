import type { Meta, StoryObj } from '@storybook/react'
import { Divider } from './Divider.component'

const meta = {
  title: 'Divider',
  component: Divider,
} satisfies Meta<typeof Divider>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    text: 'Or',
  },
}
