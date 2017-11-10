/*
* Handles channel actions
*/

//  TODO ensure thi is valid
//  how are incoming messages sent?
export default function (state = null, action) {
  switch (action.type) {
    case 'TEST':
      console.log('in channel reducer');
      return {
        state
      };
    default:
      return state;
  }
}
