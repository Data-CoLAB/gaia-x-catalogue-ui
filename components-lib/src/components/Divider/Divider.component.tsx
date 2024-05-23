import { StyledDivider } from './Divider.styled'

interface DividerProps {
  text?: string
}
const Divider = ({ text }: DividerProps) => {
  return <StyledDivider>{text}</StyledDivider>
}

export { Divider }
export type { DividerProps }