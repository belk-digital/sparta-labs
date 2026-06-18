'use client'

import React, { useEffect, useState } from 'react'

const NavBadges: React.FC = () => {
  const [pendingOrders, setPendingOrders] = useState(0)

  useEffect(() => {
    fetch('/api/orders?where[status][equals]=pending&limit=0')
      .then((r) => r.json())
      .then((data) => setPendingOrders(data.totalDocs || 0))
      .catch(() => {})
  }, [])

  if (!pendingOrders) return null

  return (
    <div style={{ padding: '4px 12px', fontSize: 12 }}>
      <span
        style={{
          background: '#dc2626',
          color: '#fff',
          borderRadius: 10,
          padding: '2px 8px',
          fontSize: 11,
          fontWeight: 600,
        }}
      >
        {pendingOrders} pending
      </span>
    </div>
  )
}

export default NavBadges
