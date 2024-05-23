import { Meta, StoryObj } from '@storybook/react'
import { Stepper } from './Stepper.component'

const meta = {
  title: 'Stepper/Stepper',
  component: Stepper,
} satisfies Meta<typeof Stepper>
export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    activeStep: 1,
    errorStep: 1,
    // handleButton: () => {
    //   return true
    // },
    // showButton: true,
    steps: [
      {
        label: 'step 1',
      },
      {
        label: 'step 2',
      },
      {
        label: 'step 3',
      },
      {
        label: 'step 4',
      },
    ],
    // buttonText: 'Proceed',
  },
}
