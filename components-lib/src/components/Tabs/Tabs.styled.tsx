/* eslint-disable @typescript-eslint/no-unsafe-return */
import { styled } from '@mui/material/styles'
import Tabs, { TabsProps } from '@mui/material/Tabs'

type styledTabProps = {
  fontcolor?: string
  activetabcolor?: string
}
const StyledTabsComp = styled(Tabs)<styledTabProps>`
  .MuiTabs-flexContainer {
    gap: 4rem;

    .MuiButtonBase-root {
      color: ${({ theme, fontcolor }) =>
        fontcolor ? fontcolor : theme.palette.primary.contrastText};
      font-size: 2rem;
      font-weight: 300;
      min-width: auto;
      max-width: inherit;
      padding: 1.2rem 0px;
      text-transform: inherit;

      &.Mui-selected {
        font-weight: 600;
        color: ${({ theme, activetabcolor }) =>
          activetabcolor ? activetabcolor : theme.palette.primary.contrastText};
      }
    }
  }

  .MuiTabs-indicator {
    width: 1.8rem;
    background-color: ${({ theme, activetabcolor }) =>
      activetabcolor
        ? activetabcolor
        : theme.palette.primary.turquoise}; // #46daff
    border-radius: 1rem;
    height: 0.4rem;
  }
`

export { StyledTabsComp }
export type { TabsProps }
