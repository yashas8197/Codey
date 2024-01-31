document.querySelector("#codeSnippetForm").addEventListener("submit", saveCodeSnippet)
const snippetList = document.querySelector("#snippetList")

function saveCodeSnippet(e) {
  const descriptionInput = document.querySelector('#description')
  const tagsInput = document.querySelector('#tags')
  const codeInput = document.querySelector('#code')

  const codeSnippet = {
    description: descriptionInput.value,
    tags: tagsInput.value,
    code: codeInput.value
  }

  if (localStorage.getItem('codeSnippets') === null) {
    let codeSnippets = []
    codeSnippets.push(codeSnippet)
    localStorage.setItem('codeSnippets', JSON.stringify(codeSnippets))
  } else {
    let codeSnippets = JSON.parse(localStorage.getItem('codeSnippets'))
    codeSnippets.push(codeSnippet)
    localStorage.setItem('codeSnippets', JSON.stringify(codeSnippets))
  }
  fetchCodeSnippets();
  e.preventDefault()
}

document.querySelector('#codeSnippetForm').reset()

function deleteSnippet(deleteBtn) {
  let codeSnippets = JSON.parse(localStorage.getItem('codeSnippets'))
  codeSnippets.splice(deleteBtn, 1)
  localStorage.setItem('codeSnippets', JSON.stringify(codeSnippets));
  fetchCodeSnippets();
}

function fetchCodeSnippets() {
  let codeSnippets = JSON.parse(localStorage.getItem('codeSnippets'))
  const snippetList = document.querySelector('#snippetList')

  snippetList.innerHTML = " "
  if (codeSnippets !== null) {
    for (let i = 0; i < codeSnippets.length; i++) {
      snippetList.innerHTML += `
    <li class="list-group-item">
      <h5>${codeSnippets[i].description}</h5>
      <p>Tags: ${codeSnippets[i].tags}</p>
     <pre class="bg-light p-3">
    <code style="color: #adb5bd;">${codeSnippets[i].code}</code>
    </pre>
    <button class="btn btn-danger" onClick="deleteSnippet(this)">DELETE</button>
    </li>    
    `
    }
  }
}



fetchCodeSnippets()














