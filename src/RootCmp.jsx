import { Routes, Route } from 'react-router'
import { UserMsg } from './cmps/UserMsg'
import { AppHeader } from './cmps/AppHeader'




export function RootCmp() {
  return (
    <div >
      <main className='main-container '>
     
        <Routes>
    <Route path='/' element={<AppHeader/>}/>
        </Routes>
       
      </main>
      <UserMsg />

    </div>
  )
}
