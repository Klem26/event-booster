const REG_EXP = /^[\w\s-]{2,30}$/; // от 2 до 30 символов - буквы латинские, цифры, пробелы и дефис

export default function isValid(text) {
  return REG_EXP.test(text);
}
