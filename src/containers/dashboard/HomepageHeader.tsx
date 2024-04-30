import React, { useContext, useEffect, useState } from 'react'
import { MdOutlineStorefront } from "react-icons/md";
import { useAuth } from '../../zustand/auth.store'
import { FiShoppingCart } from "react-icons/fi";
import { NavLink } from 'react-router-dom';
import { LogoutContext } from '../../context/LogoutContext';
import { useCart } from '../../zustand/cart.store';

const HomepageHeader = () => {
  const logout: any = useContext(LogoutContext)
  const isLoggedIn: boolean = useAuth(s => !!s.token)
  const cart:any = useCart(s => s.cartItems)

    return (
        <div>
            <header>
                <div className='w-full h-[72px] px-8 py-5 items-center grid grid-cols-2 lg:grid-cols-3'>
                    <div className='hidden lg:block'>

                    </div>
                    <NavLink to="/"><span className='text-3xl whitespace-nowrap flex items-center gap-1 font-bold'><MdOutlineStorefront /> Coal City MarketPlace</span></NavLink>

                    <div>



                        <div className='flex items-center justify-end gap-2'>
                            <NavLink to={"/cart"}>
                                <div className='relative w-[30px]'>
                                    <FiShoppingCart />
                                    <span className='text-xs right-0 -top-2 absolute flex items-center justify-center font-medium text-white bg-black w-4 rounded-full h-4'>{cart.length}</span>

                                </div>
                            </NavLink>
                            {
                                isLoggedIn ?
                                    <div>
                                        <NavLink to={"/profile"} className='px-3 text-black text-center  border-black font-semibold py-2 w-[120px] rounded'>Profile</NavLink>
                                        <button onClick={() => logout?.toggleLogout()} className='px-3 text-white text-center bg-black border border-black font-semibold py-2 w-[120px] rounded'>logout</button>
                                    </div>
                                    : <>
                                        <NavLink to={"/login"} className='px-3 text-black text-center border border-black font-semibold py-2 w-[120px] rounded'>login</NavLink>
                                        <NavLink to={"register"} className='px-3 text-white text-center bg-black border border-black font-semibold py-2 w-[120px] rounded'>Sign Up</NavLink>
                                    </>

                            }
                        </div>

                    </div>
                </div>
            </header>
        </div>
    )
}

export default HomepageHeader