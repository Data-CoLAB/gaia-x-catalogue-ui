/* eslint-disable @typescript-eslint/restrict-template-expressions */
import { AppBar, Box, Container, Menu, Toolbar } from '@mui/material'
import { styled } from '@mui/material/styles'

const StyledAppBar = styled(AppBar)`
  background: ${({ theme }) =>
    `linear-gradient(311deg, ${theme.palette.primary.turquoise} 0%, ${theme.palette.primary.green}  50%, ${theme.palette.primary.purple}  100%)`};
  box-shadow: unset;

  .MuiContainer-root {
    max-width: 1280px;
    margin: 0 auto;
    padding: 0 4px;
  }
`
const StyledContainer = styled(Container)`
  display: flex;
  align-items: center;
  justify-content: space-between;

  .MuiToolbar-root {
    padding-left: 0;
    padding-right: 0;
    align-items: flex-end;
    overflow: hidden;
  }
`
const StyledToolbar = styled(Toolbar)``

const StyledMenuContainer = styled(Box)`
  display: flex;
  align-items: flex-end;
  gap: 7.5rem;
  padding-bottom: 2.5rem;

  & > .navLink {
    position: relative;
    list-style-type: none;
    color: ${({ theme }) => theme.palette.primary.contrastText};
    font-size: 2rem;
    font-weight: 400;
    text-decoration: none;

    &::after {
      left: 0;
      bottom: -5px;
      content: '';
      position: absolute;
      height: 3px;
      width: 0;
      background-color: ${({ theme }) => theme.palette.primary.turquoise};
      border-radius: 15%;
      transition: width 0.3s;
    }

    &.active {
      font-weight: 600;
      ::after {
        width: 1.9rem;
      }
    }

    &:hover {
      ::after {
        width: 1.9rem;
      }
    }
  }
`
const StyledLogo = styled('div')`
  img {
    height: 8rem;
    margin-right: 5rem;
  }
`

const StyledMenuButton = styled('div')`
  width: 10rem;
`

const StyledMenu = styled(Menu)`
  .MuiList-root {
    padding: 0;
    list-style-type: none;
  }
`

const StyledMenuItem = styled('li')`
  a,
  button {
    color: ${({ theme }) => theme.palette.secondary.main};
    display: flex;
    flex-direction: row;
    align-items: center;
    padding: 1rem 5rem 1rem 1.8rem;
    gap: 0.5rem;
    font-size: 1.6rem;
    font-weight: 400;
    text-decoration: none;
    background-color: transparent;
    border: 0;

    svg {
      width: 1.9rem;
      height: 1.9rem;
    }

    &:hover,
    &.active {
      border-radius: 0rem 0rem 0.375rem 0.375rem;
      background: rgba(185, 0, 255, 0.1);
    }
  }
`

export {
  StyledAppBar,
  StyledContainer,
  StyledToolbar,
  StyledMenuContainer,
  StyledLogo,
  StyledMenuButton,
  StyledMenu,
  StyledMenuItem,
}
