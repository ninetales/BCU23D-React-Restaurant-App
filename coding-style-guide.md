# Folder structure

**Golden Rule: The 10-File Threshold**<br>
To avoid overwhelming clutter, if a folder has more than 10 files, consider restructuring. Group similar files into sub-folders. For instance, if your components folder has a plethora of button variations, they can be nested inside a buttons sub-folder.

**Benefits of this Structure:**<br>

- **Scalability:** Easy to add new features without disturbing existing architecture.
- **Maintainability:** Logical grouping makes it simpler to locate files and understand the app’s flow.
- **Collaboration:** New team members can understand and contribute faster.

**Avoid too much nesting**<br>
There are many pain points associated with deep directory nesting in JavaScript projects. It becomes harder to write relative imports between them, or to update those imports when the files are moved. Unless you have a very compelling reason to use a deep folder structure, consider limiting yourself to a maximum of three or four nested folders within a single project. Of course, this is only a recommendation, and it may not be relevant to your project.

**Don’t overthink it**<br>
If you’re just starting a project, don’t spend more than five minutes on choosing a file structure. Pick any of the above approaches (or come up with your own) and start writing code! You’ll likely want to rethink it anyway after you’ve written some real code.

If you feel completely stuck, start by keeping all files in a single folder. Eventually it will grow large enough that you will want to separate some files from the rest. By that time you’ll have enough knowledge to tell which files you edit together most often. In general, it is a good idea to keep files that often change together close to each other. This principle is called “colocation”.

As projects grow larger, they often use a mix of both of the above approaches in practice. So choosing the “right” one in the beginning isn’t very important.

**References:**<br>

- [A Guide to Organizing Your React Project: The Optimal Folder Structure](https://akshay-p.medium.com/a-guide-to-organizing-your-react-project-the-optimal-folder-structure-130e965a59b2)
- [React File Structure](https://legacy.reactjs.org/docs/faq-structure.html)

# Styling

Follow the [BEM Methodology](https://getbem.com/introduction/).

**BEM Example**

- **Block:** Represents a standalone entity or component on a page. It is a top-level abstraction. .block {}

- **Element:** Represents a component part of a block and is always delimited by two underscores (\_\_). .block\_\_element {}

- **Modifier:** Represents a different state or variation of a block or element. It is always delimited by two hyphens (--). .block--modifier {} .block\_\_element--modifier {}

**Example structure:**

```
<ul class="list">
  <li class="list__item">Item 1</li>
  <li class="list__item list__item--highlighted">Item 2</li>
  <li class="list__item list__item--disabled">Item 3</li>
</ul>
```

**Example using SASS and BEM:**

```
.list {
  list-style: none;
  padding: 0;
  margin: 0;

  &__item {
    padding: 5px 10px;
    border: 1px solid #ccc;
    margin-bottom: 5px;

    &--highlighted {
      background-color: yellow;
    }

    &--disabled {
      color: #999;
      cursor: not-allowed;
    }
  }
}

```

**Example using CSS and BEM:**

```
.list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.list__item {
  padding: 5px 10px;
  border: 1px solid #ccc;
  margin-bottom: 5px;
}

.list__item--highlighted {
  background-color: yellow;
}

.list__item--disabled {
  color: #999;
  cursor: not-allowed;
}

```

# Comments

**Commenting Best Practices:**<br>
Be Clear and Concise: Write comments that are easy to understand and get straight to the point.

- **Use Descriptive Names:** Use meaningful variable, function, and parameter names to reduce the need for comments.

- **Update Comments:** Maintain comments as code evolves. Make sure they accurately reflect the code's functionality.

- **Avoid Over-commenting:** Don't overdo it with comments. Focus on commenting where necessary to explain complex logic or important concepts.

- **Follow Conventions:** Follow a consistent commenting style throughout the codebase to improve readability and maintainability.

By following these guidelines, you can ensure that your JavaScript code is well-documented and easy to understand for both yourself and other developers who may work on the project.

### Examples:

**Single Line Comments:**<br>
Single line comments are used for short explanations or annotations within the code.

```
// This is a single line comment
let x = 5; // Assigning value 5 to variable x
```

**Multi-line Comments:**<br>
Multi-line comments are used for longer explanations, block annotations, or commenting out multiple lines of code.

```
/*
    This is a multi-line comment.
    It can span across multiple lines.
*/
let y = 10;

```

**Function Comments:**<br>
Comments can be used to describe the purpose of a function, its parameters, return values, and any side effects.

```
/**
 * Calculates the sum of two numbers.
 * @param {number} a The first number.
 * @param {number} b The second number.
 * @returns {number} The sum of a and b.
 */
function sum(a, b) {
    return a + b;
}

```

**Inline Comments:**<br>
Inline comments are used to provide additional context or explanations inline with the code.

```
let result = sum(3, 4); // Calling the sum function to add 3 and 4

```

# JavaScript Naming Conventions

**Variables:**

- Use descriptive names that indicate the purpose or content of the variable.
- Start variable names with a lowercase letter.
- Use camelCase for multi-word variable names.

**Example:**

```
let firstName = "John";
let lastName = "Doe";
let age = 30;
```

**Functions:**

- Use descriptive names that explain the action or purpose of the function.
- Start function names with a lowercase letter.
- Use camelCase for multi-word function names.

```
function calculateArea(radius) {
    return Math.PI * radius * radius;
}

function getUserInfo(userId) {
    // Code
}
```

**Classes:**

- Use PascalCase for class names.
- Class names should be nouns and start with an uppercase letter.

```
class Rectangle {
    constructor(width, height) {
        this.width = width;
        this.height = height;
    }

    // Class methods
}
```

**Constructor Functions:**

- Use PascalCase for constructor function names.
- Constructor functions should be used to create objects with a similar structure or behavior.

```
class Person {
    constructor(firstName, lastName) {
        this.firstName = firstName;
        this.lastName = lastName;
    }

    getFullName() {
        return `${this.firstName} ${this.lastName}`;
    }
}

let person1 = new Person("John", "Doe");
let person2 = new Person("Jane", "Smith");

console.log(person1.getFullName()); // Output: John Doe
console.log(person2.getFullName()); // Output: Jane Smith

```

# Commit Message Best Practices

### 1. Prefixes:

Use prefixes to specify the type of change being made. Common prefixes include:

- **feat:** for new features
- **fix:** for bug fixes
- **docs:** for documentation changes
- **style:** for changes that do not affect code functionality (e.g., formatting, whitespace)
- **refactor:** for code refactorings
- **test:** for adding or modifying tests
- **chore:** for changes to build process, CI/CD configuration, or other non-code changes
- **perf:** for performance improvements
- **ci:** for changes to CI/CD pipeline configuration
- **revert** – reverts a previous commit

### 2. Scope:

Optionally, include a scope within parentheses after the prefix to specify the affected component or module. For example: feat(users): add user authentication.

### 3. Short description

Write a brief and straightforward sentence describing the change using present tense.

### 4. Body:

Optionally, provide a more detailed description of the change in the body of the commit message. Use bullet points for multiple changes or additional context.

### 5 Breaking Changes:

If the commit introduces breaking changes, include a section in the body labeled BREAKING CHANGE: followed by a description of the breaking changes and migration instructions if applicable.

**Example**

```
feat(users): add user authentication

- Implement user authentication using JWT tokens
- Add login and registration forms
- Update user model with authentication fields

BREAKING CHANGE: Changes the user model schema to include authentication fields.

```

### General

- Keep commit messages concise and focused on a single change.
- Use the imperative mood (e.g., "add", "fix", "update") in the short description.
- Use the body of the commit message to provide additional context, if needed.
- Follow consistent formatting and style guidelines across the project.

  Adhering to these commit message guidelines helps maintain a clear and informative history of changes, facilitates collaboration among developers.

**References**
[Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/)
