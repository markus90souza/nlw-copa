import { useContext } from 'react'
import { AuthContext, AuthContexDataProps } from '@contexts/AuthContext'

const useAuth = (): AuthContexDataProps => {
  const context = useContext(AuthContext)
  return context
}

export { useAuth }
