import React, { useEffect, useState } from 'react'
import SearchInput from '../../components/FormInputs/SearchInput';
import { OrderDetailsMockData } from '../../utils/ProductList';
import { Table } from '../../components/Table/Table2';
import { formatAmount } from '../../utils/Helpfunctions';
import { InfoCard } from '../../components/InfoCard/InfoCard';


const Orders = () => {
    const [isViewModalOpen, setIsViewModalOpen] = useState(false);
    const [order, setOrder] = useState({})



    const handleViewOrderInfo = (row: any) => {
        setOrder(row)
        setIsViewModalOpen(true);
    }
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
                        <SearchInput placeholder='Search' />
                    </div>
                </div>
                {
                    OrderDetailsMockData && OrderDetailsMockData.data.length > 0 ? (
                        <div className='h-auto flex-grow '>
                            <Table data={OrderDetailsMockData?.data}
                                hideActionName={true}
                                rowActions={(row: any) => [
                                    {
                                        name: "View Order Details",
                                        action: () => {
                                            handleViewOrderInfo(row)
                                        },
                                    },

                                ]}
                                columns={[
                                    {
                                        header: "S/N",
                                        view: (row: any) => <div className="pc-text-blue">{row.id}</div>
                                    },
                                    {
                                        header: "Order Id",
                                        view: (row: any) => <div>{row.OrderId}</div>,
                                    },
                                    {
                                        header: "Amount",
                                        view: (row: any) => <div>
                                            {formatAmount(row.amount)}</div>,
                                    },
                                    {
                                        header: "Date",
                                        view: (row: any) => <div>{row.Date}</div>,
                                    },
                                    {
                                        header: "Status",
                                        view: (row: any) => <Label status={row?.status} />,
                                    },

                                ]}
                                loading={false}
                                pagination={OrderDetailsMockData.pagination}

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
        <p className={`text-sm font-semibold py-1 px-2 text-center rounded ${status === "pending" && "text-[#865503] bg-[#FEF6E7]"} ${status === "delivered" && "text-[#036B26] bg-[#E7F6EC]"} ${status === "cancelled" && "text-red-600 bg-red-200"} `}>{status}</p>
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


