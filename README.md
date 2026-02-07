
# AI-Powered PDCA Training Coach

This application is a professional training tool designed to help users master the PDCA (Plan-Do-Check-Act) methodology through AI-assisted coaching and structured forms.

## Features

- **Dual Modes**: 
  - **Mode A**: Goal Setting to Execution (OKR/KPI focus)
  - **Mode B**: Problem Analysis to Root Cause (Quality/Issue focus)
- **AI Coach**: Powered by Gemini 1.5, provides contextual feedback, goal refinement, risk assessment, and deviation analysis.
- **Teacher Review**: Logical auditing of the PDCA cycle to ensure consistency and measurability.
- **Persistence**: Auto-saves data to `localStorage`.
- **Export**: JSON and CSV export capabilities.
- **Progress Tracking**: Real-time progress indicators for each mode.

## Local Development

1. **Install Dependencies**:
   ```bash
   npm install
   ```

2. **Configure Environment Variables**:
   Create a `.env.local` file in the root directory:
   ```env
   API_KEY=your_gemini_api_key_here
   ```
   *Note: Obtain your key from [Google AI Studio](https://aistudio.google.com/).*

3. **Run the App**:
   ```bash
   npm start
   ```

## Vercel Deployment

1. **Push to GitHub**: Initialize a repository and push your code.
2. **Connect to Vercel**: 
   - Go to [Vercel](https://vercel.com/) and create a "New Project".
   - Import your GitHub repository.
3. **Set Environment Variables**:
   - In the Vercel project settings, navigate to **Environment Variables**.
   - Add a variable named `API_KEY` with your Gemini API key value.
4. **Deploy**: Click **Deploy**. Vercel will automatically build and host the application.

## Tech Stack

- **React 18+** with TypeScript
- **Tailwind CSS** for responsive, modern UI
- **Google Gemini API** for intelligence
- **Lucide React** for icons
- **Local Storage** for data persistence
