/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { MenuItem } from '@mui/material'
import { StyledSelect, SelectProps } from './DropDown.styled'
import { SelectChangeEvent } from '@mui/material'
type DropDownProps = SelectProps & {
  items: {
    value: any
    label: string
  }[]
}
const DropDown = ({ items, ...props }: DropDownProps) => {
  return (
    <StyledSelect {...props}>
      {items.map((item, index) => {
        return (
          <MenuItem key={index} value={item.value}>
            {item.label}
          </MenuItem>
        )
      })}
    </StyledSelect>
  )
}
export { DropDown }
export type { SelectChangeEvent }
