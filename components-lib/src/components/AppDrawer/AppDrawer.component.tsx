import { StyledContainer, StyledList } from './AppDrawer.styled'
interface AppDrawerProps {
  drawerItem: React.ReactElement
}
const AppDrawer = ({ drawerItem }: AppDrawerProps) => {
  return (
    <StyledContainer>
      <StyledList>{drawerItem}</StyledList>
    </StyledContainer>
  )
}

export { AppDrawer }
export type { AppDrawerProps }
