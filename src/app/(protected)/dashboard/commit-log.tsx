"use client"

import React from 'react'
import useProject from '@/hooks/use-project'
import { api } from '@/trpc/react'
import { cn } from '@/lib/utils'
import Link from 'next/link'
import { ExternalLink } from 'lucide-react'
import Image from 'next/image'

const CommitLog = () => {
  const { projectId, project } = useProject()
  const { data: commits, } = api.project.getCommits.useQuery({ projectId })
  return (
    <>
      <ul className='space-y-6'>
        {commits?.map((commit, commitIdx) => {
          return <li key={commit.id} className='relative flex gap-x-4'>
              <div className={cn(
                commitIdx === commits.length -1 ? 'h-8' : '-bottom-6',
                'absolute left-0 top-0 flex w-6 justify-center'
              )}>
                <div className='w-px transalate-x-1 bg-gray-200'></div>
              </div>
              <>
                <img src={commit.commitAuthorAvatar} alt='commit Avatar' className='relative mt-4 size-8 flex-none rounded-full bg-gray-500' />
                <div className="flex-auto rounded-md bg-white p-3 ring-1 ring-inset ring-gray-200">
                  <div>
                    <Link target='_blank' href={`${project?.githubUrl}/commits/${commit.commitHash}`} className='py-0.5 text-xs leading-5'>
                      <span className='font-medium text-gray-900'>
                        {commit.commitAuthorName}
                      </span>
                      <span>
                        committed
                        <ExternalLink className='ml-1 size-4' />
                      </span>
                    </Link>
                  </div>
                  <span className='font-semibold'>
                  {commit.commitMessage}
                    </span>
                  <pre className='mt-2 text-sm whitespace-pre-wrap leading-6 text-gray-500'>
                    {commit.summary}
                  </pre>
                </div>

              </>
          </li>
        })}
      </ul>
    </>
  )
}

export default CommitLog