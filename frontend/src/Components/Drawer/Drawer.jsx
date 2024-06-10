import React from 'react'
import { useAuthContext } from '../../Context/AuthContext'
import Logout from './Logout'
import ProfileDrawer from './ProfileDrawer'
import CreateBlogDrawer from './CreateBlogDrawer'
import HomeDrawer from './HomeDrawer'
import Explore from './Explore'


const Drawer = () => {

    const { user } = useAuthContext()

    return (
        <div className='flex z-[1000]'>
            <div className="drawer">
                <input id="my-drawer" type="checkbox" className="drawer-toggle" />
                <div className="drawer-content">
                    {/* Page content here */}
                    <label htmlFor="my-drawer" className="drawer-button">
                        <div className='flex flex-col justify-center'>
                            <img className='size-[50px] rounded-full border-2 border-slate-500'
                            src={user?.user?.avatarUrl ? user?.user?.avatarUrl : ""} />
                        </div>
                    </label>
                </div> 
                <div className="drawer-side z-[100]">
                    <label htmlFor="my-drawer" aria-label="close sidebar" className="drawer-overlay"></label>
                    <ul className="menu p-4 w-80 min-h-full bg-base-200 text-base-content relative z-40">
                    {/* Sidebar content here */}
                        <ProfileDrawer size={25}/>
                        <HomeDrawer size={23}/>
                        <CreateBlogDrawer size={25} />
                        <Logout size={25}/>
                        <Explore />
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default Drawer