'use client'
import BlogEditor from '@/components/ui/BlogEditor'
import React from 'react'

const Edit = ({params}) => {
    console.log('params', params)
  return (
    <>
        <BlogEditor blogId={params.id} />
    </>
  )
}

export default Edit