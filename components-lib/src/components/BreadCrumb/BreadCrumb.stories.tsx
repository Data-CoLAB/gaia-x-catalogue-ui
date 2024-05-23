import { Meta, StoryObj } from '@storybook/react'
import { BreadCrumb } from './BreadCrumb.component'

const meta = {
  title: 'Breadcrumb',
  component: BreadCrumb,
} satisfies Meta<typeof BreadCrumb>

export default meta
type BreadcrumbComponent = StoryObj<typeof meta>

export const BreadcrumbComponent: BreadcrumbComponent = {
  args: {
    items: [
      {
        key: 'serviceManagement',
        name: 'Service Management',
        link: 'app/service-management', //whole rout
      },
      {
        key: 'create',
        name: 'Create Service',
        link: 'app/project',
      },
    ],
    onItemClick: (item) => {
      //navigate to item.link
      console.log(item.link)
    },
  },
}
