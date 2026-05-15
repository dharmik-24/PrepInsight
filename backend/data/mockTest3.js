const QUESTION_BANK = [
  // ─── Aptitude ──────────────────────────────────────────────────
  {
    questionText: "Choose the grammatically correct sentence:",
    type: "mcq",
    options: [
      "Neither of the students have submitted the assignment",
      "Neither of the students has submitted the assignment",
      "Neither of the student has submitted the assignment",
      "Neither students has submitted the assignment"
    ],
    correctAnswer: "Neither of the students has submitted the assignment",
    explanation: "Refer to Verbal Ability fundamentals.",
    subject: "Aptitude",
    topic: "Verbal Ability",
    difficulty: "easy",
    marks: 1,
    negativeMarks: 0.33
  },
  {
    questionText: "A train 150 m long passes a pole in 15 seconds. The speed of the train in km/h is:",
    type: "mcq",
    options: ["30", "36", "40", "45"],
    correctAnswer: "36",
    explanation: "Refer to Time and Distance fundamentals.",
    subject: "Aptitude",
    topic: "Time and Distance",
    difficulty: "easy",
    marks: 1,
    negativeMarks: 0.33
  },
  {
    questionText: "If x² - 5x + 6 = 0, the sum of roots is:",
    type: "mcq",
    options: ["5", "6", "-5", "-6"],
    correctAnswer: "5",
    explanation: "Refer to Algebra fundamentals.",
    subject: "Aptitude",
    topic: "Algebra",
    difficulty: "easy",
    marks: 1,
    negativeMarks: 0.33
  },
  {
    questionText: "The ratio of ages of A and B is 3:4. After 5 years it becomes 4:5. Age of A now is:",
    type: "mcq",
    options: ["10", "12", "15", "20"],
    correctAnswer: "15",
    explanation: "Refer to Ratio fundamentals.",
    subject: "Aptitude",
    topic: "Ratio",
    difficulty: "easy",
    marks: 1,
    negativeMarks: 0.33
  },
  {
    questionText: "How many numbers between 100 and 1000 contain the digit 7 at least once?",
    type: "mcq",
    options: ["252", "271", "280", "299"],
    correctAnswer: "252",
    explanation: "Refer to Counting fundamentals.",
    subject: "Aptitude",
    topic: "Counting",
    difficulty: "easy",
    marks: 1,
    negativeMarks: 0.33
  },
  {
    questionText: "A box contains 5 red and 3 blue balls. Two balls drawn without replacement. Probability both are red:",
    type: "mcq",
    options: ["5/14", "10/28", "5/28", "25/64"],
    correctAnswer: "5/14",
    explanation: "Refer to Probability fundamentals.",
    subject: "Aptitude",
    topic: "Probability",
    difficulty: "medium",
    marks: 2,
    negativeMarks: 0.66
  },
  {
    questionText: "A can do a work in 10 days, B in 15 days. They work together for 4 days. Fraction of work remaining:",
    type: "mcq",
    options: ["1/3", "2/3", "1/6", "5/6"],
    correctAnswer: "1/3",
    explanation: "Refer to Work and Time fundamentals.",
    subject: "Aptitude",
    topic: "Work and Time",
    difficulty: "medium",
    marks: 2,
    negativeMarks: 0.66
  },
  {
    questionText: "If sin θ = 3/5 and θ is acute, then cos θ equals:",
    type: "mcq",
    options: ["4/5", "3/4", "5/4", "4/3"],
    correctAnswer: "4/5",
    explanation: "Refer to Trigonometry fundamentals.",
    subject: "Aptitude",
    topic: "Trigonometry",
    difficulty: "medium",
    marks: 2,
    negativeMarks: 0.66
  },
  {
    questionText: "In a class, 60% students passed in Math and 70% in Science. If 50% passed in both, percentage passed in at least one subject:",
    type: "mcq",
    options: ["70%", "80%", "90%", "100%"],
    correctAnswer: "80%",
    explanation: "Refer to Set Theory fundamentals.",
    subject: "Aptitude",
    topic: "Set Theory",
    difficulty: "medium",
    marks: 2,
    negativeMarks: 0.66
  },
  {
    questionText: "A man rows 12 km downstream in 2 hours and returns in 4 hours. Speed of stream in km/h:",
    type: "mcq",
    options: ["1", "1.5", "2", "2.5"],
    correctAnswer: "1.5",
    explanation: "Refer to Boats and Streams fundamentals.",
    subject: "Aptitude",
    topic: "Boats and Streams",
    difficulty: "medium",
    marks: 2,
    negativeMarks: 0.66
  },

  // ─── C Programming ─────────────────────────────────────────────
  {
    questionText: "Consider: int arr[] = {1,2,3,4,5}; int *p = arr; printf(\"%d\", *(p+2)); Output is:",
    type: "mcq",
    options: ["1", "2", "3", "4"],
    correctAnswer: "3",
    explanation: "Refer to Pointers fundamentals.",
    subject: "C Programming",
    topic: "Pointers",
    difficulty: "easy",
    marks: 1,
    negativeMarks: 0.33
  },
  {
    questionText: "Which header file is required for malloc() in C?",
    type: "mcq",
    options: ["stdio.h", "stdlib.h", "string.h", "math.h"],
    correctAnswer: "stdlib.h",
    explanation: "Refer to Memory Management fundamentals.",
    subject: "C Programming",
    topic: "Memory Management",
    difficulty: "easy",
    marks: 1,
    negativeMarks: 0.33
  },
  {
    questionText: "Which of the following about structures in C are TRUE?",
    type: "msq",
    options: [
      "Structures can contain pointers to themselves",
      "Structures cannot have functions as members in standard C",
      "sizeof(struct) may include padding",
      "Union members share memory"
    ],
    correctAnswer: [
      "Structures can contain pointers to themselves",
      "Structures cannot have functions as members in standard C",
      "sizeof(struct) may include padding",
      "Union members share memory"
    ],
    explanation: "Refer to Structures fundamentals.",
    subject: "C Programming",
    topic: "Structures",
    difficulty: "medium",
    marks: 2,
    negativeMarks: 0
  },
  {
    questionText: "What is the output of: printf(\"%d\", sizeof(char)); on a typical system?",
    type: "nat",
    options: [],
    correctAnswer: "1",
    explanation: "Refer to Data Types fundamentals.",
    subject: "C Programming",
    topic: "Data Types",
    difficulty: "easy",
    marks: 2,
    negativeMarks: 0
  },

  // ─── Data Structures ───────────────────────────────────────────
  {
    questionText: "The maximum number of nodes at level l in a binary tree (root at level 0) is:",
    type: "mcq",
    options: ["l", "2l", "2^l", "2^(l+1)-1"],
    correctAnswer: "2^l",
    explanation: "Refer to Trees fundamentals.",
    subject: "Data Structures",
    topic: "Trees",
    difficulty: "easy",
    marks: 1,
    negativeMarks: 0.33
  },
  {
    questionText: "Which sorting algorithm has best average-case O(n log n) and is in-place?",
    type: "mcq",
    options: ["Merge Sort", "Heap Sort", "Counting Sort", "Radix Sort"],
    correctAnswer: "Heap Sort",
    explanation: "Refer to Sorting Algorithms fundamentals.",
    subject: "Data Structures",
    topic: "Sorting Algorithms",
    difficulty: "medium",
    marks: 2,
    negativeMarks: 0.66
  },
  {
    questionText: "Which of the following about hashing are TRUE?",
    type: "msq",
    options: ["Chaining handles collisions with linked lists", "Open addressing probes for next slot", "Load factor affects performance", "Hash tables always guarantee O(1) worst case"],
    correctAnswer: [
      "Chaining handles collisions with linked lists",
      "Open addressing probes for next slot",
      "Load factor affects performance"
    ],
    explanation: "Refer to Hashing fundamentals.",
    subject: "Data Structures",
    topic: "Hashing",
    difficulty: "medium",
    marks: 2,
    negativeMarks: 0
  },
  {
    questionText: "A graph has 8 vertices and is a tree. The number of edges is:",
    type: "nat",
    options: [],
    correctAnswer: "7",
    explanation: "Refer to Graphs (BFS, DFS) fundamentals.",
    subject: "Data Structures",
    topic: "Graphs (BFS, DFS)",
    difficulty: "easy",
    marks: 1,
    negativeMarks: 0
  },

  // ─── Engineering Mathematics ───────────────────────────────────
  {
    questionText: "The rank of the matrix [[1,2],[2,4]] is:",
    type: "mcq",
    options: ["0", "1", "2", "4"],
    correctAnswer: "1",
    explanation: "Refer to Linear Algebra fundamentals.",
    subject: "Engineering Mathematics",
    topic: "Linear Algebra",
    difficulty: "easy",
    marks: 1,
    negativeMarks: 0.33
  },
  {
    questionText: "The limit of (sin x)/x as x approaches 0 is:",
    type: "mcq",
    options: ["0", "1", "∞", "undefined"],
    correctAnswer: "1",
    explanation: "Refer to Calculus fundamentals.",
    subject: "Engineering Mathematics",
    topic: "Calculus",
    difficulty: "easy",
    marks: 2,
    negativeMarks: 0.66
  },
  {
    questionText: "Which of the following sets are countable?",
    type: "mcq",
    options: ["Rational numbers", "Integers", "Real numbers in [0,1]", "Finite strings over {a,b}"],
    correctAnswer: [
      "Rational numbers",
      "Integers",
      "Finite strings over {a,b}"
    ],
    explanation: "Refer to Set Theory fundamentals.",
    subject: "Engineering Mathematics",
    topic: "Set Theory",
    difficulty: "medium",
    marks: 2,
    negativeMarks: 0.66
  },
  {
    questionText: "The number of edges in a tree with 20 vertices is:",
    type: "msq",
    options: [],
    correctAnswer: "19",
    explanation: "Refer to Graph Theory fundamentals.",
    subject: "Engineering Mathematics",
    topic: "Graph Theory",
    difficulty: "easy",
    marks: 2,
    negativeMarks: 0
  },

  // ─── Discrete Mathematics ──────────────────────────────────────
  {
    questionText: "The number of Boolean functions of n variables is:",
    type: "mcq",
    options: ["2^n", "n^2", "2^(2^n)", "2^(n^2)"],
    correctAnswer: "2^(2^n)",
    explanation: "Refer to Boolean Algebra fundamentals.",
    subject: "Discrete Mathematics",
    topic: "Boolean Algebra",
    difficulty: "easy",
    marks: 1,
    negativeMarks: 0.33
  },
  {
    questionText: "A relation R on set A is an equivalence relation if it is:",
    type: "mcq",
    options: ["Reflexive only", "Symmetric only", "Reflexive, symmetric, transitive", "Antisymmetric"],
    correctAnswer: "Reflexive, symmetric, transitive",
    explanation: "Refer to Relations and Functions fundamentals.",
    subject: "Discrete Mathematics",
    topic: "Relations and Functions",
    difficulty: "easy",
    marks: 1,
    negativeMarks: 0.33
  },
  {
    questionText: "Which of the following are tautologies?",
    type: "mcq",
    options: ["p ∨ ¬p", "(p → q) ∨ (q → p)", "p ∧ ¬p", "p → p"],
    correctAnswer: [
      "p ∨ ¬p",
      "(p → q) ∨ (q → p)",
      "p → p"
    ],
    explanation: "Refer to Propositional Logic fundamentals.",
    subject: "Discrete Mathematics",
    topic: "Propositional Logic",
    difficulty: "medium",
    marks: 1,
    negativeMarks: 0.33
  },
  {
    questionText: "The number of Hamiltonian cycles in K₄ is:",
    type: "msq",
    options: ["1", "2", "3", "6"],
    correctAnswer: "3",
    explanation: "Refer to Graph Theory fundamentals.",
    subject: "Discrete Mathematics",
    topic: "Graph Theory",
    difficulty: "hard",
    marks: 2,
    negativeMarks: 0
  },
  {
    questionText: "The coefficient of x³ in (1+x)^10 is:",
    type: "nat",
    options: [],
    correctAnswer: "120",
    explanation: "Refer to Combinatorics fundamentals.",
    subject: "Discrete Mathematics",
    topic: "Combinatorics",
    difficulty: "medium",
    marks: 2,
    negativeMarks: 0
  },

  // ─── Algorithms ────────────────────────────────────────────────
  {
    questionText: "Prim's algorithm is used to find:",
    type: "mcq",
    options: ["Shortest path", "Minimum spanning tree", "Maximum flow", "Topological order"],
    correctAnswer: "Minimum spanning tree",
    explanation: "Refer to Greedy Algorithms fundamentals.",
    subject: "Algorithms",
    topic: "Greedy Algorithms",
    difficulty: "easy",
    marks: 1,
    negativeMarks: 0.33
  },
  {
    questionText: "The recurrence T(n) = 2T(n/2) + n has solution:",
    type: "mcq",
    options: ["O(n)", "O(n log n)", "O(n²)", "O(log n)"],
    correctAnswer: "O(n log n)",
    explanation: "Refer to Complexity Analysis fundamentals.",
    subject: "Algorithms",
    topic: "Complexity Analysis",
    difficulty: "medium",
    marks: 1,
    negativeMarks: 0.33
  },
  {
    questionText: "Bellman-Ford algorithm can detect:",
    type: "mcq",
    options: ["Negative weight cycles", "Only positive edges", "Disconnected graph only", "Multiple MSTs"],
    correctAnswer: "Negative weight cycles",
    explanation: "Bellman-Ford relaxes edges up to V-1 times and can detect negative-weight cycles.",
    subject: "Algorithms",
    topic: "Graph Algorithms",
    difficulty: "medium",
    marks: 2,
    negativeMarks: 0.66
  },
  {
    questionText: "Which problems are NP-complete?",
    type: "msq",
    options: ["SAT", "Vertex Cover", "Traveling Salesman (decision)", "Sorting"],
    correctAnswer: [
      "SAT",
      "Vertex Cover",
      "Traveling Salesman (decision)"
    ],
    explanation: "SAT, Vertex Cover, and TSP (decision) are classical NP-complete problems; sorting is in P.",
    subject: "Algorithms",
    topic: "NP-Completeness",
    difficulty: "hard",
    marks: 2,
    negativeMarks: 0
  },
  {
    questionText: "Maximum number of comparisons in binary search on sorted array of 1024 elements is:",
    type: "nat",
    options: [],
    correctAnswer: "10",
    explanation: "Refer to Searching Algorithms fundamentals.",
    subject: "Algorithms",
    topic: "Searching Algorithms",
    difficulty: "easy",
    marks: 2,
    negativeMarks: 0
  },

  // ─── DBMS ──────────────────────────────────────────────────────
  {
    questionText: "Which key uniquely identifies a tuple and has no redundant attributes?",
    type: "mcq",
    options: ["Super key", "Candidate key", "Foreign key", "Alternate key"],
    correctAnswer: "Candidate key",
    explanation: "Refer to Relational Model fundamentals.",
    subject: "DBMS",
    topic: "Relational Model",
    difficulty: "easy",
    marks: 1,
    negativeMarks: 0.33
  },
  {
    questionText: "Which isolation level prevents dirty reads but allows phantom reads?",
    type: "mcq",
    options: ["Read Uncommitted", "Read Committed", "Repeatable Read", "Serializable"],
    correctAnswer: "Read Committed",
    explanation: "Refer to Transaction Management fundamentals.",
    subject: "DBMS",
    topic: "Transaction Management",
    difficulty: "medium",
    marks: 1,
    negativeMarks: 0.33
  },
  {
    questionText: "Which of the following are true about B-trees?",
    type: "mcq",
    options: ["Used in database indexing", "All leaves at same level", "Minimum occupancy in nodes", "Binary tree only"],
    correctAnswer: [
      "Used in database indexing",
      "All leaves at same level",
      "Minimum occupancy in nodes"
    ],
    explanation: "Refer to Indexing and Hashing fundamentals.",
    subject: "DBMS",
    topic: "Indexing and Hashing",
    difficulty: "medium",
    marks: 2,
    negativeMarks: 0.66
  },
  {
    questionText: "Lossless decomposition requires:",
    type: "msq",
    options: ["Join of decomposed relations equals original", "No redundancy", "BCNF only", "3NF only"],
    correctAnswer: "Join of decomposed relations equals original",
    explanation: "Refer to Normalization fundamentals.",
    subject: "DBMS",
    topic: "Normalization",
    difficulty: "medium",
    marks: 2,
    negativeMarks: 0
  },
  {
    questionText: "If a relation has 4 attributes and 3 functional dependencies, maximum number of candidate keys can be:",
    type: "nat",
    options: [],
    correctAnswer: "2",
    explanation: "Refer to Normalization fundamentals.",
    subject: "DBMS",
    topic: "Normalization",
    difficulty: "hard",
    marks: 1,
    negativeMarks: 0
  },

  // ─── Digital Logic ─────────────────────────────────────────────
  {
    questionText: "Excess-3 code for decimal 7 is:",
    type: "mcq",
    options: ["0110", "1010", "1100", "1111"],
    correctAnswer: "1010",
    explanation: "Refer to Number Systems fundamentals.",
    subject: "Digital Logic",
    topic: "Number Systems",
    difficulty: "easy",
    marks: 1,
    negativeMarks: 0.33
  },
  {
    questionText: "A JK flip-flop toggles when J=K=",
    type: "mcq",
    options: ["0", "1", "X", "Z"],
    correctAnswer: "1",
    explanation: "Refer to Flip-Flops fundamentals.",
    subject: "Digital Logic",
    topic: "Flip-Flops",
    difficulty: "medium",
    marks: 2,
    negativeMarks: 0.66
  },
  {
    questionText: "Which are characteristics of CMOS?",
    type: "mcq",
    options: ["Low static power", "High noise margin", "Complementary pairs", "Always faster than TTL"],
    correctAnswer: [
      "Low static power",
      "High noise margin",
      "Complementary pairs"
    ],
    explanation: "Refer to Logic Gates fundamentals.",
    subject: "Digital Logic",
    topic: "Logic Gates",
    difficulty: "easy",
    marks: 2,
    negativeMarks: 0.66
  },
  {
    questionText: "Number of minterms for a function of 4 variables is:",
    type: "msq",
    options: [],
    correctAnswer: "16",
    explanation: "Refer to K-Map Minimization fundamentals.",
    subject: "Digital Logic",
    topic: "K-Map Minimization",
    difficulty: "easy",
    marks: 2,
    negativeMarks: 0
  },

  // ─── Operating Systems ─────────────────────────────────────────
  {
    questionText: "Which is NOT a process state?",
    type: "mcq",
    options: ["Ready", "Blocked", "Running", "Compiled"],
    correctAnswer: "Compiled",
    explanation: "Refer to Process Management fundamentals.",
    subject: "Operating Systems",
    topic: "Process Management",
    difficulty: "easy",
    marks: 1,
    negativeMarks: 0.33
  },
  {
    questionText: "Round Robin scheduling uses:",
    type: "mcq",
    options: ["Priority", "Time quantum", "Shortest job first", "Deadline"],
    correctAnswer: "Time quantum",
    explanation: "Refer to CPU Scheduling fundamentals.",
    subject: "Operating Systems",
    topic: "CPU Scheduling",
    difficulty: "easy",
    marks: 2,
    negativeMarks: 0.66
  },
  {
    questionText: "Which are methods of inter-process communication?",
    type: "mcq",
    options: ["Pipes", "Shared memory", "Message queues", "Registers only"],
    correctAnswer: [
      "Pipes",
      "Shared memory",
      "Message queues"
    ],
    explanation: "Refer to Synchronization fundamentals.",
    subject: "Operating Systems",
    topic: "Synchronization",
    difficulty: "medium",
    marks: 2,
    negativeMarks: 0.66
  },
  {
    questionText: "Thrashing occurs when:",
    type: "msq",
    options: ["CPU utilization is very high", "Page fault rate is very high", "Disk is full", "No deadlock"],
    correctAnswer: "Page fault rate is very high",
    explanation: "Refer to Virtual Memory fundamentals.",
    subject: "Operating Systems",
    topic: "Virtual Memory",
    difficulty: "medium",
    marks: 2,
    negativeMarks: 0
  },
  {
    questionText: "In a system with 32-bit logical address and 4 KB pages, number of page table entries per process (single level) is:",
    type: "nat",
    options: [],
    correctAnswer: "1048576",
    explanation: "Refer to Paging fundamentals.",
    subject: "Operating Systems",
    topic: "Paging",
    difficulty: "hard",
    marks: 1,
    negativeMarks: 0
  },

  // ─── COA ───────────────────────────────────────────────────────
  {
    questionText: "The ALU performs:",
    type: "mcq",
    options: ["Arithmetic and logic operations", "Only arithmetic", "Memory fetch", "I/O control"],
    correctAnswer: "Arithmetic and logic operations",
    explanation: "Refer to CPU Architecture fundamentals.",
    subject: "COA",
    topic: "CPU Architecture",
    difficulty: "easy",
    marks: 1,
    negativeMarks: 0.33
  },
  {
    questionText: "RISC architectures typically have:",
    type: "mcq",
    options: ["Few addressing modes", "Fixed instruction length", "Many registers", "Complex instructions"],
    correctAnswer: "Few addressing modes",
    explanation: "Refer to Instruction Set fundamentals.",
    subject: "COA",
    topic: "Instruction Set",
    difficulty: "medium",
    marks: 1,
    negativeMarks: 0.33
  },
  {
    questionText: "Which improve cache performance?",
    type: "msq",
    options: ["Spatial locality", "Temporal locality", "Larger block size always", "Associativity"],
    correctAnswer: [
      "Spatial locality",
      "Temporal locality",
      "Associativity"
    ],
    explanation: "Refer to Cache fundamentals.",
    subject: "COA",
    topic: "Cache",
    difficulty: "medium",
    marks: 2,
    negativeMarks: 0
  },
  {
    questionText: "For a 16-bit instruction with 4-bit opcode and 3 registers of 3 bits each, remaining bits for immediate:",
    type: "msq",
    options: ["4", "5", "6", "7"],
    correctAnswer: "4",
    explanation: "Refer to Instruction Format fundamentals.",
    subject: "COA",
    topic: "Instruction Format",
    difficulty: "hard",
    marks: 2,
    negativeMarks: 0
  },
  {
    questionText: "An ideal 5-stage pipeline processing 1000 independent instructions has speedup approximately:",
    type: "nat",
    options: [],
    correctAnswer: "5",
    explanation: "Refer to Pipelining fundamentals.",
    subject: "COA",
    topic: "Pipelining",
    difficulty: "medium",
    marks: 2,
    negativeMarks: 0
  },

  // ─── Computer Networks ─────────────────────────────────────────
  {
    questionText: "DNS primarily translates:",
    type: "mcq",
    options: ["IP to MAC", "Domain name to IP", "Port to service", "URL to HTML"],
    correctAnswer: "Domain name to IP",
    explanation: "Refer to Application Layer (HTTP, DNS) fundamentals.",
    subject: "Computer Networks",
    topic: "Application Layer (HTTP, DNS)",
    difficulty: "easy",
    marks: 1,
    negativeMarks: 0.33
  },
  {
    questionText: "The size of IPv4 address is:",
    type: "mcq",
    options: ["16 bits", "32 bits", "64 bits", "128 bits"],
    correctAnswer: "32 bits",
    explanation: "Refer to Network Layer (IP, Routing) fundamentals.",
    subject: "Computer Networks",
    topic: "Network Layer (IP, Routing)",
    difficulty: "easy",
    marks: 1,
    negativeMarks: 0.33
  },
  {
    questionText: "Sliding window protocol is used for:",
    type: "mcq",
    options: ["Error detection", "Flow and error control", "Routing", "Encryption"],
    correctAnswer: "Flow and error control",
    explanation: "Refer to Data Link Layer fundamentals.",
    subject: "Computer Networks",
    topic: "Data Link Layer",
    difficulty: "medium",
    marks: 1,
    negativeMarks: 0.33
  },
  {
    questionText: "Which belong to application layer protocols?",
    type: "msq",
    options: ["HTTP", "FTP", "SMTP", "ARP"],
    correctAnswer: [
      "HTTP",
      "FTP",
      "SMTP"
    ],
    explanation: "Refer to Application Layer (HTTP, DNS) fundamentals.",
    subject: "Computer Networks",
    topic: "Application Layer (HTTP, DNS)",
    difficulty: "medium",
    marks: 2,
    negativeMarks: 0
  },
  {
    questionText: "Maximum size of IPv4 header in bytes is:",
    type: "msq",
    options: ["20", "40", "60", "80"],
    correctAnswer: "60",
    explanation: "Refer to Network Layer (IP, Routing) fundamentals.",
    subject: "Computer Networks",
    topic: "Network Layer (IP, Routing)",
    difficulty: "medium",
    marks: 2,
    negativeMarks: 0
  },
  {
    questionText: "In a /24 subnet, number of host addresses is:",
    type: "nat",
    options: [],
    correctAnswer: "254",
    explanation: "Refer to Network Layer (IP, Routing) fundamentals.",
    subject: "Computer Networks",
    topic: "Network Layer (IP, Routing)",
    difficulty: "easy",
    marks: 1,
    negativeMarks: 0
  },

  // ─── Compiler Design ───────────────────────────────────────────
  {
    questionText: "Shift-reduce parsers are:",
    type: "mcq",
    options: ["Top-down", "Bottom-up", "Predictive", "Recursive descent"],
    correctAnswer: "Bottom-up",
    explanation: "Refer to LR and LL Parsers fundamentals.",
    subject: "Compiler Design",
    topic: "LR and LL Parsers",
    difficulty: "easy",
    marks: 1,
    negativeMarks: 0.33
  },
  {
    questionText: "Common subexpression elimination is a:",
    type: "msq",
    options: ["Lexical optimization", "Code optimization", "Parsing technique", "Semantic check"],
    correctAnswer: "Code optimization",
    explanation: "Refer to Code Optimization fundamentals.",
    subject: "Compiler Design",
    topic: "Code Optimization",
    difficulty: "medium",
    marks: 2,
    negativeMarks: 0
  },
  {
    questionText: "Minimum number of lookahead symbols for LL(1) parsing is:",
    type: "nat",
    options: [],
    correctAnswer: "1",
    explanation: "Refer to LL and LR Parsers fundamentals.",
    subject: "Compiler Design",
    topic: "LL and LR Parsers",
    difficulty: "easy",
    marks: 2,
    negativeMarks: 0
  },

  // ─── TOC ───────────────────────────────────────────────────────
  {
    questionText: "The language a*b* is:",
    type: "mcq",
    options: ["Regular", "CFL not regular", "CSL", "Not CFL"],
    correctAnswer: "Regular",
    explanation: "Refer to Regular Languages and FA fundamentals.",
    subject: "TOC",
    topic: "Regular Languages and FA",
    difficulty: "easy",
    marks: 1,
    negativeMarks: 0.33
  },
  {
    questionText: "A PDA with empty stack acceptance recognizes:",
    type: "mcq",
    options: ["Regular languages", "Context-free languages", "Context-sensitive only", "All languages"],
    correctAnswer: "Context-free languages",
    explanation: "Refer to Pushdown Automata fundamentals.",
    subject: "TOC",
    topic: "Pushdown Automata",
    difficulty: "medium",
    marks: 1,
    negativeMarks: 0.33
  },
  {
    questionText: "Which problems are undecidable?",
    type: "msq",
    options: ["Halting problem", "Equivalence of two TMs", "Emptiness of CFG", "Membership in regular language"],
    correctAnswer: [
      "Halting problem",
      "Equivalence of two TMs"
    ],
    explanation: "Refer to Decidability fundamentals.",
    subject: "TOC",
    topic: "Decidability",
    difficulty: "hard",
    marks: 2,
    negativeMarks: 0
  },
  {
    questionText: "Myhill-Nerode theorem characterizes:",
    type: "msq",
    options: ["Regular languages", "CFL", "Recursive languages", "RE languages"],
    correctAnswer: "Regular languages",
    explanation: "Refer to Regular Languages and FA fundamentals.",
    subject: "TOC",
    topic: "Regular Languages and FA",
    difficulty: "medium",
    marks: 2,
    negativeMarks: 0
  },
  {
    questionText: "Number of states in minimal DFA for language (a+b)*a(a+b)* is:",
    type: "nat",
    options: [],
    correctAnswer: "2",
    explanation: "Refer to Regular Languages and FA fundamentals.",
    subject: "TOC",
    topic: "Regular Languages and FA",
    difficulty: "medium",
    marks: 2,
    negativeMarks: 0
  }
];
// module.exports = QUESTION_BANK;
module.exports = [
  {
    id: 3,
    title: "Mock Test 3",
    questions: QUESTION_BANK
  }
];
















