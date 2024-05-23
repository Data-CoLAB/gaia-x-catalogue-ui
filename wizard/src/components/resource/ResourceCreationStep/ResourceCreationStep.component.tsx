import dayjs from 'dayjs'
import ResourceCreationStepStyled from './ResourceCreationStep.module.scss'
import { Field, Form } from 'react-final-form'
import { KeyValueType } from '@wizard/models/base.model'
import { LegalBasisList } from './ResourceCreationStep.constant'
import { postValidateResourceCreation } from '@wizard/api/resourceCreation.api'
import { ResourceCreationParamType } from '@wizard/models/resource-creation.model'
import { useAuth } from '@wizard/contexts'
import { useEffect, useState } from 'react'
import {
  checkEmptyValue,
  removeEmptyFields,
  validateChipsAsURL,
  validateField,
  Item,
  onLoadSubDivisions,
} from '@wizard/utils/helpers'
import {
  AsyncSearchSelect,
  Button,
  Card,
  InputChips,
  InputField,
  RadioButtonGroup,
  TextArea,
  DateTimePicker,
  Select,
} from '@gaia-x-frontend/components-lib'
import {
  DATE_TIME_FORMATE,
  InputChipsAddOnOption,
  ResourceSubType,
  ResourceSubTypeList,
  ResourceType,
  ResourceTypeList,
} from '@wizard/utils/constants'
import {
  onLoadLicenseOption,
  onLoadVcOption,
} from './ResourceCreationStep.helper'
import { AppLoader } from '@wizard/components'

interface ResourceCreationStepProps {
  onClickNext: () => void
  setServiceCreationForm: React.Dispatch<React.SetStateAction<object>>
  setResourceParams: React.Dispatch<React.SetStateAction<object>>
  resourceCreationForm?: any
  onSubmitform: (value: KeyValueType) => void
  isSubmitLoading: boolean
  setCreateResourceLoading: (value: boolean) => void
}

const ResourceCreationStep = ({
  onClickNext,
  setServiceCreationForm: setResourceCreationForm,
  setResourceParams,
  resourceCreationForm,
  onSubmitform,
  isSubmitLoading,
  setCreateResourceLoading,
}: ResourceCreationStepProps) => {
  const initialFormState = {
    resourceName: resourceCreationForm?.resourceName,
    description: resourceCreationForm?.description,
    aggregation: resourceCreationForm?.aggregation,
    resourceType: resourceCreationForm?.resourceType,
    resourceSubType: resourceCreationForm?.resourceSubType,
    locationAddress: resourceCreationForm?.locationAddress,
    locationCoordinates: resourceCreationForm?.locationCoordinates,
    maintainedBy: resourceCreationForm?.maintainedBy,
    ownedBy: resourceCreationForm?.ownedBy,
    manufacturedBy: resourceCreationForm?.manufacturedBy,
    copyrightOwner: resourceCreationForm?.copyrightOwner,
    policy: resourceCreationForm?.policy,
    license: resourceCreationForm?.license,
    producedBy: resourceCreationForm?.producedBy,
    exposedThrough: resourceCreationForm?.exposedThrough,
    DateOfExpiry: resourceCreationForm?.DateOfExpiry,
    DateOfDeletion: resourceCreationForm?.DateOfDeletion,
    containsPII: resourceCreationForm?.containsPII,
    legalBasis: resourceCreationForm?.legalBasis,
    contactEmail: resourceCreationForm?.contactEmail,
    contactUrl: resourceCreationForm?.contactUrl,
  }

  const auth = useAuth()
  const inputChipAddOnOptions = [
    InputChipsAddOnOption.ENTER,
    InputChipsAddOnOption.TAB,
    InputChipsAddOnOption.COMMA,
  ]
  const [resourceType, setResourceType] = useState<string>(
    ResourceType.PHYSICAL
  )
  const [subResourceType, setSubResourceType] = useState<string>(
    ResourceSubType.SOFTWARE
  )
  const [isPhysicalResource, setIsPhysicalResource] = useState<boolean>(true)
  const [isVirtualTypeData, setIsVirtualTypeData] = useState<boolean>(false)
  const [isContainsPii, setIsContainsPii] = useState<boolean>(true)

  useEffect(() => {
    initialFormValueChanges()
  }, [])

  const initialFormValueChanges = () => {
    if (initialFormState.resourceType) {
      setResourceType(initialFormState.resourceType)
      setIsPhysicalResource(
        initialFormState.resourceType === ResourceType.PHYSICAL
      )
    }
    if (initialFormState.resourceSubType) {
      setSubResourceType(initialFormState.resourceSubType)
      setIsVirtualTypeData(
        initialFormState.resourceSubType === ResourceSubType.DATA
      )
    }
    if (initialFormState.containsPII !== undefined) {
      setIsContainsPii(initialFormState.containsPII)
    }
  }

  const validate = (values: KeyValueType) => {
    const errors: { [key: string]: string } = {}
    errors['resourceName'] = validateField(
      values['resourceName'],
      'Resource name',
      true
    )
    const aggregationValues = values['aggregation'] as unknown as Item[]
    const aggregationUrls = aggregationValues
      ? aggregationValues.map((chip) => chip.value)
      : []
    if (aggregationUrls.length) {
      errors['aggregation'] = validateChipsAsURL(aggregationUrls, 'Aggregation')
    }

    if (isPhysicalResource) {
      errors['locationAddress'] = validateField(
        values['locationAddress'],
        'Location address',
        true
      )
      const maintainedByChips = values['maintainedBy']
      errors['maintainedBy'] = validateField(
        values['maintainedBy'],
        'Maintained by',
        true
      )
      if (maintainedByChips && maintainedByChips.length) {
        errors['maintainedBy'] = validateChipsAsURL(
          toStringArray(values['maintainedBy']),
          'Maintained by'
        )
      }
      errors['ownedBy'] = validateChipsAsURL(
        toStringArray(values['ownedBy']),
        'Owned by'
      )
      errors['manufacturedBy'] = validateChipsAsURL(
        toStringArray(values['manufacturedBy']),
        'Manufactured by'
      )
    } else {
      const copyrightOwnerChips = values['copyrightOwner']
      errors['copyrightOwner'] = validateField(
        copyrightOwnerChips,
        'Copyright owner',
        true
      )
      if (copyrightOwnerChips && copyrightOwnerChips.length) {
        errors['copyrightOwner'] = validateChipsAsURL(
          toStringArray(copyrightOwnerChips),
          'Copyright owner'
        )
      }
      const licenseChips = values['license'] as unknown as Item[]
      errors['license'] = validateField(values['license'], 'License', true)
      const licenseUrls = licenseChips
        ? licenseChips.map((chip) => chip.value)
        : []
      if (licenseUrls.length) {
        errors['license'] = validateChipsAsURL(licenseUrls, 'License')
      }

      if (isVirtualTypeData) {
        errors['producedBy'] = validateField(
          values['producedBy'],
          'Produced by',
          true,
          false,
          0,
          0,
          true
        )

        errors['exposedThrough'] = validateField(
          values['exposedThrough'],
          'Exposed through',
          true,
          false,
          0,
          0,
          true
        )

        errors['legalBasis'] = validateField(
          values['legalBasis'],
          'Legal basis',
          isContainsPii
        )

        errors['contactEmail'] = validateField(
          values['contactEmail'],
          'Contact email',
          isContainsPii && !values['contactUrl'],
          false,
          8,
          100,
          false,
          false,
          true
        )

        errors['contactUrl'] = validateField(
          values['contactUrl'],
          'Contact url',
          isContainsPii && !values['contactEmail'],
          false,
          0,
          0,
          true
        )
      }
    }

    for (const key in errors) {
      if (checkEmptyValue(errors[key])) {
        delete errors[key]
      }
    }
    return errors
  }

  const onResourceTypeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = (event.target as HTMLInputElement).value
    setResourceType(value)
    setIsPhysicalResource(value === ResourceType.PHYSICAL)
  }

  const onResourceSubTypeChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = (event.target as HTMLInputElement).value
    setSubResourceType(value)
    setIsVirtualTypeData(value === ResourceSubType.DATA)
  }

  const onChangeContainsPii = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = (event.target as HTMLInputElement).value
    setIsContainsPii(value === 'true')
  }

  const onSubmit = (values: KeyValueType) => {
    if (isSubmitLoading) return
    setCreateResourceLoading(true)
    const formValue: { [key: string]: string | boolean } = { ...values }
    const params = {
      credentialSubject: {
        type: resourceType,
        subType: resourceType === ResourceType.VIRTUAL ? subResourceType : '',
        'gx:name': formValue.resourceName,
        'gx:description': formValue.description,
        'gx:aggregationOf': formValue.aggregation
          ? (formValue.aggregation as unknown as Item[]).map((aggr) => {
              return { id: aggr.value }
            })
          : [],
      },
    }
    if (isPhysicalResource) {
      params.credentialSubject = {
        ...params.credentialSubject,
        ...getPhysicalResourceParams(formValue),
      }
    } else if (isVirtualTypeData) {
      params.credentialSubject = {
        ...params.credentialSubject,
        ...getVirtualTypeDataParams(formValue),
      }
    } else {
      params.credentialSubject = {
        ...params.credentialSubject,
        ...getVirtualTypeSoftwareParams(formValue),
      }
    }
    formValue.resourceType = resourceType
    formValue.resourceSubType = subResourceType
    formValue.containsPII = isContainsPii

    setResourceCreationForm(formValue)
    setResourceParams(params as unknown as ResourceCreationParamType)

    if (auth?.userConfig?.keyStored) {
      onSubmitform(params as unknown as KeyValueType)
    } else {
      const reqParam = removeEmptyFields(params) as ResourceCreationParamType
      postValidateResourceCreation(reqParam)
        .then(() => {
          onClickNext()
        })
        .finally(() => setCreateResourceLoading(false))
    }
  }

  const getPhysicalResourceParams = (formValue: {
    [key: string]: string | boolean
  }) => {
    return {
      'gx:maintainedBy': toStringArray(formValue.maintainedBy as string).map(
        (maintainer) => {
          return { id: maintainer }
        }
      ),
      'gx:ownedBy': formValue.ownedBy
        ? toStringArray(formValue.ownedBy as string).map((owned) => {
            return { id: owned }
          })
        : [],
      'gx:manufacturedBy': formValue.manufacturedBy
        ? toStringArray(formValue.manufacturedBy as string).map(
            (manufactured) => {
              return { id: manufactured }
            }
          )
        : [],
      'gx:locationAddress': (
        formValue.locationAddress as unknown as Item[]
      ).map((countryCode) => {
        return { 'gx:countryCode': countryCode.value }
      }),
      'gx:location': formValue.locationCoordinates
        ? toStringArray(formValue.locationCoordinates as string).map(
            (coordinate) => {
              return { 'gx:gps': coordinate }
            }
          )
        : [],
    }
  }

  const getVirtualTypeDataParams = (formValue: {
    [key: string]: string | boolean
  }) => {
    return {
      'gx:copyrightOwnedBy': toStringArray(
        formValue.copyrightOwner as string
      ).map((owner) => {
        return { id: owner }
      }),
      'gx:license': formValue.license
        ? (formValue.license as unknown as Item[]).map((license) => {
            return license.value
          })
        : [],
      'gx:policy':
        formValue.policy && (formValue.policy as string).length
          ? { 'gx:customAttribute': JSON.stringify(formValue.policy) }
          : null,
      'gx:producedBy': {
        id: formValue.producedBy,
      },
      'gx:exposedThrough': [formValue.exposedThrough],
      'gx:containsPII': isContainsPii,
      'gx:legalBasis': formValue.legalBasis,
      'gx:obsoleteDateTime': formValue.DateOfDeletion
        ? dayjs(formValue.DateOfDeletion as string).format(DATE_TIME_FORMATE)
        : '',
      'gx:expirationDateTime': formValue.DateOfExpiry
        ? dayjs(formValue.DateOfExpiry as string).format(DATE_TIME_FORMATE)
        : '',
      'gx:email': formValue.contactEmail ? formValue.contactEmail : '',
      'gx:url': formValue.contactUrl ? formValue.contactUrl : '',
    }
  }

  const getVirtualTypeSoftwareParams = (formValue: {
    [key: string]: string | boolean
  }) => {
    return {
      'gx:copyrightOwnedBy': toStringArray(
        formValue.copyrightOwner as string
      ).map((owner) => {
        return { id: owner }
      }),
      'gx:license': formValue.license
        ? (formValue.license as unknown as Item[]).map((license) => {
            return license.value
          })
        : [],
      'gx:policy':
        formValue.policy && (formValue.policy as string).length
          ? { 'gx:customAttribute': JSON.stringify(formValue.policy) }
          : null,
    }
  }

  const toStringArray = (values: string): string[] => {
    return values as unknown as string[]
  }

  return (
    <div
      className={
        ResourceCreationStepStyled.ResourceCreationContainer +
        ' flex flex-col items-center'
      }
    >
      {isSubmitLoading && (
        <div className=" absolute w-[100%] bg-white/60 h-[100%] z-10 ">
          <AppLoader />
        </div>
      )}
      <div className="w-[101.6rem] max-2xl:w-[80rem]">
        <h1 className="text-[2rem] font-[600] mt-[3.6rem] mb-[4rem]">
          Fill the following form to publish your service to the relevant Gaia-X
          catalogue
        </h1>
        <Form
          initialValues={{ ...initialFormState }}
          onSubmit={onSubmit}
          validate={validate}
          keepDirtyOnReinitialize
          render={({ handleSubmit, values }) => (
            <form onSubmit={handleSubmit} noValidate>
              <div>
                {/* Start general info card */}
                <Card title="General Information">
                  <div>
                    <Field
                      name="resourceName"
                      render={({ input, meta }) => (
                        <InputField
                          {...input}
                          variant="standard"
                          label="Resource name"
                          fullWidth
                          placeholder="Enter resource name"
                          error={meta.touched && meta.error ? true : false}
                          required
                          helperText={
                            meta.touched &&
                            meta.error && <span>{meta.error}</span>
                          }
                          tooltip="Resource Name will be displayed in all lists/ catalogue"
                        />
                      )}
                    />
                  </div>

                  <div>
                    <Field
                      name="description"
                      render={({ input, meta }) => (
                        <TextArea
                          {...input}
                          variant="standard"
                          label="Description"
                          fullWidth
                          placeholder="Enter description"
                          rows={3}
                          multiline
                          error={meta.touched && meta.error ? true : false}
                          helperText={
                            meta.touched &&
                            meta.error && <span>{meta.error}</span>
                          }
                          tooltip="Explain what a customer can expect by using your Resource"
                        />
                      )}
                    />
                  </div>

                  <div className="mt-[4rem] mb-[2rem]">
                    <Field
                      name="aggregation"
                      render={({ input, meta }) => {
                        return (
                          <>
                            <AsyncSearchSelect
                              placeholder="Aggregation of (VC URL)"
                              label="Aggregation of (VC URL)"
                              {...input}
                              loadOptions={onLoadVcOption}
                              isCreation
                              isMulti={true}
                              menuPlacement="auto"
                              tooltip="Enter One or more Gaia-X compliant Resource Resolvable ID/ URL with SD or Select Resource from the List"
                            />
                            {meta.touched && meta.error && (
                              <span className="field-error">{meta.error}</span>
                            )}
                          </>
                        )
                      }}
                    />
                  </div>
                </Card>
                {/* End card */}

                {/* Start Radio button card */}
                <div className="mt-[2rem]">
                  <Card title="Type">
                    <div className="flex gap-[5rem]">
                      <div>
                        <h3 className="text-[1.6rem] font-[600]">
                          Resource type
                        </h3>
                        <div>
                          <Field
                            name="resourceType"
                            render={({ input }) => (
                              <RadioButtonGroup
                                {...input}
                                radioGroupProps={{
                                  defaultValue: `${
                                    initialFormState &&
                                    initialFormState.resourceType
                                      ? initialFormState.resourceType
                                      : ResourceType.PHYSICAL
                                  }`,
                                  name: 'resource-type-group',
                                }}
                                options={ResourceTypeList}
                                onChange={onResourceTypeChange}
                              />
                            )}
                          />
                        </div>
                      </div>

                      <div>
                        <h3 className="text-[1.6rem] font-[600]">
                          Resource sub type
                        </h3>
                        <div>
                          <Field
                            name="resourceSubType"
                            render={({ input }) => (
                              <RadioButtonGroup
                                {...input}
                                disabledGroup={isPhysicalResource}
                                onChange={onResourceSubTypeChange}
                                radioGroupProps={{
                                  defaultValue: `${
                                    initialFormState &&
                                    initialFormState.resourceSubType
                                      ? initialFormState.resourceSubType
                                      : ResourceSubType.SOFTWARE
                                  }`,
                                  name: 'resource-sub-type-group',
                                }}
                                options={ResourceSubTypeList}
                              />
                            )}
                          />
                        </div>
                      </div>
                    </div>
                  </Card>
                </div>
                {/* End card */}

                {/* Start location details card */}
                {isPhysicalResource ? (
                  <div className="mt-[2rem]">
                    <Card title="Location details">
                      <div className="mt-[1rem]">
                        <Field
                          name="locationAddress"
                          render={({ input, meta }) => {
                            return (
                              <>
                                <AsyncSearchSelect
                                  label="Location address* (Country code)"
                                  placeholder="Location address *"
                                  {...input}
                                  loadOptions={onLoadSubDivisions}
                                  isMulti={true}
                                  menuPlacement="auto"
                                  tooltip="Select One or more Physical Location of your Resource"
                                />
                                {meta.touched && meta.error && (
                                  <span className="field-error">
                                    {meta.error}
                                  </span>
                                )}
                              </>
                            )
                          }}
                        />
                      </div>

                      <div className="mt-[2rem] mb-[2rem]">
                        <Field
                          name="locationCoordinates"
                          render={({ input, meta }) => (
                            <InputChips
                              {...input}
                              variant="standard"
                              label="Location Coordinates (in ISO 6709 format)"
                              fullWidth
                              placeholder="Enter location co-ordinates"
                              error={meta.touched && meta.error ? true : false}
                              helperText={
                                meta.touched &&
                                meta.error && <span>{meta.error}</span>
                              }
                              addOnBlur
                              addOnWhichKey={inputChipAddOnOptions}
                            />
                          )}
                        />
                      </div>
                    </Card>
                  </div>
                ) : null}
                {/* End card */}

                {/* Start technical details card */}
                {isPhysicalResource ? (
                  <div className="mt-[2rem]">
                    <Card title="Technical Details">
                      <div>
                        <Field
                          name="maintainedBy"
                          render={({ input, meta }) => (
                            <InputChips
                              {...input}
                              variant="standard"
                              label="Maintained by"
                              fullWidth
                              placeholder="Enter maintained by"
                              error={meta.touched && meta.error ? true : false}
                              required
                              helperText={
                                meta.touched &&
                                meta.error && <span>{meta.error}</span>
                              }
                              addOnBlur
                              addOnWhichKey={inputChipAddOnOptions}
                              tooltip="Enter One or more Gaia X registered Legal Participant Resolvable ID/ URL with SD"
                            />
                          )}
                        />
                      </div>

                      <div className="mt-[2rem]">
                        <Field
                          name="ownedBy"
                          render={({ input, meta }) => (
                            <InputChips
                              {...input}
                              variant="standard"
                              label="Owned by"
                              fullWidth
                              placeholder="Enter owned by"
                              error={meta.touched && meta.error ? true : false}
                              helperText={
                                meta.touched &&
                                meta.error && <span>{meta.error}</span>
                              }
                              addOnBlur
                              addOnWhichKey={inputChipAddOnOptions}
                              tooltip="Enter One or more Gaia X registered Legal Participant Resolvable ID/ URL with SD"
                            />
                          )}
                        />
                      </div>

                      <div className="mt-[2rem] mb-[2rem]">
                        <Field
                          name="manufacturedBy"
                          render={({ input, meta }) => (
                            <InputChips
                              {...input}
                              variant="standard"
                              label="Manufactured by"
                              fullWidth
                              placeholder="Enter manufactured by"
                              error={meta.touched && meta.error ? true : false}
                              helperText={
                                meta.touched &&
                                meta.error && <span>{meta.error}</span>
                              }
                              addOnBlur
                              addOnWhichKey={inputChipAddOnOptions}
                              tooltip="Enter One or more Gaia X registered Legal Participant Resolvable ID/ URL with SD"
                            />
                          )}
                        />
                      </div>
                    </Card>
                  </div>
                ) : null}
                {/* End card */}

                {/* Start ownership & controls card */}
                {!isPhysicalResource ? (
                  <div className="mt-[2rem]">
                    <Card title="Ownership & Controls">
                      <div>
                        <Field
                          name="copyrightOwner"
                          render={({ input, meta }) => (
                            <InputChips
                              {...input}
                              variant="standard"
                              label="Copyright owner"
                              fullWidth
                              placeholder="Enter copyright owner"
                              error={meta.touched && meta.error ? true : false}
                              required
                              helperText={
                                meta.touched &&
                                meta.error && <span>{meta.error}</span>
                              }
                              addOnBlur
                              addOnWhichKey={inputChipAddOnOptions}
                              tooltip="Enter One or more Gaia X registered Legal Participant Resolvable ID/ URL with SD"
                            />
                          )}
                        />
                      </div>

                      <div className="mt-[2rem]">
                        <Field
                          name="policy"
                          render={({ input }) => (
                            <InputChips
                              {...input}
                              variant="standard"
                              label="Policy"
                              fullWidth
                              placeholder="Enter policy"
                              addOnWhichKey={inputChipAddOnOptions}
                              addOnBlur
                              tooltip="Enter one or more URLs to a page defining Access Control, throttling, Usage, Retention etc"
                            />
                          )}
                        />
                      </div>

                      <div
                        className={
                          ResourceCreationStepStyled.inputSelectCustom +
                          ' mt-[2rem] mb-[2rem]'
                        }
                      >
                        <Field
                          name="license"
                          render={({ input, meta }) => {
                            return (
                              <>
                                <AsyncSearchSelect
                                  placeholder="Select license*"
                                  label="License*"
                                  {...input}
                                  loadOptions={onLoadLicenseOption}
                                  isCreation
                                  isMulti={true}
                                  menuPlacement="auto"
                                  tooltip="Enter SPDX identifier or URL To the License Document"
                                />
                                {meta.touched && meta.error && (
                                  <span className="field-error">
                                    {meta.error}
                                  </span>
                                )}
                              </>
                            )
                          }}
                        />
                      </div>
                    </Card>
                  </div>
                ) : null}
                {/* End card */}

                {/* Start technical details card */}
                {!isPhysicalResource && isVirtualTypeData ? (
                  <div className="mt-[2rem]">
                    <Card title="Technical Details">
                      <div>
                        <Field
                          name="producedBy"
                          render={({ input, meta }) => (
                            <InputField
                              {...input}
                              variant="standard"
                              label="Produced by"
                              fullWidth
                              placeholder="Enter produced by"
                              error={meta.touched && meta.error ? true : false}
                              required
                              helperText={
                                meta.touched &&
                                meta.error && <span>{meta.error}</span>
                              }
                              tooltip="Enter One or more Gaia X registered Legal Participant Resolvable ID/ URL with SD"
                            />
                          )}
                        />
                      </div>

                      <div className="mt-[2rem]">
                        <Field
                          name="exposedThrough"
                          render={({ input, meta }) => (
                            <InputField
                              {...input}
                              variant="standard"
                              label="Exposed through"
                              fullWidth
                              placeholder="Enter exposed through"
                              error={meta.touched && meta.error ? true : false}
                              required
                              helperText={
                                meta.touched &&
                                meta.error && <span>{meta.error}</span>
                              }
                              tooltip="Enter a resolvable link to the data exchange component that exposes the data resource"
                            />
                          )}
                        />
                      </div>

                      <div className="mt-[2rem] flex gap-[2rem]">
                        <div className="w-[49%]">
                          <Field
                            name="DateOfExpiry"
                            render={({ input }) => (
                              <DateTimePicker
                                {...input}
                                label="Date of expiry"
                                slotProps={{
                                  textField: { variant: 'standard' },
                                }}
                                disablePast
                                maxDate={values['DateOfDeletion']}
                                tooltip="Select the date and time after which the Data will become Obsolete"
                              />
                            )}
                          />
                        </div>

                        <div className="w-[49%]">
                          <Field
                            name="DateOfDeletion"
                            render={({ input }) => (
                              <DateTimePicker
                                {...input}
                                label="Date of deletion"
                                slotProps={{
                                  textField: { variant: 'standard' },
                                }}
                                disablePast
                                minDate={values['DateOfExpiry']}
                                tooltip="Select the date and time after which the Data will expire and shall be deleted"
                              />
                            )}
                          />
                        </div>
                      </div>
                    </Card>
                  </div>
                ) : null}
                {/* End card */}

                {!isPhysicalResource && isVirtualTypeData ? (
                  <div className="mt-[2rem] flex gap-[2rem]">
                    <div className="w-[25%]">
                      {/* Start Contains PII card */}
                      <Card title="Contains PII">
                        <div>
                          <Field
                            name="containsPII"
                            render={({ input }) => (
                              <RadioButtonGroup
                                {...input}
                                onChange={onChangeContainsPii}
                                radioGroupProps={{
                                  defaultValue: `${
                                    initialFormState &&
                                    initialFormState.containsPII !== undefined
                                      ? initialFormState.containsPII
                                      : true
                                  }`,
                                  name: 'contains-pii',
                                }}
                                options={[
                                  { label: 'Yes', value: true },
                                  { label: 'No', value: false },
                                ]}
                              />
                            )}
                          />
                        </div>
                      </Card>
                    </div>
                    {/* End card */}

                    {/* Start Legal Basis card */}
                    <div className="w-[75%]">
                      <Card title="Legal Basis">
                        <div className="mt-[0.3rem]">
                          <Field
                            name="legalBasis"
                            render={({ input, meta }) => (
                              <Select
                                label="Legal Basis"
                                {...input}
                                required={isContainsPii}
                                items={LegalBasisList}
                                error={meta.touched && meta.error}
                                helperText={
                                  meta.touched &&
                                  meta.error && <span>{meta.error}</span>
                                }
                                tooltip="Select the applicable article being followed for Legitimate processing of information related to PII"
                              />
                            )}
                          />
                        </div>
                      </Card>
                    </div>

                    {/* End card */}
                  </div>
                ) : null}

                {/* Start Data Protection Contact card */}
                {!isPhysicalResource && isVirtualTypeData ? (
                  <div className="mt-[2rem]">
                    <Card title="Data Protection Contact">
                      <div className="flex items-center gap-[2rem]">
                        <div className="w-[45%]">
                          <Field
                            name="contactEmail"
                            render={({ input, meta }) => (
                              <InputField
                                {...input}
                                variant="standard"
                                label="Email Address"
                                fullWidth
                                placeholder="Enter email address"
                                error={
                                  meta.touched && meta.error ? true : false
                                }
                                required={
                                  isContainsPii && !values['contactUrl']
                                }
                                helperText={
                                  meta.touched &&
                                  meta.error && <span>{meta.error}</span>
                                }
                                tooltip="Provide email ID or Contact form to facilitate a Data Consumer to seek Clarity on Personal Data Protection measures being taken"
                              />
                            )}
                          />
                        </div>

                        <div className="w-[5%] text-center">Or</div>

                        <div className="w-[45%]">
                          <Field
                            name="contactUrl"
                            render={({ input, meta }) => (
                              <InputField
                                {...input}
                                variant="standard"
                                label="Contact form URL"
                                fullWidth
                                placeholder="Enter contact form URL"
                                error={
                                  meta.touched && meta.error ? true : false
                                }
                                required={
                                  isContainsPii && !values['contactEmail']
                                }
                                helperText={
                                  meta.touched &&
                                  meta.error && <span>{meta.error}</span>
                                }
                                tooltip="Provide email ID or Contact form to facilitate a Data Consumer to seek Clarity on Personal Data Protection measures being taken"
                              />
                            )}
                          />
                        </div>
                      </div>
                    </Card>
                  </div>
                ) : null}
                {/* End card */}

                {/* <div className="mt-[4rem]">
                  <Field
                    name="kafkaResource"
                    render={({ input }) => (
                      <label>
                        <Checkbox
                          {...input}
                          label={<span>Publish resource to Kafka</span>}
                          defaultChecked={publishResource}
                          onChange={(event) => {
                            const value = event.target.checked
                            setPublishResource(value)
                          }}
                        />
                      </label>
                    )}
                  />
                </div> */}

                <div className="mt-[3rem] text-right pb-[3rem]">
                  <Button variant="contained" type="submit" color="primary">
                    Submit
                  </Button>
                </div>
              </div>
            </form>
          )}
        />
      </div>
    </div>
  )
}

export { ResourceCreationStep }
