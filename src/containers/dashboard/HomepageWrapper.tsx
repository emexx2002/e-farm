import React from 'react'
import { Button } from "../../components/Button/Button";
import Modal from "../../components/Modal/Modal";
import { LogoutContext } from "../../context/LogoutContext";
import { ErrorBoundary } from "../../shared_components/ErrorBoundary";
import DashboardHeader from "./Header";
import { useAuth } from '../../zustand/auth.store';
import HomepageHeader from './HomepageHeader';

const HomepageWrapper = ({ children }: { children: React.ReactNode; }) => {

    const logout: any = React.useContext(LogoutContext);
    
    

    return (
        <div>
           <HomepageHeader />
            <main className="flex-1 grid overflow-y-auto  relative">
                <Modal onClick={logout.closeLogout} open={logout.isLogoutOpen}>
                    <div className="w-[300px] p-5">
                        <h6 className="text-center text-pc-grey10 font-semibold">
                            Logout
                        </h6>
                        <p className="mt-4 text-center text-pc-grey10 font-normal">
                            Are you sure you want to log out?
                        </p>
                        <div className="flex mt-6 items-center justify-center">
                            <div className="mr-1">
                                <button
                                    className="bg-white  text-black mr-2 font-semibold px-3 h-10"
                                    onClick={logout.closeLogout}
                                >
                                    Cancel
                                </button>
                            </div>
                            <div className="ml-1">
                                <Button
                                    disabled={false}
                                    label="Log Out"
                                    onClick={() => {
                                        useAuth.getState().logout();
                                        logout.closeLogout();
                                    }}
                                />
                            </div>
                        </div>
                    </div>
                </Modal>

                <div className="h-full bg-gray-100 w-full min-h-[90vh] flex flex-col overflow-x-auto">
                    <ErrorBoundary>{children}</ErrorBoundary>
                </div>
            </main>
        </div>
    )
}

export default HomepageWrapper