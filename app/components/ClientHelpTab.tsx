'use client'

import { Suspense } from 'react'
import dynamic from 'next/dynamic'

// بارگذاری پویای کامپوننت سمت کلاینت
const DynamicHelpTab = dynamic(
  () => import('./tabs/HelpTab'),
  {
    loading: () => null,
    ssr: false
  }
)

interface ClientHelpTabProps {
  fallback: React.ReactNode
}

export default function ClientHelpTab({ fallback }: ClientHelpTabProps) {
  return (
    <Suspense fallback={fallback}>
      <DynamicHelpTab />
    </Suspense>
  )
} 