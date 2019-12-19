import _ from 'lodash';
import printMe from './print.js';
// import './style';
function component() {
    var element = document.createElement('div');
    var btn = document.createElement('button');
    // Lodash, now imported by this script
    element.innerHTML = _.join(['Hello1', 'webpack'], ' ');
    btn.innerHTML = 'Click me and check the console!';
    btn.onclick = printMe;
    element.appendChild(btn);
    return element;
}

document.body.appendChild(component());

if (module.hot) {
    module.hot.accept('./print.js', function(){
        console.log('Accepting the updated printMe module!');
        printMe();
    })
}
