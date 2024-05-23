/* eslint-disable @typescript-eslint/no-unsafe-call */
import StarIcon from '@mui/icons-material/Star'
import StarBorderOutlinedIcon from '@mui/icons-material/StarBorderOutlined'
import {
  StyledCard,
  StyledLevel,
  StyledTitle,
  StyledCertificate,
  StyledLocation,
} from './CatalogueCard.styled'
import { Certificate, Owner, Location } from '../../icons'
import { Tooltip } from '..'

export interface ProtectionRegime {
  id: string
  name: string
  createdDate: number
}

export interface Location {
  id: string
  name: string
  createdDate: number
}
type CatalogueCardProps = {
  title: string
  certificate: ProtectionRegime[]
  owner: string
  location: Location[]
  level: string
  showBorder?: boolean
}
const CatalogueCard = ({
  title,
  certificate,
  owner,
  location,
  level,
  showBorder,
}: CatalogueCardProps) => {
  const maxLevel = 3
  const serviceLevel = parseInt(level?.charAt(1))
  const Stars = Array.from({ length: maxLevel }, (_, index) => (
    <div key={index}>
      {serviceLevel >= index + 1 ? (
        <StarIcon className="icon" />
      ) : (
        <StarBorderOutlinedIcon className={'icon'} />
      )}
    </div>
  ))
  let otherLocation: Location[] = []
  if (location.length > 2) {
    otherLocation = location.slice(2)
  }
  return (
    <StyledCard
      className={`catalogueCard + ${
        showBorder ? 'activeCard' : 'nonactiveCard'
      }`}
    >
      <StyledTitle>
        <div className="title">{title}</div>
      </StyledTitle>
      <StyledCertificate>
        <div className="info">
          <div>
            <Certificate />
          </div>
          {certificate.length == 0 ? 'N/A' : null}
          {certificate.map((cert, index) => {
            return (
              <>
                {cert.name}
                {index + 1 != certificate.length ? `, ` : ` `}
              </>
            )
          })}
        </div>
        <div className="info">
          <div>
            <Owner />
          </div>
          <div>{owner}</div>
        </div>
      </StyledCertificate>
      <StyledLocation>
        <div className="info">
          <div className="icon">
            <Location />
          </div>
          <div>
            {location.length == 0 ? 'N/A' : null}
            <div className="Locations">
              {location.map((loc, index) => {
                if (index < 2) {
                  return (
                    <span key={index}>
                      {loc.name +
                        (index == 0 && location.length > 1 ? ' , ' : ' ')}
                    </span>
                  )
                } else if (index == 2) {
                  return (
                    <span>
                      <Tooltip
                        title={otherLocation.map((oL, index) => {
                          if (index == otherLocation.length - 1) return oL.name
                          else return oL.name + ', '
                        })}
                      >
                        <div className={'LocationsCircle'}>
                          {`+` + `${location.length - 2}`}
                        </div>
                      </Tooltip>
                    </span>
                  )
                }
              })}
            </div>
          </div>
        </div>
      </StyledLocation>
      <StyledLevel>
        {Stars}
        <div className="text">Level {serviceLevel ? serviceLevel : 'BC'}</div>
      </StyledLevel>
    </StyledCard>
  )
}

export { CatalogueCard }
