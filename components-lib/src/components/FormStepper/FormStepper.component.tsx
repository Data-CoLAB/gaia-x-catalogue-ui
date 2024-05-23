import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import {
  StyledButton,
  StyledButtonRow,
  StyledLabel,
  StyledStep,
  StyledStepper,
} from './FormStepper.styled'

type StepProps = {
  id?: string | number
  label: string
  description?: string
}
interface StepperProps {
  steps: StepProps[]
  activeStep: number
  buttonText?: string
  showButton?: boolean
  onClickLevel: (step: StepProps) => void
  handleButton?: () => void
}
const FormStepper = ({
  steps,
  activeStep,
  buttonText,
  showButton,
  onClickLevel,
  handleButton,
}: StepperProps) => {
  return (
    <>
      <StyledStepper activeStep={activeStep} orientation="vertical">
        {steps.map((step, index) => (
          <StyledStep key={index}>
            <StyledLabel
              onClick={() => {
                if (activeStep >= index) onClickLevel(step)
              }}
              icon={
                activeStep > index ? (
                  <CheckCircleIcon className="icon" />
                ) : // <CircleIcon />
                null
              }
            >
              {step.label}
            </StyledLabel>
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

export { FormStepper }
export type { StepperProps }
