declare module '*.png';
declare module '*.jpg';
declare module '*.jpeg';
declare module '*.JPEG';
declare module '*.svg';
declare module '*.svg?raw' {
  const content: string;
  export default content;
}
