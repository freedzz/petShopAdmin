module.exports = {
  description: 'generate a test',
  prompts: [{
    type: 'input',
    name: 'name',
    message: 'view name please',
  }],
  actions: data => {
    const name = '{{name}}';
    const actions = [{
      type: 'add',
      path: `src/views/${name}/index.vue`,
      templateFile: 'plop-templates/view/index.hbs',
      data: {
        name: name
      }
    }];
    return actions;
  }
}
