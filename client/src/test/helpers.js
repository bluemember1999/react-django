import { keys } from 'lodash';

export function changeInputValue(inputWrapper, value) {
  inputWrapper.simulate('change', { target: { value } });
}

export function getInputValue(wrapper, formName, key) {
  return wrapper.find(`input[id="${formName}_${key}"]`).prop('value');
}

export function updateFormValues(wrapper, data, formName, clear =  false) {
  keys(data).forEach((key) => {
    changeInputValue(wrapper.find(`input[id="${formName}_${key}"]`), !clear ? data[key] : '');
  });
}