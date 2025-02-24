import { Outlet } from 'react-router-dom'

const AuthLayout = () => {
  return (
    <main className='h-screen w-screen bg-grey-100 flex justify-center items-center'>
        <Outlet/>
    </main>
  )
}

export default AuthLayout