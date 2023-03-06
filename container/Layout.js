
import Header from './Header'
import Footer from './Footer'

export default function Layout({ children }) {
  return (
    <>
    
    <div className='grid h-screen place-items-center'>
    <div className="container">
      
      <main  >{children}</main>
     
      </div></div>
      
    </>
  )
}