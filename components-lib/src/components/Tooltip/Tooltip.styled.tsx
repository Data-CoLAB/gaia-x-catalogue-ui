import { styled } from '@mui/material/styles'
import Tooltip, { TooltipProps } from '@mui/material/Tooltip'

const StyledTooltip = styled((props: any) => (
  <Tooltip classes={{ popper: props.className }} {...props} />
))`
  & .MuiTooltip-tooltip {
    position: relative;
    z-index: 999;
    font-size: 1.5rem;
    font-weight: 400;
    line-height: normal;
    padding: 1rem;

    &.MuiTooltip-tooltipPlacementTop {
      position: relative;
      top: 1rem;
    }
  }
`

export { StyledTooltip }
export type { TooltipProps }
