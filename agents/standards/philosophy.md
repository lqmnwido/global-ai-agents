# Core Philosophy and Golden Rule

## Core Philosophy

The development harness is not intended to make every repository identical.

It is intended to make the **engineering process predictable**.

Projects may use different:

```text
Languages
Frameworks
Databases
UI frameworks
Infrastructure
Deployment targets
```

But every project should share the same principles:

```text
Understand
Audit
Design
Develop
Validate
Test
Document
Synchronize
Observe
```

The harness therefore standardizes **how engineering decisions are made**, while allowing implementation details to follow the requirements and conventions of each project.

## Golden Rule

Before creating something new, answer:

```text
Does this already exist?

Does the repository already have a pattern for this?

Can an existing component or service be extended?

Will this change introduce a second architecture for the same problem?

Will another developer understand why this was implemented this way?
```

If an existing pattern solves the problem adequately, use it.

Consistency is preferred over novelty.
