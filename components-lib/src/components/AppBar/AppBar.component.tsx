import React, { useEffect } from 'react'
import PersonOutlineIcon from '@mui/icons-material/PersonOutline'
import {
  StyledAppBar,
  StyledContainer,
  StyledLogo,
  StyledMenu,
  StyledMenuButton,
  StyledMenuContainer,
  StyledMenuItem,
  StyledToolbar,
} from './AppBar.styled'
import { IconButton } from '@mui/material'
interface AppBarProps {
  headerTabs: React.ReactElement
  profileMenuTabs?: React.ReactNode
  children?: React.ReactNode
  isAllowProfileMenu?: boolean
  isCloseProfileMenu?: boolean
}
const AppBar = ({
  headerTabs,
  isAllowProfileMenu = false,
  profileMenuTabs,
  children,
  isCloseProfileMenu = false,
}: AppBarProps) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }

  useEffect(() => {
    if (isCloseProfileMenu) {
      handleClose()
    }
  }, [isCloseProfileMenu])

  return (
    <>
      <StyledAppBar position="static">
        <StyledContainer maxWidth="xl">
          <StyledToolbar>
            {children ? <StyledLogo>{children}</StyledLogo> : null}
            <StyledMenuContainer>{headerTabs}</StyledMenuContainer>
          </StyledToolbar>

          {isAllowProfileMenu ? (
            <StyledMenuButton>
              <IconButton
                id="basic-button"
                aria-controls={open ? 'basic-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={handleClick}
              >
                <PersonOutlineIcon
                  sx={{ color: '#fff', width: '2.5rem', height: '2.5rem' }}
                />
              </IconButton>
            </StyledMenuButton>
          ) : null}
        </StyledContainer>
      </StyledAppBar>

      <StyledMenu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: 'visible',
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
            mt: 1.5,
            '& .MuiAvatar-root': {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            '&:before': {
              content: '""',
              display: 'block',
              position: 'absolute',
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: 'background.paper',
              transform: 'translateY(-50%) rotate(45deg)',
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <StyledMenuItem>{profileMenuTabs}</StyledMenuItem>
      </StyledMenu>
    </>
  )
}

export { AppBar }
export type { AppBarProps }
