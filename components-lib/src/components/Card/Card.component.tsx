import {
  CardContainerStyled,
  CardContentStyled,
  CardTitleStyled,
} from './Card.styled'

interface CardPros {
  title: string
  children?: React.ReactNode
}

const Card = ({ title, children }: CardPros) => {
  return (
    <CardContainerStyled>
      <CardTitleStyled>
        <label>{title}</label>
      </CardTitleStyled>
      <CardContentStyled>{children}</CardContentStyled>
    </CardContainerStyled>
  )
}

export { Card }
export type { CardPros }