import gradient from 'gradient-string'

const defaultBanner = 'Micro Build - 一站式的 B 端系统搭建工具'
const gradientBanner = gradient([
  { color: '#42d392', pos: 0 },
  { color: '#42d392', pos: 0.1 },
  { color: '#04a7f1', pos: 1 }
])(defaultBanner)

export { defaultBanner, gradientBanner }
