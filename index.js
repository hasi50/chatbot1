 let chatbot = document.querySelector('.chatbox')
 let incoming = document.querySelector('.incoming')
 let outcoming = document.querySelector('.outcoming')
 let inputfield = document.querySelector('.inputfield textarea')
 let sendbtn = document.querySelector('#sendbtn');
 let usermessage;
 const API_KEY = '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'
 

function generator(incoming){
    const API_URL = "https://openrouter.ai/api/v1/chat/completions";
    let elem = incoming.querySelector('p')
    const requestOptions = {
        method: "POST",
  headers: {
    "Authorization": "barier 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",
    "Content-Type": "application/json"
  },
  body: JSON.stringify({
      "model": "mistralai/mistral-nemo:free",
    messages: [
                        { role: "system", content: "You are a helpful chatbot." },
                        { role: "user", content: usermessage },
                    ],
  })
}
    fetch(API_URL,requestOptions)
.then(res => res.json())
.then((data) =>{
  
  elem.textContent = data.choices[0].message.content

})
.catch((error) =>{
    elem.textContent = 'oops you are writing wrong'
})
    
}
 

function inputgenerator(usermessage,className){
let chatli = document.createElement('li');
chatli.classList.add('chat',className)
let createli = className =='outgoing'? `<p>${usermessage}</p>`:`
          <img src="icons8-chat-bot-50.png" alt="" />
          <p>${usermessage}</p>`
      chatli.innerHTML = createli
        return chatli
}

function handleinput(){
usermessage = inputfield.value.trim()
if(!usermessage) return

chatbot.appendChild(inputgenerator(usermessage,"outgoing"));
setTimeout(() => {
    const incoming =  inputgenerator("Thinking...",'incoming');
    chatbot.appendChild(incoming)
    generator(incoming)
}, 600);

}

 sendbtn.addEventListener('click',handleinput)