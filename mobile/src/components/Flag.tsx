import { Image, IImageProps } from 'native-base'

type FlagProps = IImageProps & {}

const Flag = ({ ...rest }: FlagProps) => {
  return <Image alt="Bandeira" w={8} h={6} mx={3} {...rest} />
}

export { Flag }
