import type { Meta, StoryObj } from '@storybook/react'
import { Badge } from './Badge.component'

const meta = {
  title: 'Badge',
  component: Badge,
} satisfies Meta<typeof Badge>

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
  args: {
    children: <div>This is text</div>,
    badgeContent: 1,
  },
}
