'use client'
import { AstralisProvider } from 'astralis-ui'
import "astralis-ui/styles.css";
import Navbar from './navbar';

export default function LayoutWrapper({ children }: { children: React.ReactNode }) {
  return (
    <AstralisProvider defaultTheme="system">
           <Navbar/> 
      <div className=''>
        {children}
      </div>
    </AstralisProvider>
  )
}
