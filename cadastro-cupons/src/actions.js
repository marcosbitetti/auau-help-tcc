// constantes
const ACT = {
  NAVIGATE : 1,

}

// Controla a navegacao de telas
let navigationStack = []

exports.navigate = (dst) => {
  if (dst=='back') navigationStack.pop(); else navigationStack.push(dst);
  if(dst=='home') navigationStack.length = 0
  if (navigationStack.length==0) navigationStack.push('home')
  dst = navigationStack[navigationStack.length-1]
  return {type:ACT.NAVIGATE, payload:{page:dst}}
}

export default ACT
