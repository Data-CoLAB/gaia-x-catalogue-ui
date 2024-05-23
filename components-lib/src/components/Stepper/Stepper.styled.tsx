import { styled } from '@mui/material/styles'
import { Step, StepContent, StepLabel, Stepper } from '@mui/material'
import { Button } from '..'
export const StyledStepper = styled(Stepper)`
  .Mui-active,
  .Mui-completed {
    .MuiStepConnector-line {
      margin-left: 0.3rem;
      border-left: 0.2rem solid
        ${({ theme }) => theme.palette.primary.mediumGreen};
    }
  }
  .Mui-disabled {
    .MuiStepConnector-line {
      border-left: none;
    }
  }
`
export const StyledStep = styled(Step)`
  .MuiStepLabel-root {
    padding: 0rem;
  }
`
export const StyledLabel = styled(StepLabel)`
  .MuiStepLabel-label {
    color: ${({ theme }) => theme.palette.secondary.black};
    font-size: 2.4rem;
    font-weight: 400;
  }
  .Mui-disabled {
    .MuiSvgIcon-root {
      fill: ${({ theme }) => theme.palette.secondary.gray2};
      width: 3.3rem;
      height: 3.3rem;
      margin-right: 2.2rem;
      font-size: 1rem;
      padding: 0.2rem;
    }
  }
  .Mui-active,
  .Mui-completed {
    .MuiSvgIcon-root,
    .circularIcon {
      color: ${({ theme }) => theme.palette.primary.mediumGreen};
      width: 3.3rem;
      height: 3.3rem;
      margin-right: 2.2rem;
      font-size: 1rem;
      padding: 0.2rem;
    }
  }
  .Mui-active,
  .Mui-completed {
    .errorIcon {
      color: ${({ theme }) => theme.palette.secondary.red};
      width: 3.3rem;
      height: 3.3rem;
      margin-right: 2.2rem;
      font-size: 1rem;
      padding: 0.2rem;
    }
  }
`
export const StyledContent = styled(StepContent)``

export const StyledButton = styled(Button)``

export const StyledButtonRow = styled('div')`
  margin-top: 5rem;
  width: fit-content;
  display: flex;
  justify-content: center;
  width: 100%;
`
