import { Field, Form } from 'react-final-form'
import { checkEmptyValue, validateField } from '@wizard/utils/helpers'
import { KeyValueType } from '@wizard/models/base.model'
import EsignStyle from './Esign.module.scss'

import {
  Button,
  Checkbox,
  InputField,
  ProgressBar,
  TextArea,
} from '@gaia-x-frontend/components-lib'

import {
  ServiceCreationComponentProps,
  ServiceOfferingFinalFormPrototype,
} from '@wizard/models/service-creation.model'

const ESign = ({
  onClickPrev,
  onSubmitform,
  serviceCreationForm,
  isSubmitLoading,
  setServiceCreationForm,
  isPrivate,
}: ServiceCreationComponentProps) => {
  // const [storeEncryption, setStoreEncryption] = useState<boolean>(true)

  const initialFormState = {
    participantJson: serviceCreationForm?.participantJson,
    verificationMethodId: serviceCreationForm?.verificationMethodId,
    signWithPrivateKey: serviceCreationForm?.signWithPrivateKey,
    storeForFuture: serviceCreationForm?.storeForFuture,
  }

  const onSubmit = (formValues: KeyValueType) => {
    if (setServiceCreationForm)
      setServiceCreationForm(
        (state: ServiceOfferingFinalFormPrototype | any) => ({
          ...state,
          ...formValues,
        })
      )
    onSubmitform(formValues)
  }

  const validate = (values: KeyValueType) => {
    const errors: { [key: string]: string } = {}
    errors['participantJson'] = validateField(
      values['participantJson'],
      'Participant Json',
      true,
      false,
      0,
      0,
      true
    )
    errors['verificationMethodId'] = validateField(
      values['verificationMethodId'],
      'Verification method id',
      true
    )
    errors['signWithPrivateKey'] = validateField(
      values['signWithPrivateKey'],
      'Private key',
      true
    )
    for (const key in errors) {
      if (checkEmptyValue(errors[key])) {
        delete errors[key]
      }
    }
    return errors
  }

  return (
    <div
      className={
        EsignStyle.serviceESignContainer +
        ' flex flex-col items-center w-[100%] mt-[2rem]'
      }
    >
      <div className="w-[70rem] relative ">
        <h3 className="mb-[2.8rem] font-[600] text-left text-[2rem] mt-[1rem]">
          Sign with your private key
        </h3>
        <Form
          initialValues={{ ...initialFormState }}
          onSubmit={onSubmit}
          validate={validate}
          keepDirtyOnReinitialize
          render={({ handleSubmit }) => (
            <form noValidate onSubmit={handleSubmit}>
              {isSubmitLoading && (
                <div className={' absolute w-[100%] bg-white/60  z-10 '}>
                  <div
                    className={
                      'flex w-[100%] justify-center items-center h-[60rem]'
                    }
                  >
                    <ProgressBar type={'circular'} />
                  </div>
                </div>
              )}
              <div
                className={
                  EsignStyle.serviceESignContainer__form +
                  ' pt-[3.6rem] pb-[3.6rem] pl-[3rem] pr-[3rem] rounded-[1.6rem]'
                }
              >
                <div>
                  <Field
                    name="participantJson"
                    render={({ input, meta }) => (
                      <InputField
                        {...input}
                        variant="standard"
                        label="Participant JSON"
                        fullWidth
                        disabled={isSubmitLoading}
                        // onBlur={}
                        placeholder="Enter Participant JSON"
                        error={meta.touched && meta.error ? true : false}
                        required
                        helperText={
                          meta.touched &&
                          meta.error && <span>{meta.error}</span>
                        }
                      />
                    )}
                  />
                </div>

                <div className="mt-[2rem]">
                  <Field
                    name="verificationMethodId"
                    render={({ input, meta }) => (
                      <InputField
                        {...input}
                        variant="standard"
                        label="Verification method id"
                        fullWidth
                        disabled={isSubmitLoading}
                        placeholder="Enter verification method id"
                        error={meta.touched && meta.error ? true : false}
                        required
                        helperText={
                          meta.touched &&
                          meta.error && <span>{meta.error}</span>
                        }
                      />
                    )}
                  />
                </div>

                <div className="mt-[2rem]">
                  <Field
                    name="signWithPrivateKey"
                    render={({ input, meta }) => (
                      <TextArea
                        {...input}
                        variant="standard"
                        label="Sign with your private key"
                        fullWidth
                        rows={3}
                        disabled={isSubmitLoading}
                        multiline
                        placeholder="Sign with your private key"
                        error={meta.touched && meta.error ? true : false}
                        required
                        helperText={
                          meta.touched &&
                          meta.error && <span>{meta.error}</span>
                        }
                      />
                    )}
                  />
                </div>

                {isPrivate ? (
                  <div className="mt-[3rem]">
                    <Field
                      name="storeForFuture"
                      type="checkbox"
                      render={({ input }) => (
                        <label>
                          <Checkbox
                            disabled={isSubmitLoading}
                            onChange={(event) => {
                              // const value = event.target.checked
                              // setStoreEncryption(value)
                              input.onChange(event)
                            }}
                            label={
                              <span>
                                Store my Private Key with encryption for future
                                use
                              </span>
                            }
                          />
                        </label>
                      )}
                    />
                  </div>
                ) : null}
              </div>

              <div
                className={`${EsignStyle.serviceESignContainer__bottom} text-right flex justify-end gap-[2rem] mt-[5rem] pb-[2rem]`}
              >
                <Button
                  variant="outlined"
                  type="button"
                  color="primary"
                  className="mt-[2rem]"
                  size="medium"
                  onClick={onClickPrev}
                >
                  Back
                </Button>
                <Button
                  variant="contained"
                  type="submit"
                  color="primary"
                  className="mt-[2rem]"
                  disabled={isSubmitLoading}
                >
                  Submit
                </Button>
              </div>
            </form>
          )}
        />
      </div>
    </div>
  )
}

export { ESign }
