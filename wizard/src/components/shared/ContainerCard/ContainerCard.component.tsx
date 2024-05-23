import ContainerCardStyle from './ContainerCard.module.scss'
interface ContainerCardProps {
  headerTitle: string
  children: React.ReactNode
}
const ContainerCard = ({ headerTitle, children }: ContainerCardProps) => {
  return (
    <div
      className={
        ContainerCardStyle.container +
        ' flex flex-col w-[73rem] max-2xl:w-[70rem]'
      }
    >
      <div
        className={
          ContainerCardStyle.container__Header +
          ' flex rounded-t-[1.6rem] justify-between'
        }
      >
        <p
          className={
            ContainerCardStyle.container__Header__Title +
            ' pt-[2.7rem] pb-[2.7rem] pl-[4.5rem] text-[2.4rem] font-[600]'
          }
        >
          {headerTitle}
        </p>
      </div>
      <div
        className={
          ContainerCardStyle.container__Children +
          ' rounded-b-[1.6rem] max-2xl:h-[calc(100vh-34rem)] max-2xl:overflow-auto'
        }
      >
        {children}
      </div>
    </div>
  )
}

export { ContainerCard }
