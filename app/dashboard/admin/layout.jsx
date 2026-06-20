import { roleRequired } from '@/lib/core/sessions'
import React from 'react'

const AdminLayout = async({children}) => {
   await roleRequired('admin')
  return children
}

export default AdminLayout