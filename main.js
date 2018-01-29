function createCheckListItem(name, id) {
  let container = document.createElement('div');
  container.classList.add('check-list-item-container');

  let check = document.createElement('input');
  check.id = id;
  check.setAttribute('type', 'checkbox');
  check.style.display = 'none';
  container.appendChild(check);

  let label = document.createElement('label');
  label.setAttribute('for', id);
  label.innerText = name;
  container.appendChild(label);

  let span = document.createElement('span');
  span.classList.add('check-list-item');
  label.appendChild(span);

  return container;
}

function createThing(id, name, time, asynchronous) {
  let elm = createCheckListItem(name, id);
  elm.dataset.name = name;
  elm.dataset.time = time;
  elm.dataset.async = asynchronous;
  return elm;
}

function createThingList(data) {
  let container = document.createElement('div');
  for (let i = 0; i < data.length; i++) {
    let di = data[i];
    let elm = createThing("t"+i, di[0], di[1], di[2]);
    container.appendChild(elm);
  }
  return container;
}

function getCheckedItems() {
  let all = document.getElementsByClassName('check-list-item-container');
  let filter = [];
  for (let elm of all) {
    if (elm.querySelector('input[type="checkbox"]:checked')) {
      filter.push([elm.dataset.name, parseInt(elm.dataset.time), elm.dataset.async === "true"]);
    }
  }
  return filter;
}

function zeroPad(value, digits) {
  let zeros = '';
  for (let i = 0; i < digits; i++) zeros += '0';
  return (zeros + value).slice(-digits);
}

function plan(data) {
  let now = new Date();
  data.sort((a, b) => a[1] > b[1]);
  data.sort((a, b) => a[2] === false && b[2] === true);
  let result = [];
  for (let thing of data) {
    let bh = zeroPad(now.getHours(), 2);
    let bm = zeroPad(now.getMinutes(), 2);
    let next = new Date(now.getTime() + thing[1] * 60000);
    let ah = zeroPad(next.getHours(), 2);
    let am = zeroPad(next.getMinutes(), 2);
    let r = `[${bh}:${bm} - ${ah}:${am}] ${thing[0]}`;
    result.push(r);
    if (thing[2] === false) now = next;
  }
  return result;
}


