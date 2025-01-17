import { Heading, Text, MultiStep, Button } from '@buma-ui/react-components'
import { ArrowRight, Check } from 'phosphor-react'

import { signIn, useSession } from 'next-auth/react'

import { useRouter } from 'next/router'

import { Container, Header } from '../styles'

import { ConnectBox, ConnectItem, AuthError } from './styles'

export default function ConnectCalendar() {
  const { status } = useSession()
  const { query, push } = useRouter()

  const hasAuthError = !!query.error
  const isSignedId = status === 'authenticated'

  async function handleConnectCalendar() {
    await signIn('google')
  }

  async function handleNavigateToNextStep() {
    await push('/register/time-intervals')
  }

  return (
    <Container>
      <Header>
        <Heading as="strong">Bem-vindo ao Ignite Call!</Heading>
        <Text>
          Conecte o seu calendário para verificar automaticamente as horas
          ocupadas e os novos eventos à medida em que são agendados.
        </Text>
        <MultiStep size={4} currentStep={2} />
      </Header>

      <ConnectBox>
        <ConnectItem>
          <Text>Google Calendar</Text>
          {isSignedId ? (
            <Button size="sm" disabled>
              Conectado
              <Check />
            </Button>
          ) : (
            <Button
              variant="secondary"
              size="sm"
              onClick={handleConnectCalendar}
            >
              Conectar
              <ArrowRight />
            </Button>
          )}
        </ConnectItem>

        {hasAuthError && (
          <AuthError size="sm">
            Falha ao se conectar ao Google, verifique se você habilitou as
            permissões de acesso ao Google Calendar
          </AuthError>
        )}

        <Button
          type="submit"
          disabled={!isSignedId}
          onClick={handleNavigateToNextStep}
        >
          Próximo passo
          <ArrowRight />
        </Button>
      </ConnectBox>
    </Container>
  )
}
