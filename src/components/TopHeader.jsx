import React from 'react'
import { IoPhonePortrait } from 'react-icons/io5';
import { MdEmail } from 'react-icons/md';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom'

const CheckUser = () =>  {
    const { currentUser } = useSelector((state) => state.user);

    return(
        <>
            {
                currentUser ? (
                    <Link to={`/profile/${currentUser._id}`} className='text-sm'>
                        {/* {
                            currentUser.avatar ? ( <img src={currentUser.avatar} className="h-8 w-8 rounded-full object-fill"/> ) : (<RxAvatar className="text-2xl text-[#C70039]"/>)
                        } */}
                        My Account
                    </Link>
                    ) : (
                    <Link to="/login" className="nav-link hover:text-[#C70039] duration-200">Login</Link>
                )
            }
        </>
    )
}

export default function TopHeader() {

  return (
    <div className="bg-pink-900 ">
        <div className='container mx-auto text-white py-2 flex justify-between items-center flex-wrap px-3'>
            <div className="space-x-5 flex">
                <Link className='text-sm flex items-center gap-1' to={'tell:+971544827478'}>
                    <IoPhonePortrait />
                    +971544827478
                </Link>
                <div className="hidden sm:block">
                    <Link className='text-sm flex items-center gap-1' to={'mailto:example@gmai.com'}>
                        <MdEmail />
                        example@gmai.com
                    </Link>
                </div>
            </div>
            <div className="">
                <CheckUser/>
            </div>
        </div>
    </div>
  )
}
