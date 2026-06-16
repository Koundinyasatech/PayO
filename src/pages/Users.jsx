


// import { useState, useEffect } from 'react';
// import { getAllUsers } from '../apis/adminApi';
// import { useNavigate } from 'react-router-dom';

// function Skeleton({ w='100%', h=16, radius=6, style={} }) {
//   return <div style={{ width:w, height:h, borderRadius:radius, background:'linear-gradient(90deg,var(--skeleton-a,#E2E8F0) 25%,var(--skeleton-b,#F1F5F9) 50%,var(--skeleton-a,#E2E8F0) 75%)', backgroundSize:'200% 100%', animation:'shimmer 1.4s infinite', ...style }}/>;
// }

// const COLORS = ['#6C63FF','#FF6584','#43E97B','#FA8231','#E74C3C','#3498DB','#9B59B6','#1ABC9C','#E67E22','#2ECC71'];
// function getInitials(name) { if (!name) return '?'; return name.split(' ').map(w=>w[0]).join('').toUpperCase().slice(0,2); }

// // Mask account number — show only last 4 digits: **** **** 0012
// function maskAccount(num) {
//   if (!num) return '—';
//   const s = String(num);
//   return s.length <= 4 ? s : '•••• •••• ' + s.slice(-4);
// }

// function kycLabel(v)  { return v ? 'Verified' : 'Pending'; }
// function kycClass(v)  { return v ? 'b-approved' : 'b-pending'; }

// // Helper to extract the creation date from MongoDB ObjectId if createdAt is missing
// function getCreationDate(u) {
//   if (u.createdAt) return new Date(u.createdAt);
//   if (u._id) return new Date(parseInt(String(u._id).substring(0, 8), 16) * 1000);
//   return null;
// }

// function UserModal({ u, onClose }) {
//   const [tab, setTab] = useState('details');
//   const [fetchedWallet, setFetchedWallet] = useState(u?.walletAddress || null);
//   const [fetchedBalance, setFetchedBalance] = useState(u?.walletBalance ?? null); 
//   const [walletLoading, setWalletLoading] = useState(false);

//   // Fetch the wallet address & balance from the profile endpoint
//   useEffect(() => {
//     if (u && tab === 'details' && !fetchedWallet) {
//       setWalletLoading(true);
      
//       const token = localStorage.getItem('payo_token'); 
      
//       fetch(`https://shadily-hazard-widget.ngrok-free.dev/api/wallet/profile?userId=${u._id}`, {
//         method: 'GET', 
//         headers: {
//           'Content-Type': 'application/json',
//           'ngrok-skip-browser-warning': 'true',
//           'Authorization': `Bearer ${token}` 
//         }
//       })
//       .then(async (res) => {
//         if (!res.ok) {
//           const errText = await res.text();
//           throw new Error(`${res.status} ${res.statusText}: ${errText}`);
//         }
//         return res.json();
//       })
//       .then(data => {
//         // 1. Set Wallet Address
//         const address = data?.data?.walletAddress 
//                      || data?.walletAddress 
//                      || data?.profile?.walletAddress 
//                      || data?.address 
//                      || '—';
//         setFetchedWallet(address);

//         // 2. Set Wallet Balance dynamically from API
//         const bal = data?.data?.balance ?? data?.balance ?? null;
//         if (bal !== null && bal !== undefined) {
//           setFetchedBalance(bal);
//         }
//       })
//       .catch(err => {
//         console.error('🔥 Fetch Error:', err);
//         if (err.message === 'Failed to fetch') {
//            setFetchedWallet('CORS Error / Network Failure');
//         } else {
//            setFetchedWallet(`Error: ${err.message}`);
//         }
//       })
//       .finally(() => {
//         setWalletLoading(false);
//       });
//     }
//   }, [u, tab, fetchedWallet]); // ✅ Warning Fixed: Included all used variables in the dependency array

//   if (!u) return null;

//   const isVerified = u.kycVerified === true;
//   const bank       = u.bankDetails || null; 
//   const creationDt = getCreationDate(u); 

//   return (
//     <div className="overlay" onClick={e => e.target === e.currentTarget && onClose()}>
//       <div className="modal" style={{ maxWidth: 540 }}>

//         {/* Header */}
//         <div className="modal-head">
//           <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
//             <div style={{ width: 44, height: 44, borderRadius: 12, background: u.color, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 17, fontWeight: 700, color: '#fff' }}>
//               {u.initials}
//             </div>
//             <div>
//               <h3 style={{ margin: 0 }}>{u.name || 'Unknown'}</h3>
//               <div style={{ fontSize: 12, color: 'var(--gray-400)', marginTop: 2, display: 'flex', alignItems: 'center', gap: 7 }}>
//                 <span>{String(u._id).slice(-10)}</span>
//                 <span className={`badge ${kycClass(isVerified)}`} style={{ fontSize: 10 }}>{kycLabel(isVerified)}</span>
//               </div>
//             </div>
//           </div>
//           <button className="btn btn-ghost icon-btn" onClick={onClose}>
//             <svg width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
//           </button>
//         </div>

//         {/* Tabs */}
//         <div className="modal-tabs">
//           {[['details','👤 Details'],['bank','🏦 Bank Details'],['wallet','💰 Wallet']].map(([k,l]) => (
//             <button key={k} className={`mtab${tab===k?' act':''}`} onClick={() => setTab(k)}>{l}</button>
//           ))}
//         </div>

//         <div className="modal-body">

//           {/* ── DETAILS TAB ── */}
//           {tab === 'details' && (
//             <div>
//               <div className="section-title" style={{ marginBottom: 12 }}>Personal Information</div>
//               <div className="detail-grid">
//                 {[
//                   ['Full Name', u.name || '—'],
//                   ['Email', u.email || '—'],
//                   ['Mobile', u.mobile || '—'],
//                   ['Role', u.role || 'user'],
//                   ['KYC Status', kycLabel(isVerified)],
                  
//                   // Dynamically Loaded Wallet Address
//                   ['Wallet Address', walletLoading ? 'Loading...' : (fetchedWallet || '—')],

//                   ['Created Date', creationDt 
//                     ? creationDt.toLocaleDateString('en-IN', { 
//                         day: '2-digit', 
//                         month: 'short', 
//                         year: 'numeric' 
//                       }) 
//                     : '—'
//                   ],
//                 ].map(([l,v]) => (
//                   <div className="detail-item" key={l}><label>{l}</label><span>{v}</span></div>
//                 ))}
//               </div>
//             </div>
//           )}

//           {/* ── BANK DETAILS TAB ── */}
//           {tab === 'bank' && (
//             <div>
//               {bank ? (
//                 <>
//                   <div style={{ background: 'linear-gradient(135deg,#1E3A6E,#0D1B3E)', borderRadius: 14, padding: '20px 22px', marginBottom: 20, color: '#fff', position: 'relative', overflow: 'hidden' }}>
//                     <div style={{ position: 'absolute', top: -25, right: -25, width: 110, height: 110, borderRadius: '50%', background: 'rgba(255,255,255,0.05)' }}/>
//                     <div style={{ position: 'absolute', bottom: -20, left: -10, width: 80, height: 80, borderRadius: '50%', background: 'rgba(255,255,255,0.04)' }}/>
//                     <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 18 }}>
//                       <div>
//                         <div style={{ fontSize: 10, fontWeight: 600, opacity: 0.6, letterSpacing: '1px', textTransform: 'uppercase', marginBottom: 4 }}>Bank Name</div>
//                         <div style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: 17, fontWeight: 700 }}>{bank.bankName}</div>
//                       </div>
//                       <div style={{ background: 'rgba(255,255,255,0.12)', borderRadius: 8, padding: '4px 10px', fontSize: 12, fontWeight: 600 }}>
//                         {bank.accountType}
//                       </div>
//                     </div>
//                     <div style={{ marginBottom: 14 }}>
//                       <div style={{ fontSize: 10, fontWeight: 600, opacity: 0.6, letterSpacing: '1px', textTransform: 'uppercase', marginBottom: 4 }}>Account Number</div>
//                       <div style={{ fontFamily: 'monospace', fontSize: 16, fontWeight: 600, letterSpacing: '2px' }}>{maskAccount(bank.accountNumber)}</div>
//                     </div>
//                     <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
//                       <div>
//                         <div style={{ fontSize: 10, fontWeight: 600, opacity: 0.6, letterSpacing: '1px', textTransform: 'uppercase', marginBottom: 3 }}>Account Holder</div>
//                         <div style={{ fontSize: 14, fontWeight: 600 }}>{bank.accountHolderName}</div>
//                       </div>
//                       <div style={{ background: bank.isTpinCreated ? 'rgba(16,185,129,0.25)' : 'rgba(239,68,68,0.2)', borderRadius: 20, padding: '3px 10px', fontSize: 11, fontWeight: 600, color: bank.isTpinCreated ? '#6EE7B7' : '#FCA5A5' }}>
//                         {bank.isTpinCreated ? '🔐 TPIN Set' : '⚠️ No TPIN'}
//                       </div>
//                     </div>
//                   </div>

//                   <div className="section-title" style={{ marginBottom: 12 }}>Bank Details</div>
//                   <div className="detail-grid">
//                     {[
//                       ['Account Holder', bank.accountHolderName],
//                       ['Bank Name',      bank.bankName],
//                       ['Account No.',    maskAccount(bank.accountNumber)],
//                       ['IFSC Code',      bank.ifscCode],
//                       ['Account Type',   bank.accountType],
//                       ['Mobile (Bank)',  bank.mobileNumber],
//                       ['TPIN Created',   bank.isTpinCreated ? 'Yes ✓' : 'No'],
//                       ['Added On',       bank.createdAt ? new Date(bank.createdAt).toLocaleDateString('en-IN', { day:'2-digit', month:'short', year:'numeric' }) : '—'],
//                     ].map(([l,v]) => (
//                       <div className="detail-item" key={l}><label>{l}</label><span>{v}</span></div>
//                     ))}
//                   </div>
//                 </>
//               ) : (
//                 <div style={{ textAlign: 'center', padding: '40px 20px' }}>
//                   <div style={{ fontSize: 36, marginBottom: 12 }}>🏦</div>
//                   <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--navy)', marginBottom: 6 }}>No Bank Account Added</div>
//                   <div style={{ fontSize: 13, color: 'var(--gray-400)', lineHeight: 1.6 }}>
//                     This user has not linked a bank account yet.
//                   </div>
//                 </div>
//               )}
//             </div>
//           )}

//           {/* ── WALLET TAB ── */}
//           {tab === 'wallet' && (
//             <div>
//               <div style={{ background: isVerified ? 'linear-gradient(135deg,#0D1B3E,#1E3A6E)' : 'linear-gradient(135deg,#374151,#4B5563)', borderRadius: 14, padding: '22px 24px', marginBottom: 20, color: '#fff', position: 'relative', overflow: 'hidden' }}>
//                 <div style={{ position: 'absolute', top: -20, right: -20, width: 100, height: 100, borderRadius: '50%', background: 'rgba(255,255,255,0.05)' }}/>
//                 <div style={{ fontSize: 11, fontWeight: 600, opacity: 0.6, letterSpacing: '1px', textTransform: 'uppercase', marginBottom: 6 }}>PYO Token Balance</div>
                
//                 <div style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: 32, fontWeight: 700, letterSpacing: '-1px' }}>
//                   {walletLoading ? '...' : (fetchedBalance ?? u.walletBalance ?? 0).toLocaleString()}
//                   <span style={{ fontSize: 18, opacity: 0.65, marginLeft: 8 }}>PYO</span>
//                 </div>

//                 <div style={{ marginTop: 14, display: 'flex', justifyContent: 'space-between', fontSize: 12, opacity: 0.65 }}>
//                   <span>KYC: {kycLabel(isVerified)}</span>
//                   <span style={{ background: isVerified ? 'rgba(16,185,129,0.25)' : 'rgba(239,68,68,0.25)', padding: '2px 10px', borderRadius: 20, color: isVerified ? '#6EE7B7' : '#FCA5A5', fontWeight: 600 }}>
//                     {isVerified ? '● Active' : '● Inactive'}
//                   </span>
//                 </div>
//               </div>
//               <div className="detail-grid">
//                 {[
//                   ['Wallet Status',  isVerified ? 'Active' : 'Inactive'],
//                   ['Balance',        walletLoading ? 'Loading...' : `${(fetchedBalance ?? u.walletBalance ?? 0).toLocaleString()} PYO`],
//                   ['KYC Verified',   isVerified ? 'Yes ✓' : 'No'],
//                 ].map(([l,v]) => (
//                   <div className="detail-item" key={l}><label>{l}</label><span>{v}</span></div>
//                 ))}
//               </div>
//             </div>
//           )}
//         </div>

//         <div className="modal-foot">
//           <button className="btn btn-outline" onClick={onClose}>Close</button>
//         </div>
//       </div>
//     </div>
//   );
// }

// // ── Main Users Page ────────────────────────────────────────────────────────
// export default function Users() {
//   const [users, setUsers]     = useState([]);
//   const [totals, setTotals]   = useState({ total:0, verified:0, pending:0 });
//   const [loading, setLoading] = useState(true);
//   const [error, setError]     = useState('');
//   const [search, setSearch]   = useState('');
//   const [fKYC, setFKYC]       = useState('All');
//   const [sel, setSel]         = useState(null);
//   const [page, setPage]       = useState(1);
//   const navigate = useNavigate();
//   const per = 8;

//   useEffect(() => {
//     getAllUsers()
//       .then(res => {
//         const arr = res.data?.users || [];
//         setTotals({
//           total:    res.data?.total    ?? arr.length,
//           verified: res.data?.verified ?? 0,
//           pending:  res.data?.pending  ?? 0,
//         });
//         setUsers(arr.map((u, idx) => ({
//           ...u,
//           initials: getInitials(u.name),
//           color:    COLORS[idx % COLORS.length],
//         })));
//       })
//       .catch(err => setError(err.response?.data?.message || 'Failed to load users'))
//       .finally(() => setLoading(false));
//   }, []);

//   const filtered = users.filter(u => {
//     const mk = fKYC === 'All'
//       || (fKYC === 'Verified' && u.kycVerified === true)
//       || (fKYC === 'Pending'  && u.kycVerified === false);
//     const q  = search.toLowerCase();
//     const ms = !search
//       || (u.name   || '').toLowerCase().includes(q)
//       || (u.email  || '').toLowerCase().includes(q)
//       || (u.mobile || '').toLowerCase().includes(q)
//       || String(u._id).toLowerCase().includes(q);
//     return mk && ms;
//   });

//   const tp    = Math.max(1, Math.ceil(filtered.length / per));
//   const paged = filtered.slice((page-1)*per, page*per);

//   return (
//     <div className="page">
//       <style>{`@keyframes shimmer{0%{background-position:200% 0}100%{background-position:-200% 0}}`}</style>

//       <div className="page-header">
//         <div className="page-header-left">
//           <h2>Users</h2>
//           <p>All registered PayO users with KYC status, wallet balance and bank details.</p>
//         </div>
//         <div style={{ display:'flex', gap:10 }}>
//           {[
//             { label:'Total',    val:totals.total,    color:'#2563EB', bg:'#EFF6FF' },
//             { label:'Verified', val:totals.verified, color:'#059669', bg:'#F0FDF4' },
//             { label:'Pending',  val:totals.pending,  color:'#D97706', bg:'#FFFBEB' },
//           ].map(s => (
//             <div key={s.label} style={{ background:s.bg, border:`1.5px solid ${s.color}33`, borderRadius:10, padding:'9px 16px', textAlign:'center', minWidth:70 }}>
//               <div style={{ fontFamily:"'Space Grotesk',sans-serif", fontSize:18, fontWeight:800, color:s.color }}>{loading ? '—' : s.val.toLocaleString()}</div>
//               <div style={{ fontSize:11, color:s.color, fontWeight:600, opacity:0.8 }}>{s.label}</div>
//             </div>
//           ))}
//         </div>
//       </div>

//       {error && (
//         <div style={{ background:'#FEF2F2', border:'1px solid #FECACA', borderRadius:10, padding:'12px 16px', marginBottom:18, color:'#DC2626', fontSize:13 }}>
//           ⚠️ {error}
//         </div>
//       )}

//       <div className="card">
//         <div className="filter-bar">
//           <div className="search-field">
//             <svg width="14" height="14" fill="none" stroke="var(--gray-400)" strokeWidth="2" viewBox="0 0 24 24"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
//             <input placeholder="Search by name, email, mobile or ID..." value={search} onChange={e => { setSearch(e.target.value); setPage(1); }}/>
//           </div>
//           <select className="filter-select" value={fKYC} onChange={e => { setFKYC(e.target.value); setPage(1); }}>
//             <option value="All">All Users</option>
//             <option value="Verified">KYC Verified</option>
//             <option value="Pending">KYC Pending</option>
//           </select>
//           <div className="filter-count">{loading ? '—' : `${filtered.length} users`}</div>
//         </div>

//         <div className="table-wrap">
//           <table>
//             <thead>
//               <tr>
//                 <th>User</th>
//                 <th>Email</th>
//                 <th>Mobile</th>
//                 <th>Bank</th>
//                 <th>Balance</th>
//                 <th>KYC</th>
//                 <th>Actions</th>
//               </tr>
//             </thead>
//             <tbody>
//               {loading
//                 ? Array(6).fill(0).map((_,i) => (
//                     <tr key={i}>
//                       <td><div style={{ display:'flex', alignItems:'center', gap:10 }}><Skeleton w={34} h={34} radius={8}/><div><Skeleton w={100} h={12} radius={4} style={{ marginBottom:4 }}/><Skeleton w={70} h={10} radius={4}/></div></div></td>
//                       <td><Skeleton w={130} h={12} radius={4}/></td>
//                       <td><Skeleton w={100} h={12} radius={4}/></td>
//                       <td><Skeleton w={110} h={12} radius={4}/></td>
//                       <td><Skeleton w={70}  h={12} radius={4}/></td>
//                       <td><Skeleton w={70}  h={22} radius={20}/></td>
//                       <td><Skeleton w={60}  h={28} radius={8}/></td>
//                     </tr>
//                   ))
//                 : paged.map(u => {
//                     const bank = u.bankDetails || null;
//                     return (
//                       <tr key={u._id}>
//                         <td>
//                           <div className="user-cell">
//                             <div className="avatar" style={{ background:u.color }}>{u.initials}</div>
//                             <div>
//                               <div className="uname">{u.name || '—'}</div>
//                               <div className="uid">{String(u._id).slice(-10)}</div>
//                             </div>
//                           </div>
//                         </td>
//                         <td style={{ fontSize:13, color:'var(--gray-600)' }}>{u.email || '—'}</td>
//                         <td style={{ fontSize:13, color:'var(--gray-600)' }}>{u.mobile || '—'}</td>

//                         <td>
//                           {bank ? (
//                             <div>
//                               <div style={{ fontSize:13, fontWeight:600, color:'var(--navy)' }}>{bank.bankName}</div>
//                               <div style={{ fontSize:11, color:'var(--gray-400)', fontFamily:'monospace' }}>{maskAccount(bank.accountNumber)}</div>
//                             </div>
//                           ) : (
//                             <span style={{ fontSize:12, color:'var(--gray-400)' }}>Not added</span>
//                           )}
//                         </td>

//                         <td>
//                           <div style={{ display:'flex', alignItems:'center', gap:4 }}>
//                             <span style={{ fontWeight:700, fontSize:14, color:(u.walletBalance ?? 0) > 0 ? 'var(--navy)' : 'var(--gray-400)' }}>
//                               {(u.walletBalance ?? 0).toLocaleString()}
//                             </span>
//                             <span style={{ fontSize:10, fontWeight:600, color:'var(--gray-400)', background:'var(--gray-100)', padding:'1px 5px', borderRadius:5 }}>PYO</span>
//                           </div>
//                         </td>

//                         <td><span className={`badge ${kycClass(u.kycVerified)}`}>{kycLabel(u.kycVerified)}</span></td>

//                         <td>
//                           <div className="act-group">
//                             <button className="btn btn-outline" style={{ fontSize:12, padding:'5px 11px' }} onClick={() => setSel(u)}>View</button>
//                             {!u.kycVerified && (
//                               <button className="btn btn-outline" style={{ fontSize:12, padding:'5px 11px', color:'#D97706', borderColor:'#FDE68A' }} onClick={() => navigate('/kyc')}>KYC</button>
//                             )}
//                           </div>
//                         </td>
//                       </tr>
//                     );
//                   })
//               }
//             </tbody>
//           </table>
//           {!loading && paged.length === 0 && <div className="empty">No users found matching your filters.</div>}
//         </div>

//         {!loading && filtered.length > 0 && (
//           <div className="pagination">
//             <div className="pag-info">Showing {Math.min((page-1)*per+1, filtered.length)}–{Math.min(page*per, filtered.length)} of {filtered.length}</div>
//             <div className="pag-btns">
//               <button className="pag-btn" disabled={page===1} onClick={() => setPage(p=>p-1)}>‹</button>
//               {Array.from({ length:tp }, (_,i) => (
//                 <button key={i+1} className={`pag-btn${page===i+1?' act':''}`} onClick={() => setPage(i+1)}>{i+1}</button>
//               ))}
//               <button className="pag-btn" disabled={page===tp} onClick={() => setPage(p=>p+1)}>›</button>
//             </div>
//           </div>
//         )}
//       </div>

//       {sel && <UserModal u={sel} onClose={() => setSel(null)} />}
//     </div>
//   );
// }




import { useState, useEffect } from 'react';
import { getAllUsers } from '../apis/adminApi';
import { useNavigate } from 'react-router-dom';

function Skeleton({ w='100%', h=16, radius=6, style={} }) {
  return <div style={{ width:w, height:h, borderRadius:radius, background:'linear-gradient(90deg,var(--skeleton-a,#E2E8F0) 25%,var(--skeleton-b,#F1F5F9) 50%,var(--skeleton-a,#E2E8F0) 75%)', backgroundSize:'200% 100%', animation:'shimmer 1.4s infinite', ...style }}/>;
}

const COLORS = ['#6C63FF','#FF6584','#43E97B','#FA8231','#E74C3C','#3498DB','#9B59B6','#1ABC9C','#E67E22','#2ECC71'];
function getInitials(name) { if (!name) return '?'; return name.split(' ').map(w=>w[0]).join('').toUpperCase().slice(0,2); }

// Mask account number — show only last 4 digits: **** **** 0012
function maskAccount(num) {
  if (!num) return '—';
  const s = String(num);
  return s.length <= 4 ? s : '•••• •••• ' + s.slice(-4);
}

function kycLabel(v)  { return v ? 'Verified' : 'Pending'; }
function kycClass(v)  { return v ? 'b-approved' : 'b-pending'; }

// ── User Detail Modal ──────────────────────────────────────────────────────
// Confirmed response shape from GET /api/admin/auth/users:
// {
//   success, total, verified, pending,
//   users: [{
//     _id, name, email, mobile,
//     kycVerified (Boolean),
//     walletBalance (Number),
//     createdAt, role,
//     bankDetails: {                       ← null if user hasn't added bank
//       _id, userId,
//       accountHolderName,
//       mobileNumber,
//       bankName,
//       accountNumber,
//       ifscCode,
//       accountType ("Savings"|"Current"),
//       tpin (null — never shown),
//       isTpinCreated (Boolean),
//       createdAt, updatedAt
//     }
//   }]
// }
function UserModal({ u, onClose }) {
  const [tab, setTab] = useState('details');
  if (!u) return null;

  const isVerified = u.kycVerified === true;
  const bank       = u.bankDetails || null;   // null = user hasn't added bank yet

  return (
    <div className="overlay" onClick={e => e.target === e.currentTarget && onClose()}>
      <div className="modal" style={{ maxWidth: 540 }}>

        {/* Header */}
        <div className="modal-head">
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <div style={{ width: 44, height: 44, borderRadius: 12, background: u.color, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 17, fontWeight: 700, color: '#fff' }}>
              {u.initials}
            </div>
            <div>
              <h3 style={{ margin: 0 }}>{u.name || 'Unknown'}</h3>
              <div style={{ fontSize: 12, color: 'var(--gray-400)', marginTop: 2, display: 'flex', alignItems: 'center', gap: 7 }}>
                <span>{String(u._id).slice(-10)}</span>
                <span className={`badge ${kycClass(isVerified)}`} style={{ fontSize: 10 }}>{kycLabel(isVerified)}</span>
              </div>
            </div>
          </div>
          <button className="btn btn-ghost icon-btn" onClick={onClose}>
            <svg width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
          </button>
        </div>

        {/* Tabs */}
        <div className="modal-tabs">
          {[['details','👤 Details'],['bank','🏦 Bank Details'],['wallet','💰 Wallet']].map(([k,l]) => (
            <button key={k} className={`mtab${tab===k?' act':''}`} onClick={() => setTab(k)}>{l}</button>
          ))}
        </div>

        <div className="modal-body">

          {/* ── DETAILS TAB ── */}
          {tab === 'details' && (
            <div>
              <div className="section-title" style={{ marginBottom: 12 }}>Personal Information</div>
              <div className="detail-grid">
                {[
                  ['Full Name',  u.name    || '—'],
                  ['Email',      u.email   || '—'],
                  ['Mobile',     u.mobile  || '—'],
                  ['Role',       u.role    || 'user'],
                  ['KYC Status', kycLabel(isVerified)],
                  ['Joined',     u.createdAt ? new Date(u.createdAt).toLocaleDateString('en-IN', { day:'2-digit', month:'short', year:'numeric' }) : '—'],
                ].map(([l,v]) => (
                  <div className="detail-item" key={l}><label>{l}</label><span>{v}</span></div>
                ))}
              </div>
            </div>
          )}

          {/* ── BANK DETAILS TAB ── */}
          {tab === 'bank' && (
            <div>
              {bank ? (
                <>
                  {/* Bank card visual */}
                  <div style={{ background: 'linear-gradient(135deg,#1E3A6E,#0D1B3E)', borderRadius: 14, padding: '20px 22px', marginBottom: 20, color: '#fff', position: 'relative', overflow: 'hidden' }}>
                    <div style={{ position: 'absolute', top: -25, right: -25, width: 110, height: 110, borderRadius: '50%', background: 'rgba(255,255,255,0.05)' }}/>
                    <div style={{ position: 'absolute', bottom: -20, left: -10, width: 80, height: 80, borderRadius: '50%', background: 'rgba(255,255,255,0.04)' }}/>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 18 }}>
                      <div>
                        <div style={{ fontSize: 10, fontWeight: 600, opacity: 0.6, letterSpacing: '1px', textTransform: 'uppercase', marginBottom: 4 }}>Bank Name</div>
                        {/* bankDetails.bankName */}
                        <div style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: 17, fontWeight: 700 }}>{bank.bankName}</div>
                      </div>
                      <div style={{ background: 'rgba(255,255,255,0.12)', borderRadius: 8, padding: '4px 10px', fontSize: 12, fontWeight: 600 }}>
                        {/* bankDetails.accountType: "Savings" | "Current" */}
                        {bank.accountType}
                      </div>
                    </div>
                    <div style={{ marginBottom: 14 }}>
                      <div style={{ fontSize: 10, fontWeight: 600, opacity: 0.6, letterSpacing: '1px', textTransform: 'uppercase', marginBottom: 4 }}>Account Number</div>
                      {/* bankDetails.accountNumber — masked for security */}
                      <div style={{ fontFamily: 'monospace', fontSize: 16, fontWeight: 600, letterSpacing: '2px' }}>{maskAccount(bank.accountNumber)}</div>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                      <div>
                        <div style={{ fontSize: 10, fontWeight: 600, opacity: 0.6, letterSpacing: '1px', textTransform: 'uppercase', marginBottom: 3 }}>Account Holder</div>
                        {/* bankDetails.accountHolderName */}
                        <div style={{ fontSize: 14, fontWeight: 600 }}>{bank.accountHolderName}</div>
                      </div>
                      <div style={{ background: bank.isTpinCreated ? 'rgba(16,185,129,0.25)' : 'rgba(239,68,68,0.2)', borderRadius: 20, padding: '3px 10px', fontSize: 11, fontWeight: 600, color: bank.isTpinCreated ? '#6EE7B7' : '#FCA5A5' }}>
                        {/* bankDetails.isTpinCreated: Boolean */}
                        {bank.isTpinCreated ? '🔐 TPIN Set' : '⚠️ No TPIN'}
                      </div>
                    </div>
                  </div>

                  {/* All confirmed bank fields */}
                  <div className="section-title" style={{ marginBottom: 12 }}>Bank Details</div>
                  <div className="detail-grid">
                    {[
                      ['Account Holder', bank.accountHolderName],
                      ['Bank Name',      bank.bankName],
                      ['Account No.',    maskAccount(bank.accountNumber)],
                      ['IFSC Code',      bank.ifscCode],
                      ['Account Type',   bank.accountType],
                      ['Mobile (Bank)',  bank.mobileNumber],
                      ['TPIN Created',   bank.isTpinCreated ? 'Yes ✓' : 'No'],
                      ['Added On',       bank.createdAt ? new Date(bank.createdAt).toLocaleDateString('en-IN', { day:'2-digit', month:'short', year:'numeric' }) : '—'],
                    ].map(([l,v]) => (
                      <div className="detail-item" key={l}><label>{l}</label><span>{v}</span></div>
                    ))}
                  </div>
                </>
              ) : (
                // User hasn't added bank details yet
                <div style={{ textAlign: 'center', padding: '40px 20px' }}>
                  <div style={{ fontSize: 36, marginBottom: 12 }}>🏦</div>
                  <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--navy)', marginBottom: 6 }}>No Bank Account Added</div>
                  <div style={{ fontSize: 13, color: 'var(--gray-400)', lineHeight: 1.6 }}>
                    This user has not linked a bank account yet.
                  </div>
                </div>
              )}
            </div>
          )}

          {/* ── WALLET TAB ── */}
          {tab === 'wallet' && (
            <div>
              <div style={{ background: isVerified ? 'linear-gradient(135deg,#0D1B3E,#1E3A6E)' : 'linear-gradient(135deg,#374151,#4B5563)', borderRadius: 14, padding: '22px 24px', marginBottom: 20, color: '#fff', position: 'relative', overflow: 'hidden' }}>
                <div style={{ position: 'absolute', top: -20, right: -20, width: 100, height: 100, borderRadius: '50%', background: 'rgba(255,255,255,0.05)' }}/>
                <div style={{ fontSize: 11, fontWeight: 600, opacity: 0.6, letterSpacing: '1px', textTransform: 'uppercase', marginBottom: 6 }}>PYO Token Balance</div>
                {/* walletBalance — confirmed real field from backend */}
                <div style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: 32, fontWeight: 700, letterSpacing: '-1px' }}>
                  {(u.walletBalance ?? 0).toLocaleString()}
                  <span style={{ fontSize: 18, opacity: 0.65, marginLeft: 8 }}>PYO</span>
                </div>
                <div style={{ marginTop: 14, display: 'flex', justifyContent: 'space-between', fontSize: 12, opacity: 0.65 }}>
                  <span>KYC: {kycLabel(isVerified)}</span>
                  <span style={{ background: isVerified ? 'rgba(16,185,129,0.25)' : 'rgba(239,68,68,0.25)', padding: '2px 10px', borderRadius: 20, color: isVerified ? '#6EE7B7' : '#FCA5A5', fontWeight: 600 }}>
                    {isVerified ? '● Active' : '● Inactive'}
                  </span>
                </div>
              </div>
              <div className="detail-grid">
                {[
                  ['Wallet Status',  isVerified ? 'Active' : 'Inactive'],
                  ['Balance',        `${(u.walletBalance ?? 0).toLocaleString()} PYO`],
                  ['KYC Verified',   isVerified ? 'Yes ✓' : 'No'],
                ].map(([l,v]) => (
                  <div className="detail-item" key={l}><label>{l}</label><span>{v}</span></div>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="modal-foot">
          <button className="btn btn-outline" onClick={onClose}>Close</button>
        </div>
      </div>
    </div>
  );
}

// ── Main Users Page ────────────────────────────────────────────────────────
export default function Users() {
  const [users, setUsers]     = useState([]);
  const [totals, setTotals]   = useState({ total:0, verified:0, pending:0 });
  const [loading, setLoading] = useState(true);
  const [error, setError]     = useState('');
  const [search, setSearch]   = useState('');
  const [fKYC, setFKYC]       = useState('All');
  const [sel, setSel]         = useState(null);
  const [page, setPage]       = useState(1);
  const navigate = useNavigate();
  const per = 8;

  useEffect(() => {
    getAllUsers()
      .then(async (res) => {
        const arr = res.data?.users || [];
        setTotals({
          total:    res.data?.total    ?? arr.length,
          verified: res.data?.verified ?? 0,
          pending:  res.data?.pending  ?? 0,
        });
        
        // 1. Initial Mapping to unblock UI
        const mappedUsers = arr.map((u, idx) => ({
          ...u,
          initials: getInitials(u.name),
          color:    COLORS[idx % COLORS.length],
          walletBalance: u.walletBalance ?? 0, // Fallback balance
        }));
        
        setUsers(mappedUsers);
        setLoading(false);

        // 2. Fetch Dynamic Balances for all users
        const token = localStorage.getItem('payo_token');
        if (mappedUsers.length > 0) {
          const usersWithBalances = await Promise.all(
            mappedUsers.map(async (u) => {
              try {
                const balRes = await fetch(`https://shadily-hazard-widget.ngrok-free.dev/api/wallet/profile?userId=${u._id}`, {
                  method: 'GET',
                  headers: {
                    'Content-Type': 'application/json',
                    'ngrok-skip-browser-warning': 'true',
                    'Authorization': `Bearer ${token}`
                  }
                });
                if (balRes.ok) {
                  const data = await balRes.json();
                  const bal = data?.data?.balance ?? data?.balance ?? 0;
                  return { ...u, walletBalance: bal };
                }
              } catch (err) {
                console.error('Failed to fetch dynamic balance for userId:', u._id, err);
              }
              return u; // Fallback to original if fetch fails
            })
          );
          // Update the table with the newly fetched balances
          setUsers(usersWithBalances);
        }
      })
      .catch(err => {
        setError(err.response?.data?.message || 'Failed to load users');
        setLoading(false);
      });
  }, []);

  const filtered = users.filter(u => {
    const mk = fKYC === 'All'
      || (fKYC === 'Verified' && u.kycVerified === true)
      || (fKYC === 'Pending'  && u.kycVerified === false);
    const q  = search.toLowerCase();
    const ms = !search
      || (u.name   || '').toLowerCase().includes(q)
      || (u.email  || '').toLowerCase().includes(q)
      || (u.mobile || '').toLowerCase().includes(q)
      || String(u._id).toLowerCase().includes(q);
    return mk && ms;
  });

  const tp    = Math.max(1, Math.ceil(filtered.length / per));
  const paged = filtered.slice((page-1)*per, page*per);

  return (
    <div className="page">
      <style>{`@keyframes shimmer{0%{background-position:200% 0}100%{background-position:-200% 0}}`}</style>

      <div className="page-header">
        <div className="page-header-left">
          <h2>Users</h2>
          <p>All registered PayO users with KYC status, wallet balance and bank details.</p>
        </div>
        <div style={{ display:'flex', gap:10 }}>
          {[
            { label:'Total',    val:totals.total,    color:'#2563EB', bg:'#EFF6FF' },
            { label:'Verified', val:totals.verified, color:'#059669', bg:'#F0FDF4' },
            { label:'Pending',  val:totals.pending,  color:'#D97706', bg:'#FFFBEB' },
          ].map(s => (
            <div key={s.label} style={{ background:s.bg, border:`1.5px solid ${s.color}33`, borderRadius:10, padding:'9px 16px', textAlign:'center', minWidth:70 }}>
              <div style={{ fontFamily:"'Space Grotesk',sans-serif", fontSize:18, fontWeight:800, color:s.color }}>{loading ? '—' : s.val.toLocaleString()}</div>
              <div style={{ fontSize:11, color:s.color, fontWeight:600, opacity:0.8 }}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      {error && (
        <div style={{ background:'#FEF2F2', border:'1px solid #FECACA', borderRadius:10, padding:'12px 16px', marginBottom:18, color:'#DC2626', fontSize:13 }}>
          ⚠️ {error}
        </div>
      )}

      <div className="card">
        <div className="filter-bar">
          <div className="search-field">
            <svg width="14" height="14" fill="none" stroke="var(--gray-400)" strokeWidth="2" viewBox="0 0 24 24"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
            <input placeholder="Search by name, email, mobile or ID..." value={search} onChange={e => { setSearch(e.target.value); setPage(1); }}/>
          </div>
          <select className="filter-select" value={fKYC} onChange={e => { setFKYC(e.target.value); setPage(1); }}>
            <option value="All">All Users</option>
            <option value="Verified">KYC Verified</option>
            <option value="Pending">KYC Pending</option>
          </select>
          <div className="filter-count">{loading ? '—' : `${filtered.length} users`}</div>
        </div>

        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>User</th>
                <th>Email</th>
                <th>Mobile</th>
                <th>Bank</th>
                <th>Balance</th>
                <th>KYC</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading
                ? Array(6).fill(0).map((_,i) => (
                    <tr key={i}>
                      <td><div style={{ display:'flex', alignItems:'center', gap:10 }}><Skeleton w={34} h={34} radius={8}/><div><Skeleton w={100} h={12} radius={4} style={{ marginBottom:4 }}/><Skeleton w={70} h={10} radius={4}/></div></div></td>
                      <td><Skeleton w={130} h={12} radius={4}/></td>
                      <td><Skeleton w={100} h={12} radius={4}/></td>
                      <td><Skeleton w={110} h={12} radius={4}/></td>
                      <td><Skeleton w={70}  h={12} radius={4}/></td>
                      <td><Skeleton w={70}  h={22} radius={20}/></td>
                      <td><Skeleton w={60}  h={28} radius={8}/></td>
                    </tr>
                  ))
                : paged.map(u => {
                    const bank = u.bankDetails || null;
                    return (
                      <tr key={u._id}>
                        <td>
                          <div className="user-cell">
                            <div className="avatar" style={{ background:u.color }}>{u.initials}</div>
                            <div>
                              <div className="uname">{u.name || '—'}</div>
                              <div className="uid">{String(u._id).slice(-10)}</div>
                            </div>
                          </div>
                        </td>
                        <td style={{ fontSize:13, color:'var(--gray-600)' }}>{u.email || '—'}</td>
                        <td style={{ fontSize:13, color:'var(--gray-600)' }}>{u.mobile || '—'}</td>

                        {/* bankDetails.bankName — shows bank name or "Not added" */}
                        <td>
                          {bank ? (
                            <div>
                              <div style={{ fontSize:13, fontWeight:600, color:'var(--navy)' }}>{bank.bankName}</div>
                              <div style={{ fontSize:11, color:'var(--gray-400)', fontFamily:'monospace' }}>{maskAccount(bank.accountNumber)}</div>
                            </div>
                          ) : (
                            <span style={{ fontSize:12, color:'var(--gray-400)' }}>Not added</span>
                          )}
                        </td>

                        {/* walletBalance — confirmed real field */}
                        <td>
                          <div style={{ display:'flex', alignItems:'center', gap:4 }}>
                            <span style={{ fontWeight:700, fontSize:14, color:(u.walletBalance ?? 0) > 0 ? 'var(--navy)' : 'var(--gray-400)' }}>
                              {(u.walletBalance ?? 0).toLocaleString()}
                            </span>
                            <span style={{ fontSize:10, fontWeight:600, color:'var(--gray-400)', background:'var(--gray-100)', padding:'1px 5px', borderRadius:5 }}>PYO</span>
                          </div>
                        </td>

                        {/* kycVerified Boolean from backend */}
                        <td><span className={`badge ${kycClass(u.kycVerified)}`}>{kycLabel(u.kycVerified)}</span></td>

                        <td>
                          <div className="act-group">
                            <button className="btn btn-outline" style={{ fontSize:12, padding:'5px 11px' }} onClick={() => setSel(u)}>View</button>
                            {!u.kycVerified && (
                              <button className="btn btn-outline" style={{ fontSize:12, padding:'5px 11px', color:'#D97706', borderColor:'#FDE68A' }} onClick={() => navigate('/kyc')}>KYC</button>
                            )}
                          </div>
                        </td>
                      </tr>
                    );
                  })
              }
            </tbody>
          </table>
          {!loading && paged.length === 0 && <div className="empty">No users found matching your filters.</div>}
        </div>

        {!loading && filtered.length > 0 && (
          <div className="pagination">
            <div className="pag-info">Showing {Math.min((page-1)*per+1, filtered.length)}–{Math.min(page*per, filtered.length)} of {filtered.length}</div>
            <div className="pag-btns">
              <button className="pag-btn" disabled={page===1} onClick={() => setPage(p=>p-1)}>‹</button>
              {Array.from({ length:tp }, (_,i) => (
                <button key={i+1} className={`pag-btn${page===i+1?' act':''}`} onClick={() => setPage(i+1)}>{i+1}</button>
              ))}
              <button className="pag-btn" disabled={page===tp} onClick={() => setPage(p=>p+1)}>›</button>
            </div>
          </div>
        )}
      </div>

      {sel && <UserModal u={sel} onClose={() => setSel(null)} />}
    </div>
  );
}
