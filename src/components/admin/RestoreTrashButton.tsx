'use client'

import React, { useState } from 'react'
import { useDocumentInfo } from '@payloadcms/ui'

export const RestoreTrashButton: React.FC = () => {
  const { id } = useDocumentInfo()
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')

  const handleRestore = async () => {
    if (!id || !confirm('Restore this document to its original collection?')) return
    setLoading(true)
    setMessage('')
    try {
      const res = await fetch(`/api/trash/${id}/restore`, { method: 'POST' })
      const data = await res.json()
      if (res.ok) {
        setMessage(`Restored to ${data.collectionSlug}`)
        setTimeout(() => window.location.assign('/admin/collections/trash'), 1500)
      } else {
        setMessage(data.error || 'Restore failed')
      }
    } catch {
      setMessage('Network error')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{ marginBottom: 16 }}>
      <button
        onClick={handleRestore}
        disabled={loading}
        style={{
          width: '100%',
          padding: '10px 16px',
          background: '#333',
          color: '#fff',
          border: 'none',
          borderRadius: 4,
          cursor: loading ? 'wait' : 'pointer',
          fontSize: 14,
        }}
      >
        {loading ? 'Restoring...' : 'Restore Document'}
      </button>
      {message && <p style={{ marginTop: 8, fontSize: 13 }}>{message}</p>}
    </div>
  )
}
