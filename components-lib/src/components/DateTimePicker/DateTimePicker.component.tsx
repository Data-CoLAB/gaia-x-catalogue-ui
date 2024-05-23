/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import {
  DateTimePickerProps,
  LocalizationProviderStyled,
  DemoContainerStyled,
  DatePickerStyled,
} from './DateTimePicker.styled'
import { Tooltip } from '../Tooltip'

type TextAreaCustomProps = DateTimePickerProps<Date | unknown> & {
  tooltip?: string
}

const DateTimePicker = (props: TextAreaCustomProps) => {
  return (
    <Tooltip
      title={props.tooltip}
      arrow={true}
      placement="top"
      disableInteractive
    >
      <div>
        <LocalizationProviderStyled dateAdapter={AdapterDayjs}>
          <DemoContainerStyled components={['DatePicker', 'DatePicker']}>
            <DatePickerStyled
              {...props}
              slotProps={{
                textField: { variant: 'standard' },
                layout: {
                  sx: {
                    fontFamily: 'Titillium Web',
                    '.MuiButtonBase-root': {
                      fontSize: '1.4rem',
                    },
                    '.MuiPickersDay-today': {
                      border: '1px solid #465AFF !important',
                    },
                    '.MuiPickersDay-root.Mui-selected, .MuiPickersDay-root.Mui-selected:hover, .MuiMenuItem-gutters.Mui-selected': {
                      backgroundColor: '#465AFF'
                    },
                    '.MuiPickersFadeTransitionGroup-root': {
                      fontWeight: 600,
                      fontSize: '1.6rem'
                    }
                  },
                },
              }}
            ></DatePickerStyled>
          </DemoContainerStyled>
        </LocalizationProviderStyled>
      </div>
    </Tooltip>
  )
}

export { DateTimePicker }
