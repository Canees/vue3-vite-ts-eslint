/** api接口返回值类型 */
declare type NetResult = {
  success: boolean,
  data: any,
  msg: string,
  code: number
}

/**
 * post方法请求接口
 * @param url 接口地址
 * @param params 接口参数
 */
export function POST(url: string, params: any = {}, timeout = 6000): Promise<NetResult> {
  return new Promise((resolve) => {
    const controller = new AbortController()
    const { signal } = controller
    setTimeout(() => {
      controller.abort()
    }, timeout)
    fetch(`/api${url}`, {
      signal,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer '
      },
      body: JSON.stringify(params)
    }).then((res: any) => resolve(res)).catch((err: any) => resolve(err))
  })
}

/**
 * upload上传文件接口
 * @param url 接口地址
 * @param params 接口参数
 */
export function UPLOAD(url: string, params: any, timeout = 6000): Promise<NetResult> {
  return new Promise((resolve) => {
    const controller = new AbortController()
    const { signal } = controller
    setTimeout(() => {
      controller.abort()
    }, timeout)

    fetch(`/api${url}`, {
      signal,
      method: 'POST',
      headers: { Authorization: 'Bearer ' },
      body: params
    }).then((res: any) => resolve(res)).catch((err: any) => resolve(err))
  })
}

/**
 * get请求api接口
 * @param url 接口地址
 */
export function GET(url: string, timeout = 6000): Promise<NetResult> {
  return new Promise((resolve) => {
    const controller = new AbortController()
    const { signal } = controller
    setTimeout(() => {
      controller.abort()
    }, timeout)
    fetch(`/api${url}`, {
      signal,
      method: 'get',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer '
      }
    }).then((res: any) => resolve(res)).catch((err: any) => resolve(err))
  })
}

/**
 * del请求api接口
 * @param url 接口地址
 */
export function DEL(url: string, timeout = 6000): Promise<NetResult> {
  return new Promise((resolve) => {
    const controller = new AbortController()
    const { signal } = controller
    setTimeout(() => {
      controller.abort()
    }, timeout)
    fetch(`/api${url}`, {
      signal,
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer '
      }
    }).then((res: any) => resolve(res)).catch((err: any) => resolve(err))
  })
}

/**
 * post方法请求接口
 * @param url 接口地址
 * @param params 接口参数
 */
export function PUT(url: string, params: any = {}, timeout = 6000): Promise<NetResult> {
  return new Promise((resolve) => {
    const controller = new AbortController()
    const { signal } = controller
    setTimeout(() => {
      controller.abort()
    }, timeout)
    fetch(`/api${url}`, {
      signal,
      method: 'put',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer '
      },
      body: JSON.stringify(params)
    }).then((res: any) => resolve(res)).catch((err: any) => resolve(err))
  })
}
