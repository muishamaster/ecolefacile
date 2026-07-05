import { useState } from 'react';
import { Users, GraduationCap, DollarSign, Calendar, BookOpen, LogOut, Bell, LineChart, UserPlus, Search, Filter, CheckCircle, XCircle, Clock, Phone, Mail, Award, TrendingUp, TrendingDown, AlertCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('overview');
  const [showNotifications, setShowNotifications] = useState(false);

  const notifications = [
    { id: 1, text: "Nouveau message de Famille Mukoko", time: "Il y a 10 min", unread: true },
    { id: 2, text: "Paiement de frais : Jean K.", time: "Il y a 1h", unread: true },
    { id: 3, text: "Réunion parents-profs programmée", time: "Hier", unread: false }
  ];

  const unreadCount = notifications.filter(n => n.unread).length;

  const renderContent = () => {
    switch (activeTab) {
      case 'students':
        return <StudentsModule />;
      case 'teachers':
        return <TeachersModule />;
      case 'schedules':
        return <SchedulesModule />;
      case 'finances':
        return <FinancesModule />;
      case 'overview':
      default:
        return (
          <>
            {/* Stats Grid */}
            <section className="admin-stats-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.5rem', marginBottom: '2rem' }}>
              <div className="glass-card" style={{ padding: '1.5rem', borderRadius: 'var(--radius-lg)', display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
                <div style={{ background: '#e0f2fe', color: '#0369a1', padding: '1rem', borderRadius: 'var(--radius-md)' }}><Users size={28}/></div>
                <div>
                   <div style={{ color: 'var(--theme-text-secondary)', fontSize: '0.9rem' }}>Élèves Inscrits</div>
                   <div style={{ fontSize: '1.8rem', fontWeight: 700, color: 'var(--theme-primary)' }}>842</div>
                </div>
              </div>
              
              <div className="glass-card" style={{ padding: '1.5rem', borderRadius: 'var(--radius-lg)', display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
                <div style={{ background: '#fef3c7', color: '#b45309', padding: '1rem', borderRadius: 'var(--radius-md)' }}><GraduationCap size={28}/></div>
                <div>
                   <div style={{ color: 'var(--theme-text-secondary)', fontSize: '0.9rem' }}>Professeurs Actifs</div>
                   <div style={{ fontSize: '1.8rem', fontWeight: 700, color: 'var(--theme-primary)' }}>45</div>
                </div>
              </div>

              <div className="glass-card" style={{ padding: '1.5rem', borderRadius: 'var(--radius-lg)', display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
                <div style={{ background: '#dcfce7', color: '#15803d', padding: '1rem', borderRadius: 'var(--radius-md)' }}><DollarSign size={28}/></div>
                <div>
                   <div style={{ color: 'var(--theme-text-secondary)', fontSize: '0.9rem' }}>Frais Payés (T1)</div>
                   <div style={{ fontSize: '1.8rem', fontWeight: 700, color: 'var(--theme-primary)' }}>68%</div>
                </div>
              </div>
            </section>

            <section className="dashboard-content-grid">
              {/* Latest Enrollments */}
              <div className="glass-card" style={{ padding: '2rem', borderRadius: 'var(--radius-xl)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                  <h3 style={{ fontSize: '1.2rem', color: 'var(--theme-text-primary)' }}>Nouvelles demandes d'inscriptions</h3>
                  <button 
                    onClick={() => setActiveTab('students')}
                    className="btn-outline" 
                    style={{ padding: '0.4rem 0.8rem', fontSize: '0.85rem' }}
                  >
                    Voir tout
                  </button>
                </div>
                
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  {[
                    { parent: "Jean Mukoko", enf: "2 enfants (Primaire)", date: "Aujourd'hui, 08:30", status: "En attente" },
                    { parent: "Sarah Mbuyi", enf: "1 enfant (Maternelle)", date: "Hier, 14:15", status: "Dossier Incomplet" },
                    { parent: "Paul Mulumba", enf: "1 enfant (Sec. Général)", date: "Hier, 09:40", status: "Validé" }
                  ].map((req, i) => (
                    <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem', border: '1px solid var(--theme-border)', borderRadius: 'var(--radius-md)', background: 'var(--theme-bg)' }}>
                       <div>
                          <div style={{ fontWeight: 600, color: 'var(--theme-primary)' }}>Famille {req.parent}</div>
                          <div style={{ fontSize: '0.85rem', color: 'var(--theme-text-secondary)' }}>{req.enf} - {req.date}</div>
                       </div>
                       <div style={{ 
                         padding: '0.25rem 0.75rem', borderRadius: '12px', fontSize: '0.8rem', fontWeight: 600,
                         background: req.status === 'Validé' ? '#dcfce7' : req.status === 'En attente' ? '#fef3c7' : '#fee2e2',
                         color: req.status === 'Validé' ? '#16a34a' : req.status === 'En attente' ? '#d97706' : '#dc2626'
                       }}>
                         {req.status}
                       </div>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Quick Actions */}
              <div className="glass-card" style={{ padding: '2rem', borderRadius: 'var(--radius-xl)', height: 'fit-content' }}>
                <h3 style={{ marginBottom: '1.5rem', fontSize: '1.2rem' }}>Actions Rapides</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                   <button className="action-btn" onClick={() => setActiveTab('students')}>
                     <UserPlus size={18} /> Créer un profil Élève
                   </button>
                   <button className="action-btn" onClick={() => alert("Publication des résultats lancée.")}>
                     <BookOpen size={18} /> Publier les résultats
                   </button>
                   <button className="action-btn" onClick={() => alert("Interface SMS en cours d'ouverture...")}>
                     <Bell size={18} /> Envoyer un SMS aux parents
                   </button>
                </div>
              </div>
            </section>
          </>
        );
    }
  };

  const NAV_ITEMS = [
    { id:'overview', label:"Accueil", icon:<LineChart size={20}/> },
    { id:'students', label:"Élèves", icon:<Users size={20}/> },
    { id:'teachers', label:"Profs", icon:<GraduationCap size={20}/> },
    { id:'schedules', label:"Horaires", icon:<Calendar size={20}/> },
    { id:'finances', label:"Finances", icon:<DollarSign size={20}/> },
  ];

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: 'var(--theme-bg-soft)' }}>

      {/* ── MOBILE BOTTOM NAV ── */}
      <nav className="mobile-bottom-nav">
        <div className="mobile-bottom-nav-inner">
          {NAV_ITEMS.map(item => (
            <button key={item.id} className={`mob-nav-btn ${activeTab === item.id ? 'active' : ''}`} onClick={() => setActiveTab(item.id)}>
              {item.icon}
              {item.label}
            </button>
          ))}
          <Link to="/" className="mob-nav-btn">
            <LogOut size={20}/>
            Quitter
          </Link>
        </div>
      </nav>

      {/* ── DESKTOP SIDEBAR ── */}
      <aside className="desktop-only" style={{ width: '280px', background: 'var(--theme-primary)', color: 'white', display: 'flex', flexDirection: 'column' }}>
        <div style={{ padding: '2rem 1.5rem', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
          <h2 style={{ fontSize: '1.4rem', color: 'var(--theme-accent)', fontWeight: 700 }}>CS Excellence</h2>
          <p style={{ fontSize: '0.85rem', opacity: 0.8, marginTop: '0.2rem' }}>Administration Pédagogique</p>
        </div>
        
        <nav style={{ flex: 1, padding: '1.5rem 1rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          <button 
            className={`sidebar-btn ${activeTab === 'overview' ? 'active' : ''}`}
            onClick={() => setActiveTab('overview')}
          >
             <LineChart size={20}/> Vue d'ensemble
          </button>
          <button 
            className={`sidebar-btn ${activeTab === 'students' ? 'active' : ''}`}
            onClick={() => setActiveTab('students')}
          >
             <Users size={20}/> Élèves & Classes <span style={{ background: 'var(--theme-accent)', color: 'var(--theme-primary)', padding: '2px 8px', borderRadius: '12px', fontSize: '0.75rem', marginLeft: 'auto', fontWeight: 'bold' }}>Nouv: 3</span>
          </button>
          <button 
            className={`sidebar-btn ${activeTab === 'teachers' ? 'active' : ''}`}
            onClick={() => setActiveTab('teachers')}
          >
             <GraduationCap size={20}/> Professeurs
          </button>
          <button 
            className={`sidebar-btn ${activeTab === 'schedules' ? 'active' : ''}`}
            onClick={() => setActiveTab('schedules')}
          >
             <Calendar size={20}/> Horaires & Présences
          </button>
          <button 
            className={`sidebar-btn ${activeTab === 'finances' ? 'active' : ''}`}
            onClick={() => setActiveTab('finances')}
          >
             <DollarSign size={20}/> Finances & Frais
          </button>
        </nav>

        <div style={{ padding: '1.5rem 1rem', borderTop: '1px solid rgba(255,255,255,0.1)' }}>
          <Link to="/" className="sidebar-btn" style={{ color: 'var(--theme-text-light)', marginBottom: '0.5rem' }}>
            <LogOut size={20}/> Quitter l'Admin
          </Link>
        </div>
      </aside>

      {/* ── MAIN CONTENT ── */}
      <main className="admin-main-content" style={{ flex: 1, padding: '2rem', overflowY: 'auto' }}>
        <header className="admin-header">
          <h1 style={{ fontSize: '1.5rem', color: 'var(--theme-text-primary)' }}>Tableau de bord de rentrée</h1>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', flexWrap: 'wrap' }}>
             
             {/* Section Notifications */}
             <div style={{ position: 'relative' }}>
                <button 
                  onClick={() => setShowNotifications(!showNotifications)}
                  style={{ background: 'none', border: 'none', cursor: 'pointer', position: 'relative' }}
                >
                  <Bell size={22} color="var(--theme-text-secondary)" />
                  {unreadCount > 0 && (
                    <div style={{ position: 'absolute', top: '-5px', right: '-5px', width: '18px', height: '18px', background: 'red', color: 'white', borderRadius: '50%', fontSize: '0.7rem', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                      {unreadCount}
                    </div>
                  )}
                </button>

                {showNotifications && (
                  <div className="notification-dropdown">
                    <div style={{ padding: '1rem', borderBottom: '1px solid var(--theme-border)', fontWeight: 600, display: 'flex', justifyContent: 'space-between' }}>
                       <span>Notifications</span>
                       <span style={{ fontSize: '0.8rem', color: 'var(--theme-primary)', cursor: 'pointer' }}>Tout marquer lu</span>
                    </div>
                    <div style={{ maxHeight: '300px', overflowY: 'auto' }}>
                      {notifications.map(notif => (
                        <div key={notif.id} className="notification-item" style={{ background: notif.unread ? 'var(--theme-bg-soft)' : 'white' }}>
                           <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.25rem' }}>
                             <span style={{ fontWeight: notif.unread ? 600 : 400 }}>{notif.text}</span>
                             {notif.unread && <div style={{ width: '8px', height: '8px', background: 'var(--theme-primary)', borderRadius: '50%' }}></div>}
                           </div>
                           <div style={{ fontSize: '0.75rem', color: 'var(--theme-text-light)' }}>{notif.time}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
             </div>

             <div className="admin-user-info">
                 <div style={{ textAlign: 'right' }}>
                     <div style={{ fontWeight: 600, fontSize: '0.9rem' }}>Mme. La Préfète</div>
                     <div style={{ fontSize: '0.75rem', color: 'var(--theme-text-light)' }}>Direction Primaire</div>
                 </div>
                 <div style={{ width: '40px', height: '40px', background: 'var(--theme-secondary)', borderRadius: '50%', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold' }}>DP</div>
             </div>
          </div>
        </header>

        {/* Dynamic Content */}
        {renderContent()}


      </main>
    </div>
  )
}

// ── SHARED ─────────────────────────────────────────────────────────
const sc = (s) => s==='Validé'?{background:'#dcfce7',color:'#16a34a'}:s==='Payé'?{background:'#dcfce7',color:'#16a34a'}:s==='En attente'?{background:'#fef3c7',color:'#d97706'}:s==='Partiel'?{background:'#fef3c7',color:'#d97706'}:{background:'#fee2e2',color:'#dc2626'};
const th = { padding:'0.75rem 1rem', textAlign:'left', fontWeight:600, fontSize:'0.85rem', color:'var(--theme-text-secondary)', borderBottom:'2px solid var(--theme-border)' };
const td = { padding:'0.85rem 1rem', fontSize:'0.9rem', borderBottom:'1px solid var(--theme-border)' };
const cardS = { padding:'2rem', borderRadius:'var(--radius-xl)' };

// ── MODULE ÉLÈVES ──────────────────────────────────────────────────
const ELEVES = [
  { id:1, nom:'Mukoko Jean', classe:'6ème A', niveau:'Primaire', genre:'M', statut:'Validé', parent:'Jean Mukoko', tel:'+243 81 234 5678' },
  { id:2, nom:'Mbuyi Sarah', classe:'5ème B', niveau:'Primaire', genre:'F', statut:'En attente', parent:'Sarah Mbuyi', tel:'+243 82 345 6789' },
  { id:3, nom:'Mulumba Paul', classe:'3ème Sc', niveau:'Secondaire', genre:'M', statut:'Validé', parent:'Paul Mulumba', tel:'+243 81 456 7890' },
  { id:4, nom:'Kabila Grâce', classe:'1ère A', niveau:'Maternelle', genre:'F', statut:'Validé', parent:'Kabila Marie', tel:'+243 89 567 8901' },
  { id:5, nom:'Lumumba David', classe:'4ème Éco', niveau:'Technique', genre:'M', statut:'Dossier Incomplet', parent:'Lumumba Pierre', tel:'+243 81 678 9012' },
  { id:6, nom:'Tshisekedi Joëlle', classe:'6ème B', niveau:'Primaire', genre:'F', statut:'Validé', parent:'Roger Tshisekedi', tel:'+243 82 789 0123' },
];

function StudentsModule() {
  const [search, setSearch] = useState('');
  const [filtre, setFiltre] = useState('Tous');
  const filtered = ELEVES.filter(e =>
    (filtre==='Tous' || e.statut===filtre) &&
    e.nom.toLowerCase().includes(search.toLowerCase())
  );
  return (
    <div className="glass-card admin-module-card" style={cardS}>
      <div className="admin-module-header" style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:'1.5rem',flexWrap:'wrap',gap:'1rem'}}>
        <h2 style={{color:'var(--theme-primary)'}}>Gestion des Élèves & Classes</h2>
        <button className="primary-btn" style={{fontSize:'0.9rem'}}><UserPlus size={16}/> Nouvel Élève</button>
      </div>
      <div className="admin-filter-bar" style={{display:'flex',gap:'0.75rem',marginBottom:'1.25rem',flexWrap:'wrap',alignItems:'center'}}>
        <div style={{position:'relative',flex:1,minWidth:'200px'}}>
          <Search size={16} style={{position:'absolute',left:'12px',top:'50%',transform:'translateY(-50%)',color:'var(--theme-text-light)'}}/>
          <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Rechercher un élève..." style={{width:'100%',padding:'0.65rem 1rem 0.65rem 2.4rem',border:'1px solid var(--theme-border)',borderRadius:'var(--radius-md)',fontSize:'0.9rem',outline:'none'}}/>
        </div>
        {['Tous','Validé','En attente','Dossier Incomplet'].map(f=>(
          <button key={f} onClick={()=>setFiltre(f)} style={{padding:'0.45rem 0.9rem',borderRadius:'var(--radius-md)',border:'1px solid var(--theme-border)',background:filtre===f?'var(--theme-primary)':'white',color:filtre===f?'white':'var(--theme-text-secondary)',cursor:'pointer',fontSize:'0.82rem',whiteSpace:'nowrap'}}>
            {f}
          </button>
        ))}
      </div>
      <div className="admin-table-wrap" style={{overflowX:'auto'}}>
        <table style={{width:'100%',borderCollapse:'collapse'}}>
          <thead style={{background:'var(--theme-bg-soft)'}}>
            <tr>
              {['Élève','Classe','Niveau','Parent & Tél.','Statut','Actions'].map(h=><th key={h} style={th}>{h}</th>)}
            </tr>
          </thead>
          <tbody>
            {filtered.map(e=>(
              <tr key={e.id} style={{transition:'background 0.15s',cursor:'default'}} onMouseEnter={ev=>ev.currentTarget.style.background='#f8fafc'} onMouseLeave={ev=>ev.currentTarget.style.background='white'}>
                <td style={td}><div style={{fontWeight:600,color:'var(--theme-primary)'}}>{e.nom}</div><div style={{fontSize:'0.78rem',color:'var(--theme-text-light)'}}>{e.genre==='M'?'Garçon':'Fille'}</div></td>
                <td style={td}>{e.classe}</td>
                <td style={td}>{e.niveau}</td>
                <td style={td}><div style={{fontSize:'0.85rem'}}>{e.parent}</div><div style={{fontSize:'0.78rem',color:'var(--theme-text-light)',display:'flex',alignItems:'center',gap:'4px'}}><Phone size={12}/> {e.tel}</div></td>
                <td style={td}><span style={{...sc(e.statut),padding:'3px 10px',borderRadius:'12px',fontSize:'0.78rem',fontWeight:600}}>{e.statut}</span></td>
                <td style={td}>
                  <div style={{display:'flex',gap:'0.5rem'}}>
                    <button style={{padding:'0.3rem 0.7rem',background:'var(--theme-primary)',color:'white',border:'none',borderRadius:'var(--radius-md)',cursor:'pointer',fontSize:'0.8rem'}}>Voir</button>
                    <button style={{padding:'0.3rem 0.7rem',background:'none',border:'1px solid var(--theme-border)',borderRadius:'var(--radius-md)',cursor:'pointer',fontSize:'0.8rem'}}>Modifier</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {filtered.length===0 && <div style={{textAlign:'center',padding:'2.5rem',color:'var(--theme-text-light)'}}>Aucun élève trouvé.</div>}
      </div>
      <div style={{marginTop:'1rem',fontSize:'0.85rem',color:'var(--theme-text-secondary)'}}>{filtered.length} élève(s) affiché(s) sur {ELEVES.length}</div>
    </div>
  );
}

// ── MODULE PROFESSEURS ─────────────────────────────────────────────
const PROFS = [
  { id:1, nom:'Prof. Mabiala André', matiere:'Mathématiques', classes:['6A','6B','5A'], tel:'+243 81 111 0001', email:'mabiala@ecole.cd', statut:'Actif', exp:'12 ans' },
  { id:2, nom:'Prof. Nsimba Claire', matiere:'Français & Littérature', classes:['6A','5B','4A'], tel:'+243 82 111 0002', email:'nsimba@ecole.cd', statut:'Actif', exp:'8 ans' },
  { id:3, nom:'Prof. Kabongo Didier', matiere:'Sciences Naturelles', classes:['3Sc','4Sc'], tel:'+243 81 111 0003', email:'kabongo@ecole.cd', statut:'Congé', exp:'5 ans' },
  { id:4, nom:'Prof. Mutombo Esther', matiere:'Anglais', classes:['5A','5B','6A'], tel:'+243 89 111 0004', email:'mutombo@ecole.cd', statut:'Actif', exp:'15 ans' },
  { id:5, nom:'Prof. Luzolo Blaise', matiere:'Informatique & TIC', classes:['1Éco','2Éco'], tel:'+243 81 111 0005', email:'luzolo@ecole.cd', statut:'Actif', exp:'3 ans' },
];

function TeachersModule() {
  const [search, setSearch] = useState('');
  const filtered = PROFS.filter(p => p.nom.toLowerCase().includes(search.toLowerCase()) || p.matiere.toLowerCase().includes(search.toLowerCase()));
  const stats = [
    { label:'Total', val:PROFS.length, bg:'#fef3c7', color:'#b45309' },
    { label:'Actifs', val:PROFS.filter(p=>p.statut==='Actif').length, bg:'#dcfce7', color:'#16a34a' },
    { label:'En congé', val:PROFS.filter(p=>p.statut==='Congé').length, bg:'#fee2e2', color:'#dc2626' },
    { label:'Matières', val:8, bg:'#e0f2fe', color:'#0369a1' },
  ];
  return (
    <div className="glass-card admin-module-card" style={cardS}>
      <div className="admin-module-header" style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:'1.5rem',flexWrap:'wrap',gap:'1rem'}}>
        <h2 style={{color:'var(--theme-primary)'}}>Corps Académique</h2>
        <button className="primary-btn" style={{fontSize:'0.9rem'}}><UserPlus size={16}/> Nouveau Professeur</button>
      </div>
      <div className="admin-mini-stats" style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(160px,1fr))',gap:'1rem',marginBottom:'1.5rem'}}>
        {stats.map((s,i)=>(
          <div key={i} style={{background:s.bg,padding:'1rem 1.25rem',borderRadius:'var(--radius-lg)'}}>
            <div style={{fontSize:'1.6rem',fontWeight:700,color:s.color}}>{s.val}</div>
            <div style={{fontSize:'0.8rem',color:s.color,opacity:0.85}}>{s.label}</div>
          </div>
        ))}
      </div>
      <div style={{position:'relative',marginBottom:'1.5rem'}}>
        <Search size={16} style={{position:'absolute',left:'12px',top:'50%',transform:'translateY(-50%)',color:'var(--theme-text-light)'}}/>
        <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Rechercher par nom ou matière..." style={{width:'100%',padding:'0.65rem 1rem 0.65rem 2.4rem',border:'1px solid var(--theme-border)',borderRadius:'var(--radius-md)',fontSize:'0.9rem',outline:'none'}}/>
      </div>
      <div className="teacher-cards-grid" style={{display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(300px,1fr))',gap:'1rem'}}>
        {filtered.map(p=>(
          <div key={p.id} style={{border:'1px solid var(--theme-border)',borderRadius:'var(--radius-lg)',padding:'1.25rem',background:'var(--theme-bg)',transition:'box-shadow 0.2s'}} onMouseEnter={e=>e.currentTarget.style.boxShadow='0 4px 16px rgba(0,0,0,0.08)'} onMouseLeave={e=>e.currentTarget.style.boxShadow='none'}>
            <div style={{display:'flex',alignItems:'center',gap:'1rem',marginBottom:'0.9rem'}}>
              <div style={{width:'44px',height:'44px',borderRadius:'50%',background:'var(--theme-primary)',color:'white',display:'flex',alignItems:'center',justifyContent:'center',fontWeight:700,fontSize:'1.1rem',flexShrink:0}}>
                {p.nom.split(' ').pop()[0]}
              </div>
              <div style={{flex:1}}>
                <div style={{fontWeight:600,color:'var(--theme-primary)',fontSize:'0.95rem'}}>{p.nom}</div>
                <div style={{fontSize:'0.82rem',color:'var(--theme-secondary)',fontWeight:500}}>{p.matiere}</div>
              </div>
              <span style={{padding:'3px 10px',borderRadius:'12px',fontSize:'0.75rem',fontWeight:600,background:p.statut==='Actif'?'#dcfce7':'#fee2e2',color:p.statut==='Actif'?'#16a34a':'#dc2626'}}>{p.statut}</span>
            </div>
            <div style={{display:'flex',flexDirection:'column',gap:'0.35rem',fontSize:'0.82rem',color:'var(--theme-text-secondary)',marginBottom:'0.75rem'}}>
              <span style={{display:'flex',alignItems:'center',gap:'6px'}}><Phone size={13}/>{p.tel}</span>
              <span style={{display:'flex',alignItems:'center',gap:'6px'}}><Mail size={13}/>{p.email}</span>
              <span style={{display:'flex',alignItems:'center',gap:'6px'}}><Award size={13}/>Expérience : {p.exp}</span>
            </div>
            <div style={{display:'flex',gap:'0.4rem',flexWrap:'wrap'}}>
              {p.classes.map(c=><span key={c} style={{padding:'2px 8px',background:'#e0f2fe',color:'#0369a1',borderRadius:'8px',fontSize:'0.75rem',fontWeight:600}}>{c}</span>)}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── MODULE HORAIRES ────────────────────────────────────────────────
const JOURS = ['Lundi','Mardi','Mercredi','Jeudi','Vendredi'];
const HORAIRE = {
  '08h–09h':['Maths (6A)','Français (5B)','—','Anglais (6B)','Sciences (3Sc)'],
  '09h–10h':['Français (6A)','Maths (5A)','Anglais (5B)','Sciences (6A)','Maths (4Éco)'],
  '10h–11h':['Récréation','Récréation','Récréation','Récréation','Récréation'],
  '11h–12h':['Sciences (6A)','Anglais (6B)','Maths (5B)','Français (5A)','Anglais (6A)'],
  '12h–14h':['Pause déjeuner','Pause déjeuner','Pause déjeuner','Pause déjeuner','Pause déjeuner'],
  '14h–15h':['Informatique','—','Maths (6B)','Français (6B)','—'],
  '15h–16h':['Anglais (5A)','Sciences (5B)','Français (6A)','—','Maths (6B)'],
};
const PRESENCES = [
  { classe:'6ème A', present:28, absent:3, retard:1 },
  { classe:'6ème B', present:25, absent:5, retard:2 },
  { classe:'5ème A', present:30, absent:1, retard:0 },
  { classe:'5ème B', present:27, absent:4, retard:1 },
  { classe:'3ème Sc', present:22, absent:6, retard:3 },
];

function SchedulesModule() {
  const [view, setView] = useState('horaire');
  return (
    <div className="glass-card admin-module-card" style={cardS}>
      <div className="admin-module-header" style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:'1.5rem',flexWrap:'wrap',gap:'1rem'}}>
        <h2 style={{color:'var(--theme-primary)'}}>Horaires & Présences</h2>
        <div className="schedule-toggle" style={{display:'flex',gap:'0.5rem'}}>
          {[['horaire','📅 Grille Horaire'],['presences','✅ Pointage du jour']].map(([v,l])=>(
            <button key={v} onClick={()=>setView(v)} style={{padding:'0.45rem 0.9rem',borderRadius:'var(--radius-md)',border:'1px solid var(--theme-border)',background:view===v?'var(--theme-primary)':'white',color:view===v?'white':'var(--theme-text-secondary)',cursor:'pointer',fontSize:'0.85rem'}}>{l}</button>
          ))}
        </div>
      </div>
      {view==='horaire' ? (
        <div className="admin-table-wrap" style={{overflowX:'auto'}}>
          <table style={{width:'100%',borderCollapse:'collapse',minWidth:'620px'}}>
            <thead>
              <tr style={{background:'var(--theme-primary)'}}>
                <th style={{...th,color:'white',borderBottom:'none',width:'90px'}}>Heure</th>
                {JOURS.map(j=><th key={j} style={{...th,color:'white',borderBottom:'none',textAlign:'center'}}>{j}</th>)}
              </tr>
            </thead>
            <tbody>
              {Object.entries(HORAIRE).map(([h, cours], ri)=>(
                <tr key={h} style={{background:ri%2===0?'white':'#f8fafc'}}>
                  <td style={{...td,fontWeight:600,fontSize:'0.8rem',color:'var(--theme-text-secondary)',whiteSpace:'nowrap'}}>{h}</td>
                  {cours.map((c,ci)=>(
                    <td key={ci} style={{...td,textAlign:'center',padding:'0.6rem'}}>
                      {c.includes('Récréation')||c.includes('Pause')
                        ? <span style={{padding:'3px 8px',background:'#fef3c7',color:'#d97706',borderRadius:'8px',fontSize:'0.78rem',fontWeight:600,whiteSpace:'nowrap'}}>{c}</span>
                        : c==='—'
                        ? <span style={{color:'#d1d5db'}}>—</span>
                        : <span style={{padding:'3px 8px',background:'#e0f2fe',color:'#0369a1',borderRadius:'8px',fontSize:'0.78rem',fontWeight:500,display:'inline-block'}}>{c}</span>}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div>
          <div style={{marginBottom:'1rem',padding:'0.75rem 1rem',background:'#fef3c7',borderRadius:'var(--radius-md)',fontSize:'0.88rem',color:'#92400e',display:'flex',alignItems:'center',gap:'0.5rem'}}>
            <AlertCircle size={16}/> Pointage du jour — <strong>Lundi 05 Juillet 2026</strong>
          </div>
          <div className="admin-table-wrap" style={{overflowX:'auto'}}>
            <table style={{width:'100%',borderCollapse:'collapse'}}>
              <thead style={{background:'var(--theme-bg-soft)'}}>
                <tr>{['Classe','Présents','Absents','Retards','Taux','Action'].map(h=><th key={h} style={th}>{h}</th>)}</tr>
              </thead>
              <tbody>
                {PRESENCES.map((p,i)=>{
                  const total=p.present+p.absent+p.retard;
                  const pct=Math.round((p.present/total)*100);
                  return (
                    <tr key={i} onMouseEnter={e=>e.currentTarget.style.background='#f8fafc'} onMouseLeave={e=>e.currentTarget.style.background='white'}>
                      <td style={{...td,fontWeight:600,color:'var(--theme-primary)'}}>{p.classe}</td>
                      <td style={td}><span style={{color:'#16a34a',fontWeight:600,display:'flex',alignItems:'center',gap:'4px'}}><CheckCircle size={14}/>{p.present}</span></td>
                      <td style={td}><span style={{color:'#dc2626',fontWeight:600,display:'flex',alignItems:'center',gap:'4px'}}><XCircle size={14}/>{p.absent}</span></td>
                      <td style={td}><span style={{color:'#d97706',fontWeight:600,display:'flex',alignItems:'center',gap:'4px'}}><Clock size={14}/>{p.retard}</span></td>
                      <td style={td}>
                        <div style={{display:'flex',alignItems:'center',gap:'0.75rem'}}>
                          <div style={{flex:1,height:'8px',background:'#e5e7eb',borderRadius:'4px',overflow:'hidden'}}>
                            <div style={{height:'100%',width:`${pct}%`,background:pct>=90?'#16a34a':pct>=75?'#d97706':'#dc2626',borderRadius:'4px'}}/>
                          </div>
                          <span style={{fontWeight:600,fontSize:'0.85rem',minWidth:'34px'}}>{pct}%</span>
                        </div>
                      </td>
                      <td style={td}><button style={{padding:'0.3rem 0.7rem',background:'var(--theme-primary)',color:'white',border:'none',borderRadius:'var(--radius-md)',cursor:'pointer',fontSize:'0.8rem'}}>Pointer</button></td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}

// ── MODULE FINANCES ────────────────────────────────────────────────
const PAIEMENTS = [
  { id:1, eleve:'Mukoko Jean', classe:'6A', tri:'T1', montant:150, statut:'Payé', date:'02/09/2025', mode:'Mobile Money' },
  { id:2, eleve:'Mbuyi Sarah', classe:'5B', tri:'T1', montant:150, statut:'Partiel', date:'05/09/2025', mode:'Espèces' },
  { id:3, eleve:'Mulumba Paul', classe:'3Sc', tri:'T1', montant:180, statut:'Payé', date:'01/09/2025', mode:'Virement' },
  { id:4, eleve:'Kabila Grâce', classe:'1A Mat', tri:'T1', montant:120, statut:'Impayé', date:'—', mode:'—' },
  { id:5, eleve:'Lumumba David', classe:'4Éco', tri:'T1', montant:200, statut:'Partiel', date:'10/09/2025', mode:'Espèces' },
  { id:6, eleve:'Tshisekedi Joëlle', classe:'6B', tri:'T1', montant:150, statut:'Payé', date:'03/09/2025', mode:'Mobile Money' },
];

function FinancesModule() {
  const [filtre, setFiltre] = useState('Tous');
  const total = PAIEMENTS.reduce((s,p)=>s+p.montant,0);
  const payé = PAIEMENTS.filter(p=>p.statut==='Payé').reduce((s,p)=>s+p.montant,0);
  const filtered = PAIEMENTS.filter(p=>filtre==='Tous'||p.statut===filtre);
  const finStats = [
    { label:'Total attendu (T1)', val:`$${total}`, bg:'#e0f2fe', color:'#0369a1' },
    { label:'Montant encaissé', val:`$${payé}`, bg:'#dcfce7', color:'#16a34a' },
    { label:'Taux de recouvrement', val:`${Math.round((payé/total)*100)}%`, bg:'#fef3c7', color:'#d97706' },
    { label:'Élèves impayés', val:PAIEMENTS.filter(p=>p.statut==='Impayé').length, bg:'#fee2e2', color:'#dc2626' },
  ];
  return (
    <div className="glass-card admin-module-card" style={cardS}>
      <div className="admin-module-header" style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:'1.5rem',flexWrap:'wrap',gap:'1rem'}}>
        <h2 style={{color:'var(--theme-primary)'}}>Finances & Frais de Scolarité</h2>
        <button className="primary-btn" style={{fontSize:'0.9rem'}}><DollarSign size={16}/> Enregistrer Paiement</button>
      </div>
      <div className="admin-mini-stats" style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(170px,1fr))',gap:'1rem',marginBottom:'1.5rem'}}>
        {finStats.map((s,i)=>(
          <div key={i} style={{background:s.bg,padding:'1rem 1.25rem',borderRadius:'var(--radius-lg)'}}>
            <div style={{fontSize:'1.5rem',fontWeight:700,color:s.color}}>{s.val}</div>
            <div style={{fontSize:'0.8rem',color:s.color,opacity:0.85}}>{s.label}</div>
          </div>
        ))}
      </div>
      <div className="admin-filter-bar" style={{display:'flex',gap:'0.5rem',marginBottom:'1.25rem',flexWrap:'wrap'}}>
        {['Tous','Payé','Partiel','Impayé'].map(f=>(
          <button key={f} onClick={()=>setFiltre(f)} style={{padding:'0.4rem 0.9rem',borderRadius:'var(--radius-md)',border:'1px solid var(--theme-border)',background:filtre===f?'var(--theme-primary)':'white',color:filtre===f?'white':'var(--theme-text-secondary)',cursor:'pointer',fontSize:'0.82rem'}}>
            {f}
          </button>
        ))}
      </div>
      <div className="admin-table-wrap" style={{overflowX:'auto'}}>
        <table style={{width:'100%',borderCollapse:'collapse'}}>
          <thead style={{background:'var(--theme-bg-soft)'}}>
            <tr>{['Élève','Classe','Trim.','Montant','Mode de paiement','Statut','Date'].map(h=><th key={h} style={th}>{h}</th>)}</tr>
          </thead>
          <tbody>
            {filtered.map(p=>{
              const sMap = {Payé:'Validé',Partiel:'En attente',Impayé:'Dossier Incomplet'};
              return (
                <tr key={p.id} onMouseEnter={e=>e.currentTarget.style.background='#f8fafc'} onMouseLeave={e=>e.currentTarget.style.background='white'}>
                  <td style={{...td,fontWeight:600,color:'var(--theme-primary)'}}>{p.eleve}</td>
                  <td style={td}>{p.classe}</td>
                  <td style={td}>{p.tri}</td>
                  <td style={{...td,fontWeight:700}}>${p.montant}</td>
                  <td style={{...td,fontSize:'0.82rem'}}>{p.mode}</td>
                  <td style={td}><span style={{...sc(sMap[p.statut]),padding:'3px 10px',borderRadius:'12px',fontSize:'0.78rem',fontWeight:600}}>{p.statut}</span></td>
                  <td style={{...td,fontSize:'0.82rem',color:'var(--theme-text-secondary)'}}>{p.date}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
