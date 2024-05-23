import ParticipantCreationContainerOneStyled from './ParticipantCreationContainerOne.module.scss'

interface OnBoardingProps {
  children: React.ReactNode
}

const ParticipantCreationContainerOne = ({ children }: OnBoardingProps) => {
  return (
    <div className={ParticipantCreationContainerOneStyled.OnBoardingContainer}>
      <div
        className={
          ParticipantCreationContainerOneStyled.OnBoarding +
          ' flex gap-[12.5rem]'
        }
      >
        <div className={ParticipantCreationContainerOneStyled.OnBoardingLeft}>
          <img src="/datacolab-logo.svg" alt="" />
          <div className="pl-[29rem] mt-[16rem] max-2xl:pl-[5rem] max-2xl:mt-[10rem]">
            <h2 className="text-[4rem] font-[600]">
              Let's get you started <br /> on your Gaia-X experience!
            </h2>
            <p className="mt-[1rem] text-[2rem] font-[400]">
              Fill the form to get registered as a federated service provider
            </p>
          </div>
        </div>

        <div className={ParticipantCreationContainerOneStyled.OnBoardingRight}>
          {children}
        </div>
      </div>
    </div>
  )
}

export { ParticipantCreationContainerOne }
