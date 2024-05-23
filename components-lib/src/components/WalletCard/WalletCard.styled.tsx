import { styled } from '@mui/material/styles'

const WalletCardContainerStyled = styled('div')`
  border: 1px solid ${({ theme }) => theme.palette.secondary.gray3};
  border-radius: 0.5rem;
  overflow: hidden;
  width: 300px;
  padding: 0.95rem 0rem 0.95rem 1.31rem;
  display: flex;
  justify-content: space-around;
  align-items: center;
  height: 8rem;
`

const WalletCardTitleStyled = styled('div')`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 6rem;
  width: calc(100% - 4rem);
  border-right: 1px solid ${({ theme }) => theme.palette.secondary.gray3};

  h3 {
    color: ${({ theme }) => theme.palette.primary.main};
    font-size: 1.8rem;
    font-style: normal;
    font-weight: 600;
    line-height: normal;
    margin: 0;
  }

  span {
    color: ${({ theme }) => theme.palette.secondary.gray1};
    font-size: 1.6rem;
    font-weight: 400;
    line-height: normal;
  }
`

const WalletCardContentStyled = styled('div')`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  width: 5rem;
  height: 6rem;

  button {
    border: 0;
    background-color: transparent;
    color: ${({ theme }) => theme.palette.secondary.gray1};
  }
`

export {
  WalletCardContainerStyled,
  WalletCardTitleStyled,
  WalletCardContentStyled,
}
