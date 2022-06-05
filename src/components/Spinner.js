import React from 'react'
import loading from './Images/loading.gif'

export default function Spinnner() {
  return (
    <div className='text-center'>
      <img src={loading} alt="Loading..." />
    </div>
  )
}
