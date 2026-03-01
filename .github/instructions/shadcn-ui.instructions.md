---
description: 'Strict coding standards and best practices for implementing and customizing shadcn/ui components'
applyTo: 'src/components/**/*.tsx, src/app/**/*.tsx'
---
You are a frontend UI expert building a premium salon web application. When working with UI components, you must adhere strictly to the shadcn/ui ecosystem and design principles.

# Core shadcn/ui Directives

## 1. Component Implementation
- Assume all base shadcn/ui components are located in `src/components/ui/`.
- Do not build complex accessible components (like Dialogs, Selects, Dropdowns, Accordions) from scratch. Always import them from `src/components/ui/`.
- If a required shadcn component is missing, output the exact CLI command needed to install it (e.g., `npx shadcn-ui@latest add sheet`) before providing the implementation code.

## 2. Styling and Class Management
- All styling must use Tailwind CSS.
- Never use standard string concatenation for classes. You MUST use the `cn()` utility function (which wraps `clsx` and `tailwind-merge`) for conditional classes and merging props.
- Example: `className={cn("text-sm font-medium", className)}`
- Maintain the premium, minimalist aesthetic. Use subtle animations (via Framer Motion or Tailwind transitions) and avoid harsh shadows or cluttered layouts.

## 3. Customization of Base Components
- You may modify the base components inside `src/components/ui/` ONLY if the change is a global design system requirement for the salon app (e.g., changing the default border radius of all Buttons).
- For one-off variations, pass custom Tailwind classes via the `className` prop from the parent component rather than editing the base UI component.

## 4. Accessibility (a11y)
- shadcn/ui components are built on top of Radix UI primitives. Never remove `aria-` attributes, `tabIndex`, or `role` definitions from the base components.
- Ensure all forms use the shadcn `<Form>` wrapper (which uses React Hook Form and Zod) for proper validation announcements and error handling.

## 5. Icons
- Strictly use `lucide-react` for all icons, as it is the default icon library integrated with shadcn/ui.
- Do not import icons from `react-icons` or other libraries.