import { GoogleGenAI, Type } from "@google/genai";
import { StudentProfile, AnalysisResult, PostBacProfile, UniversityAnalysisResult } from "../types";

let aiClient: GoogleGenAI | null = null;

function getAiClient(): GoogleGenAI {
  if (!aiClient) {
    const apiKey = import.meta.env.VITE_GEMINI_API_KEY || process.env.GEMINI_API_KEY;
    if (!apiKey) {
      throw new Error("La clé API Gemini est manquante. Veuillez configurer la variable d'environnement VITE_GEMINI_API_KEY.");
    }
    aiClient = new GoogleGenAI({ apiKey });
  }
  return aiClient;
}

function parseResponse<T>(text: string): T {
  try {
    // First try: direct parse
    return JSON.parse(text) as T;
  } catch (e) {
    try {
      // Second try: remove markdown code blocks
      const cleaned = text.replace(/```json\n?|```/g, '').trim();
      return JSON.parse(cleaned) as T;
    } catch (e2) {
      // Third try: find the first { and last }
      const start = text.indexOf('{');
      const end = text.lastIndexOf('}');
      if (start !== -1 && end !== -1) {
        const jsonSubstring = text.substring(start, end + 1);
        return JSON.parse(jsonSubstring) as T;
      }
      console.error("Failed to parse JSON response:", text);
      throw new Error("Invalid JSON response from AI");
    }
  }
}

export async function analyzeProfile(profile: StudentProfile): Promise<AnalysisResult> {
  const prompt = `
    Tu es une plateforme intelligente d’orientation scolaire au Burkina Faso.
    Ta mission est d’analyser les données académiques complètes d’un élève et de produire un rapport structuré comprenant :

    1. Analyse statistique des performances (Régularité, Dominance, Progression)
    2. Diagnostic académique (Points forts, points faibles, potentiel)
    3. Recommandation de série après BEPC (Basée sur les notes et le profil)
    4. Projection de réussite au Bac (Probabilité de succès et de mention)
    5. Orientation universitaire adaptée (Filières potentielles après le Bac)
    6. Débouchés professionnels au Burkina Faso (Métiers d'avenir locaux)
    7. Motivation détaillée : Explique clairement pourquoi cette série est recommandée en te basant sur ses points forts spécifiques.

    Profil de l'élève :
    Nom: ${profile.name}
    Âge: ${profile.age}
    École: ${profile.school}
    
    Notes historiques (Moyennes annuelles par matière):
    ${profile.gradesHistory.map(y => `
      Classe: ${y.level}
      Moyenne Générale: ${y.average}
      Notes: ${y.grades.map(g => `${g.subject}: ${g.grade}/20`).join(', ')}
    `).join('\n')}

    Notes du BEPC (Estimées ou Réelles):
    Moyenne BEPC: ${profile.bepcAverage}
    Détails: ${profile.bepcGrades.map(g => `${g.subject}: ${g.grade}/20`).join(', ')}

    Choix exprimé par l'élève : ${profile.preferredSeries}
    Motivation personnelle : ${profile.motivation}
    Centres d'intérêt : ${profile.hobbies}

    Séries disponibles au Burkina Faso :
    - Enseignement Général : 
      - Série A (Lettres - Philosophie - Arts)
      - Série C (Mathématiques - Sciences Physiques)
      - Série D (Mathématiques - Sciences de la Nature)
    - Enseignement Technique : 
      - Série E (Mathématiques et Technique)
      - Série F1 (Construction Mécanique)
      - Série F2 (Électronique)
      - Série F3 (Électrotechnique)
      - Série F4 (Génie Civil)
      - Série G2 (Techniques Quantitatives de Gestion - Comptabilité)
      - Série G3 (Techniques Commerciales)

    Méthodologie d'analyse :
    1. Calcule un score de compatibilité (0-100) pour chaque série basée sur les notes (Maths/PC pour C/D/E/F, Français/Anglais/HG pour A/G).
    2. Analyse la régularité (écart-type implicite), la dominance (matières fortes vs faibles) et la progression (évolution 6ème -> 3ème).
    3. Estime la probabilité de succès au BAC et d'une mention.
    4. Identifie des débouchés spécifiques au contexte économique du Burkina Faso.

    Format de réponse JSON attendu :
    {
      "recommendedSeries": "Nom de la série idéale",
      "top3Series": [
        { "series": "Série 1", "score": 85, "matchReason": "Pourquoi ce choix" },
        { "series": "Série 2", "score": 70, "matchReason": "Pourquoi ce choix" },
        { "series": "Série 3", "score": 60, "matchReason": "Pourquoi ce choix" }
      ],
      "bacSuccessProbability": 85,
      "bacMentionProbability": 40,
      "motivationMessage": "Explication détaillée et motivante du choix de la série recommandée, mettant en avant les atouts de l'élève.",
      "risks": ["Risque 1", "Risque 2"],
      "improvementTips": ["Conseil 1", "Conseil 2"],
      "analysis": {
        "regularity": "Analyse de la régularité des performances",
        "dominance": "Analyse des matières dominantes",
        "progression": "Analyse de la progression académique"
      },
      "testimonials": [
        { "author": "Nom Prénom", "role": "Métier ou Étudiant en ...", "quote": "Citation inspirante liée à la série recommandée..." }
      ],
      "usefulLinks": [
        { "title": "Titre du lien", "url": "URL pertinente (ex: site du ministère, université, etc.)" }
      ],
      "projectedBacAverage": 12.5,
      "suitableUniversityMajors": ["Filière Universitaire 1", "Filière Universitaire 2", "Filière Universitaire 3"],
      "futureJobOpportunities": ["Métier 1 (Burkina)", "Métier 2 (Burkina)"],
      "estimatedIncomeLevel": "Moyen / Élevé / Très Élevé"
    }
  `;

  const response = await getAiClient().models.generateContent({
    model: "gemini-2.5-flash",
    contents: prompt,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          recommendedSeries: { type: Type.STRING },
          top3Series: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                series: { type: Type.STRING },
                score: { type: Type.NUMBER },
                matchReason: { type: Type.STRING },
              }
            }
          },
          bacSuccessProbability: { type: Type.NUMBER },
          bacMentionProbability: { type: Type.NUMBER },
          motivationMessage: { type: Type.STRING },
          risks: { type: Type.ARRAY, items: { type: Type.STRING } },
          improvementTips: { type: Type.ARRAY, items: { type: Type.STRING } },
          analysis: {
            type: Type.OBJECT,
            properties: {
              regularity: { type: Type.STRING },
              dominance: { type: Type.STRING },
              progression: { type: Type.STRING },
            }
          },
          testimonials: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                author: { type: Type.STRING },
                role: { type: Type.STRING },
                quote: { type: Type.STRING },
              }
            }
          },
          usefulLinks: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                title: { type: Type.STRING },
                url: { type: Type.STRING },
              }
            }
          },
          projectedBacAverage: { type: Type.NUMBER },
          suitableUniversityMajors: { type: Type.ARRAY, items: { type: Type.STRING } },
          futureJobOpportunities: { type: Type.ARRAY, items: { type: Type.STRING } },
          estimatedIncomeLevel: { type: Type.STRING }
        }
      }
    }
  });

  console.log("Raw API Response (BEPC):", response.text);

  if (response.text) {
    return parseResponse<AnalysisResult>(response.text);
  }
  
  throw new Error("Failed to generate analysis");
}

export async function analyzePostBacProfile(profile: PostBacProfile): Promise<UniversityAnalysisResult> {
  const prompt = `
    Tu es une plateforme d’orientation universitaire intelligente au Burkina Faso.
    Ta mission est d’analyser le profil post-BAC d'un élève pour lui recommander les meilleures filières universitaires.

    Profil de l'élève :
    Nom: ${profile.name}
    Série du Bac: ${profile.bacSeries}
    Moyenne au Bac: ${profile.bacAverage}
    
    Notes historiques (Seconde à Terminale):
    ${profile.gradesHistory.map(y => `
      Classe: ${y.level}
      Moyenne Générale: ${y.average}
      Notes: ${y.grades.map(g => `${g.subject}: ${g.grade}/20`).join(', ')}
    `).join('\n')}

    Notes du Bac (Détails):
    ${profile.bacGrades.map(g => `${g.subject}: ${g.grade}/20`).join(', ')}

    Matières dominantes (à déduire des notes).
    Motivation de l’élève : ${profile.motivation}
    Centres d'intérêt : ${profile.hobbies}
    Domaines préférés : ${profile.preferredFields}

    🎓 FILIÈRES À CONSIDÉRER (MAXIMUM COUVERTURE) :
    - Sciences & Technologies (Maths, Physique, Chimie, Info, Génie civil/électrique/énergétique/industriel, Mines, Télécoms, IA, Data science)
    - Santé (Médecine, Pharmacie, Odonto, Soins infirmiers, Sage-femme, Santé publique, Biologie médicale)
    - Agriculture & Environnement (Agronomie, Zootechnie, Eaux et forêts, Gestion env., Dév. rural)
    - Économie & Gestion (Compta, Finance, Audit, Banque, Assurance, Gestion, Logistique, Marketing, Commerce int.)
    - Droit & Sciences sociales (Droit public/privé, Sc. Po, RI, Socio, Histoire, Géo)
    - Lettres & Communication (Lettres, Langues, Com, Journalisme, Traduction)
    - Arts & Création (Design, Archi, Arts plastiques, Cinéma)
    - Filières Professionnelles (BTS, Licences pro, Gestion projets, Maintenance, Réseaux)

    Méthode d'analyse :
    1. Évaluer la compatibilité série ↔ filière (ex: Bac C -> Sciences, Bac A -> Lettres/Droit).
    2. Analyser les notes clés pour chaque filière.
    3. Calculer un score d’adéquation pour les filières les plus pertinentes.
    4. Estimer la probabilité de réussite universitaire.
    5. Identifier des débouchés réalistes et porteurs au Burkina Faso et dans le monde.
    6. Citer au moins 10 filières possibles.
    7. Citer au moins 5 universités publiques au Burkina et 5 privées.
    8. Citer au moins 10 universités en Afrique, 10 en Europe, 10 aux USA, 10 en Asie, 10 au Canada.
    9. Citer au moins 10 débouchés possibles.

    Format de réponse JSON attendu :
    {
      "recommendedMajors": [
        { "major": "Nom de la filière", "score": 90, "matchReason": "Pourquoi..." }
      ],
      "successProbability": 80,
      "justification": "Explication détaillée...",
      "opportunities": ["Métier 1", "Métier 2", ...], // Au moins 10 débouchés
      "employabilityRating": "Élevée/Moyenne/Faible",
      "strategicAdvice": ["Conseil 1", "Conseil 2"],
      "testimonials": [...],
      "usefulLinks": [...],
      "universities": {
        "burkinaPublic": ["Université 1", "Université 2", ...], // Au moins 5
        "burkinaPrivate": ["Université 1", "Université 2", ...], // Au moins 5
        "africa": ["Université 1", ...], // Au moins 10
        "europe": ["Université 1", ...], // Au moins 10
        "usa": ["Université 1", ...], // Au moins 10
        "asia": ["Université 1", ...], // Au moins 10
        "canada": ["Université 1", ...] // Au moins 10
      }
    }
  `;

  const response = await getAiClient().models.generateContent({
    model: "gemini-2.5-flash",
    contents: prompt,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          recommendedMajors: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                major: { type: Type.STRING },
                score: { type: Type.NUMBER },
                matchReason: { type: Type.STRING },
              }
            }
          },
          successProbability: { type: Type.NUMBER },
          justification: { type: Type.STRING },
          opportunities: { type: Type.ARRAY, items: { type: Type.STRING } },
          employabilityRating: { type: Type.STRING },
          strategicAdvice: { type: Type.ARRAY, items: { type: Type.STRING } },
          testimonials: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                author: { type: Type.STRING },
                role: { type: Type.STRING },
                quote: { type: Type.STRING },
              }
            }
          },
          usefulLinks: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                title: { type: Type.STRING },
                url: { type: Type.STRING },
              }
            }
          },
          universities: {
            type: Type.OBJECT,
            properties: {
              burkinaPublic: { type: Type.ARRAY, items: { type: Type.STRING } },
              burkinaPrivate: { type: Type.ARRAY, items: { type: Type.STRING } },
              africa: { type: Type.ARRAY, items: { type: Type.STRING } },
              europe: { type: Type.ARRAY, items: { type: Type.STRING } },
              usa: { type: Type.ARRAY, items: { type: Type.STRING } },
              asia: { type: Type.ARRAY, items: { type: Type.STRING } },
              canada: { type: Type.ARRAY, items: { type: Type.STRING } },
            }
          }
        }
      }
    }
  });

  console.log("Raw API Response (BAC):", response.text);

  if (response.text) {
    return parseResponse<UniversityAnalysisResult>(response.text);
  }
  
  throw new Error("Failed to generate university analysis");
}
