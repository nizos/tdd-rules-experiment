# Agentic TDD Experiment

An experiment examining the difference between strictly following TDD rules versus developing with a TDD mindset, using Claude Code and TDD-Guard.

## Research Question

Does mechanically following strict TDD rules guarantee high-quality software, or is meaningful design thinking during the "Refactor" phase essential?

## Methodology

- **Enforcer**: TDD-Guard v0.1.2 (violation detector)
- **AI Agent**: Claude Code (Opus 4)
- **Task**: Implement a shopping cart system with TypeScript

The `CLAUDE.md` file intentionally omitted TDD requirements and architectural patterns, providing only functional requirements.
This allowed us to observe what happens when TDD rules are enforced mechanically without design guidance.

Prompt used:

```
Take a look at the README.md and CLAUDE.md and start the development
```

## Key Findings

### What Partially Worked: Test Quality

Despite mechanical enforcement, the tests were reasonable:

- **Behavior-focused** - No heavy mocking or testing of implementation details
- **Well-organized** - Clear scenarios grouped by functionality
- **Good coverage** - 15 passing tests covering implemented features

However, tests alone don't ensure software quality.

### What Failed: Software Quality

The resulting code exhibits poor design:

- **Single class with 120+ lines** - All logic crammed into one Cart class
- **No separation of concerns** - Business logic, calculations, and data mixed together
- **Hard-coded values** - Tax rates and currency conversions embedded in methods
- **No abstractions** - Similar operations (discounts, taxes) repeated inline
- **High coupling** - Cart knows about taxes, currencies, discounts, and validation
- **Poor extensibility** - Adding new tax regions or discount types requires modifying core logic

During the Red-Green-Refactor cycle, the "Refactor" step was essentially skipped. Without explicit design guidance, the agent produced code that works but lacks basic software engineering principles.

### TDD-Guard's Role

TDD-Guard successfully enforced rules:

- Blocked premature implementation
- Required test-first development
- Ensured minimal implementation

But could not encourage design:

- No refactoring prompts
- No code smell detection
- No pattern suggestions

This reveals TDD-Guard as a **violation detector**, not a **design assistant**.

## Analysis: Rules vs Mindset

**Following TDD Rules mechanically produced**:

- Code that passes tests
- Procedural, single-class implementation
- Poor software design quality

**A TDD Mindset requires**:

- System thinking and design awareness
- Active refactoring after each test
- Recognition of code smells
- Continuous architectural improvement

## Conclusions

**The core insight**: Strict TDD rule enforcement ensures correctness but not quality. The gap between "TDD as rules" and "TDD as mindset" is significant.

This experiment demonstrates that even AI agents need explicit guidance on software design principles. Mechanical TDD produces working but poorly designed code. High-quality software requires:

- System thinking beyond individual test cases
- Active design improvement during refactoring
- Recognition of architectural patterns and code smells

## Further Reading

- [Original README](./ORIGINAL_README.md) - The README the agent saw
- [Agent Instructions](./CLAUDE.md) - The shopping cart specifications
- [TDD-Guard Repository](https://github.com/nizos/tdd-guard) - The TDD enforcement tool used
