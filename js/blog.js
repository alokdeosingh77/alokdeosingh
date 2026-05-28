// =====================================================
//  BLOG — Posts stored in localStorage
// =====================================================

const STORAGE_KEY = 'alok_blog_posts';

const SAMPLE_POSTS = [
  {
    id: 'sample-1',
    title: 'Managing the Chaos of Multi-Team Programs: A Practitioner's Guide',
    cat: 'Program Management',
    excerpt: 'How KPI frameworks and early risk detection saved a $2M transformation program from going off the rails.',
    date: '2025-05-01',
    readTime: '6 min read',
    content: `## The Problem with "It'll Be Fine"

In large-scale programs, the most dangerous words are "it'll be fine." I've seen multi-million-dollar programs derail not because of a single catastrophic failure, but because a series of small risks were downplayed week after week.

At Brightly, managing two concurrent transformation programs with a combined annual budget of ~USD 2M taught me that visibility isn't a luxury — it's a survival mechanism.

## Building a Risk Framework That Actually Works

Most risk registers are graveyards. They exist, they're updated sporadically, and they're never really acted on. The shift I made was moving from a *documentation mindset* to a *detection mindset*.

Here's what changed:

- **Weekly risk heat maps**: Every Monday, each stream lead rates their top 3 risks by probability and impact. We use a simple 1-5 scale. Anything hitting a combined score of 6+ goes on the exec report immediately.
- **Dependency mapping first**: Before sprint planning, we map external dependencies. A blocked API key or a delayed security review can kill two weeks of velocity.
- **"Yellow" is a real status**: Teams were trained not to report green just to avoid questions. Yellow means "proceeding but watching." It builds trust with leadership because they see reality, not theatre.

## KPIs That Mean Something

The metrics that matter aren't the obvious ones. Velocity tells you what happened. The metrics I track are:

> *"Predictive indicators, not lagging ones."*

- **Scope creep rate**: % of scope items added after baseline, per sprint
- **Dependency resolution time**: Average days to unblock a cross-team dependency
- **Decision latency**: Days between an escalation and a resolution

These three, week over week, tell you if your program is healthy before a crisis hits.

## The Human Side

None of this works without psychological safety. Engineering leads need to feel they can raise a yellow flag without getting grilled. The one thing I repeat every steering committee: *we reward early escalation, not late heroics.*

## Takeaway

Great program management is 20% process, 80% culture. Build the process once. Spend the rest of your energy building a culture where transparency is the default.`
  },
  {
    id: 'sample-2',
    title: 'AI-Enabling an Enterprise SaaS Platform: Where to Start, What Fails, What Sticks',
    cat: 'AI & Technology',
    excerpt: 'Lessons from embedding AI capabilities into an asset management product — including the failures we don't talk about.',
    date: '2025-04-12',
    readTime: '8 min read',
    content: `## Why "Just Add AI" Doesn't Work

When we started driving AI platform readiness at Brightly, the instinct from leadership was straightforward: add AI, unlock value, move fast. The reality was more complicated — and more interesting.

Here's what I learned from a year of embedding AI into an enterprise asset management SaaS platform.

## Start with the Problem, Not the Model

The first mistake most teams make is picking a model before they've defined the problem precisely enough. We started with "use AI to improve operational predictability" — which is far too vague.

The right question: *what specific decision does a customer make today that would be better with a prediction?*

For us, that turned out to be maintenance scheduling. Customers were making manual decisions about asset servicing windows. We had the usage data. We had the failure history. The model was almost secondary — the hard work was data quality and feature engineering.

## The Data Reality Check

Before any model goes near production, you need three months to answer:

- Is the data clean enough? (Usually: no)
- Is the label reliable? (For supervised tasks: often partially)
- Is there enough signal vs. noise? (Run a quick baseline: can a rule-based heuristic beat random? If not, you don't have a problem yet.)

We spent six weeks on data quality before writing a line of model code. Worth every day.

## What Actually Sticks

From this work, the capabilities that earned real adoption:

**Anomaly alerting** — simple statistical thresholds on usage curves. Not fancy, but it surfaces issues early. Customers loved it immediately.

**Predicted maintenance windows** — using historical failure patterns. Accuracy was ~73% on first deployment. Not perfect, but 73% better than the customer's current "gut feel."

**Natural language report summarization** — using an LLM to turn raw maintenance logs into plain-English summaries for ops managers. Instant value. No model training required.

## What Didn't Work (Yet)

Predictive failure before any symptoms appear — we don't have enough labeled failure data yet. It's on the roadmap for 18 months out.

Autonomous scheduling suggestions — the trust isn't there yet. Customers want to see, then act. They don't want the system to act for them. Design your AI for *human-in-the-loop* first.

## The Program Management Lesson

AI programs need a different governance model. Unlike a feature release, you're managing uncertainty in two dimensions: technical uncertainty (will the model work?) and business uncertainty (will customers use it?). Your milestones need to reflect that. Build in explicit "learn and pivot" points.

> *The biggest risk in AI programs isn't the model failing. It's the team not building in the space to learn.*`
  }
];

function loadPosts() {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored) {
    try { return JSON.parse(stored); } catch (e) { return [...SAMPLE_POSTS]; }
  }
  // Seed with samples on first load
  localStorage.setItem(STORAGE_KEY, JSON.stringify(SAMPLE_POSTS));
  return [...SAMPLE_POSTS];
}

function savePosts(posts) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(posts));
}

function formatDate(dateStr) {
  const d = new Date(dateStr);
  return d.toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' });
}

function renderMarkdown(text) {
  if (!text) return '';
  return text
    .replace(/^## (.+)$/gm, '<h4>$1</h4>')
    .replace(/^> (.+)$/gm, '<blockquote>$1</blockquote>')
    .replace(/^\- (.+)$/gm, '<li>$1</li>')
    .replace(/(<li>[\s\S]+?<\/li>)/g, '<ul>$1</ul>')
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.+?)\*/g, '<em>$1</em>')
    .replace(/\n\n/g, '</p><p>')
    .replace(/^(?!<[hbuolp])(.+)$/gm, (m) => m ? m : '')
    .split('\n\n').map(p => {
      if (p.startsWith('<')) return p;
      return p ? `<p>${p}</p>` : '';
    }).join('\n');
}

function renderPosts(filter = 'all') {
  const posts = loadPosts();
  const grid = document.getElementById('postsGrid');
  const empty = document.getElementById('emptyState');
  if (!grid) return;

  const filtered = filter === 'all' ? posts : posts.filter(p => p.cat === filter);

  if (filtered.length === 0) {
    grid.innerHTML = '';
    if (empty) empty.style.display = 'block';
    return;
  }

  if (empty) empty.style.display = 'none';

  grid.innerHTML = filtered.map(post => `
    <div class="post-card" data-id="${post.id}">
      <span class="post-cat">${post.cat}</span>
      <h3>${post.title}</h3>
      <p class="post-excerpt">${post.excerpt || ''}</p>
      <div class="post-meta">
        <span>${formatDate(post.date)}</span>
        ${post.readTime ? `<span class="dot"></span><span>${post.readTime}</span>` : ''}
      </div>
    </div>
  `).join('');

  grid.querySelectorAll('.post-card').forEach(card => {
    card.addEventListener('click', () => openPost(card.dataset.id));
  });
}

function openPost(id) {
  const posts = loadPosts();
  const post = posts.find(p => p.id === id);
  if (!post) return;

  const modal = document.getElementById('postModal');
  const content = document.getElementById('postModalContent');
  if (!modal || !content) return;

  content.innerHTML = `
    <div class="post-full-cat">${post.cat}</div>
    <h2 class="post-full-title">${post.title}</h2>
    <div class="post-full-meta">${formatDate(post.date)}${post.readTime ? ' · ' + post.readTime : ''}</div>
    <div class="post-full-body">${renderMarkdown(post.content)}</div>
  `;

  modal.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  const modal = document.getElementById('postModal');
  if (modal) modal.classList.remove('open');
  document.body.style.overflow = '';
}

function initBlog() {
  // Render initial posts
  renderPosts();

  // Filter buttons
  document.getElementById('filterBar')?.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      renderPosts(btn.dataset.cat);
    });
  });

  // Close modal
  document.getElementById('modalClose')?.addEventListener('click', closeModal);
  document.getElementById('postModal')?.addEventListener('click', (e) => {
    if (e.target === e.currentTarget) closeModal();
  });
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeModal(); });

  // New post form toggle
  const newPostBtn = document.getElementById('newPostBtn');
  const form = document.getElementById('newPostForm');
  const cancelBtn = document.getElementById('cancelPostBtn');

  newPostBtn?.addEventListener('click', () => {
    form.classList.add('open');
    form.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });

  cancelBtn?.addEventListener('click', () => {
    form.classList.remove('open');
    clearForm();
  });

  // Publish
  document.getElementById('publishBtn')?.addEventListener('click', () => {
    const title = document.getElementById('postTitle')?.value.trim();
    const cat = document.getElementById('postCat')?.value;
    const excerpt = document.getElementById('postExcerpt')?.value.trim();
    const content = document.getElementById('postContent')?.value.trim();

    if (!title) { alert('Please add a title.'); return; }
    if (!content) { alert('Please add some content.'); return; }

    const posts = loadPosts();
    const words = content.split(/\s+/).length;
    const readTime = Math.max(1, Math.round(words / 200)) + ' min read';

    const newPost = {
      id: 'post-' + Date.now(),
      title, cat, excerpt: excerpt || content.substring(0, 120) + '...',
      date: new Date().toISOString().split('T')[0],
      readTime, content
    };

    posts.unshift(newPost);
    savePosts(posts);
    renderPosts();
    form.classList.remove('open');
    clearForm();
    window.scrollTo({ top: document.getElementById('postsGrid').offsetTop - 100, behavior: 'smooth' });
  });
}

function clearForm() {
  ['postTitle', 'postExcerpt', 'postContent'].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.value = '';
  });
}

document.addEventListener('DOMContentLoaded', initBlog);
