
import { roleRequired } from '@/lib/core/sessions'
import React from 'react'

const ChefLayout = async({children}) => {
   await roleRequired('chef')
  return children
}

export default ChefLayout