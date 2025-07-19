document.addEventListener('DOMContentLoaded', () => {
    const btn = document.getElementById('get-products-button')

    btn.addEventListener('click', async () => {
        await fetch('/api/v1/products')
        .then((response) => {
            if (!response.ok) {
              throw new Error(`HTTP error! status: ${response.status}`)
            }
            return response.json()
          })
          .then((data) => {
            console.log(data)
            const productsList = document.getElementById('dataContainer')
            productsList.innerHTML = JSON.stringify(data)
          })
          .catch((error) => {
            console.error("Error fetching data:", error)
          })
    })
})
