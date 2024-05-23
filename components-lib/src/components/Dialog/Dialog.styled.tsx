import { styled } from '@mui/material/styles'
import Dialog, { DialogProps } from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'

const DialogMainStyled = styled(Dialog)`
  .MuiPaper-root {
    min-width: 70rem;
    margin: 0;
    padding: 2rem 5rem;
    border-radius: 2rem;
  }
`

const DialogTitleStyled = styled(DialogTitle)`
  &.MuiDialogTitle-root {
    padding: 0;

    h3 {
      padding: 0;
      display: flex;
      justify-content: space-between;
      align-items: self-end;
      gap: 2rem;
      margin: 0;
      width: 90%;

      button {
        background: transparent;
        border: 0;
        position: absolute;
        right: 0.7rem;
        top: 1rem;
        cursor: pointer;

        .MuiSvgIcon-root {
          width: 2.5rem;
          height: 2.5rem;
          fill: ${({ theme }) => theme.palette.secondary.gray1};
        }
      }
    }
  }
`
const DialogContentStyled = styled(DialogContent)``

const DialogActionsStyled = styled(DialogActions)`
  justify-content: center;
`

export {
  DialogMainStyled,
  DialogTitleStyled,
  DialogContentStyled,
  DialogActionsStyled,
}
export type { DialogProps }
