# Copilot Coding Instruction: Boolean Conversion

- Prefer implicit boolean conversion (e.g., `!!value` or simply `if (value)`) over explicit comparison to `undefined`, `null`, or `false` when checking for truthy/falsy values in conditions, unless explicit comparison is required for clarity or correctness.
- Use this approach for conditions, props like `disabled`, and similar logic to keep code concise and idiomatic.
