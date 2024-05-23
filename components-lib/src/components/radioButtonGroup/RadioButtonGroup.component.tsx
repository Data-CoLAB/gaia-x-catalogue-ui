import {
  RadioGroupProps,
  StyledFormControlLabel,
  StyledRadioButton,
  StyledRadioButtonGroup,
} from './RadioButtonGroup.styled'

interface RadioButtonGroupProps {
  direction?: 'row' | 'column'
  disabledGroup?: boolean
  radioGroupProps: RadioGroupProps
  options: { label: string; value: string | boolean; disabled?: boolean }[]
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
}

const RadioButtonGroup = ({
  direction = 'row',
  disabledGroup = false,
  radioGroupProps,
  options,
  onChange,
}: RadioButtonGroupProps) => {
  return (
    <StyledRadioButtonGroup
      onChange={onChange}
      style={{ flexDirection: direction }}
      {...radioGroupProps}
    >
      {options.map((option, index) => (
        <StyledFormControlLabel
          key={index}
          disabled={option.disabled || disabledGroup}
          value={option.value}
          label={option.label}
          control={<StyledRadioButton />}
        ></StyledFormControlLabel>
      ))}
    </StyledRadioButtonGroup>
  )
}

export { RadioButtonGroup }
export type { RadioButtonGroupProps }