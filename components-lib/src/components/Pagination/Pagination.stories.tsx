import React, { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { Pagination } from './Pagination.component'
import { StyledPaginationComponentProps } from './Pagination.styled'

const meta: Meta<typeof Pagination> = {
  title: 'DataGrid/Pagination',
  component: Pagination,
  tags: ['autodocs'],
  args: {
    component: 'div',
    rowsPerPageOptions: [5, 10, 15],
    rowsPerPage: 10,
    page: 0,
  },
}

export default meta
type Story = StoryObj<typeof Pagination>

export const Basic: Story = {
  render: (props) => <Pagination {...props} />,
  args: {
    count: 40,
    page: 0,
    onPageChange: (e, page) => {
      console.log(e)
      console.log(page)
    },
    onRowsPerPageChange: (e) => console.log(e.target.value),
  },
}

const ControlledPagination = (props: StyledPaginationComponentProps<'div'>) => {
  const [page, setPage] = React.useState(props.page)
  const [rowsPerPage, setRowsPerPage] = useState(props.rowsPerPage)

  const handleChange = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    value: number
  ) => {
    console.log(event)
    setPage(value)
  }

  const handleRowsPerPageChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10))
  }

  return (
    <Pagination
      rowsPerPageOptions={props.rowsPerPageOptions}
      component="div"
      count={50}
      rowsPerPage={rowsPerPage}
      page={page}
      onPageChange={handleChange}
      onRowsPerPageChange={handleRowsPerPageChange}
    />
  )
}

export const Controlled: Story = {
  render: (props) => (
    <ControlledPagination
      {...(props as StyledPaginationComponentProps<'div'>)}
    />
  ),
}
