import { useEffect, useState } from 'react'

export default function GitHubStats({ username = 'bhasker' }) {
  const [stats, setStats] = useState(null)
  const [repos, setRepos] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  useEffect(() => {
    const fetchStats = async () => {
      try {
        // User stats
        const userRes = await fetch(`https://api.github.com/users/${username}`)
        if (!userRes.ok) throw new Error('User not found')
        const userData = await userRes.json()

        // Top repos
        const repoRes = await fetch(`https://api.github.com/users/${username}/repos?sort=stars&per_page=4&type=public`)
        const repoData = await repoRes.json()

        setStats(userData)
        setRepos(repoData)
        setLoading(false)
      } catch {
        setError(true)
        setLoading(false)
      }
    }
    fetchStats()
  }, [username])

  return (
    <section id="github" style={{ padding: '7rem 2rem', background: 'linear-gradient(180deg,#020408 0%,#060d14 100%)', position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 1, background: 'linear-gradient(to right,transparent,rgba(0,212,255,0.2),transparent)' }} />

      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        <p className="section-tag">// GITHUB_ACTIVITY.json</p>
        <h2 className="section-title">GitHub <span>Stats</span></h2>
        <div className="section-bar" />

        {loading && (
          <div style={{ textAlign: 'center', padding: '3rem' }}>
            <div style={{ fontFamily: "'Share Tech Mono',monospace", fontSize: '0.8rem', color: '#00d4ff', letterSpacing: 3, animation: 'ghBlink 1s infinite' }}>
              FETCHING GITHUB DATA...
            </div>
          </div>
        )}

        {error && (
          <div style={{ textAlign: 'center', padding: '3rem' }}>
            <div style={{ fontFamily: "'Share Tech Mono',monospace", fontSize: '0.8rem', color: '#ff6b6b', letterSpacing: 3 }}>
              ✗ GITHUB USERNAME NOT FOUND — Update username prop
            </div>
          </div>
        )}

        {stats && !loading && (
          <>
            {/* Profile + stat cards */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(200px,1fr))', gap: '1rem', marginBottom: '2.5rem' }}>
              {[
                { label: 'Public Repos', value: stats.public_repos, icon: '◈', color: '#00d4ff' },
                { label: 'Followers', value: stats.followers, icon: '◉', color: '#0099cc' },
                { label: 'Following', value: stats.following, icon: '◎', color: '#0066ff' },
                { label: 'Gists', value: stats.public_gists, icon: '▣', color: '#00d4ff' },
              ].map(s => (
                <div key={s.label} style={{
                  padding: '1.5rem', background: 'rgba(0,212,255,0.03)',
                  border: '1px solid rgba(0,212,255,0.1)',
                  position: 'relative', overflow: 'hidden',
                  transition: 'all 0.3s', textAlign: 'center',
                }}
                  onMouseEnter={(e) => { e.currentTarget.style.borderColor = s.color + '50'; e.currentTarget.style.background = 'rgba(0,212,255,0.06)'; e.currentTarget.style.transform = 'translateY(-4px)' }}
                  onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'rgba(0,212,255,0.1)'; e.currentTarget.style.background = 'rgba(0,212,255,0.03)'; e.currentTarget.style.transform = 'translateY(0)' }}
                >
                  <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 1, background: `linear-gradient(to right,transparent,${s.color},transparent)`, opacity: 0.4 }} />
                  <div style={{ fontFamily: "'Share Tech Mono',monospace", fontSize: '1rem', color: s.color, marginBottom: '0.5rem' }}>{s.icon}</div>
                  <div style={{ fontFamily: "'Exo 2',sans-serif", fontWeight: 800, fontSize: '2.2rem', color: s.color, lineHeight: 1, marginBottom: '0.4rem', textShadow: `0 0 20px ${s.color}50` }}>{s.value}</div>
                  <div style={{ fontFamily: "'Share Tech Mono',monospace", fontSize: '0.62rem', color: 'rgba(200,232,240,0.4)', letterSpacing: 3 }}>{s.label}</div>
                </div>
              ))}
            </div>

            {/* GitHub contribution image */}
            <div style={{ marginBottom: '2.5rem', padding: '1.5rem', background: 'rgba(0,212,255,0.02)', border: '1px solid rgba(0,212,255,0.1)', overflow: 'hidden' }}>
              <p style={{ fontFamily: "'Share Tech Mono',monospace", fontSize: '0.65rem', color: 'rgba(0,212,255,0.5)', letterSpacing: 3, marginBottom: '1rem' }}>CONTRIBUTION GRAPH</p>
              <img
                src={`https://ghchart.rshah.org/00d4ff/${username}`}
                alt="GitHub Contributions"
                style={{ width: '100%', filter: 'invert(0) hue-rotate(180deg) saturate(1.5)', borderRadius: 4 }}
                onError={(e) => { e.target.style.display = "none" }}
              />
            </div>

            {/* Top repos */}
            {repos.length > 0 && (
              <div>
                <p style={{ fontFamily: "'Share Tech Mono',monospace", fontSize: '0.65rem', color: 'rgba(0,212,255,0.5)', letterSpacing: 3, marginBottom: '1rem' }}>TOP REPOSITORIES</p>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(240px,1fr))', gap: '1rem' }}>
                  {repos.map(repo => (
                    <a key={repo.id} href={repo.html_url} target="_blank" rel="noreferrer"
                      style={{ padding: '1.2rem', background: 'rgba(0,21,32,0.8)', border: '1px solid rgba(0,212,255,0.1)', textDecoration: 'none', display: 'block', transition: 'all 0.3s', position: 'relative', overflow: 'hidden' }}
                      onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'rgba(0,212,255,0.4)'; e.currentTarget.style.transform = 'translateY(-3px)' }}
                      onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'rgba(0,212,255,0.1)'; e.currentTarget.style.transform = 'translateY(0)' }}
                    >
                      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 1, background: 'linear-gradient(to right,transparent,#00d4ff,transparent)', opacity: 0.3 }} />
                      <div style={{ fontFamily: "'Exo 2',sans-serif", fontWeight: 700, fontSize: '0.9rem', color: '#00d4ff', marginBottom: '0.4rem', letterSpacing: 1 }}>
                        {repo.name}
                      </div>
                      <div style={{ fontFamily: "'Rajdhani',sans-serif", fontSize: '0.82rem', color: 'rgba(200,232,240,0.5)', lineHeight: 1.6, marginBottom: '0.8rem', minHeight: '2.4rem' }}>
                        {repo.description ? repo.description.slice(0, 60) + (repo.description.length > 60 ? '...' : '') : 'No description'}
                      </div>
                      <div style={{ display: 'flex', gap: '1rem' }}>
                        <span style={{ fontFamily: "'Share Tech Mono',monospace", fontSize: '0.65rem', color: 'rgba(0,212,255,0.5)', letterSpacing: 1 }}>★ {repo.stargazers_count}</span>
                        <span style={{ fontFamily: "'Share Tech Mono',monospace", fontSize: '0.65rem', color: 'rgba(0,212,255,0.5)', letterSpacing: 1 }}>⌥ {repo.forks_count}</span>
                        {repo.language && <span style={{ fontFamily: "'Share Tech Mono',monospace", fontSize: '0.65rem', color: '#00d4ff', letterSpacing: 1 }}>◈ {repo.language}</span>}
                      </div>
                    </a>
                  ))}
                </div>
              </div>
            )}
          </>
        )}
      </div>

      <style>{`@keyframes ghBlink{0%,100%{opacity:1;}50%{opacity:0.3;}}`}</style>
    </section>
  )
}