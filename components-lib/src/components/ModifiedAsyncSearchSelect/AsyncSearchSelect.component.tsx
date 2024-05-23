/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/restrict-plus-operands */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { MenuPlacement, components } from 'react-select'
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown'
import {
  AsyncSearchSelectContainerStyled,
  AsyncSearchSelectStyled,
  StyleOptionContainer,
  StyledValueContainer,
} from './AsyncSearchSelect.styled'

export interface AsyncSelectDataType {
  value: string
  label: string
  color?: string
  isFixed?: boolean
  isDisabled?: boolean
}

interface AsyncSearchSelectCompProps {
  loadOptions: any
  placeholder?: string
  label?: string
  isMulti?: boolean
  isDisabled?: boolean
  menuPlacement?: MenuPlacement | undefined
  value?: AsyncSelectDataType | null
  isCustomOption?: boolean
  customOptionLabel?: string
  isCreation?: boolean
  tooltip?: string
  required?: boolean
  onCustomHandler?: () => void
  hideSelectedOptions?: boolean
  createLabel?: string
}

const AsyncSearchSelect = ({
  loadOptions,
  menuPlacement = 'bottom',
  label = 'Country code',
  placeholder = 'Select value',
  isMulti = false,
  required = false,
  ...props
}: AsyncSearchSelectCompProps) => {
  const InputOption = ({ isSelected, children, innerProps, ...rest }: any) => {
    return (
      <components.Option {...rest} innerProps={innerProps}>
        <StyleOptionContainer>
          <input type="checkbox" checked={isSelected} />
          {children}
        </StyleOptionContainer>
      </components.Option>
    )
  }

  const MultiValue = (props: any) => {
    if (props.index > 0) return null
    const { length } = props.getValue()
    return length >= 1 ? (
      <StyledValueContainer>{`${length} selected`}</StyledValueContainer>
    ) : (
      <components.MultiValue {...props} />
    )
  }

  return (
    <>
      {label} {required ? <span>*</span> : ''}
      <AsyncSearchSelectContainerStyled>
        <AsyncSearchSelectStyled
          {...props}
          placeholder={placeholder}
          closeMenuOnSelect={false}
          isMulti={isMulti}
          defaultOptions
          loadOptions={loadOptions}
          menuPlacement={menuPlacement}
          menuPortalTarget={document.body}
          components={{
            DropdownIndicator: () => null,
            IndicatorSeparator: () => <ArrowDropDownIcon />,
            // ValueContainer: LimitedChipsContainer,
            Option: InputOption,
            MultiValue,
          }}
          hideSelectedOptions={false}
          isClearable={true}
        />
      </AsyncSearchSelectContainerStyled>
    </>
  )
}

export { AsyncSearchSelect }
export type { AsyncSearchSelectCompProps }