import { Routes, Route } from 'react-router'
import { UserMsg } from './cmps/UserMsg'
import { AppHeader } from './cmps/AppHeader'
import { HomePage } from './pages/HomePage'




export function RootCmp() {
  return (
    <div >
      <main className='main-container '>
        <AppHeader />
        <Routes>
          <Route path='/' element={<HomePage />} />
        </Routes>

      </main>
      <UserMsg />

    </div>
  )
}
