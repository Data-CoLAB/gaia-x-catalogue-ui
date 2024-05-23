import { Tooltip } from '..'
import {
  CheckboxLabelStyled,
  // CheckboxProps,
  CheckboxStyled,
} from './Checkbox.styled'
import { CheckboxProps } from '@mui/material/Checkbox'
// import { UnCheckedIcon } from './../../icons'

type CheckboxCompProps = CheckboxProps & {
  label: React.ReactNode | string
  tooltip?: string
}

const CheckboxComp = ({ label, ...props }: CheckboxCompProps) => {
  return (
    <Tooltip
      title={props?.tooltip}
      arrow={true}
      placement="top"
      disableInteractive
    >
      <CheckboxLabelStyled>
        <CheckboxStyled {...props} />
        {label}
      </CheckboxLabelStyled>
    </Tooltip>
  )
}

export { CheckboxComp }
