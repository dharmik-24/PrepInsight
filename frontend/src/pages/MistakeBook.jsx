import { useState, useEffect } from 'react';
import API from '../api/axios';

const FALLBACK_SUBJECTS = [
  'Data Structures',
  'Algorithms',
  'Operating Systems',
  'DBMS',
  'Computer Networks',
  'TOC',
  'Compiler Design',
  'C',
  'Discrete Maths',
  'COA',
  'Digital Logic',
  'Mathematics',
  'General Aptitude'
];

const MistakeBook = () => {

  const [mistakes, setMistakes] = useState([]);
  const [subjects, setSubjects] = useState(['All', ...FALLBACK_SUBJECTS]);

  const [filter, setFilter] = useState('All');
  const [showRevised, setShowRevised] = useState(false);

  const [expanded, setExpanded] = useState(null);

  // Notes state
  const [notes, setNotes] = useState({});

  // Edit mode
  const [editing, setEditing] = useState({});

  useEffect(() => {
    fetchSyllabusSubjects();
  }, []);

  useEffect(() => {
    fetchMistakes();
  }, [filter, showRevised]);

  // =========================
  // FETCH SUBJECTS
  // =========================
  const fetchSyllabusSubjects = async () => {
    try {

      const { data } = await API.get('/studylogs/syllabus');

      const syllabusSubjects = Object.keys(data || {});

      if (syllabusSubjects.length > 0) {
        setSubjects(['All', ...syllabusSubjects]);
      }

    } catch (err) {
      console.log(err);
    }
  };

  // =========================
  // FETCH MISTAKES
  // =========================
  const fetchMistakes = async () => {
    try {

      const params = {};

      if (filter !== 'All') {
        params.subject = filter;
      }

      if (!showRevised) {
        params.revised = 'false';
      }

      const { data } = await API.get('/mistakes', { params });

      setMistakes(data);

      // Notes + edit states
      const notesData = {};
      const editingData = {};

      data.forEach((m) => {
        notesData[m._id] = m.note || '';
        editingData[m._id] = !m.note;
      });

      setNotes(notesData);
      setEditing(editingData);

    } catch (err) {
      console.log(err);
    }
  };

  // =========================
  // HANDLE NOTE TYPING
  // =========================
  const handleNoteChange = (id, value) => {

    setNotes((prev) => ({
      ...prev,
      [id]: value
    }));
  };

  // =========================
  // SAVE NOTE
  // =========================
  const saveNote = async (id) => {
    try {

      const { data } = await API.put(
        `/mistakes/${id}/note`,
        {
          note: notes[id]
        }
      );

      // Update local state instantly
      setMistakes((prev) =>
        prev.map((m) =>
          m._id === id
            ? {
                ...m,
                note: data.note
              }
            : m
        )
      );

      // Disable edit mode
      setEditing((prev) => ({
        ...prev,
        [id]: false
      }));

      alert('Note saved!');

    } catch (err) {
      console.log(err);
    }
  };

  // =========================
  // ENABLE EDIT
  // =========================
  const enableEdit = (id) => {

    setEditing((prev) => ({
      ...prev,
      [id]: true
    }));
  };

  // =========================
  // DELETE NOTE
  // =========================
  const deleteNote = async (id) => {
    try {

      await API.delete(`/mistakes/${id}/note`);

      // Remove locally
      setNotes((prev) => ({
        ...prev,
        [id]: ''
      }));

      setMistakes((prev) =>
        prev.map((m) =>
          m._id === id
            ? {
                ...m,
                note: ''
              }
            : m
        )
      );

      // Enable editing again
      setEditing((prev) => ({
        ...prev,
        [id]: true
      }));

      alert('Note deleted!');

    } catch (err) {
      console.log(err);
    }
  };

  // =========================
  // TOGGLE REVISED
  // =========================
  const markRevised = async (id) => {
    try {

      const { data } = await API.put(`/mistakes/${id}/revise`);

      // Toggle instantly in UI
      setMistakes((prev) =>
        prev.map((m) =>
          m._id === id
            ? {
                ...m,
                isRevised: data.isRevised
              }
            : m
        )
      );

    } catch (err) {
      console.log(err);
    }
  };

  return (

    <div className="page-container">

      <h1>📖 Mistake Book</h1>

      <p className="subtitle">
        Review your wrong answers to never repeat mistakes
      </p>

      {/* FILTERS */}
      <div className="filter-bar">

        <div className="subject-filters">

          {subjects.map((s) => (

            <button
              key={s}
              className={`filter-btn ${filter === s ? 'active' : ''}`}
              onClick={() => setFilter(s)}
            >
              {s}
            </button>

          ))}

        </div>

        <label className="toggle-label">

          <input
            type="checkbox"
            checked={showRevised}
            onChange={(e) => setShowRevised(e.target.checked)}
          />

          Show Revised

        </label>

      </div>

      {/* MISTAKES */}
      <div className="mistakes-list">

        {mistakes.map((m) => (

          <div
            key={m._id}
            className={`mistake-card ${m.isRevised ? 'revised' : ''}`}
          >

            {/* HEADER */}
            <div
              className="mistake-header"
              onClick={() =>
                setExpanded(expanded === m._id ? null : m._id)
              }
            >

              <div>

                <span className="mistake-subject">
                  {m.subject}
                </span>

                <span className="mistake-topic">
                  {' '}→ {m.topic}
                </span>

              </div>

              <div className="mistake-actions">

                {m.isRevised && (
                  <span className="badge-revised">
                    ✅ Revised
                  </span>
                )}

                <span>
                  {expanded === m._id ? '▲' : '▼'}
                </span>

              </div>

            </div>

            {/* BODY */}
            {expanded === m._id && (

              <div className="mistake-body">

                {/* QUESTION */}
                <p className="mistake-question">
                  {m.questionText}
                </p>

                {/* OPTIONS */}
                {m.options?.length > 0 && (

                  <div className="mistake-options">

                    {m.options.map((opt, i) => (

                      <div
                        key={i}
                        className={`mistake-option
                        ${
                          JSON.stringify(m.correctAnswer) === JSON.stringify(opt)
                            ? 'correct'
                            : ''
                        }
                        ${
                          JSON.stringify(m.userAnswer) === JSON.stringify(opt)
                            ? 'wrong'
                            : ''
                        }`}
                      >

                        {String.fromCharCode(65 + i)}. {opt}

                      </div>

                    ))}

                  </div>

                )}

                {/* ANSWERS */}
                <div className="mistake-answers">

                  <p>
                    ❌ Your answer:
                    <strong>
                      {' '}
                      {JSON.stringify(m.userAnswer)}
                    </strong>
                  </p>

                  <p>
                    ✅ Correct answer:
                    <strong>
                      {' '}
                      {JSON.stringify(m.correctAnswer)}
                    </strong>
                  </p>

                </div>

                {/* EXPLANATION */}
                {m.explanation && (

                  <div className="explanation">

                    <strong>💡 Explanation:</strong>

                    {' '}
                    {m.explanation}

                  </div>

                )}

                {/* NOTES */}
                <div className="notes-section">

                  <textarea
                    placeholder="Write your notes here..."
                    value={notes[m._id] || ''}
                    disabled={!editing[m._id]}
                    onChange={(e) =>
                      handleNoteChange(m._id, e.target.value)
                    }
                  />

                  <div className="note-actions">

                    {/* SAVE / EDIT */}
                    {editing[m._id] ? (

                      <button
                        className="btn-primary"
                        onClick={() => saveNote(m._id)}
                      >
                        💾 Save Note
                      </button>

                    ) : (

                      <button
                        className="btn-secondary"
                        onClick={() => enableEdit(m._id)}
                      >
                        ✏ Edit Note
                      </button>

                    )}

                    {/* DELETE */}
                    {notes[m._id] && (

                      <button
                        className="btn-danger"
                        onClick={() => deleteNote(m._id)}
                      >
                        🗑 Delete
                      </button>

                    )}

                  </div>

                </div>

                {/* TOGGLE REVISED */}
                <button
                  className={m.isRevised ? 'btn-danger' : 'btn-primary'}
                  onClick={() => markRevised(m._id)}
                >
                  {m.isRevised
                    ? '↩ Mark as Unrevised'
                    : '✓ Mark as Revised'}
                </button>

              </div>

            )}

          </div>

        ))}

        {/* EMPTY */}
        {mistakes.length === 0 && (

          <p className="no-data">

            {showRevised
              ? 'No mistakes found.'
              : 'No unrevised mistakes! Great job! 🎉'}

          </p>

        )}

      </div>

    </div>
  );
};

export default MistakeBook;