import { Button as NButton, IButtonProps, Text } from 'native-base'

type ButtonProps = IButtonProps & {
  title: string
  variant?: 'primary' | 'secondary'
}

export function Button({ title, variant = 'primary', ...rest }: ButtonProps) {
  return (
    <NButton
      w={'full'}
      h={14}
      rounded={'sm'}
      fontSize={'md'}
      textTransform={'uppercase'}
      bgColor={variant === 'primary' ? 'red.500' : 'yellow.500'}
      _pressed={{
        bgColor: variant === 'primary' ? 'red.600' : 'yellow.600',
      }}
      _loading={{
        _spinner: {
          color: 'black',
        },
      }}
      {...rest}
    >
      <Text
        fontSize={'sm'}
        fontFamily={'heading'}
        color={variant === 'primary' ? 'white' : 'black'}
        textTransform={'uppercase'}
      >
        {title}
      </Text>
    </NButton>
  )
}
