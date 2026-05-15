// Complete GATE CS Syllabus structured by subject and topics
const GATE_SYLLABUS = {
  'Data Structures': [
    'Arrays and Strings', 'Linked Lists', 'Stacks and Queues',
    'Trees (Binary, BST, AVL)', 'Heaps', 'Hashing',
    'Graphs (BFS, DFS)', 'Trees'
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
  'Engineering Mathematics': [
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
  // ─── Data Structures  ─────────────────────

  {
    questionText: "The minimum number of stacks needed to implement a queue is:",
    type: "mcq",
    options: ["1", "2", "3", "4"],
    correctAnswer: "2",
    explanation: "A queue can be implemented using two stacks.",
    subject: "Data Structures", topic: "Stacks and Queues", difficulty: "easy",
    marks: 1, negativeMarks: 0.33
  },

  {
    questionText: "Which traversal of a Binary Search Tree outputs the keys in sorted order?",
    type: "mcq",
    options: ["Preorder", "Postorder", "Inorder", "Level Order"],
    correctAnswer: "Inorder",
    explanation: "Inorder traversal of BST gives sorted output.",
    subject: "Data Structures", topic: "Trees (Binary, BST, AVL)", difficulty: "easy",
    marks: 1, negativeMarks: 0.33
  },

  {
    questionText: "The worst case time complexity of searching an element in a Binary Search Tree is:",
    type: "mcq",
    options: ["O(1)", "O(log n)", "O(n)", "O(n log n)"],
    correctAnswer: "O(n)",
    explanation: "In worst case BST can become skewed, making search linear.",
    subject: "Data Structures", topic: "Trees (Binary, BST, AVL)", difficulty: "medium",
    marks: 1, negativeMarks: 0.33
  },

  {
    questionText: "Which of the following data structures are used for Depth First Search traversal?",
    type: "msq",
    options: ["Stack", "Queue", "Recursion Stack", "Heap"],
    correctAnswer: ["Stack", "Recursion Stack"],
    explanation: "DFS uses stack explicitly or recursion call stack.",
    subject: "Data Structures", topic: "Graphs (BFS, DFS)", difficulty: "medium",
    marks: 1, negativeMarks: 0
  },

  {
    questionText: "A tree with 20 vertices has how many edges?",
    type: "nat",
    correctAnswer: "19",
    explanation: "A tree with n vertices has n-1 edges.",
    subject: "Data Structures", topic: "Graphs (BFS, DFS)", difficulty: "easy",
    marks: 1, negativeMarks: 0
  },

  {
    questionText: "The maximum number of nodes in a binary tree of height 3 is:",
    type: "mcq",
    options: ["7", "8", "15", "16"],
    correctAnswer: "15",
    explanation: "Maximum nodes = 2^(h+1)-1 = 15.",
    subject: "Data Structures", topic: "Trees (Binary, BST, AVL)", difficulty: "easy",
    marks: 2, negativeMarks: 0.66
  },

  {
    questionText: "Which of the following are collision resolution techniques in hashing?",
    type: "msq",
    options: ["Linear Probing", "Quadratic Probing", "Chaining", "Merging"],
    correctAnswer: ["Linear Probing", "Quadratic Probing", "Chaining"],
    explanation: "These are standard collision resolution methods.",
    subject: "Data Structures", topic: "Hashing", difficulty: "medium",
    marks: 2, negativeMarks: 0
  },

  {
    questionText: "The number of leaf nodes in a full binary tree with 7 internal nodes is:",
    type: "nat",
    correctAnswer: "8",
    explanation: "Leaf nodes = internal nodes + 1 in full binary tree.",
    subject: "Data Structures", topic: "Trees (Binary, BST, AVL)", difficulty: "medium",
    marks: 2, negativeMarks: 0
  },

  {
    questionText: "Which of the following traversals can uniquely construct a binary tree with distinct keys?",
    type: "msq",
    options: ["Preorder and Inorder", "Postorder and Inorder", "Preorder and Postorder", "Level Order and Inorder"],
    correctAnswer: ["Preorder and Inorder", "Postorder and Inorder", "Level Order and Inorder"],
    explanation: "Inorder with another valid traversal uniquely determines tree.",
    subject: "Data Structures", topic: "Trees (Binary, BST, AVL)", difficulty: "hard",
    marks: 2, negativeMarks: 0
  },

  {
    questionText: "A queue follows which ordering principle?",
    type: "mcq",
    options: ["LIFO", "FIFO", "Priority", "Random"],
    correctAnswer: "FIFO",
    explanation: "Queue follows First In First Out.",
    subject: "Data Structures", topic: "Stacks and Queues", difficulty: "easy",
    marks: 2, negativeMarks: 0.66
  },

  {
    questionText: "In a min heap, the minimum element is located at:",
    type: "mcq",
    options: ["Leaf Node", "Root", "Middle Level", "Last Node"],
    correctAnswer: "Root",
    explanation: "Heap property ensures minimum at root.",
    subject: "Data Structures", topic: "Heaps", difficulty: "easy",
    marks: 2, negativeMarks: 0.66
  },

  {
    questionText: "A complete binary tree with 31 nodes has height:",
    type: "nat",
    correctAnswer: "4",
    explanation: "31 = 2^5 -1, so height = 4 when root height = 0.",
    subject: "Data Structures", topic: "Trees (Binary, BST, AVL)", difficulty: "medium",
    marks: 2, negativeMarks: 0
  },

  {
    questionText: "Which of the following operations are supported efficiently using heap?",
    type: "msq",
    options: ["Find Min", "Insert", "Delete Min", "Binary Search"],
    correctAnswer: ["Find Min", "Insert", "Delete Min"],
    explanation: "Heap supports these priority queue operations efficiently.",
    subject: "Data Structures", topic: "Heaps", difficulty: "medium",
    marks: 2, negativeMarks: 0
  },

  {
    questionText: "If PUSH(10), PUSH(20), POP(), PUSH(30) are performed on empty stack, the top is:",
    type: "mcq",
    options: ["10", "20", "30", "Empty"],
    correctAnswer: "30",
    explanation: "20 is popped, then 30 becomes top.",
    subject: "Data Structures", topic: "Stacks and Queues", difficulty: "easy",
    marks: 2, negativeMarks: 0.66
  },

  {
    questionText: "The number of edges in a complete graph with 5 vertices is:",
    type: "nat",
    correctAnswer: "10",
    explanation: "Edges in complete graph = n(n-1)/2 = 10.",
    subject: "Data Structures", topic: "Graphs (BFS, DFS)", difficulty: "medium",
    marks: 2, negativeMarks: 0
  },
  


  

  
  // ─── Algorithms ────────────────────────────────────────────────
   {
    questionText: "What is the worst-case time complexity of Merge Sort on an array of n elements?",
    type: "mcq",
    options: ["O(n)", "O(n log n)", "O(log n)", "O(n²)"],
    correctAnswer: "O(n log n)",
    explanation: "Merge sort divides recursively and merges in linear time at each level.",
    subject: "Algorithms", topic: "Sorting Algorithms", difficulty: "easy",
    marks: 1, negativeMarks: 0.33
  },

  {
    questionText: "Which algorithm is based on Divide and Conquer paradigm?",
    type: "mcq",
    options: ["Merge Sort", "Bubble Sort", "Insertion Sort", "Selection Sort"],
    correctAnswer: "Merge Sort",
    explanation: "Merge sort recursively divides problem and combines solutions.",
    subject: "Algorithms", topic: "Divide and Conquer", difficulty: "easy",
    marks: 1, negativeMarks: 0.33
  },

  {
    questionText: "The worst-case time complexity of Quick Sort is:",
    type: "mcq",
    options: ["O(n)", "O(n log n)", "O(log n)", "O(n²)"],
    correctAnswer: "O(n²)",
    explanation: "Worst case occurs when pivot selection is poor repeatedly.",
    subject: "Algorithms", topic: "Sorting Algorithms", difficulty: "medium",
    marks: 1, negativeMarks: 0.33
  },

  {
    questionText: "Which of the following algorithms use greedy strategy?",
    type: "msq",
    options: ["Kruskal's Algorithm", "Prim's Algorithm", "Dijkstra's Algorithm", "Merge Sort"],
    correctAnswer: ["Kruskal's Algorithm", "Prim's Algorithm", "Dijkstra's Algorithm"],
    explanation: "These algorithms make locally optimal choices.",
    subject: "Algorithms", topic: "Greedy Algorithms", difficulty: "medium",
    marks: 1, negativeMarks: 0
  },

  {
    questionText: "How many comparisons are needed in binary search on 16 sorted elements in worst case?",
    type: "nat",
    correctAnswer: "5",
    explanation: "Worst case comparisons = log2(16) + 1 = 5.",
    subject: "Algorithms", topic: "Searching Algorithms", difficulty: "easy",
    marks: 1, negativeMarks: 0
  },

  {
    questionText: "The recurrence T(n)=2T(n/2)+n has asymptotic solution:",
    type: "mcq",
    options: ["O(log n)", "O(n)", "O(n log n)", "O(n²)"],
    correctAnswer: "O(n log n)",
    explanation: "By Master Theorem, a=2,b=2,f(n)=n gives O(n log n).",
    subject: "Algorithms", topic: "Complexity Analysis", difficulty: "medium",
    marks: 2, negativeMarks: 0.66
  },

  {
    questionText: "Which of the following problems are solved using dynamic programming?",
    type: "msq",
    options: ["Longest Common Subsequence", "Matrix Chain Multiplication", "0/1 Knapsack", "DFS Traversal"],
    correctAnswer: ["Longest Common Subsequence", "Matrix Chain Multiplication", "0/1 Knapsack"],
    explanation: "These have overlapping subproblems and optimal substructure.",
    subject: "Algorithms", topic: "Dynamic Programming", difficulty: "medium",
    marks: 2, negativeMarks: 0
  },

  {
    questionText: "Minimum number of comparisons required to find maximum element among 8 numbers is:",
    type: "nat",
    correctAnswer: "7",
    explanation: "Need n-1 comparisons to find maximum.",
    subject: "Algorithms", topic: "Searching Algorithms", difficulty: "easy",
    marks: 2, negativeMarks: 0
  },

  {
    questionText: "Which graph algorithm can detect negative weight cycle?",
    type: "mcq",
    options: ["Dijkstra", "Bellman-Ford", "Prim", "Kruskal"],
    correctAnswer: "Bellman-Ford",
    explanation: "Bellman-Ford detects negative cycles after V-1 relaxations.",
    subject: "Algorithms", topic: "Graph Algorithms", difficulty: "medium",
    marks: 2, negativeMarks: 0.66
  },

  {
    questionText: "Which of the following sorting algorithms are stable?",
    type: "msq",
    options: ["Merge Sort", "Bubble Sort", "Quick Sort", "Insertion Sort"],
    correctAnswer: ["Merge Sort", "Bubble Sort", "Insertion Sort"],
    explanation: "Quick sort is generally unstable.",
    subject: "Algorithms", topic: "Sorting Algorithms", difficulty: "hard",
    marks: 2, negativeMarks: 0
  },

  {
    questionText: "The number of leaf nodes in a complete binary recursion tree of Merge Sort on 8 elements is:",
    type: "nat",
    correctAnswer: "8",
    explanation: "Leaves correspond to single-element arrays.",
    subject: "Algorithms", topic: "Divide and Conquer", difficulty: "medium",
    marks: 2, negativeMarks: 0
  },

  {
    questionText: "Which algorithm gives shortest path in DAG in linear time?",
    type: "mcq",
    options: ["Bellman-Ford", "Dijkstra", "Topological ordering based method", "Floyd Warshall"],
    correctAnswer: "Topological ordering based method",
    explanation: "Relaxing edges in topological order solves shortest path in DAG in O(V+E).",
    subject: "Algorithms", topic: "Graph Algorithms", difficulty: "hard",
    marks: 2, negativeMarks: 0.66
  },

  {
    questionText: "If an algorithm has complexity O(n log n), then for n=8 and log base 2, n log n equals:",
    type: "nat",
    correctAnswer: "24",
    explanation: "8 x log2(8) = 8 x 3 = 24.",
    subject: "Algorithms", topic: "Complexity Analysis", difficulty: "easy",
    marks: 2, negativeMarks: 0
  },

  {
    questionText: "Which of the following problems are NP-Complete?",
    type: "msq",
    options: ["SAT", "Hamiltonian Cycle", "Travelling Salesman Decision Problem", "Merge Sort"],
    correctAnswer: ["SAT", "Hamiltonian Cycle", "Travelling Salesman Decision Problem"],
    explanation: "These are standard NP-Complete decision problems.",
    subject: "Algorithms", topic: "NP-Completeness", difficulty: "hard",
    marks: 2, negativeMarks: 0
  },

  {
    questionText: "The worst-case time complexity of Heap Sort is:",
    type: "mcq",
    options: ["O(n)", "O(n log n)", "O(log n)", "O(n²)"],
    correctAnswer: "O(n log n)",
    explanation: "Heap construction and repeated extraction take O(n log n).",
    subject: "Algorithms", topic: "Sorting Algorithms", difficulty: "medium",
    marks: 2, negativeMarks: 0.66
  },


  // ─── Operating Systems ─────────────────────────────────────────
  
  {
    questionText: "Which one of the following is not a CPU scheduling algorithm?",
    type: "mcq",
    options: ["FCFS", "SJF", "Round Robin", "LRU"],
    correctAnswer: "LRU",
    explanation: "LRU is a page replacement algorithm.",
    subject: "Operating Systems", topic: "CPU Scheduling", difficulty: "easy",
    marks: 1, negativeMarks: 0.33
  },

  {
    questionText: "A process waiting for CPU allocation is in which state?",
    type: "mcq",
    options: ["Running", "Ready", "Blocked", "Terminated"],
    correctAnswer: "Ready",
    explanation: "Ready state means process is waiting for CPU.",
    subject: "Operating Systems", topic: "Process Management", difficulty: "easy",
    marks: 1, negativeMarks: 0.33
  },

  {
    questionText: "The page replacement algorithm that may suffer Belady's anomaly is:",
    type: "mcq",
    options: ["FIFO", "LRU", "Optimal", "LFU"],
    correctAnswer: "FIFO",
    explanation: "Belady's anomaly is associated with FIFO.",
    subject: "Operating Systems", topic: "Memory Management", difficulty: "medium",
    marks: 1, negativeMarks: 0.33
  },

  {
    questionText: "Which of the following are necessary conditions for deadlock?",
    type: "msq",
    options: ["Mutual Exclusion", "Hold and Wait", "Circular Wait", "Preemption"],
    correctAnswer: ["Mutual Exclusion", "Hold and Wait", "Circular Wait"],
    explanation: "No preemption is required, not preemption.",
    subject: "Operating Systems", topic: "Deadlocks", difficulty: "medium",
    marks: 1, negativeMarks: 0
  },

  {
    questionText: "If page offset uses 10 bits, page size in bytes is:",
    type: "nat",
    correctAnswer: "1024",
    explanation: "Page size = 2^10 = 1024 bytes.",
    subject: "Operating Systems", topic: "Memory Management", difficulty: "easy",
    marks: 1, negativeMarks: 0
  },

  {
    questionText: "If time quantum in Round Robin scheduling becomes very large, it behaves like:",
    type: "mcq",
    options: ["SJF", "FCFS", "Priority", "Multilevel Queue"],
    correctAnswer: "FCFS",
    explanation: "Very large quantum lets each process finish before switching.",
    subject: "Operating Systems", topic: "CPU Scheduling", difficulty: "medium",
    marks: 2, negativeMarks: 0.66
  },

  {
    questionText: "Which of the following are synchronization mechanisms?",
    type: "msq",
    options: ["Semaphore", "Mutex", "Monitor", "Paging"],
    correctAnswer: ["Semaphore", "Mutex", "Monitor"],
    explanation: "Paging is memory management.",
    subject: "Operating Systems", topic: "Synchronization", difficulty: "medium",
    marks: 2, negativeMarks: 0
  },

  {
    questionText: "Thrashing occurs due to:",
    type: "mcq",
    options: ["High CPU utilization", "Excessive paging", "Deadlock", "Large cache"],
    correctAnswer: "Excessive paging",
    explanation: "System spends more time swapping pages than executing.",
    subject: "Operating Systems", topic: "Virtual Memory", difficulty: "medium",
    marks: 2, negativeMarks: 0.66
  },

  {
    questionText: "Number of possible safe sequences for 4 processes is:",
    type: "nat",
    correctAnswer: "24",
    explanation: "Maximum possible sequences = 4! = 24.",
    subject: "Operating Systems", topic: "Deadlocks", difficulty: "hard",
    marks: 2, negativeMarks: 0
  },

  {
    questionText: "Which scheduling algorithm can cause starvation?",
    type: "mcq",
    options: ["FCFS", "Round Robin", "Priority Scheduling", "FIFO"],
    correctAnswer: "Priority Scheduling",
    explanation: "Low priority processes may wait indefinitely.",
    subject: "Operating Systems", topic: "CPU Scheduling", difficulty: "medium",
    marks: 2, negativeMarks: 0.66
  },

  {
    questionText: "Which of the following statements about semaphores are true?",
    type: "msq",
    options: ["Used for synchronization", "Can solve critical section problem", "Always binary", "Use wait and signal"],
    correctAnswer: ["Used for synchronization", "Can solve critical section problem", "Use wait and signal"],
    explanation: "Semaphores may be binary or counting.",
    subject: "Operating Systems", topic: "Synchronization", difficulty: "medium",
    marks: 2, negativeMarks: 0
  },

  {
    questionText: "In a paging system, virtual address space has 64 pages. Number of page table entries required is:",
    type: "nat",
    correctAnswer: "64",
    explanation: "One page table entry per virtual page.",
    subject: "Operating Systems", topic: "Memory Management", difficulty: "easy",
    marks: 2, negativeMarks: 0
  },

  {
    questionText: "Which one of the following can detect negative resource allocation cycle in wait-for graph?",
    type: "mcq",
    options: ["Cycle Detection", "FIFO", "Paging", "Spooling"],
    correctAnswer: "Cycle Detection",
    explanation: "Cycle in wait-for graph indicates deadlock.",
    subject: "Operating Systems", topic: "Deadlocks", difficulty: "hard",
    marks: 2, negativeMarks: 0.66
  },

  {
    questionText: "If a system has 3 resource types, maximum need matrix is used in:",
    type: "mcq",
    options: ["Banker's Algorithm", "FIFO", "Round Robin", "LRU"],
    correctAnswer: "Banker's Algorithm",
    explanation: "Banker's algorithm uses Max, Allocation, Need matrices.",
    subject: "Operating Systems", topic: "Deadlocks", difficulty: "hard",
    marks: 2, negativeMarks: 0.66
  },

  {
    questionText: "A page reference string causes 9 faults under FIFO and 10 faults under LRU. This phenomenon is:",
    type: "mcq",
    options: ["Thrashing", "Belady's anomaly impossible case", "Normal possible case", "Deadlock"],
    correctAnswer: "Normal possible case",
    explanation: "LRU is not always fewer than FIFO for every reference string.",
    subject: "Operating Systems", topic: "Virtual Memory", difficulty: "hard",
    marks: 2, negativeMarks: 0.66
  },

  // ─── DBMS ──────────────────────────────────────────────────────
  {
    questionText: "Which normal form eliminates partial dependency?",
    type: "mcq",
    options: ["1NF", "2NF", "3NF", "BCNF"],
    correctAnswer: "2NF",
    explanation: "2NF removes partial dependency on composite keys.",
    subject: "DBMS", topic: "Normalization", difficulty: "easy",
    marks: 1, negativeMarks: 0.33
  },

  {
    questionText: "Which SQL clause is used to remove duplicate tuples from query result?",
    type: "mcq",
    options: ["UNIQUE", "DISTINCT", "DELETE", "ORDER BY"],
    correctAnswer: "DISTINCT",
    explanation: "DISTINCT removes duplicate rows in result set.",
    subject: "DBMS", topic: "SQL", difficulty: "easy",
    marks: 1, negativeMarks: 0.33
  },

  {
    questionText: "A foreign key in a relation references:",
    type: "mcq",
    options: ["Primary key of same relation", "Primary key of another relation", "Any attribute", "Candidate key only of same relation"],
    correctAnswer: "Primary key of another relation",
    explanation: "Foreign key references key attribute of another relation.",
    subject: "DBMS", topic: "Relational Model", difficulty: "easy",
    marks: 1, negativeMarks: 0.33
  },

  {
    questionText: "Which of the following are aggregate functions in SQL?",
    type: "msq",
    options: ["COUNT()", "SUM()", "AVG()", "ORDER BY"],
    correctAnswer: ["COUNT()", "SUM()", "AVG()"],
    explanation: "These compute aggregated values.",
    subject: "DBMS", topic: "SQL", difficulty: "easy",
    marks: 1, negativeMarks: 0
  },

  {
    questionText: "If relation R has 10 tuples and S has 20 tuples, maximum tuples in R × S is:",
    type: "nat",
    correctAnswer: "200",
    explanation: "Cartesian product size = 10 × 20.",
    subject: "DBMS", topic: "Relational Model", difficulty: "easy",
    marks: 1, negativeMarks: 0
  },

  {
    questionText: "Which normal form removes transitive dependency?",
    type: "mcq",
    options: ["1NF", "2NF", "3NF", "4NF"],
    correctAnswer: "3NF",
    explanation: "3NF removes transitive dependency.",
    subject: "DBMS", topic: "Normalization", difficulty: "medium",
    marks: 2, negativeMarks: 0.66
  },

  {
    questionText: "Which of the following are ACID properties of transactions?",
    type: "msq",
    options: ["Atomicity", "Consistency", "Isolation", "Dependency"],
    correctAnswer: ["Atomicity", "Consistency", "Isolation"],
    explanation: "ACID = Atomicity, Consistency, Isolation, Durability.",
    subject: "DBMS", topic: "Transaction Management", difficulty: "medium",
    marks: 2, negativeMarks: 0
  },

  {
    questionText: "The result of natural join between two relations always has number of tuples:",
    type: "mcq",
    options: ["Equal to sum of tuples", "Less than or equal to cartesian product", "Always equal", "Always zero"],
    correctAnswer: "Less than or equal to cartesian product",
    explanation: "Natural join is a filtered cartesian product.",
    subject: "DBMS", topic: "Relational Model", difficulty: "medium",
    marks: 2, negativeMarks: 0.66
  },

  {
    questionText: "A relation with 5 attributes has how many possible superkeys maximum?",
    type: "nat",
    correctAnswer: "31",
    explanation: "All non-empty subsets = 2^5 - 1 = 31.",
    subject: "DBMS", topic: "Relational Model", difficulty: "hard",
    marks: 2, negativeMarks: 0
  },

  {
    questionText: "Which concurrency control protocol can ensure conflict serializability?",
    type: "mcq",
    options: ["Two Phase Locking", "FCFS", "Paging", "Spooling"],
    correctAnswer: "Two Phase Locking",
    explanation: "2PL guarantees conflict serializable schedules.",
    subject: "DBMS", topic: "Concurrency Control", difficulty: "medium",
    marks: 2, negativeMarks: 0.66
  },

  {
    questionText: "Which of the following commands are DDL commands?",
    type: "msq",
    options: ["CREATE", "ALTER", "DROP", "SELECT"],
    correctAnswer: ["CREATE", "ALTER", "DROP"],
    explanation: "SELECT is DML/query command.",
    subject: "DBMS", topic: "SQL", difficulty: "medium",
    marks: 2, negativeMarks: 0
  },

  {
    questionText: "If a B+ tree of order m has root with 3 children, root contains how many keys?",
    type: "nat",
    correctAnswer: "2",
    explanation: "Internal node with k children contains k-1 keys.",
    subject: "DBMS", topic: "Indexing and Hashing", difficulty: "hard",
    marks: 2, negativeMarks: 0
  },

  {
    questionText: "Which schedule allows only one transaction to execute completely before another starts?",
    type: "mcq",
    options: ["Serial Schedule", "Concurrent Schedule", "Recoverable Schedule", "View Serializable"],
    correctAnswer: "Serial Schedule",
    explanation: "Transactions execute one after another in serial schedule.",
    subject: "DBMS", topic: "Transaction Management", difficulty: "medium",
    marks: 2, negativeMarks: 0.66
  },

  {
    questionText: "Which of the following anomalies occur in unnormalized relations?",
    type: "msq",
    options: ["Insertion anomaly", "Deletion anomaly", "Update anomaly", "Join anomaly"],
    correctAnswer: ["Insertion anomaly", "Deletion anomaly", "Update anomaly"],
    explanation: "These are common redundancy anomalies.",
    subject: "DBMS", topic: "Normalization", difficulty: "hard",
    marks: 2, negativeMarks: 0
  },

  {
    questionText: "A relation with 4 attributes can have maximum candidate keys equal to:",
    type: "nat",
    correctAnswer: "4",
    explanation: "Under suitable FD design, multiple minimal keys possible.",
    subject: "DBMS", topic: "ER Model", difficulty: "hard",
    marks: 2, negativeMarks: 0
  },


  // ─── TOC ───────────────────────────────────────────

  {
    questionText: "Which of the following machines accepts exactly regular languages?",
    type: "mcq",
    options: ["Finite Automata", "Pushdown Automata", "Turing Machine", "Linear Bounded Automata"],
    correctAnswer: "Finite Automata",
    explanation: "Finite automata recognize regular languages.",
    subject: "TOC", topic: "Regular Languages and FA", difficulty: "easy",
    marks: 1, negativeMarks: 0.33
  },

  {
    questionText: "Which grammar generates regular languages?",
    type: "mcq",
    options: ["Type 0", "Type 1", "Type 2", "Type 3"],
    correctAnswer: "Type 3",
    explanation: "Type 3 grammars are regular grammars.",
    subject: "TOC", topic: "Regular Languages and FA", difficulty: "easy",
    marks: 1, negativeMarks: 0.33
  },

  {
    questionText: "Which of the following language is accepted by a PDA but not by DFA?",
    type: "mcq",
    options: ["a*", "a+b+", "{a^n b^n | n ≥ 0}", "(ab)*"],
    correctAnswer: "{a^n b^n | n ≥ 0}",
    explanation: "Equal number of a's followed by b's is context-free but not regular.",
    subject: "TOC", topic: "Pushdown Automata", difficulty: "medium",
    marks: 1, negativeMarks: 0.33
  },

  {
    questionText: "Which of the following languages are regular?",
    type: "msq",
    options: ["(ab)*", "a*", "Strings ending with 01", "{a^n b^n | n≥0}"],
    correctAnswer: ["(ab)*", "a*", "Strings ending with 01"],
    explanation: "These can be recognized by finite automata.",
    subject: "TOC", topic: "Regular Languages and FA", difficulty: "easy",
    marks: 1, negativeMarks: 0
  },

  {
    questionText: "Minimum number of states required in DFA accepting binary strings divisible by 3 is:",
    type: "nat",
    correctAnswer: "3",
    explanation: "States represent remainders 0,1,2 modulo 3.",
    subject: "TOC", topic: "Regular Languages and FA", difficulty: "medium",
    marks: 1, negativeMarks: 0
  },

  {
    questionText: "Which of the following closure properties hold for regular languages?",
    type: "msq",
    options: ["Union", "Intersection", "Complement", "Difference"],
    correctAnswer: ["Union", "Intersection", "Complement", "Difference"],
    explanation: "Regular languages are closed under all these operations.",
    subject: "TOC", topic: "Regular Languages and FA", difficulty: "medium",
    marks: 2, negativeMarks: 0
  },

  {
    questionText: "The grammar S → aSb | ε generates:",
    type: "mcq",
    options: ["a*b*", "{a^n b^n | n≥0}", "(ab)*", "{a^n b^m | n,m≥0}"],
    correctAnswer: "{a^n b^n | n≥0}",
    explanation: "Each recursive step adds one a and one b.",
    subject: "TOC", topic: "Context-Free Languages", difficulty: "medium",
    marks: 2, negativeMarks: 0.66
  },

  {
    questionText: "Which of the following problems are undecidable?",
    type: "msq",
    options: ["Halting Problem", "Post Correspondence Problem", "DFA Emptiness", "TM Acceptance"],
    correctAnswer: ["Halting Problem", "Post Correspondence Problem"],
    explanation: "DFA emptiness is decidable.",
    subject: "TOC", topic: "Decidability", difficulty: "hard",
    marks: 2, negativeMarks: 0
  },

  {
    questionText: "If a DFA has n states, equivalent NFA can have at most how many states?",
    type: "nat",
    correctAnswer: "n",
    explanation: "Every DFA is already an NFA with same number of states.",
    subject: "TOC", topic: "Regular Languages and FA", difficulty: "medium",
    marks: 2, negativeMarks: 0
  },

  {
    questionText: "Which one of the following is true for every context-free language?",
    type: "mcq",
    options: ["Regular", "Accepted by PDA", "Decidable by DFA", "Finite"],
    correctAnswer: "Accepted by PDA",
    explanation: "Every CFL is accepted by some PDA.",
    subject: "TOC", topic: "Pushdown Automata", difficulty: "medium",
    marks: 2, negativeMarks: 0.66
  },

  {
    questionText: "Pumping lemma is mainly used to prove a language is:",
    type: "mcq",
    options: ["Regular", "Not regular", "Finite", "Decidable"],
    correctAnswer: "Not regular",
    explanation: "It is used to show contradiction if assumed regular.",
    subject: "TOC", topic: "Regular Expressions", difficulty: "medium",
    marks: 2, negativeMarks: 0.66
  },

  {
    questionText: "Number of productions in Chomsky Normal Form right side can contain maximum how many symbols?",
    type: "nat",
    correctAnswer: "2",
    explanation: "CNF productions are A→BC or A→a.",
    subject: "TOC", topic: "Context-Free Languages", difficulty: "hard",
    marks: 2, negativeMarks: 0
  },

  {
    questionText: "Which of the following classes satisfy P ⊆ NP?",
    type: "msq",
    options: ["P", "NP", "NP-Complete", "NP-Hard"],
    correctAnswer: ["P", "NP"],
    explanation: "P is a subset of NP.",
    subject: "TOC", topic: "Complexity Classes (P, NP)", difficulty: "hard",
    marks: 2, negativeMarks: 0
  },

  {
    questionText: "A language accepted by DFA and PDA must be:",
    type: "mcq",
    options: ["Regular", "Context Sensitive", "Recursive only", "Undecidable"],
    correctAnswer: "Regular",
    explanation: "Every regular language can be accepted by both DFA and PDA.",
    subject: "TOC", topic: "Regular Languages and FA", difficulty: "hard",
    marks: 2, negativeMarks: 0.66
  },

  {
    questionText: "For a DFA with 5 states over binary alphabet, total transitions are:",
    type: "nat",
    correctAnswer: "10",
    explanation: "Each state has 2 outgoing transitions. Total = 5 x 2 = 10.",
    subject: "TOC", topic: "Regular Languages and FA", difficulty: "easy",
    marks: 2, negativeMarks: 0
  },


  
  // ─── Computer Networks ───────────────────────────────────────────

  {
    questionText: "Which layer of the OSI model is responsible for routing?",
    type: "mcq",
    options: ["Data Link Layer", "Network Layer", "Transport Layer", "Session Layer"],
    correctAnswer: "Network Layer",
    explanation: "Routing is performed at the Network Layer.",
    subject: "Computer Networks", topic: "OSI Model", difficulty: "easy",
    marks: 1, negativeMarks: 0.33
  },

  {
    questionText: "Which protocol is connection-oriented?",
    type: "mcq",
    options: ["UDP", "IP", "TCP", "ARP"],
    correctAnswer: "TCP",
    explanation: "TCP establishes a connection before data transfer.",
    subject: "Computer Networks", topic: "Transport Layer (TCP, UDP)", difficulty: "easy",
    marks: 1, negativeMarks: 0.33
  },

  {
    questionText: "Which device operates at the Data Link Layer?",
    type: "mcq",
    options: ["Router", "Switch", "Hub", "Repeater"],
    correctAnswer: "Switch",
    explanation: "Switches primarily operate at Layer 2 using MAC addresses.",
    subject: "Computer Networks", topic: "Data Link Layer", difficulty: "easy",
    marks: 1, negativeMarks: 0.33
  },

  {
    questionText: "Which of the following are transport layer protocols?",
    type: "msq",
    options: ["TCP", "UDP", "IP", "SCTP"],
    correctAnswer: ["TCP", "UDP", "SCTP"],
    explanation: "TCP, UDP and SCTP belong to Transport Layer.",
    subject: "Computer Networks", topic: "Transport Layer (TCP, UDP)", difficulty: "easy",
    marks: 1, negativeMarks: 0
  },

  {
    questionText: "How many bits are there in an IPv4 address?",
    type: "nat",
    correctAnswer: "32",
    explanation: "IPv4 uses 32-bit addressing.",
    subject: "Computer Networks", topic: "Network Layer (IP, Routing)", difficulty: "easy",
    marks: 1, negativeMarks: 0
  },

  {
    questionText: "Which protocol translates domain names to IP addresses?",
    type: "mcq",
    options: ["HTTP", "FTP", "DNS", "SMTP"],
    correctAnswer: "DNS",
    explanation: "DNS resolves hostnames into IP addresses.",
    subject: "Computer Networks", topic: "Application Layer (HTTP, DNS)", difficulty: "medium",
    marks: 2, negativeMarks: 0.66
  },

  {
    questionText: "Which of the following are private IPv4 address ranges?",
    type: "msq",
    options: ["10.0.0.0/8", "172.16.0.0/12", "192.168.0.0/16", "8.8.8.0/24"],
    correctAnswer: ["10.0.0.0/8", "172.16.0.0/12", "192.168.0.0/16"],
    explanation: "These are standard private address ranges.",
    subject: "Computer Networks", topic: "Network Layer (IP, Routing)", difficulty: "medium",
    marks: 2, negativeMarks: 0
  },

  {
    questionText: "The default port number used by HTTP is:",
    type: "mcq",
    options: ["20", "21", "80", "443"],
    correctAnswer: "80",
    explanation: "HTTP uses port 80 by default.",
    subject: "Computer Networks", topic: "Application Layer (HTTP, DNS)", difficulty: "easy",
    marks: 2, negativeMarks: 0.66
  },

  {
    questionText: "How many usable host addresses are available in a /29 subnet?",
    type: "nat",
    correctAnswer: "6",
    explanation: "Total addresses = 8, usable = 8 - network - broadcast = 6.",
    subject: "Computer Networks", topic: "Network Layer (IP, Routing)", difficulty: "medium",
    marks: 2, negativeMarks: 0
  },

  {
    questionText: "Which protocol is used to map IP address to MAC address in IPv4?",
    type: "mcq",
    options: ["RARP", "ARP", "ICMP", "DHCP"],
    correctAnswer: "ARP",
    explanation: "ARP resolves IPv4 addresses to MAC addresses.",
    subject: "Computer Networks", topic: "Data Link Layer", difficulty: "medium",
    marks: 2, negativeMarks: 0.66
  },

  {
    questionText: "Which of the following are congestion control mechanisms in TCP?",
    type: "msq",
    options: ["Slow Start", "Congestion Avoidance", "Fast Retransmit", "Token Passing"],
    correctAnswer: ["Slow Start", "Congestion Avoidance", "Fast Retransmit"],
    explanation: "These are TCP congestion control techniques.",
    subject: "Computer Networks", topic: "Congestion Control", difficulty: "hard",
    marks: 2, negativeMarks: 0
  },

  {
    questionText: "If propagation delay is 20 ms one-way, RTT is:",
    type: "nat",
    correctAnswer: "40",
    explanation: "Round Trip Time = 2 × one-way delay = 40 ms.",
    subject: "Computer Networks", topic: "TCP/IP Model", difficulty: "medium",
    marks: 2, negativeMarks: 0
  },

  {
    questionText: "Which protocol does ping use?",
    type: "mcq",
    options: ["TCP", "UDP", "ICMP", "ARP"],
    correctAnswer: "ICMP",
    explanation: "Ping uses ICMP echo request/reply messages.",
    subject: "Computer Networks", topic: "Network Layer (IP, Routing)", difficulty: "medium",
    marks: 2, negativeMarks: 0.66
  },

  {
    questionText: "Which of the following are application layer protocols?",
    type: "msq",
    options: ["HTTP", "SMTP", "FTP", "IP"],
    correctAnswer: ["HTTP", "SMTP", "FTP"],
    explanation: "IP belongs to Network Layer.",
    subject: "Computer Networks", topic: "Application Layer (HTTP, DNS)", difficulty: "medium",
    marks: 2, negativeMarks: 0
  },

  {
    questionText: "How many bits are there in a MAC address?",
    type: "nat",
    correctAnswer: "48",
    explanation: "Standard MAC addresses are 48 bits long.",
    subject: "Computer Networks", topic: "Data Link Layer", difficulty: "easy",
    marks: 2, negativeMarks: 0
  },

  
  // ─── Compiler Design ───────────────────────────────────────────

  {
    questionText: "Which phase of compiler removes white spaces and comments?",
    type: "mcq",
    options: ["Lexical Analysis", "Syntax Analysis", "Semantic Analysis", "Code Generation"],
    correctAnswer: "Lexical Analysis",
    explanation: "Lexical analyzer scans source code and removes delimiters/comments.",
    subject: "Compiler Design", topic: "Lexical Analysis", difficulty: "easy",
    marks: 1, negativeMarks: 0.33
  },

  {
    questionText: "Which parser uses top-down parsing technique?",
    type: "mcq",
    options: ["LR Parser", "SLR Parser", "LL Parser", "LALR Parser"],
    correctAnswer: "LL Parser",
    explanation: "LL parsers are predictive top-down parsers.",
    subject: "Compiler Design", topic: "LL and LR Parsers", difficulty: "easy",
    marks: 1, negativeMarks: 0.33
  },

  {
    questionText: "The output of lexical analyzer is a stream of:",
    type: "mcq",
    options: ["Tokens", "Parse Trees", "Assembly Code", "Symbol Tables"],
    correctAnswer: "Tokens",
    explanation: "Lexer groups lexemes into tokens.",
    subject: "Compiler Design", topic: "Lexical Analysis", difficulty: "easy",
    marks: 1, negativeMarks: 0.33
  },

  {
    questionText: "Which of the following are forms of intermediate code?",
    type: "msq",
    options: ["Three Address Code", "Quadruples", "Triples", "DFA"],
    correctAnswer: ["Three Address Code", "Quadruples", "Triples"],
    explanation: "These are common intermediate representations.",
    subject: "Compiler Design", topic: "Intermediate Code Generation", difficulty: "easy",
    marks: 1, negativeMarks: 0
  },

  {
    questionText: "How many states are there in DFA recognizing binary strings ending with 01?",
    type: "nat",
    correctAnswer: "3",
    explanation: "Minimum DFA requires 3 states.",
    subject: "Compiler Design", topic: "Lexical Analysis", difficulty: "medium",
    marks: 1, negativeMarks: 0
  },

  {
    questionText: "Which parsing method is more powerful?",
    type: "mcq",
    options: ["LL(1)", "Recursive Descent", "LR(1)", "Operator Precedence"],
    correctAnswer: "LR(1)",
    explanation: "LR(1) can handle larger class of grammars.",
    subject: "Compiler Design", topic: "LL and LR Parsers", difficulty: "medium",
    marks: 2, negativeMarks: 0.66
  },

  {
    questionText: "Which of the following are compiler optimization techniques?",
    type: "msq",
    options: ["Constant Folding", "Dead Code Elimination", "Loop Unrolling", "Tokenization"],
    correctAnswer: ["Constant Folding", "Dead Code Elimination", "Loop Unrolling"],
    explanation: "These improve generated code performance.",
    subject: "Compiler Design", topic: "Code Optimization", difficulty: "medium",
    marks: 2, negativeMarks: 0
  },

  {
    questionText: "The grammar E → E + T | T is:",
    type: "mcq",
    options: ["Right Recursive", "Left Recursive", "Ambiguous only", "Regular"],
    correctAnswer: "Left Recursive",
    explanation: "Production begins with same non-terminal E.",
    subject: "Compiler Design", topic: "Syntax Analysis (Parsing)", difficulty: "medium",
    marks: 2, negativeMarks: 0.66
  },

  {
    questionText: "For n identifiers in symbol table using hashing, expected search time is:",
    type: "nat",
    correctAnswer: "1",
    explanation: "Average expected search is O(1).",
    subject: "Compiler Design", topic: "Semantic Analysis", difficulty: "medium",
    marks: 2, negativeMarks: 0
  },

  {
    questionText: "Which data structure is commonly used for recursive descent parsing?",
    type: "mcq",
    options: ["Queue", "Stack", "Heap", "Graph"],
    correctAnswer: "Stack",
    explanation: "Function calls implicitly use recursion stack.",
    subject: "Compiler Design", topic: "Syntax Analysis (Parsing)", difficulty: "medium",
    marks: 2, negativeMarks: 0.66
  },

  {
    questionText: "Which of the following errors are detected during semantic analysis?",
    type: "msq",
    options: ["Type mismatch", "Undeclared variable", "Missing semicolon", "Multiple declaration conflict"],
    correctAnswer: ["Type mismatch", "Undeclared variable", "Multiple declaration conflict"],
    explanation: "Missing semicolon is syntax error.",
    subject: "Compiler Design", topic: "Semantic Analysis", difficulty: "hard",
    marks: 2, negativeMarks: 0
  },

  {
    questionText: "If a basic block has 5 statements, maximum leaders possible are:",
    type: "nat",
    correctAnswer: "5",
    explanation: "Every statement may become leader in worst case.",
    subject: "Compiler Design", topic: "Code Optimization", difficulty: "hard",
    marks: 2, negativeMarks: 0
  },

  {
    questionText: "Shift-reduce conflict occurs in:",
    type: "mcq",
    options: ["LR Parsing", "Lexical Analysis", "Code Generation", "Linking"],
    correctAnswer: "LR Parsing",
    explanation: "Parser table ambiguity may create shift-reduce conflict.",
    subject: "Compiler Design", topic: "LL and LR Parsers", difficulty: "hard",
    marks: 2, negativeMarks: 0.66
  },

  {
    questionText: "Which of the following parser types are bottom-up parsers?",
    type: "msq",
    options: ["SLR", "LALR", "CLR", "LL(1)"],
    correctAnswer: ["SLR", "LALR", "CLR"],
    explanation: "LL(1) is top-down parser.",
    subject: "Compiler Design", topic: "LL and LR Parsers", difficulty: "hard",
    marks: 2, negativeMarks: 0
  },

  {
    questionText: "The number of registers required for evaluating a balanced binary expression tree of height 3 is:",
    type: "nat",
    correctAnswer: "4",
    explanation: "Register need follows tree height + scheduling.",
    subject: "Compiler Design", topic: "Code Generation", difficulty: "hard",
    marks: 2, negativeMarks: 0
  },


  // ─── C Programming ───────────────────────────────────────────

  {
    questionText: "Which of the following is a valid C data type?",
    type: "mcq",
    options: ["real", "integer", "float", "decimal"],
    correctAnswer: "float",
    explanation: "float is a standard built-in data type in C.",
    subject: "C Programming", topic: "Basics of C (Data Types, Operators)", difficulty: "easy",
    marks: 1, negativeMarks: 0.33
  },

  {
    questionText: "What is the output of printf(\"%d\", 5/2); in C?",
    type: "mcq",
    options: ["2", "2.5", "3", "Compilation Error"],
    correctAnswer: "2",
    explanation: "Integer division truncates fractional part.",
    subject: "C Programming", topic: "Basics of C (Data Types, Operators)", difficulty: "easy",
    marks: 1, negativeMarks: 0.33
  },

  {
    questionText: "Which operator is used to access value at an address through pointer?",
    type: "mcq",
    options: ["&", "*", "%", "->"],
    correctAnswer: "*",
    explanation: "* is dereference operator.",
    subject: "C Programming", topic: "Pointers", difficulty: "easy",
    marks: 1, negativeMarks: 0.33
  },

  {
    questionText: "Which of the following are loop constructs in C?",
    type: "msq",
    options: ["for", "while", "do-while", "repeat-until"],
    correctAnswer: ["for", "while", "do-while"],
    explanation: "repeat-until is not part of standard C.",
    subject: "C Programming", topic: "Control Flow (if/else, loops, switch)", difficulty: "easy",
    marks: 1, negativeMarks: 0
  },

  {
    questionText: "How many bytes are allocated for char in C?",
    type: "nat",
    correctAnswer: "1",
    explanation: "char occupies 1 byte.",
    subject: "C Programming", topic: "Basics of C (Data Types, Operators)", difficulty: "easy",
    marks: 1, negativeMarks: 0
  },

  {
    questionText: "What is the output of strlen(\"GATE\")?",
    type: "mcq",
    options: ["3", "4", "5", "Compilation Error"],
    correctAnswer: "4",
    explanation: "strlen counts characters excluding null terminator.",
    subject: "C Programming", topic: "Arrays and Strings in C", difficulty: "medium",
    marks: 2, negativeMarks: 0.66
  },

  {
    questionText: "Which of the following memory allocation functions are available in C?",
    type: "msq",
    options: ["malloc()", "calloc()", "realloc()", "delete()"],
    correctAnswer: ["malloc()", "calloc()", "realloc()"],
    explanation: "delete() belongs to C++, not C.",
    subject: "C Programming", topic: "Dynamic Memory Allocation", difficulty: "medium",
    marks: 2, negativeMarks: 0
  },

  {
    questionText: "If int a[5]; then expression *(a+2) refers to:",
    type: "mcq",
    options: ["a[0]", "a[1]", "a[2]", "a[3]"],
    correctAnswer: "a[2]",
    explanation: "Pointer arithmetic moves to third element.",
    subject: "C Programming", topic: "Pointers", difficulty: "medium",
    marks: 2, negativeMarks: 0.66
  },

  {
    questionText: "If recursion function is called 5 times before returning, maximum stack frames active are:",
    type: "nat",
    correctAnswer: "5",
    explanation: "Each recursive call creates one stack frame.",
    subject: "C Programming", topic: "Functions and Recursion", difficulty: "medium",
    marks: 2, negativeMarks: 0
  },

  {
    questionText: "Which keyword prevents modification of variable value?",
    type: "mcq",
    options: ["volatile", "register", "const", "static"],
    correctAnswer: "const",
    explanation: "const declares read-only variable.",
    subject: "C Programming", topic: "Basics of C (Data Types, Operators)", difficulty: "medium",
    marks: 2, negativeMarks: 0.66
  },

  {
    questionText: "Which of the following are valid storage classes in C?",
    type: "msq",
    options: ["auto", "register", "static", "public"],
    correctAnswer: ["auto", "register", "static"],
    explanation: "public is not a C storage class.",
    subject: "C Programming", topic: "Basics of C (Data Types, Operators)", difficulty: "hard",
    marks: 2, negativeMarks: 0
  },

  {
    questionText: "If int x = 10; int *p = &x; then value of *p + 5 is:",
    type: "nat",
    correctAnswer: "15",
    explanation: "*p gives 10, then add 5.",
    subject: "C Programming", topic: "Pointers", difficulty: "easy",
    marks: 2, negativeMarks: 0
  },

  {
    questionText: "Which function is used to open a file in C?",
    type: "mcq",
    options: ["open()", "fileopen()", "fopen()", "create()"],
    correctAnswer: "fopen()",
    explanation: "fopen() opens a file stream.",
    subject: "C Programming", topic: "File Handling", difficulty: "medium",
    marks: 2, negativeMarks: 0.66
  },

  {
    questionText: "Which of the following statements about arrays in C are true?",
    type: "msq",
    options: ["Array indexing starts from 0", "Array size must always be runtime input", "Array elements are contiguous", "Array name can decay to pointer"],
    correctAnswer: ["Array indexing starts from 0", "Array elements are contiguous", "Array name can decay to pointer"],
    explanation: "Arrays need not always have runtime size.",
    subject: "C Programming", topic: "Arrays and Strings in C", difficulty: "hard",
    marks: 2, negativeMarks: 0
  },

  {
    questionText: "For a string \"ABC\", including null character, total memory bytes required is:",
    type: "nat",
    correctAnswer: "4",
    explanation: "3 characters + 1 null terminator.",
    subject: "C Programming", topic: "Arrays and Strings in C", difficulty: "medium",
    marks: 2, negativeMarks: 0
  },


  // ─── Discrete Maths ───────────────────────────────────────────

  {
    questionText: "If A has m elements and B has n elements, number of elements in A × B is:",
    type: "mcq",
    options: ["m + n", "m × n", "m - n", "m / n"],
    correctAnswer: "m × n",
    explanation: "Cartesian product contains ordered pairs from A and B.",
    subject: "Discrete Mathematics", topic: "Sets, Relations and Functions", difficulty: "easy",
    marks: 1, negativeMarks: 0.33
  },

  {
    questionText: "The negation of proposition p ∧ q is:",
    type: "mcq",
    options: ["¬p ∧ ¬q", "¬p ∨ ¬q", "p ∨ q", "p → q"],
    correctAnswer: "¬p ∨ ¬q",
    explanation: "By De Morgan’s law.",
    subject: "Discrete Mathematics", topic: "Propositional and Predicate Logic", difficulty: "easy",
    marks: 1, negativeMarks: 0.33
  },

  {
    questionText: "How many subsets does a set with 3 elements have?",
    type: "mcq",
    options: ["3", "6", "8", "9"],
    correctAnswer: "8",
    explanation: "A set with n elements has 2^n subsets.",
    subject: "Discrete Mathematics", topic: "Sets, Relations and Functions", difficulty: "easy",
    marks: 1, negativeMarks: 0.33
  },

  {
    questionText: "Which of the following relations are always reflexive?",
    type: "msq",
    options: ["≤ on integers", "= on integers", "< on integers", "⊆ on power set"],
    correctAnswer: ["≤ on integers", "= on integers", "⊆ on power set"],
    explanation: "Strictly less than is not reflexive.",
    subject: "Discrete Mathematics", topic: "Sets, Relations and Functions", difficulty: "easy",
    marks: 1, negativeMarks: 0
  },

  {
    questionText: "Number of edges in a complete graph with 5 vertices is:",
    type: "nat",
    correctAnswer: "10",
    explanation: "Edges in Kn = n(n-1)/2 = 5×4/2.",
    subject: "Discrete Mathematics", topic: "Graph Theory Basics", difficulty: "easy",
    marks: 1, negativeMarks: 0
  },

  {
    questionText: "The number of onto functions from a 2-element set to a 2-element set is:",
    type: "mcq",
    options: ["1", "2", "3", "4"],
    correctAnswer: "2",
    explanation: "Only bijections are onto here: 2! = 2.",
    subject: "Discrete Mathematics", topic: "Sets, Relations and Functions", difficulty: "medium",
    marks: 2, negativeMarks: 0.66
  },

  {
    questionText: "Which of the following statements are tautologies?",
    type: "msq",
    options: ["p ∨ ¬p", "p ∧ ¬p", "(p→q)∨(q→p)", "p↔¬p"],
    correctAnswer: ["p ∨ ¬p", "(p→q)∨(q→p)"],
    explanation: "These are always true.",
    subject: "Discrete Mathematics", topic: "Propositional and Predicate Logic", difficulty: "medium",
    marks: 2, negativeMarks: 0
  },

  {
    questionText: "How many binary strings of length 4 exist?",
    type: "mcq",
    options: ["4", "8", "16", "32"],
    correctAnswer: "16",
    explanation: "Each position has 2 choices: 2^4.",
    subject: "Discrete Mathematics", topic: "Combinatorics", difficulty: "medium",
    marks: 2, negativeMarks: 0.66
  },

  {
    questionText: "If recurrence T(n)=T(n-1)+1 with T(1)=1, then T(5) is:",
    type: "nat",
    correctAnswer: "5",
    explanation: "Sequence becomes 1,2,3,4,5.",
    subject: "Discrete Mathematics", topic: "Recurrence Relations", difficulty: "medium",
    marks: 2, negativeMarks: 0
  },

  {
    questionText: "In any tree with n vertices, number of edges is:",
    type: "mcq",
    options: ["n", "n-1", "n+1", "2n"],
    correctAnswer: "n-1",
    explanation: "Basic property of trees.",
    subject: "Discrete Mathematics", topic: "Graph Theory Basics", difficulty: "medium",
    marks: 2, negativeMarks: 0.66
  },

  {
    questionText: "Which of the following graphs are bipartite?",
    type: "msq",
    options: ["Tree", "Cycle of length 4", "Cycle of length 5", "Complete graph K2,3"],
    correctAnswer: ["Tree", "Cycle of length 4", "Complete graph K2,3"],
    explanation: "Odd cycle graph is not bipartite.",
    subject: "Discrete Mathematics", topic: "Graph Theory Basics", difficulty: "hard",
    marks: 2, negativeMarks: 0
  },

  {
    questionText: "Number of permutations of letters in word GATE is:",
    type: "nat",
    correctAnswer: "24",
    explanation: "All letters distinct: 4! = 24.",
    subject: "Discrete Mathematics", topic: "Combinatorics", difficulty: "easy",
    marks: 2, negativeMarks: 0
  },

  {
    questionText: "The maximum number of edges in a simple graph with 6 vertices is:",
    type: "mcq",
    options: ["12", "15", "18", "30"],
    correctAnswer: "15",
    explanation: "Maximum edges = n(n-1)/2.",
    subject: "Discrete Mathematics", topic: "Graph Theory Basics", difficulty: "hard",
    marks: 2, negativeMarks: 0.66
  },

  {
    questionText: "Which of the following are equivalence relation properties?",
    type: "msq",
    options: ["Reflexive", "Symmetric", "Transitive", "Antisymmetric"],
    correctAnswer: ["Reflexive", "Symmetric", "Transitive"],
    explanation: "Equivalence relation requires these three.",
    subject: "Discrete Mathematics", topic: "Sets, Relations and Functions", difficulty: "medium",
    marks: 2, negativeMarks: 0
  },

  {
    questionText: "If probability of event A is 0.7, probability of complement of A is:",
    type: "nat",
    correctAnswer: "0.3",
    explanation: "P(A') = 1 - P(A).",
    subject: "Discrete Mathematics", topic: "Combinatorics", difficulty: "easy",
    marks: 2, negativeMarks: 0
  },


  // ─── COA ───────────────────────────────────────────

  {
    questionText: "1 KB is equal to how many bytes?",
    type: "mcq",
    options: ["1000", "1024", "512", "2048"],
    correctAnswer: "1024",
    explanation: "1 KB = 2^10 bytes.",
    subject: "COA", topic: "Memory Hierarchy", difficulty: "easy",
    marks: 1, negativeMarks: 0.33
  },

  {
    questionText: "Which number system uses base 16?",
    type: "mcq",
    options: ["Binary", "Decimal", "Hexadecimal", "Octal"],
    correctAnswer: "Hexadecimal",
    explanation: "Hexadecimal uses digits 0-9 and A-F.",
    subject: "COA", topic: "Number Representation", difficulty: "easy",
    marks: 1, negativeMarks: 0.33
  },

  {
    questionText: "Which register holds address of next instruction?",
    type: "mcq",
    options: ["IR", "MAR", "PC", "MDR"],
    correctAnswer: "PC",
    explanation: "Program Counter stores next instruction address.",
    subject: "COA", topic: "Processor Organization", difficulty: "easy",
    marks: 1, negativeMarks: 0.33
  },

  {
    questionText: "Which of the following are secondary storage devices?",
    type: "msq",
    options: ["Hard Disk", "SSD", "RAM", "CD-ROM"],
    correctAnswer: ["Hard Disk", "SSD", "CD-ROM"],
    explanation: "RAM is primary memory.",
    subject: "COA", topic: "Memory Hierarchy", difficulty: "easy",
    marks: 1, negativeMarks: 0
  },

  {
    questionText: "How many bits are there in one nibble?",
    type: "nat",
    correctAnswer: "4",
    explanation: "Nibble = 4 bits.",
    subject: "COA", topic: "Number Representation", difficulty: "easy",
    marks: 1, negativeMarks: 0
  },

  {
    questionText: "Two's complement of binary 1010 is:",
    type: "mcq",
    options: ["0110", "0101", "1011", "1110"],
    correctAnswer: "0110",
    explanation: "Invert bits → 0101, add 1 → 0110.",
    subject: "COA", topic: "Computer Arithmetic", difficulty: "medium",
    marks: 2, negativeMarks: 0.66
  },

  {
    questionText: "Which of the following are addressing modes?",
    type: "msq",
    options: ["Immediate", "Direct", "Indirect", "Sequential"],
    correctAnswer: ["Immediate", "Direct", "Indirect"],
    explanation: "Sequential is not an addressing mode.",
    subject: "COA", topic: "Processor Organization", difficulty: "medium",
    marks: 2, negativeMarks: 0
  },

  {
    questionText: "Cache memory is used to:",
    type: "mcq",
    options: ["Increase disk size", "Reduce average memory access time", "Increase CPU clock", "Store backups"],
    correctAnswer: "Reduce average memory access time",
    explanation: "Cache bridges CPU-memory speed gap.",
    subject: "COA", topic: "Memory Hierarchy", difficulty: "medium",
    marks: 2, negativeMarks: 0.66
  },

  {
    questionText: "How many addresses can be generated using 16 address lines?",
    type: "nat",
    correctAnswer: "65536",
    explanation: "2^16 addresses.",
    subject: "COA", topic: "I/O Organization", difficulty: "medium",
    marks: 2, negativeMarks: 0
  },

  {
    questionText: "Pipeline improves:",
    type: "mcq",
    options: ["Instruction throughput", "Instruction size", "Memory size", "Word length"],
    correctAnswer: "Instruction throughput",
    explanation: "Pipelining overlaps execution stages.",
    subject: "COA", topic: "Pipelining", difficulty: "medium",
    marks: 2, negativeMarks: 0.66
  },

  {
    questionText: "Which of the following can cause pipeline hazards?",
    type: "msq",
    options: ["Data dependency", "Branch instruction", "Resource conflict", "Parity bit"],
    correctAnswer: ["Data dependency", "Branch instruction", "Resource conflict"],
    explanation: "These are common hazards.",
    subject: "COA", topic: "Pipelining", difficulty: "hard",
    marks: 2, negativeMarks: 0
  },

  {
    questionText: "For a direct mapped cache with 8 lines, number of index bits required is:",
    type: "nat",
    correctAnswer: "3",
    explanation: "Index bits = log2(8) = 3.",
    subject: "COA", topic: "Memory Hierarchy", difficulty: "hard",
    marks: 2, negativeMarks: 0
  },

  {
    questionText: "Which memory is volatile?",
    type: "mcq",
    options: ["ROM", "RAM", "SSD", "Hard Disk"],
    correctAnswer: "RAM",
    explanation: "RAM loses data when power is off.",
    subject: "COA", topic: "Memory Hierarchy", difficulty: "easy",
    marks: 2, negativeMarks: 0.66
  },

  {
    questionText: "Which of the following are valid number systems used in computers?",
    type: "msq",
    options: ["Binary", "Octal", "Decimal", "Hexadecimal"],
    correctAnswer: ["Binary", "Octal", "Decimal", "Hexadecimal"],
    explanation: "All are standard number systems.",
    subject: "COA", topic: "Number Representation", difficulty: "easy",
    marks: 2, negativeMarks: 0
  },

  {
    questionText: "How many bits are needed to represent 256 distinct values?",
    type: "nat",
    correctAnswer: "8",
    explanation: "2^8 = 256.",
    subject: "COA", topic: "Number Representation", difficulty: "medium",
    marks: 2, negativeMarks: 0
  },

  
  // ─── Digital Logic ───────────────────────────────────────────

  {
    questionText: "How many possible outputs can a NOT gate have?",
    type: "mcq",
    options: ["0", "1", "2", "4"],
    correctAnswer: "2",
    explanation: "Output can be either 0 or 1.",
    subject: "Digital Logic", topic: "Logic Gates", difficulty: "easy",
    marks: 1, negativeMarks: 0.33
  },

  {
    questionText: "Which gate is known as universal gate?",
    type: "mcq",
    options: ["AND", "OR", "NAND", "XOR"],
    correctAnswer: "NAND",
    explanation: "NAND alone can implement any Boolean function.",
    subject: "Digital Logic", topic: "Logic Gates", difficulty: "easy",
    marks: 1, negativeMarks: 0.33
  },

  {
    questionText: "Binary equivalent of decimal 10 is:",
    type: "mcq",
    options: ["1010", "1001", "1110", "1100"],
    correctAnswer: "1010",
    explanation: "10 in decimal equals 1010 in binary.",
    subject: "Digital Logic", topic: "Number Systems", difficulty: "easy",
    marks: 1, negativeMarks: 0.33
  },

  {
    questionText: "Which of the following are combinational circuits?",
    type: "msq",
    options: ["Multiplexer", "Decoder", "Adder", "Flip-Flop"],
    correctAnswer: ["Multiplexer", "Decoder", "Adder"],
    explanation: "Flip-Flop is sequential circuit.",
    subject: "Digital Logic", topic: "Combinational Circuits", difficulty: "easy",
    marks: 1, negativeMarks: 0
  },

  {
    questionText: "How many select lines are required for 8:1 multiplexer?",
    type: "nat",
    correctAnswer: "3",
    explanation: "Select lines = log2(8) = 3.",
    subject: "Digital Logic", topic: "Combinational Circuits", difficulty: "easy",
    marks: 1, negativeMarks: 0
  },

  {
    questionText: "Which flip-flop toggles on every clock pulse when J=K=1?",
    type: "mcq",
    options: ["SR", "D", "JK", "T"],
    correctAnswer: "JK",
    explanation: "JK flip-flop toggles when both inputs are 1.",
    subject: "Digital Logic", topic: "Flip-Flops", difficulty: "medium",
    marks: 2, negativeMarks: 0.66
  },

  {
    questionText: "Which of the following are sequential circuits?",
    type: "msq",
    options: ["Register", "Counter", "Flip-Flop", "Encoder"],
    correctAnswer: ["Register", "Counter", "Flip-Flop"],
    explanation: "Encoder is combinational circuit.",
    subject: "Digital Logic", topic: "Sequential Circuits", difficulty: "medium",
    marks: 2, negativeMarks: 0
  },

  {
    questionText: "A half adder has outputs:",
    type: "mcq",
    options: ["Sum and Carry", "Input and Carry", "Difference and Borrow", "Only Sum"],
    correctAnswer: "Sum and Carry",
    explanation: "Half adder adds two bits.",
    subject: "Digital Logic", topic: "Combinational Circuits", difficulty: "medium",
    marks: 2, negativeMarks: 0.66
  },

  {
    questionText: "How many flip-flops are required for MOD-16 counter?",
    type: "nat",
    correctAnswer: "4",
    explanation: "2^4 = 16 states.",
    subject: "Digital Logic", topic: "Counters and Registers", difficulty: "medium",
    marks: 2, negativeMarks: 0
  },

  {
    questionText: "K-map is used for:",
    type: "mcq",
    options: ["Boolean minimization", "Decimal conversion", "Memory allocation", "Clock generation"],
    correctAnswer: "Boolean minimization",
    explanation: "Karnaugh map simplifies Boolean expressions.",
    subject: "Digital Logic", topic: "K-Map Minimization", difficulty: "medium",
    marks: 2, negativeMarks: 0.66
  },

  {
    questionText: "Which of the following are universal gates?",
    type: "msq",
    options: ["NAND", "NOR", "XOR", "NOT"],
    correctAnswer: ["NAND", "NOR"],
    explanation: "NAND and NOR can realize any logic function.",
    subject: "Digital Logic", topic: "Logic Gates", difficulty: "hard",
    marks: 2, negativeMarks: 0
  },

  {
    questionText: "How many cells are there in 4-variable K-map?",
    type: "nat",
    correctAnswer: "16",
    explanation: "Cells = 2^4.",
    subject: "Digital Logic", topic: "K-Map Minimization", difficulty: "medium",
    marks: 2, negativeMarks: 0
  },

  {
    questionText: "Race around condition occurs in:",
    type: "mcq",
    options: ["SR Flip-Flop", "JK Flip-Flop", "D Flip-Flop", "T Flip-Flop"],
    correctAnswer: "JK Flip-Flop",
    explanation: "JK flip-flop with level triggering may toggle continuously.",
    subject: "Digital Logic", topic: "Flip-Flops", difficulty: "hard",
    marks: 2, negativeMarks: 0.66
  },

  {
    questionText: "Which of the following are code conversion circuits?",
    type: "msq",
    options: ["Binary to Gray", "Gray to Binary", "BCD to Excess-3", "Counter"],
    correctAnswer: ["Binary to Gray", "Gray to Binary", "BCD to Excess-3"],
    explanation: "Counter is sequential logic.",
    subject: "Digital Logic", topic: "Combinational Circuits", difficulty: "hard",
    marks: 2, negativeMarks: 0
  },

  {
    questionText: "Maximum decimal number represented by 4-bit unsigned binary is:",
    type: "nat",
    correctAnswer: "15",
    explanation: "Range is 0 to 2^4 - 1 = 15.",
    subject: "Digital Logic", topic: "Number Systems", difficulty: "easy",
    marks: 2, negativeMarks: 0
  },


  // ─── Mathematics ───────────────────────────────────────────

  {
    questionText: "The determinant of identity matrix of order 3 is:",
    type: "mcq",
    options: ["0", "1", "3", "-1"],
    correctAnswer: "1",
    explanation: "Determinant of identity matrix is always 1.",
    subject: "Engineering Mathematics", topic: "Linear Algebra", difficulty: "easy",
    marks: 1, negativeMarks: 0.33
  },

  {
    questionText: "Derivative of x^2 is:",
    type: "mcq",
    options: ["x", "2x", "x^3", "2"],
    correctAnswer: "2x",
    explanation: "d/dx(x^2)=2x.",
    subject: "Engineering Mathematics", topic: "Calculus", difficulty: "easy",
    marks: 1, negativeMarks: 0.33
  },

  {
    questionText: "If P(A)=0.6, then P(A̅) equals:",
    type: "mcq",
    options: ["0.4", "0.6", "1.0", "0.2"],
    correctAnswer: "0.4",
    explanation: "Complement probability = 1 - P(A).",
    subject: "Engineering Mathematics", topic: "Probability", difficulty: "easy",
    marks: 1, negativeMarks: 0.33
  },

  {
    questionText: "Which of the following matrices are always square?",
    type: "msq",
    options: ["Identity matrix", "Diagonal matrix", "Row matrix", "Column matrix"],
    correctAnswer: ["Identity matrix", "Diagonal matrix"],
    explanation: "Identity and diagonal matrices are square matrices.",
    subject: "Engineering Mathematics", topic: "Linear Algebra", difficulty: "easy",
    marks: 1, negativeMarks: 0
  },

  {
    questionText: "Value of ∫0 to 1 dx is:",
    type: "nat",
    correctAnswer: "1",
    explanation: "Integral of 1 from 0 to 1 equals 1.",
    subject: "Engineering Mathematics", topic: "Calculus", difficulty: "easy",
    marks: 1, negativeMarks: 0
  },

  {
    questionText: "If vectors a=(1,0) and b=(0,1), then a·b is:",
    type: "mcq",
    options: ["0", "1", "2", "-1"],
    correctAnswer: "0",
    explanation: "Orthogonal vectors have dot product 0.",
    subject: "Engineering Mathematics", topic: "Linear Algebra", difficulty: "medium",
    marks: 2, negativeMarks: 0.66
  },

  {
    questionText: "Which of the following functions are continuous everywhere?",
    type: "msq",
    options: ["x^2", "sin x", "|x|", "1/x"],
    correctAnswer: ["x^2", "sin x", "|x|"],
    explanation: "1/x is discontinuous at x=0.",
    subject: "Engineering Mathematics", topic: "Calculus", difficulty: "medium",
    marks: 2, negativeMarks: 0
  },

  {
    questionText: "Rank of a non-zero 2×2 identity matrix is:",
    type: "mcq",
    options: ["0", "1", "2", "4"],
    correctAnswer: "2",
    explanation: "Both rows are linearly independent.",
    subject: "Engineering Mathematics", topic: "Linear Algebra", difficulty: "medium",
    marks: 2, negativeMarks: 0.66
  },

  {
    questionText: "Number of ways to arrange 3 distinct objects is:",
    type: "nat",
    correctAnswer: "6",
    explanation: "3! = 6.",
    subject: "Engineering Mathematics", topic: "Probability", difficulty: "medium",
    marks: 2, negativeMarks: 0
  },

  {
    questionText: "The limit of sin x / x as x tends to 0 is:",
    type: "mcq",
    options: ["0", "1", "∞", "Does not exist"],
    correctAnswer: "1",
    explanation: "Standard calculus limit.",
    subject: "Engineering Mathematics", topic: "Calculus", difficulty: "medium",
    marks: 2, negativeMarks: 0.66
  },

  {
    questionText: "Which of the following are eigenvalues of identity matrix?",
    type: "msq",
    options: ["1", "0", "-1", "Depends on order"],
    correctAnswer: ["1"],
    explanation: "All eigenvalues of identity matrix are 1.",
    subject: "Engineering Mathematics", topic: "Linear Algebra", difficulty: "hard",
    marks: 2, negativeMarks: 0
  },

  {
    questionText: "If mean of numbers 2,4,6 is x, then x is:",
    type: "nat",
    correctAnswer: "4",
    explanation: "(2+4+6)/3 = 4.",
    subject: "Engineering Mathematics", topic: "Numerical Methods", difficulty: "easy",
    marks: 2, negativeMarks: 0
  },

  {
    questionText: "If A and B are independent events, then P(A∩B) equals:",
    type: "mcq",
    options: ["P(A)+P(B)", "P(A)P(B)", "P(A)-P(B)", "1"],
    correctAnswer: "P(A)P(B)",
    explanation: "Definition of independent events.",
    subject: "Engineering Mathematics", topic: "Probability", difficulty: "hard",
    marks: 2, negativeMarks: 0.66
  },

  {
    questionText: "Which of the following series are convergent?",
    type: "msq",
    options: ["1/n^2", "1/n", "1/2^n", "1/n!"],
    correctAnswer: ["1/n^2", "1/2^n", "1/n!"],
    explanation: "Harmonic series 1/n diverges.",
    subject: "Engineering Mathematics", topic: "Calculus", difficulty: "hard",
    marks: 2, negativeMarks: 0
  },

  {
    questionText: "If matrix is 3×4, total number of elements is:",
    type: "nat",
    correctAnswer: "12",
    explanation: "Rows × columns = 3 × 4.",
    subject: "Engineering Mathematics", topic: "Linear Algebra", difficulty: "easy",
    marks: 2, negativeMarks: 0
  },


  // ─── General Aptitude ───────────────────────────────────────────

  {
    questionText: "Choose the correct word: She _____ to college every day.",
    type: "mcq",
    options: ["go", "goes", "gone", "going"],
    correctAnswer: "goes",
    explanation: "Singular subject 'She' takes 'goes'.",
    subject: "General Aptitude", topic: "Verbal Ability", difficulty: "easy",
    marks: 1, negativeMarks: 0.33
  },

  {
    questionText: "If 12 + 18 = x, then x is:",
    type: "mcq",
    options: ["20", "28", "30", "32"],
    correctAnswer: "30",
    explanation: "12 + 18 = 30.",
    subject: "General Aptitude", topic: "Quantitative Aptitude", difficulty: "easy",
    marks: 1, negativeMarks: 0.33
  },

  {
    questionText: "Find the odd one out: Apple, Mango, Carrot, Banana",
    type: "mcq",
    options: ["Apple", "Mango", "Carrot", "Banana"],
    correctAnswer: "Carrot",
    explanation: "Carrot is a vegetable; others are fruits.",
    subject: "General Aptitude", topic: "Analytical Reasoning", difficulty: "easy",
    marks: 1, negativeMarks: 0.33
  },

  {
    questionText: "Which of the following are prime numbers?",
    type: "msq",
    options: ["2", "3", "4", "5"],
    correctAnswer: ["2", "3", "5"],
    explanation: "Prime numbers have exactly two factors.",
    subject: "General Aptitude", topic: "Quantitative Aptitude", difficulty: "easy",
    marks: 1, negativeMarks: 0
  },

  {
    questionText: "How many days are there in 2 weeks?",
    type: "nat",
    correctAnswer: "14",
    explanation: "1 week = 7 days.",
    subject: "General Aptitude", topic: "Quantitative Aptitude", difficulty: "easy",
    marks: 1, negativeMarks: 0
  },

  {
    questionText: "If the ratio of boys to girls is 3:2 and total students are 25, number of boys is:",
    type: "mcq",
    options: ["10", "12", "15", "18"],
    correctAnswer: "15",
    explanation: "Total parts = 5, each part = 5, boys = 3×5.",
    subject: "General Aptitude", topic: "Quantitative Aptitude", difficulty: "medium",
    marks: 2, negativeMarks: 0.66
  },

  {
    questionText: "Which of the following words are synonyms of 'rapid'?",
    type: "msq",
    options: ["Fast", "Quick", "Slow", "Swift"],
    correctAnswer: ["Fast", "Quick", "Swift"],
    explanation: "All mean fast.",
    subject: "General Aptitude", topic: "Verbal Ability", difficulty: "medium",
    marks: 2, negativeMarks: 0
  },

  {
    questionText: "A train travels 60 km in 1 hour. Its speed is:",
    type: "mcq",
    options: ["30 km/h", "40 km/h", "50 km/h", "60 km/h"],
    correctAnswer: "60 km/h",
    explanation: "Speed = distance/time.",
    subject: "General Aptitude", topic: "Quantitative Aptitude", difficulty: "medium",
    marks: 2, negativeMarks: 0.66
  },

  {
    questionText: "If today is Monday, after 10 days it will be:",
    type: "nat",
    correctAnswer: "4",
    explanation: "10 mod 7 = 3 days after Monday = Thursday. (1=Mon,2=Tue,3=Wed,4=Thu)",
    subject: "General Aptitude", topic: "Analytical Reasoning", difficulty: "medium",
    marks: 2, negativeMarks: 0
  },

  {
    questionText: "Choose the correctly spelled word:",
    type: "mcq",
    options: ["Definately", "Definitely", "Definetly", "Definatly"],
    correctAnswer: "Definitely",
    explanation: "Correct spelling is Definitely.",
    subject: "General Aptitude", topic: "Verbal Ability", difficulty: "medium",
    marks: 2, negativeMarks: 0.66
  },

  {
    questionText: "Which of the following numbers are divisible by 3?",
    type: "msq",
    options: ["12", "15", "17", "21"],
    correctAnswer: ["12", "15", "21"],
    explanation: "Digit sum divisible by 3 rule.",
    subject: "General Aptitude", topic: "Quantitative Aptitude", difficulty: "hard",
    marks: 2, negativeMarks: 0
  },

  {
    questionText: "Average of 10, 20, 30, 40 is:",
    type: "nat",
    correctAnswer: "25",
    explanation: "(10+20+30+40)/4 = 25.",
    subject: "General Aptitude", topic: "Data Interpretation", difficulty: "easy",
    marks: 2, negativeMarks: 0
  },

  {
    questionText: "If all cats are animals and some animals are black, then which conclusion is निश्चित?",
    type: "mcq",
    options: ["All cats are black", "Some cats are black", "All cats are animals", "No cats are black"],
    correctAnswer: "All cats are animals",
    explanation: "Directly follows from first statement only.",
    subject: "General Aptitude", topic: "Analytical Reasoning", difficulty: "hard",
    marks: 2, negativeMarks: 0.66
  },

  {
    questionText: "Which of the following are common data presentation forms?",
    type: "msq",
    options: ["Bar Graph", "Pie Chart", "Table", "Compiler Design"],
    correctAnswer: ["Bar Graph", "Pie Chart", "Table"],
    explanation: "Compiler is unrelated.",
    subject: "General Aptitude", topic: "Data Interpretation", difficulty: "medium",
    marks: 2, negativeMarks: 0
  },

  {
    questionText: "If simple interest on Rs.1000 at 10% for 2 years is x, then x is:",
    type: "nat",
    correctAnswer: "200",
    explanation: "SI = (P×R×T)/100 = 200.",
    subject: "General Aptitude", topic: "Quantitative Aptitude", difficulty: "medium",
    marks: 2, negativeMarks: 0
  }






];

module.exports = { QUESTION_BANK, GATE_SYLLABUS };