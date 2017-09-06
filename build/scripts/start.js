const logger = require('../lib/logger')
const { port } = require('../../project.config')

logger.info('Starting server...')

require('../../server/main').listen(port, () => {
  logger.success(`Server is running at http://localhost:${port}`)
})
