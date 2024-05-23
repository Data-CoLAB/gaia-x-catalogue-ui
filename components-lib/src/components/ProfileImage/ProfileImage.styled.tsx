import { styled } from '@mui/material/styles'

const ProfileImageContainerStyled = styled('div')`
  width: 10.375rem;
  height: 10.3rem;
  border-radius: 1.25rem;
  box-shadow: 0px 0px 6px 0px rgba(0, 0, 0, 0.15);
  text-align: center;
  overflow: hidden;
`

const ProfileImageTitleStyled = styled('div')`
  .placeholder-icon {
    background: #ececec;
    height: 7.68rem;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    overflow: hidden;

    img {
      max-width: 100%;
      height: 100%;
    }
  }

  .action-button {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 0.9rem;

    button {
      display: flex;
      gap: 0.3rem;
      align-items: center;
      justify-content: center;
      height: 2.69rem;
      color: #565655;
      font-size: 1.2rem;
      font-weight: 400;
      background-color: transparent;
      border: 0;
      /* width: 100%; */
      cursor: pointer;

      svg {
        font-size: 1.4rem;
      }
    }
  }
`

const ProfileImageContentStyled = styled('div')``

export {
  ProfileImageContainerStyled,
  ProfileImageTitleStyled,
  ProfileImageContentStyled,
}
