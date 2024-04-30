import React, { useEffect, useState } from 'react'
import SearchInput from '../../components/FormInputs/SearchInput';
import { OrderDetailsMockData } from '../../utils/ProductList';
import { Table } from '../../components/Table/Table2';
import { formatAmount } from '../../utils/Helpfunctions';
import { InfoCard } from '../../components/InfoCard/InfoCard';
import useFetchWithParams from '../../hooks/useFetchWithParams';
import { ProductService } from '../../services/product.service';
import { useAuth } from '../../zustand/auth.store';
import { useNavigate } from 'react-router-dom';


const Orders = () => {
    const [isViewModalOpen, setIsViewModalOpen] = useState(false);
    // const [order, setOrder] = useState({})
    const navigate = useNavigate()

    // const userProfile = useAuth((s) => s.profile)

    const { data: allProducts, isLoading, refetch } = useFetchWithParams(
        ["query-all-merchants-products", {

        }],
        ProductService.getBuyersProducts,
        {
            onSuccess: (data: any) => {
                // console.log(data.data);
            },
            keepPreviousData: false,
            refetchOnWindowFocus: false,
            refetchOnMount: true,
        }
    )

    useEffect(() => {
        refetch()
    }, [])
    // console.log(allProducts.data)
    const closeViewModal = () => {
        setIsViewModalOpen(false);
    };
    const timeline = ["All", "Last Month", "This Month"]
    return (
        <div className='px-4 pt-8 h-full flex flex-col '>
            <div className='bg-white rounded-md h-auto w-full p-8 flex flex-col'>

                <div className='flex justify-between'>
                    <h1 className='text-primary-text text-sm font-normal'>All Products <span className='ml-2 bg-[#EEEFF0] py-1 px-2 rounded-full font-medium text-black'>{OrderDetailsMockData.data.length}</span></h1>
                    <div>
                    </div>
                    <div>
                        {/* <SearchInput placeholder='Search' /> */}
                        <button onClick={() => navigate("./create")} className='px-3 py-2 bg-black font-semibold text-white rounded'>Add Product</button>
                    </div>
                </div>
                {
                    allProducts && allProducts.data.length > 0 ? (
                        <div className='h-auto flex-grow '>
                            <Table data={allProducts && allProducts?.data}
                                hideActionName={true}
                                rowActions={(row: any) => [
                                    {
                                        name: "Edit product",
                                        action: () => {
                                            // handleViewOrderInfo(row)
                                        },
                                    },
                                    {
                                        name: "Delete product",
                                        action: () => {
                                            // handleViewOrderInfo(row)
                                        },
                                    },

                                ]}
                                columns={[
                                    {
                                        header: " ",
                                        view: (row: any,) => <img src={row.image && row.image} className='w-8 h-8 rounded-full object-contain' />
                                    },
                                    {
                                        header: "Product Id",
                                        view: (row: any) => <div>{row._id}</div>,
                                    },
                                    {
                                        header: "Product name",
                                        view: (row: any) => <div>{row.name}</div>,
                                    },
                                    {
                                        header: "Amount",
                                        view: (row: any) => <div>
                                            {formatAmount(row.price)}</div>,
                                    },
                                    {
                                        header: "Date",
                                        view: (row: any) => <div>{row.createdAt}</div>,
                                    },
                                    {
                                        header: "Status",
                                        view: (row: any) => <Label status={row?.active} />,
                                    },

                                ]}
                                loading={isLoading}
                            // pagination={OrderDetailsMockData.pagination}

                            />

                        </div>
                    ) : (
                        <div className='h-full flex-grow flex flex-col justify-center items-center'>
                            <img src='/images/no_transaction_history.svg' alt='No Order Completed yet' />
                            <p className='text-center text-xl mt-4 font-medium font-satoshiMedium text-primary-text'>“You currently have no transaction or order records to display."</p>
                        </div>
                    )
                }

            </div>
        </div>
    )
}

export default Orders



const Label = ({ status }: any) => {
    return (
        <p className={`text-sm font-semibold py-1 px-2 text-center rounded  ${status === true && "text-[#036B26] bg-[#E7F6EC]"} ${status === false && "text-red-600 bg-red-200"} `}>{status === "true" ? "Active" : "Inactive"}</p>
    )
}



const ProductDetail = ({ product }: any) => {
    return (
        <div className='grid grid-cols-1 sm:grid-cols-2'>
            <div className='col-span-1'>
                <img alt='Product' src="/images/BagPack.png" />
            </div>
            <div className='col-span-1 flex flex-col gap-2'>
                <p className='text-primary-subtext font-normal text-sm'>
                    {product.description}
                </p>
                <div>
                    <p className='text-primary-subtext text-sm font-bold mt-1 font-satoshiBold'>Quantity: {product.quantity}</p>
                    <p className='text-primary-subtext text-sm font-bold mt-1 font-satoshiBold'>Price: {product.price}</p>
                </div>
                <p className='text-primary text-sm font-bold mt-1 font-satoshiBold'>{product.vendor}</p>


            </div>

        </div>
    )
}


