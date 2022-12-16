import { Box } from '@chakra-ui/react'
import { useState } from 'react'
import { User } from '../../../services/users'

export const ReportImcByUser = () => {
    const [products, setProducts] = useState<User[]>([])
    const [currentPage, setCurrentPage] = useState<number>(1)
    const [totalPage, setTotalPage] = useState<number>(1)
    const [totalProducts, setTotalProducts] = useState<number>(0)
    const [amountProductsListed, setAmountProductsListed] = useState<number>(0)
    //   const [params, setParams] = useState<ParamsProducts>({
    //     isPaginated: true,
    //     page: currentPage,
    //     per_page: 10,
    //   })


    return (
        <Box p="15px">

        </Box >
    )
}