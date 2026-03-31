import { useMemo, useState } from 'react'
import './App.css'

const topics = [
  {
    title: 'Modern Agile + Lean',
    tags: ['agile', 'lean', 'continuous', 'feedback'],
    summary:
      'Adopt principles of value delivery, experimentation, and learning through short cycles and strong collaboration.',
    steps: ['People over process', 'Hypothesize -> experiment', 'Continuous feedback', 'Improve relentlessly']
  },
  {
    title: 'DevOps + DevSecOps',
    tags: ['devops', 'ci/cd', 'security', 'automation'],
    summary:
      'Integrate dev and ops teams with automation, telemetry, and security practices built into pipelines.',
    steps: ['Automated pipelines', 'Infrastructure as code', 'Shift-left security', 'Monitoring & alerting']
  },
  {
    title: 'CI/CD and trunk-based flow',
    tags: ['ci', 'cd', 'trunk-based', 'branching'],
    summary:
      'Push small, frequent increments to mainline; run tests and deploy automatically to reduce risk.',
    steps: ['Short-lived feature branches', 'Fast commits', 'Automated regression tests', 'Canary releases']
  },
  {
    title: 'Observability / SRE',
    tags: ['sre', 'observability', 'SLI', 'SLO'],
    summary:
      'Measure reliability with SLI/SLO, use logs/metrics/traces to identify and fix issues quickly.',
    steps: ['Define service-level objectives', 'Track service-level indicators', 'Error budgets', 'Postmortems']
  },
  {
    title: 'AI-assisted engineering',
    tags: ['ai', 'automation', 'copilot', 'quality'],
    summary:
      'Leverage AI tools for code gen, testing, docs, and triage while retaining human review and ownership.',
    steps: ['Contextual code completion', 'Automated test generation', 'Issue summarization', 'Code review augmentation']
  }
]

function App() {
  const [query, setQuery] = useState('')
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [review, setReview] = useState('')
  const [rating, setRating] = useState(5)
  const [feedbackList, setFeedbackList] = useState([])

  const filtered = useMemo(() => {
    const lower = query.trim().toLowerCase()
    if (!lower) return topics
    return topics.filter((topic) => {
      return (
        topic.title.toLowerCase().includes(lower) ||
        topic.summary.toLowerCase().includes(lower) ||
        topic.tags.some((tag) => tag.includes(lower))
      )
    })
  }, [query])

  const selected = filtered[selectedIndex] || null

  const handleReviewSubmit = (event) => {
    event.preventDefault()
    if (!review.trim()) {
      return
    }

    setFeedbackList((prev) => [
      { id: Date.now(), topic: selected?.title || 'General', rating, review: review.trim() },
      ...prev
    ])
    setReview('')
    setRating(5)
  }

  return (
    <div className="app-shell">
      <header>
        <h1>Software Engineering Process Explorer</h1>
        <p>
          Search topics, compare practices, and add quick review feedback for each process.
        </p>
      </header>

      <main>
        <section className="search-panel">
          <input
            type="text"
            placeholder="Search by keyword (agile, devops, ci/cd, etc.)"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value)
              setSelectedIndex(0)
            }}
          />
          <div className="topic-list">
            {filtered.length ? (
              filtered.map((topic, i) => (
                <button
                  key={topic.title}
                  className={i === selectedIndex ? 'topic-item selected' : 'topic-item'}
                  onClick={() => setSelectedIndex(i)}
                >
                  <strong>{topic.title}</strong>
                  <span>{topic.tags.join(' · ')}</span>
                </button>
              ))
            ) : (
              <p className="empty">No matching topic found. Try another keyword.</p>
            )}
          </div>
        </section>

        <section className="detail-panel">
          {selected ? (
            <article>
              <h2>{selected.title}</h2>
              <p>{selected.summary}</p>
              <h3>Core steps</h3>
              <ol>
                {selected.steps.map((step) => (
                  <li key={step}>{step}</li>
                ))}
              </ol>
              <p className="tags">Tags: {selected.tags.join(', ')}</p>
            </article>
          ) : (
            <p>Select a topic to review its details.</p>
          )}

          <form className="review-form" onSubmit={handleReviewSubmit}>
            <h3>Review this topic</h3>
            <label>
              Rating: {rating} / 5
              <input
                type="range"
                min="1"
                max="5"
                value={rating}
                onChange={(e) => setRating(Number(e.target.value))}
              />
            </label>
            <label>
              Comments:
              <textarea
                value={review}
                onChange={(e) => setReview(e.target.value)}
                placeholder="What did you learn? What would you change?"
                rows={3}
              />
            </label>
            <button type="submit">Submit Feedback</button>
          </form>

          {feedbackList.length > 0 && (
            <section className="feedback-list">
              <h3>Feedback history</h3>
              <ul>
                {feedbackList.map((item) => (
                  <li key={item.id}>
                    <strong>{item.topic}</strong> ({item.rating}/5) - {item.review}
                  </li>
                ))}
              </ul>
            </section>
          )}
        </section>
      </main>

      <footer>
        <p>Built with React + Vite, ready for Vercel deployment.</p>
      </footer>
    </div>
  )
}

export default App

