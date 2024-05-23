import { useEffect, useState } from 'react'
import {
  DialogActionsStyled,
  DialogContentStyled,
  DialogMainStyled,
  DialogTitleStyled,
} from './DialogCustom.styled'
import { Button } from '../Button'
import { CloseIcon } from '../..'

interface DialogTitleProps {
  open: boolean
  title?: string
  submitText?: string
  isConfirmation?: boolean
  children?: React.ReactNode
  onClose: (param: boolean) => void
  onSubmit: (param: boolean) => void
}

const DialogComp = ({
  open,
  title,
  isConfirmation = false,
  children,
  submitText,
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
            <span>{title}</span>
            <img src="/header-line.png" alt="" />
            {openDialog ? (
              <button aria-label="close" onClick={handleClose}>
                <CloseIcon />
              </button>
            ) : null}
          </h3>
        </DialogTitleStyled>

        <DialogContentStyled>{children}</DialogContentStyled>

        <DialogActionsStyled>
          {isConfirmation ? (
            <div className="confirmation-button">
              <Button
                variant="contained"
                color="primary"
                size="small"
                onClick={() => {
                  onSubmit(false), setOpen(false)
                }}
              >
                Yes
              </Button>
              <Button
                variant="outlined"
                color="primary"
                size="small"
                onClick={() => {
                  handleClose()
                }}
              >
                No
              </Button>
            </div>
          ) : (
            <Button
              autoFocus
              variant="contained"
              size="large"
              onClick={() => {
                onSubmit(false), setOpen(false)
              }}
            >
              {submitText ? submitText : 'Accept'}
            </Button>
          )}
        </DialogActionsStyled>
      </DialogMainStyled>
    </>
  )
}

export { DialogComp }
export type { DialogTitleProps }