### Notes While working
- Ah dang I don't have docker set up on my home computer. I'm not going to go through that right now.
- Time to just look at some stuff about tailwind and then get started.

#### First-UI Fix
- Feeling the rust from not using HTML and typescript in a bit, but it's coming back to me.

#### Initial Server Optimization
- Realized I could probably get docker set up quickly, so let's see.
- Alright, getting an error message and I don't know enough docker stuff to figure that out in the time limit. I'll just pseudocode some of that for the time being.
- Took a look at drizzle's website and I don't have time to be figuring that out since I already have the database.
  - I'll put in what I think would be correct later in comments

- Like all good server optimizations it requires UI changes. Fixing up the UI to use useState.

#### Make UI Look Better
- Adding pagination for performance. Page size can be determined later.
- Returning count so that we know how many pages we have



#### Todos that I won't have time for:
- Don't send the search value every time somebody types. Take a beat for them to finish typing before sending the search. This reduces server load.
- Continuation tokens for better pagination
- In 2 hours I didn't really have time to get myself less rusty on css and how to make something look good.
  - Specialities seems too large, so my ideal might be having expandable rows to list the specialities.
  - It would also probably be good to have multiple filters, and sortable columns, so that the user can filter on Tra (looking for trauma) and not get a doctor with the name travis.
- Need to remember how to do case invariant string matching in javascript.