import { fetch } from 'isomorphic-fetch';

declare global {
  var fetch: typeof fetch;
  namespace NodeJS {
    interface Global {
      fetch: typeof fetch;
    }
  }
}