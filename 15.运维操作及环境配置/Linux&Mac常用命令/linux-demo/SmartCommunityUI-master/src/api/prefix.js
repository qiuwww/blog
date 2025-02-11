const prefix_pai = process.env.NODE_ENV === 'development' ? '/partypc' : '/party'
const server_api = process.env.NODE_ENV === 'development' ? '/server' : 'server'
export const prefix = prefix_pai
export const server = server_api
