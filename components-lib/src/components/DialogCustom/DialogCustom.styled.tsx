import { styled } from '@mui/material/styles'
import Dialog, { DialogProps } from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'

const DialogMainStyled = styled(Dialog)`
  .MuiPaper-root {
    min-width: 70rem;
    margin: 0;
    padding: 0rem 0;
    border-radius: 2rem;
  }
`

const DialogTitleStyled = styled(DialogTitle)`
  background: ${({ theme }) =>
    `linear-gradient(311deg, ${theme.palette.primary.green}  50%, ${theme.palette.primary.purple}  100%)`};

  &.MuiDialogTitle-root {
    padding: 0.5rem 4.5rem;

    h3 {
      padding: 0;
      display: flex;
      justify-content: space-between;
      align-items: center;
      height: 7rem;
      gap: 2rem;
      font-size: 2.4rem;
      font-weight: 600;
      color: white;
      margin: 0;
      span {
        z-index: 1;
        white-space: nowrap;
      }

      button {
        background: transparent;
        border: 0;
        position: absolute;
        right: 2.3rem;
        top: 3rem;
        margin: auto 0;
        cursor: pointer;

        .MuiSvgIcon-root {
          width: 2.5rem;
          height: 2.5rem;
          fill: ${({ theme }) => theme.palette.secondary.gray1};
        }
      }
      img {
        right: 6rem;
        z-index: 0;
        position: absolute;
        height: auto;
      }
    }
  }
`
const DialogContentStyled = styled(DialogContent)`
  padding: 0 4.5rem;
`

const DialogActionsStyled = styled(DialogActions)`
  justify-content: center;
  padding: 0.8rem 0 1rem 0;

  .confirmation-button {
    display: flex;
    gap: 2rem;
    justify-content: center;
    align-items: center;
    width: 100%;
    padding: 1rem;
  }
`

export {
  DialogMainStyled,
  DialogTitleStyled,
  DialogContentStyled,
  DialogActionsStyled,
}
export type { DialogProps }
