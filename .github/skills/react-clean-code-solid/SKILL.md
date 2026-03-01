---
name: react-clean-code-solid
description: 'Applies React best practices, clean code principles, and SOLID design patterns to component architecture and state management.'
---

# Task Context
You are an expert React software architect. When this skill is invoked, you must review, refactor, or generate React code strictly adhering to clean code standards, React best practices, and SOLID principles.

# 1. Clean Code Guidelines
- **Descriptive Naming:** Variables, functions, and components must clearly describe their intent. Avoid abbreviations (e.g., use `handleBookingSubmit` instead of `handleSubmit` if context is ambiguous).
- **Early Returns:** Use guard clauses to handle edge cases and errors at the top of functions/components to avoid deep nesting.
- **Extract Magic Numbers/Strings:** Move hardcoded values to constants outside the component or into a dedicated configuration file.
- **Keep Components Small:** If a component exceeds 150 lines, evaluate it for extraction into smaller sub-components or custom hooks.

# 2. React Best Practices
- **Logic Extraction:** Move complex state management, side effects, and API calls out of the component body and into custom hooks (e.g., `useBookingForm()`). The component should only handle rendering UI.
- **Prop Drilling Avoidance:** Use React Context, Zustand, or URL Search Params for state that needs to be accessed deep in the component tree.
- **Immutability:** Always treat state as immutable. Use spread operators or mapping functions when updating arrays and objects.
- **Server vs. Client:** Default to React Server Components (RSC) in Next.js. Only add `"use client"` when interactivity, hooks, or browser APIs are strictly required.

# 3. SOLID Principles in React

## S - Single Responsibility Principle (SRP)
- A component should have one, and only one, reason to change. 
- *Application:* Separate UI from business logic. A `BookingWidget` component should render the UI, while a `useBooking` hook handles the data fetching and submission.

## O - Open/Closed Principle (OCP)
- Components should be open for extension but closed for modification.
- *Application:* Favor composition over configuration. Instead of passing a massive configuration object or dozens of boolean props (e.g., `isPrimary`, `isDanger`) to a single component, use `children` and layout wrappers to build flexible UI blocks.

## L - Liskov Substitution Principle (LSP)
- Subtypes must be substitutable for their base types.
- *Application:* When creating polymorphic components (like a `Button` that can act as an `<a>` or `<button>`), ensure it accepts all native HTML attributes for that element using `React.ComponentPropsWithoutRef<"button">`.

## I - Interface Segregation Principle (ISP)
- Clients should not be forced to depend on interfaces they do not use.
- *Application:* Do not pass entire objects as props if the component only needs one or two properties. Pass primitives instead. (e.g., `<UserAvatar imageUrl={user.avatar} />` instead of `<UserAvatar user={user} />`).

## D - Dependency Inversion Principle (DIP)
- High-level modules should not depend on low-level modules. Both should depend on abstractions.
- *Application:* Pass functions or hooks as props to decouple components from specific implementations. For example, pass an `onSubmit` handler to a form component rather than hardcoding the API fetch call inside the form itself.