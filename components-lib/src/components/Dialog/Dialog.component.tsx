import { useEffect, useState } from 'react'
import {
  DialogActionsStyled,
  DialogContentStyled,
  DialogMainStyled,
  DialogTitleStyled,
} from './Dialog.styled'
import CloseIcon from '@mui/icons-material/Close'
import { Button } from '../Button'

interface DialogTitleProps {
  open: boolean
  title?: string
  children?: React.ReactNode
  onClose: (param: boolean) => void
  onSubmit: (param: boolean) => void
}

const DialogComp = ({
  open,
  title,
  children,
  onClose,
  onSubmit,
  ...props
}: DialogTitleProps) => {
  const [openDialog, setOpen] = useState(open)

  useEffect(() => {
    setOpen(open)
  }, [open])

  const handleClose = () => {
    setOpen(false)
    onClose(false)
  }

  return (
    <>
      <DialogMainStyled
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={openDialog}
      >
        <DialogTitleStyled sx={{ m: 0, p: 2 }} {...props}>
          <h3>
            {title}
            {openDialog ? (
              <button aria-label="close" onClick={handleClose}>
                <CloseIcon />
              </button>
            ) : null}
          </h3>
        </DialogTitleStyled>

        <DialogContentStyled>{children}</DialogContentStyled>

        <DialogActionsStyled>
          <Button
            autoFocus
            variant="contained"
            size="large"
            onClick={() => {
              onSubmit(false), setOpen(false)
            }}
          >
            Accept
          </Button>
        </DialogActionsStyled>
      </DialogMainStyled>
    </>
  )
}

export { DialogComp }
export type { DialogTitleProps }