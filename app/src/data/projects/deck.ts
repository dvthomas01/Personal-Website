import type { ProjectDetail } from '../types';

const BASE = `${import.meta.env.BASE_URL}media/deck/`;

export const deck: ProjectDetail = {
  id: 'deck',
  tech: ['node.js', 'express.js', 'ejs', 'bootstrap 5', 'vanilla js', 'ygoprodeck api', 'cookies', 'vercel'],
  blocks: [
    {
      type: 'video',
      src: `${BASE}deck-vid.mp4`,
      poster: `${BASE}poster.jpg`,
      caption: 'demo · searching cards and building a deck',
    },
    {
      type: 'text',
      heading: 'Project overview',
      paragraphs: [
        "I built this to get hands-on experience with a public API and ship something interactive for Yu-Gi-Oh! players. It's less a demo and more a full mini web app: search, filter, save, and get advice, wired end to end.",
        'The app searches and filters over 12,000 cards, shows full card details, and lets you build a personal deck by saving and removing cards. It also includes a chat-style deck advisor for meta and news guidance, with backend integration for that still planned.',
      ],
    },
    {
      type: 'bullets',
      heading: 'Architecture',
      items: [
        'Browser: Bootstrap, EJS templates, and vanilla JavaScript, no bundler.',
        'Express: routes and middleware, with cookie-based favorites so each visitor gets their own saved deck.',
        'YGOPRODeck API: the card database queried for search results.',
        'The server renders EJS views with the results and handles client-side interactions.',
      ],
    },
    {
      type: 'text',
      heading: 'How it works',
      paragraphs: [
        "The backend is an Express app with an EJS view engine, static assets, and cookie-based favorites storage; it's built to run serverless on Vercel.",
        'The frontend is EJS templates plus Bootstrap and vanilla JavaScript, with no bundling step. State lives in the DOM and in cookies rather than a client-side framework.',
        'Routes cover the homepage, favorites, and advisor pages, with REST endpoints for favorites CRUD and a POST route that forwards searches to YGOPRODeck.',
      ],
    },
    {
      type: 'bullets',
      heading: 'Features',
      items: [
        'Card search and filters by name, fuzzy name, attribute, archetype, type, level, and race.',
        'Add or remove favorites to build a deck, with cookie-based isolation so each visitor keeps their own.',
        'Card detail overlay showing ATK, DEF, level, attribute, and description.',
        'Responsive Bootstrap 5 interface.',
        'Advisor chat UI for meta and news guidance, with the backend still to come.',
      ],
    },
    {
      type: 'text',
      heading: 'Using the YGOPRODeck API',
      paragraphs: [
        "Card data comes from YGOPRODeck's cardinfo endpoint. UI filters map directly to query parameters: name, fname, attribute, archetype, type, level, and race.",
        'A POST route on the server builds the query string from whichever filters the user filled in, fetches from YGOPRODeck, and renders the results. Responses include card stats and image URLs, which is what the search grid and detail overlays are built from.',
      ],
    },
    {
      type: 'text',
      heading: 'Advisor chatbot',
      paragraphs: [
        "The advisor tab is a chat interface meant for deck-building tips, meta trends, and tournament news. The OpenAI dependency is already in place, but the backend isn't wired up yet, so it's UI-only for now. The plan is to have it summarize sources and hold off on prescriptive advice without enough context.",
      ],
    },
    {
      type: 'gallery',
      heading: 'Screenshots',
      images: [
        { src: `${BASE}poster.jpg`, alt: 'deck builder landing and search UI' },
        { src: `${BASE}tornado-dragon-api.png`, alt: 'YGOPRODeck API response for the Tornado Dragon card' },
        { src: `${BASE}deck-builder-chatbot.png`, alt: 'deck advisor chatbot interface' },
      ],
    },
    {
      type: 'bullets',
      heading: 'Future work',
      items: [
        'Simulated battles between a user deck and meta decks, with win-rate estimates and matchup notes.',
        'A tournament legality validator with deck size limits.',
        'Better advisor reasoning, once the AI backend is wired up.',
        'Deck list export and import, plus sharing.',
        'User accounts with database persistence.',
      ],
    },
  ],
};
