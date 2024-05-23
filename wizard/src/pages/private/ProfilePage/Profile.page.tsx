import { useEffect, useState } from 'react'
import { useAuth } from '@wizard/contexts'
import { ProfileDetails, ProfileHeader } from '@wizard/components'
import {
  ParticipantProfileResponse,
  participantProfile,
} from '@wizard/api/profile.api'

const ProfilePage = () => {
  const [response, setResponse] = useState<ParticipantProfileResponse>()
  const [isLoading, setIsLoading] = useState(false)
  const auth = useAuth()
  const participantId = auth?.userConfig?.id

  useEffect(() => {
    getParticipantApi()
  }, [participantId])

  const getParticipantApi = async () => {
    setIsLoading(true)
    try {
      if (participantId) {
        const res = await participantProfile(participantId)
        setResponse(res.payload)
        setIsLoading(false)
      }
    } catch (e) {
      setIsLoading(false)
    }
  }

  return (
    <div className="pl-[1rem] pr-[1rem]">
      <ProfileHeader
        response={response}
        participantId={participantId}
        isLoading={isLoading}
      />
      <ProfileDetails response={response} isLoading={isLoading} />
    </div>
  )
}

export default ProfilePage
