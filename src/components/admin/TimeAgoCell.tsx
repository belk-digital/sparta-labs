'use client'

import React from 'react'
import type { DefaultCellComponentProps } from 'payload'

const TimeAgoCell: React.FC<DefaultCellComponentProps> = ({ cellData }) => {
  if (!cellData) return <span>—</span>

  const date = new Date(cellData as string)
  const now = new Date()
  const diffMs = now.getTime() - date.getTime()
  const diffMins = Math.floor(diffMs / 60000)
  const diffHours = Math.floor(diffMins / 60)
  const diffDays = Math.floor(diffHours / 24)

  let label: string
  if (diffMins < 1) label = 'just now'
  else if (diffMins < 60) label = `${diffMins}m ago`
  else if (diffHours < 24) label = `${diffHours}h ago`
  else if (diffDays < 30) label = `${diffDays}d ago`
  else label = date.toLocaleDateString()

  return <span>{label}</span>
}

export default TimeAgoCell
