import { BadgeProps, StyledBadge } from './Badge.styled'
type BadgeCompProps = BadgeProps
const Badge = ({ children, ...props }: BadgeCompProps) => {
  return <StyledBadge {...props}>{children}</StyledBadge>
}
export { Badge }
