/*
 * @Date: 2022-03-04 20:36:35
 * @LastEditors: Ke Ren
 * @LastEditTime: 2022-03-11 23:04:19
 * @FilePath: /mtm6302-project-1/script.js
 */

// idea forum data
const data = {
  currentUser: 'currentUser',
  ideas: [
    {
      username: 'amyrobson',
      content:
        'Non dolor veniam nostrud ad. Commodo ex officia reprehenderit eu laborum. Qui reprehenderit reprehenderit incididunt eiusmod voluptate cupidatat cupidatat dolor. Incididunt sint cupidatat dolore cupidatat ut do dolor nostrud ullamco aliqua aliqua excepteur. Fugiat nostrud esse voluptate magna nostrud nostrud sint et. Irure excepteur irure ullamco occaecat dolor deserunt. Cillum fugiat sunt ullamco ad enim ea eiusmod do et dolor adipisicing mollit aliqua mollit.\r\n',
      score: 3,
    },
    {
      username: 'maxblagun',
      content:
        'Cupidatat veniam quis aliquip ut pariatur excepteur ut. Cupidatat reprehenderit nulla laborum dolore nulla voluptate cupidatat in. Sint tempor non duis sit deserunt culpa sunt labore eu sit consectetur. Excepteur reprehenderit et officia incididunt consectetur laborum consequat laboris excepteur ea adipisicing qui.\r\n',
      score: 10,
    },
    {
      username: 'maxblagun',
      content:
        'Proident qui elit in deserunt velit eu veniam. Tempor velit cillum et dolore. Incididunt anim Lorem Lorem dolor voluptate deserunt cillum consequat ut. Ea fugiat culpa ex et pariatur dolor est officia ea dolore ullamco mollit. Cillum minim consequat ipsum deserunt velit mollit ad consectetur irure dolore proident qui.\r\n',
      score: 6,
    },
    {
      username: 'maxblagun',
      content:
        'Officia exercitation cupidatat enim sint ea quis reprehenderit ipsum. Commodo ullamco deserunt reprehenderit qui in anim aliqua officia do in reprehenderit Lorem. Ipsum non aute officia est nisi sunt non. Proident in eiusmod sint aliquip qui officia deserunt eiusmod sit. Mollit voluptate anim cillum cupidatat duis est ad excepteur consequat fugiat cillum velit esse. Quis dolore sit ullamco qui.\r\n',
      score: 8,
    },
    {
      username: 'currentUser',
      content:
        'Incididunt ut ut velit dolor irure Lorem ex nostrud et laborum commodo dolore laborum culpa. Adipisicing ullamco eu id sit velit ut laboris irure esse quis. Mollit minim laborum do exercitation sint magna ea ea eu eu laboris aliquip anim culpa. Consectetur eiusmod esse ipsum incididunt duis ea nisi qui duis pariatur.\r\n',
      score: 3,
    },
    {
      username: 'currentUser',
      content:
        'Id aute eu quis tempor laborum duis nostrud proident nostrud culpa est ad. Do dolor cillum ullamco excepteur eiusmod laboris dolore do Lorem. Exercitation eiusmod laborum enim culpa esse.\r\n',
      score: 1,
    },
    {
      username: 'amyrobson',
      content:
        'In magna cupidatat ipsum exercitation incididunt non eu amet occaecat et sint irure consequat. Sunt labore incididunt ut culpa aliquip excepteur est. Enim Lorem dolor adipisicing veniam proident quis ad laborum in commodo qui. Proident elit ullamco aliqua non excepteur in fugiat consequat adipisicing ut eu id sunt laboris.\r\n',
      score: 7,
    },
  ],
}

const $ideaContainer = document.getElementById('ideas-container')
let ideas = []

function listIdeas() {
  // list all ideas
  let index = 0
  for (const idea of data.ideas) {
    let user = ''
  
    if(idea.username !== 'currentUser') {
     user = "hide"
    }
  
    const $idea = `
    <div id= "idea-container" class="container bg-light mb-2 rounded" data-id = ${index}>
      <div class="row idea-box">
        <div id="vote-container" class="bg-secondary col-1 m-3 rounded text-center">
          <button type="button" class="btn btn-light">
            <i id="increase" class="bi bi-plus fs-3"></i>
          </button>
          <p class="mt-1 mb-1">${idea.score}</p>
          <button type="button" class="btn btn-light">
            <i id="decrease" class="bi bi-dash fs-3"></i>
          </button>
        </div>
        <div class="col">
          <div class="row mt-2 mb-2">
            <div id="user" class="col fs-5">
              ${idea.username}<span class="p-1 fs-6 rounded bg-primary text-white ms-2 ${user}">you</span>
            </div>
            <div id="edit-panel" class="col edit-panel text-end ${user}">
              <i id="delButton" class="bi bi-trash-fill text-danger">delete</i>
              <i id="editButton" class="bi bi-pencil-fill ms-2 text-primary">edit</i>
            </div>
          </div>
          <div class="row mb-2">
            <div id="idea-content" class="col idea-content">${idea.content}</div>
          </div>
        </div>
      </div>
    </div>
    `
    index++
    ideas.push($idea)
  }
  
  $ideaContainer.innerHTML = ideas.join('')
}

listIdeas()
deletIdea()
editIdea()
initialNumButton()

function initialNumButton() {
  const $increaseBtns = document.querySelectorAll('#increase')
  const $decreaseBtns = document.querySelectorAll('#decrease')

  $increaseBtns.forEach(element => {
    element.addEventListener('mouseover',handleMouseover)
    element.addEventListener('mouseout',handleMouseout)
    element.addEventListener('click',handleNumIncrease)
  });

  $decreaseBtns.forEach(element => {
    element.addEventListener('mouseover',handleMouseover)
    element.addEventListener('mouseout',handleMouseout)
    element.addEventListener('click',handleNumDecrease)
  });
}

function handleNumIncrease(e) {
  const index = e.target.closest('#idea-container').dataset.id
  data.ideas[index].score++
  reset()
}

function handleNumDecrease(e) {
  const index = e.target.closest('#idea-container').dataset.id
  if(data.ideas[index].score > 0) data.ideas[index].score--  
  reset()
}

// Add Idea
const $addButton = document.getElementById('addButton')
const $newIdea = document.getElementById('newIdea')
$addButton.addEventListener('click',addIdea)

const $addTextArea = document.getElementById('newIdea')

function addIdea(e) {
  e.preventDefault()
  if($newIdea.value !== "") {
    data.ideas.push({
      username: 'currentUser',
      content:$newIdea.value,
      score: 0,
    })
    $addTextArea.style.borderColor = '#ced4da'
    reset()
  $newIdea.value = ''
  }else{
    $addTextArea.style.borderColor = 'red' // if input value is null, alert!
  }
}

// Delet an Idea
function deletIdea() {
  const $delButton = document.querySelectorAll('#delButton')

  $delButton.forEach(element => {
    element.addEventListener('mouseover', handleMouseover)
    element.addEventListener('mouseout', handleMouseout)
    element.addEventListener('click', handleDeleteIdea)
  })
}

function handleDeleteIdea(e) {
  const $ideaBox = e.target.closest('#idea-container')
  const index = $ideaBox.dataset.id
  data.ideas.splice(index,1)
  reset()
}

// Edit an Idea
function editIdea() {
  const $editContainer = document.getElementById('edit-container')
  const editContainer= `
    <h4 class="m-2">Edit Idea</h4>
    <textarea id="updateText" rows="3" class="form-control" aria-label="With textarea"></textarea>
    <div class="edit-buttons m-2">
      <button type="button" id="cancelButton" class="btn btn-secondary">Cancel</button>
      <button type="button" id="updateButton" class="btn btn-primary">Update Idea</button>
    </div>
  `
  $editContainer.innerHTML = editContainer
  $editContainer.style.display = 'none'

  const $eidtButton = document.querySelectorAll('#editButton')
  
  $eidtButton.forEach(element => {
    element.addEventListener('mouseover', handleMouseover)
    element.addEventListener('mouseout', handleMouseout)
    element.addEventListener('click', handleEditIdea)
  })
}

function handleEditIdea(e) {
  e.stopPropagation()
  const $editContainer = document.getElementById('edit-container')
  const $ideaBox = e.target.closest('#idea-container')
  const $editTextArea = $editContainer.querySelector('#updateText')
  const id = $ideaBox.dataset.id

  // set edit box style
  $editContainer.style.display = 'flex'
  const top = getElementTop(e.target)
  $editContainer.style.top = (top-100)+"px"

  // set an id for edit container
  $editContainer.setAttribute('data-id', id)
  
  // set the content of textarea
  $editTextArea.textContent = data.ideas[id].content

  const $update = document.getElementById('updateButton')
  const $cancel = document.getElementById('cancelButton')

  $update.addEventListener('click',updateIdea)
  $cancel.addEventListener('click',cancle)
}

function updateIdea(e) {
  const $updateContent = document.getElementById('updateText')
  const $updataContainer = document.getElementById('edit-container')
  const updataContent = $updateContent.value
  const index = $updataContainer.dataset.id

  data.ideas[index].content = updataContent
  reset()
  cancle()
}

function cancle() {
  const $updataContainer = document.getElementById('edit-container')
  $updataContainer.style.display='none'
}

function handleMouseover(e) {
  document.body.style.cursor = 'pointer'
}
function handleMouseout(e) {
  document.body.style.cursor = 'default'
}


function reset() {
  $ideaContainer.innerHTML = ``
  ideas = []
  listIdeas()
  deletIdea()
  editIdea()
  initialNumButton()
}

function getElementTop(element){
  let actualTop = element.offsetTop;
  let current = element.offsetParent;

  while (current !== null){
    actualTop += current.offsetTop;
    current = current.offsetParent;
  }

  return actualTop;
}