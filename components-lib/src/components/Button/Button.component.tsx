import { StyledButtonComp } from './button.styled'
import { ButtonProps } from '@mui/material/Button'
type ButtonPropsType = ButtonProps & {
  children?: React.ReactNode
}

export const Button = ({ children = '', ...props }: ButtonPropsType) => {
  return <StyledButtonComp {...props}>{children}</StyledButtonComp>
}
