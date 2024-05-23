import { Meta, StoryObj } from '@storybook/react'
import { FormStepper } from './FormStepper.component'

const meta = {
  title: 'Stepper/FormStepper',
  component: FormStepper,
} satisfies Meta<typeof FormStepper>
export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    onClickLevel(step) {
      console.log(step)
    },
    activeStep: 2,
    steps: [
      {
        label: 'step 1',
        description:
          'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Eveniet, tenetur!',
      },
      {
        label: 'step 2',
        description:
          'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Eveniet, tenetur!',
      },
      {
        label: 'step 3',
        description:
          'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Eveniet, tenetur!',
      },
      {
        label: 'step 4',
        description:
          'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Eveniet, tenetur!',
      },
    ],
    // buttonText: 'Proceed',
  },
}
