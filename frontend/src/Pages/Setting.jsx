import React from 'react'
import { Route, Routes } from 'react-router-dom'
import SettingsProfile from '../Components/Settings/SettingsProfile'
import SettingSideBar from '../Components/Settings/SettingSideBar'
import SettingSocialMedia from '../Components/Settings/SettingSocialMedia'
import SettingChangeAvatar from '../Components/Settings/SettingChangeAvatar'

const Setting = () => {
  return (
    <div className='h-full flex justify-center px-4 pt-10'>
        <SettingSideBar />
        <Routes>
            <Route path='/profile' element={<SettingsProfile />} />
            <Route path='/socialmedia' element={<SettingSocialMedia />} />
            <Route path='/changeavatar' element={<SettingChangeAvatar />} />
        </Routes>
    </div>
  )
}

export default Setting