import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Users, CreditCard, CheckCircle, XCircle, Search, Trash2, Plus, X, Eye, GraduationCap, School, Calendar, Filter, Download, FileText, TrendingUp, AlertTriangle } from 'lucide-react';
import { AnalysisResult, UniversityAnalysisResult } from '../types';
import { jsPDF } from 'jspdf';

// Mock data for users with more details
const INITIAL_USERS = [
  { 
    id: 1, 
    name: 'Jean Kaboré', 
    email: 'jean.k@example.com', 
    hasPaid: true, 
    date: '2024-03-15', 
    status: 'Actif',
    details: {
      age: 18,
      school: 'Lycée Philippe Zinda Kaboré',
      level: 'Terminale D',
      trimesters: [
        { trimester: 1, average: 14.2, grades: [{ subject: 'Maths', grade: 15 }, { subject: 'PC', grade: 13 }] },
        { trimester: 2, average: 14.8, grades: [{ subject: 'Maths', grade: 16 }, { subject: 'PC', grade: 14 }] },
        { trimester: 3, average: 14.5, grades: [{ subject: 'Maths', grade: 14 }, { subject: 'PC', grade: 15 }] }
      ],
      bepc: {
        average: 14.5,
        year: 2021,
        grades: [
          { subject: 'Mathématiques', grade: 15 },
          { subject: 'Physique-Chimie', grade: 14 },
          { subject: 'SVT', grade: 16 },
          { subject: 'Français', grade: 12 },
          { subject: 'Anglais', grade: 13 },
          { subject: 'Histoire-Géo', grade: 14 },
        ]
      },
      bac: null,
      analysisResult: {
        recommendedSeries: 'C',
        top3Series: [
          { series: 'C', score: 85, matchReason: 'Excellents résultats en Maths et PC' },
          { series: 'D', score: 75, matchReason: 'Bon niveau scientifique global' },
          { series: 'E', score: 60, matchReason: 'Profil technique intéressant' }
        ],
        bacSuccessProbability: 92,
        bacMentionProbability: 65,
        projectedBacAverage: 14.5,
        motivationMessage: "Tu as un profil scientifique solide, idéal pour la série C.",
        risks: ["Attention à la philosophie", "Maintenir le rythme en SVT"],
        improvementTips: ["Renforcer l'anglais", "Participer à des clubs scientifiques"],
        analysis: {
          regularity: "Constante",
          dominance: "Scientifique",
          progression: "En hausse"
        },
        testimonials: [],
        usefulLinks: [],
        suitableUniversityMajors: ["Mathématiques", "Physique", "Informatique"],
        futureJobOpportunities: ["Ingénieur (Burkina)", "Data Scientist (International)"],
        estimatedIncomeLevel: "Élevé"
      } as AnalysisResult
    }
  },
  { 
    id: 2, 
    name: 'Aminata Diallo', 
    email: 'ami.d@example.com', 
    hasPaid: true, 
    date: '2024-03-14', 
    status: 'Actif',
    details: {
      age: 19,
      school: 'Collège Saint-Viateur',
      level: 'Post-BAC',
      bepc: {
        average: 16.0,
        year: 2020,
        grades: [
          { subject: 'Mathématiques', grade: 17 },
          { subject: 'Physique-Chimie', grade: 16 },
          { subject: 'SVT', grade: 15 },
          { subject: 'Français', grade: 14 },
        ]
      },
      bac: {
        series: 'D',
        average: 15.5,
        year: 2023,
        grades: [
          { subject: 'Mathématiques', grade: 16 },
          { subject: 'Physique-Chimie', grade: 15 },
          { subject: 'SVT', grade: 16 },
          { subject: 'Philosophie', grade: 12 },
        ]
      },
      analysisResult: null
    }
  },
  { 
    id: 3, 
    name: 'Moussa Ouédraogo', 
    email: 'moussa.o@example.com', 
    hasPaid: false, 
    date: '2024-03-14', 
    status: 'En attente',
    details: {
      age: 17,
      school: 'Lycée Mixte de Gounghin',
      level: 'Première C',
      bepc: {
        average: 13.0,
        year: 2022,
        grades: [
          { subject: 'Mathématiques', grade: 14 },
          { subject: 'Physique-Chimie', grade: 13 },
          { subject: 'SVT', grade: 12 },
          { subject: 'Français', grade: 11 },
        ]
      },
      bac: null,
      analysisResult: null
    }
  },
  { 
    id: 4, 
    name: 'Fatou Sanou', 
    email: 'fatou.s@example.com', 
    hasPaid: true, 
    date: '2024-03-13', 
    status: 'Actif',
    details: {
      age: 18,
      school: 'Lycée Nelson Mandela',
      level: 'Terminale A4',
      bepc: {
        average: 15.0,
        year: 2021,
        grades: [
          { subject: 'Mathématiques', grade: 12 },
          { subject: 'Français', grade: 16 },
          { subject: 'Anglais', grade: 15 },
          { subject: 'Histoire-Géo', grade: 16 },
        ]
      },
      bac: null,
      analysisResult: {
        recommendedSeries: 'A4',
        top3Series: [
          { series: 'A4', score: 88, matchReason: 'Excellence en langues et lettres' },
          { series: 'D', score: 55, matchReason: 'Niveau scientifique moyen' },
          { series: 'G2', score: 65, matchReason: 'Bonnes capacités de rédaction' }
        ],
        bacSuccessProbability: 85,
        bacMentionProbability: 50,
        projectedBacAverage: 13.5,
        motivationMessage: "Tes talents littéraires te destinent naturellement à la série A4.",
        risks: ["Mathématiques à surveiller", "Gestion du stress"],
        improvementTips: ["Lire davantage d'auteurs classiques", "Pratiquer l'anglais oral"],
        analysis: {
          regularity: "Bonne",
          dominance: "Littéraire",
          progression: "Stable"
        },
        testimonials: [],
        usefulLinks: []
      } as AnalysisResult
    }
  },
  { 
    id: 5, 
    name: 'Paul Zongo', 
    email: 'paul.z@example.com', 
    hasPaid: false, 
    date: '2024-03-12', 
    status: 'En attente',
    details: {
      age: 20,
      school: 'Université Joseph Ki-Zerbo',
      level: 'Licence 1',
      bepc: {
        average: 12.5,
        year: 2019,
        grades: []
      },
      bac: {
        series: 'C',
        average: 13.0,
        year: 2022,
        grades: [
          { subject: 'Mathématiques', grade: 14 },
          { subject: 'Physique-Chimie', grade: 13 },
        ]
      },
      analysisResult: {
        recommendedMajors: [
          { major: 'Informatique', score: 90, matchReason: 'Excellentes notes en maths' },
          { major: 'Génie Civil', score: 85, matchReason: 'Bon profil technique' },
          { major: 'Mathématiques', score: 80, matchReason: 'Passion pour les maths' }
        ],
        successProbability: 88,
        justification: "Ton profil scientifique solide te permet de viser des filières d'excellence.",
        opportunities: ["Développeur Web", "Data Scientist", "Ingénieur Logiciel"],
        employabilityRating: "Très Élevée",
        strategicAdvice: ["Participer à des hackathons", "Améliorer l'anglais technique"],
        testimonials: [],
        usefulLinks: [],
        universities: {
          burkinaPublic: ["Université Joseph Ki-Zerbo", "Université Nazi Boni"],
          burkinaPrivate: ["Aube Nouvelle", "USTA"],
          africa: ["UCAD (Sénégal)", "INPHB (Côte d'Ivoire)"],
          europe: ["Université de Paris-Saclay", "EPFL (Suisse)"],
          usa: ["MIT", "Stanford"],
          asia: ["Tsinghua University", "University of Tokyo"],
          canada: ["Université de Montréal", "McGill University"]
        }
      } as unknown as AnalysisResult
    }
  },
  {
    id: '3',
    name: 'Fatima Ouédraogo',
    email: 'fatima.o@example.com',
    date: '2024-03-15',
    status: 'completed',
    details: {
      school: 'Lycée Saint-Exupéry',
      level: 'Terminale D',
      series: 'D',
      bepc: {
        average: 15.5,
        year: 2020,
        grades: [
          { subject: 'Mathématiques', grade: 16 },
          { subject: 'Physique-Chimie', grade: 15 },
          { subject: 'SVT', grade: 17 },
          { subject: 'Français', grade: 14 },
          { subject: 'Anglais', grade: 15 }
        ]
      },
      bac: {
        series: 'D',
        average: 14.2,
        year: 2023,
        grades: [
          { subject: 'Mathématiques', grade: 14 },
          { subject: 'Physique-Chimie', grade: 15 },
          { subject: 'SVT', grade: 16 },
          { subject: 'Philosophie', grade: 12 },
          { subject: 'Anglais', grade: 14 }
        ]
      },
      analysisResult: {
        recommendedMajors: [
          { major: 'Médecine', score: 95, matchReason: 'Excellentes notes en SVT et sciences' },
          { major: 'Pharmacie', score: 92, matchReason: 'Profil scientifique complet' },
          { major: 'Biologie Médicale', score: 88, matchReason: 'Intérêt marqué pour le vivant' },
          { major: 'Agronomie', score: 85, matchReason: 'Compétences en SVT et chimie' },
          { major: 'Nutrition Humaine', score: 82, matchReason: 'Lien santé-alimentation' },
          { major: 'Génie Biomédical', score: 80, matchReason: 'Alliance santé et technique' },
          { major: 'Biochimie', score: 78, matchReason: 'Bases solides en chimie' },
          { major: 'Santé Publique', score: 75, matchReason: 'Profil polyvalent' },
          { major: 'Environnement', score: 72, matchReason: 'Sensibilité écologique' },
          { major: 'Enseignement SVT', score: 70, matchReason: 'Capacité de transmission' }
        ],
        successProbability: 92,
        justification: "Votre parcours académique exemplaire, notamment en sciences de la vie, vous positionne idéalement pour les carrières médicales et paramédicales.",
        opportunities: [
          "Médecin Généraliste", "Pharmacien d'Officine", "Biologiste Médical", 
          "Ingénieur Agronome", "Nutritionniste", "Chercheur en Biomédical",
          "Responsable Qualité Agroalimentaire", "Épidémiologiste", 
          "Consultant en Environnement", "Enseignant-Chercheur"
        ],
        employabilityRating: "Maximale",
        strategicAdvice: [
          "Préparer les concours d'entrée en médecine dès maintenant",
          "Effectuer des stages d'observation en milieu hospitalier",
          "Renforcer l'anglais scientifique"
        ],
        testimonials: [],
        usefulLinks: [],
        universities: {
          burkinaPublic: [
            "Université Joseph Ki-Zerbo (UFR SDS)", 
            "Université Nazi Boni (Bobo-Dioulasso)", 
            "Université Norbert Zongo (Koudougou)",
            "Université de Ouahigouya (Médecine)",
            "Université de Fada N'Gourma"
          ],
          burkinaPrivate: [
            "Université Saint Thomas d'Aquin (USTA)", 
            "Université Aube Nouvelle", 
            "Université Catholique de l'Afrique de l'Ouest (UCAO)",
            "Institut Supérieur de Santé (ISS)",
            "École Privée de Santé Sainte Edwige"
          ],
          africa: [
            "UCAD (Sénégal - Médecine)", 
            "Université Gamal Abdel Nasser (Guinée)", 
            "USTTB (Mali)", 
            "Université de Lomé (Togo)", 
            "Université d'Abomey-Calavi (Bénin)",
            "Université Mohammed VI (Maroc)",
            "University of Ghana (Legon)",
            "University of Ibadan (Nigeria)",
            "Makerere University (Ouganda)",
            "University of Cape Town (Afrique du Sud)"
          ],
          europe: [
            "Sorbonne Université (France)", 
            "Université de Paris Cité (France)", 
            "UCLouvain (Belgique)", 
            "Université de Genève (Suisse)", 
            "Karolinska Institute (Suède)",
            "Charité - Universitätsmedizin Berlin (Allemagne)",
            "University of Amsterdam (Pays-Bas)",
            "University of Copenhagen (Danemark)",
            "Trinity College Dublin (Irlande)",
            "University of Barcelona (Espagne)"
          ],
          usa: [
            "Johns Hopkins University", 
            "Harvard Medical School", 
            "Stanford Medicine", 
            "UCSF School of Medicine", 
            "Mayo Clinic Alix School of Medicine",
            "University of Pennsylvania",
            "Columbia University",
            "Duke University",
            "University of Washington",
            "UCLA David Geffen School of Medicine"
          ],
          asia: [
            "National University of Singapore (NUS)", 
            "University of Tokyo (Japon)", 
            "Peking University (Chine)", 
            "Seoul National University (Corée du Sud)", 
            "University of Hong Kong",
            "Kyoto University (Japon)",
            "Fudan University (Chine)",
            "Tsinghua University (Chine)",
            "Mahidol University (Thaïlande)",
            "Taipei Medical University (Taiwan)"
          ],
          canada: [
            "University of Toronto", 
            "McGill University", 
            "Université de Montréal", 
            "University of British Columbia", 
            "McMaster University",
            "University of Alberta",
            "Université Laval",
            "Western University",
            "University of Ottawa",
            "Dalhousie University"
          ]
        }
      } as unknown as AnalysisResult
    }
  },
];

interface AdminDashboardProps {
  onBack: () => void;
}

export function AdminDashboard({ onBack }: AdminDashboardProps) {
  const [users, setUsers] = useState(INITIAL_USERS);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState<'users' | 'payments'>('users');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<typeof INITIAL_USERS[0] | null>(null);
  const [newUser, setNewUser] = useState({ 
    name: '', 
    email: '', 
    hasPaid: false,
    school: '',
    level: '',
    age: ''
  });
  
  // Payment filters
  const [paymentStatusFilter, setPaymentStatusFilter] = useState<'all' | 'paid' | 'pending'>('all');
  const [paymentDateFilter, setPaymentDateFilter] = useState('');
  const [seriesFilter, setSeriesFilter] = useState<string>('all');

  const SERIES_OPTIONS = ['A', 'A4', 'C', 'D', 'E', 'F', 'G1', 'G2'];

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase());
    
    let matchesSeries = true;
    if (seriesFilter !== 'all') {
      const levelSeries = user.details.level.split(' ').pop(); // Ex: "Terminale D" -> "D"
      const bacSeries = user.details.bac?.series;
      
      matchesSeries = (levelSeries === seriesFilter) || (bacSeries === seriesFilter) || 
                      (seriesFilter === 'A' && levelSeries === 'A4'); // Handle A/A4 mapping if needed
    }

    return matchesSearch && matchesSeries;
  });

  // Derived payments data
  const payments = users.map(user => ({
    id: `PAY-${1000 + user.id}`,
    userId: user.id,
    userName: user.name,
    amount: 2000,
    date: user.date,
    status: user.hasPaid ? 'Completed' : 'Pending',
    method: user.hasPaid ? (user.id % 2 === 0 ? 'Orange Money' : 'Moov Money') : '-'
  }));

  const filteredPayments = payments.filter(payment => {
    const matchesSearch = payment.userName.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          payment.id.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = paymentStatusFilter === 'all' 
      ? true 
      : paymentStatusFilter === 'paid' 
        ? payment.status === 'Completed'
        : payment.status === 'Pending';
    
    const matchesDate = paymentDateFilter ? payment.date === paymentDateFilter : true;

    return matchesSearch && matchesStatus && matchesDate;
  });

  const handleExport = () => {
    const isUsers = activeTab === 'users';
    const data = isUsers ? filteredUsers : filteredPayments;
    const filename = `export_${activeTab}_${new Date().toISOString().split('T')[0]}.csv`;

    const headers = isUsers 
      ? ['ID', 'Nom', 'Email', 'Date', 'Statut Paiement', 'Statut Compte', 'Etablissement', 'Niveau']
      : ['ID Transaction', 'Utilisateur', 'Montant', 'Date', 'Methode', 'Statut'];

    const csvContent = [
      headers.join(','),
      ...data.map(item => {
        if (isUsers) {
          const user = item as typeof INITIAL_USERS[0];
          return [
            user.id,
            `"${user.name}"`,
            user.email,
            user.date,
            user.hasPaid ? 'Payé' : 'En attente',
            user.status,
            `"${user.details.school}"`,
            `"${user.details.level}"`
          ].join(',');
        } else {
          const payment = item as typeof payments[0];
          return [
            payment.id,
            `"${payment.userName}"`,
            payment.amount,
            payment.date,
            payment.method,
            payment.status === 'Completed' ? 'Complété' : 'En attente'
          ].join(',');
        }
      })
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    if (link.download !== undefined) {
      const url = URL.createObjectURL(blob);
      link.setAttribute('href', url);
      link.setAttribute('download', filename);
      link.style.visibility = 'hidden';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  const togglePaymentStatus = (id: number) => {
    setUsers(users.map(user => {
      if (user.id === id) {
        const newStatus = !user.hasPaid;
        return {
          ...user,
          hasPaid: newStatus,
          status: newStatus ? 'Actif' : 'En attente'
        };
      }
      return user;
    }));
  };

  const handleDeleteUser = (id: number) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer cet utilisateur ?')) {
      setUsers(users.filter(user => user.id !== id));
      if (selectedUser?.id === id) setSelectedUser(null);
    }
  };

  const handleAddUser = (e: React.FormEvent) => {
    e.preventDefault();
    const user = {
      id: Math.max(...users.map(u => u.id), 0) + 1,
      name: newUser.name,
      email: newUser.email,
      hasPaid: newUser.hasPaid,
      date: new Date().toISOString().split('T')[0],
      status: newUser.hasPaid ? 'Actif' : 'En attente',
      details: {
        age: parseInt(newUser.age) || 0,
        school: newUser.school || 'Non renseigné',
        level: newUser.level || 'Non renseigné',
        trimesters: [],
        bepc: { average: 0, year: 0, grades: [] },
        bac: null
      }
    };
    setUsers([user, ...users]);
    setIsAddModalOpen(false);
    setNewUser({ name: '', email: '', hasPaid: false, school: '', level: '', age: '' });
  };

  const handleDownloadAnalysis = (user: typeof INITIAL_USERS[0]) => {
    if (!user.details.analysisResult) return;
    
    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.getWidth();
    const margin = 20;
    let y = 20;

    const addTitle = (text: string) => {
      doc.setFontSize(16);
      doc.setFont("helvetica", "bold");
      doc.text(text, margin, y);
      y += 10;
    };

    const addSubtitle = (text: string) => {
      doc.setFontSize(12);
      doc.setFont("helvetica", "bold");
      doc.setTextColor(100);
      doc.text(text, margin, y);
      doc.setTextColor(0);
      y += 7;
    };

    const addText = (text: string) => {
      doc.setFontSize(10);
      doc.setFont("helvetica", "normal");
      const splitText = doc.splitTextToSize(text, pageWidth - 2 * margin);
      doc.text(splitText, margin, y);
      y += splitText.length * 5 + 2;
    };

    const checkPageBreak = (heightNeeded: number = 20) => {
      if (y + heightNeeded > doc.internal.pageSize.getHeight() - margin) {
        doc.addPage();
        y = 20;
      }
    };

    // Header
    doc.setFontSize(20);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(79, 70, 229); // Indigo color
    doc.text("RAPPORT D'ORIENTATION - ORIENTEBF", pageWidth / 2, y, { align: "center" });
    doc.setTextColor(0);
    y += 15;

    // User Info
    addSubtitle("INFORMATIONS PERSONNELLES");
    addText(`Nom: ${user.name}`);
    addText(`Date: ${user.date}`);
    addText(`Etablissement: ${user.details.school}`);
    addText(`Niveau: ${user.details.level}`);
    y += 5;

    // Check if it's Post-BAC (UniversityAnalysisResult) or Post-BEPC (AnalysisResult)
    // We can check for 'recommendedMajors' which is specific to UniversityAnalysisResult
    const isPostBac = 'recommendedMajors' in user.details.analysisResult;

    if (isPostBac) {
      const result = user.details.analysisResult as unknown as UniversityAnalysisResult;

      checkPageBreak();
      addTitle("RÉSULTATS D'ANALYSE (POST-BAC)");
      
      addSubtitle("FILIÈRES RECOMMANDÉES");
      result.recommendedMajors.forEach((m, i) => {
        checkPageBreak();
        addText(`${i + 1}. ${m.major} (Score: ${m.score}/100)`);
        doc.setFont("helvetica", "italic");
        addText(`   "${m.matchReason}"`);
        doc.setFont("helvetica", "normal");
        y += 2;
      });

      checkPageBreak();
      addSubtitle("ANALYSE & PROBABILITÉS");
      addText(`Probabilité de réussite: ${result.successProbability}%`);
      addText(`Justification: ${result.justification}`);
      
      checkPageBreak();
      addSubtitle("DÉBOUCHÉS PROFESSIONNELS");
      result.opportunities.forEach(op => addText(`- ${op}`));

      checkPageBreak();
      addTitle("UNIVERSITÉS & ÉCOLES RECOMMANDÉES");

      const addUniSection = (title: string, list: string[]) => {
        if (!list || list.length === 0) return;
        checkPageBreak(list.length * 5 + 15);
        addSubtitle(title);
        list.forEach(u => addText(`- ${u}`));
        y += 3;
      };

      if (result.universities) {
        addUniSection("Burkina Faso (Public)", result.universities.burkinaPublic);
        addUniSection("Burkina Faso (Privé)", result.universities.burkinaPrivate);
        addUniSection("Afrique", result.universities.africa);
        addUniSection("Europe", result.universities.europe);
        addUniSection("USA", result.universities.usa);
        addUniSection("Asie", result.universities.asia);
        addUniSection("Canada", result.universities.canada);
      }

    } else {
      const result = user.details.analysisResult as AnalysisResult;

      checkPageBreak();
      addTitle("RÉSULTATS D'ANALYSE (POST-BEPC)");
      
      addSubtitle("SÉRIE RECOMMANDÉE");
      addText(`Série: ${result.recommendedSeries}`);
      addText(`Probabilité de succès BAC: ${result.bacSuccessProbability}%`);
      
      checkPageBreak();
      addSubtitle("MOTIVATION");
      addText(result.motivationMessage);

      checkPageBreak();
      addSubtitle("TOP 3 SÉRIES");
      result.top3Series.forEach(s => {
        addText(`- Série ${s.series}: ${s.score}/100 (${s.matchReason})`);
      });

      if (result.suitableUniversityMajors) {
        checkPageBreak();
        addSubtitle("FILIÈRES UNIVERSITAIRES ENVISAGEABLES");
        result.suitableUniversityMajors.forEach(m => addText(`- ${m}`));
      }

      if (result.futureJobOpportunities) {
        checkPageBreak();
        addSubtitle("DÉBOUCHÉS PROFESSIONNELS");
        result.futureJobOpportunities.forEach(j => addText(`- ${j}`));
      }

      checkPageBreak();
      addSubtitle("CONSEILS & RISQUES");
      addText("Conseils:");
      result.improvementTips.forEach(t => addText(`- ${t}`));
      y += 2;
      addText("Risques:");
      result.risks.forEach(r => addText(`- ${r}`));
    }

    // Footer
    const pageCount = doc.getNumberOfPages();
    for(let i = 1; i <= pageCount; i++) {
      doc.setPage(i);
      doc.setFontSize(8);
      doc.setTextColor(150);
      doc.text(`Généré par OrienteBF - Page ${i}/${pageCount}`, pageWidth / 2, doc.internal.pageSize.getHeight() - 10, { align: "center" });
    }

    doc.save(`rapport_${user.name.replace(/\s+/g, '_')}.pdf`);
  };

  return (
    <div className="container mx-auto px-4 py-12 relative">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-bold text-slate-900">Tableau de bord Administrateur</h2>
        <button 
          onClick={onBack}
          className="text-sm text-slate-500 hover:text-indigo-600"
        >
          Retour à l'accueil
        </button>
      </div>

      <div className="grid md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-indigo-50 text-indigo-600 rounded-xl">
              <Users className="w-6 h-6" />
            </div>
            <div>
              <div className="text-sm text-slate-500">Utilisateurs Total</div>
              <div className="text-2xl font-bold text-slate-900">{users.length}</div>
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-emerald-50 text-emerald-600 rounded-xl">
              <CreditCard className="w-6 h-6" />
            </div>
            <div>
              <div className="text-sm text-slate-500">Revenus (Est.)</div>
              <div className="text-2xl font-bold text-slate-900">
                {users.filter(u => u.hasPaid).length * 2000} FCFA
              </div>
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-amber-50 text-amber-600 rounded-xl">
              <CheckCircle className="w-6 h-6" />
            </div>
            <div>
              <div className="text-sm text-slate-500">Taux de conversion</div>
              <div className="text-2xl font-bold text-slate-900">
                {users.length > 0 ? Math.round((users.filter(u => u.hasPaid).length / users.length) * 100) : 0}%
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="flex gap-4">
            <button
              onClick={() => setActiveTab('users')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                activeTab === 'users' 
                  ? 'bg-indigo-50 text-indigo-600' 
                  : 'text-slate-600 hover:bg-slate-50'
              }`}
            >
              Utilisateurs
            </button>
            <button
              onClick={() => setActiveTab('payments')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                activeTab === 'payments' 
                  ? 'bg-indigo-50 text-indigo-600' 
                  : 'text-slate-600 hover:bg-slate-50'
              }`}
            >
              Paiements
            </button>
          </div>
          
          <div className="flex flex-wrap gap-3 w-full sm:w-auto items-center">
            {/* Search Bar - Common */}
            <div className="relative flex-grow sm:flex-grow-0 sm:w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                placeholder={activeTab === 'users' ? "Rechercher un utilisateur..." : "Rechercher un paiement..."}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 rounded-lg border border-slate-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none text-sm"
              />
            </div>

            {/* Users Actions */}
            {activeTab === 'users' && (
              <>
                <select
                  value={seriesFilter}
                  onChange={(e) => setSeriesFilter(e.target.value)}
                  className="pl-3 pr-8 py-2 rounded-lg border border-slate-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none text-sm text-slate-600 bg-white"
                >
                  <option value="all">Toutes les séries</option>
                  {SERIES_OPTIONS.map(series => (
                    <option key={series} value={series}>Série {series}</option>
                  ))}
                </select>
                <button
                  onClick={handleExport}
                  className="p-2 text-slate-500 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors"
                  title="Exporter les utilisateurs"
                >
                  <Download className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setIsAddModalOpen(true)}
                  className="flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-indigo-700 transition-colors"
                >
                  <Plus className="w-4 h-4" />
                  Ajouter
                </button>
              </>
            )}

            {/* Payments Actions */}
            {activeTab === 'payments' && (
              <>
                <div className="relative">
                  <input
                    type="date"
                    value={paymentDateFilter}
                    onChange={(e) => setPaymentDateFilter(e.target.value)}
                    className="pl-3 pr-3 py-2 rounded-lg border border-slate-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none text-sm text-slate-600"
                  />
                </div>
                <select
                  value={paymentStatusFilter}
                  onChange={(e) => setPaymentStatusFilter(e.target.value as any)}
                  className="pl-3 pr-8 py-2 rounded-lg border border-slate-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none text-sm text-slate-600 bg-white"
                >
                  <option value="all">Tous les statuts</option>
                  <option value="paid">Payé</option>
                  <option value="pending">En attente</option>
                </select>
                <button 
                  onClick={handleExport}
                  className="p-2 text-slate-500 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors" 
                  title="Exporter les paiements"
                >
                  <Download className="w-4 h-4" />
                </button>
              </>
            )}
          </div>
        </div>

        <div className="overflow-x-auto">
          {activeTab === 'users' ? (
            <table className="w-full text-left text-sm">
              <thead className="bg-slate-50 text-slate-600 font-medium border-b border-slate-100">
                <tr>
                  <th className="px-6 py-4">Nom</th>
                  <th className="px-6 py-4">Email</th>
                  <th className="px-6 py-4">Date d'inscription</th>
                  <th className="px-6 py-4">Statut Paiement</th>
                  <th className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredUsers.map((user) => (
                  <tr key={user.id} className="hover:bg-slate-50 transition-colors">
                    <td 
                      className="px-6 py-4 font-medium text-slate-900 cursor-pointer hover:text-indigo-600"
                      onClick={() => setSelectedUser(user)}
                    >
                      {user.name}
                    </td>
                    <td className="px-6 py-4 text-slate-600">{user.email}</td>
                    <td className="px-6 py-4 text-slate-600">{user.date}</td>
                    <td className="px-6 py-4">
                      <button
                        onClick={() => togglePaymentStatus(user.id)}
                        className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium transition-colors cursor-pointer ${
                          user.hasPaid
                            ? 'bg-green-100 text-green-700 hover:bg-green-200'
                            : 'bg-amber-100 text-amber-700 hover:bg-amber-200'
                        }`}
                        title="Cliquez pour changer le statut"
                      >
                        {user.hasPaid ? (
                          <>
                            <CheckCircle className="w-3 h-3" /> Payé
                          </>
                        ) : (
                          <>
                            <XCircle className="w-3 h-3" /> En attente
                          </>
                        )}
                      </button>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button 
                          onClick={() => handleDownloadAnalysis(user)}
                          className={`p-2 rounded-lg transition-colors ${
                            user.details.analysisResult 
                              ? 'text-slate-400 hover:text-indigo-600 hover:bg-indigo-50' 
                              : 'text-slate-200 cursor-not-allowed'
                          }`}
                          title="Télécharger le rapport d'analyse"
                          disabled={!user.details.analysisResult}
                        >
                          <FileText className="w-4 h-4" />
                        </button>
                        <button 
                          onClick={() => setSelectedUser(user)}
                          className="text-slate-400 hover:text-indigo-600 p-2 hover:bg-indigo-50 rounded-lg transition-colors"
                          title="Voir détails"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button 
                          onClick={() => handleDeleteUser(user.id)}
                          className="text-red-500 hover:text-red-700 font-medium p-2 hover:bg-red-50 rounded-lg transition-colors"
                          title="Supprimer l'utilisateur"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
                {filteredUsers.length === 0 && (
                  <tr>
                    <td colSpan={5} className="px-6 py-8 text-center text-slate-500">
                      Aucun utilisateur trouvé
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          ) : (
            <table className="w-full text-left text-sm">
              <thead className="bg-slate-50 text-slate-600 font-medium border-b border-slate-100">
                <tr>
                  <th className="px-6 py-4">ID Transaction</th>
                  <th className="px-6 py-4">Utilisateur</th>
                  <th className="px-6 py-4">Montant</th>
                  <th className="px-6 py-4">Date</th>
                  <th className="px-6 py-4">Méthode</th>
                  <th className="px-6 py-4">Statut</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredPayments.map((payment) => (
                  <tr key={payment.id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-4 font-mono text-xs text-slate-500">{payment.id}</td>
                    <td className="px-6 py-4 font-medium text-slate-900">{payment.userName}</td>
                    <td className="px-6 py-4 text-slate-900 font-medium">{payment.amount} FCFA</td>
                    <td className="px-6 py-4 text-slate-600">{payment.date}</td>
                    <td className="px-6 py-4 text-slate-600">{payment.method}</td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        payment.status === 'Completed'
                          ? 'bg-green-100 text-green-700'
                          : 'bg-amber-100 text-amber-700'
                      }`}>
                        {payment.status === 'Completed' ? 'Complété' : 'En attente'}
                      </span>
                    </td>
                  </tr>
                ))}
                {filteredPayments.length === 0 && (
                  <tr>
                    <td colSpan={6} className="px-6 py-8 text-center text-slate-500">
                      Aucun paiement trouvé
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          )}
        </div>
      </div>

      {/* Add User Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden"
          >
            <div className="p-6 border-b border-slate-100 flex justify-between items-center">
              <h3 className="text-xl font-bold text-slate-900">Ajouter un utilisateur</h3>
              <button 
                onClick={() => setIsAddModalOpen(false)}
                className="text-slate-400 hover:text-slate-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={handleAddUser} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Nom complet</label>
                <input
                  type="text"
                  required
                  value={newUser.name}
                  onChange={(e) => setNewUser({...newUser, name: e.target.value})}
                  className="w-full rounded-lg border-slate-200 px-3 py-2 text-sm focus:border-indigo-500 focus:ring-indigo-500"
                  placeholder="Ex: Jean Kaboré"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Email</label>
                <input
                  type="email"
                  required
                  value={newUser.email}
                  onChange={(e) => setNewUser({...newUser, email: e.target.value})}
                  className="w-full rounded-lg border-slate-200 px-3 py-2 text-sm focus:border-indigo-500 focus:ring-indigo-500"
                  placeholder="Ex: jean@example.com"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Établissement</label>
                <input
                  type="text"
                  value={newUser.school}
                  onChange={(e) => setNewUser({...newUser, school: e.target.value})}
                  className="w-full rounded-lg border-slate-200 px-3 py-2 text-sm focus:border-indigo-500 focus:ring-indigo-500"
                  placeholder="Ex: Lycée Philippe Zinda Kaboré"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Niveau</label>
                  <input
                    type="text"
                    value={newUser.level}
                    onChange={(e) => setNewUser({...newUser, level: e.target.value})}
                    className="w-full rounded-lg border-slate-200 px-3 py-2 text-sm focus:border-indigo-500 focus:ring-indigo-500"
                    placeholder="Ex: Terminale D"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Âge</label>
                  <input
                    type="number"
                    value={newUser.age}
                    onChange={(e) => setNewUser({...newUser, age: e.target.value})}
                    className="w-full rounded-lg border-slate-200 px-3 py-2 text-sm focus:border-indigo-500 focus:ring-indigo-500"
                    placeholder="Ex: 18"
                  />
                </div>
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="hasPaid"
                  checked={newUser.hasPaid}
                  onChange={(e) => setNewUser({...newUser, hasPaid: e.target.checked})}
                  className="rounded border-slate-300 text-indigo-600 focus:ring-indigo-500"
                />
                <label htmlFor="hasPaid" className="text-sm font-medium text-slate-700">
                  A déjà payé (2000 FCFA)
                </label>
              </div>
              <div className="pt-4 flex gap-3">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="flex-1 px-4 py-2 rounded-lg border border-slate-200 text-slate-600 font-medium hover:bg-slate-50 transition-colors"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-2 rounded-lg bg-indigo-600 text-white font-medium hover:bg-indigo-700 transition-colors"
                >
                  Ajouter
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}

      {/* User Details Modal */}
      {selectedUser && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 overflow-y-auto">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-2xl shadow-xl w-full max-w-2xl my-8 overflow-hidden"
          >
            <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 font-bold">
                  {selectedUser.name.charAt(0)}
                </div>
                <div>
                  <h3 className="text-xl font-bold text-slate-900">{selectedUser.name}</h3>
                  <p className="text-sm text-slate-500">{selectedUser.email}</p>
                </div>
              </div>
              <button 
                onClick={() => setSelectedUser(null)}
                className="text-slate-400 hover:text-slate-600 p-1 hover:bg-slate-200 rounded-full transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="p-6 max-h-[70vh] overflow-y-auto">
              {/* Info Générale */}
              <div className="grid grid-cols-2 gap-4 mb-8">
                <div className="p-4 bg-slate-50 rounded-xl border border-slate-100">
                  <div className="flex items-center gap-2 text-slate-500 mb-1 text-sm">
                    <School className="w-4 h-4" /> Établissement
                  </div>
                  <div className="font-medium text-slate-900">{selectedUser.details.school}</div>
                </div>
                <div className="p-4 bg-slate-50 rounded-xl border border-slate-100">
                  <div className="flex items-center gap-2 text-slate-500 mb-1 text-sm">
                    <GraduationCap className="w-4 h-4" /> Niveau
                  </div>
                  <div className="font-medium text-slate-900">{selectedUser.details.level}</div>
                </div>
                <div className="p-4 bg-slate-50 rounded-xl border border-slate-100">
                  <div className="flex items-center gap-2 text-slate-500 mb-1 text-sm">
                    <Calendar className="w-4 h-4" /> Âge
                  </div>
                  <div className="font-medium text-slate-900">{selectedUser.details.age} ans</div>
                </div>
                <div className="p-4 bg-slate-50 rounded-xl border border-slate-100">
                  <div className="flex items-center gap-2 text-slate-500 mb-1 text-sm">
                    <CheckCircle className="w-4 h-4" /> Statut
                  </div>
                  <div className={`font-medium ${selectedUser.hasPaid ? 'text-green-600' : 'text-amber-600'}`}>
                    {selectedUser.status}
                  </div>
                </div>
              </div>

              {/* Trimesters */}
              <div className="mb-8">
                <h4 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
                  <span className="w-1 h-6 bg-blue-500 rounded-full"></span>
                  Notes par Trimestre
                </h4>
                {selectedUser.details.trimesters && selectedUser.details.trimesters.length > 0 ? (
                  <div className="grid gap-4 sm:grid-cols-3">
                    {selectedUser.details.trimesters.map((trim: any) => (
                      <div key={trim.trimester} className="bg-white border border-slate-200 rounded-xl overflow-hidden">
                        <div className="px-4 py-2 bg-slate-50 border-b border-slate-200 flex justify-between items-center">
                          <span className="font-medium text-slate-700">Trimestre {trim.trimester}</span>
                          <span className="px-2 py-0.5 bg-blue-100 text-blue-700 rounded-full text-xs font-bold">
                            Moy: {trim.average}/20
                          </span>
                        </div>
                        <div className="p-3 space-y-2">
                          {trim.grades.map((g: any, i: number) => (
                            <div key={i} className="flex justify-between text-sm">
                              <span className="text-slate-600">{g.subject}</span>
                              <span className="font-medium text-slate-900">{g.grade}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-slate-500 italic text-sm">Aucune note trimestrielle disponible.</p>
                )}
              </div>

              {/* BEPC */}
              <div className="mb-8">
                <h4 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
                  <span className="w-1 h-6 bg-indigo-500 rounded-full"></span>
                  Résultats BEPC
                </h4>
                <div className="bg-white border border-slate-200 rounded-xl overflow-hidden">
                  <div className="px-4 py-3 bg-slate-50 border-b border-slate-200 flex justify-between items-center">
                    <span className="font-medium text-slate-700">Année: {selectedUser.details.bepc.year}</span>
                    <span className="px-3 py-1 bg-indigo-100 text-indigo-700 rounded-full text-sm font-bold">
                      Moyenne: {selectedUser.details.bepc.average}/20
                    </span>
                  </div>
                  <div className="p-4">
                    {selectedUser.details.bepc.grades.length > 0 ? (
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                        {selectedUser.details.bepc.grades.map((grade, idx) => (
                          <div key={idx} className="flex justify-between items-center p-2 bg-slate-50 rounded-lg">
                            <span className="text-sm text-slate-600">{grade.subject}</span>
                            <span className="font-bold text-slate-900">{grade.grade}</span>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-slate-500 italic text-sm">Aucune note détaillée disponible.</p>
                    )}
                  </div>
                </div>
              </div>

              {/* BAC (if available) */}
              {selectedUser.details.bac ? (
                <div>
                  <h4 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
                    <span className="w-1 h-6 bg-emerald-500 rounded-full"></span>
                    Résultats BAC
                  </h4>
                  <div className="bg-white border border-slate-200 rounded-xl overflow-hidden">
                    <div className="px-4 py-3 bg-slate-50 border-b border-slate-200 flex justify-between items-center">
                      <span className="font-medium text-slate-700">
                        Série {selectedUser.details.bac.series} ({selectedUser.details.bac.year})
                      </span>
                      <span className="px-3 py-1 bg-emerald-100 text-emerald-700 rounded-full text-sm font-bold">
                        Moyenne: {selectedUser.details.bac.average}/20
                      </span>
                    </div>
                    <div className="p-4">
                      {selectedUser.details.bac.grades.length > 0 ? (
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                          {selectedUser.details.bac.grades.map((grade: any, idx: number) => (
                            <div key={idx} className="flex justify-between items-center p-2 bg-slate-50 rounded-lg">
                              <span className="text-sm text-slate-600">{grade.subject}</span>
                              <span className="font-bold text-slate-900">{grade.grade}</span>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <p className="text-slate-500 italic text-sm">Aucune note détaillée disponible.</p>
                      )}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="mt-8 pt-8 border-t border-slate-100">
                  <h4 className="text-lg font-bold text-slate-900 mb-4">Ajouter Résultats BAC</h4>
                  <form 
                    onSubmit={(e) => {
                      e.preventDefault();
                      const formData = new FormData(e.currentTarget);
                      const newBac = {
                        series: formData.get('series'),
                        year: parseInt(formData.get('year') as string),
                        average: parseFloat(formData.get('average') as string),
                        grades: [] // Simplified for now
                      };
                      
                      const updatedUser = {
                        ...selectedUser,
                        details: {
                          ...selectedUser.details,
                          bac: newBac
                        }
                      };
                      
                      setUsers(users.map(u => u.id === selectedUser.id ? updatedUser : u));
                      setSelectedUser(updatedUser);
                    }}
                    className="bg-slate-50 p-6 rounded-xl border border-slate-200 space-y-4"
                  >
                    <div className="grid grid-cols-3 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">Série</label>
                        <input name="series" required className="w-full rounded-lg border-slate-200 px-3 py-2 text-sm" placeholder="Ex: D" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">Année</label>
                        <input name="year" type="number" required className="w-full rounded-lg border-slate-200 px-3 py-2 text-sm" placeholder="2023" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">Moyenne</label>
                        <input name="average" type="number" step="0.01" required className="w-full rounded-lg border-slate-200 px-3 py-2 text-sm" placeholder="12.5" />
                      </div>
                    </div>
                    <button type="submit" className="w-full py-2 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 transition-colors">
                      Enregistrer le BAC
                    </button>
                  </form>
                </div>
              )}

              {/* Analysis Result */}
              {selectedUser.details.analysisResult && (
                <div className="mt-8 pt-8 border-t border-slate-100">
                  <div className="flex justify-between items-center mb-4">
                    <h4 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                      <span className="w-1 h-6 bg-purple-500 rounded-full"></span>
                      Résultat de l'Analyse
                    </h4>
                    <button
                      onClick={() => handleDownloadAnalysis(selectedUser)}
                      className="flex items-center gap-2 px-3 py-1.5 bg-purple-50 text-purple-700 rounded-lg text-sm font-medium hover:bg-purple-100 transition-colors"
                    >
                      <Download className="w-4 h-4" />
                      Télécharger le rapport
                    </button>
                  </div>
                  
                  <div className="bg-purple-50 rounded-xl p-6 border border-purple-100">
                    <div className="flex items-start gap-4 mb-6">
                      <div className="p-3 bg-white rounded-xl shadow-sm text-purple-600">
                        <TrendingUp className="w-6 h-6" />
                      </div>
                      <div>
                        <div className="text-sm text-purple-700 font-medium mb-1">Série Recommandée</div>
                        {/* @ts-ignore */}
                        <div className="text-3xl font-bold text-slate-900">{selectedUser.details.analysisResult.recommendedSeries}</div>
                        {/* @ts-ignore */}
                        <p className="text-slate-600 text-sm mt-1">"{selectedUser.details.analysisResult.motivationMessage}"</p>
                      </div>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-4">
                      <div className="bg-white p-4 rounded-lg border border-purple-100">
                        <div className="text-xs text-slate-500 uppercase tracking-wider font-semibold mb-2">Probabilité Réussite</div>
                        {/* @ts-ignore */}
                        <div className="text-2xl font-bold text-slate-900">{selectedUser.details.analysisResult.bacSuccessProbability}%</div>
                        <div className="w-full bg-slate-100 rounded-full h-1.5 mt-2">
                          {/* @ts-ignore */}
                          <div className="bg-green-500 h-1.5 rounded-full" style={{ width: `${selectedUser.details.analysisResult.bacSuccessProbability}%` }}></div>
                        </div>
                      </div>
                      <div className="bg-white p-4 rounded-lg border border-purple-100">
                         <div className="text-xs text-slate-500 uppercase tracking-wider font-semibold mb-2">Moyenne Projetée</div>
                         {/* @ts-ignore */}
                         <div className="text-2xl font-bold text-slate-900">{selectedUser.details.analysisResult.projectedBacAverage}/20</div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
            
            <div className="p-6 border-t border-slate-100 bg-slate-50 flex justify-end">
              <button
                onClick={() => setSelectedUser(null)}
                className="px-4 py-2 bg-white border border-slate-200 text-slate-700 rounded-lg hover:bg-slate-50 font-medium transition-colors"
              >
                Fermer
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}
