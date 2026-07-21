const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || ''

async function parseResponse(response) {
  const contentType = response.headers.get('content-type') || ''
  if (contentType.includes('application/json')) {
    return response.json()
  }
  return { message: await response.text() }
}

export async function predictSurvival(payload) {
  const response = await fetch(`${API_BASE_URL}/predict`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify(payload),
  })

  const data = await parseResponse(response)

  if (!response.ok) {
    const error = new Error(data.message || 'Prediction request failed.')
    error.fieldErrors = data.errors || {}
    throw error
  }

  return data
}

export async function checkApiHealth() {
  const response = await fetch(`${API_BASE_URL}/api/health`, {
    headers: { Accept: 'application/json' },
  })
  const data = await parseResponse(response)

  if (!response.ok) {
    throw new Error(data.error || data.message || 'Prediction API is unavailable.')
  }

  return data
}
