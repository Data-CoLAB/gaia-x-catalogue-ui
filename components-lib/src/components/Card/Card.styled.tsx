import { styled } from '@mui/material/styles'

const CardContainerStyled = styled('div')`
  border: 1px solid ${({ theme }) => theme.palette.secondary.gray3};
  border-radius: 0.8rem;
  overflow: hidden;
  width: 100%;
`

const CardTitleStyled = styled('div')`
  border-bottom: 1px solid ${({ theme }) => theme.palette.secondary.gray3};
  background: ${({ theme }) => theme.palette.primary.contrastText};
  padding: 1.31rem 1.79rem;

  label {
    color: ${({ theme }) => theme.palette.primary.main};
    font-size: 1.6rem;
    font-style: normal;
    font-weight: 600;
    line-height: normal;
  }
`

const CardContentStyled = styled('div')`
  padding: 1.31rem 1.79rem;
`

export { CardContainerStyled, CardTitleStyled, CardContentStyled }
