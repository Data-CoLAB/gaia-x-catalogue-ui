import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import CircleIcon from '@mui/icons-material/Circle'
import {
  StyledButton,
  StyledButtonRow,
  StyledContent,
  StyledLabel,
  StyledStep,
  StyledStepper,
} from './Stepper.styled'
import { CircularProgress } from '@mui/material'
import { Error } from '@mui/icons-material'
interface StepperProps {
  steps: {
    label: string
    description?: string
  }[]
  activeStep: number
  buttonText?: string
  showButton?: boolean
  handleButton?: () => void
  errorStep?: number
}
const Stepper = ({
  steps,
  activeStep,
  buttonText,
  showButton,
  handleButton,
  errorStep,
}: StepperProps) => {
  return (
    <>
      <StyledStepper activeStep={activeStep} orientation="vertical">
        {steps.map((step, index) => (
          <StyledStep key={index}>
            <StyledLabel
              icon={
                <div>
                  {activeStep > index ? (
                    <CheckCircleIcon className="icon" />
                  ) : index == activeStep && !errorStep ? (
                    <div className="circularIcon">
                      <CircularProgress size={25} className="icon" />
                    </div>
                  ) : index == activeStep && errorStep ? (
                    <Error className="errorIcon" />
                  ) : (
                    <CircleIcon />
                  )}
                </div>
              }
            >
              {step.label}
            </StyledLabel>
            {step.description ? (
              <StyledContent>{step.description}</StyledContent>
            ) : null}
          </StyledStep>
        ))}
        {showButton ? (
          <StyledButtonRow>
            <StyledButton variant="contained" onClick={handleButton}>
              {buttonText}
            </StyledButton>
          </StyledButtonRow>
        ) : null}
      </StyledStepper>
    </>
  )
}

export { Stepper }
export type { StepperProps }