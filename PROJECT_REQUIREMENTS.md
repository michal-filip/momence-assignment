# Project Requirements: Momence assignment

## Assignment description

Create a simple React app (don’t use NextJS please), which:

1. When it starts, retrieve the latest currency exchange rates from the Czech National Bank.

   API URL: https://www.cnb.cz/en/financial-markets/foreign-exchange-market/central-bank-exchange-rate-fixing/central-bank-exchange-rate-fixing/daily.txt

   Documentation: https://www.cnb.cz/en/faq/Format-of-the-foreign-exchange-market-rates/

2. Parses the downloaded data and clearly displays a list to the user in the UI.
3. Add a simple form, into which the customer can enter an amount in CZK and select a currency, and after submitting (clicking a button or in real-time) sees the amount entered in CZK converted into the selected currency.
4. Deploy the app so it can be viewed online (it doesn’t matter where - e.q. Vercel, Netflify, etc.).
5. Add automated tests which might be appropriate to ensure that your solution is working correctly.
6. Tech stack: React (+ Hooks), TypeScript, Styled Components, React Query.

Overall: Keep the code simple and the UI nice and easy to use for the user.

## Technical Information

1. **Dependencies**

   1.1 Dependencies should be managed using `yarn`, not using `npm`.
   1.2 App should minimise runtime dependencies and attempt to use lightweight dependencies over heavy ones
   1.3 App should vite and vitest for unit testing

## Non-Functional Requirements

N1. Modular and extensible codebase for adding new features.
N2. Error handling and robust logging.
N3. Any external references are configured in some location instead of being hardcoded throughout codebase
