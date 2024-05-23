import { styled } from '@mui/material/styles'

const StyledCard = styled('div')`
  border-radius: 1rem;
  border: ${({ theme }) => theme.palette.secondary.gray4} 0.1rem solid;
  background: ${({ theme }) => theme.palette.secondary.white};
  padding: 2rem;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  cursor: pointer;
  &:hover,
  &:focus,
  &.activeCard {
    box-sizing: border-box;
    border: ${({ theme }) => theme.palette.primary.mediumGreen} 0.1rem solid;
    box-shadow: 0rem 0.2rem 1.5rem 0rem rgba(0, 0, 0, 0.1);
    .title {
      color: ${({ theme }) => theme.palette.primary.mediumGreen};
    }
  }
`

const StyledTitle = styled('div')`
  color: ${({ theme }) => theme.palette.secondary.black};
  font-size: 1.8rem;
  font-weight: 600;
  width: 24rem;
  flex-shrink: 0;
`
const StyledLocation = styled('div')`
  width: 20rem;
  color: ${({ theme }) => theme.palette.secondary.black};
  font-size: 1.6rem;
  font-weight: 400;

  .info {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 1rem;
  }
  .icon {
    flex-shrink: 0;
  }
  .Locations {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    gap: 0.3rem;

    &Circle {
      width: 2.2rem; /* Adjust the width and height to control the size of the circle */
      height: 2.2rem;
      border-radius: 50%; /* Makes the container circular */
      background-color: ${({ theme }) =>
        theme.palette.secondary.gray4}; /* Background color of the circle */
      display: flex;
      align-items: center;
      justify-content: center;
      text-align: center;
      font-size: 1.4rem;
      color: ${({ theme }) => theme.palette.secondary.gray1};
    }
  }
`

const StyledCertificate = styled('div')`
  width: 30rem;
  color: ${({ theme }) => theme.palette.secondary.black};
  font-size: 1.6rem;
  font-weight: 400;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  align-content: center;
  flex-shrink: 0;

  .info {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 1rem;
  }
`
const StyledLevel = styled('div')`
  color: ${({ theme }) => theme.palette.secondary.black};
  font-size: 1.6rem;
  font-weight: 600;
  display: flex;
  flex-shrink: 0;
  .icon,
  .outlinedIcon {
    color: ${({ theme }) => theme.palette.secondary.yellow};
  }
  .text {
    margin-left: 1rem;
  }
`
export {
  StyledCard,
  StyledLocation,
  StyledCertificate,
  StyledLevel,
  StyledTitle,
}
