# Copilot Coding Instruction: Prefer ES6 Closures

- Prefer ES6 arrow functions (closures) over ES5 function expressions and over `function` declarations for callbacks, array methods, inline functions, and exported functions, unless a traditional function is required (e.g., for `this` binding or named recursion).
- Use arrow functions for concise, modern, and more predictable code, especially in React components, utility functions, and exported API functions.
- Use arrow functions for helpers and utility functions, even if not exported.

- Example:
```ts
// Good
export const fetchProfile = async (accessToken: string) => {
  // ...
};

const formatMonthYear = (month?: number, year?: number) => {
  // ...
};

// Bad
export async function fetchProfile(accessToken: string) {
  // ...
}

function formatMonthYear(month?: number, year?: number) {
  // ...
}
```
