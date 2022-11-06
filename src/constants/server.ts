const LOCAL_ORIGIN = 'http://localhost'
const REMOTE_ORIGIN = 'https://music-api.nice-boy.com'

export const PORT = 8080

export const SERVER = __LOCALHOST__ ? `${LOCAL_ORIGIN}:${PORT}/` : `${REMOTE_ORIGIN}/`
export const GRAPHQL_SERVER = __LOCALHOST__ ? `${LOCAL_ORIGIN}:${PORT}/graphql` : `${REMOTE_ORIGIN}/graphql`
