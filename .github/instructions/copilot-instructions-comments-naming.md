# Copilot Agent Instructions: Comments and Naming

## Rule: Prefer Clear Naming Over Excessive Comments

- Avoid excessive or redundant comments, especially for code that is self-explanatory or where intent is clear from naming and structure.
- If a comment simply restates what the code does, remove it.
- If a comment is needed, consider whether renaming a constant, function, or variable would make the code self-documenting instead.
- Use comments for non-obvious logic, workarounds, or important context that cannot be expressed through naming.
- Avoid JSDoc as long as function name, parameter names or return type are self-explanatory

**Examples:**
```tsx
// Good (clear naming, no comment needed)
const isAuthenticated = Boolean(token);

// Bad (comment restates code)
const isAuthenticated = Boolean(token); // Check if token exists

// Good (rename for clarity)
const loginRedirectUrl = ...;

// Bad (unclear name, needs comment)
const url = ...; // URL for login redirect
```

Apply this rule throughout the codebase.
