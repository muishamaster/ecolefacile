import { useState, useEffect, useRef } from 'react';
import { School, GraduationCap, ChevronRight, MapPin, Phone, Mail, Menu, X } from 'lucide-react';
import { Link } from 'react-router-dom';

// Composant pour l'animation au Scroll (Intersection Observer)
function FadeUp({ children, delay = 0 }) {
  const [isVisible, setIsVisible] = useState(false);
  const domRef = useRef();

  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target); // Animation jouée une seule fois
        }
      });
    }, { threshold: 0.1 });
    
    const currentRef = domRef.current;
    if (currentRef) observer.observe(currentRef);
    return () => { if (currentRef) observer.unobserve(currentRef); };
  }, []);

  return (
    <div
      ref={domRef}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateY(0)' : 'translateY(50px)',
        transition: `all 0.8s cubic-bezier(0.16, 1, 0.3, 1) ${delay}s`,
      }}
    >
      {children}
    </div>
  );
}

export default function PublicTemplate() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  // État gérant l'ouverture du Modal (Null = fermé, Object = ouvert avec les données du cycle)
  const [selectedCycle, setSelectedCycle] = useState(null);

  const cycles = [
    { tag: "Maternelle", desc: "Éveil psychomoteur, socialisation et initiation douce aux apprentissages fondamentaux pour les tout-petits.", age: "3 à 5 ans", fees: "120$" },
    { tag: "Primaire", desc: "Acquisition de la lecture, de l'écriture et des mathématiques dans un cadre pédagogique bienveillant.", age: "6 à 11 ans",  fees: "150$" },
    { tag: "Secondaire Général", desc: "Préparation solide pour forger le socle de culture générale avant les spécifications humanistes.", age: "12 à 15 ans", fees: "180$" },
    { tag: "Humanités Techniques", desc: "Formation professionnalisante pointue axée sur l'informatique, l'économie et la pratique.", age: "16 à 18 ans", fees: "200$" }
  ];

  return (
    <div className="school-template" style={{ position: 'relative' }}>
      
      {/* 🚀 MODAL D'INFORMATION - S'affiche par dessus tout le reste SI selectedCycle n'est pas null */}
      {selectedCycle && (
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(4px)', zIndex: 9999, display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '1rem', animation: 'fadeIn 0.3s ease' }}>
          <div className="glass-card" style={{ background: 'white', padding: '2rem', borderRadius: 'var(--radius-xl)', width: '100%', maxWidth: '500px', position: 'relative', transform: 'translateY(0)', animation: 'slideUp 0.4s ease' }}>
            <button onClick={() => setSelectedCycle(null)} style={{ position: 'absolute', top: '1.5rem', right: '1.5rem', background: 'none', border: 'none', cursor: 'pointer', color: 'var(--theme-text-light)' }}>
              <X size={24} />
            </button>
            
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem', color: 'var(--theme-primary)' }}>
               <GraduationCap size={32} />
               <h2 style={{ fontSize: '1.8rem' }}>{selectedCycle.tag}</h2>
            </div>
            
            <p style={{ color: 'var(--theme-text-secondary)', marginBottom: '1.5rem', lineHeight: 1.6 }}>{selectedCycle.desc}</p>
            
            <div style={{ background: 'var(--theme-bg-soft)', padding: '1.5rem', borderRadius: 'var(--radius-lg)', marginBottom: '2rem' }}>
              <h4 style={{ marginBottom: '1rem', color: 'var(--theme-primary)' }}>Informations Pratiques</h4>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.75rem', color: 'var(--theme-text-secondary)' }}>
                <li style={{ display: 'flex', justifyContent: 'space-between' }}><span>Tranche d'âge :</span> <strong>{selectedCycle.age}</strong></li>
                <li style={{ display: 'flex', justifyContent: 'space-between' }}><span>Uniforme requis :</span> <strong>Bleu & Blanc</strong></li>
                <li style={{ display: 'flex', justifyContent: 'space-between', borderTop: '1px solid var(--theme-border)', paddingTop: '0.75rem', marginTop: '0.25rem' }}>
                   <span>Frais de scolarité (par trimestre) :</span> <strong style={{color: 'var(--theme-secondary)'}}>{selectedCycle.fees}</strong>
                </li>
              </ul>
            </div>
            
            <div style={{ display: 'flex', gap: '1rem' }}>
              <button onClick={() => setSelectedCycle(null)} className="btn-outline" style={{ flex: 1 }}>Fermer</button>
              <Link to="/inscription" style={{ flex: 2 }}>
                <button className="primary-btn" style={{ width: '100%', justifyContent: 'center' }}>Inscrire cet enfant</button>
              </Link>
            </div>
          </div>
        </div>
      )}
      
      {/* Navbar */}
      <nav className="nav-padding" style={{ padding: '1rem 2rem', background: 'var(--theme-primary)', color: 'white', display: 'flex', justifyContent: 'space-between', alignItems: 'center', position: 'relative', zIndex: 50 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '1.25rem', fontWeight: 'bold' }}>
          <School color="var(--theme-accent)" />
          <span>C.S. Excellence</span>
        </div>
        
        {/* Desktop Menu */}
        <div className="desktop-only" style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
          <a href="#about" className="nav-link-hover">À Propos</a>
          <a href="#programs" className="nav-link-hover">Programmes</a>
          <Link to="/admin" className="nav-button-hover" style={{ color: 'var(--theme-primary)', background: 'var(--theme-accent)', padding: '0.5rem 1rem', borderRadius: 'var(--radius-md)', fontSize: '0.9rem', fontWeight: 600 }}>Espace Admin</Link>
        </div>

        {/* Mobile Burger Icon */}
        <button className="mobile-only" onClick={() => setIsMenuOpen(!isMenuOpen)} style={{ background: 'none', border: 'none', color: 'white', cursor: 'pointer' }}>
          {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </nav>

      {/* Mobile Menu Dropdown (Liste défilante) */}
      <div className={`mobile-only sliding-menu ${isMenuOpen ? 'open' : ''}`}>
        <div style={{ display: 'flex', flexDirection: 'column', padding: '1rem 2rem', gap: '1rem' }}>
          <a href="#about" onClick={() => setIsMenuOpen(false)} style={{ color: 'white', fontSize: '1.1rem', padding: '0.5rem 0', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>À Propos</a>
          <a href="#programs" onClick={() => setIsMenuOpen(false)} style={{ color: 'white', fontSize: '1.1rem', padding: '0.5rem 0', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>Programmes</a>
          <Link to="/admin" onClick={() => setIsMenuOpen(false)} style={{ color: 'var(--theme-accent)', fontSize: '1.1rem', padding: '0.5rem 0', fontWeight: 'bold' }}>Connexion Admin</Link>
        </div>
      </div>

      {/* Hero Section */}
      <header style={{
        background: 'linear-gradient(rgba(30, 58, 138, 0.8), rgba(4, 120, 87, 0.8)), url("https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=2070&auto=format&fit=crop") center/cover',
        color: 'white',
        padding: '6rem 2rem',
        textAlign: 'center',
        minHeight: '70vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
      }}>
        <FadeUp delay={0.1}>
          <h1 className="hero-title" style={{ fontSize: '3.5rem', marginBottom: '1rem', maxWidth: '900px', lineHeight: 1.1 }}>Bienvenue au Complexe Scolaire Excellence</h1>
        </FadeUp>
        <FadeUp delay={0.3}>
          <p style={{ fontSize: '1.25rem', marginBottom: '2.5rem', opacity: 0.9, maxWidth: '650px' }}>
            Cultiver les esprits aujourd'hui pour les leaders de demain. Inscrivez vos enfants dans un environnement d'apprentissage de haute qualité.
          </p>
        </FadeUp>
        <FadeUp delay={0.5}>
          <Link to="/inscription">
            <button className="primary-btn" style={{ fontSize: '1.1rem', padding: '1rem 2rem' }}>
              Demander une inscription <ChevronRight size={20} />
            </button>
          </Link>
        </FadeUp>
      </header>

      {/* About Section */}
      <section id="about" className="section" style={{ background: 'var(--theme-bg)' }}>
        <FadeUp>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '4rem', alignItems: 'center' }}>
            <div>
              <h2 style={{ color: 'var(--theme-primary)', fontSize: '2.5rem', marginBottom: '1.5rem', lineHeight: 1.2 }}>Forger l'Élite de Demain grâce à l'Excellence</h2>
              <p style={{ color: 'var(--theme-text-secondary)', marginBottom: '1.5rem', fontSize: '1.1rem', lineHeight: 1.7 }}>
                Situé en plein cœur de Kinshasa, le Complexe Scolaire Excellence s'engage à offrir un cadre d'apprentissage rigoureux et innovant. Nous croyons que chaque enfant a le potentiel de devenir un acteur majeur du développement de la RDC.
              </p>
              <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 2rem 0', display: 'flex', flexDirection: 'column', gap: '1rem', color: 'var(--theme-text-primary)' }}>
                 <li style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', fontWeight: 600 }}>
                   <div style={{ width: '12px', height: '12px', background: 'var(--theme-secondary)', borderRadius: '50%' }}></div> Corps académique chevronné
                 </li>
                 <li style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', fontWeight: 600 }}>
                   <div style={{ width: '12px', height: '12px', background: 'var(--theme-secondary)', borderRadius: '50%' }}></div> Infrastructures et laboratoires modernes
                 </li>
                 <li style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', fontWeight: 600 }}>
                   <div style={{ width: '12px', height: '12px', background: 'var(--theme-secondary)', borderRadius: '50%' }}></div> Suivi psychologique et pédagogique strict
                 </li>
              </ul>
            </div>
            <div style={{ position: 'relative', marginTop: '2rem' }}>
              <img src="https://images.unsplash.com/photo-1577896851231-70ef18881754?q=80&w=2070&auto=format&fit=crop" alt="Campus de l'école" style={{ width: '100%', borderRadius: 'var(--radius-xl)', boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)' }} />
              <div className="glass-card" style={{ position: 'absolute', bottom: '-1.5rem', left: '-1rem', padding: '1.5rem', borderRadius: 'var(--radius-lg)' }}>
                 <div style={{ fontSize: '2.5rem', fontWeight: 800, color: 'var(--theme-primary)' }}>98%</div>
                 <div style={{ color: 'var(--theme-text-secondary)', fontSize: '0.9rem', fontWeight: 500 }}>Réussite à l'Examen d'État</div>
              </div>
            </div>
          </div>
        </FadeUp>
      </section>

      {/* Programs Section */}
      <section id="programs" className="section">
        <FadeUp>
          <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <h2 style={{ color: 'var(--theme-primary)', fontSize: '2.5rem', marginBottom: '0.5rem' }}>Nos Cycles d'Enseignement</h2>
            <p style={{ color: 'var(--theme-text-secondary)', fontSize: '1.1rem' }}>Une éducation complète et moderne pour chaque étape du développement</p>
          </div>
        </FadeUp>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem' }}>
          {cycles.map((cycle, index) => (
            <FadeUp delay={index * 0.15} key={index}>
              <div className="glass-card cycle-card" style={{ padding: '2.5rem 2rem', borderRadius: 'var(--radius-xl)', textAlign: 'center', transition: 'all 0.3s', height: '100%', display: 'flex', flexDirection: 'column' }}>
                <div style={{ background: 'var(--theme-bg-soft)', width: '70px', height: '70px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem', color: 'var(--theme-secondary)' }}>
                  <GraduationCap size={36} />
                </div>
                <h3 style={{ color: 'var(--theme-primary)', fontSize: '1.35rem', marginBottom: '1rem' }}>{cycle.tag}</h3>
                <p style={{ color: 'var(--theme-text-secondary)', marginBottom: '2rem', minHeight: '80px', flex: 1 }}>{cycle.desc}</p>
                {/* Au lieu de naviguer, on OUVRE LA MODAL */}
                <button 
                  onClick={() => setSelectedCycle(cycle)} 
                  className="btn-outline dynamic-btn" 
                  style={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '0.4rem', marginTop: 'auto' }}
                >
                  En savoir plus <ChevronRight size={18} className="btn-icon" />
                </button>
              </div>
            </FadeUp>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="responsive-footer" style={{ background: 'var(--theme-text-primary)', color: 'white', padding: '5rem 2rem 3rem' }}>
        <div className="footer-grid" style={{ maxWidth: '1200px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '3rem' }}>
          <div className="footer-col">
            <div className="footer-logo" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1rem' }}>
              <School color="var(--theme-accent)" />
              <span style={{color: 'white'}}>C.S. Excellence</span>
            </div>
            <p className="footer-desc" style={{ color: 'var(--theme-text-light)', lineHeight: 1.6, maxWidth: '300px' }}>Bâtir l'avenir de la RDC en offrant un cadre éducatif de très haute qualité et un programme rigoureux.</p>
          </div>
          <div className="footer-col">
            <h4 style={{ marginBottom: '1.5rem', color: 'var(--theme-accent)', fontSize: '1.2rem' }}>A propos</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', color: 'var(--theme-text-light)' }}>
              <span>Notre Histoire</span>
              <span>Nos Enseignants</span>
              <span>Règlement intérieur</span>
            </div>
          </div>
          <div className="footer-col">
            <h4 style={{ marginBottom: '1.5rem', color: 'var(--theme-accent)', fontSize: '1.2rem' }}>Contact & Localisation</h4>
            <div className="footer-contact" style={{ display: 'flex', flexDirection: 'column', gap: '1rem', color: 'var(--theme-text-light)' }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}><MapPin size={20} color="var(--theme-secondary)"/> 123 Avenue de la Paix, Gombe, Kinshasa</span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}><Phone size={20} color="var(--theme-secondary)"/> +243 81 000 0000</span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}><Mail size={20} color="var(--theme-secondary)"/> direction@ecole-excellence.cd</span>
            </div>
          </div>
        </div>
        <div className="footer-bottom-text" style={{ maxWidth: '1200px', margin: '3rem auto 0', paddingTop: '2rem', borderTop: '1px solid rgba(255,255,255,0.1)', textAlign: 'center', color: 'var(--theme-text-light)', fontSize: '0.9rem' }}>
          &copy; 2024 Complexe Scolaire Excellence. Tous droits réservés.
        </div>
      </footer>
      
      {/* Styles inline rapides pour l'animation du modal */}
      <style>{`
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes slideUp { from { opacity: 0; transform: translateY(30px); } to { opacity: 1; transform: translateY(0); } }
      `}</style>
    </div>
  );
}
