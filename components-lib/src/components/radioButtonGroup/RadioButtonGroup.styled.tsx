import { styled } from '@mui/material/styles'
import RadioGroup, { RadioGroupProps } from '@mui/material/RadioGroup'
import Radio, { RadioProps } from '@mui/material/Radio'
import FormControlLabel, {
  FormControlLabelProps,
} from '@mui/material/FormControlLabel'

const StyledRadioButtonGroup = styled(RadioGroup)``

const StyledFormControlLabel = styled(FormControlLabel)`
  .MuiButtonBase-root {
    &.Mui-checked {
      color: ${({ theme }) => theme.palette.primary.purple};
    }
    &.Mui-disabled {
      color: ${({ theme }) => theme.palette.secondary.gray2};
    }
  }
`

const StyledRadioButton = styled(Radio)``

export { StyledRadioButtonGroup, StyledRadioButton, StyledFormControlLabel }
export type { RadioGroupProps, RadioProps, FormControlLabelProps }
