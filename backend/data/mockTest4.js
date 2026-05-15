 const QUESTION_BANK = [
  // ─── Aptitude ──────────────────────────────────────────────────
  {
    questionText: "The antonym of 'ABUNDANT' is:",
    type: "mcq",
    options: ["Plentiful", "Scarce", "Ample", "Copious"],
    correctAnswer: "Scarce",
    explanation: "Refer to Verbal Ability fundamentals.",
    subject: "Aptitude",
    topic: "Verbal Ability",
    difficulty: "easy",
    marks: 1,
    negativeMarks: 0.33
  },
  {
    questionText: "20% of a number is 40. The number is:",
    type: "mcq",
    options: ["100", "150", "200", "250"],
    correctAnswer: "200",
    explanation: "Refer to Percentage fundamentals.",
    subject: "Aptitude",
    topic: "Percentage",
    difficulty: "easy",
    marks: 1,
    negativeMarks: 0.33
  },
  {
    questionText: "The HCF of 36 and 84 is:",
    type: "mcq",
    options: ["6", "12", "18", "24"],
    correctAnswer: "12",
    explanation: "Refer to Number Theory fundamentals.",
    subject: "Aptitude",
    topic: "Number Theory",
    difficulty: "easy",
    marks: 1,
    negativeMarks: 0.33
  },
  {
    questionText: "A clock shows 3:15. The angle between hour and minute hands is:",
    type: "mcq",
    options: ["0°", "7.5°", "15°", "22.5°"],
    correctAnswer: "7.5°",
    explanation: "Refer to Clocks fundamentals.",
    subject: "Aptitude",
    topic: "Clocks",
    difficulty: "easy",
    marks: 1,
    negativeMarks: 0.33
  },
  {
    questionText: "If 3x + 2y = 12 and x - y = 1, then x equals:",
    type: "mcq",
    options: ["2", "2.8", "3", "4"],
    correctAnswer: "2.8",
    explanation: "Refer to Linear Equations fundamentals.",
    subject: "Aptitude",
    topic: "Linear Equations",
    difficulty: "easy",
    marks: 1,
    negativeMarks: 0.33
  },
  {
    questionText: "A sum invested at compound interest doubles in 5 years. It will become 8 times in:",
    type: "mcq",
    options: ["10 years", "15 years", "20 years", "25 years"],
    correctAnswer: "15 years",
    explanation: "Refer to Compound Interest fundamentals.",
    subject: "Aptitude",
    topic: "Compound Interest",
    difficulty: "medium",
    marks: 2,
    negativeMarks: 0.66
  },
  {
    questionText: "In a group of 100 people, 70 speak English and 50 speak Hindi. If 30 speak neither, how many speak both?",
    type: "mcq",
    options: ["40", "50", "60", "70"],
    correctAnswer: "50",
    explanation: "Refer to Set Theory fundamentals.",
    subject: "Aptitude",
    topic: "Set Theory",
    difficulty: "medium",
    marks: 2,
    negativeMarks: 0.66
  },
  {
    questionText: "The probability of getting a sum of 7 when two dice are thrown is:",
    type: "mcq",
    options: ["1/6", "1/9", "1/12", "5/36"],
    correctAnswer: "1/6",
    explanation: "Refer to Probability fundamentals.",
    subject: "Aptitude",
    topic: "Probability",
    difficulty: "medium",
    marks: 2,
    negativeMarks: 0.66
  },
  {
    questionText: "A rectangular field is 80 m long and 60 m wide. A path 2 m wide runs inside along the boundary. Area of path in m²:",
    type: "mcq",
    options: ["536", "552", "576", "600"],
    correctAnswer: "552",
    explanation: "Refer to Mensuration fundamentals.",
    subject: "Aptitude",
    topic: "Mensuration",
    difficulty: "medium",
    marks: 2,
    negativeMarks: 0.66
  },
  {
    questionText: "Find the missing number: 3, 9, 27, 81, ?",
    type: "mcq",
    options: ["162", "243", "324", "405"],
    correctAnswer: "243",
    explanation: "Refer to Series fundamentals.",
    subject: "Aptitude",
    topic: "Series",
    difficulty: "medium",
    marks: 2,
    negativeMarks: 0.66
  },

  // ─── C Programming ─────────────────────────────────────────────
  {
    questionText: "What is the output?\n#include <stdio.h>\nint main() {\n  int x = 10;\n  int *p = &x;\n  *p = 20;\n  printf(\"%d\", x);\n  return 0;\n}",
    type: "mcq",
    options: ["10", "20", "Address of x", "Garbage"],
    correctAnswer: "20",
    explanation: "Refer to Pointers fundamentals.",
    subject: "C Programming",
    topic: "Pointers",
    difficulty: "easy",
    marks: 1,
    negativeMarks: 0.33
  },
  {
    questionText: "Which operator has the highest precedence?",
    type: "mcq",
    options: ["+", "++", "*", "="],
    correctAnswer: "++",
    explanation: "Refer to Operators fundamentals.",
    subject: "C Programming",
    topic: "Operators",
    difficulty: "easy",
    marks: 1,
    negativeMarks: 0.33
  },
  {
    questionText: "Which of the following cause undefined behavior in C?",
    type: "msq",
    options: ["Dereferencing NULL pointer", "Signed integer overflow", "Modifying string literal", "Using sizeof on array parameter"],
    correctAnswer: [
      "Dereferencing NULL pointer",
      "Signed integer overflow",
      "Modifying string literal"
    ],
    explanation: "Refer to Undefined Behavior fundamentals.",
    subject: "C Programming",
    topic: "Undefined Behavior",
    difficulty: "medium",
    marks: 2,
    negativeMarks: 0
  },
  {
    questionText: "How many times does i get printed in: for(int i=0; i<10; i++) printf(\"%d\", i);",
    type: "nat",
    options: [],
    correctAnswer: "10",
    explanation: "Refer to Loops fundamentals.",
    subject: "C Programming",
    topic: "Loops",
    difficulty: "easy",
    marks: 2,
    negativeMarks: 0
  },

  // ─── Data Structures ───────────────────────────────────────────
  {
    questionText: "Deque allows insertion/deletion at:",
    type: "mcq",
    options: ["Front only", "Rear only", "Both ends", "Middle only"],
    correctAnswer: "Both ends",
    explanation: "Refer to Stacks and Queues fundamentals.",
    subject: "Data Structures",
    topic: "Stacks and Queues",
    difficulty: "easy",
    marks: 1,
    negativeMarks: 0.33
  },
  {
    questionText: "The height of a balanced BST with 1023 nodes is approximately:",
    type: "mcq",
    options: ["10", "11", "512", "1023"],
    correctAnswer: "10",
    explanation: "Refer to Trees (Binary, BST, AVL) fundamentals.",
    subject: "Data Structures",
    topic: "Trees (Binary, BST, AVL)",
    difficulty: "medium",
    marks: 2,
    negativeMarks: 0.66
  },
  {
    questionText: "Which traversals can reconstruct a unique binary tree?",
    type: "msq",
    options: ["Inorder + Preorder", "Preorder only", "Postorder only", "Level order only"],
    correctAnswer: [
      "Inorder + Preorder"
    ],
    explanation: "Refer to Trees fundamentals.",
    subject: "Data Structures",
    topic: "Trees",
    difficulty: "medium",
    marks: 2,
    negativeMarks: 0
  },
  {
    questionText: "Minimum number of nodes in an AVL tree of height 4 is:",
    type: "nat",
    options: [],
    correctAnswer: "12",
    explanation: "Refer to Trees (Binary, BST, AVL) fundamentals.",
    subject: "Data Structures",
    topic: "Trees (Binary, BST, AVL)",
    difficulty: "hard",
    marks: 1,
    negativeMarks: 0
  },

  // ─── Engineering Mathematics ───────────────────────────────────
  {
    questionText: "The derivative of e^(2x) is:",
    type: "mcq",
    options: ["e^(2x)", "2e^(2x)", "e^x", "2e^x"],
    correctAnswer: "2e^(2x)",
    explanation: "Refer to Calculus fundamentals.",
    subject: "Engineering Mathematics",
    topic: "Calculus",
    difficulty: "easy",
    marks: 1,
    negativeMarks: 0.33
  },
  {
    questionText: "If P(A)=0.5, P(B)=0.4 and A,B independent, P(A∪B) is:",
    type: "mcq",
    options: ["0.7", "0.9", "0.2", "0.1"],
    correctAnswer: "0.7",
    explanation: "Refer to Probability fundamentals.",
    subject: "Engineering Mathematics",
    topic: "Probability",
    difficulty: "easy",
    marks: 2,
    negativeMarks: 0.66
  },
  {
    questionText: "Which matrices are always invertible?",
    type: "mcq",
    options: ["Identity matrix", "Diagonal with non-zero entries", "Zero matrix", "Symmetric matrix always"],
    correctAnswer: [
      "Identity matrix",
      "Diagonal with non-zero entries"
    ],
    explanation: "Refer to Linear Algebra fundamentals.",
    subject: "Engineering Mathematics",
    topic: "Linear Algebra",
    difficulty: "medium",
    marks: 2,
    negativeMarks: 0.66
  },
  {
    questionText: "The number of 4-digit numbers formed using 1,2,3,4 without repetition is:",
    type: "msq",
    options: [],
    correctAnswer: "24",
    explanation: "Refer to Combinatorics fundamentals.",
    subject: "Engineering Mathematics",
    topic: "Combinatorics",
    difficulty: "easy",
    marks: 2,
    negativeMarks: 0
  },

  // ─── Discrete Mathematics ──────────────────────────────────────
  {
    questionText: "The dual of AND gate in Boolean algebra is:",
    type: "mcq",
    options: ["OR", "NOT", "NAND", "XOR"],
    correctAnswer: "OR",
    explanation: "Refer to Boolean Algebra fundamentals.",
    subject: "Discrete Mathematics",
    topic: "Boolean Algebra",
    difficulty: "easy",
    marks: 1,
    negativeMarks: 0.33
  },
  {
    questionText: "Number of reflexive relations on a set of 2 elements is:",
    type: "mcq",
    options: ["2", "4", "8", "16"],
    correctAnswer: "4",
    explanation: "Refer to Relations and Functions fundamentals.",
    subject: "Discrete Mathematics",
    topic: "Relations and Functions",
    difficulty: "easy",
    marks: 1,
    negativeMarks: 0.33
  },
  {
    questionText: "Which are equivalent logical forms?",
    type: "mcq",
    options: ["p → q ≡ ¬q → ¬p", "p → q ≡ ¬p ∨ q", "¬(p ∨ q) ≡ ¬p ∨ ¬q", "p ∧ (q ∨ r) ≡ (p ∧ q) ∨ (p ∧ r)"],
    correctAnswer: [
      "p → q ≡ ¬q → ¬p",
      "p → q ≡ ¬p ∨ q",
      "p ∧ (q ∨ r) ≡ (p ∧ q) ∨ (p ∧ r)"
    ],
    explanation: "Refer to Propositional Logic fundamentals.",
    subject: "Discrete Mathematics",
    topic: "Propositional Logic",
    difficulty: "medium",
    marks: 1,
    negativeMarks: 0.33
  },
  {
    questionText: "Planar graph with 8 vertices and 12 edges has number of faces (Euler formula):",
    type: "msq",
    options: ["4", "5", "6", "7"],
    correctAnswer: "6",
    explanation: "Refer to Graph Theory fundamentals.",
    subject: "Discrete Mathematics",
    topic: "Graph Theory",
    difficulty: "medium",
    marks: 2,
    negativeMarks: 0
  },
  {
    questionText: "The number of binary strings of length 6 with no two consecutive 1s is:",
    type: "nat",
    options: [],
    correctAnswer: "21",
    explanation: "Refer to Combinatorics fundamentals.",
    subject: "Discrete Mathematics",
    topic: "Combinatorics",
    difficulty: "hard",
    marks: 2,
    negativeMarks: 0
  },

  // ─── Algorithms ────────────────────────────────────────────────
  {
    questionText: "Kruskal's algorithm uses which data structure prominently?",
    type: "mcq",
    options: ["Stack", "Queue", "Union-Find", "Heap only"],
    correctAnswer: "Union-Find",
    explanation: "Refer to Greedy Algorithms fundamentals.",
    subject: "Algorithms",
    topic: "Greedy Algorithms",
    difficulty: "easy",
    marks: 1,
    negativeMarks: 0.33
  },
  {
    questionText: "Worst-case of insertion sort is:",
    type: "mcq",
    options: ["O(n)", "O(n log n)", "O(n²)", "O(2^n)"],
    correctAnswer: "O(n²)",
    explanation: "Refer to Sorting Algorithms fundamentals.",
    subject: "Algorithms",
    topic: "Sorting Algorithms",
    difficulty: "easy",
    marks: 1,
    negativeMarks: 0.33
  },
  {
    questionText: "Which are divide and conquer algorithms?",
    type: "mcq",
    options: ["Merge Sort", "Quick Sort", "Binary Search", "Dijkstra"],
    correctAnswer: [
      "Merge Sort",
      "Quick Sort",
      "Binary Search"
    ],
    explanation: "Refer to Divide and Conquer fundamentals.",
    subject: "Algorithms",
    topic: "Divide and Conquer",
    difficulty: "medium",
    marks: 2,
    negativeMarks: 0.66
  },
  {
    questionText: "0/1 Knapsack with dynamic programming has time complexity:",
    type: "msq",
    options: ["O(n)", "O(nW)", "O(2^n)", "O(n log W)"],
    correctAnswer: "O(nW)",
    explanation: "Refer to Dynamic Programming fundamentals.",
    subject: "Algorithms",
    topic: "Dynamic Programming",
    difficulty: "medium",
    marks: 2,
    negativeMarks: 0
  },
  {
    questionText: "Number of comparisons in worst-case merge sort for n=8 elements is:",
    type: "nat",
    options: [],
    correctAnswer: "24",
    explanation: "Refer to Sorting Algorithms fundamentals.",
    subject: "Algorithms",
    topic: "Sorting Algorithms",
    difficulty: "medium",
    marks: 2,
    negativeMarks: 0
  },

  // ─── DBMS ──────────────────────────────────────────────────────
  {
    questionText: "Foreign key enforces:",
    type: "mcq",
    options: ["Entity integrity", "Referential integrity", "Domain integrity", "Key constraint"],
    correctAnswer: "Referential integrity",
    explanation: "Refer to Relational Model fundamentals.",
    subject: "DBMS",
    topic: "Relational Model",
    difficulty: "easy",
    marks: 1,
    negativeMarks: 0.33
  },
  {
    questionText: "Which is a DDL command?",
    type: "mcq",
    options: ["SELECT", "INSERT", "CREATE", "GRANT"],
    correctAnswer: "CREATE",
    explanation: "Refer to SQL fundamentals.",
    subject: "DBMS",
    topic: "SQL",
    difficulty: "easy",
    marks: 1,
    negativeMarks: 0.33
  },
  {
    questionText: "Which anomalies are prevented by 3NF?",
    type: "mcq",
    options: ["Insertion anomaly", "Deletion anomaly", "Update anomaly", "All redundancy"],
    correctAnswer: [
      "Insertion anomaly",
      "Deletion anomaly",
      "Update anomaly"
    ],
    explanation: "Refer to Normalization fundamentals.",
    subject: "DBMS",
    topic: "Normalization",
    difficulty: "medium",
    marks: 2,
    negativeMarks: 0.66
  },
  {
    questionText: "Timestamp ordering protocol ensures:",
    type: "msq",
    options: ["Serializability", "Recoverability only", "No deadlocks always", "2PL"],
    correctAnswer: "Serializability",
    explanation: "Refer to Concurrency Control fundamentals.",
    subject: "DBMS",
    topic: "Concurrency Control",
    difficulty: "medium",
    marks: 2,
    negativeMarks: 0
  },
  {
    questionText: "If block size is 4 KB and record size 100 bytes, blocking factor (records per block) is:",
    type: "nat",
    options: [],
    correctAnswer: "40",
    explanation: "Refer to Indexing and Hashing fundamentals.",
    subject: "DBMS",
    topic: "Indexing and Hashing",
    difficulty: "easy",
    marks: 1,
    negativeMarks: 0
  },

  // ─── Digital Logic ─────────────────────────────────────────────
  {
    questionText: "Gray code for binary 1011 is:",
    type: "mcq",
    options: ["1110", "1101", "1010", "1001"],
    correctAnswer: "1110",
    explanation: "Refer to Number Systems fundamentals.",
    subject: "Digital Logic",
    topic: "Number Systems",
    difficulty: "easy",
    marks: 1,
    negativeMarks: 0.33
  },
  {
    questionText: "A multiplexer with 4 data inputs requires select lines:",
    type: "mcq",
    options: ["1", "2", "3", "4"],
    correctAnswer: "2",
    explanation: "Refer to Combinational Circuits fundamentals.",
    subject: "Digital Logic",
    topic: "Combinational Circuits",
    difficulty: "easy",
    marks: 2,
    negativeMarks: 0.66
  },
  {
    questionText: "Which are sequential circuits?",
    type: "mcq",
    options: ["Flip-flop", "Latch", "Counter", "Multiplexer"],
    correctAnswer: [
      "Flip-flop",
      "Latch",
      "Counter"
    ],
    explanation: "Refer to Sequential Circuits fundamentals.",
    subject: "Digital Logic",
    topic: "Sequential Circuits",
    difficulty: "easy",
    marks: 2,
    negativeMarks: 0.66
  },
  {
    questionText: "For 3-variable K-map, number of cells is:",
    type: "msq",
    options: [],
    correctAnswer: "8",
    explanation: "Refer to K-Map Minimization fundamentals.",
    subject: "Digital Logic",
    topic: "K-Map Minimization",
    difficulty: "easy",
    marks: 2,
    negativeMarks: 0
  },

  // ─── Operating Systems ─────────────────────────────────────────
  {
    questionText: "Semaphore P operation:",
    type: "mcq",
    options: ["Increments count", "Decrements count; blocks if negative", "Only for mutex", "Releases CPU"],
    correctAnswer: "Decrements count; blocks if negative",
    explanation: "Refer to Synchronization fundamentals.",
    subject: "Operating Systems",
    topic: "Synchronization",
    difficulty: "easy",
    marks: 1,
    negativeMarks: 0.33
  },
  {
    questionText: "Banker's algorithm is for:",
    type: "mcq",
    options: ["Deadlock avoidance", "Deadlock detection", "Memory allocation", "Scheduling"],
    correctAnswer: "Deadlock avoidance",
    explanation: "Refer to Deadlocks fundamentals.",
    subject: "Operating Systems",
    topic: "Deadlocks",
    difficulty: "medium",
    marks: 2,
    negativeMarks: 0.66
  },
  {
    questionText: "Which are non-preemptive scheduling?",
    type: "mcq",
    options: ["FCFS", "SJF without preemption", "Round Robin", "Priority preemptive"],
    correctAnswer: [
      "FCFS",
      "SJF without preemption"
    ],
    explanation: "Refer to CPU Scheduling fundamentals.",
    subject: "Operating Systems",
    topic: "CPU Scheduling",
    difficulty: "medium",
    marks: 2,
    negativeMarks: 0.66
  },
  {
    questionText: "Working set model is used in:",
    type: "msq",
    options: ["CPU scheduling", "Virtual memory", "Disk scheduling", "File allocation"],
    correctAnswer: "Virtual memory",
    explanation: "Refer to Virtual Memory fundamentals.",
    subject: "Operating Systems",
    topic: "Virtual Memory",
    difficulty: "medium",
    marks: 2,
    negativeMarks: 0
  },
  {
    questionText: "Maximum number of processes if PID is 16-bit unsigned:",
    type: "nat",
    options: [],
    correctAnswer: "65536",
    explanation: "Refer to Process Management fundamentals.",
    subject: "Operating Systems",
    topic: "Process Management",
    difficulty: "easy",
    marks: 1,
    negativeMarks: 0
  },

  // ─── COA ───────────────────────────────────────────────────────
  {
    questionText: "Little-endian stores:",
    type: "mcq",
    options: ["MSB at lowest address", "LSB at lowest address", "Sign bit first", "Random order"],
    correctAnswer: "LSB at lowest address",
    explanation: "Refer to Number Representation fundamentals.",
    subject: "COA",
    topic: "Number Representation",
    difficulty: "easy",
    marks: 1,
    negativeMarks: 0.33
  },
  {
    questionText: "Microprogrammed control unit stores:",
    type: "mcq",
    options: ["Instructions in cache", "Microinstructions in control memory", "Data in registers", "OS code"],
    correctAnswer: "Microinstructions in control memory",
    explanation: "Refer to Control Unit fundamentals.",
    subject: "COA",
    topic: "Control Unit",
    difficulty: "medium",
    marks: 1,
    negativeMarks: 0.33
  },
  {
    questionText: "Which reduce memory-processor speed gap?",
    type: "msq",
    options: ["Cache", "Registers", "Virtual memory", "DMA"],
    correctAnswer: [
      "Cache",
      "Registers"
    ],
    explanation: "Refer to Memory Hierarchy fundamentals.",
    subject: "COA",
    topic: "Memory Hierarchy",
    difficulty: "medium",
    marks: 2,
    negativeMarks: 0
  },
  {
    questionText: "A 32-bit byte-addressable memory has maximum addressable bytes equal to:",
    type: "msq",
    options: ["2^16", "2^32", "2^30", "4 GB only label"],
    correctAnswer: "2^32",
    explanation: "Refer to Memory fundamentals.",
    subject: "COA",
    topic: "Memory",
    difficulty: "easy",
    marks: 2,
    negativeMarks: 0
  },
  {
    questionText: "If hit ratio 0.95, hit time 1 cycle, miss penalty 100 cycles, average access cycles:",
    type: "nat",
    options: [],
    correctAnswer: "6",
    explanation: "Refer to Cache fundamentals.",
    subject: "COA",
    topic: "Cache",
    difficulty: "hard",
    marks: 2,
    negativeMarks: 0
  },

  // ─── Computer Networks ─────────────────────────────────────────
  {
    questionText: "HTTPS uses port:",
    type: "mcq",
    options: ["80", "443", "8080", "21"],
    correctAnswer: "443",
    explanation: "Refer to Application Layer (HTTP, DNS) fundamentals.",
    subject: "Computer Networks",
    topic: "Application Layer (HTTP, DNS)",
    difficulty: "easy",
    marks: 1,
    negativeMarks: 0.33
  },
  {
    questionText: "ICMP is used for:",
    type: "mcq",
    options: ["Routing tables", "Error reporting and diagnostics", "File transfer", "Email"],
    correctAnswer: "Error reporting and diagnostics",
    explanation: "Refer to Network Layer (IP, Routing) fundamentals.",
    subject: "Computer Networks",
    topic: "Network Layer (IP, Routing)",
    difficulty: "easy",
    marks: 1,
    negativeMarks: 0.33
  },
  {
    questionText: "Distance vector routing suffers from:",
    type: "mcq",
    options: ["Count-to-infinity", "Link state flooding", "Dijkstra only", "No convergence"],
    correctAnswer: "Count-to-infinity",
    explanation: "Refer to Network Layer (IP, Routing) fundamentals.",
    subject: "Computer Networks",
    topic: "Network Layer (IP, Routing)",
    difficulty: "medium",
    marks: 1,
    negativeMarks: 0.33
  },
  {
    questionText: "Which are data link layer responsibilities?",
    type: "msq",
    options: ["Framing", "Error detection", "MAC addressing", "End-to-end delivery"],
    correctAnswer: [
      "Framing",
      "Error detection",
      "MAC addressing"
    ],
    explanation: "Refer to Data Link Layer fundamentals.",
    subject: "Computer Networks",
    topic: "Data Link Layer",
    difficulty: "medium",
    marks: 2,
    negativeMarks: 0
  },
  {
    questionText: "Maximum TCP window size with 16-bit field is:",
    type: "msq",
    options: ["65535 bytes", "65535 segments", "Unlimited", "1024"],
    correctAnswer: "65535 bytes",
    explanation: "Refer to Transport Layer (TCP, UDP) fundamentals.",
    subject: "Computer Networks",
    topic: "Transport Layer (TCP, UDP)",
    difficulty: "medium",
    marks: 2,
    negativeMarks: 0
  },
  {
    questionText: "Hamming code can correct how many bit errors with r check bits for m data bits when 2^r >= m+r+1 and r=4, m=11?",
    type: "nat",
    options: [],
    correctAnswer: "1",
    explanation: "Refer to Error Detection fundamentals.",
    subject: "Computer Networks",
    topic: "Error Detection",
    difficulty: "medium",
    marks: 1,
    negativeMarks: 0
  },

  // ─── Compiler Design ───────────────────────────────────────────
  {
    questionText: "Semantic analysis checks:",
    type: "mcq",
    options: ["Type compatibility", "Scope rules", "Token validity", "Code generation"],
    correctAnswer: "Type compatibility",
    explanation: "Refer to Semantic Analysis fundamentals.",
    subject: "Compiler Design",
    topic: "Semantic Analysis",
    difficulty: "easy",
    marks: 1,
    negativeMarks: 0.33
  },
  {
    questionText: "LR(0) items are used in:",
    type: "msq",
    options: ["Lexical analysis", "Bottom-up parsing", "Code optimization", "Register allocation"],
    correctAnswer: "Bottom-up parsing",
    explanation: "Refer to LR and LL Parsers fundamentals.",
    subject: "Compiler Design",
    topic: "LR and LL Parsers",
    difficulty: "medium",
    marks: 2,
    negativeMarks: 0
  },
  {
    questionText: "Maximum number of tokens in 'int x = 5;' excluding whitespace (typical lexer):",
    type: "nat",
    options: [],
    correctAnswer: "5",
    explanation: "Refer to Lexical Analysis fundamentals.",
    subject: "Compiler Design",
    topic: "Lexical Analysis",
    difficulty: "easy",
    marks: 2,
    negativeMarks: 0
  },

  // ─── TOC ───────────────────────────────────────────────────────
  {
    questionText: "The language {ww | w ∈ {a,b}*} is:",
    type: "mcq",
    options: ["Regular", "CFL", "Not CFL", "Recursive only"],
    correctAnswer: "Not CFL",
    explanation: "Refer to Context-Free Languages fundamentals.",
    subject: "TOC",
    topic: "Context-Free Languages",
    difficulty: "medium",
    marks: 1,
    negativeMarks: 0.33
  },
  {
    questionText: "NFA with ε-transitions can be converted to NFA without ε with:",
    type: "mcq",
    options: ["No state increase", "At most same states", "Exponential blowup always", "Polynomial states"],
    correctAnswer: "At most same states",
    explanation: "Refer to Regular Languages and FA fundamentals.",
    subject: "TOC",
    topic: "Regular Languages and FA",
    difficulty: "medium",
    marks: 1,
    negativeMarks: 0.33
  },
  {
    questionText: "Which are closed under union for CFL?",
    type: "msq",
    options: ["CFL", "Regular", "Deterministic CFL not always", "Recursive"],
    correctAnswer: [
      "CFL",
      "Regular"
    ],
    explanation: "Refer to Context-Free Languages fundamentals.",
    subject: "TOC",
    topic: "Context-Free Languages",
    difficulty: "medium",
    marks: 2,
    negativeMarks: 0
  },
  {
    questionText: "Rice's theorem applies to:",
    type: "msq",
    options: ["Non-trivial properties of RE languages", "Regular languages only", "DFA minimization", "Syntax analysis"],
    correctAnswer: "Non-trivial properties of RE languages",
    explanation: "Refer to Decidability fundamentals.",
    subject: "TOC",
    topic: "Decidability",
    difficulty: "hard",
    marks: 2,
    negativeMarks: 0
  },
  {
    questionText: "Number of states in NFA for (a+b)*abb is:",
    type: "nat",
    options: [],
    correctAnswer: "4",
    explanation: "Refer to Regular Languages and FA fundamentals.",
    subject: "TOC",
    topic: "Regular Languages and FA",
    difficulty: "medium",
    marks: 2,
    negativeMarks: 0
  }
];

module.exports = [
  {
    id: 4,
    title: "Mock Test 4",
    questions: QUESTION_BANK
  }
];


