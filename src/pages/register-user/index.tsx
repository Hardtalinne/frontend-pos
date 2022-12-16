import { useEffect, useState } from 'react'
import { Button, Container, Flex, Text, useToast } from '@chakra-ui/react'
import { postUsers, UserPayload } from '../../services/users'
import { InputForm } from '../../components/InputForm'
import { Link, useNavigate } from 'react-router-dom'
import { UsersTypes } from '../../utils/constants'

type formDataCreateUser = {
  user: UserPayload
}

export type SelectOptions = {
  label: string | number
  value: string | number
}

export type FormError = {
  isTyped?: boolean
  isError?: boolean
  message?: string
}

export const RegisterUser = () => {
  const [formValues, setFormValues] = useState<formDataCreateUser>()
  const [isCreateUserProfessional, setIsCreateUserProfessional] = useState<boolean>(false);
  const [isCreateUserForLogin, setIsCreateUserForLogin] = useState<boolean>(false);
  const [title, setTitle] = useState<string>('Cadastrar Aluno');

  const navigate = useNavigate();
  const toast = useToast()


  const handleInputChange = (e: { target: { name: any; value: any } }) => {
    const { name, value } = e.target

    const valueForm = value
    const type = name.split('.')[0]
    const attribute = name.split('.')[1]

    setFormValues({ ...formValues, [type]: { ...formValues?.[type], [attribute]: valueForm } })
  }

  const handleSubmit = async () => {
    const userPayload = formValues.user as UserPayload
    
    userPayload.type_user = isCreateUserProfessional ? UsersTypes.PERSONAL : UsersTypes.STUDENT

    const { data, status, error } = await postUsers(userPayload)

    if (status === 400) {
      toast({
        position: 'top',
        title: 'Atenção!',
        description: error,
        status: 'error',
        duration: 2000,
        isClosable: true,
      })

    } else {
      toast({
        position: 'top',
        description: "Usuário cadastrado com sucesso!",
        status: 'success',
        duration: 2000,
        isClosable: true,
      })

      navigate("/login");
    }
  }

  useEffect(() => {
    validCreateUser();
  }, [])

  const validCreateUser = () => {
    if (window.location.pathname === '/register-professional') {
      setIsCreateUserProfessional(true);
      setTitle("Cadastrar Profissional");
    }

    if (window.location.pathname === '/register-user') {
      setIsCreateUserForLogin(true);
      setTitle("Cadastre-se");
    }
  }

  return (
    <Container mt={50}>
      <Text mb="10" fontSize={40} color="yellow.500">{title} </Text>

      <InputForm
        label='Nome'
        name="user.name"
        value={formValues?.user?.name || ''}
        onChange={handleInputChange}
        placeholder="Digite seu nome"
        errorMessage="O nome é obrigatório"
        isRequired
      />

      <InputForm
        label='Email'
        name="user.email"
        value={formValues?.user?.email || ''}
        onChange={handleInputChange}
        placeholder="Digite seu e-mail"
      />

      <InputForm
        label='Usuário'
        name="user.user"
        value={formValues?.user?.user || ''}
        onChange={handleInputChange}
        placeholder="Digite seu usuário"
        errorMessage="O usuário é obrigatório"
        isRequired
      />

      <InputForm
        label='Senha'
        type="password"
        name="user.password"
        value={formValues?.user?.password || ''}
        onChange={handleInputChange}
        placeholder="Digite sua senha"
        errorMessage="A senha é obrigatória"
        isRequired
      />

      <Flex alignItems="center" justifyContent="space-between" >
        <Link to={isCreateUserForLogin ? "/login" : "/home"}>
          Voltar
        </Link>
        <Button mt={4} onClick={handleSubmit} width={40} backgroundColor="yellow.500"> Cadastrar </Button>
      </Flex>
    </Container>
  )
}
