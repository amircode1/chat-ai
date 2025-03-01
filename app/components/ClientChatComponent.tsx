'use client'

import { Suspense } from 'react'
import dynamic from 'next/dynamic'

// بارگذاری پویای کامپوننت سمت کلاینت
const DynamicChatComponent = dynamic(
  () => import('./ChatComponent'),
  {
    loading: () => null,
    ssr: false
  }
)

interface ClientChatComponentProps {
  fallback: React.ReactNode
}

export default function ClientChatComponent({ fallback }: ClientChatComponentProps) {
  return (
    <Suspense fallback={fallback}>
      <DynamicChatComponent />
    </Suspense>
  )
} 