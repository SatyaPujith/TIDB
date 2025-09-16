# Ojo - Wikipedia for Everyone

Ojo is an AI-powered biographical research platform that aggregates public signals and displays them as interactive timelines with exact quoted sources. Think of it as "Wikipedia for everyone" - not just notable public figures, but anyone with a digital footprint.

## Features

- **AI-Powered Research**: Uses Gemini AI to instantly research any public figure and create comprehensive profiles
- **Multi-Source Aggregation**: Searches across Wikipedia, social media platforms, and web sources
- **Interactive Timelines**: Chronological visualization of life events with categorization
- **Source Verification**: Complete provenance tracking with exact quoted sources
- **Vector Search**: Semantic search capabilities using TiDB vector storage
- **PDF Export**: Generate professional biographical reports

## Tech Stack

- **Frontend**: Next.js 13, React, TypeScript, Tailwind CSS
- **Backend**: Next.js API Routes, Node.js
- **Database**: TiDB (MySQL-compatible with vector support)
- **AI**: Google Gemini API for research and embeddings
- **Search**: Wikipedia API, Google Custom Search, YouTube Data API
- **UI Components**: Radix UI, Framer Motion, Lucide React

## Getting Started

### Prerequisites

- Node.js 18+ 
- TiDB database instance
- Google Gemini API key
- (Optional) Google Custom Search API key
- (Optional) YouTube Data API key

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd ojo
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env
```

Fill in your environment variables:
```env
# TiDB Database Configuration
TIDB_HOST=your-tidb-host
TIDB_PORT=4000
TIDB_USERNAME=your-username
TIDB_PASSWORD=your-password
TIDB_DATABASE=people_insights

# Gemini AI Configuration
GEMINI_API_KEY=your-gemini-api-key

# Optional: Enhanced search capabilities
GOOGLE_SEARCH_API_KEY=your-google-search-api-key
GOOGLE_SEARCH_ENGINE_ID=your-search-engine-id
YOUTUBE_API_KEY=your-youtube-api-key
```

4. Set up the database schema:
```sql
-- Create profiles table
CREATE TABLE profiles (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  summary TEXT,
  hero_image_url TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create events table with vector support
CREATE TABLE events (
  id INT AUTO_INCREMENT PRIMARY KEY,
  person_id INT NOT NULL,
  date DATE NOT NULL,
  event_text TEXT NOT NULL,
  categories JSON,
  source_url TEXT,
  source_snippet TEXT,
  embedding VECTOR(3),
  confidence DECIMAL(3,2) DEFAULT 0.90,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (person_id) REFERENCES profiles(id)
);

-- Create provenance table
CREATE TABLE provenance (
  id INT AUTO_INCREMENT PRIMARY KEY,
  event_id INT NOT NULL,
  url TEXT NOT NULL,
  fetch_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  snippet TEXT,
  note TEXT,
  FOREIGN KEY (event_id) REFERENCES events(id)
);
```

5. Run the development server:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the application.

## Usage

1. **Search**: Enter any person's name in the search bar
2. **Select Source**: Choose from multiple verified sources if available
3. **Explore Timeline**: View chronological life events with categories
4. **Verify Sources**: Check provenance and source transparency
5. **Export**: Download professional PDF reports

## API Endpoints

- `GET /api/search?q={query}` - Search for profiles
- `GET /api/profiles/{id}` - Get profile details
- `GET /api/profiles/{id}/events` - Get profile events
- `GET /api/profiles/{id}/provenance` - Get source provenance
- `POST /api/profiles/create-from-wikipedia` - Create profile from Wikipedia
- `GET /api/profiles/{id}/download` - Download profile report

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## Architecture

- **Frontend**: React components with TypeScript for type safety
- **API Layer**: Next.js API routes handling business logic
- **Data Layer**: TiDB for relational data with vector search capabilities
- **AI Integration**: Gemini API for research and natural language processing
- **Search Integration**: Multiple APIs for comprehensive data gathering

## Privacy & Ethics

- Only aggregates publicly available information
- Provides complete source transparency
- Respects robots.txt and API rate limits
- No personal data collection beyond public sources

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Google Gemini AI for research capabilities
- TiDB for vector database support
- Wikipedia for open knowledge
- The open source community for amazing tools and libraries