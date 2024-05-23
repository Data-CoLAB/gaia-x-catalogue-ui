import { AuthContext } from '@wizard/contexts/AuthContext'
import { CheckConfigResponse } from '@wizard/models/check-config.model'
import { useContext } from 'react'

export function useSelectedEntity(): CheckConfigResponse {
  const context = useContext(AuthContext)

  if (!context) {
    throw new Error('useSelectedEntity used outside AuthContext')
  }

  return context?.userConfig
}
