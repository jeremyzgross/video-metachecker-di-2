document
  .querySelector('.upload-video')
  .addEventListener('submit', async function (event) {
    event.preventDefault()

    const uploadForm = document.querySelector('.upload-video')
    const formData = new FormData(uploadForm)
    console.log('formData', formData)
    try {
      const response = await fetch('http://localhost:3000/api/upload', {
        method: 'POST',
        body: formData,
      })
      console.log('Form Data:', formData)
      console.log('response', response)
      if (!response.ok) {
        throw new Error(`Network response was not ok: ${response.statusText}`)
      }

      const data = await response.json()
      console.log('Success:', JSON.stringify(data, null, 2))
    } catch (error) {
      console.error('Error:', error)
    }
  })
