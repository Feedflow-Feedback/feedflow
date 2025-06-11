# Feedflow

**Feedflow** ist ein webbasiertes Feedback-Tool, das Nutzer:innen ermöglicht, direkt auf einer Webseite Kommentare, Markierungen und Screenshots zu hinterlassen – ohne die Seite zu verlassen. Ziel ist es, den Feedback-Prozess für Entwickler:innen und Teams effizienter, transparenter und kollaborativer zu gestalten.

## 🔍 Features

- ✍️ Direkte Kommentare und Markierungen auf der Webseite
- 📸 Screenshot-Erstellung mit Anmerkungen
- 📥 Strukturierte Erfassung des Feedbacks in einem zentralen Dashboard
- 👥 Kollaboratives Arbeiten an Rückmeldungen
- 🚀 Einfache Integration in bestehende Webseiten

## 🎯 Zielgruppe

- Entwickler:innen und Designer:innen
- Produktmanager:innen
- QA-Teams
- Kund:innen oder Testnutzer:innen, die unkompliziert Feedback geben möchten

## 🧩 Funktionsweise

1. Nutzer:innen öffnen eine Webseite mit integriertem Feedflow.
2. Per Overlay können Kommentare, Markierungen oder Screenshots erstellt werden.
3. Das Feedback wird automatisch im Dashboard gesammelt.
4. Entwickler:innen sehen kontextbezogene Rückmeldungen inklusive URL, und Screenshots.
5. Aufgaben können priorisiert und abgearbeitet werden.

## ⚙️ Tech Stack

Feedflow verwendet einen modernen und leistungsstarken Technologie-Stack, der auf Modularität, Skalierbarkeit und Entwicklerfreundlichkeit ausgelegt ist.

### 🖥️ Frontend

#### 📌 Overlay (Feedback-Komponente auf Webseiten)

- **Tailwind CSS** – Utility-first CSS für modernes Styling
- **Vite** – Blitzschneller Build- und Entwicklungsserver
- **Preact** – Komponentenbasiertes UI-Framework 

#### 📊 Dashboard (Admin-/Entwickler-Ansicht)

- **React** – Komponentenbasiertes UI-Framework
- **Tailwind CSS** – Schnelles Styling durch Utility-First-Prinzip
- **Vite** – Schnelles Frontend-Build-Tool

### 🔙 Backend

- **Node.js** – JavaScript-Laufzeitumgebung für serverseitige Logik
- **NestJS** – Modularer, skalierbarer Backend-Framework auf TypeScript-Basis
- **TypeORM** – ORM zur Datenbankanbindung und Modellierung

### 🗄️ Datenbank

- **MySQL** – Relationale Datenbank zur strukturierten Speicherung von Feedback, Nutzer- und Projektinformationen

### 🔄 Kommunikation

- **Axios** – HTTP-Client für die Kommunikation zwischen Frontend und Backend

### 🧪 Testing

- **Jest** – Unit- und Integrationstests für Logik und Komponenten
- **Cypress** – End-to-End-Testing für realitätsnahe Testszenarien

### 🚀 Deployment

- **Docker** – Containerisierung aller Applikationsbestandteile für konsistente Deployments
- **Docker Compose** – Orchestrierung von Services (Backend, Frontend, Datenbank etc.)
