'use client'

import { Suspense } from 'react'
import dynamic from 'next/dynamic'

// بارگذاری پویای کامپوننت سمت کلاینت
const DynamicProfileTab = dynamic(
  () => import('./tabs/ProfileTab'),
  {
    loading: () => null,
    ssr: false
  }
)

interface ClientProfileTabProps {
  fallback: React.ReactNode
}

export default function ClientProfileTab({ fallback }: ClientProfileTabProps) {
  return (
    <Suspense fallback={fallback}>
      <DynamicProfileTab />
    </Suspense>
  )
}