// Initializes the `retros` service on path `/retros`
const { Retros } = require('./retros.class');
const createModel = require('../../models/retros.model');
const hooks = require('./retros.hooks');

module.exports = function (app) {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/retros', new Retros(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('retros');

  service.hooks(hooks);
};
