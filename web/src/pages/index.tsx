import Image from 'next/image'
import { GetServerSideProps } from 'next'

import AppPreview from './../assets/app-nlw-copa-preview.png'

import Logo from './../assets/logo.svg'
import IconCheck from './../assets/icon-check.svg'
import AvatarsImage from './../assets/users-avatar-example.png'
import { api } from '../lib/axios'
import { FormEvent, useState } from 'react'

type HomeProps = {
  poolsCount: number
  guessesCount: number
  usersCount: number
}

export default function Home(props: HomeProps) {
  const handleCreatePool = async (e: FormEvent) => {
    e.preventDefault()

    try {
      const response = await api.post('/pools', {
        title: pool,
      })

      const { code } = response.data

      await navigator.clipboard.writeText(code)

      alert(
        'Bolao criado com sucesso, o codigo foi adicionado a sua area de transferencia',
      )

      setPool('')
    } catch (error) {
      alert('Falha ao Criar um bollao')
    }
  }

  const [pool, setPool] = useState('')
  return (
    <div
      className={
        'max-w-[1124px] h-screen mx-auto grid grid-cols-2 gap-28 items-center'
      }
    >
      <main className="">
        <Image src={Logo} alt={'Nlw copa'} />

        <h1 className={'mt-14 text-white text-5xl font-bold leading-tight '}>
          Crie seu próprio bolão da copa e compartilhe entre amigos!
        </h1>

        <div className={'mt-10 flex items-center gap-2'}>
          <Image src={AvatarsImage} alt={''} />
          <strong className={'text-gray-100 text-xl'}>
            <span className={'text-ignite-500 mr-2'}>+{props.usersCount}</span>
            pessoas já estão usando
          </strong>
        </div>

        <form className={'mt-10 flex gap-2'} onSubmit={handleCreatePool}>
          <input
            type="text"
            placeholder="Qual nome do seu bolão?"
            required
            className={
              'flex-1 px-6 py-4 rounded bg-gray-800 text-gray-100 border border-gray-600 outline-none focus:border-yellow-500'
            }
            value={pool}
            onChange={(t) => setPool(t.target.value)}
          />
          <button
            type={'submit'}
            className={
              'bg-yellow-500 px-6 py-4 rounded text-gray-900 text-sm font-bold uppercase hover:bg-yellow-700 '
            }
          >
            CRIAR MEU BOLÃO
          </button>
        </form>

        <p className={'mt-4 text-sm text-gray-300 leading-relaxed'}>
          Após criar seu bolão, você receberá um código único que poderá usar
          para convidar outras pessoas 🚀
        </p>

        <div className="mt-10 pt-10 border-t border-t-gray-600 text-gray-100 flex justify-between items-center ">
          <div className={'flex items-center gap-6'}>
            <Image src={IconCheck} alt={''} />
            <div className={'flex flex-col'}>
              <span className={'text-2xl font-bold'}>+{props.poolsCount}</span>
              <span>Bolões criados </span>
            </div>
          </div>

          <div className={'w-px h-14 bg-gray-600'} />

          <div className={'flex items-center gap-6'}>
            <Image src={IconCheck} alt={''} />
            <div className={'flex flex-col'}>
              <span className={'text-2xl font-bold'}>
                +{props.guessesCount}
              </span>
              <span>Palpites enviados</span>
            </div>
          </div>
        </div>
      </main>

      <Image src={AppPreview} alt={''} className={'xs:hidden sm:block'} />
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async () => {
  const [poolsCountResponse, guessesCountResponse, usersCountResponse] =
    await Promise.all([
      api.get('/pools/count'),
      api.get('/guesses/count'),
      api.get('/users/count'),
    ])

  return {
    props: {
      poolsCount: poolsCountResponse.data.count,
      guessesCount: guessesCountResponse.data.count,
      usersCount: usersCountResponse.data.count,
    },
  }
}
