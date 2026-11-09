import React, { useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import './styles.css';

// Edit these questions anytime before your Toastmasters meeting.

const QUESTIONS = [
  {
    id: 1,
    title: 'The Memory That Got Away',
    prompt: 'You wake up one morning to discover that one of your favourite memories has mysteriously disappeared. How do you get it back?'
  },
  {
    id: 2,
    title: 'The Keeper of Memories',
    prompt: 'You have been given the duty of preserving just three memories for all of humanity. Which ones do you choose?'
  },
  {
    id: 3,
    title: 'The Family Legend',
    prompt: "Every family has a story that gets more exaggerated with every generation. Tell us your family's most unbelievable legend — real or invented."
  },
  {
    id: 4,
    title: 'The Unbelievable Ancestor',
    prompt: 'You discover that one of your ancestors was secretly responsible for a major event in history. What did they do?'
  },
  {
    id: 5,
    title: 'The Museum of Impossible Things',
    prompt: "You've opened a museum dedicated to things that supposedly never existed. What is your most prized exhibit?"
  },
  {
    id: 6,
    title: 'A Lesson Passed Down',
    prompt: 'What is one lesson from an older generation that you hope people will continue to remember?'
  }
];


function Sparkle({ className = '' }) {
  return <svg className={className} viewBox="0 0 40 40" aria-hidden="true"><path d="M20 0c2.5 12 8 17.5 20 20-12 2.5-17.5 8-20 20C17.5 28 12 22.5 0 20 12 17.5 17.5 12 20 0Z" fill="currentColor" /></svg>;
}
function pad(n) { return String(n).padStart(2, '0'); }
function formatTime(s) { return `${pad(Math.floor(s / 60))}:${pad(s % 60)}`; }

function App() {
  const [currentId, setCurrentId] = useState(null);
  const [revealed, setRevealed] = useState(false);
  const [completed, setCompleted] = useState([]);
  const [seconds, setSeconds] = useState(0);
  const [running, setRunning] = useState(false);
  const active = QUESTIONS.find(q => q.id === currentId);
  const unused = QUESTIONS.filter(q => !completed.includes(q.id));
  const timing = seconds >= 120 ? 'red' : seconds >= 90 ? 'yellow' : seconds >= 60 ? 'green' : '';

  useEffect(() => {
    if (!running) return;
    const interval = window.setInterval(() => setSeconds(s => s + 1), 1000);
    return () => window.clearInterval(interval);
  }, [running]);

  function selectCard(id) { setCurrentId(id); setRevealed(false); setRunning(false); setSeconds(0); }
  function drawCard() {
    if (!unused.length) return;
    const choice = unused[Math.floor(Math.random() * unused.length)];
    selectCard(choice.id);
  }
  function markComplete() {
    if (currentId === null) return;
    setCompleted(prev => prev.includes(currentId) ? prev : [...prev, currentId]);
    setCurrentId(null);
    setRevealed(false);
    setRunning(false);
    setSeconds(0);
  }
  function resetCards() {
    if (!window.confirm('Start fresh? This will make all 12 cards available again.')) return;
    setCompleted([]); setCurrentId(null); setRevealed(false); setRunning(false); setSeconds(0);
  }

  return <div className="page">
    <main className="container">
      <header className="top">
        <div><p className="overline">REMEMBRANCE · NOVEMBER <span>✦</span></p><h1>Stories <em>we carry.</em></h1></div>
        <Sparkle className="top-star" />
      </header>
        <div className="workspace">
          <section className="story-card" aria-live="polite">
            <div className="card-top"><span>{active ? `CARD NO. ${pad(active.id)}` : 'A LITTLE MYSTERY'}</span><Sparkle /></div>
            <div className="card-content">
              {active && revealed ? <><span className="pill">Your Table Topic</span><h2>{active.title}</h2><p className="question">{active.prompt}</p></> : <>
                <Sparkle className="center-star" />
                <h2>{active ? 'A story is hiding...' : 'A story is waiting...'}</h2>
                <p>{active ? 'Ready to reveal your question?' : 'Draw a mystery card to begin.'}</p>
                {active && <button className="btn cream" onClick={() => setRevealed(true)}>Reveal question ✦</button>}
              </>}
            </div>
            <div className="card-foot"><span>REMEMBRANCE · NOVEMBER</span><span>✳</span></div>
          </section>
          <aside className="controls">
            <div className="icon-tile"><Sparkle /></div>
            <h2>Let the story unfold.</h2>
            <p>One card, one speaker, one story to share.</p>
            <button className="btn orange" onClick={drawCard} disabled={!unused.length}>{unused.length ? 'Draw a card ↗' : 'All cards completed ✓'}</button>
            {active && !revealed && <button className="btn pale" onClick={() => setRevealed(true)}>Reveal question ✦</button>}
            {active && <button className="btn pale" onClick={markComplete}>Mark card complete ✓</button>}
            <div className="duty-note" aria-label="Word of the day"><span className="duty-kicker">✦ WORD OF THE DAY</span><h3>Duty <span>· noun</span></h3><p>A responsibility or obligation to someone or something.</p></div>
            <div className="counter">{completed.length} of {QUESTIONS.length} completed</div>
            <button className="reset-link" onClick={resetCards}>↻ Reset all cards</button>
          </aside>
        </div>

        <section className="timer" aria-label="Speaking timer">
          <div className="timer-top"><div><p className="overline">SPEAKING TIMER</p><p className="timer-sub">Use your club's official timing rules.</p></div><span className={`digits ${timing}`} aria-live="off">{formatTime(seconds)}</span></div>
          <div className="timer-bottom"><div className="cues"><span className={timing === 'green' ? 'green active' : ''}>1:00 · green</span><span className={timing === 'yellow' ? 'yellow active' : ''}>1:30 · yellow</span><span className={timing === 'red' ? 'red active' : ''}>2:00 · red</span></div>
            <div className="timer-buttons"><button className="btn orange" onClick={() => setRunning(v => !v)}>{running ? 'Pause' : seconds ? 'Resume' : 'Start timer'}</button><button className="btn pale" onClick={() => {setRunning(false); setSeconds(0);}}>Reset timer</button></div>
          </div>
        </section>

        <section className="library">
          <div className="library-heading"><div><p className="overline">ALL THE STORIES</p><h2>Browse all stories</h2></div><p>Click a card to select it above.</p></div>
          <div className="library-grid">{QUESTIONS.map(q => <button key={q.id} disabled={completed.includes(q.id)} className={`mini-card ${currentId === q.id ? 'chosen' : ''} ${completed.includes(q.id) ? 'completed' : ''}`} onClick={() => {selectCard(q.id); window.scrollTo({top: 0, behavior: 'smooth'});}}><span className="mini-number">NO. {pad(q.id)} <span>{completed.includes(q.id) ? '✓ DONE' : '↗'}</span></span><strong>{q.title}</strong><span className="mini-bottom">{completed.includes(q.id) ? 'Completed' : 'Choose story'}</span></button>)}</div>
        </section>
      <footer>Made for a little November gathering ✦</footer>
    </main>
  </div>;
}

createRoot(document.getElementById('root')).render(<App />);
