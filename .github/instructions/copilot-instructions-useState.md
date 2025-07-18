# Copilot Agent Instructions: useState Typing

## Pattern for useState

- When using `useState`, do **not** specify the type argument if the type can be correctly inferred from the default value.
- If omitting the type causes type errors (e.g., type is inferred as `never` or usage is ambiguous), use an explicit type with the most specific type possible.
- For object state (e.g., `Profile`), prefer `useState<Profile>()` over `useState<Profile | undefined>()` as `undefined` becomes the default value either way.
- Prefer concise, idiomatic React code and avoid unnecessary type annotations.

**Example:**
```tsx
// Good (type inferred)
const [count, setCount] = useState(0);

// Good (type inferred)
const [name, setName] = useState('');

// Good (explicit type needed for object)
const [user, setUser] = useState<User>();

// Good (explicit type for object, prefer non-undefined unless needed)
const [profile, setProfile] = useState<Profile>();

// Bad (undefined default value not needed)
const [user, setUser] = useState<User | undefined>(undefined);
```

Apply this pattern throughout the codebase.
