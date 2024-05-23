import type { Meta, StoryObj } from '@storybook/react'
import { DialogComp as Dialog } from './Dialog.component'

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta = {
  title: 'Overlay/Dialog',
  component: Dialog,
  tags: ['autodocs'],
} satisfies Meta<typeof Dialog>

export default meta
type Story = StoryObj<typeof meta>

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Default: Story = {
  args: {
    open: true,
    title: "Let's get you started",
    onClose: (e: boolean) => console.log('onClose', e),
    children: (
      <>
        <p>
          The <a>PARTICIPANT</a> signing the Self-Description agrees as follows:
        </p>
        <ul>
          <li>
            To update its descriptions about any changes, be it technical,
            organizational, or legal -
          </li>

          <li>
            Especially but not limited to contractual in regards to the
            indicated attributes present in the descriptions.
          </li>

          <li>
            The keypair used to sign Verifiable Credentials will be revoked
            where Gaia-X Association becomes aware of any inaccurate statements
            in regards to the claims which result in a non-compliance with the
            Trust Framework and policy rules defined in the Policy Rules and
            Labelling Document (PRLD)
          </li>
        </ul>
      </>
    ),
  },
}
