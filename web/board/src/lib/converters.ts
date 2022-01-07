// Colors indicator from grade
const colors = {
  A: '#2ecc71',
  B: '#f1c40f',
  C: '#f39c12',
  D: '#d35400',
  F: '#e74c3c',
  Z: '#222222'
}

const getColorFromGrade = (grade: string) => (grade ? (colors as any)[grade.charAt(0)] : '#eeeeee')
const getGradeFromColor = (color: string) => {
  for (let grade in colors) {
    if ((colors as any)[grade] === color) return grade // === 'E' ? 'F' : grade
  }
}

export { getColorFromGrade, getGradeFromColor }
