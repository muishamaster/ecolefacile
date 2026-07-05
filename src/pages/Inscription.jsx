import { useState } from 'react';
import { School, User, Plus, Trash2, ArrowRight, ArrowLeft, CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

const COMMUNES_KINSHASA = [
  'Bandalungwa', 'Barumbu', 'Bumbu', 'Gombe', 'Kalamu', 'Kasa-Vubu', 'Kimbanseke', 
  'Kinshasa', 'Kintambo', 'Kisenso', 'Lemba', 'Limete', 'Lingwala', 'Makala', 
  'Maluku', 'Masina', 'Matete', 'Mont-Ngafula', 'Ndjili', 'Ngaba', 'Ngaliema', 'Ngiri-Ngiri', 'Nsele', 'Selembao'
];

export default function Inscription() {
  const [step, setStep] = useState(1);
  const [parentInfo, setParentInfo] = useState({ nom: '', telephone: '', email: '', commune: 'Gombe' });
  const [eleves, setEleves] = useState([{ id: 1, nom: '', prenom: '', genre: '', niveau: '', classe: '' }]);

  const addEleve = () => setEleves([...eleves, { id: Date.now(), nom: '', prenom: '', genre: '', niveau: '', classe: '' }]);
  const removeEleve = (id) => setEleves(eleves.filter(e => e.id !== id));

  const updateEleve = (id, field, value) => {
    setEleves(eleves.map(e => e.id === id ? { ...e, [field]: value } : e));
  };

  const handleNext = () => setStep(step + 1);
  const handlePrev = () => setStep(step - 1);
  const handleSubmit = (e) => {
    e.preventDefault();
    setStep(3); // Success step
  };

  return (
    <div style={{ minHeight: '100vh', background: 'var(--theme-bg-soft)', display: 'flex', flexDirection: 'column' }}>
      <nav style={{ padding: '1rem 2rem', background: 'var(--theme-primary)', color: 'white', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '1.25rem', fontWeight: 'bold', color: 'white' }}>
          <School color="var(--theme-accent)" />
          <span>C.S. Excellence</span>
        </Link>
      </nav>

      <main style={{ flex: 1, padding: '2rem 1rem', display: 'flex', justifyContent: 'center', alignItems: 'flex-start', marginTop: '2rem' }}>
        <div className="glass-card" style={{ maxWidth: '800px', width: '100%', padding: '2.5rem', borderRadius: 'var(--radius-xl)' }}>
          
          <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
            <h1 style={{ color: 'var(--theme-primary)', fontSize: '2rem', marginBottom: '0.5rem' }}>Demande d'Inscription</h1>
            <p style={{ color: 'var(--theme-text-secondary)' }}>Année Scolaire 2024-2025</p>
          </div>

          <div style={{ display: 'flex', gap: '1rem', marginBottom: '3rem', justifyContent: 'center' }}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', opacity: step >= 1 ? 1 : 0.5 }}>
              <div style={{ width: '30px', height: '30px', borderRadius: '50%', background: step >= 1 ? 'var(--theme-primary)' : 'gray', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '0.5rem' }}>1</div>
               <span style={{ fontSize: '0.85rem' }}>Responsable</span>
            </div>
            <div style={{ borderTop: '2px solid var(--theme-border)', width: '50px', marginTop: '15px' }}></div>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', opacity: step >= 2 ? 1 : 0.5 }}>
              <div style={{ width: '30px', height: '30px', borderRadius: '50%', background: step >= 2 ? 'var(--theme-primary)' : 'gray', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '0.5rem' }}>2</div>
               <span style={{ fontSize: '0.85rem' }}>Élève(s)</span>
            </div>
            <div style={{ borderTop: '2px solid var(--theme-border)', width: '50px', marginTop: '15px' }}></div>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', opacity: step === 3 ? 1 : 0.5 }}>
              <div style={{ width: '30px', height: '30px', borderRadius: '50%', background: step === 3 ? 'var(--theme-secondary)' : 'gray', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '0.5rem' }}>3</div>
               <span style={{ fontSize: '0.85rem' }}>Validation</span>
            </div>
          </div>

          <form onSubmit={step === 2 ? handleSubmit : (e) => { e.preventDefault(); handleNext(); }}>
            {step === 1 && (
              <div className="fade-in">
                <h3 style={{ marginBottom: '1.5rem', color: 'var(--theme-text-primary)' }}>Informations du Parent / Tuteur</h3>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginBottom: '2rem' }}>
                  <div style={{ gridColumn: '1 / -1' }}>
                    <label style={labelStyle}>Nom et Prénom complet</label>
                    <div style={{ position: 'relative' }}>
                      <User size={18} style={{ position: 'absolute', left: '12px', top: '14px', color: 'var(--theme-text-light)' }} />
                      <input required type="text" style={{...inputStyle, paddingLeft: '2.5rem'}} placeholder="Ex: Jean Mukoko" value={parentInfo.nom} onChange={e => setParentInfo({...parentInfo, nom: e.target.value})} />
                    </div>
                  </div>
                  <div>
                    <label style={labelStyle}>Numéro de Téléphone</label>
                    <input required type="tel" style={inputStyle} placeholder="+243 000 000 000" value={parentInfo.telephone} onChange={e => setParentInfo({...parentInfo, telephone: e.target.value})} />
                  </div>
                  <div>
                    <label style={labelStyle}>Adresse Email (optionnel)</label>
                    <input type="email" style={inputStyle} placeholder="jean.mukoko@email.com" value={parentInfo.email} onChange={e => setParentInfo({...parentInfo, email: e.target.value})} />
                  </div>
                  <div style={{ gridColumn: '1 / -1' }}>
                    <label style={labelStyle}>Commune (Kinshasa)</label>
                    <select style={inputStyle} value={parentInfo.commune} onChange={e => setParentInfo({...parentInfo, commune: e.target.value})}>
                      {COMMUNES_KINSHASA.map(c => <option key={c} value={c}>{c}</option>)}
                    </select>
                  </div>
                </div>
                <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                  <button type="submit" className="primary-btn">Suivant <ArrowRight size={18} /></button>
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="fade-in">
                <h3 style={{ marginBottom: '1.5rem', color: 'var(--theme-text-primary)' }}>Élèves à inscrire</h3>
                
                {eleves.map((eleve, index) => (
                  <div key={eleve.id} style={{ background: 'var(--theme-bg)', padding: '1.5rem', borderRadius: 'var(--radius-lg)', border: '1px solid var(--theme-border)', marginBottom: '1rem', position: 'relative' }}>
                    {eleves.length > 1 && (
                      <button type="button" onClick={() => removeEleve(eleve.id)} style={{ position: 'absolute', top: '1rem', right: '1rem', background: 'none', border: 'none', color: 'red', cursor: 'pointer' }}>
                        <Trash2 size={18} />
                      </button>
                    )}
                    <h4 style={{ marginBottom: '1rem', color: 'var(--theme-primary)' }}>Enfant {index + 1}</h4>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                      <div>
                        <label style={labelStyle}>Nom</label>
                        <input required type="text" style={inputStyle} value={eleve.nom} onChange={e => updateEleve(eleve.id, 'nom', e.target.value)} />
                      </div>
                      <div>
                        <label style={labelStyle}>Prénom</label>
                        <input required type="text" style={inputStyle} value={eleve.prenom} onChange={e => updateEleve(eleve.id, 'prenom', e.target.value)} />
                      </div>
                      <div>
                        <label style={labelStyle}>Genre</label>
                        <select required style={inputStyle} value={eleve.genre} onChange={e => updateEleve(eleve.id, 'genre', e.target.value)}>
                          <option value="">Sélectionner</option>
                          <option value="M">Garçon</option>
                          <option value="F">Fille</option>
                        </select>
                      </div>
                      <div>
                        <label style={labelStyle}>Niveau Pédagogique</label>
                        <select required style={inputStyle} value={eleve.niveau} onChange={e => updateEleve(eleve.id, 'niveau', e.target.value)}>
                          <option value="">Sélectionner</option>
                          <option value="Maternelle">Maternelle</option>
                          <option value="Primaire">Primaire</option>
                          <option value="Secondaire">Secondaire Général</option>
                          <option value="Technique">Humanités Techniques</option>
                        </select>
                      </div>
                    </div>
                  </div>
                ))}
                
                <button type="button" onClick={addEleve} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--theme-primary)', background: 'none', border: 'none', fontWeight: 600, cursor: 'pointer', margin: '1rem 0 2rem' }}>
                  <Plus size={20} /> Ajouter un autre enfant
                </button>

                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <button type="button" onClick={handlePrev} className="btn-outline" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                     <ArrowLeft size={18} /> Retour
                  </button>
                  <button type="submit" className="primary-btn" style={{ background: 'var(--theme-secondary)' }}>
                     Valider l'inscription <CheckCircle size={18} />
                  </button>
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="fade-in" style={{ textAlign: 'center', padding: '2rem 0' }}>
                <div style={{ width: '80px', height: '80px', background: '#dcfce7', color: '#16a34a', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem' }}>
                   <CheckCircle size={40} />
                </div>
                <h2 style={{ color: 'var(--theme-primary)', marginBottom: '1rem' }}>Demande Envoyée !</h2>
                <p style={{ color: 'var(--theme-text-secondary)', marginBottom: '2.5rem', maxWidth: '500px', margin: '0 auto 2.5rem' }}>
                  Merci M/Mme {parentInfo.nom}. Votre demande pour {eleves.length} élève(s) a été reçue. La direction de l'école vous contactera très prochainement au <strong>{parentInfo.telephone}</strong> pour la finalisation du dossier.
                </p>
                <Link to="/">
                  <button className="primary-btn">Retour à l'accueil</button>
                </Link>
              </div>
            )}
          </form>
        </div>
      </main>
      
      <style>{`
        .fade-in { animation: fadeIn 0.4s ease forwards; }
        @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
      `}</style>
    </div>
  );
}

const labelStyle = { display: 'block', marginBottom: '0.4rem', fontWeight: 500, fontSize: '0.9rem', color: 'var(--theme-text-secondary)' };
const inputStyle = { width: '100%', padding: '0.8rem 1rem', border: '1px solid var(--theme-border)', borderRadius: 'var(--radius-md)', outline: 'none', fontSize: '1rem', fontFamily: 'inherit', background: 'var(--theme-bg)' };
