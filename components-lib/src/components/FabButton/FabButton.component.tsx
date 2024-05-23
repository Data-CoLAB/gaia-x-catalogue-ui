import AddIcon from '@mui/icons-material/Add'
import { FabProps, StyledFabButtonComp } from './FabButton.styled'
type FabButtonPropsType = FabProps & {
  children?: React.ReactNode
}

export const FabButton = ({
  children = <AddIcon />,
  ...props
}: FabButtonPropsType) => {
  return <StyledFabButtonComp {...props}>{children}</StyledFabButtonComp>
}
