'use client'

import React from 'react'
import { useField } from '@payloadcms/ui'
import type { TextFieldClientProps } from 'payload'

export const VariantSelect: React.FC<TextFieldClientProps> = ({ path, field }) => {
  const { value, setValue } = useField<string>({ path: path || field?.name || '' })

  return (
    <div style={{ marginBottom: 16 }}>
      <label style={{ display: 'block', marginBottom: 4, fontSize: 13, fontWeight: 500 }}>
        {field?.label as string || 'Variant SKU'}
      </label>
      <input
        type="text"
        value={value || ''}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Enter variant SKU"
        style={{
          width: '100%',
          padding: '8px 12px',
          border: '1px solid #ccc',
          borderRadius: 4,
          fontSize: 14,
        }}
      />
      {field?.admin?.description && (
        <p style={{ fontSize: 12, color: '#666', marginTop: 4 }}>
          {field.admin.description as string}
        </p>
      )}
    </div>
  )
}
