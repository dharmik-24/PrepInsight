const QUESTION_BANK = [
  // ─── Aptitude ───────────────────────────────────────────
  {
    questionText: "Rishi and Swathi are students of Class 5. Pavan and Tanvi are students of Class 4. Rishi and Pavan are boys. Swathi and Tanvi are girls. The four students played a total of three games of chess. The games were played one after another. A player who lost a game did not participate in any more games. It was observed that: the first game was the only game where two students of the same class played against each other, the students of Class 5 won more games than the students of Class 4 and the boys won two games and the girls won one game. The student who did not lose any game is ____.",
    type: "mcq",
    options: ["Pavan", "Rishi", "Swathi", "Tanvi"],
    correctAnswer: "Rishi",
    explanation: "Since losers are eliminated after each game, exactly one player remains undefeated after three games. Class 5 wins more games (2 out of 3), and boys win 2 games. Rishi (Class 5, boy) fits both winning majority constraints and can remain undefeated through all rounds.",
    subject: "Aptitude",
    topic: "Logical Reasoning",
    difficulty: "medium",
    marks: 2,
    negativeMarks: 0.66
  },
  {
    questionText: "The product of the digits of a three-digit number is 70. The sum of the digits of this three-digit number is ____.",
    type: "mcq",
    options: ["12", "14", "16", "18"],
    correctAnswer: "14",
    explanation: "70 = 2 x 5 x 7. The only possible digits are 2, 5, and 7. Their sum is 2 + 5 + 7 = 14.",
    subject: "Aptitude",
    topic: "Numerical Ability",
    difficulty: "easy",
    marks: 1,
    negativeMarks: 0.33
  },

 
{
  questionText: "Let p, q and r be propositions. Which of the following is logically equivalent to (p → q) ∧ (q → r)?",
  type: "mcq",
  options: ["p → r", "(p ∧ q) → r", "p → (q ∧ r)", "(p → r) ∧ (q → r)"],
  correctAnswer: "p → r",
  explanation: "Using transitivity of implication: if p → q and q → r, then p → r.",
  subject: "Aptitude",
  topic: "Propositional Logic",
  difficulty: "medium",
  marks: 2,
  negativeMarks: 0.66
},
{
  questionText: "A function f(n) satisfies f(n) = f(n-1) + 2n - 1 with f(1) = 1. What is f(n)?",
  type: "mcq",
  options: ["n", "n²", "2n", "n(n+1)"],
  correctAnswer: "n²",
  explanation: "This recurrence expands to sum of first n odd numbers = n².",
  subject: "Aptitude",
  topic: "Mathematical Reasoning",
  difficulty: "medium",
  marks: 2,
  negativeMarks: 0.66
},
{
  questionText: "If the ratio of incomes of A and B is 3:2 and their expenditures are in the ratio 5:3, what is the ratio of their savings?",
  type: "mcq",
  options: ["1:1", "2:1", "3:1", "4:1"],
  correctAnswer: "1:1",
  explanation: "Let incomes be 3x and 2x, expenditures 5y and 3y. Equating proportions leads to equal savings.",
  subject: "Aptitude",
  topic: "Ratio & Proportion",
  difficulty: "hard",
  marks: 2,
  negativeMarks: 0.66
},
// ─── Aptitude (Very Hard Level) ───────────────────────────────────────────
{
  questionText: "Let a, b, c be positive real numbers such that abc = 1. What is the minimum value of (1/a) + (1/b) + (1/c)?",
  type: "mcq",
  options: ["1", "3", "√3", "2"],
  correctAnswer: "3",
  explanation: "Using AM-GM inequality: (1/a + 1/b + 1/c)/3 ≥ (1/abc)^(1/3) = 1 ⇒ minimum = 3.",
  subject: "Aptitude",
  topic: "Inequalities",
  difficulty: "hard",
  marks: 2,
  negativeMarks: 0.66
},
{
  questionText: "A man starts at point (0,0) and moves either right or up by 1 unit at each step. How many distinct paths exist to reach (4,3) such that he never crosses above the line y = x?",
  type: "mcq",
  options: ["35", "14", "28", "42"],
  correctAnswer: "14",
  explanation: "This is a constrained lattice path problem (Catalan-type). Number of valid paths = C(7,3) - C(7,2) = 35 - 21 = 14.",
  subject: "Aptitude",
  topic: "Combinatorics",
  difficulty: "hard",
  marks: 1,
  negativeMarks: 0.33
},

{
  questionText: "Let S be the set of all real numbers x such that |x² - 5x + 6| ≤ 2. What is the number of integer values in S?",
  type: "mcq",
  options: ["3", "4", "5", "6"],
  correctAnswer: "5",
  explanation: "Solve |(x-2)(x-3)| ≤ 2 ⇒ expand and solve inequalities: -2 ≤ x² - 5x + 6 ≤ 2. This gives interval [1,4]. Integers: 1,2,3,4 → plus check endpoints → total 5 integers.",
  subject: "Aptitude",
  topic: "Algebra & Inequalities",
  difficulty: "hard",
  marks: 1,
  negativeMarks: 0.33
},


{
  questionText: "Let f(x) = |x - 2| + |x + 3|. What is the minimum value of f(x)?",
  type: "mcq",
  options: ["3", "4", "5", "6"],
  correctAnswer: "5",
  explanation: "The sum of distances from x to 2 and -3 is minimized when x lies between them. Minimum value = distance between 2 and -3 = 5.",
  subject: "Aptitude",
  topic: "Functions & Modulus",
  difficulty: "hard",
  marks: 1,
  negativeMarks: 0.33
},
{
  questionText: "A fair six-sided die is rolled three times. What is the probability that the sum of outcomes is exactly 10?",
  type: "mcq",
  options: ["1/8", "1/12", "1/6", "5/36"],
  correctAnswer: "1/8",
  explanation: "Total outcomes = 6^3 = 216. Favorable outcomes for sum = 10 are 27. Probability = 27/216 = 1/8.",
  subject: "Aptitude",
  topic: "Probability",
  difficulty: "hard",
  marks: 1,
  negativeMarks: 0.33
},

  // ─── C Programming ───────────────────────────────────────────
  {
    questionText: "Consider the following pseudo code. What is the total number of multiplications to be performed?\nD = 2\nfor i = 1 to n do\n  for j = i to n do\n    for k = j + 1 to n do\n      D = D * 3",
    type: "mcq",
    options: [
      "Half of the product of the 3 consecutive integers",
      "One-third of the product of the 3 consecutive integers",
      "One-sixth of the product of the 3 consecutive integers",
      "None of the above"
    ],
    correctAnswer: "One-sixth of the product of the 3 consecutive integers",
    explanation: "Number of iterations = number of triplets (i < j < k) = n(n-1)(n-2)/6.",
    subject: "C Programming",
    topic: "Time Complexity",
    difficulty: "medium",
    marks: 2,
    negativeMarks: 0.66
  },

  {
    questionText: "Which of the following decision problems is undecidable?",
    type: "mcq",
    options: [
      "Given two Turing machines M1 and M2, check whether L(M1) = L(M2)",
      "Check whether a regular language is empty",
      "Check whether a DFA accepts a given string",
      "Check whether a CFG generates a given string"
    ],
    correctAnswer: "Given two Turing machines M1 and M2, check whether L(M1) = L(M2)",
    explanation: "Language equivalence of Turing machines is undecidable.",
    subject: "TOC",
    topic: "Undecidability",
    difficulty: "hard",
    marks: 2,
    negativeMarks: 0.66
  },


  
  
  

  // ─── Data Structures ───────────────────────────────────────────
  {
    questionText: "An articulation point in a connected graph is a vertex such that removing the vertex disconnects the graph. Let T be a DFS tree of a connected undirected graph G. Which of the following options is/are correct?",
    type: "msq",
    options: [
      "Root of T is an articulation point iff it has 2 or more children",
      "A leaf of T can be an articulation point",
      "Root of T can never be an articulation point",
      "If u is an articulation point, then all paths from ancestor x to descendant y pass through u"
    ],
    correctAnswer: [
      "Root of T is an articulation point iff it has 2 or more children",
      "If u is an articulation point, then all paths from ancestor x to descendant y pass through u"
    ],
    explanation: "Standard articulation point properties in DFS tree.",
    subject: "Data Structures",
    topic: "Graphs",
    difficulty: "hard",
    marks: 2,
    negativeMarks: 0
  },

  {
    questionText: "A permutation of {1,2,...,n}, n≥4 is chosen. X: 1 appears before 2, Y: 3 appears before 4. Which statement is TRUE?",
    type: "mcq",
    options: [
      "X more likely than Y",
      "X and Y are independent",
      "Either X or Y must occur",
      "X and Y are mutually exclusive"
    ],
    correctAnswer: "X and Y are independent",
    explanation: "Each has probability 1/2 and are independent events.",
    subject: "Engineering Mathematics",
    topic: "Probability",
    difficulty: "medium",
    marks: 2,
    negativeMarks: 0.66
  },
  
  
  
  
  // ─── Engineering Mathematics / Probability ─────────────────────
  {
    questionText: "Let A and B be two events with P(A)=0.3, P(B)=0.5, and P(A ∩ B)=0.1. Which of the following statements is/are TRUE?",
    type: "msq",
    options: [
      "P(A ∩ B^c) = 0.2",
      "A and B are independent",
      "P(A U B) = 0.7",
      "P(A^c ∩ B^c) = 0.4"
    ],
    correctAnswer: ["P(A ∩ B^c) = 0.2", "P(A^c ∩ B^c) = 0.4"],
    explanation: "P(A∩B^c)=P(A)-P(A∩B)=0.2; independence fails since 0.3x0.5≠0.1; union=0.7; complement intersection=0.4.",
    subject: "Engineering Mathematics",
    topic: "Probability",
    difficulty: "medium",
    marks: 2,
    negativeMarks: 0
  },
  
  
  

  // ─── Discrete Mathematics ─────────────────────
  {
    questionText: "Chromatic number vs clique/independent set properties. Which are TRUE?",
    type: "msq",
    options: [
      "Contains clique of k vertices",
      "Independent set ≥ n/k",
      "Vertex of degree ≥ k",
      "Edges ≥ k(k-1)/2"
    ],
    correctAnswer: ["Independent set ≥ n/k"],
    explanation: "Only guaranteed property.",
    subject: "Discrete Mathematics",
    topic: "Graph Theory",
    difficulty: "hard",
    marks: 2,
    negativeMarks: 0
  },

  {
    questionText: "Let SLLdel be a function that deletes a node in a singly-linked list given a pointer to the node and a pointer to the head. Let DLLdel be similar for doubly-linked list. What is the worst-case time complexity?",
    type: "mcq",
    options: [
      "SLLdel is O(1) and DLLdel is O(n)",
      "Both are O(log n)",
      "Both are O(1)",
      "SLLdel is O(n) and DLLdel is O(1)"
    ],
    correctAnswer: "SLLdel is O(n) and DLLdel is O(1)",
    explanation: "SLL requires traversal to find previous node; DLL has direct access.",
    subject: "Data Structures",
    topic: "Linked List",
    difficulty: "easy",
    marks: 1,
    negativeMarks: 0.33
  },


  

  {
    questionText: "Consider the following function:\ndouble f(double x) {\n  if (abs(x*x - 3) < 0.01) return x;\n  else return f(x/2 + 1.5/x);\n}\nGive a value q (to 2 decimals) such that f(q) will return q.",
    type: "nat",
    options: [],
    correctAnswer: "1.73",
    explanation: "Function converges to √3 ≈ 1.732.",
    subject: "C Programming",
    topic: "Recursion & Convergence",
    difficulty: "hard",
    marks: 2,
    negativeMarks: 0
  },

  {
    questionText: "Minterm list given. Number of essential prime implicants?",
    type: "nat",
    options: [],
    correctAnswer: "3",
    explanation: "K-map simplification.",
    subject: "Digital Logic",
    topic: "K-Map",
    difficulty: "hard",
    marks: 2,
    negativeMarks: 0
  },

  {
    questionText: "Let f(x)=max(x,x³). Points where f is NOT differentiable?",
    type: "mcq",
    options: ["{0,1}", "{-1,1,2}", "{-2,-1,1}", "{-1,0,1}"],
    correctAnswer: "{-1,0,1}",
    explanation: "Non-differentiability where x=x³ ⇒ x∈{-1,0,1}.",
    subject: "Engineering Mathematics",
    topic: "Calculus",
    difficulty: "medium",
    marks: 1,
    negativeMarks: 0.33
  },


  
  
  {
    questionText: "Which statements are TRUE for a group G?",
    type: "msq",
    options: [
      "(xy)^2=x²y² ⇒ commutative",
      "x²=1 ∀x ⇒ commutative",
      "|G|=2 ⇒ commutative",
      "Subgroup of commutative group not commutative"
    ],
    correctAnswer: [
      "(xy)^2=x²y² ⇒ commutative",
      "|G|=2 ⇒ commutative"
    ],
    explanation: "Standard group properties.",
    subject: "Discrete Mathematics",
    topic: "Group Theory",
    difficulty: "hard",
    marks: 2,
    negativeMarks: 0
  },

  // ─── Digital Logic ─────────────────────
  {
    questionText: "Simplified SOP of given Boolean expression?",
    type: "mcq",
    options: ["(P+Q̄+R̄)", "(P+Q̄R̄)", "(P̄Q+R)", "(PQ+R)"],
    correctAnswer: "(P+Q̄+R̄)",
    explanation: "Simplification via Boolean algebra.",
    subject: "Digital Logic",
    topic: "Boolean Algebra",
    difficulty: "medium",
    marks: 2,
    negativeMarks: 0.66
  },
  

  {
    questionText: "Consider the function:\nint func(int num)\n{\n  int count = 0;\n  while (num)\n  {\n    count++;\n    num >>= 1;\n  }\n  return count;\n}\nThe value returned by function(435) is ____.",
    type: "nat",
    options: [],
    correctAnswer: "9",
    explanation: "Counts number of bits required to represent 435 in binary. 435 ≈ 2^8, so total bits = 9.",
    subject: "C Programming",
    topic: "Bit Manipulation",
    difficulty: "easy",
    marks: 1,
    negativeMarks: 0
  },


  
  

  // ─── Algorithms / Complexity ─────────────────────
  {
    questionText: "f(n)=n, g(n)=n². Which is TRUE?",
    type: "mcq",
    options: ["f∈O(g)", "f∈Ω(g)", "f∈o(g)", "f∈Θ(g)"],
    correctAnswer: "f∈o(g)",
    explanation: "n grows slower than n².",
    subject: "Algorithms",
    topic: "Asymptotic Analysis",
    difficulty: "easy",
    marks: 1,
    negativeMarks: 0.33
  },

  {
    questionText: "Two eigenvalues of a 3x3 matrix are (2+i) and 3. Determinant is ____.",
    type: "nat",
    options: [],
    correctAnswer: "15",
    explanation: "Eigenvalues occur in conjugates → third = (2-i). Product = (2+i)(2-i)*3 = 5*3 = 15.",
    subject: "Engineering Mathematics",
    topic: "Linear Algebra",
    difficulty: "medium",
    marks: 1,
    negativeMarks: 0
  },


  

  {
    questionText: "(¬p ⇒ ¬q) equivalent to?",
    type: "mcq",
    options: ["p⇒q", "q⇒p", "(¬q)∨p", "(¬p)∨q"],
    correctAnswer: "q⇒p",
    explanation: "Contrapositive.",
    subject: "Discrete Mathematics",
    topic: "Logic",
    difficulty: "easy",
    marks: 1,
    negativeMarks: 0.33
  },

  {
    questionText: "Graph weight properties question (even weights). Which TRUE?",
    type: "msq",
    options: [
      "All edges even",
      "All cycles even",
      "All edges odd",
      "Cycle parity property"
    ],
    correctAnswer: ["All cycles even"],
    explanation: "Cycle parity property holds.",
    subject: "Algorithms",
    topic: "Graph Theory",
    difficulty: "hard",
    marks: 2,
    negativeMarks: 0
  },
  
  {
    questionText: "Finding Max element in min-heap complexity takes?",
    type: "mcq",
    options: ["Θ(log n)", "Θ(1)", "Θ(n log n)", "Θ(n)"],
    correctAnswer: "Θ(n)",
    explanation: "Must scan leaves.",
    subject: "Data Structures",
    topic: "Heap",
    difficulty: "medium",
    marks: 2,
    negativeMarks: 0.66
  },

  
  {
    questionText: "Given the basic ER and relational models, which of the following is INCORRECT?",
    type: "mcq",
    options: [
      "An attribute of an entity can have more than one value",
      "An attribute of an entity can be composite",
      "In a row of a relational table, an attribute can have more than one value",
      "In a row of a relational table, an attribute can have exactly one value or a NULL value"
    ],
    correctAnswer: "In a row of a relational table, an attribute can have more than one value",
    explanation: "Relational model requires atomic values.",
    subject: "DBMS",
    topic: "ER Model",
    difficulty: "easy",
    marks: 1,
    negativeMarks: 0.33
  },
  

  {
    questionText: "Relation R: aRb iff a,b share divisor >1. Which is TRUE?",
    type: "mcq",
    options: [
      "Symmetric & reflexive not transitive",
      "Reflexive but not symmetric",
      "Transitive only",
      "Symmetric only"
    ],
    correctAnswer: "Symmetric & reflexive not transitive",
    explanation: "Symmetric & reflexive, fails transitivity.",
    subject: "Discrete Mathematics",
    topic: "Relations",
    difficulty: "medium",
    marks: 1,
    negativeMarks: 0.33
  },

  {
    questionText: "Sorting is stable if?",
    type: "mcq",
    options: [
      "O(nlogn)",
      "Maintains relative order",
      "Divide & conquer",
      "O(n) space"
    ],
    correctAnswer: "Maintains relative order",
    explanation: "Definition of stability.",
    subject: "Algorithms",
    topic: "Sorting",
    difficulty: "easy",
    marks: 1,
    negativeMarks: 0.33
  },


  
  {
    questionText: "Consider a selection σA≤100(r), where r has 1000 tuples and A is uniformly distributed in [0,500]. Estimate number of tuples returned.",
    type: "mcq",
    options: ["50", "100", "150", "200"],
    correctAnswer: "200",
    explanation: "Selectivity = 100/500 = 1/5 → 1000x1/5 = 200.",
    subject: "DBMS",
    topic: "Query Optimization",
    difficulty: "medium",
    marks: 2,
    negativeMarks: 0.66
  },

  {
    questionText: "Which of the following statements about LALR parsers is TRUE?",
    type: "mcq",
    options: [
      "LALR parsers can remove all reduce-reduce conflicts",
      "Symbol table construction happens only during lexical analysis",
      "Data flow analysis is needed at runtime",
      "LALR parsers cannot remove all reduce-reduce conflicts"
    ],
    correctAnswer: "LALR parsers cannot remove all reduce-reduce conflicts",
    explanation: "LALR reduces states but may retain some conflicts.",
    subject: "Compiler Design",
    topic: "Parsing",
    difficulty: "hard",
    marks: 1,
    negativeMarks: 0.33
  },

  
  {
    questionText: "Given schedule S of transactions T1, T2, T3. Let P: S is conflict-serializable. Q: If T3 commits before T1 finishes, S is recoverable. Which is correct?",
    type: "mcq",
    options: [
      "P true, Q false",
      "Both false",
      "Both true",
      "P false, Q true"
    ],
    correctAnswer: "Both true",
    explanation: "Precedence graph acyclic and recoverable.",
    subject: "DBMS",
    topic: "Transactions",
    difficulty: "hard",
    marks: 2,
    negativeMarks: 0.66
  },
  {
    questionText: "Which of the following statements are correct in CPU scheduling?",
    type: "msq",
    options: [
      "Maximize CPU utilization and minimize throughput",
      "Turnaround time includes waiting time",
      "Round robin works without known execution time",
      "Preemptive scheduling needs hardware support"
    ],
    correctAnswer: [
      "Turnaround time includes waiting time",
      "Round robin works without known execution time",
      "Preemptive scheduling needs hardware support"
    ],
    explanation: "Only throughput statement is incorrect.",
    subject: "Operating Systems",
    topic: "Scheduling",
    difficulty: "medium",
    marks: 2,
    negativeMarks: 0
  },
  

  {
    questionText: "4-bit Johnson counter sequence?",
    type: "mcq",
    options: [
      "0,1,3,7,15,14,12,8,0",
      "0,1,3,5,7,9,11,13,15,0",
      "0,2,4,6,8,10,12,14,0",
      "0,8,12,14,15,7,3,1,0"
    ],
    correctAnswer: "0,1,3,7,15,14,12,8,0",
    explanation: "Standard Johnson counter sequence.",
    subject: "Digital Logic",
    topic: "Counters",
    difficulty: "medium",
    marks: 1,
    negativeMarks: 0.33
  },


  {
    questionText: "Which of the following is NOT a valid deadlock prevention scheme?",
    type: "mcq",
    options: [
      "Release all resources before requesting new",
      "Number resources and request in order",
      "Never request after releasing resource",
      "Allocate all resources before execution"
    ],
    correctAnswer: "Never request after releasing resource",
    explanation: "Does not break circular wait condition.",
    subject: "Operating Systems",
    topic: "Deadlocks",
    difficulty: "medium",
    marks: 2,
    negativeMarks: 0.66
  },

  {
    questionText: "SELECT operation in SQL is equivalent to which of the following?",
    type: "mcq",
    options: [
      "Selection in relational algebra",
      "Selection except duplicates",
      "Projection in relational algebra",
      "Projection except duplicates"
    ],
    correctAnswer: "Projection except duplicates",
    explanation: "SELECT corresponds to projection; SQL retains duplicates unless DISTINCT.",
    subject: "DBMS",
    topic: "Relational Algebra",
    difficulty: "medium",
    marks: 1,
    negativeMarks: 0.33
  },

  
  {
    questionText: "Consider a memory management system with a page size of 2 KB. Both physical and virtual addresses start from 0. Pages 0, 1, 2, and 3 are stored in frames 1, 3, 2, and 0 respectively. What is the physical address corresponding to virtual address 2500?",
    type: "nat",
    options: [],
    correctAnswer: "4500",
    explanation: "Page size = 2048. Page number = 1, offset = 452. Frame = 3 → physical address = 3×2048 + 452 = 4500.",
    subject: "Operating Systems",
    topic: "Paging",
    difficulty: "hard",
    marks: 2,
    negativeMarks: 0
  },

  {
    questionText: "Let the set of functional dependencies F = {QP → S, P → R, S → Q} hold on relation X = (PQRS). X is not in BCNF. Suppose X is decomposed into two schemas Y = (PR) and Z = (QRS). Consider the statements: I. Both Y and Z are in BCNF. II. Decomposition is dependency preserving and lossless. Which of the following is correct?",
    type: "mcq",
    options: ["I only", "Neither I nor II", "Both I and II", "II only"],
    correctAnswer: "Both I and II",
    explanation: "Both BCNF and dependency preservation conditions hold.",
    subject: "DBMS",
    topic: "Normalization",
    difficulty: "hard",
    marks: 2,
    negativeMarks: 0.66
  },

  {
    questionText: "A file system uses 8 direct blocks, 1 indirect block, and 1 doubly indirect block. Block size is 128 bytes and address size is 8 bytes. What is the maximum possible file size?",
    type: "mcq",
    options: ["3 KB", "35 KB", "280 KB", "Depends on disk size"],
    correctAnswer: "280 KB",
    explanation: "Indirect addressing calculation leads to 280 KB.",
    subject: "Operating Systems",
    topic: "File Systems",
    difficulty: "hard",
    marks: 2,
    negativeMarks: 0.66
  },
  {
    questionText: "A processor has 64 registers and 16-bit instruction format. I-type has opcode, register, and 4-bit immediate. R-type has opcode and two registers. If there are 8 I-type opcodes, what is maximum number of R-type opcodes?",
    type: "nat",
    options: [],
    correctAnswer: "16",
    explanation: "Remaining opcode bits define R-type instructions.",
    subject: "COA",
    topic: "Instruction Format",
    difficulty: "medium",
    marks: 2,
    negativeMarks: 0
  },

  {
    questionText: "Which one of the following hash functions on integers will distribute keys most uniformly over 10 buckets numbered 0 to 9 for i ranging from 0 to 2020?",
    type: "mcq",
    options: [
      "h(i) = i² mod 10",
      "h(i) = i³ mod 10",
      "h(i) = (11 * i²) mod 10",
      "h(i) = (12 * i) mod 10"
    ],
    correctAnswer: "h(i) = (12 * i) mod 10",
    explanation: "Linear hashing with coefficient coprime to 10 distributes uniformly.",
    subject: "Data Structures",
    topic: "Hashing",
    difficulty: "medium",
    marks: 2,
    negativeMarks: 0.66
  },


  {
    questionText: "A CPU handles an interrupt by executing an interrupt service routine. When does it check for interrupts?",
    type: "mcq",
    options: [
      "As soon as interrupt is raised",
      "At end of fetch cycle",
      "After execution of current instruction",
      "At fixed intervals"
    ],
    correctAnswer: "After execution of current instruction",
    explanation: "Interrupts are handled after completing current instruction.",
    subject: "COA",
    topic: "Interrupts",
    difficulty: "easy",
    marks: 1,
    negativeMarks: 0.33
  },
  
  
  
  {
    questionText: "Station A uses 32 byte packets with sliding window protocol. RTT = 80 ms, bandwidth = 128 kbps. What is optimal window size?",
    type: "mcq",
    options: ["20", "40", "160", "320"],
    correctAnswer: "40",
    explanation: "Window size = bandwidth x RTT / packet size.",
    subject: "Computer Networks",
    topic: "Flow Control",
    difficulty: "medium",
    marks: 2,
    negativeMarks: 0.66
  },

  {
    questionText: "Suppose a processor does not have any stack pointer register. Which statement is true?",
    type: "mcq",
    options: [
      "No subroutine calls possible",
      "Subroutine calls but no nesting",
      "Nested calls but no interrupts",
      "All sequences of calls and interrupts possible"
    ],
    correctAnswer: "All sequences of calls and interrupts possible",
    explanation: "Stack can be implemented in memory.",
    subject: "Operating Systems",
    topic: "CPU Architecture",
    difficulty: "medium",
    marks: 1,
    negativeMarks: 0.33
  },

  
  {
    questionText: "Which of the following statements about a bridge in a computer network is FALSE?",
    type: "mcq",
    options: [
      "A bridge operates at the data link layer",
      "A bridge reduces collision domain",
      "A bridge connects LAN segments",
      "A bridge reduces broadcast domain"
    ],
    correctAnswer: "A bridge reduces broadcast domain",
    explanation: "Bridges do not reduce broadcast domains; routers do.",
    subject: "Computer Networks",
    topic: "Network Devices",
    difficulty: "easy",
    marks: 2,
    negativeMarks: 0.66
  },

  {
    questionText: "Consider a 5-stage pipeline (IF, ID, EX, MEM, WB). Which statements about forwarding are correct?",
    type: "msq",
    options: [
      "No extra hardware needed",
      "Result passed from earlier to later stage",
      "MEM output can go to EX input",
      "Forwarding cannot eliminate all stalls"
    ],
    correctAnswer: [
      "Result passed from earlier to later stage",
      "MEM output can go to EX input",
      "Forwarding cannot eliminate all stalls"
    ],
    explanation: "Forwarding reduces but cannot eliminate all hazards.",
    subject: "COA",
    topic: "Pipelining",
    difficulty: "medium",
    marks: 1,
    negativeMarks: 0
  },
  
  {
    questionText: "Which of the following is the correct sequence of system calls used by a server using TCP sockets?",
    type: "mcq",
    options: [
      "listen → accept → bind → recv",
      "bind → listen → accept → recv",
      "bind → accept → listen → recv",
      "accept → listen → bind → recv"
    ],
    correctAnswer: "bind → listen → accept → recv",
    explanation: "Correct order: bind → listen → accept → recv.",
    subject: "Computer Networks",
    topic: "Sockets",
    difficulty: "easy",
    marks: 1,
    negativeMarks: 0.33
  },
  {
    questionText: "Which field in the IP header is modified by NAT (Network Address Translation)?",
    type: "mcq",
    options: ["Total Length", "Source IP Address", "Destination IP Address", "Checksum"],
    correctAnswer: "Source IP Address",
    explanation: "NAT modifies source IP (and possibly port).",
    subject: "Computer Networks",
    topic: "NAT",
    difficulty: "easy",
    marks: 1,
    negativeMarks: 0.33
  },
  {
    questionText: "Keywords in a programming language are recognized during which phase of compilation?",
    type: "mcq",
    options: [
      "Parsing",
      "Code generation",
      "Lexical analysis",
      "Data flow analysis"
    ],
    correctAnswer: "Lexical analysis",
    explanation: "Lexical analyzer identifies tokens including keywords.",
    subject: "Compiler Design",
    topic: "Lexical Analysis",
    difficulty: "easy",
    marks: 1,
    negativeMarks: 0.33
  },

  {
    questionText: "Which technique facilitates transfer of bulk data from disk to main memory with highest throughput?",
    type: "mcq",
    options: [
      "DMA",
      "Interrupt-driven I/O",
      "Polling",
      "Programmed I/O"
    ],
    correctAnswer: "DMA",
    explanation: "DMA avoids CPU intervention and gives highest throughput.",
    subject: "COA",
    topic: "I/O",
    difficulty: "easy",
    marks: 1,
    negativeMarks: 0.33
  },
  
  {
    questionText: "Which of the following statements about syntax-directed definitions (SDD) is FALSE?",
    type: "mcq",
    options: [
      "L-attributed SDDs can be evaluated in a single left-to-right traversal",
      "SDDs can be used without side effects",
      "All LR-attributed SDDs can be evaluated bottom-up",
      "Synthesized attributes can be evaluated bottom-up"
    ],
    correctAnswer: "All LR-attributed SDDs can be evaluated bottom-up",
    explanation: "Not all LR-attributed SDDs can be evaluated purely bottom-up.",
    subject: "Compiler Design",
    topic: "Syntax Directed Translation",
    difficulty: "medium",
    marks: 1,
    negativeMarks: 0.33
  },
  {
    questionText: "Consider an NFA with n states. What is the maximum number of states in the equivalent minimal DFA?",
    type: "mcq",
    options: ["k ≥ n", "k ≤ 2^n", "k ≥ 2^n", "k ≤ n"],
    correctAnswer: "k ≤ 2^n",
    explanation: "Subset construction gives at most 2^n states.",
    subject: "TOC",
    topic: "Automata",
    difficulty: "medium",
    marks: 1,
    negativeMarks: 0.33
  },

  {
    questionText: "A 4-way set associative cache has 128 lines and line size of 64 words. Address is 20-bit. How many bits are used for TAG, SET, WORD?",
    type: "mcq",
    options: ["9,6,5", "7,7,6", "7,5,8", "9,5,6"],
    correctAnswer: "9,5,6",
    explanation: "Break address into tag, set index, and word offset.",
    subject: "COA",
    topic: "Cache",
    difficulty: "hard",
    marks: 2,
    negativeMarks: 0.66
  },

  
  {
    questionText: "Which of the following statements is TRUE regarding closure properties of regular languages?",
    type: "mcq",
    options: [
      "Regular languages are not closed under union",
      "Regular languages are closed under intersection",
      "Regular languages are not closed under concatenation",
      "Regular languages are not closed under Kleene star"
    ],
    correctAnswer: "Regular languages are closed under intersection",
    explanation: "Regular languages are closed under union, intersection, concatenation, and Kleene star.",
    subject: "TOC",
    topic: "Regular Languages",
    difficulty: "medium",
    marks: 2,
    negativeMarks: 0.66
  },

  {
    questionText: "Which of the following protocols is NOT used for address resolution?",
    type: "mcq",
    options: ["DNS", "ARP", "DHCP", "RARP"],
    correctAnswer: "DHCP",
    explanation: "DHCP assigns IP addresses, not resolve them.",
    subject: "Computer Networks",
    topic: "Protocols",
    difficulty: "easy",
    marks: 1,
    negativeMarks: 0.33
  },

  {
    questionText: "Which of the following statements is FALSE regarding computational models?",
    type: "mcq",
    options: [
      "Every NFA has an equivalent DFA",
      "Every nondeterministic Turing machine has an equivalent deterministic Turing machine",
      "Every recursive language is recursively enumerable",
      "Every subset of a recursively enumerable language is recursive"
    ],
    correctAnswer: "Every subset of a recursively enumerable language is recursive",
    explanation: "A subset of a recursively enumerable language need not be recursive.",
    subject: "TOC",
    topic: "Computability",
    difficulty: "hard",
    marks: 2,
    negativeMarks: 0.66
  },

  {
    questionText: "Carry lookahead adder time complexity?",
    type: "mcq",
    options: ["Θ(1)", "Θ(log n)", "Θ(√n)", "Θ(n)"],
    correctAnswer: "Θ(log n)",
    explanation: "Carry propagation via tree structure.",
    subject: "Digital Logic",
    topic: "Adder Circuits",
    difficulty: "medium",
    marks: 2,
    negativeMarks: 0.66
  },

  {
    questionText: "Max possible weight of MST?",
    type: "nat",
    options: [],
    correctAnswer: "12",
    explanation: "Choose largest edges without cycle.",
    subject: "Algorithms",
    topic: "MST",
    difficulty: "hard",
    marks: 2,
    negativeMarks: 0
  },


  {
    questionText: "Which of the following statements about language closure properties is/are correct?",
    type: "msq",
    options: [
      "Regular ∩ Regular = Regular",
      "CFL ∩ CFL = CFL",
      "Recursive ∩ Recursive = Recursive",
      "RE ∩ RE = RE"
    ],
    correctAnswer: [
      "Regular ∩ Regular = Regular",
      "Recursive ∩ Recursive = Recursive",
      "RE ∩ RE = RE"
    ],
    explanation: "Context-free languages are not closed under intersection.",
    subject: "TOC",
    topic: "Closure Properties",
    difficulty: "hard",
    marks: 1,
    negativeMarks: 0
  },

  {
    questionText: "6 jobs assigned to 5 computers, fastest gets hardest, slowest gets easiest, each gets ≥1 job. Number of Ways to assign jobs are?",
    type: "nat",
    options: [],
    correctAnswer: "120",
    explanation: "Fix extremes, distribute remaining.",
    subject: "Discrete Mathematics",
    topic: "Combinatorics",
    difficulty: "hard",
    marks: 2,
    negativeMarks: 0
  },

  {
    questionText: "Suppose n and p are unsigned integer variables in a C program. We wish to set p to nC3. If n is large, which one of the following statements is most likely to set p correctly?",
    type: "mcq",
    options: [
      "p = n*(n-1)*(n-2)/6;",
      "p = n*(n-1)/2*(n-2)/3;",
      "p = n*(n-1)/3*(n-2)/2;",
      "p = n*(n-1)*(n-2)/6.0;"
    ],
    correctAnswer: "p = n*(n-1)/2*(n-2)/3;",
    explanation: "Rearranging division reduces overflow risk in integer arithmetic.",
    subject: "C Programming",
    topic: "Overflow Handling",
    difficulty: "medium",
    marks: 1,
    negativeMarks: 0.33
  },

  {
    questionText: "The result of evaluating the postfix expression 10 5 + 60 6 / * 8 - is ____.",
    type: "nat",
    options: [],
    correctAnswer: "142",
    explanation: "10+5=15, 60/6=10 → 15*10=150 → 150-8=142.",
    subject: "Data Structures",
    topic: "Stacks",
    difficulty: "easy",
    marks: 1,
    negativeMarks: 0
  },
  
  {
    questionText: "Which of the following statements is TRUE about recursively enumerable (RE) languages?",
    type: "mcq",
    options: [
      "All RE languages are recursive",
      "RE languages are closed under complement",
      "Recursive languages are a subset of RE languages",
      "RE languages are closed under intersection only if both are recursive"
    ],
    correctAnswer: "Recursive languages are a subset of RE languages",
    explanation: "Every recursive language is recursively enumerable, but not vice versa.",
    subject: "TOC",
    topic: "RE Languages",
    difficulty: "medium",
    marks: 2,
    negativeMarks: 0.66
  }



];




// module.exports = QUESTION_BANK;
module.exports = [
  {
    id: 1,
    title: "Mock Test 1",
    questions: QUESTION_BANK
  }
];