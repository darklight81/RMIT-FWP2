import { useField } from 'formik';
import { 
  FormControl, 
  FormLabel, 
  Input, 
  FormHelperText, 
  FormErrorMessage 
} from '@chakra-ui/react';

const TextInput = ({ label, helperText, ...props }) => {
  /**
   * The `useField` hook returns field props and other useful 
   * info which we spread on our Chakra <Input> component. 
   * 
   * We use the field meta to show an error if the field 
   * is invalid and has been visited (touched) and
   * to update the isInvalid state on our <FormControl>.
   * 
   *   FieldInputProps    FieldMetaProps
   *    * name             * error?
   *    * value            * touched
   *    * onBlur           * ...
   *    * onChange
   *    * ...
   */
  const [field, meta] = useField(props);
  const hasError = meta.touched && meta.error;

  return (
    <FormControl isInvalid={hasError} isRequired={props.isRequired}>
      <FormLabel>{label}</FormLabel>
      <Input errorBorderColor="orange.500" {...field} {...props} />
      {hasError && <FormErrorMessage color="orange.500">{meta.error}</FormErrorMessage>}
      {helperText && <FormHelperText>{helperText}</FormHelperText>}
    </FormControl>
  )
}

export { TextInput }
