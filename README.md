# infusion-project-template

A basic template for new Infusion projects.

1. `git clone --depth=1 --branch=master https://github.com/waharnum/infusion-project-template.git newProject` (rename `newProject` to your project directory)
2. `cd newProject` and `rm -rf .git`
3. Customize package.json as needed
4. `npm install`
5. `git init`
6. `mv pre-commit .git/hooks`
7. `chmod +x .git/hooks/pre-commit`
8. Replace `README.md` as needed

Features:

1. Linter configured (may need to change paths in `Gruntfile.js`)
2. `pre-commit` can be installed in `.git/hooks` to run the linter before committing (and fail commit if linting doesn't pass)
