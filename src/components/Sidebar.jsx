// import { NavLink } from 'react-router-dom';

// const navMain = [
//   { to:'/', label:'Dashboard', exact:true,
//     icon:<svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect x="3" y="3" width="7" height="7" rx="1.5"/><rect x="14" y="3" width="7" height="7" rx="1.5"/><rect x="3" y="14" width="7" height="7" rx="1.5"/><rect x="14" y="14" width="7" height="7" rx="1.5"/></svg>
//   },
//   { to:'/kyc', label:'KYC Review', badge:24,
//     icon:<svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M9 12l2 2 4-4"/><circle cx="12" cy="12" r="10"/></svg>
//   },
//   { to:'/users', label:'Users',
//     icon:<svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75"/></svg>
//   },
//   { to:'/wallets', label:'Wallets',
//     icon:<svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M20 7H4a2 2 0 00-2 2v10a2 2 0 002 2h16a2 2 0 002-2V9a2 2 0 00-2-2z"/><path d="M16 3H8L4 7h16l-4-4z"/><circle cx="17" cy="13" r="1"/></svg>
//   },
// ];

// const navReports = [
//   { to:'/analytics', label:'Analytics',
//     icon:<svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>
//   },
//   { to:'/audit', label:'Audit Log',
//     icon:<svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>
//   },
//   { to:'/notifications', label:'Notifications', badge:5,
//     icon:<svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 01-3.46 0"/></svg>
//   },
// ];

// const NavGroup = ({ items }) =>
//   items.map(item => (
//     <NavLink key={item.to} to={item.to} end={!!item.exact} style={{ textDecoration:'none' }}>
//       {({ isActive }) => (
//         <div className={`nav-item${isActive ? ' active' : ''}`}>
//           {item.icon}
//           <span style={{ flex:1 }}>{item.label}</span>
//           {item.badge && <span className="nav-badge">{item.badge}</span>}
//         </div>
//       )}
//     </NavLink>
//   ));

// export default function Sidebar({ onLogout }) {
//   return (
//     <aside className="sidebar">

//       {/* ── Logo: uses your real PNG image ── */}
//       <div style={{
//         padding: '16px 16px 14px',
//         borderBottom: '1px solid rgba(255,255,255,0.07)',
//         display: 'flex',
//         alignItems: 'center',
//         justifyContent: 'center',
//       }}>
//         <img
//           src={process.env.PUBLIC_URL + "/images/payo-wide-logo-removebg-preview.png"}
//           alt="PayO Admin Portal"
//           style={{
//             width: '100%',
//             maxWidth: 200,
//             height: 'auto',
//             objectFit: 'contain',
//             display: 'block',
//           }}
//         />
//       </div>

//       <nav className="sidebar-nav">
//         <div className="nav-section-label">Main</div>
//         <NavGroup items={navMain} />
//         <div className="nav-section-label">Reports</div>
//         <NavGroup items={navReports} />
//       </nav>

//       <div className="sidebar-footer">
//         <div className="logout-btn" onClick={onLogout}>
//           <svg width="17" height="17" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
//             <path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4M16 17l5-5-5-5M21 12H9"/>
//           </svg>
//           Logout
//         </div>
//       </div>
//     </aside>
//   );
// }



import { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { getAllSubmissions } from '../apis/adminApi'; 

/* Helper function from your Notifications component to check status */
function normalizeStatus(s) {
  if (!s) return 'Pending';
  const m = {
    not_started:        'Pending',
    documents_uploaded: 'In Review',
    under_review:       'In Review',
    approved:           'Approved',
    rejected:           'Failed',
  };
  return m[s] || s;
}

const NavGroup = ({ items }) =>
  items.map(item => (
    <NavLink key={item.to} to={item.to} end={!!item.exact} style={{ textDecoration:'none' }}>
      {({ isActive }) => (
        <div className={`nav-item ${isActive ? 'active' : ''}`}>
          {item.icon}
          <span style={{ flex:1 }}>{item.label}</span>
          {item.badge > 0 && <span className="nav-badge">{item.badge}</span>}
        </div>
      )}
    </NavLink>
  ));

export default function Sidebar({ onLogout }) {
  const [pendingKycCount, setPendingKycCount] = useState(0);
  const [unreadNotifCount, setUnreadNotifCount] = useState(0);

  useEffect(() => {
    // Fetch submissions on load to get both badge counts
    getAllSubmissions()
      .then(res => {
        const arr = res.data?.kycs || [];
        
        // 1. Calculate KYC 'In Review' badge
        const needsReview = arr.filter(
          r => r.status === 'under_review' || r.status === 'documents_uploaded'
        ).length;
        setPendingKycCount(needsReview);

        // 2. Calculate Unread Notifications badge
        // Based on your Notifications.js logic, unread = status is 'Pending'
        const unreadCount = arr.filter(
          r => normalizeStatus(r.status) === 'Pending'
        ).length;
        setUnreadNotifCount(unreadCount);
      })
      .catch(err => console.error("Failed to load badge counts", err));
  }, []);

  const navMain = [
    { to:'/', label:'Dashboard', exact:true,
      icon:<svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect x="3" y="3" width="7" height="7" rx="1.5"/><rect x="14" y="3" width="7" height="7" rx="1.5"/><rect x="3" y="14" width="7" height="7" rx="1.5"/><rect x="14" y="14" width="7" height="7" rx="1.5"/></svg>
    },
    { to:'/kyc', label:'KYC Review', 
      badge: pendingKycCount, 
      icon:<svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M9 12l2 2 4-4"/><circle cx="12" cy="12" r="10"/></svg>
    },
    { to:'/users', label:'Users',
      icon:<svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75"/></svg>
    },
    { to:'/wallets', label:'Wallets',
      icon:<svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M20 7H4a2 2 0 00-2 2v10a2 2 0 002 2h16a2 2 0 002-2V9a2 2 0 00-2-2z"/><path d="M16 3H8L4 7h16l-4-4z"/><circle cx="17" cy="13" r="1"/></svg>
    },
  ];

  // Moved navReports INSIDE the component so it has access to unreadNotifCount state
  const navReports = [
    { to:'/analytics', label:'Analytics',
      icon:<svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>
    },
    { to:'/audit', label:'Audit Log',
      icon:<svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>
    },
    { to:'/notifications', label:'Notifications', 
      badge: unreadNotifCount, // Dynamic badge attached here
      icon:<svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 01-3.46 0"/></svg>
    },
  ];

  return (
    <aside className="sidebar">
      <div style={{
        padding: '16px 16px 14px',
        borderBottom: '1px solid rgba(255,255,255,0.07)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
        <img
          src={process.env.PUBLIC_URL + "/images/payo-wide-logo-removebg-preview.png"}
          alt="PayO Admin Portal"
          style={{
            width: '100%',
            maxWidth: 200,
            height: 'auto',
            objectFit: 'contain',
            display: 'block',
          }}
        />
      </div>

      <nav className="sidebar-nav">
        <div className="nav-section-label">Main</div>
        <NavGroup items={navMain} />
        <div className="nav-section-label">Reports</div>
        <NavGroup items={navReports} />
      </nav>

      <div className="sidebar-footer">
        <div className="logout-btn" onClick={onLogout}>
          <svg width="17" height="17" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4M16 17l5-5-5-5M21 12H9"/>
          </svg>
          Logout
        </div>
      </div>
    </aside>
  );
}