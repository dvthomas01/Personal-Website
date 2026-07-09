import type { ProjectDetail } from '../types';

const BASE = `${import.meta.env.BASE_URL}media/lecture-note/`;

export const lectureNote: ProjectDetail = {
  id: 'lecture-note',
  tech: ['python'],
  blocks: [
    { type: 'video', src: `${BASE}RAG_PDF_vid.mp4`, poster: `${BASE}poster.jpg`, caption: 'demo · querying lecture notes from the command line' },
    {
      type: 'bullets',
      heading: 'What I built',
      items: [
        'Built a RAG system with LangChain and Chroma, using cosine similarity for retrieval.',
        'Used Ollama embeddings to convert text to vectors, and LangChain tools to parse, ID, and chunk PDF lecture notes.',
        'Added a command-line interface with argparse for queries and vector database management.',
        'Used Ollama-hosted LLMs to generate answers grounded in the retrieved chunks.',
      ],
    },
  ],
};
