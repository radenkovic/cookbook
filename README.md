# Cookbook

Still in WIP.

You can try:

`npx run-recipe from radenkovic/recipes react`


## Available commands


From git:
- npx run-recipe radenkovic react # shorthand for radenkovic/recipes
- npx run-recipe git@github.com:radenkovic/recipes.git
- npx run-recipe https://github.com/radenkovic/recipes.git
- npx run-recipe git radenkovic/recipes react

From local folder:
- nx  run-recipe local ./examples/basic

Help:
- npx  run-recipe help
- npx  run-recipe

## Publish to npm

Manually bump `package.json`, then push with exact version:

```bash
git commit -m "Release 0.0.1"
```