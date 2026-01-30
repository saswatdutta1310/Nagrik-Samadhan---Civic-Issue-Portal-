PROJECT REPORT
1. Cover Page
Project Title: Nagrik Samadhan (Civic Issue Portal)

Team Name: Team BYTE BUSTERS

Hackathon Name: FORTEX36

Date of Submission: 29th January 2026

Team Members:

Saswat Dutta - [AP25110070120]
Prabhakar Shukla - [AP25110070091]
Aditya Kumar - [AP25110071284]
Dharitri Padhi - [AP25110070073]
GitHub Repository: https://github.com/saswatdutta1310/Nagrik-Samadhan---Civic-Issue-Portal-

2. Abstract
Nagrik Samadhan is a transparent, location-first civic engagement platform designed to bridge the gap between citizens and local authorities. In many cities, reporting infrastructure issues like potholes, garbage dumps, or broken streetlights is a fragmented and opaque process. Citizens often feel their complaints go into a "black box" with no feedback, leading to disengagement.

Our solution leverages real-time geolocation (Google Maps API) and gamification to turn civic reporting into an engaging, accountable process. Users can simply point, shoot, and report issues, which are then tracked in real-time. We incentivize participation through "Karma Points" and a leaderboard system. Within the hackathon duration, we successfully implemented the core reporting workflow, authentication system, and an interactive map interface, demonstrating a functional MVP that empowers citizens to be active participants in governance.

GitHub Repository: https://github.com/saswatdutta1310/Nagrik-Samadhan---Civic-Issue-Portal-

3. Problem Statement
The rapid urbanization of Indian cities has led to increasing civic issues such as road maintenance failures, waste management inefficiencies, and public safety hazards. However, the current mechanisms for reporting these issues are deeply flawed:

Fragmented Reporting: There is no central, easy-to-use platform. Citizens often don't know whether to contact the municipality, public works, or another department.
Lack of Transparency: When a report is filed, citizens rarely receive updates. The lack of a feedback loop discourages future reporting.
No Incentives: Civic engagement is often viewed as a chore or a waste of time with no tangible reward or recognition for the citizen's effort.
This gap results in deteriorating urban infrastructure and a loss of trust between the public and administration. Our project addresses this relevant real-world problem by creating a unified, transparent, and rewarding channel for civic feedback.

GitHub Repository: https://github.com/saswatdutta1310/Nagrik-Samadhan---Civic-Issue-Portal-

4. Proposed Solution
Nagrik Samadhan provides a comprehensive solution to the disconnect between citizens and authorities.

User Perspective/Workflow:

Login: The user logs in via a secure authentication system (Supabase Auth).
Report: The user clicks "Report Issue", clicks a photo, and the app automatically captures the precise location (Geotagging).
Track: The user can see their reported issues on a map and track their status (Reported -> In Progress -> Resolved).
Earn: For every verified report, the user earns "Karma Points" and climbs the community leaderboard.
Key Features:

Geotagged Reporting: Integration with Google Maps ensures that authorities receive the exact location of the issue.
Gamification: A live leaderboard and point system (Karma Points) motivate users to contribute.
Visual Evidence: Image uploads provide clear proof of the issue.
Community Map: Users can see reports from their neighbors, fostering a sense of community awareness.
The solution is unique because it combines utility (reporting) with engagement (gamification), ensuring sustained user interest unlike traditional grievance portals.

GitHub Repository: https://github.com/saswatdutta1310/Nagrik-Samadhan---Civic-Issue-Portal-

5. Technology Stack
We selected a modern, serverless technology stack to ensure performance, scalability, and rapid development capabilities suitable for a hackathon environment.

Frontend: React.js (Vite) & TypeScript
Selection: React offers a component-based architecture for a dynamic UI. Vite ensures lightning-fast build times. TypeScript provides type safety, reducing runtime errors.
Styling: Tailwind CSS & Shadcn UI
Selection: Tailwind allows for rapid styling with utility classes, while Shadcn UI provides accessible, pre-built components for a polished look.
Backend & Database: Supabase (PostgreSQL)
Selection: Supabase provides an instant, scalable backend. PostgreSQL offers robust relational data storage for user profiles and issue tracking. Supabase Auth handles security seamlessly.
Maps Service: Google Maps JavaScript API
Selection: The industry standard for mapping, ensuring accurate geolocation and reliable map rendering.
Deployment: Vercel
Selection: Optimized for frontend frameworks, ensuring high availability and fast content delivery.
GitHub Repository: https://github.com/saswatdutta1310/Nagrik-Samadhan---Civic-Issue-Portal-

6. System Architecture and Design
The system follows a Serverless Architecture, minimizing infrastructure management and allowing us to focus on logic and user experience.

Frontend (User Interface): The React application serves as the client. It handles user interactions, captures geolocation data, and renders the map interface.
Authentication Layer: Supabase Auth manages user sessions (Login/Signup) securely, supporting both email/password and OAuth providers.
Data & Logic Layer:
PostgreSQL Database: Stores user data, issue reports, coordinates, and status updates.
Supabase Storage: An object storage bucket is used to securely store images of civic issues uploaded by users.
External APIs: The Google Maps API serves map tiles and handles geocoding requests to convert coordinates into readable addresses.
Data Flow: User -> Front-end (React) -> Supabase Client -> PostgreSQL DB / Storage Bucket User -> Front-end (React) -> Google Maps API -> Map Interface

GitHub Repository: https://github.com/saswatdutta1310/Nagrik-Samadhan---Civic-Issue-Portal-

7. Implementation Details
The project is structured as a modern single-page application (SPA).

Directory Structure:

src/: Contains all source code.
components/: Reusable UI elements (Buttons, Forms, MapContainer).
lib/: Helper functions and Supabase client initialization.
pages/: Route components (Home, Login, Report).
Core Logic:

Authentication: We integrated Supabase Auth listeners to handle user sessions. Protected routes ensure only logged-in users can report issues.
Geotagging: We utilize the browser's Geolocation API alongside Google Maps API markers. When a user creates a report, the lat/long coordinates are captured immediately.
Database Interactions: We use asynchronous calls (async/await) to fetch issue data from Supabase. Real-time subscriptions (if enabled) allow the feed to update instantly when a new report is added.
Integration:

The frontend communicates with Supabase via the @supabase/supabase-js client.
Map markers are dynamically rendered based on the array of issues fetched from the database.
GitHub Repository: https://github.com/saswatdutta1310/Nagrik-Samadhan---Civic-Issue-Portal-

8. Results and Demonstration
We have successfully achieved a functional MVP of Nagrik Samadhan.

Working Features:
User Authentication (Sign up/Login).
Interactive Map displaying user current location.
"Report Issue" form with efficient data capture.
Leaderboard displaying user rankings based on points.
Outputs:
The system successfully records issues in the database and reflects them on the map.
Points are correctly attributed to users upon reporting.
(Note: Please insert screenshots below of: 1. The Login Screen, 2. The Dashboard with the Map, 3. The Report Issue Form)

GitHub Repository: https://github.com/saswatdutta1310/Nagrik-Samadhan---Civic-Issue-Portal-

9. Challenges Faced
During the hackathon, we encountered several technical and logistical challenges:

Map Integration: accurately rendering custom markers and handling map click events to capture location data required deep diving into the Google Maps API documentation.
State Management: Managing the state of the application (user session, list of issues, notification status) across different components was complex. We solved this by using React Context/Hooks effectively.
Styling Consistency: ensuring a uniform "premium" look across all pages took significant time. We overcame this by adopting Shadcn UI components which provided a solid baseline.
Geolocation Permissions: Handling browser permission errors for location access required implementing robust error handling and fallback UI.
GitHub Repository: https://github.com/saswatdutta1310/Nagrik-Samadhan---Civic-Issue-Portal-

10. Future Scope
Nagrik Samadhan has immense potential for growth beyond the hackathon:

AI Integration: Use Computer Vision to automatically verify images (e.g., detecting if an image actually contains a pothole) and assign severity scores.
Authority Dashboard: Build a dedicated portal for municipal workers to view, assign, and update the status of issues.
Offline Support: Implement PWA (Progressive Web App) capabilities so users can save reports offline and sync when they regain connectivity.
Citizen Wallet: Fully implement the reward redemption system where Karma Points can be exchanged for coupons or tax credits.
GitHub Repository: https://github.com/saswatdutta1310/Nagrik-Samadhan---Civic-Issue-Portal-

11. Conclusion
Nagrik Samadhan successfully demonstrates how technology can empower citizens and modernize civic governance. By providing a user-friendly, transparent, and gamified platform, we have reimagined the grievance redressal process. During this hackathon, we moved from a concept to a working prototype that addresses a critical need for Indian cities. We are confident that this solution can significantly improve the quality of life and trust in public administration.

GitHub Repository: https://github.com/saswatdutta1310/Nagrik-Samadhan---Civic-Issue-Portal-

12. References
Google Maps Platform Documentation: https://developers.google.com/maps/documentation/javascript/overview
Supabase Documentation: https://supabase.com/docs
React.js Documentation: https://react.dev/
Tailwind CSS Documentation: https://tailwindcss.com/docs
Lucide Icons: https://lucide.dev/
GitHub Repository: https://github.com/saswatdutta1310/Nagrik-Samadhan---Civic-Issue-Portal-