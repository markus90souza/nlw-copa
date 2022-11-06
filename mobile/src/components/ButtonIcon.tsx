import React from 'react'
import { TouchableOpacity, TouchableOpacityProps } from 'react-native'
import { IconProps } from 'phosphor-react-native'
import { useTheme } from 'native-base'

interface Props extends TouchableOpacityProps {
  icon: React.FC<IconProps>
}

const ButtonIcon = ({ icon: Icon, ...rest }: Props) => {
  const { colors, sizes } = useTheme()

  return (
    <TouchableOpacity {...rest}>
      <Icon color={colors.gray[300]} size={sizes[6]} />
    </TouchableOpacity>
  )
}

export { ButtonIcon }
