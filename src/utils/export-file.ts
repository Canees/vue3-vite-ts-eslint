import * as XLSX from 'xlsx'
import html2canvas from 'html2canvas'
import JSPDF from 'jspdf'

/**
 * 自动下载
 * @param url 保存地址|blob
 * @param saveName 文件名
 */
const download = (url: string | Blob | object, saveName: string) => {
  if (typeof url === 'object' && url instanceof Blob) {
    url = URL.createObjectURL(url) // 创建blob地址
  }
  const aLink = document.createElement('a')
  aLink.href = url as any
  aLink.download = saveName || '' // HTML5新增的属性，指定保存文件名，可以不要后缀，注意，file:///模式下不会生效
  let event
  if (window.MouseEvent) event = new MouseEvent('click')
  else {
    event = document.createEvent('MouseEvents')
    event.initMouseEvent('click', true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null)
  }
  aLink.dispatchEvent(event)
}

/**
 * 解析excel表格
 * @param file 文件
 * @returns
 */
export const exp2json = async (file: File) => new Promise((resolve, reject) => {
  try {
    const reader = new FileReader()
    reader.onload = (e) => {
      const wb = XLSX.read(e.target?.result, {
        type: 'binary'
      }) // 读取完成的数据
      // 转成json header解析第一行标题
      const data = XLSX.utils.sheet_to_json(wb.Sheets[wb.SheetNames[0]], { header: 1 })
      resolve(data)
    }
    reader.readAsBinaryString(file)
  } catch (error) {
    console.log('解析错误')
    reject(error)
  }
})

/**
 * 导出excel表格
 * @param arr 数据是数组包含的对象
 * @param fileName 名字
 */
export const exp2excel = (arr: object[], fileName: string, cellMerges?: Array<any>) => {
  const sheet = XLSX.utils.json_to_sheet(arr)
  // excel宽高设置
  sheet['!cols'] = arr.map(() => ({ wch: 30 }))
  if (cellMerges) {
    sheet['!merges'] = cellMerges // <====合并单元格
  }
  // 转blob
  const sheet2blob = (sheets: any, sheetName = 'sheet1') => {
    const workbook = {
      SheetNames: [ sheetName ],
      Sheets: {} as any
    }
    workbook.Sheets[sheetName] = sheets
    // 生成excel的配置项
    const wopts = {
      bookType: 'xlsx', // 要生成的文件类型
      bookSST: false, // 是否生成Shared String Table，官方解释是，如果开启生成速度会下降，但在低版本IOS设备上有更好的兼容性
      type: 'binary'
    } as any
    const wbout = XLSX.write(workbook, wopts)
    // 字符串转ArrayBuffer
    const s2ab = (s: string) => {
      const buf = new ArrayBuffer(s.length)
      const view = new Uint8Array(buf)
      for (let i = 0; i !== s.length; ++i) view[i] = s.charCodeAt(i) & 0xFF
      return buf
    }
    const blob = new Blob([ s2ab(wbout) ], { type: 'application/octet-stream' })

    return blob
  }
  download(sheet2blob(sheet), `${fileName}.xlsx`)
}

/**
 * dom导出excel
 * @param domID domID
 * @param fileName 文件名
 */
export const dom2excel = (domID: string, fileName: string) => {
  const dom = document.getElementsByTagName(domID)
  if (!dom) return
  const wb = XLSX.utils.table_to_book(dom[0])
  const baty = XLSX.write(wb, { bookType: 'xlsx', bookSST: false, type: 'binary' })
  // 字符串转ArrayBuffer
  const s2ab = (s: any) => {
    const buf = new ArrayBuffer(s.length)
    const view = new Uint8Array(buf)
    for (let i = 0; i !== s.length; ++i) view[i] = s.charCodeAt(i) & 0xFF
    return buf
  }
  const blob = new Blob([ s2ab(baty) ], { type: 'application/octet-stream' })
  download(blob, `${fileName}.xlsx`)
}

/**
 * 导出PDF
 * @param domID 需要输出PDF的页面id
 * @param fileName 文件名
 * @param type  默认A4分页
 * @param wMultiple 宽倍数
 * @param hMultiple 高倍数
 * @returns
 */
export const exp2pdf = async (domID: string, fileName: string, type = 'A4', wMultiple = null, hMultiple = null) => {
  const dom = document.getElementById(domID)
  if (!dom) return
  const domHeight = dom.offsetHeight // 获取DOM高度
  const domWidth = dom.offsetWidth // 获取DOM宽度
  const canvas = await html2canvas(dom, {
    logging: false,
    useCORS: true, // 允许图片跨域
    scale: 1.5,
    width: wMultiple ? wMultiple * domWidth : undefined,
    height: hMultiple ? hMultiple * domHeight : undefined
  })

  if (type === 'A4') {
    // A4分页
    const pdf = new JSPDF('p', 'mm', 'a4') // A4纸，纵向
    const ctx = canvas.getContext('2d') as any
    const a4w = 200
    const a4h = 277 // A4大小，210mm x 297mm，四边各保留20mm的边距
    const imgHeight = Math.floor(a4h * canvas.width / a4w) // 按A4显示比例换算一页图像的像素高度
    let renderedHeight = 0
    while (renderedHeight < canvas.height) {
      const page = document.createElement('canvas')
      page.width = canvas.width
      page.height = Math.min(imgHeight, canvas.height - renderedHeight) // 可能内容不足一页
      // 用getImageData剪裁指定区域，并画到前面创建的canvas对象中
      page.getContext('2d')?.putImageData(ctx.getImageData(0, renderedHeight, canvas.width, Math.min(imgHeight, canvas.height - renderedHeight)), 0, 0)
      pdf.addImage(page.toDataURL('image/jpeg', 1.0), 'JPEG', 10, 10, a4w, Math.min(a4h, a4w * page.height / page.width)) // 添加图像到页面，保留10mm边距
      renderedHeight += imgHeight
      if (renderedHeight < canvas.height) { pdf.addPage() } // 如果后面还有内容，添加一个空页
      // delete page;
    }
    pdf.save(fileName)
  } else {
    // 整张
    const pdf = new JSPDF('p', 'px', [ domWidth, domHeight ])
    pdf.addImage(canvas.toDataURL('image/jpeg', 1.0), 'JPEG', 10, 10, domWidth, domHeight)
    pdf.save(fileName)
  }
}

/**
 * 导出PNG
 * @param domID 需要输出PDF的页面id
 * @param fileName 文件名
 * @param bkcolor 背景色
 */
export const exp2png = async (domID: string, fileName: string, bkcolor: string) => {
  window.scroll(0, 0) // 首先先顶部
  const design = document.getElementById(domID) as HTMLElement
  if (!design) return
  const imgHeight = design.offsetHeight // 获取DOM高度
  const imgWidth = design.offsetWidth // 获取DOM宽度
  const scale = window.devicePixelRatio <= 3 ? 3 : window.devicePixelRatio // 获取设备像素比
  const canvas = await html2canvas(design, {
    backgroundColor: bkcolor, // 设置背景颜色
    useCORS: true, // 允许图片跨域
    scale, // 缩放3倍，使得图片更加清晰=>越清晰图片越大
    width: imgWidth,
    height: imgHeight,
    imageTimeout: 5000 // 设置图片的超时，设置0为禁用
  })

  // 两种下载方式url + blob
  let imgURL = canvas.toDataURL('image/png') as any
  if (typeof imgURL === 'object' && imgURL instanceof Blob) {
    imgURL = URL.createObjectURL(imgURL) // 创建blob地址
    download(imgURL, fileName)
  } else {
    // url  +  请求得到blob
    const htmlrq = new XMLHttpRequest() as any
    htmlrq.open('GET', imgURL, true)
    htmlrq.responseType = 'blob'
    htmlrq.onload = (e: { target: { status: number; response: Blob | MediaSource; } }) => {
      if (e.target.status === 200) {
        imgURL = URL.createObjectURL(e.target.response) // 创建blob地址
        download(imgURL, fileName)
      } else {
        console.error('下载错误')
      }
    }
    htmlrq.send()
  }
}