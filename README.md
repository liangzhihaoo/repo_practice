## What I have done

Built and deployed a full-stack Todo List web application using React, TypeScript, Vite, shadcn/ui, and Supabase. It supports full CRUD operations, user authentication, persistent sessions, protected routes, and user-specific data isolation with Row Level Security. The application is responsive across different screen sizes, supports dark mode, handles loading and error states, and includes a small automated test suite using Vitest and React Testing Library.

## What I have learned

- How to build a React application with TypeScript using Vite as the build tool.

- How to build a clean and responsive user interface with shadcn/ui and Tailwind CSS.

- How to use Supabase for database operations, authentication, session management, and Row Level Security.

- How to write basic component tests using Vitest and React Testing Library.

- Different ways to share data and state through the React component tree, including passing props and using Context to avoid excessive prop drilling.

- How to structure SPA routing with React Router and implement protected routes.

- How to handle asynchronous operations with loading, disabled, and error states so the UI does not pretend an operation succeeded before the server responds.

- How authentication and authorization are different, and how RLS provides the real security boundary for user data.

- How to deploy a React application to production and configure environment variables and SPA routing for the production environment.

## What I am still only beginning to learn

- React and TypeScript: I have moved beyond the very beginner stage and have built a solid foundation through this project. I have used components, props, state, effects, refs, Context, routing, asynchronous operations, and TypeScript types in practice. However, I still have limited experience with more advanced patterns and larger application architecture. I expect to deepen my understanding significantly through future projects.

- Vite: This was my first time using Vite. I now understand how to use it to create, develop, build, and configure a React project, but I have not studied Vite itself in depth. At this stage, I do not think deeper knowledge of Vite is a priority.

- Backend development: I have only had an initial introduction to backend development. I understand some basic concepts and used Supabase to implement database CRUD, authentication, session management, and Row Level Security. However, I have not yet built a traditional backend myself with technologies such as Node.js, Express, and PostgreSQL.

- Vitest and React Testing Library: I have learned and practiced the core workflow of component testing, including rendering components, simulating user interactions, making assertions, and mocking dependencies. However, my testing experience is still limited. I need more practice to become comfortable deciding what should be tested, how much should be mocked, how to organize larger test suites, and how to write integration and end-to-end tests.

## Design decisions I can explain in an interview

- Why I chose shadcn/ui: It is simple to use and gives me direct control over the component code because the components are added to the project instead of being hidden inside an external UI library.

- Why Vitest? The project was built with Vite, so Vitest integrates naturally with the existing Vite and TypeScript setup and requires relatively little additional configuration.

- Why React Testing Library? Vitest provides the test runner, assertions, and mocking capabilities, while React Testing Library provides utilities for rendering React components and testing them through user-visible behavior. I also used user-event to simulate real user interactions such as typing and clicking.

- Why I chose Supabase instead of building a Node.js backend: The goal of this Todo List was to learn the full-stack workflow quickly, including database operations, authentication, authorization, and deployment. I decided to leave building a traditional Node.js backend for future projects.

- Why I used React Context for authentication state: Authentication state is needed by multiple parts of the application, so Context avoids passing the same data through many component levels.

- Why I used Row Level Security: Filtering todos by user_id in the frontend is not a real security boundary. RLS protects the data at the database level and ensures users can only access their own todos.

## Lessons I want to carry into future projects

- Use a better process for learning new technologies: Guided imitation → Controlled modification → Independent repetition → Explanation and transfer. The goal is not to learn everything completely by myself, but to learn efficiently and reach real understanding.

- Start before I feel fully prepared: Read the Getting Started guide and basic examples, then begin building. When I get stuck, ask for help or return to the documentation instead of trying to understand everything in advance.

- Keep the workload sustainable: Consistent progress matters more than short bursts of high intensity. Plans should be challenging enough to make progress, but not so demanding that they make it harder to continue.

- Treat rest as part of the plan: Work on planned workdays and rest on planned rest days. Completing a rest day as planned is also part of maintaining long-term consistency.

- Avoid over-engineering: Start with the smallest version that works, then improve it step by step. Do not optimize or add complexity before there is a clear reason to do so.