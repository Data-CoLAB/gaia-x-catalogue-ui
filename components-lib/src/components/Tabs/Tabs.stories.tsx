import type { Meta, StoryObj } from '@storybook/react'
import { CustomTabs } from './Tabs.component'

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta = {
  title: 'Tabs',
  component: CustomTabs,
  tags: ['autodocs'],
} satisfies Meta<typeof CustomTabs>

export default meta
type Story = StoryObj<typeof meta>

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Default: Story = {
  args: {
    items: ['Sign In', 'Without Sign In'],
    onChangeTab: (e) => console.log(e),
  },
}
