/** @type {import('jest').Config} */
// const config = {
//   // verbose: true,
//   transform: {
//     '^.+\\.(js|jsx)$': 'babel-jest',
//   },
// };

// module.exports = config;

export default {
  preset: 'ts-jest',
  transform: {
    '^.+\\.(ts|tsx)?$': 'ts-jest',
    '^.+\\.(js|jsx)$': 'babel-jest',
  },
};
