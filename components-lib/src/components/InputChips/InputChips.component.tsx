import { Tooltip } from '../Tooltip'
import { StyledMuiChipsInput, MuiChipsInputProps } from './InputChips.styled'

type InputChipsPros = MuiChipsInputProps & { tooltip?: string }

export const InputChips = (props: InputChipsPros) => {
  return (
    <Tooltip
      title={props?.tooltip}
      arrow={true}
      placement="top"
      disableInteractive
    >
      <StyledMuiChipsInput {...props} />
    </Tooltip>
  )
}
