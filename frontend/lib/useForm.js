import { useState } from 'react';

export default function useForm(initial = {}) {
  // create a state object for our inputs
  const [inputs, setInputs] = useState(initial);

  function handleChange(e) {
    let { value, name, type } = e.target;
    // to ensure that the input is returned as a number and not a string when changed
    if (type === 'number') {
      value = parseInt(value);
    }
    // to ensure that if its a file and needs to be an array of files, the first item of the array is the file
    if (type === 'file') {
      value[0] = e.target.files;
    }
    setInputs({
      // copy the existing state
      ...inputs,
      [name]: value,
    });
  }

  

  // return the things we want to surface from this custom hook
  return {
    inputs,
    handleChange,
  };
}
