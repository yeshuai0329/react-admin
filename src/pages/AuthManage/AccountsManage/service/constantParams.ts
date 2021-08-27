
// 账号管理Table
export const titleMap: {[key:string]: string} = {
  1: '创建账号',
  2: '编辑账号'
}

export const departmentMap: {value: string, label: string}[] = [
  { value: '', label: '全部' },
  { value: '1', label: '行政部门' },
  { value: '2', label: '财务部门' },
  { value: '3', label: '研发部门' },
  { value: '4', label: '销售部门' },
  { value: '5', label: '公关部门' }
]

export const accountStatusMap: {value: string | number, label: string}[] = [
  { value: '', label: '全部' },
  { value: 0, label: '已禁用' },
  { value: 1, label: '已启用' }
]
