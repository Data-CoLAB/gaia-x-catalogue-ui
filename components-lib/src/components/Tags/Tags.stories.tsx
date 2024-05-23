import type { Meta, StoryObj } from '@storybook/react'
import { CustomTags } from './Tags.component'

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta = {
  title: 'Tags',
  component: CustomTags,
  tags: ['autodocs'],
} satisfies Meta<typeof CustomTags>

export default meta
type Story = StoryObj<typeof meta>

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Default: Story = {
  args: {
    items: [
      { value: 'JavaScript', count: 38 },
      { value: 'React', count: 30 },
      { value: 'Nodejs', count: 28 },
      { value: 'Express.js', count: 25 },
      { value: 'HTML5', count: 33 },
      { value: 'MongoDB', count: 18 },
      { value: 'CSS3', count: 20 },
    ],
    /*     onClickTag: (e) => console.log(e), */
  },
}
