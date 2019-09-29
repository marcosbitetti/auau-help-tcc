// constantes
const ACT = {
  NAVIGATE : 'NAVIGATE',
  GET_LOJAS: 'GET_LOJAS',
  GET_LOJAS_SUCCESS: 'GET_LOJAS_SUCCESS',
  GET_LOJAS_FAIL: 'GET_LOJAS_FAIL',
  GET_EMPRESAS: 'GET_EMPRESAS',
  GET_EMPRESAS_SUCCESS: 'GET_EMPRESAS_SUCCESS',
  GET_EMPRESAS_FAIL: 'GET_EMPRESAS_FAIL',
  GET_PONT_DE_VENDA: 'GET_PONT_DE_VENDA',
  GET_PONT_DE_VENDA_SUCCESS: 'GET_PONT_DE_VENDA_SUCCESS',
  GET_PONT_DE_VENDA_FAIL: 'GET_PONT_DE_VENDA_FAIL',
  GET_CAMPANHA: 'GET_CAMPANHA',
  GET_CAMPANHA_SUCCESS: 'GET_CAMPANHA_SUCCESS',
  GET_CAMPANHA_FAIL: 'GET_CAMPANHA_FAIL',
  GET_OAB: 'GET_OAB',
  GET_OAB_SUCCESS: 'GET_OAB_SUCCESS',
  GET_OAB_FAIL: 'GET_OAB_FAIL',
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


exports.getLojas = () => {
  return {
    type: ACT.GET_LOJAS,
    payload: {
      request: {
        url: '/',
        method: 'POST',
        //headers: getHeaders(),
        data: {
          action: 'getLojas',
        },
      },
    },
  }
}

exports.getEmpresas = () => {
  return {
    type: ACT.GET_EMPRESAS,
    payload: {
      request: {
        url: '/',
        method: 'POST',
        //headers: getHeaders(),
        data: {
          action: 'getEmpresas',
        },
      },
    },
  }
}

exports.getPontoDeVenda = () => {
  return {
    type: ACT.GET_PONT_DE_VENDA,
    payload: {
      request: {
        url: '/',
        method: 'POST',
        //headers: getHeaders(),
        data: {
          action: 'getPontoDeVenda',
        },
      },
    },
  }
}

exports.getCampanha = () => {
  return {
    type: ACT.GET_CAMPANHA,
    payload: {
      request: {
        url: '/',
        method: 'POST',
        //headers: getHeaders(),
        data: {
          action: 'getCampanha',
        },
      },
    },
  }
}

exports.getOAB = () => {
  return {
    type: ACT.GET_OAB,
    payload: {
      request: {
        url: '/',
        method: 'POST',
        //headers: getHeaders(),
        data: {
          action: 'getOAB',
        },
      },
    },
  }
}

export default ACT
