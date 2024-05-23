import DidFormStyle from './DidForm.module.scss'
import { Field, Form } from 'react-final-form'
import { getConfigAPI, onBoardParticipantAPI } from '@wizard/api/onboard.api'
import { KeyValueType, ValuesType } from '@wizard/models/base.model'
import { OnBoardParticipant } from '@wizard/models/onBoard.model'
import { useAuth } from '@wizard/contexts'
import { useState } from 'react'
import {
  Button,
  Checkbox,
  Divider,
  InputField,
} from '@gaia-x-frontend/components-lib'
import {
  ValidationCheck,
  requiredValidation,
  validationPrivateKey,
} from '@wizard/utils/helpers'

const DidForm = () => {
  const auth = useAuth()
  const [ownDID, setOwnDID] = useState<boolean>(true)
  const initialFormState = {
    verificationMethod: '',
    privateKey: '',
    issuer: '',
    store: false,
  }
  const onSubmit = (values: KeyValueType) => {
    let onboardParticipantRequestBody: OnBoardParticipant = {
      ownDid: ownDID,
    }
    if (ownDID) {
      onboardParticipantRequestBody = { ...values, ownDid: ownDID }
      onBoardParticipantAPI(onboardParticipantRequestBody, auth.userConfig.id)
        .then((res) => {
          if (res.status == 200) {
            getConfigAPI()
              .then((res) => {
                auth?.setConfig(res.payload)
              })
              .catch((err) => {
                console.log(err)
              })
          }
        })
        .catch((error) => {
          console.log(error)
        })
    } else {
      onBoardParticipantAPI({ ownDid: ownDID }, auth!.userConfig!.id)
        .then((res) => {
          if (res.status == 200) {
            getConfigAPI()
              .then((res) => {
                auth?.setConfig(res.payload)
              })
              .catch((err) => {
                console.log(err)
              })
          }
        })
        .catch((error) => {
          console.log(error)
        })
    }
  }

  const validate = (values: KeyValueType) => {
    const params = {
      verificationMethod: requiredValidation(
        values['verificationMethod'],
        'Verification Method'
      ),
      privateKey: validationPrivateKey(values['privateKey']),
      issuer: requiredValidation(values['issuer'], 'Issuer'),
    }
    if (ownDID) {
      return ValidationCheck(params as unknown as ValuesType)
    } else {
      return {}
    }
  }
  return (
    <div className={DidFormStyle.container}>
      <Form
        initialValues={{ ...initialFormState }}
        onSubmit={onSubmit}
        validate={validate}
        render={({ handleSubmit, form }) => (
          // eslint-disable-next-line @typescript-eslint/no-misused-promises
          <form onSubmit={handleSubmit}>
            <div>
              <Field
                name="verificationMethod"
                render={({ input, meta }) => (
                  <InputField
                    {...input}
                    variant="standard"
                    label="Verification Method Id"
                    fullWidth
                    placeholder="Enter Verification Method ID"
                    error={meta.touched && meta.error}
                    helperText={
                      meta.touched && meta.error && <span>{meta.error}</span>
                    }
                    disabled={!ownDID}
                  />
                )}
              />
            </div>
            <div className="mb-[2rem]">
              <Field
                name="privateKey"
                render={({ input, meta }) => (
                  <InputField
                    {...input}
                    variant="standard"
                    label="Private Key"
                    fullWidth
                    placeholder="Enter Private Key"
                    error={meta.touched && meta.error}
                    helperText={
                      meta.touched && meta.error && <span>{meta.error}</span>
                    }
                    multiline
                    rows={3}
                    disabled={!ownDID}
                  />
                )}
              />
            </div>
            <div>
              <Field
                name="issuer"
                render={({ input, meta }) => (
                  <InputField
                    {...input}
                    variant="standard"
                    label="Issuer (DID)"
                    fullWidth
                    placeholder="Enter Issuer DID"
                    error={meta.touched && meta.error}
                    helperText={
                      meta.touched && meta.error && <span>{meta.error}</span>
                    }
                    disabled={!ownDID}
                  />
                )}
              />
            </div>
            <div>
              <Field
                name="store"
                type="checkbox"
                render={({ input }) => (
                  <label>
                    <Checkbox
                      {...input}
                      label={
                        'Store my Private Key with encryption for future use'
                      }
                      disabled={!ownDID}
                    />
                  </label>
                )}
              />
            </div>
            <div
              className={
                DidFormStyle.container__Divider +
                ' mt-[4rem] mb-[4rem] text-[1.8rem] font-[400]'
              }
            >
              <Divider text={'or'} />
            </div>
            <div>
              <p className={DidFormStyle.container__Message + ' text-[2rem]'}>
                Did you just realise that you don't have the above information
                and would like us to create your DID solution? Select the
                following option and proceed.
              </p>
            </div>
            <div className="mt-[3rem]">
              <label>
                <Checkbox
                  onChange={(event) => {
                    const value = event.target.checked
                    setOwnDID(!value)
                    if (value) {
                      form.restart()
                    }
                  }}
                  label={"We don't already have DID and Private Key"}
                />
              </label>
            </div>

            <div className="flex justify-center mt-[3rem]">
              <Button
                variant="contained"
                type="submit"
                color="primary"
                className="mt-[2rem]"
              >
                Proceed
              </Button>
            </div>
          </form>
        )}
      />
    </div>
  )
}
export { DidForm }
