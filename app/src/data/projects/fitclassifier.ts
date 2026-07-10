import type { ProjectDetail } from '../types';

const BASE = `${import.meta.env.BASE_URL}media/fitclassifier/`;

export const fitclassifier: ProjectDetail = {
  id: 'fitclassifier',
  tech: ['python', 'react', 'yolov8', 'clip', 'faiss', 'docker', 'google cloud', 'firestore'],
  blocks: [
    {
      type: 'video',
      src: `${BASE}fitclassifier-vid.mp4`,
      poster: `${BASE}poster.jpg`,
      caption: 'demo · uploading an outfit photo and getting matches back',
    },
    {
      type: 'text',
      heading: 'Project overview',
      paragraphs: [
        'I built FitClassifier after one too many Pinterest scrolls: I kept finding unique fashion pieces with no way to tell what they were or where to buy them. The idea is a "Shazam for clothes": take a photo of a fashion item and get back a real match.',
        'Traditional fashion discovery relies on manual searching and browsing, which is slow and often turns up nothing. FitClassifier detects the item in a photo with a YOLOv8 model, describes it with CLIP, and looks up similar products with a FAISS vector search, so it can surface recommendations without knowing the brand or product name up front.',
      ],
    },
    {
      type: 'bullets',
      heading: 'The problem',
      items: [
        'Identify a clothing item from a photo instantly, without knowing its brand or name.',
        'Find similar products that are actually available to buy.',
        'Discover fashion items with no text description to search from.',
        'Search a comprehensive database of real fashion products.',
      ],
    },
    {
      type: 'bullets',
      heading: 'How it works',
      items: [
        'Detects clothing items in the photo with a custom-trained YOLOv8 object detector.',
        "Generates a detailed description of each item with OpenAI's CLIP vision-language model.",
        'Runs a semantic search over a FAISS vector database to find matching products.',
        'Returns real-time product recommendations with purchase links.',
      ],
    },
    {
      type: 'bullets',
      heading: 'Architecture',
      items: [
        'Frontend (React): image upload interface, live results display, and product recommendation cards.',
        'Backend (Python, Dockerized): runs YOLOv8 detection, CLIP captioning, and FAISS search, deployed on Google Cloud.',
        'Database (Firestore): stores product metadata, vector embeddings, and user interaction logs.',
      ],
    },
    {
      type: 'text',
      heading: 'Under the hood',
      paragraphs: [
        'A custom-trained YOLOv8 model detects fashion items in the uploaded photo. It was trained on a diverse clothing dataset, tuned for speed and accuracy on consumer hardware.',
        "OpenAI's CLIP model turns each detected item into a detailed, human-readable description, which is what lets the search work from an image instead of typed keywords.",
        'A FAISS (Facebook AI Similarity Search) index compares those descriptions against millions of product embeddings to find close matches in real time.',
        'The whole backend runs in a Docker container on Google Cloud Platform, with Firestore handling storage and retrieval.',
      ],
    },
    {
      type: 'text',
      heading: 'Key challenges',
      paragraphs: [
        "The hardest part was building a FAISS index broad enough to cover many different types of clothing, and finding a way to embed each item's distinguishing features so new photos could be compared against it reliably.",
        "I also traded accuracy for speed: a smaller YOLOv8 model trains faster on a laptop, but the resulting detection is mediocre. It's a solid foundation, though a bigger model would improve it.",
      ],
    },
    {
      type: 'bullets',
      heading: 'Key features',
      items: [
        'Image upload through a drag-and-drop or file-picker interface.',
        'Real-time detection: YOLOv8 instantly finds and localizes clothing items in the photo.',
        'Semantic description: CLIP generates a readable description of each detected item.',
        'Product recommendations: FAISS search returns similar products with purchase links.',
        "Built for casual use, the way people Google something to learn more about it: snap a photo of an outfit you like and see where it's from.",
      ],
    },
    {
      type: 'gallery',
      heading: 'Product matches',
      images: [
        { src: `${BASE}search-results-1.jpg`, alt: 'clothing item detected in a photo' },
        { src: `${BASE}outfit-3.avif`, alt: 'outfit example you can search with' },
        { src: `${BASE}fitclassifier-ex-1.jpg`, alt: 'search results showing matched products' },
        { src: `${BASE}search-results-2.jpg`, alt: 'additional search results' },
        { src: `${BASE}outfit-1.jpeg`, alt: 'another outfit example used for testing search' },
      ],
    },
    {
      type: 'bullets',
      heading: 'Performance',
      items: [
        '75% overall detection accuracy.',
        '85% accuracy on bottoms and shoes.',
        '65% accuracy on outerwear.',
      ],
    },
    {
      type: 'text',
      heading: 'Performance analysis',
      paragraphs: [
        'Accuracy is uneven across categories because the training data is imbalanced. Bottoms and shoes, which had plenty of examples, detect well; outerwear, which had fewer, lags behind.',
        'Overall the YOLOv8 model lands at mediocre performance. I chose a smaller model so it would train faster on my laptop, and that speed came at the cost of accuracy.',
        'The precision-recall and F1 curves tell the same story: strong precision on well-represented classes, weaker results on the underrepresented ones.',
      ],
    },
    {
      type: 'gallery',
      heading: 'Charts',
      images: [
        { src: `${BASE}train-instances-distribution.png`, alt: 'training data distribution across clothing categories' },
        { src: `${BASE}val-batch0-labels.jpg`, alt: 'validation batch showing detection results' },
        { src: `${BASE}confusion-matrix-normalized.png`, alt: 'normalized confusion matrix' },
        { src: `${BASE}pr-curve.png`, alt: 'precision-recall curve' },
        { src: `${BASE}f1-curve.png`, alt: 'F1 score curve' },
        { src: `${BASE}labels-correlogram.jpg`, alt: 'label correlogram showing category relationships' },
      ],
    },
    {
      type: 'bullets',
      heading: 'Future improvements',
      items: [
        'Expand the training dataset with a more balanced class distribution.',
        'Add data augmentation.',
        'Try larger model architectures for better accuracy.',
        'Tune hyperparameters further.',
      ],
    },
  ],
};
