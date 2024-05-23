import { checkEmptyValue } from './common.helper'
import { REGEX } from '../constants'
import {
  Registration,
  RegistrationWithUndefined,
} from '@wizard/models/onBoard.model'

function validateURL(URLValue: string) {
  return REGEX.WEB_URL.test(URLValue)
}

export const ValidationCheck = (values: any) => {
  const errors: any = {}

  Object.keys(values).forEach((item: any) => {
    if (Array.isArray(values[item])) {
      values[item].forEach((value: any) => {
        if (!value.key) {
          errors[item] = value.msg
        }
      })
    } else if (
      typeof values[item] === 'object' &&
      values[item] !== null &&
      Array.isArray(values[item]['fieldValidation'])
    ) {
      errors[item] = [...values[item]['fieldValidation']]
    }
  })
  return errors
}

export const emailValidation = (email: string) => {
  return [
    {
      key: email && email.length > 8 && email.length <= 100,
      msg: 'Email length must be 8 to 100',
    },
    {
      key: ValidateEmail(email),
      msg: 'Email should be valid',
    },
    { key: email, msg: 'Email is required' },
  ]
}

export const addressValidation = (name: object | null) => {
  return [{ key: name, msg: 'address is required' }]
}

export const legalRegistrationTypeValidation = (name: string) => {
  if (
    name === '' ||
    name === undefined ||
    (typeof name === 'string' && name.length === 0)
  ) {
    return 'Legal registration type is required'
  } else {
    return
  }
}

export const legalRegistrationNumberValidation = (name: string) => {
  if (
    name === '' ||
    name === undefined ||
    (typeof name === 'string' && name.length === 0)
  ) {
    return 'Legal registration number is required'
  } else if (!AlphaNumericFormat(name)) {
    return 'Legal registration number is invalid'
  } else {
    return
  }
}

// Validate Email pattern func
function ValidateEmail(mail: string) {
  if (REGEX.EMAIL_VALID.test(mail)) {
    return true
  }
  return false
}
function AlphaNumericFormat(string: string) {
  if (REGEX.ALPHA_NUMBER_FORMAT.test(string)) {
    return true
  }
  return false
}

function ValidateAlphaNumericWithSpace(value: string) {
  if (REGEX.ALPHA_NUMERIC_WITH_SPACE_REGEXP.test(value)) {
    return true
  }
  return false
}

// On Boarding Array form func
export const validateRegistrations = (registrations: Registration[]) => {
  if (registrations?.length) {
    const actualErrors: RegistrationWithUndefined[] = []
    registrations.forEach((item) => {
      const errors: RegistrationWithUndefined = {}
      errors['legalRegistrationType'] = legalRegistrationTypeValidation(
        item.legalRegistrationType
      )
      errors['legalRegistrationNumber'] = legalRegistrationNumberValidation(
        item.legalRegistrationNumber
      )
      actualErrors.push(errors)
    })

    return { fieldValidation: actualErrors }
  } else {
    return null
  }
}

export const validateRequired = (
  value: unknown,
  fieldName: string
): {
  isEmpty: boolean
  msg: string
} => {
  return { isEmpty: checkEmptyValue(value), msg: `${fieldName} is required` }
}

export const validateField = (
  values: string,
  fieldName: string,
  isRequired = false,
  isAlphaNumericWithSpace = false,
  minLength = 0,
  maxLength = 0,
  isValidURL = false,
  isNumeric = false,
  isEmail = false
) => {
  const { isEmpty, msg } = validateRequired(values, fieldName)
  if (isRequired && isEmpty) {
    return msg
  } else if (isValidURL && values && !ValidateWebUrl(values)) {
    return `${fieldName} should be valid url`
  } else if (
    isAlphaNumericWithSpace &&
    values &&
    !ValidateAlphaNumericWithSpace(values)
  ) {
    return `${fieldName} is invalid`
  } else if (isNumeric && values && !ValidateNumeric(values)) {
    return `${fieldName} should be numeric`
  } else if (values && isEmail && !ValidateEmail(values)) {
    return `${fieldName} should be valid`
  } else if (
    values &&
    minLength &&
    maxLength &&
    (values.length < minLength || values.length > maxLength)
  ) {
    return `${fieldName} length should be ${minLength} to ${maxLength} characters`
  } else if (minLength && !maxLength && values && values.length < minLength) {
    return `${fieldName} length should be greater than ${minLength}`
  } else if (maxLength && !minLength && values && values.length > maxLength) {
    return `${fieldName} length should be less than ${maxLength}`
  } else {
    return ''
  }
}

export const validationPrivateKey = (privateKey: string) => {
  //todo : add regex for PrivateKey if required
  const isValidPrivateKey =
    /-----BEGIN\s+PRIVATE KEY-----\s*([A-Za-z0-9+/=\s]+)\s*-----END\s+PRIVATE KEY-----/.test(
      privateKey
    )
  return [
    { key: privateKey, msg: 'Private Key is required' },
    {
      key: isValidPrivateKey,
      msg: 'Enter a valid private key',
    },
  ]
}

export const selectMultipleValidation = (
  name: object[] | null,
  fieldName: string
) => {
  return [{ key: name?.length, msg: `${fieldName} is required` }]
}
export const selectValidation = (name: object | null, fieldName: string) => {
  return [{ key: name, msg: `${fieldName} is required` }]
}

export const ValidateWebUrl = (url: string) => {
  if (REGEX.WEB_URL.test(url)) {
    return true
  }
  return false
}

export const ValidateNumeric = (numeric: string) => {
  if (REGEX.NUMBER_FORMAT.test(numeric)) {
    return true
  }
  return false
}

export const urlValidation = (urlValue: string, fieldValue: string) => {
  return [
    {
      key: urlValue && validateURL(urlValue),
      msg: `${fieldValue} is invalid`,
    },

    { key: urlValue, msg: `${fieldValue} is required` },
  ]
}

export const requiredValidation = (value: string, fieldName: string) => {
  return [{ key: value, msg: `${fieldName} is required` }]
}

export const validateChipsAsURL = (chips: string[], fieldName: string) => {
  let errorMsg = ''
  if (chips && chips.length) {
    chips.forEach((url: string) => {
      const hasError = !ValidateWebUrl(url)
      if (hasError) {
        errorMsg = `${fieldName} should be valid url`
      }
    })
  }
  return errorMsg
}

export const validateUrlChip = (
  urlList: string[],
  fieldName: string,
  isRequired = false
) => [
  {
    key: checkEmptyValue(validateChipsAsURL(urlList, fieldName)),
    msg: validateChipsAsURL(urlList, fieldName),
  },
  {
    key: !isRequired || urlList?.length,
    msg: `Please enter a Valid Gaia X Complied Resource VC URL in ${fieldName}`,
  },
]
