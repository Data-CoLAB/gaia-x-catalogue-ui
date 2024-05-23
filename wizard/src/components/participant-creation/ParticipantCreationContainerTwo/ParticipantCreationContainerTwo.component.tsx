import ParticipantCreationContainerTwoStyle from './ParticipantCreationContainerTwo.module.scss'

interface DidBasePageProps {
  title: string
  children: React.ReactNode
  titleClassName?: string
  contentClassName?: string
}

const ParticipantCreationContainerTwo = ({
  title,
  children,
  titleClassName = '',
  contentClassName = '',
}: DidBasePageProps) => {
  return (
    <div className={`${ParticipantCreationContainerTwoStyle.container}`}>
      <img
        className={
          ParticipantCreationContainerTwoStyle.container__Logo +
          ' fixed right-0'
        }
        src="/gaia-x_black_logo.png"
        alt=""
      />
      <div
        className={
          ParticipantCreationContainerTwoStyle.container__Content +
          ' flex gap-[9rem] max-2xl:gap-[2rem]'
        }
      >
        <div
          className={`${
            ParticipantCreationContainerTwoStyle.container__Content__Title +
            ' w-[59.2rem] mt-[18.6rem] ml-[22rem] max-2xl:mt-[10rem] max-2xl:ml-[10rem] text-[3.2rem] font-[600]'
          } ${titleClassName}`}
        >
          <p>{title}</p>
        </div>
        <div
          className={
            `${ParticipantCreationContainerTwoStyle.container__Content__Box} ${contentClassName} ` +
            ' mt-[17.1rem]' +
            ' max-h-fit '
          }
        >
          {children}
        </div>
      </div>
      <div
        className={
          ParticipantCreationContainerTwoStyle.container__Footer +
          ' fixed bottom-0 w-[100%] h-[6rem]'
        }
      ></div>
    </div>
  )
}
export { ParticipantCreationContainerTwo }
