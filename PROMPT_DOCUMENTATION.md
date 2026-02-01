# 📝 Prompt Documentation - Nagrik Samadhan

## 📋 Prompt Template used and prompts used

*   **List of prompts used during development**

---

## 📑 1. Prompt Template Used

Throughout the development, a standardized "Context-Action-Result" template was used to ensure high-quality, type-safe, and aesthetically pleasing code generation.

### **Structure of our Prompts:**
1.  **Role**: "Act as a Senior Full Stack Engineer and UX Specialist."
2.  **Context**: Provide information about the current project (React, Vite, Tailwind, Supabase).
3.  **Action**: Define the specific feature or logic to be implemented.
4.  **Constraints**: Requirements for responsiveness, glassmorphism, or performance.
5.  **Output**: Expected file structure or specific code blocks.

---

## 📋 2. List of Prompts Used During Development

### **A. Core Architecture & Setup**
*   **Initializing Project:**
    > "Initialize a new React project using Vite and TypeScript. Install Tailwind CSS, Lucide React, and Framer Motion. Create a professional folder structure with components/, pages/, lib/, hooks/, and contexts/. Set up a basic routing structure using react-router-dom."
*   **Building the UI Foundation:**
    > "Create a global design system in index.css. Define a color palette using HSL variables for Primary, Success, Warning, and Danger. Implement utility classes for glassmorphism and smooth transitions."

### **B. AI-Powered Feature Implementation**
*   **AI Fraud Alert System:**
    > "Implement a client-side AI fraud detection system in src/lib/imageHash.ts. Use perceptual hashing (pHash) to generate a unique hash for uploaded images. Compare hashes using Hamming distance. If distance < 10, trigger a FraudAlertDialog to prevent duplicate submissions."
*   **AI Chatbot Assistant:**
    > "Create a bilingual (English/Hindi) AI Chatbot component. It should use keyword matching to help users with 'Reporting', 'Rewards', and 'Verification'. Ensure the UI is a floating bubble accessible from all pages."
*   **Multilingual Toggle:**
    > "Build a LanguageContext to handle English and Hindi translations. Implement a toggle in the header that persists preference in localStorage and instantly updates all text nodes in the app."

### **C. User Experience & Analytics**
*   **Aadhaar Verification Flow:**
    > "Develop a secure-looking Aadhaar verification dialog. Use the Verhoeff algorithm to validate the input. Create a two-step flow: Number entry followed by a simulated OTP verification."
*   **Analytics Dashboard:**
    > "Create a comprehensive Analytics page using recharts. Build a bar chart for categories, a pie chart for issue status, and a line chart for reporting trends over the last 7 days."
*   **Report Issue Form:**
    > "Design a premium multi-step form for reporting issues. Include image upload with preview, Google Maps location picker integration, and category selection. Use Framer Motion for step transitions."

### **D. Documentation & Finalization**
*   **README Generation:**
    > "Generate a professional README.md for a hackathon. Include Mermaid.js diagrams for system architecture and user journeys. Highlight the use of AI tools like Antigravity and pHash."
*   **Project Report:**
    > "Draft a detailed project report summarizing the problem statement, technical stack, AI feature implementations, and social impact of Nagrik Samadhan."

---

## 💡 3. Strategy Analysis

*   **Few-Shot Learning**: Providing 1-2 examples of existing components to the AI to maintain styling consistency.
*   **Chain of Thought**: Explicitly asking the AI to "explain the logic first" for complex systems like the image hashing algorithm.
*   **Iterative Design**: Starting with functional components and then layering on "premium aesthetics" (shimmers, blurs, gradients) in subsequent prompts.

---

**Team Name:** BYTE BUSTERS  
**Project:** Nagrik Samadhan (Civic Issue Portal)  
**Date:** February 1, 2026
 
