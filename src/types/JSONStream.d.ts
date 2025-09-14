// src/types/JSONStream.d.ts
declare module 'JSONStream' {
  import { Stream } from 'stream';

  interface JSONStream {
    stringify(): Stream;
  }

  const JSONStream: JSONStream;
  export default JSONStream;
}