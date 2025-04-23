"use client"

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import useRefetch from '@/hooks/use-refetch'
import { api } from '@/trpc/react'
import Image from 'next/image'
import React from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'

type FormInput = {
  repoUrl: string
  projectName: string
  githubToken?: string
}

const CreatePage = () => {
  const { register, handleSubmit, reset  } = useForm<FormInput>()
  const createProject = api.project.createProject.useMutation()
  const refetch = useRefetch()

  function onSubmit(data: FormInput) {
    createProject.mutate({
      githubUrl: data.repoUrl,
      name: data.projectName,
      githubToken: data.githubToken
    }, {
      onSuccess: () => {
        toast.success('Project created successfully')
        refetch()
        reset()
      },
      onError: () => {
        toast.error('Faild to create project')
      }
    })
    return true
  }
  return (
    <div className='flex items-center gap-2 h-full justify-center'>
      <Image src='/under_git.png' alt='image' height={180} width={120}/>
      <div>
        <div>
          <h1 className='font-semibold text-2xl'>
            Link you Github Repository
          </h1>
          <p className='text-sm text-muted-foreground'>
            Enter the URL of your repository to link it to Replora
          </p>
        </div>
         <div className='h-4'></div>
         <div>
            <form onSubmit={handleSubmit(onSubmit)}>
              <Input
                {...register('projectName', { required: true })}
                placeholder='ProjectName'
                required
              />
              <div className='h-2'></div>
              <Input
                {...register('repoUrl', { required: true })}
                placeholder='Github URL'
                type='url'
                required
               />
              <div className='h-2'></div>
              <Input
                {...register('githubToken')}
                placeholder=' githubToken (optional)'
               />
               <div className='h-4'></div>
               <Button type='submit' disabled={createProject.isPending}>
                  Create Project
               </Button>
            </form>
         </div>
      </div>
    </div>
  )
}

export default CreatePage