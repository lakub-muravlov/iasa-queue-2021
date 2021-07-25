export default function numberFilter(number) {
    const str = `${number}`
    return '000'.concat(str).split('').slice(-3).join('')
}
