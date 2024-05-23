/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { useState } from 'react'
import { MenuPlacement, components } from 'react-select'
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown'
import AddCircleIcon from '@mui/icons-material/AddCircle'
import { Tooltip } from '../Tooltip'
import {
  AsyncCreatableStyled,
  AsyncSearchSelectContainerStyled,
  AsyncSearchSelectLabelStyled,
  AsyncSearchSelectStyled,
  CustomOptionStyled,
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
  isCustomOption = false,
  isCreation = false,
  required = false,
  customOptionLabel = 'Create resource',
  hideSelectedOptions = false,
  onCustomHandler,
  createLabel = 'Create',
  ...props
}: AsyncSearchSelectCompProps) => {
  const [customStyled, setCustomStyled] = useState<any>()
  const onFocusEvent = () => {
    setCustomStyled({
      fontSize: '1.8rem',
      top: '-2.5rem',
      color: '#b900ff',
      display: 'block',
      zIndex: 1,
    })
  }

  const onBlueEvent = () => {
    if (props.value?.value || Array(props.value).length > 0) {
      // setCustomStyled(null)
    } else {
      setCustomStyled(null)
    }
    setCustomStyled({
      fontSize: '1.8rem',
      top: '-2.5rem',
      color: 'rgba(0, 0, 0, 0.6)',
      display: 'block',
      zIndex: 1,
    })
  }

  const Menu = (props: any) => {
    return (
      <>
        <components.Menu {...props}>
          <CustomOptionStyled>
            {isCustomOption && (
              <button onClick={onCustomHandler}>
                {customOptionLabel} <AddCircleIcon />
              </button>
            )}

            <div>{props.children}</div>
          </CustomOptionStyled>
        </components.Menu>
      </>
    )
  }

  return (
    <Tooltip
      title={props?.tooltip}
      arrow={true}
      placement="top"
      disableInteractive
    >
      <AsyncSearchSelectContainerStyled>
        <AsyncSearchSelectLabelStyled style={customStyled}>
          {label} {required ? <span>*</span> : ''}
        </AsyncSearchSelectLabelStyled>
        {isCreation ? (
          <AsyncCreatableStyled
            {...props}
            closeMenuOnSelect={!isMulti}
            placeholder={placeholder}
            isMulti={isMulti}
            formatCreateLabel={(userInput) => `${createLabel} "${userInput}"`}
            defaultOptions
            loadOptions={loadOptions}
            menuPlacement={menuPlacement}
            menuPortalTarget={document.body}
            components={{
              DropdownIndicator: () => null,
              IndicatorSeparator: () => <ArrowDropDownIcon />,
              Menu,
            }}
            onFocus={onFocusEvent}
            onBlur={onBlueEvent}
          />
        ) : (
          <AsyncSearchSelectStyled
            {...props}
            placeholder={placeholder}
            closeMenuOnSelect={!isMulti}
            isMulti={isMulti}
            defaultOptions
            loadOptions={loadOptions}
            menuPlacement={menuPlacement}
            menuPortalTarget={document.body}
            components={{
              DropdownIndicator: () => null,
              IndicatorSeparator: () => <ArrowDropDownIcon />,
              Menu,
            }}
            onFocus={onFocusEvent}
            onBlur={onBlueEvent}
            hideSelectedOptions={hideSelectedOptions}
          />
        )}
      </AsyncSearchSelectContainerStyled>
    </Tooltip>
  )
}

export { AsyncSearchSelect }
export type { AsyncSearchSelectCompProps }