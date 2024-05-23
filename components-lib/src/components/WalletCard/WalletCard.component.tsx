import {
  WalletCardContainerStyled,
  WalletCardContentStyled,
  WalletCardTitleStyled,
} from './WalletCard.styled'
import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined'
import RemoveRedEyeOutlinedIcon from '@mui/icons-material/RemoveRedEyeOutlined'

interface WalletCardPros {
  name: string
  vcType: string
  onAction: (param: string, data: string) => void
}

const WalletCard = ({ name, vcType, onAction }: WalletCardPros) => {
  return (
    <WalletCardContainerStyled>
      <WalletCardTitleStyled>
        <h3>{name}</h3>
        <span>{vcType}</span>
      </WalletCardTitleStyled>

      <WalletCardContentStyled>
        <button type="button" onClick={() => onAction('download', '')}>
          <FileDownloadOutlinedIcon />
        </button>

        <button type="button" onClick={() => onAction('view', '')}>
          <RemoveRedEyeOutlinedIcon />
        </button>
      </WalletCardContentStyled>
    </WalletCardContainerStyled>
  )
}

export { WalletCard }
export type { WalletCardPros }