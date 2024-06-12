import React from 'react'
import "../styles/Footer.css"

const Footer = () => {
  return (
    <footer>
            Copyright &copy; {new Date(Date.now()).getFullYear()} All rights reserved
    </footer>
  )
}

export default Footer
