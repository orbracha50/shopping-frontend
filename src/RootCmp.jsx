import { Routes, Route } from 'react-router'
import { UserMsg } from './cmps/UserMsg'
import { AppHeader } from './cmps/AppHeader'
import { HomePage } from './pages/HomePage'
import { LoginPage } from './cmps/LoginPage'




export function RootCmp() {
  return (
    <div >
      <main className='main-container '>
        <AppHeader />
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/login' element={<LoginPage />} />
        </Routes>

      </main>
      <UserMsg />

    </div>
  )
}
