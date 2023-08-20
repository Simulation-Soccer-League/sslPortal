import { Button, Input, Select } from '@chakra-ui/react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import { startCase } from 'lodash';
import React from 'react';
import * as Yup from 'yup';

import { ChangeTypes, Position } from '../constants';

const validationSchema = Yup.object().shape({
  newValue: Yup.mixed().when('type', {
    is: (type: ChangeTypes) => ['Render', 'Name'].includes(type),
    then: Yup.string()
      .min(3, 'Must be at least 3 characters long.')
      .max(80, 'Cannot exceed 80 characters long.')
      .required('Value is required'),
    otherwise: Yup.mixed().when('type', {
      is: 'JerseyNumber',
      then: Yup.number().min(0).max(99).required('Value is required'),
      otherwise: Yup.string()
        .oneOf(
          [
            'Center',
            'Left Defense',
            'Right Defense',
            'Left Wing',
            'Right Wing',
          ],
          'Invalid position',
        )
        .required('Value is required'),
    }),
  }),
});

export interface ChangeFormValues {
  newValue: string | number;
  type: ChangeTypes;
}

interface ChangeFormProps {
  onCancel: () => void;
  onSubmit: (values: ChangeFormValues) => void;
  isSubmitting: boolean;
  type: ChangeTypes;
  position?: Position;
}

export const ChangeForm = ({
  onCancel,
  onSubmit,
  isSubmitting,
  type,
  position,
}: ChangeFormProps) => {
  const initialValues: ChangeFormValues = {
    newValue: '',
    type,
  };

  const handleSubmit = (values: ChangeFormValues) => {
    onSubmit(values);
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {(props) => (
        <Form>
          {type !== 'Position' ? (
            <div>
              <label htmlFor="newValue">{startCase(type)}:</label>
              {['Render', 'Name', 'Username'].includes(type) ? (
                <Field as={Input} type="text" id="newValue" name="newValue" />
              ) : (
                <Field as={Input} type="number" id="newValue" name="newValue" />
              )}
              <ErrorMessage name="newValue" component="div" />
            </div>
          ) : (
            <div>
              <label htmlFor="newValue">Position:</label>
              <Field as={Select} id="newValue" name="newValue">
                <option value="">Select Position</option>
                <option disabled={position === 'Center'} value="Center">
                  Center
                </option>
                <option
                  disabled={position === 'Left Defense'}
                  value="Left Defense"
                >
                  Left Defense
                </option>
                <option
                  disabled={position === 'Right Defense'}
                  value="Right Defense"
                >
                  Right Defense
                </option>
                <option disabled={position === 'Left Wing'} value="Left Wing">
                  Left Wing
                </option>
                <option disabled={position === 'Right Wing'} value="Right Wing">
                  Right Wing
                </option>
              </Field>
              <ErrorMessage name="newValue" component="div" />
            </div>
          )}

          <div className="my-4 flex items-center">
            <Button
              colorScheme="gray"
              type="button"
              className="mr-2 w-1/2"
              onClick={onCancel}
            >
              Cancel
            </Button>
            <Button
              colorScheme="blue"
              isLoading={isSubmitting}
              isDisabled={!props.dirty}
              type="submit"
              className="w-1/2"
            >
              Submit
            </Button>
          </div>
        </Form>
      )}
    </Formik>
  );
};
