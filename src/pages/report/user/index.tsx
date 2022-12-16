import { Box, Button, CircularProgress, Container, Divider, Flex, Table, TableCaption, TableContainer, Tbody, Td, Text, Th, Thead, Tr } from '@chakra-ui/react'
import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { getUserByTypeUser } from '../../../services/users'
import { UsersTypes } from '../../../utils/constants'
import { SelectOptionsUserType } from '../../imc'
import ReactToPdf from "react-to-pdf";

export const ReportUser = () => {
    const [userPersonalOptions, setUserPersonalOptions] = useState<SelectOptionsUserType[]>([])
    const [userStudentOptions, setUserStudentOptions] = useState<SelectOptionsUserType[]>([])
    const [isListUserStudent, setIsListUserStudent] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [title, setTitle] = useState<string>('');
    const ref = useRef<HTMLDivElement>(null);

    const fetchUserStudent = async () => {
        setIsLoading(true)
        const { data } = await getUserByTypeUser(UsersTypes.STUDENT)
        setUserStudentOptions(data.map(user => ({ value: user.id, label: user.nome })))
        setIsListUserStudent(true);
        setTitle("Alunos");
        setIsLoading(false)
    }

    const fetchUserByTypeUserPersonal = async () => {
        setIsLoading(true)
        const { data } = await getUserByTypeUser(UsersTypes.PERSONAL)
        setUserPersonalOptions(data.map(user => ({ value: user.id, label: user.nome })))
        setTitle("Profissionais");
        setIsLoading(false)
    }

    useEffect(() => {
        if (window.location.pathname === '/list-professional') {
            fetchUserByTypeUserPersonal()
        }

        if (window.location.pathname === '/list-student') {
            fetchUserStudent()
        }
    }, [])

    const options = {
        orientation: 'landscape',
        unit: 'in',
    }

    return (
        <Container mt={50} maxW='container.lg' >
            <Box ref={ref}>
                <Text mb="10" fontSize={40} color="yellow.500">Relatório de {title} </Text>
                {isLoading ?
                    <Flex alignItems="center"  >
                        <Text>Aguardando carregamento...</Text>
                        <CircularProgress isIndeterminate color='blue.300' ml={10} />
                    </Flex> :
                    <TableContainer >
                        <Table variant='striped' colorScheme='yellow'>
                            <TableCaption> {`< Página 1 de 10 > `}</TableCaption>
                            <Thead>
                                <Tr>
                                    <Th>Nome</Th>
                                </Tr>
                            </Thead>
                            <Tbody>
                                {isListUserStudent ?
                                    userStudentOptions.map(option => (
                                        <Tr key={option.value}>
                                            <Td>{option.label}</Td>
                                        </Tr>
                                    )) : userPersonalOptions.map(option => (
                                        <Tr key={option.value}>
                                            <Td>{option.label}</Td>
                                        </Tr>
                                    ))}
                            </Tbody>
                        </Table>
                    </TableContainer>
                }
            </Box>
            <Flex alignItems="center" justifyContent="space-between" >
                <Link to="/home">
                    Voltar
                </Link>
                <ReactToPdf targetRef={ref} filename="relatorio-user.pdf" options={options} x={1} y={1} scale={0.9}>
                    {({ toPdf }) => (
                        <Button
                            mt={4}
                            width={40}
                            backgroundColor="yellow.500"
                            onClick={toPdf}
                        >
                            Gerar PDF
                        </Button>
                    )}
                </ReactToPdf>
            </Flex>
        </Container >
    )
}