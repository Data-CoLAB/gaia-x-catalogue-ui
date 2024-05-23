import { styled } from '@mui/material/styles'
import { Step, StepContent, StepLabel, Stepper } from '@mui/material'
import { Button } from '..'
export const StyledStepper = styled(Stepper)`
  .Mui-active,
  .Mui-completed {
    .MuiStepConnector-line {
      height: 5.3rem;
      margin: 1rem 0;
      border-left: 0.2rem solid
        ${({ theme }) => theme.palette.primary.mediumGreen};
    }
  }

  .MuiStepConnector-root {
    margin-left: 1.3rem;
  }

  .Mui-disabled {
    .MuiStepConnector-line {
      height: 5.3rem;
      margin: 1rem 0;
      border-left: 0.2rem solid ${({ theme }) => theme.palette.secondary.gray2};
    }

    .MuiStepIcon-text {
      fill: ${({ theme }) => theme.palette.secondary.gray1};
    }
  }
`
export const StyledStep = styled(Step)`
  .MuiStepLabel-root {
    padding: 0rem;
    cursor: pointer;
  }
`
export const StyledLabel = styled(StepLabel)`
  .MuiStepLabel-label {
    color: ${({ theme }) => theme.palette.secondary.gray1};
    font-size: 1.8rem;
    font-weight: 400;
  }

  .Mui-active {
    &.MuiStepLabel-label {
      font-weight: 600;
    }
  }

  .MuiSvgIcon-root {
    width: 2.8rem;
    height: 2.8rem;
    font-size: 1.4rem;
    font-weight: 600;
    padding-top: 2px;
  }

  .MuiStepIcon-text {
    font-size: 1.4rem;
    font-weight: 600;
  }

  .Mui-disabled .MuiSvgIcon-root {
    fill: ${({ theme }) => theme.palette.secondary.gray3};
    z-index: 1;
  }

  .Mui-active .MuiSvgIcon-root,
  .Mui-completed .MuiSvgIcon-root {
    color: ${({ theme }) => theme.palette.primary.mediumGreen};
  }

  .Mui-completed .MuiSvgIcon-root {
    width: 2.8rem;
    height: 2.8rem;
    /* margin-left: -2px; */
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
