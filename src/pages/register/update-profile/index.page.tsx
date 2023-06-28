import {
  Heading,
  Text,
  MultiStep,
  Button,
  TextArea,
  Avatar,
} from '@buma-ui/react-components'
import { ArrowRight } from 'phosphor-react'
import { z } from 'zod'
import { useForm } from 'react-hook-form'

import { zodResolver } from '@hookform/resolvers/zod'

import { useSession } from 'next-auth/react'

import { GetServerSideProps } from 'next'
import { getServerSession } from 'next-auth'

import { useRouter } from 'next/router'

import { buildNextAuthOptions } from '@/pages/api/auth/[...nextauth].api'

import { api } from '@/lib/axios'

import { Container, Header } from '../styles'

import { ProfileBox, FormAnnotation } from './styles'

const updateProfileSchema = z.object({
  bio: z.string(),
})

type UpdateProfileData = z.infer<typeof updateProfileSchema>

export default function UpdateProfile() {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<UpdateProfileData>({
    resolver: zodResolver(updateProfileSchema),
  })

  const { data } = useSession()
  const { push } = useRouter()

  async function handleUpdateProfile({ bio }: UpdateProfileData) {
    await api.put('/users/profile', {
      bio,
    })

    await push(`/schedule/${data?.user.username}`)
  }

  return (
    <Container>
      <Header>
        <Heading as="strong">Bem-vindo ao Ignite Call!</Heading>
        <Text>
          Precisamos de algumas informações para criar seu perfil! Ah, você pode
          editar essas informações depois.
        </Text>

        <MultiStep size={4} currentStep={4} />

        <ProfileBox as="form" onSubmit={handleSubmit(handleUpdateProfile)}>
          <label>
            <Text size="sm">Foto de Perfil</Text>
            <Avatar
              src={data?.user.avatar_url}
              referrerPolicy="no-referrer"
              alt={data?.user.name}
            />
          </label>

          <label>
            <Text size="sm">Sobre você</Text>
            <TextArea {...register('bio')} />
          </label>

          <FormAnnotation size="sm">
            Fale um pouco sobre você. Isto será exibido em sua página pessoal.
          </FormAnnotation>

          <Button type="submit" disabled={isSubmitting}>
            Finalizar
            <ArrowRight />
          </Button>
        </ProfileBox>
      </Header>
    </Container>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  const session = await getServerSession(
    req,
    res,
    buildNextAuthOptions(req, res),
  )

  return {
    props: {
      session,
    },
  }
}
