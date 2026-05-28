import { useState, useContext, useRef, useEffect } from 'react';
import { AppCtx } from '../App';
import { useKycData, mapKycRecord } from '../apis/useKycData';
import { approveKyc, rejectKyc, getSubmissionDetails } from '../apis/adminApi';
import { SkeletonTable } from '../components/Skeleton';

const sMap = { Pending:'b-pending','In Review':'b-review',Approved:'b-approved',Failed:'b-failed' };
const Badge = ({s}) => <span className={`badge ${sMap[s]||'b-pending'}`}>{s}</span>;

function Toast({msg,type,onClose}) {
  useEffect(()=>{const t=setTimeout(onClose,3500);return()=>clearTimeout(t);},[onClose]);
  return <div className={`toast ${type==='ok'?'ok':'err'}`}>{type==='ok'?'✅':'❌'} {msg}</div>;
}

/* ── Document image with fallback ── */
function DocImage({ url, label, emoji }) {
  const base = 'http://localhost:3001';
  const src  = url ? (url.startsWith('http') ? url : `${base}/${url}`) : null;
  if (!src) return (
    <div style={{ border:'2px dashed var(--gray-200)', borderRadius:12, height:130, display:'flex', alignItems:'center', justifyContent:'center', flexDirection:'column', gap:6, opacity:0.5 }}>
      <span style={{fontSize:32}}>{emoji}</span>
      <span style={{fontSize:12,color:'var(--gray-400)'}}>Not submitted</span>
    </div>
  );
  return (
    <div style={{ border:'2px solid var(--gray-200)', borderRadius:12, overflow:'hidden' }}>
      <img src={src} alt={label} style={{ width:'100%', height:160, objectFit:'cover', display:'block' }}
        onError={e => { e.target.style.display='none'; e.target.nextSibling.style.display='flex'; }}/>
      <div style={{ display:'none', height:160, alignItems:'center', justifyContent:'center', flexDirection:'column', gap:6, background:'var(--gray-100)' }}>
        <span style={{fontSize:32}}>{emoji}</span>
        <span style={{fontSize:12,color:'var(--gray-400)'}}>Preview unavailable</span>
      </div>
    </div>
  );
}

/* ── Review Modal ── */
function Modal({ user, onClose, onApprove, onReject }) {
  const [tab, setTab]       = useState('details');
  const [reason, setReason] = useState('');
  const [detail, setDetail] = useState(null);

  useEffect(() => {
    // Load full submission details when modal opens
    if (user?._id) {
      getSubmissionDetails(user._id)
        .then(r => { if (r.data?.kyc) setDetail(mapKycRecord(r.data.kyc)); })
        .catch(() => {});
    }
  }, [user?._id]);

  if (!user) return null;
  const u = detail || user;
  const d = u.documents || {};

  const submitted = [d.aadhaar?.submitted&&'Aadhaar', d.pan?.submitted&&'PAN', d.passport?.submitted&&'Passport', d.selfie?.submitted&&'Selfie'].filter(Boolean).length;
  const canAct    = user.backendStatus === 'under_review';

  return (
    <div className="overlay" onClick={e=>e.target===e.currentTarget&&onClose()}>
      <div className="modal" style={{maxWidth:760}}>
        <div className="modal-head">
          <div style={{display:'flex',alignItems:'center',gap:12}}>
            <div className="avatar" style={{background:u.color,width:46,height:46,borderRadius:12,fontSize:16}}>{u.initials}</div>
            <div>
              <h3>{u.name}</h3>
              <div style={{fontSize:13,color:'var(--gray-400)',marginTop:2,display:'flex',alignItems:'center',gap:8}}>
                {u.phone} &nbsp;<Badge s={u.status}/>
                <span style={{background:'#EFF6FF',color:'#2563EB',fontSize:11,fontWeight:600,padding:'2px 8px',borderRadius:20}}>{submitted} docs</span>
              </div>
            </div>
          </div>
          <button className="btn btn-ghost icon-btn" onClick={onClose}>
            <svg width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
          </button>
        </div>

        <div className="modal-tabs">
          {['details','documents','action'].map(t=>(
            <button key={t} className={`mtab${tab===t?' act':''}`} onClick={()=>setTab(t)}>
              {t==='documents'?`Documents (${submitted})`:t==='action'?'Take Action':t[0].toUpperCase()+t.slice(1)}
            </button>
          ))}
        </div>

        <div className="modal-body">
          {tab==='details' && (
            <>
              <div style={{marginBottom:18}}>
                <div className="section-title">User Information</div>
                <div className="detail-grid">
                  {[['Name',u.name],['Phone',u.phone],['Email',u.email],['Document Type',u.documentType],['Submitted',u.submitted],['Status',u.status]].map(([l,v])=>(
                    <div className="detail-item" key={l}><label>{l}</label><span>{v}</span></div>
                  ))}
                </div>
              </div>
              {u.reviewedBy && u.reviewedBy !== '—' && (
                <div style={{marginBottom:14}}>
                  <div className="section-title">Review Info</div>
                  <div className="detail-grid">
                    {[['Reviewed By',u.reviewedBy],['Reviewed At',u.reviewedAt],['Submission #',u.submissionCount]].map(([l,v])=>(
                      <div className="detail-item" key={l}><label>{l}</label><span>{v}</span></div>
                    ))}
                  </div>
                </div>
              )}
              {u.rejectionReason && (
                <div style={{background:'#FEF2F2',border:'1px solid #FECACA',borderRadius:10,padding:'12px 14px'}}>
                  <div style={{fontSize:10.5,fontWeight:700,color:'#DC2626',letterSpacing:'0.5px',textTransform:'uppercase',marginBottom:4}}>Rejection Reason</div>
                  <div style={{fontSize:13,color:'#7F1D1D'}}>{u.rejectionReason}</div>
                </div>
              )}
            </>
          )}

          {tab==='documents' && (
            <>
              <div style={{background:'#FFFBEB',border:'1px solid #FDE68A',borderRadius:10,padding:'10px 14px',marginBottom:16,fontSize:13,color:'#92400E'}}>
                ⚠️ Verify that all submitted documents show matching name and details before approving.
              </div>
              <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:14,marginBottom:14}}>
                <div>
                  <div className="section-title">Aadhaar Card</div>
                  <DocImage url={u.aadharFrontUrl} label="Aadhaar" emoji="🪪"/>
                </div>
                <div>
                  <div className="section-title">PAN Card</div>
                  <DocImage url={u.panCardUrl} label="PAN Card" emoji="💳"/>
                </div>
              </div>
              <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:14}}>
                <div>
                  <div className="section-title">Passport</div>
                  <DocImage url={u.passportUrl} label="Passport" emoji="📘"/>
                </div>
                <div>
                  <div className="section-title">Selfie</div>
                  <DocImage url={u.selfieUrl} label="Selfie" emoji="🤳"/>
                </div>
              </div>
            </>
          )}

          {tab==='action' && (
            <>
              {!canAct && (
                <div style={{background:'#F8FAFC',border:'1px solid var(--gray-200)',borderRadius:12,padding:'14px 16px',marginBottom:20}}>
                  <div style={{fontSize:13,color:'var(--gray-600)'}}>
                    {u.status === 'Approved' ? '✅ This KYC has already been approved.' : u.status === 'Failed' ? '❌ This KYC has already been rejected.' : `⚠️ Status is "${u.status}". Only "In Review" KYCs can be actioned.`}
                  </div>
                </div>
              )}
              {canAct && (
                <>
                  <div style={{marginBottom:20}}>
                    <div className="section-title">Approve KYC</div>
                    <p style={{fontSize:13,color:'var(--gray-600)',marginBottom:12,lineHeight:1.5}}>Approving will activate the user's PYO wallet immediately.</p>
                    <button className="btn btn-success" style={{width:'100%',padding:'11px',fontSize:13}} onClick={()=>onApprove(user._id)}>
                      ✅ Approve KYC & Activate Wallet
                    </button>
                  </div>
                  <div style={{border:'1px solid var(--gray-200)',borderRadius:12,padding:16}}>
                    <div className="section-title">Reject KYC</div>
                    <p style={{fontSize:13,color:'var(--gray-600)',marginBottom:10}}>Provide a clear reason so the user knows what to fix:</p>
                    <textarea rows={3} placeholder="e.g. Aadhaar & PAN name mismatch, selfie unclear..." value={reason} onChange={e=>setReason(e.target.value)}/>
                    <button className="btn btn-danger" style={{width:'100%',padding:'11px',fontSize:13,marginTop:10}} onClick={()=>{if(reason.trim())onReject(user._id,reason);}}>
                      ❌ Reject KYC
                    </button>
                    {!reason.trim() && <div style={{fontSize:11,color:'var(--gray-400)',marginTop:5,textAlign:'center'}}>Enter a rejection reason first</div>}
                  </div>
                </>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}

/* ── Reject Reason Modal ── */
function RejectModal({ target, data, onClose, onSubmit }) {
  const [reason, setReason] = useState('');
  if (!target) return null;
  const user = data.find(r => r._id === target);
  return (
    <div className="overlay" onClick={e=>e.target===e.currentTarget&&onClose()}>
      <div className="modal" style={{maxWidth:420}}>
        <div className="modal-head">
          <h3>Reject KYC</h3>
          <button className="btn btn-ghost icon-btn" onClick={onClose}>
            <svg width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
          </button>
        </div>
        <div className="modal-body">
          <p style={{fontSize:13.5,color:'var(--gray-600)',marginBottom:16,lineHeight:1.6}}>
            Please provide a reason for rejecting <strong>{user?.name}</strong>'s KYC:
          </p>
          <textarea rows={4} placeholder="e.g. Documents unclear, name mismatch..." value={reason} onChange={e=>setReason(e.target.value)} autoFocus/>
          {!reason.trim() && <div style={{fontSize:11.5,color:'var(--gray-400)',marginTop:6}}>⚠️ Reason is required.</div>}
        </div>
        <div className="modal-foot">
          <button className="btn btn-outline" onClick={onClose}>Cancel</button>
          <button className="btn btn-danger" disabled={!reason.trim()} style={{opacity:reason.trim()?1:0.5}} onClick={()=>{if(reason.trim())onSubmit(target,reason);}}>
            ❌ Reject KYC
          </button>
        </div>
      </div>
    </div>
  );
}

/* ── Status Filter Dropdown ── */
function StatusFilter({ value, onChange, counts }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  useEffect(() => {
    const h = e => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
    document.addEventListener('mousedown', h);
    return () => document.removeEventListener('mousedown', h);
  }, []);
  const opts = [
    {label:'All',value:'All',dot:'#94A3B8'},{label:'Pending',value:'Pending',dot:'#D97706'},
    {label:'In Review',value:'In Review',dot:'#2563EB'},{label:'Approved',value:'Approved',dot:'#059669'},
    {label:'Failed',value:'Failed',dot:'#DC2626'},
  ];
  return (
    <div ref={ref} style={{position:'relative'}}>
      <button onClick={()=>setOpen(o=>!o)} style={{ display:'flex',alignItems:'center',gap:7,padding:'7px 14px',background:open?'#EEF2FF':'var(--filter-btn-bg,#F5F3FF)',border:'1.5px solid var(--filter-btn-border,#C7D2FE)',borderRadius:10,color:'var(--filter-btn-color,#4F46E5)',fontSize:13,fontWeight:600,cursor:'pointer',fontFamily:"'Inter',sans-serif",whiteSpace:'nowrap' }}>
        <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/></svg>
        Filters
        {value!=='All'&&<span style={{background:'#4F46E5',color:'#fff',borderRadius:20,padding:'1px 6px',fontSize:10,fontWeight:700}}>1</span>}
        <svg width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24" style={{transition:'transform 0.18s',transform:open?'rotate(180deg)':'rotate(0)'}}>
          <polyline points="6 9 12 15 18 9"/>
        </svg>
      </button>
      {open && (
        <div style={{position:'absolute',top:'calc(100% + 8px)',right:0,background:'var(--dropdown-bg,#fff)',border:'1.5px solid var(--dropdown-border,#E2E8F0)',borderRadius:12,padding:'6px',minWidth:200,boxShadow:'0 8px 32px rgba(0,0,0,0.12)',zIndex:500,animation:'fadeIn 0.15s ease'}}>
          <div style={{padding:'6px 12px 8px',fontSize:10.5,fontWeight:700,color:'var(--gray-400)',textTransform:'uppercase',letterSpacing:'0.8px'}}>Filter by Status</div>
          {opts.map(o=>(
            <div key={o.value} onClick={()=>{onChange(o.value);setOpen(false);}} style={{padding:'9px 12px',borderRadius:8,fontSize:13,fontWeight:value===o.value?600:400,color:value===o.value?'#4F46E5':'var(--dropdown-text,#374151)',background:value===o.value?'#EEF2FF':'transparent',cursor:'pointer',display:'flex',alignItems:'center',gap:9,transition:'background 0.12s'}}
              onMouseEnter={e=>{if(value!==o.value)e.currentTarget.style.background='var(--dropdown-hover,#F9FAFB)';}}
              onMouseLeave={e=>{if(value!==o.value)e.currentTarget.style.background='transparent';}}>
              <span style={{width:8,height:8,borderRadius:'50%',background:o.dot,display:'inline-block',flexShrink:0}}/>
              <span style={{flex:1}}>{o.label}</span>
              <span style={{fontSize:11,fontWeight:700,color:value===o.value?'#4F46E5':'var(--gray-400)',background:value===o.value?'#E0E7FF':'var(--gray-100)',padding:'1px 7px',borderRadius:20}}>
                {counts[o.value]??0}
              </span>
            </div>
          ))}
          {value!=='All'&&(
            <div style={{borderTop:'1px solid var(--dropdown-border,#E2E8F0)',marginTop:4,paddingTop:4}}>
              <div onClick={()=>{onChange('All');setOpen(false);}} style={{padding:'8px 12px',borderRadius:8,fontSize:12,fontWeight:600,color:'#EF4444',cursor:'pointer',textAlign:'center'}}
                onMouseEnter={e=>e.currentTarget.style.background='#FEF2F2'} onMouseLeave={e=>e.currentTarget.style.background='transparent'}>
                Clear Filter
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default function KYCReview() {
  const { confirm }                     = useContext(AppCtx);
  const { data, setData, loading, error, refetch } = useKycData();
  const [sel, setSel]                   = useState(null);
  const [fStatus, setFS]                = useState('All');
  const [search, setSrch]               = useState('');
  const [toast, setToast]               = useState(null);
  const [page, setPage]                 = useState(1);
  const [rejectTarget, setRejectTarget] = useState(null);
  const perPage = 10;

  const showToast = (msg, type) => setToast({ msg, type });

  const approve = (kycId) => {
    confirm({
      title: 'Approve KYC',
      message: `Approve this user's KYC? Their PYO wallet will be activated immediately.`,
      confirmLabel: '✅ Yes, Approve', cancelLabel: 'Cancel', type: 'success',
    }, () => {
      approveKyc(kycId)
        .then(() => {
          setData(p => p.map(r => r._id===kycId ? {...r, status:'Approved', backendStatus:'approved'} : r));
          setSel(null);
          showToast('KYC Approved — wallet activated!', 'ok');
          refetch();
        })
        .catch(err => {
          const msg = err.response?.data?.message || 'Approval failed';
          showToast(msg, 'err');
        });
    });
  };

  const reject = (kycId, reason) => {
    rejectKyc(kycId, reason)
      .then(() => {
        setData(p => p.map(r => r._id===kycId ? {...r, status:'Failed', backendStatus:'rejected', rejectionReason:reason} : r));
        setSel(null);
        setRejectTarget(null);
        showToast('KYC Rejected. User notified.', 'err');
        refetch();
      })
      .catch(err => {
        const msg = err.response?.data?.message || 'Rejection failed';
        showToast(msg, 'err');
      });
  };

  const counts = {
    All:       data.length,
    Pending:   data.filter(r=>r.status==='Pending').length,
    'In Review': data.filter(r=>r.status==='In Review').length,
    Approved:  data.filter(r=>r.status==='Approved').length,
    Failed:    data.filter(r=>r.status==='Failed').length,
  };

  const filtered = data.filter(r => {
    const ms = fStatus==='All' || r.status===fStatus;
    const mq = !search || r.name.toLowerCase().includes(search.toLowerCase()) || r.phone.includes(search) || r.email.toLowerCase().includes(search.toLowerCase());
    return ms && mq;
  });

  const totalPages = Math.max(1, Math.ceil(filtered.length / perPage));
  const paged      = filtered.slice((page-1)*perPage, page*perPage);

  return (
    <div className="page">
      <div className="page-header">
        <div className="page-header-left">
          <h2>KYC Review</h2>
          <p>Review all submitted KYC documents and approve or reject requests.</p>
        </div>
        <div style={{display:'flex',alignItems:'center',gap:8}}>
          {error
            ? <span style={{background:'#FEF2F2',border:'1px solid #FECACA',color:'#DC2626',fontSize:11,fontWeight:700,padding:'4px 10px',borderRadius:20}}>⚠️ {error}</span>
            : <span style={{background:'#F0FDF4',border:'1px solid #BBF7D0',color:'#059669',fontSize:11,fontWeight:700,padding:'4px 10px',borderRadius:20}}>● Live Data</span>
          }
          <button className="btn btn-outline" style={{fontSize:12,padding:'7px 14px'}} onClick={refetch}>↻ Refresh</button>
        </div>
      </div>

      <div className="card">
        <div className="filter-bar">
          <div className="search-field">
            <svg width="14" height="14" fill="none" stroke="var(--gray-400)" strokeWidth="2" viewBox="0 0 24 24"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
            <input placeholder="Search by name, phone or email..." value={search} onChange={e=>{setSrch(e.target.value);setPage(1);}}/>
          </div>
          <StatusFilter value={fStatus} onChange={v=>{setFS(v);setPage(1);}} counts={counts}/>
          <div className="filter-count">{filtered.length} results</div>
        </div>

        <div className="table-wrap">
          {loading
            ? <SkeletonTable rows={8} cols={5}/>
            : <table>
                <thead><tr><th>User</th><th>Document Type</th><th>Submitted</th><th>Status</th><th>Actions</th></tr></thead>
                <tbody>
                  {paged.map(r => (
                    <tr key={r._id}>
                      <td>
                        <div className="user-cell">
                          <div className="avatar" style={{background:r.color}}>{r.initials}</div>
                          <div><div className="uname">{r.name}</div><div className="uid">{r.phone}</div></div>
                        </div>
                      </td>
                      <td>
                        <div style={{display:'flex',gap:5,flexWrap:'wrap'}}>
                          {r.aadharFrontUrl && <span className="doc-badge">🪪 Aadhaar</span>}
                          {r.panCardUrl     && <span className="doc-badge">💳 PAN</span>}
                          {r.passportUrl    && <span className="doc-badge">📘 Passport</span>}
                          {r.selfieUrl      && <span className="doc-badge">🤳 Selfie</span>}
                          {!r.aadharFrontUrl && !r.panCardUrl && !r.passportUrl && <span className="doc-badge">📄 {r.documentType||'—'}</span>}
                        </div>
                      </td>
                      <td style={{color:'var(--gray-400)',fontSize:13}}>{r.submitted}</td>
                      <td><Badge s={r.status}/></td>
                      <td>
                        <div className="act-group">
                          <button className="btn btn-outline" style={{fontSize:12,padding:'5px 11px'}} onClick={()=>setSel(r)}>👁 Review</button>
                          {r.backendStatus==='under_review' && <>
                            <button className="btn btn-ghost icon-btn" title="Approve" style={{color:'var(--green)'}} onClick={()=>approve(r._id)}>
                              <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12"/></svg>
                            </button>
                            <button className="btn btn-ghost icon-btn" title="Reject" style={{color:'var(--red)'}} onClick={()=>setRejectTarget(r._id)}>
                              <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
                            </button>
                          </>}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
          }
          {!loading && paged.length===0 && <div className="empty">No KYC requests match your filters.</div>}
        </div>

        <div className="pagination">
          <div className="pag-info">Showing {Math.min((page-1)*perPage+1,filtered.length)}–{Math.min(page*perPage,filtered.length)} of {filtered.length}</div>
          <div className="pag-btns">
            <button className="pag-btn" disabled={page===1} onClick={()=>setPage(p=>p-1)}>‹</button>
            {Array.from({length:totalPages},(_,i)=>(
              <button key={i+1} className={`pag-btn${page===i+1?' act':''}`} onClick={()=>setPage(i+1)}>{i+1}</button>
            ))}
            <button className="pag-btn" disabled={page===totalPages} onClick={()=>setPage(p=>p+1)}>›</button>
          </div>
        </div>
      </div>

      {sel && <Modal user={sel} onClose={()=>setSel(null)} onApprove={approve} onReject={reject}/>}
      {rejectTarget && <RejectModal target={rejectTarget} data={data} onClose={()=>setRejectTarget(null)} onSubmit={reject}/>}
      <div className="toast-stack">{toast && <Toast msg={toast.msg} type={toast.type} onClose={()=>setToast(null)}/>}</div>
    </div>
  );
}
