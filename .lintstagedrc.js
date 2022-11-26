module.exports = {
  '**/*.{tsx,ts,jsx,js}': ['eslint --fix', 'prettier --write'],
  '**/*.(ts|tsx)': () => 'yarn tsc --noEmit'
}