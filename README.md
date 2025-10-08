# Frontend Developer Intern Interview Task

Welcome to your 45-minute frontend interview! This Next.js application provides a foundation for implementing a user management interface.

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Open http://localhost:3000 in your browser
```

## 📋 Your Task

Implement a **filterable and sortable user list** with the following requirements:

### ⚠️ Bug Fix (Start Here!)

**There's a bug in the SearchInput component** that prevents it from working as a controlled component. Before implementing new features, please:

1. Open `src/components/SearchInput.tsx`
2. Identify and fix the bug (hint: look at how the value prop is being used)
3. Test that the input updates correctly when the parent component changes its value

### Core Features

- **Search functionality**: Filter users by name or email with real-time search
- **Debounced search**: Implement search debouncing (300ms delay) to optimize performance
- **Sorting**: Add clickable column headers to sort by name or role
- **Highlight matches**: Use `<mark>` tags to highlight search matches in the results
- **Accessibility**: Add proper `aria-sort` attributes for screen readers

### Technical Requirements

- Use the provided `User` interface from `src/types/user.ts`
- Load user data from `public/data.json`
- Implement proper TypeScript types
- Use Tailwind CSS for styling (already configured)
- Follow React best practices (hooks, proper state management)

### Bonus Features (if time permits)

- **Role filter dropdown**: Add a dropdown to filter by user role
- **Pagination**: Implement pagination for large datasets
- **Loading states**: Add loading indicators during data operations
- **Error handling**: Handle edge cases and errors gracefully

## 📁 Project Structure

```
src/
├── app/
│   └── page.tsx          # Main page component
├── components/
│   ├── SearchInput.tsx   # Search input component (basic structure provided)
│   └── UserTable.tsx     # User table component (basic structure provided)
└── types/
    └── user.ts           # User interface definition
public/
└── data.json             # Sample user data
```

## 🎯 Evaluation Criteria

You'll be evaluated on the following dimensions:

### Functionality (35%)

- Bug fix completed correctly
- Search filtering works (name and email)
- Debounced search implementation
- Column sorting functionality
- Search result highlighting

### Code Quality (25%)

- TypeScript usage and type safety
- React best practices (hooks, state management)
- Component structure and organization
- Clean, readable code with proper naming

### User Experience (15%)

- Visual design and layout
- Loading states and error handling
- User feedback (empty states, result counts)
- Smooth, responsive interactions

### Problem-Solving & Communication (15%)

- Debugging approach
- Technical decision explanations
- Time management (prioritizing core features)
- Asking clarifying questions

### Bonus (10%)

- Additional features (role filter, pagination)
- Advanced accessibility
- Animations/polish
- Creative solutions

## 💡 Tips for Success

### Time Management (45 minutes total)

1. **Minutes 0-5**: Fix the bug and understand the codebase
2. **Minutes 5-20**: Implement data fetching and basic search
3. **Minutes 20-35**: Add sorting functionality
4. **Minutes 35-40**: Add debouncing and highlighting
5. **Minutes 40-45**: Polish, test, and add bonus features

### Best Practices

- ✅ Start with the bug fix - it's quick and gets you familiar with the code
- ✅ Focus on core functionality before styling
- ✅ Think out loud - explain your thought process
- ✅ Ask questions when requirements are unclear
- ✅ Test your implementation as you go
- ✅ Handle edge cases (empty search, no results, etc.)
- ❌ Don't spend too much time on styling details
- ❌ Don't implement bonus features before core requirements
- ❌ Don't stay silent - communicate your thinking

### Common Pitfalls to Avoid

- Forgetting to make the SearchInput a controlled component
- Not implementing debouncing (causes performance issues)
- Forgetting to add keys to mapped elements
- Not handling loading/error states
- Poor time management (running out of time before completing core features)

## 📝 Interview Notes

- You'll be sharing your screen and coding live
- This is a collaborative exercise - we're here to help!
- Feel free to use Google, documentation, or any resources
- No need to push changes to version control
- It's okay if you don't finish everything - we want to see your approach
- Communication is just as important as code

## 🚀 Getting Unstuck

If you're stuck on something:

1. **Read the error message** carefully - it often tells you exactly what's wrong
2. **Check the browser console** for errors and warnings
3. **Review the TypeScript types** - they guide you on what props/data to use
4. **Look at the TODOs** in the code - they provide hints
5. **Ask your interviewer** - we're here to help!

## 📚 Helpful Resources

You're free to reference any documentation during the interview:

- [React Hooks Documentation](https://react.dev/reference/react)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [MDN Web Docs](https://developer.mozilla.org/)

Good luck! 🍀
