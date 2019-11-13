---
Title: Marking Rubric - Project
Authors: Neil Ernst
---

# Running Total (this will change each milestone):   32.5

NB: for all milestones, basic clean coding style: comments, standardized indentation, lack of code smells, is expected. Your submission and repository should show the following: 
	- Travis CI is being used (M3+)
	- a static analysis tool and linter has been applied (M3+)
	- Typescript project best practices are followed (M3+)

# Milestone 1    7 / 10

## Marking Guide	
- ASRs complete and capture
  - need to persist data
  - need to manage user state and cookies
  - security and privacy
  - usability
  - performance and latency
  - async issues

Marks deducted:
- scenarios seem to have little to no connection with the project (-2)
- poor technical writing  (-2)
- Quality of scenarios (clear analysis of stimulus, response, response measure)

## Notes M1
(explaining why marks were deducted)
-----
- try to keep each QAS to a single quality.  (-1)
- blend of feature and QA in the QAS. (-2)

# Milestone 2   12 / 20

## Marking Guide

- technical writing is clear and concise (key decisions are documented; organization is easy to follow; basic English spelling and writing conventions adhered to)
- design follows basic principles like cohesion/coupling, single responsibility, open/closed
- design addresses QAR from M1
- design provides path for implementing user stories in M1
- design models follow conventions for class and sequence diagrams
- design justifies technology choices
- ADRs (3+) explain why decision was taken, what the context is, and what alternatives were rejected
- ADRs don't capture trivial design decisions

## Notes M2

(explaining why marks were deducted)
-----

- Does not talk about addressing the QARs from M1 (-3)
- Only one user stoty implementation is included in the Sequence diagram. That one is also not complete.  The user needs to get a response from the system after  successfully creating the account (-2)
- No rationale behind the class/modules that implements the ASRs/QAS/User stories (-2)
- The choice of Language and Database as ADR was very trivial (Since they were required for the project) (-1)

# Milestone 3  13.5 / 20

## Marking Guide

- code compiles
- code conventions/CI from above (commented, code style, design principles)
- working demo
- clear explanation of what user stories were satisfied in this iteration
- design as implemented follows design doc, or change rationale is present in README
- async is async when necessary
- TSLint does not complain
- test suite present/part of CI
- test coverage reasonable and meaningful

Marks deducted:

- Did not include test. (-2)
- CI is included but the latest commit does not pass. (-1)
- Linter reports error. (-0.5)
- Asynchronous programming was not implemented where needed. (-1)
- Design was not followed properly. (-2)


## Notes M3

(explaining why marks were deducted)
-----

- There were no test coverage for the user stories.
- The linter complains although it is trivial. (console.log())
- Asynchronous programming was only done to connect to database. The read/write operation could also be implemented Asynchronously.
- The methods are large, model does not do anything. The database connection could be moved somewhere else to avoid having large methods.
- The model does not do anything.

