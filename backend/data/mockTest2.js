const QUESTION_BANK = [
  // ─── Aptitude ──────────────────────────────────────────────────
  {
    questionText: "A shopkeeper marks an article 20% above cost price and gives a discount of 10%. The profit percentage is:",
    type: "mcq",
    options: ["8%", "10%", "12%", "15%"],
    correctAnswer: "8%",
    explanation: "Refer to Profit and Loss fundamentals.",
    subject: "Aptitude",
    topic: "Profit and Loss",
    difficulty: "easy",
    marks: 1,
    negativeMarks: 0.33
  },
  {
    questionText: "In how many ways can the letters of the word GATE be arranged?",
    type: "mcq",
    options: ["12", "16", "24", "32"],
    correctAnswer: "24",
    explanation: "Refer to Permutation fundamentals.",
    subject: "Aptitude",
    topic: "Permutation",
    difficulty: "easy",
    marks: 1,
    negativeMarks: 0.33
  },
  {
    questionText: "If 15 workers can complete a work in 20 days, how many days will 25 workers take to complete the same work?",
    type: "mcq",
    options: ["10", "12", "15", "18"],
    correctAnswer: "12",
    explanation: "Refer to Work and Time fundamentals.",
    subject: "Aptitude",
    topic: "Work and Time",
    difficulty: "easy",
    marks: 1,
    negativeMarks: 0.33
  },
  {
    questionText: "The average of five numbers is 20. If one number is excluded, the average becomes 18. The excluded number is:",
    type: "mcq",
    options: ["26", "28", "30", "32"],
    correctAnswer: "28",
    explanation: "Refer to Average fundamentals.",
    subject: "Aptitude",
    topic: "Average",
    difficulty: "easy",
    marks: 1,
    negativeMarks: 0.33
  },
  {
    questionText: "A man walks 5 km towards East and then turns left and walks 3 km. How far is he from the starting point?",
    type: "mcq",
    options: ["4 km", "5 km", "6 km", "8 km"],
    correctAnswer: "4 km",
    explanation: "Refer to Direction fundamentals.",
    subject: "Aptitude",
    topic: "Direction",
    difficulty: "easy",
    marks: 1,
    negativeMarks: 0.33
  },
  {
    questionText: "Two pipes A and B can fill a tank in 12 hours and 18 hours respectively. If both pipes are opened together, the time to fill the tank is:",
    type: "mcq",
    options: ["6.5 hours", "7.2 hours", "8 hours", "9 hours"],
    correctAnswer: "7.2 hours",
    explanation: "Refer to Pipes and Cisterns fundamentals.",
    subject: "Aptitude",
    topic: "Pipes and Cisterns",
    difficulty: "medium",
    marks: 2,
    negativeMarks: 0.66
  },
  {
    questionText: "A sum of money doubles itself in 8 years at simple interest. In how many years will it become four times?",
    type: "mcq",
    options: ["16", "20", "24", "32"],
    correctAnswer: "24",
    explanation: "Refer to Simple Interest fundamentals.",
    subject: "Aptitude",
    topic: "Simple Interest",
    difficulty: "medium",
    marks: 2,
    negativeMarks: 0.66
  },
  {
    questionText: "If the probability of event A is 0.4 and event B is 0.5, and they are independent, then P(A ∩ B) is:",
    type: "mcq",
    options: ["0.1", "0.2", "0.45", "0.9"],
    correctAnswer: "0.2",
    explanation: "Refer to Probability fundamentals.",
    subject: "Aptitude",
    topic: "Probability",
    difficulty: "medium",
    marks: 2,
    negativeMarks: 0.66
  },
  {
    questionText: "A cube of side 4 cm is painted on all faces and cut into 64 smaller cubes of equal size. How many small cubes have exactly one face painted?",
    type: "mcq",
    options: ["24", "32", "40", "48"],
    correctAnswer: "24",
    explanation: "Refer to Cubes fundamentals.",
    subject: "Aptitude",
    topic: "Cubes",
    difficulty: "medium",
    marks: 2,
    negativeMarks: 0.66
  },
  {
    questionText: "Find the next term in the series: 2, 6, 12, 20, 30, ?",
    type: "mcq",
    options: ["40", "42", "44", "48"],
    correctAnswer: "42",
    explanation: "Refer to Series fundamentals.",
    subject: "Aptitude",
    topic: "Series",
    difficulty: "medium",
    marks: 2,
    negativeMarks: 0.66
  },

  // ─── C Programming ─────────────────────────────────────────────
  {
    questionText: "What is the output of the following C program?\n#include <stdio.h>\nint main() {\n  int i = 5;\n  printf(\"%d\", i++ + ++i);\n  return 0;\n}",
    type: "mcq",
    options: ["10", "11", "12", "Undefined behavior"],
    correctAnswer: "Undefined behavior",
    explanation: "Refer to Operators fundamentals.",
    subject: "C Programming",
    topic: "Operators",
    difficulty: "medium",
    marks: 1,
    negativeMarks: 0.33
  },
  {
    questionText: "Which of the following is NOT a valid storage class in C?",
    type: "mcq",
    options: ["auto", "static", "global", "register"],
    correctAnswer: "global",
    explanation: "Refer to Storage Classes fundamentals.",
    subject: "C Programming",
    topic: "Storage Classes",
    difficulty: "easy",
    marks: 1,
    negativeMarks: 0.33
  },
  {
    questionText: "Which of the following statements about pointers in C are TRUE?",
    type: "msq",
    options: [
      "Pointer arithmetic is scale-dependent on the type pointed to",
      "A void pointer can be assigned any pointer type without cast",
      "sizeof(int*) is always 4",
      "Dereferencing NULL is always safe"
    ],
    correctAnswer: [
      "Pointer arithmetic is scale-dependent on the type pointed to",
      "A void pointer can be assigned any pointer type without cast"
    ],
    explanation: "Refer to Pointers fundamentals.",
    subject: "C Programming",
    topic: "Pointers",
    difficulty: "medium",
    marks: 2,
    negativeMarks: 0
  },
  {
    questionText: "Consider the C function: int f(int n) { if (n <= 1) return 1; return f(n-1) + f(n-2); } What is f(6)?",
    type: "nat",
    options: [],
    correctAnswer: "13",
    explanation: "Refer to Recursion fundamentals.",
    subject: "C Programming",
    topic: "Recursion",
    difficulty: "medium",
    marks: 2,
    negativeMarks: 0
  },

  // ─── Data Structures ───────────────────────────────────────────
  {
    questionText: "Which data structure is used for BFS traversal of a graph?",
    type: "mcq",
    options: ["Stack", "Queue", "Heap", "Tree"],
    correctAnswer: "Queue",
    explanation: "Refer to Graphs (BFS, DFS) fundamentals.",
    subject: "Data Structures",
    topic: "Graphs (BFS, DFS)",
    difficulty: "easy",
    marks: 1,
    negativeMarks: 0.33
  },
  {
    questionText: "The worst-case time complexity of Quick Sort is:",
    type: "mcq",
    options: ["O(n log n)", "O(n²)", "O(n)", "O(log n)"],
    correctAnswer: "O(n²)",
    explanation: "Refer to Sorting Algorithms fundamentals.",
    subject: "Data Structures",
    topic: "Sorting Algorithms",
    difficulty: "medium",
    marks: 2,
    negativeMarks: 0.66
  },
  {
    questionText: "Which of the following statements about Binary Search Trees are TRUE?",
    type: "msq",
    options: [
      "Inorder traversal gives sorted sequence",
      "Worst-case search is O(log n) always",
      "A BST with n nodes has minimum height ⌊log₂n⌋",
      "Inserting sorted elements may create skewed tree"
    ],
    correctAnswer: [
      "Inorder traversal gives sorted sequence",
      "Inserting sorted elements may create skewed tree"
    ],
    explanation: "Refer to Trees (Binary, BST, AVL) fundamentals.",
    subject: "Data Structures",
    topic: "Trees (Binary, BST, AVL)",
    difficulty: "medium",
    marks: 2,
    negativeMarks: 0
  },
  {
    questionText: "The number of leaf nodes in a complete binary tree with 31 nodes is:",
    type: "nat",
    options: [],
    correctAnswer: "16",
    explanation: "Refer to Trees fundamentals.",
    subject: "Data Structures",
    topic: "Trees",
    difficulty: "easy",
    marks: 1,
    negativeMarks: 0
  },

  // ─── Engineering Mathematics ───────────────────────────────────
  {
    questionText: "If A is a 2×2 matrix with det(A) = 3, then det(2A) equals:",
    type: "mcq",
    options: ["6", "9", "12", "18"],
    correctAnswer: "12",
    explanation: "Refer to Linear Algebra fundamentals.",
    subject: "Engineering Mathematics",
    topic: "Linear Algebra",
    difficulty: "easy",
    marks: 1,
    negativeMarks: 0.33
  },
  {
    questionText: "The value of ∫₀¹ x·eˣ dx is:",
    type: "mcq",
    options: ["1", "e - 2", "e - 1", "2e - 1"],
    correctAnswer: "1",
    explanation: "Refer to Calculus fundamentals.",
    subject: "Engineering Mathematics",
    topic: "Calculus",
    difficulty: "medium",
    marks: 2,
    negativeMarks: 0.66
  },
  {
    questionText: "The trace of a 2×2 identity matrix is:",
    type: "mcq",
    options: ["0", "1", "2", "4"],
    correctAnswer: "2",
    explanation: "Trace is sum of diagonal entries: 1 + 1 = 2.",
    subject: "Engineering Mathematics",
    topic: "Linear Algebra",
    difficulty: "easy",
    marks: 2,
    negativeMarks: 0.66
  },
  {
    questionText: "Which of the following are properties of eigenvalues of a symmetric matrix?",
    type: "msq",
    options: [
      "All eigenvalues are real",
      "Eigenvectors corresponding to distinct eigenvalues are orthogonal",
      "All eigenvalues are positive",
      "The matrix is always diagonalizable"
    ],
    correctAnswer: [
      "All eigenvalues are real",
      "Eigenvectors corresponding to distinct eigenvalues are orthogonal",
      "The matrix is always diagonalizable"
    ],
    explanation: "Real symmetric matrices have real eigenvalues, orthogonal eigenvectors, and are diagonalizable.",
    subject: "Engineering Mathematics",
    topic: "Linear Algebra",
    difficulty: "hard",
    marks: 2,
    negativeMarks: 0
  },

  // ─── Discrete Mathematics ──────────────────────────────────────
  {
    questionText: "How many edges does a complete graph K₅ have?",
    type: "mcq",
    options: ["5", "10", "15", "20"],
    correctAnswer: "10",
    explanation: "Refer to Graph Theory fundamentals.",
    subject: "Discrete Mathematics",
    topic: "Graph Theory",
    difficulty: "easy",
    marks: 1,
    negativeMarks: 0.33
  },
  {
    questionText: "The number of binary relations on a set with 3 elements is:",
    type: "mcq",
    options: ["8", "64", "256", "512"],
    correctAnswer: "512",
    explanation: "Refer to Relations and Functions fundamentals.",
    subject: "Discrete Mathematics",
    topic: "Relations and Functions",
    difficulty: "easy",
    marks: 1,
    negativeMarks: 0.33
  },
  {
    questionText: "Which of the following logic equivalences are TRUE?",
    type: "mcq",
    options: ["p → q ≡ ¬p ∨ q", "p ↔ q ≡ (p → q) ∧ (q → p)", "¬(p ∧ q) ≡ ¬p ∧ ¬q", "p ∨ (q ∧ r) ≡ (p ∨ q) ∧ (p ∨ r)"],
    correctAnswer: [
      "p → q ≡ ¬p ∨ q",
      "p ↔ q ≡ (p → q) ∧ (q → p)",
      "p ∨ (q ∧ r) ≡ (p ∨ q) ∧ (p ∨ r)"
    ],
    explanation: "Refer to Propositional Logic fundamentals.",
    subject: "Discrete Mathematics",
    topic: "Propositional Logic",
    difficulty: "medium",
    marks: 1,
    negativeMarks: 0.33
  },
  {
    questionText: "The chromatic number of a tree with n > 1 vertices is:",
    type: "msq",
    options: ["1", "2", "3", "n"],
    correctAnswer: "2",
    explanation: "Refer to Graph Theory fundamentals.",
    subject: "Discrete Mathematics",
    topic: "Graph Theory",
    difficulty: "medium",
    marks: 2,
    negativeMarks: 0
  },
  {
    questionText: "The number of onto functions from a 4-element set to a 3-element set is:",
    type: "nat",
    options: [],
    correctAnswer: "36",
    explanation: "Refer to Combinatorics fundamentals.",
    subject: "Discrete Mathematics",
    topic: "Combinatorics",
    difficulty: "hard",
    marks: 2,
    negativeMarks: 0
  },

  // ─── Algorithms ────────────────────────────────────────────────
  {
    questionText: "Which algorithm design paradigm does Merge Sort use?",
    type: "mcq",
    options: ["Greedy", "Divide and Conquer", "Dynamic Programming", "Backtracking"],
    correctAnswer: "Divide and Conquer",
    explanation: "Refer to Divide and Conquer fundamentals.",
    subject: "Algorithms",
    topic: "Divide and Conquer",
    difficulty: "easy",
    marks: 1,
    negativeMarks: 0.33
  },
  {
    questionText: "Dijkstra's algorithm fails when:",
    type: "mcq",
    options: ["Graph is disconnected", "Graph has negative weight edges", "Graph is directed", "Graph has cycles"],
    correctAnswer: "Graph has negative weight edges",
    explanation: "Refer to Graph Algorithms fundamentals.",
    subject: "Algorithms",
    topic: "Graph Algorithms",
    difficulty: "medium",
    marks: 1,
    negativeMarks: 0.33
  },
  {
    questionText: "Which of the following problems can be solved using dynamic programming?",
    type: "mcq",
    options: ["Longest Common Subsequence", "Activity Selection", "Fractional Knapsack", "Huffman Coding"],
    correctAnswer: [
      "Longest Common Subsequence"
    ],
    explanation: "Refer to Dynamic Programming fundamentals.",
    subject: "Algorithms",
    topic: "Dynamic Programming",
    difficulty: "medium",
    marks: 2,
    negativeMarks: 0.66
  },
  {
    questionText: "The time complexity of Floyd-Warshall algorithm for all-pairs shortest paths on n vertices is:",
    type: "msq",
    options: ["O(n²)", "O(n² log n)", "O(n³)", "O(n⁴)"],
    correctAnswer: "O(n³)",
    explanation: "Refer to Graph Algorithms fundamentals.",
    subject: "Algorithms",
    topic: "Graph Algorithms",
    difficulty: "medium",
    marks: 2,
    negativeMarks: 0
  },
  {
    questionText: "In a min-heap of n elements, the index of the left child of node at index i (0-based) is:",
    type: "nat",
    options: [],
    correctAnswer: "2",
    explanation: "Refer to Heaps fundamentals.",
    subject: "Algorithms",
    topic: "Heaps",
    difficulty: "easy",
    marks: 2,
    negativeMarks: 0
  },

  // ─── DBMS ──────────────────────────────────────────────────────
  {
    questionText: "Which normal form eliminates partial dependency?",
    type: "mcq",
    options: ["1NF", "2NF", "3NF", "BCNF"],
    correctAnswer: "2NF",
    explanation: "Refer to Normalization fundamentals.",
    subject: "DBMS",
    topic: "Normalization",
    difficulty: "easy",
    marks: 1,
    negativeMarks: 0.33
  },
  {
    questionText: "Which SQL clause is used to filter groups?",
    type: "mcq",
    options: ["WHERE", "HAVING", "GROUP BY", "ORDER BY"],
    correctAnswer: "HAVING",
    explanation: "Refer to SQL fundamentals.",
    subject: "DBMS",
    topic: "SQL",
    difficulty: "easy",
    marks: 1,
    negativeMarks: 0.33
  },
  {
    questionText: "Which of the following are properties of ACID transactions?",
    type: "mcq",
    options: ["Atomicity", "Consistency", "Isolation", "Durability"],
    correctAnswer: [
      "Atomicity",
      "Consistency",
      "Isolation",
      "Durability"
    ],
    explanation: "Refer to Transaction Management fundamentals.",
    subject: "DBMS",
    topic: "Transaction Management",
    difficulty: "easy",
    marks: 2,
    negativeMarks: 0.66
  },
  {
    questionText: "In two-phase locking, a transaction in the growing phase:",
    type: "msq",
    options: ["Can acquire locks only", "Can release locks only", "Can do both", "Cannot acquire locks"],
    correctAnswer: "Can acquire locks only",
    explanation: "Refer to Concurrency Control fundamentals.",
    subject: "DBMS",
    topic: "Concurrency Control",
    difficulty: "medium",
    marks: 2,
    negativeMarks: 0
  },
  {
    questionText: "A B+ tree of order 5 can have at most how many keys in an internal node?",
    type: "nat",
    options: [],
    correctAnswer: "4",
    explanation: "Refer to Indexing and Hashing fundamentals.",
    subject: "DBMS",
    topic: "Indexing and Hashing",
    difficulty: "medium",
    marks: 1,
    negativeMarks: 0
  },

  // ─── Digital Logic ─────────────────────────────────────────────
  {
    questionText: "The 2's complement of the binary number 10110 is:",
    type: "mcq",
    options: ["01010", "01001", "11010", "00101"],
    correctAnswer: "01010",
    explanation: "Refer to Number Systems fundamentals.",
    subject: "Digital Logic",
    topic: "Number Systems",
    difficulty: "easy",
    marks: 1,
    negativeMarks: 0.33
  },
  {
    questionText: "How many flip-flops are required to design a MOD-10 counter?",
    type: "mcq",
    options: ["3", "4", "5", "10"],
    correctAnswer: "4",
    explanation: "Refer to Counters and Registers fundamentals.",
    subject: "Digital Logic",
    topic: "Counters and Registers",
    difficulty: "medium",
    marks: 2,
    negativeMarks: 0.66
  },
  {
    questionText: "Which of the following are universal gates?",
    type: "mcq",
    options: ["NAND", "NOR", "XOR", "AND"],
    correctAnswer: [
      "NAND",
      "NOR"
    ],
    explanation: "Refer to Logic Gates fundamentals.",
    subject: "Digital Logic",
    topic: "Logic Gates",
    difficulty: "easy",
    marks: 2,
    negativeMarks: 0.66
  },
  {
    questionText: "A half-adder has how many outputs?",
    type: "msq",
    options: ["1", "2", "3", "4"],
    correctAnswer: "2",
    explanation: "Refer to Combinational Circuits fundamentals.",
    subject: "Digital Logic",
    topic: "Combinational Circuits",
    difficulty: "easy",
    marks: 2,
    negativeMarks: 0
  },

  // ─── Operating Systems ─────────────────────────────────────────
  {
    questionText: "Which scheduling algorithm may cause starvation?",
    type: "mcq",
    options: ["FCFS", "Round Robin", "SJF", "Priority with aging"],
    correctAnswer: "SJF",
    explanation: "Refer to CPU Scheduling fundamentals.",
    subject: "Operating Systems",
    topic: "CPU Scheduling",
    difficulty: "easy",
    marks: 1,
    negativeMarks: 0.33
  },
  {
    questionText: "A process in the ready state is waiting for:",
    type: "mcq",
    options: ["CPU", "I/O", "Memory allocation", "Child process"],
    correctAnswer: "CPU",
    explanation: "Refer to Process Management fundamentals.",
    subject: "Operating Systems",
    topic: "Process Management",
    difficulty: "easy",
    marks: 2,
    negativeMarks: 0.66
  },
  {
    questionText: "Which of the following are necessary conditions for deadlock?",
    type: "mcq",
    options: ["Mutual exclusion", "Hold and wait", "No preemption", "Circular wait"],
    correctAnswer: [
      "Mutual exclusion",
      "Hold and wait",
      "No preemption",
      "Circular wait"
    ],
    explanation: "Refer to Deadlocks fundamentals.",
    subject: "Operating Systems",
    topic: "Deadlocks",
    difficulty: "medium",
    marks: 2,
    negativeMarks: 0.66
  },
  {
    questionText: "In paging, if page size is 4 KB and logical address is 32 bits, the number of bits for page offset is:",
    type: "msq",
    options: ["10", "12", "14", "16"],
    correctAnswer: "12",
    explanation: "Refer to Virtual Memory fundamentals.",
    subject: "Operating Systems",
    topic: "Virtual Memory",
    difficulty: "medium",
    marks: 2,
    negativeMarks: 0
  },
  {
    questionText: "Belady's anomaly is associated with which page replacement algorithm?",
    type: "nat",
    options: [],
    correctAnswer: "FIFO",
    explanation: "Refer to Memory Management fundamentals.",
    subject: "Operating Systems",
    topic: "Memory Management",
    difficulty: "medium",
    marks: 1,
    negativeMarks: 0
  },

  // ─── COA ───────────────────────────────────────────────────────
  {
    questionText: "In IEEE 754 single precision, how many bits are used for the exponent?",
    type: "mcq",
    options: ["8", "11", "23", "32"],
    correctAnswer: "8",
    explanation: "Refer to Number Representation fundamentals.",
    subject: "COA",
    topic: "Number Representation",
    difficulty: "easy",
    marks: 1,
    negativeMarks: 0.33
  },
  {
    questionText: "Which addressing mode is used in the instruction ADD R1, (R2)?",
    type: "mcq",
    options: ["Immediate", "Register", "Indirect", "Indexed"],
    correctAnswer: "Indirect",
    explanation: "Refer to Instruction Format fundamentals.",
    subject: "COA",
    topic: "Instruction Format",
    difficulty: "medium",
    marks: 1,
    negativeMarks: 0.33
  },
  {
    questionText: "Which of the following cause pipeline hazards?",
    type: "msq",
    options: ["Data dependency", "Control dependency", "Structural hazard", "Cache hit"],
    correctAnswer: [
      "Data dependency",
      "Control dependency",
      "Structural hazard"
    ],
    explanation: "Refer to Pipelining fundamentals.",
    subject: "COA",
    topic: "Pipelining",
    difficulty: "medium",
    marks: 2,
    negativeMarks: 0
  },
  {
    questionText: "A direct-mapped cache has 64 blocks and block size 32 bytes. The cache index field uses how many bits?",
    type: "msq",
    options: ["5", "6", "7", "8"],
    correctAnswer: "6",
    explanation: "Refer to Cache fundamentals.",
    subject: "COA",
    topic: "Cache",
    difficulty: "hard",
    marks: 2,
    negativeMarks: 0
  },
  {
    questionText: "If memory access time is 100 ns and cache hit ratio is 0.9 with cache access 10 ns, average access time in ns is:",
    type: "nat",
    options: [],
    correctAnswer: "19",
    explanation: "Refer to Cache fundamentals.",
    subject: "COA",
    topic: "Cache",
    difficulty: "hard",
    marks: 2,
    negativeMarks: 0
  },

  // ─── Computer Networks ─────────────────────────────────────────
  {
    questionText: "The default port number for HTTP is:",
    type: "mcq",
    options: ["21", "25", "80", "443"],
    correctAnswer: "80",
    explanation: "Refer to Application Layer (HTTP, DNS) fundamentals.",
    subject: "Computer Networks",
    topic: "Application Layer (HTTP, DNS)",
    difficulty: "easy",
    marks: 1,
    negativeMarks: 0.33
  },
  {
    questionText: "Which layer of the OSI model is responsible for routing?",
    type: "mcq",
    options: ["Data Link", "Network", "Transport", "Session"],
    correctAnswer: "Network",
    explanation: "Refer to OSI Model fundamentals.",
    subject: "Computer Networks",
    topic: "OSI Model",
    difficulty: "easy",
    marks: 1,
    negativeMarks: 0.33
  },
  {
    questionText: "In TCP, the 3-way handshake uses which flags?",
    type: "mcq",
    options: ["SYN, SYN-ACK, ACK", "SYN, ACK, FIN", "ACK, ACK, ACK", "SYN, FIN, ACK"],
    correctAnswer: "SYN, SYN-ACK, ACK",
    explanation: "Refer to Transport Layer (TCP, UDP) fundamentals.",
    subject: "Computer Networks",
    topic: "Transport Layer (TCP, UDP)",
    difficulty: "medium",
    marks: 1,
    negativeMarks: 0.33
  },
  {
    questionText: "Which of the following are characteristics of UDP?",
    type: "msq",
    options: ["Connectionless", "No guarantee of delivery", "Flow control", "Low overhead"],
    correctAnswer: [
      "Connectionless",
      "No guarantee of delivery",
      "Low overhead"
    ],
    explanation: "Refer to Transport Layer (TCP, UDP) fundamentals.",
    subject: "Computer Networks",
    topic: "Transport Layer (TCP, UDP)",
    difficulty: "medium",
    marks: 2,
    negativeMarks: 0
  },
  {
    questionText: "The subnet mask 255.255.255.192 allows how many usable host addresses per subnet?",
    type: "msq",
    options: ["30", "62", "126", "254"],
    correctAnswer: "62",
    explanation: "Refer to Network Layer (IP, Routing) fundamentals.",
    subject: "Computer Networks",
    topic: "Network Layer (IP, Routing)",
    difficulty: "medium",
    marks: 2,
    negativeMarks: 0
  },
  {
    questionText: "In CSMA/CD, the minimum frame size ensures collision detection within:",
    type: "nat",
    options: [],
    correctAnswer: "2",
    explanation: "Refer to Data Link Layer fundamentals.",
    subject: "Computer Networks",
    topic: "Data Link Layer",
    difficulty: "hard",
    marks: 1,
    negativeMarks: 0
  },

  // ─── Compiler Design ───────────────────────────────────────────
  {
    questionText: "The output of a lexical analyzer is:",
    type: "mcq",
    options: ["Parse tree", "Tokens", "Intermediate code", "Symbol table"],
    correctAnswer: "Tokens",
    explanation: "Refer to Lexical Analysis fundamentals.",
    subject: "Compiler Design",
    topic: "Lexical Analysis",
    difficulty: "easy",
    marks: 1,
    negativeMarks: 0.33
  },
  {
    questionText: "Which parsing technique handles left recursion in grammars?",
    type: "msq",
    options: ["Recursive descent", "LL(1)", "LR(1)", "Top-down predictive"],
    correctAnswer: "LR(1)",
    explanation: "Refer to Syntax Analysis (Parsing) fundamentals.",
    subject: "Compiler Design",
    topic: "Syntax Analysis (Parsing)",
    difficulty: "medium",
    marks: 2,
    negativeMarks: 0
  },
  {
    questionText: "In a basic block, the number of quadruples for a = b + c * d (with temporaries) is at least:",
    type: "nat",
    options: [],
    correctAnswer: "3",
    explanation: "Refer to Intermediate Code Generation fundamentals.",
    subject: "Compiler Design",
    topic: "Intermediate Code Generation",
    difficulty: "medium",
    marks: 2,
    negativeMarks: 0
  },

  // ─── TOC ───────────────────────────────────────────────────────
  {
    questionText: "The language {aⁿbⁿ | n ≥ 0} is:",
    type: "mcq",
    options: ["Regular", "Context-free but not regular", "Context-sensitive only", "Not recursively enumerable"],
    correctAnswer: "Context-free but not regular",
    explanation: "Refer to Context-Free Languages fundamentals.",
    subject: "TOC",
    topic: "Context-Free Languages",
    difficulty: "easy",
    marks: 1,
    negativeMarks: 0.33
  },
  {
    questionText: "The pumping lemma for regular languages is used to prove:",
    type: "mcq",
    options: ["A language is regular", "A language is not regular", "A language is context-free", "A language is decidable"],
    correctAnswer: "A language is not regular",
    explanation: "Refer to Regular Languages and FA fundamentals.",
    subject: "TOC",
    topic: "Regular Languages and FA",
    difficulty: "medium",
    marks: 1,
    negativeMarks: 0.33
  },
  {
    questionText: "Which of the following are decidable problems?",
    type: "msq",
    options: ["Emptiness of DFA", "Equivalence of two DFAs", "Emptiness of TM", "Halting problem"],
    correctAnswer: [
      "Emptiness of DFA",
      "Equivalence of two DFAs"
    ],
    explanation: "Refer to Decidability fundamentals.",
    subject: "TOC",
    topic: "Decidability",
    difficulty: "hard",
    marks: 2,
    negativeMarks: 0
  },
  {
    questionText: "The class NP is closed under:",
    type: "msq",
    options: ["Union", "Intersection", "Kleene star", "Complement"],
    correctAnswer: [
      "Union",
      "Intersection",
      "Kleene star"
    ],
    explanation: "NP is closed under union, intersection, and Kleene star; complement is not known to be closed.",
    subject: "TOC",
    topic: "Complexity Classes (P, NP)",
    difficulty: "medium",
    marks: 2,
    negativeMarks: 0
  },
  {
    questionText: "Minimum number of states in a DFA that accepts strings ending with '01' over {0,1} is:",
    type: "nat",
    options: [],
    correctAnswer: "3",
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
    id: 2,
    title: "Mock Test 2",
    questions: QUESTION_BANK
  }
];





