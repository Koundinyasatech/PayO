import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useKycData } from '../apis/useKycData';
import { SkeletonPage } from '../components/Skeleton';

/* ── Sparkline ── */
function Sparkline({ points, color }) {
  const w = 100, h = 36;
  const min = Math.min(...points), max = Math.max(...points);
  const range = max - min || 1;
  const step  = w / (points.length - 1);
  const coords = points.map((v, i) => [i * step, h - ((v - min) / range) * (h - 6) - 3]);
  const d    = coords.map(([x,y],i) => `${i===0?'M':'L'}${x.toFixed(1)},${y.toFixed(1)}`).join(' ');
  const fill = d + ` L${w},${h} L0,${h} Z`;
  return (
    <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`} style={{display:'block'}}>
      <defs>
        <linearGradient id={`sg${color.replace('#','')}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.22"/>
          <stop offset="100%" stopColor={color} stopOpacity="0"/>
        </linearGradient>
      </defs>
      <path d={fill} fill={`url(#sg${color.replace('#','')})`}/>
      <path d={d} fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

/* ── Count-up animation ── */
function CountUp({ target }) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    const n    = parseInt(String(target).replace(/,/g, '')) || 0;
    const dur  = 900;
    const step = 16;
    const inc  = n / (dur / step);
    let cur    = 0;
    const t    = setInterval(() => {
      cur += inc;
      if (cur >= n) { setVal(n); clearInterval(t); }
      else setVal(Math.floor(cur));
    }, step);
    return () => clearInterval(t);
  }, [target]);
  return <>{val.toLocaleString()}</>;
}

/* ── Stat Card ── */
function StatCard({ label, value, change, up, color, iconBg, icon, spark }) {
  return (
    <div style={{ background:'var(--stat-card-bg,#fff)', border:'1px solid var(--stat-card-border,#E2E8F0)', borderRadius:16, padding:'22px 22px 18px', display:'flex', flexDirection:'column', minHeight:170, transition:'transform 0.2s,box-shadow 0.2s', cursor:'default' }}
      onMouseEnter={e=>{e.currentTarget.style.transform='translateY(-3px)';e.currentTarget.style.boxShadow='0 8px 32px rgba(0,0,0,0.12)';}}
      onMouseLeave={e=>{e.currentTarget.style.transform='translateY(0)';e.currentTarget.style.boxShadow='none';}}>
      <div style={{ display:'flex', alignItems:'flex-start', justifyContent:'space-between', marginBottom:14 }}>
        <div style={{ fontSize:11, fontWeight:700, color:'var(--stat-card-label,#94A3B8)', textTransform:'uppercase', letterSpacing:'0.8px' }}>{label}</div>
        <div style={{ width:38, height:38, borderRadius:10, background:iconBg, display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 }}>{icon}</div>
      </div>
      <div style={{ fontFamily:"'Space Grotesk',sans-serif", fontSize:32, fontWeight:700, color:'var(--stat-card-value,#0D1B3E)', letterSpacing:'-1px', lineHeight:1, marginBottom:10 }}>
        <CountUp target={value}/>
      </div>
      <div style={{ marginBottom:8 }}><Sparkline points={spark} color={color}/></div>
      <div style={{ display:'flex', alignItems:'center', gap:5, fontSize:12, fontWeight:600, color:up?'#10B981':'#EF4444' }}>
        <svg width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
          {up?<polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/>:<polyline points="23 18 13.5 8.5 8.5 13.5 1 6"/>}
        </svg>
        {change} this month
      </div>
    </div>
  );
}

/* ── Donut ── */
function DonutChart({ approved, pending, rejected }) {
  const total = approved + pending + rejected || 1;
  const r = 68, cx = 88, cy = 88, sw = 18;
  const c = 2 * Math.PI * r;
  const ap = approved / total, pp = pending / total;
  return (
    <div className="donut-wrap">
      <div style={{ position:'relative', display:'inline-block' }}>
        <svg width="176" height="176" viewBox="0 0 176 176">
          <circle cx={cx} cy={cy} r={r} fill="none" stroke="#FEE2E2" strokeWidth={sw}/>
          <circle cx={cx} cy={cy} r={r} fill="none" stroke="#FEF3C7" strokeWidth={sw}
            strokeDasharray={`${(ap+pp)*c} ${c}`} strokeDashoffset={-ap*c} strokeLinecap="round"
            transform={`rotate(-90 ${cx} ${cy})`}/>
          <circle cx={cx} cy={cy} r={r} fill="none" stroke="#10B981" strokeWidth={sw}
            strokeDasharray={`${ap*c} ${c}`} strokeLinecap="round"
            transform={`rotate(-90 ${cx} ${cy})`}/>
        </svg>
        <div style={{ position:'absolute', top:'50%', left:'50%', transform:'translate(-50%,-50%)', textAlign:'center' }}>
          <div style={{ fontFamily:"'Space Grotesk',sans-serif", fontSize:20, fontWeight:800, color:'var(--navy)' }}>
            {total > 0 ? Math.round((approved/total)*100) : 0}%
          </div>
          <div style={{ fontSize:10, color:'var(--gray-400)', fontWeight:600 }}>Success Rate</div>
        </div>
      </div>
      <div className="donut-legend">
        {[['#10B981','Approved',approved],['#F59E0B','Pending',pending],['#EF4444','Rejected',rejected]].map(([c,l,v])=>(
          <div className="legend-row" key={l}>
            <div className="l-label"><div className="l-dot" style={{background:c}}/>{l}</div>
            <div className="l-val">{v?.toLocaleString?.()} ({total>0?Math.round((v/total)*100):0}%)</div>
          </div>
        ))}
      </div>
    </div>
  );
}

const statusBadge = s => {
  const m={Pending:'b-pending','In Review':'b-review',Approved:'b-approved',Failed:'b-failed'};
  return <span className={`badge ${m[s]||'b-pending'}`}>{s}</span>;
};

export default function Dashboard() {
  const navigate = useNavigate();
  const { data: kycList, stats, loading } = useKycData();
  const [pageLoading, setPageLoading] = useState(true);
  useEffect(() => { const t = setTimeout(()=>setPageLoading(false), 700); return ()=>clearTimeout(t); }, []);

  if (pageLoading) return <SkeletonPage/>;

  // Use real stats from backend, fallback to computed from list
  const approved = stats?.approved ?? kycList.filter(r=>r.status==='Approved').length;
  const pending  = stats?.underReview ?? kycList.filter(r=>r.status==='In Review'||r.status==='Pending').length;
  const rejected = stats?.rejected ?? kycList.filter(r=>r.status==='Failed').length;
  const total    = stats?.totalSubmissions ?? kycList.length;

  const statCards = [
    { label:'Total Submissions', value:total,    change:'+12.2%', up:true,  color:'#3B82F6', iconBg:'rgba(59,130,246,0.12)',
      icon:<svg width="19" height="19" fill="none" stroke="#3B82F6" strokeWidth="2" viewBox="0 0 24 24"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75"/></svg>,
      spark:[30,42,38,55,48,62,58,72,68,80,76,90] },
    { label:'Pending Review', value:pending,  change:'+6.2%',  up:true,  color:'#F59E0B', iconBg:'rgba(245,158,11,0.12)',
      icon:<svg width="19" height="19" fill="none" stroke="#F59E0B" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>,
      spark:[60,55,70,65,80,72,85,78,90,84,95,88] },
    { label:'Approved KYC', value:approved, change:'+14.8%', up:true,  color:'#10B981', iconBg:'rgba(16,185,129,0.12)',
      icon:<svg width="19" height="19" fill="none" stroke="#10B981" strokeWidth="2" viewBox="0 0 24 24"><path d="M22 11.08V12a10 10 0 11-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>,
      spark:[20,35,30,48,42,58,55,70,65,80,78,92] },
    { label:'Rejected KYC', value:rejected, change:'-2.2%',  up:false, color:'#EF4444', iconBg:'rgba(239,68,68,0.12)',
      icon:<svg width="19" height="19" fill="none" stroke="#EF4444" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></svg>,
      spark:[80,72,78,65,70,60,65,52,58,48,50,42] },
  ];

  const recent = kycList.slice(0, 7);

  return (
    <div className="page">
      <div className="page-header">
        <div className="page-header-left">
          <h2>Dashboard</h2>
          <p>Welcome back, Admin! Here's what's happening with PayO KYC today.</p>
        </div>
        <button className="btn btn-primary" onClick={()=>navigate('/kyc')}>
          <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path d="M9 12l2 2 4-4"/><circle cx="12" cy="12" r="10"/></svg>
          Review KYC
        </button>
      </div>

      {/* Stat Cards */}
      <div style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:18, marginBottom:24 }}>
        {statCards.map(s => <StatCard key={s.label} {...s}/>)}
      </div>

      {/* Main grid */}
      <div className="dash-grid">
        <div className="card">
          <div className="card-header">
            <h3>Recent KYC Requests</h3>
            <button className="btn btn-outline" style={{fontSize:12,padding:'5px 12px'}} onClick={()=>navigate('/kyc')}>View All</button>
          </div>
          <div className="table-wrap">
            {loading ? (
              <div style={{padding:24,textAlign:'center',color:'var(--gray-400)',fontSize:13}}>Loading KYC data...</div>
            ) : (
              <table>
                <thead><tr><th>User</th><th>Document</th><th>Submitted</th><th>Status</th></tr></thead>
                <tbody>
                  {recent.length === 0 && (
                    <tr><td colSpan={4} style={{textAlign:'center',padding:32,color:'var(--gray-400)'}}>No KYC submissions yet.</td></tr>
                  )}
                  {recent.map(r => (
                    <tr key={r._id} style={{cursor:'pointer'}} onClick={()=>navigate('/kyc')}>
                      <td>
                        <div className="user-cell">
                          <div className="avatar" style={{background:r.color}}>{r.initials}</div>
                          <div><div className="uname">{r.name}</div><div className="uid">{r.phone}</div></div>
                        </div>
                      </td>
                      <td><span className="doc-badge">📄 {r.documentType || '—'}</span></td>
                      <td style={{color:'var(--gray-400)',fontSize:13}}>{r.submitted}</td>
                      <td>{statusBadge(r.status)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>

        <div className="right-col">
          <div className="card">
            <div className="card-header"><h3>KYC Overview</h3></div>
            <DonutChart approved={approved} pending={pending} rejected={rejected}/>
          </div>

          <div className="card">
            <div className="card-header">
              <h3>Recent Activity</h3>
              <button className="btn btn-outline" style={{fontSize:12,padding:'5px 12px'}} onClick={()=>navigate('/audit')}>View All</button>
            </div>
            <div className="act-list">
              {kycList.slice(0,4).map(r => {
                const ic = r.status==='Approved'?{bg:'#F0FDF4',e:'✅'}:r.status==='Failed'?{bg:'#FEF2F2',e:'❌'}:{bg:'#EFF6FF',e:'🔔'};
                return (
                  <div className="act-item" key={r._id}>
                    <div className="act-icon" style={{background:ic.bg}}>{ic.e}</div>
                    <div style={{flex:1}}>
                      <div className="act-title">{r.name}</div>
                      <div className="act-desc">{r.documentType} · {r.status}</div>
                    </div>
                    <div className="act-time">{r.submitted}</div>
                  </div>
                );
              })}
              {kycList.length === 0 && <div style={{padding:16,textAlign:'center',color:'var(--gray-400)',fontSize:13}}>No activity yet.</div>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
