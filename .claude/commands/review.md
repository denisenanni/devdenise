---
description: Trigger a code review on recent changes. Invokes the code-reviewer subagent to analyze modifications.
---

# Review Command

Initiate a comprehensive code review of recent changes.

## Process

1. First, identify what to review:
   ```bash
   git status
   git diff --stat
   ```

2. Invoke the code-reviewer subagent to analyze:
   - Code quality and readability
   - Security concerns
   - Error handling
   - Performance considerations
   - Test coverage

3. The code-reviewer will provide feedback organized by priority:
   - 🔴 Critical (must fix)
   - 🟡 Warning (should fix)
   - 🟢 Suggestions (consider)

Use the code-reviewer subagent for this task. If no recent changes exist, inform the user.
