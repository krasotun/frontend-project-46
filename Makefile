gendiff:
	node bin/gendiff.js

test:
	npm test --test-reporter=spec

test-coverage:
	npm test -- --coverage --coverageProvider=v8

lint:
	npx eslint .
