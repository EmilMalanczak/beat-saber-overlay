module.exports = {
  extends: ['@commitlint/config-conventional'],
  rule: {
    'scope-enum': [2, 'always', ['frontend']],
    'scope-empty': [2, 'always']
  }
}
