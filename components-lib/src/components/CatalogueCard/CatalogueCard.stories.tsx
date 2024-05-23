import type { Meta, StoryObj } from '@storybook/react'
import { CatalogueCard } from './CatalogueCard.component'

const meta = {
  title: 'CatalogueCard',
  component: CatalogueCard,
} satisfies Meta<typeof CatalogueCard>

export default meta
type Story = StoryObj<typeof meta>

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Default: Story = {
  args: {
    title: 'Cloud Object Storage Cloud Object Storage',
    certificate: [
      {
        id: '1072ded7-4f44-4c4a-8991-c798f958a9ad',
        name: 'LGPD2019',
        createdDate: 1693311638758,
      },
      {
        id: '6eb6149b-8795-4ec6-9f60-e9eec3f540a7',
        name: 'GDPR2016',
        createdDate: 1693311638758,
      },
    ],
    owner: 'smartSense Solutions smartSense Solutions',
    location: [
      {
        id: '13e80a2b-7efb-4deb-8a6f-2f34bf9764af',
        name: 'Abu Zaby',
        createdDate: 1693919549257,
      },
      {
        id: '4f4b549c-0099-4615-942a-011995b6da9a',
        name: 'Ordino',
        createdDate: 1693919465169,
      },
      {
        id: 'bbc2b093-cc26-446e-aa30-6fd54ad1d878',
        name: 'Sant Julia de Loria',
        createdDate: 1693919549240,
      },
      {
        id: '6d98cfee-6510-4691-bdef-250671b56c0c',
        name: 'Nangarhar',
        createdDate: 1693919549245,
      },
      {
        id: 'bad8a1be-c122-406f-b418-5db8e1aa190d',
        name: 'Encamp',
        createdDate: 1693919062673,
      },
      {
        id: 'c786c9f8-32ea-4e45-ac73-396d0c35ddd2',
        name: 'Canillo',
        createdDate: 1693919465162,
      },
      {
        id: '43907cd4-70e9-4047-873c-98bd020ac4cc',
        name: 'La Massana',
        createdDate: 1693919549251,
      },
    ],
    level: 'L3',
  },
}
