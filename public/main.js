const websocket = new WebSocket('ws://127.0.0.1:4010/api/socket');
websocket.onmessage = (message) => {
    const door = document.querySelector(`#door-${message.data}`);
    door.querySelector('#closed').style = 'display: none;';

    setTimeout(function() {
      door.querySelector('#closed').style = 'display: unset;'
    }, 7000)
}
const doors = document.querySelectorAll('.door').forEach(door => {
  door.querySelector('#closed').addEventListener('click', () => {

    door.querySelector('#closed').style = 'display: none;'

    setTimeout(function() {
      door.querySelector('#closed').style = 'display: unset;'
    }, 7000)

  })
})
