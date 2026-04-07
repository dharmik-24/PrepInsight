// Complete GATE CS Syllabus structured by subject and topics
const GATE_SYLLABUS = {
  'Data Structures': [
    'Arrays and Strings', 'Linked Lists', 'Stacks and Queues',
    'Trees (Binary, BST, AVL)', 'Heaps', 'Hashing',
    'Graphs (BFS, DFS)', 'Tries'
  ],
  'Algorithms': [
    'Sorting Algorithms', 'Searching Algorithms', 'Divide and Conquer',
    'Greedy Algorithms', 'Dynamic Programming', 'Graph Algorithms',
    'NP-Completeness', 'Backtracking', 'Complexity Analysis'
  ],
  'Operating Systems': [
    'Process Management', 'Threads and Concurrency', 'CPU Scheduling',
    'Memory Management', 'Virtual Memory', 'File Systems',
    'Deadlocks', 'Synchronization', 'I/O Systems'
  ],
  'DBMS': [
    'ER Model', 'Relational Model', 'SQL', 'Normalization',
    'Transaction Management', 'Concurrency Control',
    'Indexing and Hashing', 'Query Optimization'
  ],
  'Computer Networks': [
    'OSI Model', 'TCP/IP Model', 'Data Link Layer',
    'Network Layer (IP, Routing)', 'Transport Layer (TCP, UDP)',
    'Application Layer (HTTP, DNS)', 'Congestion Control',
    'Network Security Basics'
  ],
  'TOC': [
    'Regular Languages and FA', 'Regular Expressions',
    'Context-Free Languages', 'Pushdown Automata',
    'Turing Machines', 'Decidability', 'Complexity Classes (P, NP)'
  ],
  'Compiler Design': [
    'Lexical Analysis', 'Syntax Analysis (Parsing)',
    'LL and LR Parsers', 'Semantic Analysis',
    'Intermediate Code Generation', 'Code Optimization', 'Code Generation'
  ],
  'Digital Logic': [
    'Boolean Algebra', 'Logic Gates', 'Combinational Circuits',
    'Sequential Circuits', 'Flip-Flops', 'Counters and Registers',
    'Number Systems', 'K-Map Minimization'
  ],
  'Mathematics': [
    'Propositional Logic', 'Set Theory', 'Relations and Functions',
    'Graph Theory', 'Combinatorics', 'Probability',
    'Linear Algebra', 'Calculus', 'Numerical Methods'
  ],
  'General Aptitude': [
    'Verbal Ability', 'Quantitative Aptitude',
    'Analytical Reasoning', 'Data Interpretation'
  ]
};

// Sample questions following GATE pattern
// In production, expand this significantly per subject/topic
const QUESTION_BANK = [
  // ─── Data Structures ───────────────────────────────────────────
  {
    questionText: "What is the time complexity of searching in a balanced BST?",
    type: "mcq",
    options: ["O(1)", "O(log n)", "O(n)", "O(n log n)"],
    correctAnswer: "O(log n)",
    explanation: "In a balanced BST, height is O(log n), so search takes O(log n).",
    subject: "Data Structures", topic: "Trees (Binary, BST, AVL)", difficulty: "easy",
    marks: 1, negativeMarks: 0.33
  },
  {
    questionText: "Which data structure is used in BFS traversal?",
    type: "mcq",
    options: ["Stack", "Queue", "Priority Queue", "Deque"],
    correctAnswer: "Queue",
    explanation: "BFS uses a Queue to explore nodes level by level.",
    subject: "Data Structures", topic: "Graphs (BFS, DFS)", difficulty: "easy",
    marks: 1, negativeMarks: 0.33
  },
  {
    questionText: "In an AVL tree, after inserting a node causes imbalance with balance factor +2 at node X and +1 at its left child, which rotation is needed?",
    type: "mcq",
    options: ["Left Rotation", "Right Rotation", "Left-Right Rotation", "Right-Left Rotation"],
    correctAnswer: "Right Rotation",
    explanation: "LL imbalance (bf+2 at X, bf+1 at left child) requires a single Right Rotation.",
    subject: "Data Structures", topic: "Trees (Binary, BST, AVL)", difficulty: "medium",
    marks: 2, negativeMarks: 0.67
  },
  {
    questionText: "The number of distinct binary trees with 3 nodes is ___",
    type: "nat",
    options: [],
    correctAnswer: 5,
    explanation: "Catalan number C(3) = 5. There are 5 distinct binary trees with 3 nodes.",
    subject: "Data Structures", topic: "Trees (Binary, BST, AVL)", difficulty: "medium",
    marks: 2, negativeMarks: 0
  },
  // ─── Algorithms ────────────────────────────────────────────────
  {
    questionText: "Which of the following sorting algorithms are NOT comparison-based? (Select all that apply)",
    type: "msq",
    options: ["Merge Sort", "Counting Sort", "Radix Sort", "Quick Sort"],
    correctAnswer: ["Counting Sort", "Radix Sort"],
    explanation: "Counting Sort and Radix Sort work on integer keys without comparisons. They can achieve O(n) time.",
    subject: "Algorithms", topic: "Sorting Algorithms", difficulty: "medium",
    marks: 2, negativeMarks: 0
  },
  {
    questionText: "What is the worst-case time complexity of Quick Sort?",
    type: "mcq",
    options: ["O(n log n)", "O(n²)", "O(n)", "O(log n)"],
    correctAnswer: "O(n²)",
    explanation: "When the pivot is always the smallest or largest element (sorted/reverse sorted array), partitioning is unbalanced, leading to O(n²).",
    subject: "Algorithms", topic: "Sorting Algorithms", difficulty: "easy",
    marks: 1, negativeMarks: 0.33
  },
  {
    questionText: "The number of comparisons in the worst case for binary search on an array of 1024 elements is ___",
    type: "nat",
    options: [],
    correctAnswer: 10,
    explanation: "Binary search: ⌈log₂(1024)⌉ = ⌈10⌉ = 10 comparisons in worst case.",
    subject: "Algorithms", topic: "Searching Algorithms", difficulty: "medium",
    marks: 2, negativeMarks: 0
  },
  // ─── Operating Systems ─────────────────────────────────────────
  {
    questionText: "Which scheduling algorithm can lead to starvation?",
    type: "mcq",
    options: ["Round Robin", "FCFS", "Priority Scheduling", "SRTF"],
    correctAnswer: "Priority Scheduling",
    explanation: "In Priority Scheduling, a low-priority process may wait indefinitely if high-priority processes keep arriving — this is starvation.",
    subject: "Operating Systems", topic: "CPU Scheduling", difficulty: "easy",
    marks: 1, negativeMarks: 0.33
  },
  {
    questionText: "Which of the following are necessary conditions for a deadlock? (Select all)",
    type: "msq",
    options: ["Mutual Exclusion", "Hold and Wait", "No Preemption", "Circular Wait"],
    correctAnswer: ["Mutual Exclusion", "Hold and Wait", "No Preemption", "Circular Wait"],
    explanation: "All four Coffman conditions must hold simultaneously for a deadlock to occur.",
    subject: "Operating Systems", topic: "Deadlocks", difficulty: "medium",
    marks: 2, negativeMarks: 0
  },
  // ─── DBMS ──────────────────────────────────────────────────────
  {
    questionText: "A relation is in BCNF if and only if for every non-trivial FD X → Y, X is a ___",
    type: "mcq",
    options: ["Prime attribute", "Super key", "Foreign key", "Candidate key"],
    correctAnswer: "Super key",
    explanation: "BCNF requires that the left-hand side of every non-trivial functional dependency must be a superkey.",
    subject: "DBMS", topic: "Normalization", difficulty: "medium",
    marks: 2, negativeMarks: 0.67
  },
  // ─── TOC ───────────────────────────────────────────────────────
  {
    questionText: "Which of the following languages is NOT regular?",
    type: "mcq",
    options: [
      "L = {aⁿbⁿ | n ≥ 1}",
      "L = {a*b*}",
      "L = {w | w has even number of a's}",
      "L = {(ab)ⁿ | n ≥ 0}"
    ],
    correctAnswer: "L = {aⁿbⁿ | n ≥ 1}",
    explanation: "aⁿbⁿ requires counting and cannot be recognized by a finite automaton. By pumping lemma, it is not regular.",
    subject: "TOC", topic: "Regular Languages and FA", difficulty: "medium",
    marks: 2, negativeMarks: 0.67
  },
  // ─── Computer Networks ─────────────────────────────────────────
  {
    questionText: "Which layer of the OSI model is responsible for end-to-end error recovery and flow control?",
    type: "mcq",
    options: ["Network Layer", "Data Link Layer", "Transport Layer", "Session Layer"],
    correctAnswer: "Transport Layer",
    explanation: "The Transport Layer (Layer 4) provides end-to-end communication, error recovery, and flow control via protocols like TCP.",
    subject: "Computer Networks", topic: "OSI Model", difficulty: "easy",
    marks: 1, negativeMarks: 0.33
  }
];

module.exports = { QUESTION_BANK, GATE_SYLLABUS };