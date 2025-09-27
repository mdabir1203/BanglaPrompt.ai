const ensureFetch = () => {
  if (typeof fetch === 'undefined') {
    throw new FetchError(
      'Fetch API is not available in this environment. Provide a custom fetch implementation when using Supabase in non-browser contexts.',
      'system',
    )
  }
  return fetch
}

type FetchParameters = Parameters<typeof fetch>
type FetchReturn = ReturnType<typeof fetch>

type ExtendedFetch = typeof fetch & {
  isRedirect: (code: number) => boolean
  Promise: typeof Promise
}

export class FetchError extends Error {
  readonly type: string
  readonly code?: string

  constructor(message: string, type: string, code?: string) {
    super(message)
    this.name = 'FetchError'
    this.type = type
    this.code = code
  }
}

const fetchImpl = ((...args: FetchParameters) => ensureFetch()(...args)) as ExtendedFetch

// Align with the node-fetch helpers that Supabase expects
fetchImpl.isRedirect = (code: number) =>
  code === 301 || code === 302 || code === 303 || code === 307 || code === 308
fetchImpl.Promise = Promise

const createMissingApiStub = (apiName: string) =>
  class MissingApi {
    constructor() {
      throw new FetchError(
        `${apiName} is not available in this environment. Ensure you only rely on the Supabase browser client in browsers or polyfill the required API.`,
        'system',
      )
    }
  }

const HeadersImpl = (typeof Headers !== 'undefined' ? Headers : createMissingApiStub('Headers')) as typeof Headers
const RequestImpl = (typeof Request !== 'undefined' ? Request : createMissingApiStub('Request')) as typeof Request
const ResponseImpl = (typeof Response !== 'undefined' ? Response : createMissingApiStub('Response')) as typeof Response

export default fetchImpl
export { HeadersImpl as Headers, RequestImpl as Request, ResponseImpl as Response }
