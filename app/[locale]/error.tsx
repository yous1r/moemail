'use client'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <div style={{ padding: 20 }}>
      <h2>Something went wrong!</h2>
      <pre style={{ color: 'red', whiteSpace: 'pre-wrap' }}>
        {error.message}
        {'\n'}
        {error.stack}
      </pre>
      <button onClick={() => reset()}>Try again</button>
    </div>
  )
}
