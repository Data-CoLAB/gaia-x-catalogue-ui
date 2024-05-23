import { Meta, StoryObj } from '@storybook/react'
import { Skeleton } from './Skeleton.component'

const meta = {
  title: 'Skeleton',
  component: Skeleton,
} satisfies Meta<typeof Skeleton>

export default meta
type Story = StoryObj<typeof Skeleton>

export const SkeletonComp: Story = {
  args: {
    width: `10rem`,
    height: `10rem`,
    animation: `wave`,
    variant: 'circular',
  },
}
