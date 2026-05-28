import { useState, useEffect } from 'react';
import { getAuditLog } from '../apis/adminApi';
import { auditLogs as mockLogs } from '../data/mockData';

const typeConfig = {
  approve: { bg:'#F0FDF4', e:'✅' },
  reject:  { bg:'#FEF2F2', e:'❌' },
  info:    { bg:'#EFF6FF', e:'ℹ️' },
};

function mapLog(l) {
  const isApproved = l.status === 'approved';
  const isRejected = l.status === 'rejected';
  return {
    id:        l._id,
    action:    isApproved ? 'KYC Approved' : isRejected ? 'KYC Rejected' : 'KYC Action',
    user:      l.userId?.name   || l.userId?.mobile || '—',
    admin:     l.reviewedBy?.name || l.reviewedBy?.email || 'Admin',
    timestamp: l.reviewedAt ? new Date(l.reviewedAt).toLocaleString('en-IN') : '—',
    details:   l.rejectionReason || (isApproved ? 'KYC documents verified and approved' : '—'),
    type:      isApproved ? 'approve' : isRejected ? 'reject' : 'info',
    docType:   l.documentType || '—',
    subCount:  l.submissionCount || 1,
  };
}

export default function AuditLog() {
  const [logs,      setLogs]      = useState([]);
  const [loading,   setLoading]   = useState(true);
  const [liveData,  setLiveData]  = useState(false);
  const [filter,    setFilter]    = useState('All');
  const [search,    setSearch]    = useState('');

  useEffect(() => {
    setLoading(true);
    getAuditLog({ page:1, limit:50 })
      .then(res => {
        const raw = res.data?.logs || [];
        if (Array.isArray(raw) && raw.length > 0) {
          setLogs(raw.map(mapLog));
          setLiveData(true);
        } else {
          // No reviewed KYCs yet — show empty, not mock
          setLogs([]);
          setLiveData(true);
        }
      })
      .catch(() => {
        setLogs(mockLogs);
        setLiveData(false);
      })
      .finally(() => setLoading(false));
  }, []);

  const counts = {
    All:     logs.length,
    approve: logs.filter(l=>l.type==='approve').length,
    reject:  logs.filter(l=>l.type==='reject').length,
    info:    logs.filter(l=>l.type==='info').length,
  };

  const filtered = logs.filter(l => {
    const mf = filter==='All' || l.type===filter;
    const ms = !search || l.action.toLowerCase().includes(search.toLowerCase())
                       || l.user.toLowerCase().includes(search.toLowerCase())
                       || l.admin.toLowerCase().includes(search.toLowerCase());
    return mf && ms;
  });

  return (
    <div className="page">
      <div className="page-header" style={{display:'flex',justifyContent:'space-between',alignItems:'flex-start'}}>
        <div className="page-header-left"><h2>Audit Log</h2><p>History of all admin KYC review actions.</p></div>
        <div style={{display:'flex',alignItems:'center',gap:10}}>
          {liveData
            ? <span style={{background:'#F0FDF4',border:'1px solid #BBF7D0',color:'#059669',fontSize:11,fontWeight:700,padding:'4px 10px',borderRadius:20}}>● Live Data</span>
            : <span style={{background:'#FFF7ED',border:'1px solid #FDE68A',color:'#D97706',fontSize:11,fontWeight:700,padding:'4px 10px',borderRadius:20}}>⚠️ Demo Data</span>
          }
          <button className="btn btn-outline" onClick={()=>window.print()}>
            <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><polyline points="6 9 6 2 18 2 18 9"/><path d="M6 18H4a2 2 0 01-2-2v-5a2 2 0 012-2h16a2 2 0 012 2v5a2 2 0 01-2 2h-2"/><rect x="6" y="14" width="12" height="8"/></svg>
            Export
          </button>
        </div>
      </div>

      <div className="chip-row">
        {[['All',counts.All,'#6B7280'],['approve',counts.approve,'#059669'],['reject',counts.reject,'#DC2626'],['info',counts.info,'#2563EB']].map(([f,c,col])=>(
          <div key={f} className={`chip${filter===f?' act':''}`} onClick={()=>setFilter(f)}
            style={filter===f?{background:col,borderColor:col,color:'#fff'}:{color:col,borderColor:col+'44'}}>
            {f==='All'?'📋':typeConfig[f]?.e} {f==='All'?'All':f[0].toUpperCase()+f.slice(1)}
            <span className="chip-count">{c}</span>
          </div>
        ))}
      </div>

      <div className="card">
        <div className="filter-bar">
          <div className="search-field">
            <svg width="14" height="14" fill="none" stroke="var(--gray-400)" strokeWidth="2" viewBox="0 0 24 24"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
            <input placeholder="Search by action, user or admin..." value={search} onChange={e=>setSearch(e.target.value)}/>
          </div>
          <div className="filter-count">{filtered.length} records</div>
        </div>

        {loading ? (
          <div style={{padding:48,textAlign:'center',color:'var(--gray-400)',fontSize:14}}>Loading audit log...</div>
        ) : (
          <div>
            {filtered.length === 0 && (
              <div className="empty">
                {liveData ? 'No KYC records have been reviewed yet.' : 'No records found.'}
              </div>
            )}
            {filtered.map((log, i) => {
              const c = typeConfig[log.type] || typeConfig.info;
              return (
                <div className="audit-item" key={log.id} style={{borderBottom:i<filtered.length-1?'1px solid var(--gray-100)':'none'}}>
                  <div className="audit-icon" style={{background:c.bg}}>{c.e}</div>
                  <div style={{flex:1}}>
                    <div className="audit-act">{log.action}</div>
                    <div className="audit-meta">
                      User: <strong>{log.user}</strong> · Admin: <strong>{log.admin}</strong>
                      {log.docType!=='—'&&<> · Doc: <strong>{log.docType}</strong></>}
                      {log.details!=='—'&&<> · {log.details}</>}
                    </div>
                  </div>
                  <div className="audit-time">{log.timestamp}</div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
