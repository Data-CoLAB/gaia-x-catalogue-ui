import type { Meta, StoryObj } from '@storybook/react'
import { WalletCard } from './WalletCard.component'

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta = {
  title: 'WalletCard',
  component: WalletCard,
  tags: ['autodocs'],
} satisfies Meta<typeof WalletCard>

export default meta
type Story = StoryObj<typeof meta>

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Default: Story = {
  args: {
    name: 'General Information',
    vcType: 'gx:Legal Participant',
  },
}
