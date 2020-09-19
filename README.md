# Skafold

Still in WIP.

You can try:

`npx skf from radenkovic/recipes react`


## Commands


From git:
- npx skf from radenkovic react # shorthand for radenkovic/recipes
- npx skf from git@github.com:radenkovic/recipes.git
- npx skf from https://github.com/radenkovic/recipes.git
- npx skf from-git radenkovic/recipes react 

From local folder:
- nx skf from local ./examples/basic


## Publish to npm

Manually bump `package.json`, then push with exact version:

```bash
git commit -m "Release 0.0.1"
```