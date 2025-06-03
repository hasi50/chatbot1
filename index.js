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
      "model": "deepseek/deepseek-r1:free",
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
  